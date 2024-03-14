import {getLog} from "../state/translationLog"

export function updateParagraph(
  newParagraph: Word.Paragraph,
  originalParagraph: Word.Paragraph,
  text: string,
) {
  newParagraph.insertText(text, "Replace")
  newParagraph.set({
    font: {
      // can be null
      bold: !!originalParagraph.font.bold,
      italic: !!originalParagraph.font.italic,
      name: originalParagraph.font.name,
      size: originalParagraph.font.size,
    },
  })
}

type ListManagerOptions = {
  logOnListChange?: boolean
}

export class ListManager {
  newListCache: Map<number, Word.List> = new Map()
  private options: ListManagerOptions

  constructor(
    private context: Word.RequestContext,
    options?: ListManagerOptions,
  ) {
    this.options = options || {}
  }

  private async startNewList(oldParagraph: Word.Paragraph, newParagraph: Word.Paragraph) {
    const newList = newParagraph.startNewList()
    newList.load("id")
    await this.context.sync()
    if (!oldParagraph.listItemOrNullObject.isNullObject) {
      newParagraph.set({
        listItem: {
          level: oldParagraph.listItemOrNullObject.level,
        },
      })
    }
    return newList
  }

  private setLevelType(newList: Word.List, levelTypes: Word.ListLevelType, level: number) {
    if (levelTypes === Word.ListLevelType.bullet) {
      newList.setLevelBullet(level, Word.ListBullet.solid)
    } else {
      newList.setLevelNumbering(level, "Arabic", [level, "."])
    }
  }

  private copyListProperties(originalList: Word.List, newList: Word.List) {
    // Retrieve the list levels and their properties
    const levelTypes = originalList.levelTypes
    this.setLevelType(newList, levelTypes[0], 0)
    this.setLevelType(newList, levelTypes[1], 1)
    this.setLevelType(newList, levelTypes[2], 2)
  }

  async updateLists(originalParagraph: Word.Paragraph, newParagraph: Word.Paragraph) {
    if (originalParagraph.listOrNullObject.isNullObject) {
      return
    }
    const sourceList = originalParagraph.listOrNullObject
    if (!this.newListCache.has(sourceList.id)) {
      const newList = await this.startNewList(originalParagraph, newParagraph)
      this.newListCache.set(sourceList.id, newList)
      if (this.options.logOnListChange) {
        this.context.trackedObjects.add(newParagraph)
        getLog().addMessage({type: "list", paragraph: newParagraph})
      }
      this.copyListProperties(sourceList, newList)
    } else {
      const newList = this.newListCache.get(sourceList.id)
      let level = 0
      if (!originalParagraph.listItemOrNullObject.isNullObject) {
        level = originalParagraph.listItemOrNullObject.level
      }
      // todo fix undefined
      newParagraph.attachToList(newList!.id, level)
    }
  }
}
