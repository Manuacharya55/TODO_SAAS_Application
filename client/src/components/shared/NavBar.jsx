import React from 'react'

import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const NavBar = () => {
    const { deleteToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        deleteToken();
        navigate('/login');
    };

    return (
        <header className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <nav className="flex items-center gap-6 px-8 py-4 bg-white shadow-xl rounded-2xl border border-gray-100 backdrop-blur-md bg-white/90">
                
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        `text-sm font-semibold transition-colors hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-600'}`
                    }
                >
                    Tasks
                </NavLink>

                <NavLink 
                    to="/task" 
                    className={({ isActive }) => 
                        `text-sm font-semibold transition-colors hover:text-blue-600 ${isActive ? 'text-blue-600' : 'text-gray-600'}`
                    }
                >
                    Add Task
                </NavLink>

                {/* Vertical Divider */}
                <div className="w-px h-5 bg-gray-200"></div>

                <button 
                    onClick={handleLogout}
                    className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
                >
                    Logout
                </button>
            </nav>
        </header>
    );
};

export default NavBar;