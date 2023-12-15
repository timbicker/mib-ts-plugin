import {getLog} from "../translationLog"

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
  originalList: Word.List | undefined = undefined
  newList: Word.List | undefined = undefined
  private options: ListManagerOptions

  constructor(
    private context: Word.RequestContext,
    options?: ListManagerOptions,
  ) {
    this.options = options || {}
  }

  private clearLists() {
    this.originalList = undefined
    this.newList = undefined
  }

  private async startNewLists(oldParagraph: Word.Paragraph, newParagraph: Word.Paragraph) {
    this.originalList = oldParagraph.listOrNullObject
    this.newList = newParagraph.startNewList()
    this.newList.load("id")
    await this.context.sync()
    if (!oldParagraph.listItemOrNullObject.isNullObject) {
      newParagraph.set({
        listItem: {
          level: oldParagraph.listItemOrNullObject.level,
        },
      })
    }
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
      this.clearLists()
      return
    }
    if (this.originalList === undefined || this.originalList.id !== originalParagraph.listOrNullObject.id) {
      await this.startNewLists(originalParagraph, newParagraph)
      if (this.options.logOnListChange) {
        getLog().addMessage(`List occured`)
      }
      this.copyListProperties(this.originalList, this.newList)
    } else {
      let level = 0
      if (!originalParagraph.listItemOrNullObject.isNullObject) {
        level = originalParagraph.listItemOrNullObject.level
      }
      newParagraph.attachToList(this.newList.id, level)
    }
  }
}
