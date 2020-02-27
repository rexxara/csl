import React, { useState, useEffect, useCallback } from 'react'

const app = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const handler = useCallback((ev) => {
        const { clientX, clientY } = ev
        setPos({ x: clientX, y: clientY })
    }, [setPos])

    useEffect(() => {
        document.body.addEventListener('mousemove', handler)
        return () => document.body.removeEventListener('mousemove', handler)
    }, [])
    const Dom = () => <div>x:{pos.x},y:{pos.y}</div>
    return [Dom, pos]
}
export default app