import React from 'react'

const Banner = ({ title }) => {
    return (
        <div className='w-full p-8 text-8xl font-bold text-center '>
            <h1>{title}</h1>
        </div>
    )
}

export default Banner