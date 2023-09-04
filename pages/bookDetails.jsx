import { bookService } from "../services/book.service.js";
const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


export function BookDetails({ bookId, onBack }) {
    const [book, setBook] = useState(null);
    const [showMore, setShowMore] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
    const wordsToShow = 10

    useEffect(() => {
        loadRobot()
    }, [params.bookId]);

    function loadRobot() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
                navigate('/book')
            })
    }
    function onBack() {
        navigate('/book')
        // navigate(-1)
    }

    function pageCount(book) {
        if (book.pageCount > 500) return "Serious Reading"
        if (book.pageCount > 200) return "Decent Reading"
        if (book.pageCount < 200) return "Light Reading"
    }

    function bookAge(book) {
        if (book.publishedDate < 10) return "New"
        if (book.publishedDate > 10) return "Vintage"
    }

    function getPriceColor(book) {
        if (book.listPrice.amount > 100) return "red"
        if (book.listPrice.amount < 20) return "green"
        return "";
    }

    function onSale(book) {
        if (book.listPrice["isOnSale"]) return "On Sale"
    }

    if (!book) return <div>Loading...</div>
console.log('book.description:', book.description)
    const words = book.description.split(/\s+/)
    const wordsToDisplay = showMore ? words.length : wordsToShow
    const description = words.slice(0, wordsToDisplay).join(" ")
    const buttonText = showMore ? "Read Less" : "Read More"

    const toggleText = () => {
        setShowMore(!showMore)
    }

    const wordCountDisplay = (
        <p>
            Word Count: {words.length}
            {words.length > wordsToShow && (
                <span>
                    {""}
                </span>
            )}
        </p>
    )


    return (
        <section className="book-details">
            <h2>Book Title: {book.title}</h2>
            <h1>Book SubTitle: {book.subtitle}</h1>
            <h3>Book authors: {book.authors}</h3>
            <h4 className={getPriceColor(book)}>Book Price: {book.listPrice.amount}</h4>
            <h4>Published Date: {book.publishedDate}</h4>
            <h4>Language: {book.language}</h4>
            <h4>Discount: {onSale(book)}</h4>
            <h4>Read Level: {pageCount(book)}</h4>
            <h5>Page Count: {book.pageCount}</h5>
            <h5>Book Age: {bookAge(book)}</h5>
            <p>Book Category : {book.categories.join(", ")}</p>
            <h5>Book Description:</h5>
            <p className="text">{description} {words.length > wordsToShow && (
                <button className="read" onClick={toggleText}>{buttonText}</button>
            )}</p>
            
            <button onClick={onBack}>Back</button>
        </section>
    )
}