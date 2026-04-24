
import Banner from '../components/shared/Banner';
import { getRequest, patchRequest } from '../api/api'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import TaskForm from '../form/TaskForm'
import { taskSchema } from '../schema/task.schema'
import toast from 'react-hot-toast'
import { useTask } from '../context/TaskContext';
import Loader from '../components/shared/Loader';

const EditTask = () => {
  const { token } = useAuth();
  const { editTask, isProcessing } = useTask()
  const [loading, setLoading] = useState(true)
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      description: ""
    }
  })

  const fetchTask = async () => {
    if (!token || !id) return
    setLoading(true)
    try {
      const response = await getRequest(`/tasks/${id}`, token)
      if (response.success) {
        toast.success(response.message)
        setValue("name", response.data.name)
        setValue("description", response.data.description)
        setValue("status", response.data.status)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTask()
  }, [token])

  if (loading) {
    return <Loader fullPage={true} size="lg" />
  }

  const onSubmit = async (data) => {
    const result = await editTask(id, data)
    if (result?.success !== false) {
      navigate("/")
    }
  }

  return (
    <>
      <Banner title={"Edit task"} />
      <div className='p-4 max-w-5xl m-auto'>
        <TaskForm
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          handleTask={onSubmit}
          name={"Update Task"}
          isProcessing={isProcessing}
        />
      </div>
    </>
  )
}

export default EditTask