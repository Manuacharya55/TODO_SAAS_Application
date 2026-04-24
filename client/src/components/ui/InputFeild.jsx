import React from 'react'

const InputFeild = ({ type = "text", name, placeholder, register, error }) => {

    return (
        <div className='w-full flex flex-col'>
            <label htmlFor={name}>{placeholder}</label>
            <input type={type} id={name} {...register(name)}
                className='border-1 border-zinc-200 p-3 rounded mt-2 mb-1'
            />
            {error[name] && error[name].message && <span className='text-red-600 text-sm'>{error[name].message}</span>}
        </div>
    )
}

export default InputFeild