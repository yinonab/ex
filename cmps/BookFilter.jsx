const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


    useEffect(() => {
        onSetFilterBy(filterByToEdit)
        console.log('filterByToEdit:', filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        console.log('target:', target)
        const field = target.name
        let value = target.value
        console.log('field:', field)
        console.log('value:', value)

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
        
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
        console.log('filterByToEdit:', filterByToEdit)
    }

    // function handleTxtChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
    // }

    // function handleMinSpeedChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, minSpeed: value }))
    // }


    const { txt, minPrice } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Title: </label>
                <input value={txt} onChange={handleChange} type="text" placeholder="By Title" id="txt" name="txt" />

                <label htmlFor="minPrice">Price: </label>
                <input value={minPrice} onChange={handleChange} type="number" placeholder="By Min Price" id="minPrice" name="minPrice" />

                <button>Set Filter</button>
            </form>
        </section>
    )
}