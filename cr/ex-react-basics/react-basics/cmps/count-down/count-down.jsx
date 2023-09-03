const { useState, useEffect, useRef } = React
import { utilService } from "../../services/util.service.js"

export function CountDown({ startFrom, onDone }) {

    const [timeLeft, setTimeLeft] = useState(startFrom)
    // Keep interval in ref in order to save data that
    // will survive renders, but won't make the cmp re-render
    const timerIntervalRef = useRef()

    useEffect(() => {
        // When mounted start interval
        timerIntervalRef.current = setInterval(onSetTimeLeft, 1000)
        // When unmounted clear
        return () => clearInterval(timerIntervalRef.current)
    }, [])

    useEffect(() => {
        if (timeLeft) return
        // when there is no time left
        clearInterval(timerIntervalRef.current)
        onDone()
    }, [timeLeft])

    function onSetTimeLeft() {
        setTimeLeft((prevTime) => prevTime - 1)
    }

    return (
        <section className="count-down-container">
            <span>{utilService.padNum(parseInt(timeLeft / 60, 10))}</span>
            <span className={(timeLeft <= 6) ? 'danger' : ''}>{utilService.padNum(parseInt(timeLeft % 60, 10))}</span>
        </section>
    )
}