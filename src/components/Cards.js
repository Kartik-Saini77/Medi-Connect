import React, { useState, useEffect } from "react";
import { Link } from "react-router";

const Cards = () => {
    const [requests, setRequests] = useState([]);
    const [isVolunteer, setIsVolunteer] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch("http://localhost:3000/requests", {
                    credentials: "include"
                });
                if (response.status === 403) {
                    setError("Access forbidden, you must be a volunteer to view requests");
                    setIsVolunteer(false);
                    return;
                }
                else if (!response.ok) {
                    throw new Error("Failed to fetch requests");
                }
    
                const data = await response.json();
                setRequests(data);
                setIsVolunteer(true);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchRequests();
    }, []);

    const handleStatusUpdate = async (requestId, newStatus) => {
        try {
            const response = await fetch("http://localhost:3000/requests/update-status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    requestId,
                    status: newStatus
                })
            });

            if (!response.ok) {
                throw new Error("Failed to update request status");
            }

            // Update the local state
            setRequests(prevRequests => 
                prevRequests.map(req => 
                    req._id === requestId 
                    ? { ...req, status: newStatus }
                    : req
                )
            );
        } catch (err) {
            setError(err.message);
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'text-yellow-600';
            case 'in_progress': return 'text-blue-600';
            case 'resolved': return 'text-green-600';
            default: return 'text-gray-600';
        }
    };

    // if (error) return <div className="text-red-600 text-center">{error}</div>;

    if (!isVolunteer) {
        return (
            <div className="min-h-[400px] max-w-md mx-auto my-8 flex flex-col items-center justify-center p-8 border-2 border-gray-200 rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
                <svg 
                    className="w-16 h-16 text-blue-500 mb-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
                <p className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                    Become a volunteer to view requests
                </p>
                <p className="text-gray-600 mb-6 text-center">
                    Join our community of volunteers and help those in need
                </p>
                <Link 
                    to="/volunteers"
                    className="group relative inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg overflow-hidden hover:bg-blue-700 transition-all duration-300 ease-out"
                >
                    <span className="relative">
                        Join as Volunteer
                        <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </span>
                </Link>
            </div>
        );
    }

    return (
        <main className="cards_container">
            {requests.map((request, index) => (
                <div key={index} className="card bg-white p-6 rounded-lg shadow-md">
                    <div className="card_content">
                        <h1 className="card_name text-xl font-bold mb-2">{request.content}</h1>
                        {/* Access user details */}
                        <h2 className="card_name text-gray-600 mb-2">{request.user?.username}</h2>
                        <p className="text-gray-600 mb-3">Phone: {request.user?.phone}</p>
                        <p className="text-gray-800 mb-3">{request.content}</p>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500">
                                {new Date(request.submittedAt).toLocaleString()}
                            </span>
                            <span className={`${getStatusColor(request.status)} font-medium`}>
                                {request.status.replace('_', ' ').toUpperCase()}
                            </span>
                        </div>
                        {isVolunteer && (
                            <>
                                {request.status === 'pending' && (
                                    <button onClick={() => handleStatusUpdate(request._id, 'in_progress')} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                                        Reach Out!
                                    </button>
                                )}
                                {request.status === 'in_progress' && (
                                    <button onClick={() => handleStatusUpdate(request._id, 'resolved')} className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors">
                                        Mark as completed
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            ))}
        </main>
    );
};

export default Cards;
