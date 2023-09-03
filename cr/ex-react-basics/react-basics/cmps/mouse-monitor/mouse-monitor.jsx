const { useState, useEffect } = React

export function MouseMonitor() {
    // Declare state
    const [isOn, setIsOn] = useState(true)
    const [pos, setPos] = useState({
        x: 0,
        y: 0
    })

    // Toggle event listener according to isOn / cmpUnmount
    useEffect(() => {
        if (isOn) addMouseListener()
        else removeMouseListener()

        return () => {
            if (isOn) removeMouseListener()
        }
    }, [isOn])

    // Toggle isOn - some might add and remove listener here!!!
    function toggleIsOn() {
        setIsOn((prevIsOn) => (!prevIsOn))
    }

    // Declare mouse add / remove listeners
    function addMouseListener() {
        document.addEventListener('mousemove', updatePos)
    }
    function removeMouseListener() {
        document.removeEventListener('mousemove', updatePos)
    }

    // Update state mouse position
    function updatePos({ clientX, clientY }) {
        setPos({
            x: clientX,
            y: clientY
        })
    }


    // Rendering
    return (
        <section className="mouse-monitor-container">
            <h2>Mouse Position</h2>

            <div>
                x: {pos.x},
                y: {pos.y}
            </div>

            <button onClick={toggleIsOn}>{isOn ? 'Pause' : 'Resume'}</button>
        </section>
    )
}