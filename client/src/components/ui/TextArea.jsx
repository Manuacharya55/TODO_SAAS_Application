import React from 'react'

const TextArea = ({name,placeholder,register,error}) => {
    return (
        <div className='w-full flex flex-col'>
            <label htmlFor={name}>{placeholder}</label>
            <textarea placeholder='enter task description'
                className='border-1 border-zinc-200 p-3 rounded mt-2 mb-1 resize-none h-32'
                {...register(name)}
                id={name}
            ></textarea>
            {error[name] && error[name].message && <span className='text-red-600'>{error[name].message}</span>}
        </div>
    )
}

export default TextArea