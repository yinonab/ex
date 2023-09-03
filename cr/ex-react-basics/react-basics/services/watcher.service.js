import { utilService } from './util.service.js'


export const watcherService = {
    query,
    getById,
    add,
    remove,
}


const KEY = 'watcherDB'
const _someMovies = ['Game of thrones', 'Rocky Balboa', 'Rambo (First Blood)', 'Back to the Future', 'Shawshank Redemption', 'Puki in Wonderland', 'Plus One', 'The Godfather']


_createWatchers()

function query() {
    const watchers = utilService.loadFromStorage(KEY)
    return Promise.resolve(watchers)
}

function getById(watcherId) {
    const watchers = utilService.loadFromStorage(KEY)
    const watcher = watchers.find(watcher => watcherId === watcher.id)
    return Promise.resolve(watcher)
}

function remove(watcherId) {
    let watchers = utilService.loadFromStorage(KEY)
    watchers = watchers.filter(watcher => watcher.id !== watcherId)
    utilService.saveToStorage(KEY, watchers)
    return Promise.resolve()
}

function add(fullName) {
    let watchers = utilService.loadFromStorage(KEY)
    const watcher = _createWatcher(fullName)
    watchers = [watcher, ...watchers]
    utilService.saveToStorage(KEY, watchers)
    return Promise.resolve(watcher)
}


function _createWatcher(fullName) {
    return {
        id: utilService.makeId(),
        fullName,
        color: utilService.getRandomColor(),
        movies: [..._someMovies]
    }
}

function _createWatchers() {
    let watchers = utilService.loadFromStorage(KEY)
    if (!watchers || !watchers.length) {
        const names = ['Puki Ba', 'Muki Da', 'Shuki Sa']
        watchers = names.map(_createWatcher)
        utilService.saveToStorage(KEY, watchers)
    }
}