import React, { useState } from 'react'
import Banner from '../components/shared/Banner';
import TaskForm from '../form/TaskForm'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { postRequest } from '../api/api'
import toast from 'react-hot-toast'
import { taskSchema } from '../schema/task.schema'
import NavBar from '../components/shared/NavBar';
import { useTask } from '../context/TaskContext';

const AddTask = () => {
    const { token } = useAuth();
    const navigate = useNavigate()
    const {isProcessing,addTask} = useTask();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(taskSchema)
    })

    const onSubmit = async (data) => {
        const result = await addTask(data)
        if (result?.success) {
            reset()
            navigate("/")
        }
    }
    
    return (
        <>
        <NavBar />
            <Banner title={"Add task"} />
            <div className='p-4 max-w-5xl m-auto'>
                <TaskForm
                    register={register}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    handleTask={onSubmit}
                    name={"Add Task"}
                    isProcessing={isProcessing}
                />
            </div>
        </>
    )
}

export default AddTask