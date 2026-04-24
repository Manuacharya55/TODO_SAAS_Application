import { createContext, useContext, useState } from "react";
import { deleteRequest, getRequest, patchRequest, postRequest } from "../api/api";
import { useAuth } from "./AuthContext";


const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const { token } = useAuth();

    const addTask = async (data) => {
        if (!token || !data) return
        setIsProcessing(true)
        try {
            const response = await postRequest("/tasks/", data, token)

            if (response.success) {
                setTasks(prevTasks => [...prevTasks, response.data]);
                return response
            }

        }finally {
            setIsProcessing(false)
        }
    }

    const editTask = async (id, data) => {
        if (!token || !data || !id) return
        setIsProcessing(true)
        try {
            const response = await patchRequest(`/tasks/${id}/`, data, token)

            if (response.success) {
                setTasks(prevTasks => prevTasks.map(task => task.id === id ? response.data : task));
            }

        }finally {
            setIsProcessing(false)
        }
    }

    const editTaskStatus = async (id, data) => {
        if (!token || !data || !id) return
        setIsProcessing(true)
        try {
            const response = await patchRequest(`/tasks/${id}/`, { status: data }, token)

            if (response.success) {

                setTasks(prevTasks => prevTasks.map(task => task.id === id ? response.data : task));
            }

        } finally {
            setIsProcessing(false)
        }
    }

    const deletetTask = async (id) => {
        if (!token || !id) return
        setIsProcessing(true)
        try {
            const response = await deleteRequest(`/tasks/${id}`, token)

            if (response.success) {

                setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            }

        }finally {
            setIsProcessing(false)
        }
    }

    const fetchTasks = async (token) => {
        if (!token) return
        setLoading(true)
        try {
            const response = await getRequest(`/tasks/`, token)

            if (response.success) {

                setTasks(response.data);
            }

        }finally {
            setLoading(false)
        }
    }


    return (
        <TaskContext.Provider value={{ task, tasks, isProcessing, error, loading, addTask, editTask, editTaskStatus, deletetTask, fetchTasks }}>
            {children}
        </TaskContext.Provider>
    );
};


export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTask must be used inside an <TaskProvider>");
    }
    return context;
};

export default TaskContext;
