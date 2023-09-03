import { bookService } from "../services/book.service.js"
import { BookDetails } from "../pages/bookDetails.jsx"
import { BookList } from "../cmps/BookList.jsx"



const { useState, useEffect } = React


export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)


    useEffect(() => {
        console.log('mount')
        // bookService.query(filterBy).then(books => setCars(books))
        bookService.query().then(setBooks)
    }, [])

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
        })
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
                    {/* <CarFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} /> */}
                    <BookList books={books} onRemoveBook={onRemoveBook} onSelectBookId={onSelectBookId} />
                </React.Fragment>
            }

            {selectedBookId && <BookDetails onBack={() => onSelectBookId(null)} bookId={selectedBookId} />}
        </section>
    )
}