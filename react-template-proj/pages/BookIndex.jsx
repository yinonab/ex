import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"



const { useState, useEffect } = React


export function BookIndex() {
    const [books, setBooks] = useState(null)


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



    console.log('render')
    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {
                <React.Fragment>
                    {/* <CarFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} /> */}
                    <BookList books={books} onRemoveBook={onRemoveBook} />
                </React.Fragment>
            }

            {/* {selectedCarId && <CarDetails onBack={() => onSelectCarId(null)} carId={selectedCarId} />} */}
        </section>
    )
}