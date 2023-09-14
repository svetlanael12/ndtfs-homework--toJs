const uuid = require('uuid')

const createBook = (
  title: string, description: string, authors: string, favorite: string,
  fileCover: string, fileName: string, fileBook: string,
) => {
  return {
    id: uuid.v4(),
    title: title,
    description: description,
    authors: authors,
    favorite: favorite,
    fileCover: fileCover,
    fileName: fileName,
    fileBook: fileBook
  }
}

module.exports = createBook
