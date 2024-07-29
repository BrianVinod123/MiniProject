import React, { useState } from 'react';
import axios from 'axios';
import ResultContentBox from '../components/resultcontentbox';
import PredictBackground from './utils/PredictBackground.jpg'

const PredictPage = () => {
    const [drugA, setDrugA] = useState("");
    const [drugB, setDrugB] = useState("");
    const [result, setResult] = useState(null);

    const handleSubmit = async () => {
        console.log({ 'drugA': drugA, 'drugB': drugB });
        const response = await axios({ method: 'post', url: 'http://127.0.0.1:5000/Predict', data: { 'drugA': drugA, 'drugB': drugB } }).catch(error=>{
            alert('Prediction data not available')
            return error
        });
        if (response.status === 200) {
            const data=response.data
            setResult(data)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ 
            backgroundImage: `url(${PredictBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Predict Drug Interaction</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="drugA">Enter Drug A</label>
                    <input
                        id="drugA"
                        type="text"
                        required={true}
                        onChange={(e) => { setDrugA(e.target.value) }}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="drugB">Enter Drug B</label>
                    <input
                        id="drugB"
                        type="text"
                        required={true}
                        onChange={(e) => { setDrugB(e.target.value) }}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Submit
                </button>
                <ResultContentBox content={result}></ResultContentBox>
            </div>
        </div>
    );
};

export default PredictPage;
