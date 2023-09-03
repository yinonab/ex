
import { bookService } from "../services/book.service.js"


const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId).then(setBook)
    }, [])

    function pageCount(book) {

        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount > 200) return 'Descent Reading'
        if (book.pageCount < 200) return ' Light Reading'
    }
    function bookAge(book) {
        if (book.publishedDate < 10) return 'New'
        if (book.publishedDate > 10) return 'Vintage'
    }
    function getPriceColor(book) {
        if (book.listPrice['amount'] > 100) return 'red'
        if (book.listPrice['amount'] < 20) return 'green'
        else return ''
    }
    function onSale(book) {
        if (book.listPrice['isOnSale'])
            return 'On Sale'
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h2>Book Title: {book.title}</h2>
            <h1>Book SubTitle: {book.subtitle}</h1>
            <h3>Book authors: {book.authors}</h3>
            <h4 className={getPriceColor(book)}>Book Price: {book.listPrice['amount']}</h4>
            <h4>Published Date: {book.publishedDate}</h4>
            <h4>language: {book.language}</h4>
            <h4>Discount: {onSale(book)}</h4>
            <h4>Read Level: {pageCount(book)}</h4>
            <h5>page Count: {book.pageCount}</h5>
            <h5>Book Age: {bookAge(book)}</h5>
            <p>Book Categorie : {[book.categories]}</p>
            <p>Book Description{book.description}</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}