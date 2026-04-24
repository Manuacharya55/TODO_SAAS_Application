import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_URL;


axios.defaults.baseURL = BASE_URL;


export const getRequest = async (url, token = null) => {
    const response = await axios.get(url, {
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    });
    return response.data;
};


export const postRequest = async (url, data, token) => {
    try {
        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
        });
        toast.success(response.data.message)
        return response.data;
    } catch (error) {
        toast.error(error.response.data.message)
        return {
            success: false,
            message: error.response.data.message,
        }
    }
};


export const patchRequest = async (url, data, token = null) => {
    try {
        const response = await axios.patch(url, data, {
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    });
    toast.success(response.data.message)
    return response.data;
    } catch (error) {
        toast.error(error.response.data.message)
        return {
            success: false,
            message: error.response.data.message,
        }
    }
};


export const deleteRequest = async (url, token = null) => {
    try {
        const response = await axios.delete(url, {
        headers: {
            "Content-Type": "application/json",
            "auth-token": token
        },
    });
    toast.success(response.data.message)
    return response.data;
    } catch (error) {
        toast.error(error.response.data.message)
        return {
            success: false,
            message: error.response.data.message,
        }
    }
};
