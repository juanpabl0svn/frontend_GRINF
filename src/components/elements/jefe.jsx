import React from 'react'
import { useLocation } from 'react-router-dom'

const Jefe = () => {

    const page = useLocation()

    return (
    <div>
        <h1>Jefe</h1>
    </div>
    )
}

export default Jefe
