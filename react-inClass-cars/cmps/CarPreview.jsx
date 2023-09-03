export function CarPreview({ car }) {
    return (
        <article className="car-preview">
            <h2>Car Vendor: {car.vendor}</h2>
            <h4>Car Speed: {car.maxSpeed}</h4>
            <img src={`../assets/img/${car.vendor}.png`} alt="" />
        </article>
    )
}
