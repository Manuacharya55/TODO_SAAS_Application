import React from 'react'
import TextArea from '../components/ui/TextArea'
import InputFeild from '../components/ui/InputFeild'
import Button from '../components/ui/Button'

const TaskForm = ({register,errors,handleSubmit,handleTask,name,isProcessing}) => {
  return (
    <form onSubmit={handleSubmit(handleTask)}>
            <InputFeild
                type="text"
                name="name"
                placeholder="enter your task"
                register={register}
                error={errors}
            />
            <TextArea
                name="description"
                placeholder="enter your description"
                register={register}
                error={errors}
            />
            <Button
                name={name}
                isProcessing={isProcessing}
            />

        </form>
  )
}

export default TaskForm