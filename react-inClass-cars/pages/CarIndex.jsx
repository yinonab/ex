import { CarFilter } from "../cmps/CarFilter.jsx"
import { CarList } from "../cmps/CarList.jsx"
import { carService } from "../services/car.service.js"
import { CarDetails } from "./CarDetails.jsx"

const { useState, useEffect } = React


export function CarIndex() {

    const [cars, setCars] = useState(null)
    const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())
    const [selectedCarId, setSelectedCarId] = useState(null)

    useEffect(() => {
        console.log('mount')
        carService.query(filterBy).then(cars => setCars(cars))
        // carService.query().then(setCars)
    }, [filterBy])

    function onRemoveCar(carId) {
        carService.remove(carId).then(() => {
            setCars(prevCars => prevCars.filter(car => car.id !== carId))
        })
    }

    function onSetFilterBy(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSelectCarId(carId) {
        setSelectedCarId(carId)
    }



    console.log('render')
    if (!cars) return <div>Loading...</div>
    return (
        <section className="car-index">
            {!selectedCarId &&
                <React.Fragment>
                    <CarFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <CarList cars={cars} onRemoveCar={onRemoveCar} onSelectCarId={onSelectCarId} />
                </React.Fragment>
            }

            {selectedCarId && <CarDetails onBack={() => onSelectCarId(null)} carId={selectedCarId} />}
        </section>
    )
}