import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookList } from "../cmps/BookList.jsx"
import { bookService } from "../services/book.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { BookDetails } from "../pages/bookDetails.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())


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

            showSuccessMsg(`Book Removed! ${bookId}`)
        })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem Removing ' + bookId)
            })
    }
    function onSetFilterBy(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }




    console.log('render')
    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {
                <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <button><Link to={`/book/edit`}>Add Book </Link></button>
                    <BookList books={books} onRemoveBook={onRemoveBook} />
                </React.Fragment>
            }

        </section>
    )
}