import { AnimalPreview } from "./animal-preview.jsx"


export function AnimalList({ animalInfos }) {
    return (
        <section className="animals-list-container">
            <h2>Rare animals</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Animal</th>
                        <th>Count</th>
                        <th>Search</th>
                    </tr>
                </thead>

                <tbody>
                    {animalInfos.map(animal => <AnimalPreview
                        key={animal.type}
                        animal={animal}
                    />)}
                </tbody>
            </table>
        </section>
    )
}