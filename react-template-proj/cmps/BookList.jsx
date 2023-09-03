import { BookPreview } from './BookPreview.jsx'
export function BookList({ books, onRemoveBook }) {
console.log(books)
    return (
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <section>
                        <button onClick={() => onRemoveBook(book.id)}>Remove Book</button>
                        <button onClick={() => onSelectBookId(book.id)}>Details</button>
                    </section>
                </li>
            )}
        </ul>
    )
}