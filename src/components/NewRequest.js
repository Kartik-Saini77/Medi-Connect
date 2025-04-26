import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function NewRequest() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        roll: '',
        content: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // const response = await fetch('http://localhost:3000/requests', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     credentials: 'include',
            //     body: JSON.stringify(formData)
            // });

            // const data = await response.json();

            // if (!response.ok) {
            //     throw new Error(data.message || 'Failed to submit request');
            // }

            navigate('/requests');
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-gray-100 px-4 py-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-center mb-6">New Medical Request</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="roll" className="block text-sm font-medium text-gray-700 mb-1">
                            Roll Number
                        </label>
                        <input type="text" id="roll" name="roll" value={formData.roll} onChange={handleChange} className="w-full p-2 border rounded-md" placeholder="Enter your roll number" required/>
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                            Medical Issue
                        </label>
                        <textarea id="content" name="content" value={formData.content} onChange={handleChange} rows="4" className="w-full p-2 border rounded-md" placeholder="Describe your medical issue" required/>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button type="submit" disabled={isLoading} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300">
                        {isLoading ? 'Submitting...' : 'Submit Request'}
                    </button>
                </form>
            </div>
        </div>
    );
}