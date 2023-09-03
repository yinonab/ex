import { carService } from "../services/car.service.js"

const { useState, useEffect } = React

export function CarDetails({ carId, onBack }) {

    const [car, setCar] = useState(null)

    useEffect(()=>{
        carService.get(carId).then(setCar)
    }, [])

    if (!car) return <div>Loading...</div>
    return (
        <section className="car-details">
            <h1>Car Vendor: {car.vendor}</h1>
            <h1>Car Speed: {car.maxSpeed}</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}