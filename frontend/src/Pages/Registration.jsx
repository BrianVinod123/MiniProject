import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginPage.css';

const RegistrationPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail]=useState("")
    const [age,setAge]=useState("")

    const navigate = useNavigate();
    
    const handleSubmit = async () => {
        console.log({ 'username': username, 'password': password });
        const response = await axios({ method: 'post', url: 'http://127.0.0.1:5000/CreateUser', data: { 'username': username, 'password': password,"age":age,"email":email } }).catch(error=>{
            alert('Username already exists')
            return error
        });
        if (response.status === 200) {
            alert('Username created successfully')
            navigate("/Predict")
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Registration</h2>
                <div className='mb-4'>
                    <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        required={true}
                        onChange={(e) => { setUsername(e.target.value) }}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className='mb-4'>
                    <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        required={true}
                        onChange={(e) => { setPassword(e.target.value) }}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className='mb-4'>
                    <label className="block text-gray-700 mb-2" htmlFor="password">Email</label>
                    <input
                        id="email"
                        type="text"
                        required={true}
                        onChange={(e) => { setEmail(e.target.value) }}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className='mb-4'>
                    <label className="block text-gray-700 mb-2" htmlFor="password">Age</label>
                    <input
                        id="age"
                        type="password"
                        required={true}
                        onChange={(e) => { setAge(e.target.value) }}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default RegistrationPage;
