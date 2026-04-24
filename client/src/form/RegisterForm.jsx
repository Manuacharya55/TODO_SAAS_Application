import React from 'react'
import InputFeild from '../components/ui/InputFeild'
import Button from '../components/ui/Button'
import { NavLink } from 'react-router-dom'

const RegisterForm = ({ register, errors, handleSubmit, handleLogin,isProcessing }) => {
    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <InputFeild
                type="text"
                name="name"
                placeholder="enter your full namae"
                register={register}
                error={errors}
            />
            <InputFeild
                type="email"
                name="email"
                placeholder="enter your email"
                register={register}
                error={errors}
            />
            <InputFeild
                type="password"
                name="password"
                placeholder="enter your password"
                register={register}
                error={errors}
            />
            <Button
                name="Register"
                isProcessing={isProcessing}
            />
            <p className='mt-2'>
                Already have account ? <NavLink to="/login" className="text-blue-600">Login Here</NavLink>
            </p>
        </form>
    )
}

export default RegisterForm;