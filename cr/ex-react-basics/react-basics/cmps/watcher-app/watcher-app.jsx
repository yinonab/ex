const { useState, useEffect } = React
import { watcherService } from "../../services/watcher.service.js"
import { WatcherModal } from "./watcher-modal.jsx"
import { WatcherPreview } from "./watcher-preview.jsx"

export function WatcherApp() {

    const [watchers, setWatchers] = useState(null)
    const [selectedWatcher, setSelectedWatcher] = useState(null)

    useEffect(() => {
        loadWatchers()
    }, [])

    function loadWatchers() {
        watcherService.query()
            .then(watchers => setWatchers(watchers))
    }

    function onAddWatcher() {
        const name = prompt('Watcher name')
        watcherService.add(name)
            .then(addedWatcher => {
                const newWatchers = [...watchers, addedWatcher]
                setWatchers(newWatchers)
            })
    }

    function onSelectWatcher(watcher) {
        // Better way is to get by id from service - not neccessarry at this point
        setSelectedWatcher(watcher)
    }

    function onRemoveWatcher(id) {
        watcherService.remove(id)
            .then(() => {
                const newWatchers = watchers.filter(w => w.id !== id)
                setWatchers(newWatchers)
            })
    }


    if (!watchers) return <div>Loading...</div>

    return (
        <section>
            <button onClick={onAddWatcher}>Add Watcher</button>
            <div className="watcher-app-container">
                {watchers.map(watcher => <WatcherPreview
                    key={watcher.id}
                    watcher={watcher}
                    onSelectWatcher={onSelectWatcher}
                    onRemoveWatcher={onRemoveWatcher}
                />)}

                {selectedWatcher && <WatcherModal
                    watcher={selectedWatcher}
                    onCloseModal={() => setSelectedWatcher(null)}
                />}
            </div>
        </section>
    )
}