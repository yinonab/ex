const { useState } = React

import { AnimalList } from 'cmps/animals/animal-list.jsx'
import { SeasonClock } from 'cmps/season-clock/season-clock.jsx'
import { CountDown } from 'cmps/count-down/count-down.jsx'
import { WatcherApp } from 'cmps/watcher-app/watcher-app.jsx'
import { MouseMonitor } from 'cmps/mouse-monitor/mouse-monitor.jsx'


export function App() {
    const [page, setPage] = useState('animalList')

    const pages = ['animalList', 'seasonClock', 'countDown', 'watcherApp', 'mouseMonitor']
    const animalInfos = [
        { type: 'Malayan Tiger', count: 787 },
        { type: 'Mountain Gorilla', count: 212 },
        { type: 'Fin Whale', count: 28 }
    ]

    function onSetPage(ev, page) {
        ev.preventDefault()
        setPage(page)
    }

    return <section className="app">
        <header className="app-header">
            <h1>My App</h1>
        </header>

        <section className="home-container">
            <div className="links-container">
                {pages.map(page => <a
                    key={page}
                    href=""
                    className="link"
                    onClick={(ev) => onSetPage(ev, page)}
                >
                    {page}
                </a>)}
            </div>

            <main>
                {page === 'animalList' && <AnimalList animalInfos={animalInfos} />}
                {page === 'seasonClock' && <SeasonClock />}
                {page === 'countDown' && <CountDown startFrom={10} onDone={() => alert('done')} />}
                {page === 'watcherApp' && <WatcherApp />}
                {page === 'mouseMonitor' && <MouseMonitor />}
            </main>

            {/* <div>{dynamicPage()}</div> */}
        </section>
    </section>
}

const dynamicPage = () => {
    switch (page) {
        case 'animalList':
            return <AnimalsList animalInfos={animalInfos} />

        case 'seasonClock':
            return <SeasonClock />

        case 'countDown':
            return <CountDown startFrom={100} onDone={() => alert('done')} />

        case 'watcherApp':
            return <WatcherApp />

        case 'mouseMonitor':
            return <MouseMonitor />

        default:
            return null
    }
}