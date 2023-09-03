export function WatcherModal({ watcher, onCloseModal }) {
    return (
        <div className="watcher-modal-container">
            <h2>{watcher.fullName}</h2>
            <ul>
                {watcher.movies.map(movie => <li key={movie}>{movie}</li>)}
            </ul>
            <button onClick={onCloseModal}>Close</button>
        </div>
    )
}