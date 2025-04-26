import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function VolunteerForm() {
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreed) {
            setError('You must agree to the declaration');
            return;
        }

        setIsLoading(true);
        try {
            // const response = await fetch('http://localhost:3000/become-volunteer', {
            //     method: 'POST',
            //     credentials: 'include',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to become a volunteer');
            // }

            navigate('/requests');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100 px-6">
            <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-center mb-8">Become a Volunteer</h2>
                
                <div className="mb-8 p-6 bg-gray-50 rounded">
                    <h3 className="text-xl font-semibold mb-4">Volunteer Declaration</h3>
                    <p className="text-base text-gray-600 mb-4 leading-relaxed">
                        I hereby declare that I will:
                        <br/>• Responsibly assist students with their medical needs
                        <br/>• Maintain confidentiality of all information
                        <br/>• Respond promptly to requests
                        <br/>• Follow the platform's guidelines
                    </p>
                </div>

                <div className="mb-8">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="mr-3 h-5 w-5"
                        />
                        <span className="text-base">I agree to the declaration and terms</span>
                    </label>
                </div>

                {error && (
                    <div className="mb-6 text-red-500 text-base text-center">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={!agreed || isLoading}
                    className={`w-full py-3 px-6 rounded-lg text-lg font-medium ${
                        agreed && !isLoading
                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                            : 'bg-gray-300 cursor-not-allowed text-gray-500'
                    }`}
                >
                    {isLoading ? 'Processing...' : 'Become a Volunteer'}
                </button>
            </div>
        </div>
    );
}