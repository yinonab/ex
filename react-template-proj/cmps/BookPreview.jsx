export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>Book Title: {book.title}</h2>
            <h4>Book Price: {book.listPrice['amount']}</h4>
            <h5>Book ID: {book.id}</h5>
            <img src={`./BooksImages/${book.id}.jpg`} alt="bookImage" />
            {/* <img src={`../assets/img/${car.vendor}.png`} alt="" /> */}
        </article>
    )
}