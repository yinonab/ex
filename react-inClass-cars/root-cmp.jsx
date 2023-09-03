const { useState } = React

import { About } from "./pages/About.jsx";
import { CarIndex } from "./pages/CarIndex.jsx";
import { Home } from "./pages/Home.jsx";

export function App() {

    const [page, setPage] = useState('car')

    return (
        <section className="app main-layout">
            <header className="app-header full main-layout">
                <h1>React Car App</h1>
                <nav className="app-nav">
                    <a onClick={() => setPage('home')} href="#">Home</a>
                    <a onClick={() => setPage('about')} href="#">About</a>
                    <a onClick={() => setPage('car')} href="#">Cars</a>
                </nav>
            </header>

            <main>
                {page === 'home' && < Home />}
                {page === 'about' && <About />}
                {page === 'car' && <CarIndex />}
            </main>
        </section>
    )
} 