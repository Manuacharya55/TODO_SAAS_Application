import React, { useEffect, useState } from 'react'
import Task from '../components/Task'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Banner from '../components/shared/Banner'
import { useTask } from '../context/TaskContext'
import Loader from '../components/shared/Loader'

const AllTasks = () => {
    const navigate = useNavigate()
    const { token } = useAuth()
    const { tasks, loading, fetchTasks, editTaskStatus,  deletetTask } = useTask()

    const handleEdit = async (id) => {
        if (!token || !id) return
        navigate(`/task/${id}`)
    }


    useEffect(() => {
        if (token) {
            fetchTasks(token)
        }
    }, [token]);

    if (loading) {
        return <Loader fullPage />
    }
    return (
        <>
            <Banner
                title={"All Tasks"}
            />
            <div className='p-4 max-w-5xl m-auto'>
                <div className='flex justify-between '>
                    <p className='text-2xl my-3 font-semibold text-balance'>{tasks?.length} Tasks</p>
                    <button onClick={()=>navigate("/task")} className='p-2 bg-zinc-800 rounded text-white h-fit'>
                        add task
                    </button>
                </div>
                {tasks?.length === 0 ? <p>no tasks yet</p> : <div id="tasks-holder">
                    {
                        tasks?.map(task => (
                            <Task
                                task={task}
                                key={task.id}
                                onStatusChange={editTaskStatus}
                                onEdit={handleEdit}
                                onDelete={deletetTask}
                            />
                        ))
                    }
                </div>}
            </div>
        </>
    )
}

export default AllTasks