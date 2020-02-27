import React, { useState, useEffect, useCallback } from 'react'
let count = 0

function App() {
    const [val, setVal] = useState(0)
    const getData = useCallback(() => {
        setTimeout(() => {
            setVal(val+1)
            count++
        }, 500)
    },[])
    return <Child val={val} getData={getData} />
}

function Child({ val, getData }) {
    useEffect(() => {
        getData()
    }, [getData])

    return <div>{val}</div>
}

export default App