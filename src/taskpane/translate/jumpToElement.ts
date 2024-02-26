export async function jumpToTable(table: Word.Table) {
  table.select()
  await table.context.sync()
}

export async function jumpToList(paragraph: Word.Paragraph) {
  paragraph.select()
  await paragraph.context.sync()
}
