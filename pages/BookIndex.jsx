import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { BookDetails } from "../pages/bookDetails.jsx"

const { useState, useEffect } = React


export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBookId, setSelectedBookId] = useState(null)


    useEffect(() => {
        console.log('mount')
        bookService.query(filterBy).then(books => setBooks(books))
        console.log('books:', books)
        console.log('filterBy:', filterBy)
        // bookService.query().then(setBooks)
    }, [filterBy])

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
        })
    }
    function onSetFilterBy(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }
    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }



    console.log('render')
    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {!selectedBookId &&
                <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <BookList books={books} onRemoveBook={onRemoveBook} onSelectBookId={onSelectBookId} />
                </React.Fragment>
            }

            {selectedBookId && <BookDetails onBack={() => onSelectBookId(null)} bookId={selectedBookId} />}
        </section>
    )
}