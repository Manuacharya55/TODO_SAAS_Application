import React from 'react'
import InputFeild from '../components/ui/InputFeild'
import Button from '../components/ui/Button'
import { NavLink } from 'react-router-dom'

const LoginForm = ({register,errors,handleSubmit,handleLogin,isProcessing}) => {
    return (
        <form onSubmit={handleSubmit(handleLogin)}>
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
                name="Login"
                isProcessing={isProcessing}
            />
            <p className='mt-2'>
            Don't have account ? <NavLink to="/register" className="text-blue-600">Register Here</NavLink>
          </p>
        </form>
    )
}

export default LoginForm;