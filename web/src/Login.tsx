
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                name: name,
            });
            console.log('Response:', response.data);
            navigate('/chat');  
        } catch (error) {

            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="p-10">

                <h2 className="text-4xl font-extrabold">LOGIN</h2>

                <div className="mb-6 mt-5">
                    <label htmlFor="large-input" className="block mb-2 text-sm font-medium">Enter Name</label>
                    <input
                        type="text"
                        id="large-input"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}  
                        className="block w-full p-4  text-black  rounded-lg border border-gray-600"
                    />
                </div>
                <button
                    className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                    type="button"
                    onClick={handleSubmit} 
                >
                    Submit
                </button>
            </div>
        </>
    )
}
