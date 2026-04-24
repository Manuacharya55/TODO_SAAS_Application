import Banner from '../components/shared/Banner';
import RegisterForm from '../form/RegisterForm';
import toast from 'react-hot-toast';

import { postRequest } from '../api/api';
import { registerSchema } from '../schema/auth.schema';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


const Register = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const { saveToken } = useAuth();
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(registerSchema)
  })


  const handleLogin = async (data) => {
    setIsProcessing(true)
    try {
      const response = await postRequest("/auth/register", data, "")
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
        <RegisterForm
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

export default Register