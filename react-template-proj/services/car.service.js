import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'carDB'
var gFilterBy = {txt: '', minSpeed: 0}
_createBooks()

export const bppkService = {
    query,
    get,
    remove,
    save,
    getEmptyCar,
    getNextCarId,
    getFilterBy,
    setFilterBy
}

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                books = books.filter(book => regex.test(book.vendor))
            }
            if (gFilterBy.minSpeed) {
                books = books.filter(book => car.maxSpeed >= gFilterBy.minSpeed)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (car.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyCar(vendor = '', maxSpeed = 0) {
    return { id: '', vendor, maxSpeed }
}

function getFilterBy() {
    return {...gFilterBy}
}

function setFilterBy(filterBy = {}) {
     if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextCarId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

function _createCars() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createCar('audu', 300))
        books.push(_createCar('fiak', 120))
        books.push(_createCar('subali', 100))
        books.push(_createCar('mitsu', 150))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createCar(vendor, maxSpeed = 250) {
    const book = getEmptyCar(vendor, maxSpeed)
    book.id = utilService.makeId()
    return book
}