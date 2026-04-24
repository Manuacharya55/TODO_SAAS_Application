
import LoginForm from '../form/LoginForm'
import { loginSchema } from '../schema/auth.schema'
import { postRequest } from '../api/api'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import Banner from '../components/shared/Banner'

const Login = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveToken } = useAuth();
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema)
  })


  const handleLogin = async (data) => {
    setIsProcessing(true)
    try {
      const response = await postRequest("/auth/login",data,"")
      if (response.success) {
        saveToken(response.data.token)
        navigate("/")
      }
    }finally {
      setIsProcessing(false)
      reset()
    }
  }

  return (
    <>
      <Banner
        title={"Login Here"}
      />
      <div className='p-4 max-w-5xl m-auto'>
        <LoginForm
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          handleLogin={handleLogin}
          isProcessing={isProcessing}
        />
      </div>
    </>
  )
}

export default Login