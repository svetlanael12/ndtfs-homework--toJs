interface IBook {
    id: number;
    title: string;
    description: string;
    fileName: string;
    authors: string;
    favorite: string;
    fileCover: string;
    fileBook: string;
}

interface ILibrary {
    books: IBook[];
}

interface IPort {
    PORT: string;
    HOST: string;
    DBNAME?: string;
}

interface IBookRepository {
    createBook(book: IBook): Promise<IBook>
    getBook(id: string): Promise<IBook>
    getBooks(): Promise<IBook[]>
    updateBook(id: string, data: any): Promise<IBook>
    deleteBook(id: string): Promise<void>
}

export { IBook, ILibrary, IPort, IBookRepository }