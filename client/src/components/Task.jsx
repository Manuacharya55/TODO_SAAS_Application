import React from 'react'

// import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'; // Optional: if you use heroicons

const Task = ({ task, onStatusChange, onEdit, onDelete }) => {
    const statusStyles = {
        completed: "bg-green-100 text-green-800 border-green-200",
        pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
        default: "bg-gray-100 text-gray-800 border-gray-200"
    };

    const currentStyle = statusStyles[task.status] || statusStyles.default;

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200 mb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Left Section: Info */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {task.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                        {task.description}
                    </p>
                </div>

                {/* Right Section: Actions */}
                <div className="flex items-center gap-3">
                    
                    {/* Status Dropdown */}
                    <select 
                        value={task.status}
                        onChange={(e) => onStatusChange(task.id, e.target.value)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${currentStyle}`}
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>

                    <div className="flex items-center border-l pl-3 gap-2">
                        <button 
                            onClick={() => onEdit(task.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Task"
                        >
                            edit
                        </button>

                        <button 
                            onClick={() => onDelete(task.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Task"
                        >
                            delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Task;