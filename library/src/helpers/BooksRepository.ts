import { BookModel } from '../models/Book'
import { IBook } from '../types'
import { injectable } from "inversify";

@injectable()
class BooksRepository {
    async createBook (book: IBook) {
        try {
            const newBook = new BookModel(book)
            await newBook.save()
            return newBook
        } catch (e) {
            console.error(e)
        }
    }

    async getBook (id: string) {
        try {
            return await BookModel.findById(id).select('-__v')
        } catch (e) {
            console.error(e)
        }
    }

    async getBooks () {
        try {
            return await BookModel.find().select('-__v')
        } catch (e) {
            console.error(e)
        }
    }

    async updateBook (id: string, book: IBook) {
        try {
            const foundBook = await BookModel.findById(id)
            await foundBook.updateOne(book)
            return foundBook
        } catch (e) {
            console.error(e)
        }
    }

    async deleteBook (id: string) {
        try {
            await BookModel.deleteOne({ _id: id })
        } catch (e) {
            console.error(e)
        }
    }
}

export default BooksRepository