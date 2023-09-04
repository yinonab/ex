const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AppHeader } from "./cmps/app-header.jsx";
import { Home } from '../react-template-proj/pages/HomePage.jsx'
import { About } from '../react-template-proj/pages/AboutPage.jsx'
import { BookIndex } from '../react-template-proj/pages/BookIndex.jsx'
import { BookDetails } from '../react-template-proj/pages/bookDetails.jsx'
import { BookEdit } from "./pages/book-edit.jsx";


export function App() {

    const [page, setPage] = useState('book')

    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                    </Routes>

                </main>
            </section>
        </Router>
    )
}
