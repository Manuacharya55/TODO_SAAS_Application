import React from 'react'
import Loader from '../shared/Loader'

const Button = ({ name, isProcessing }) => {
    return (
        <button
            type='submit'
            disabled={isProcessing}
            className='w-full p-3 bg-zinc-900 rounded text-white mt-2 flex items-center justify-center'
        >
            {isProcessing ? <Loader size="sm" /> : name}
        </button>
    )
}

export default Button