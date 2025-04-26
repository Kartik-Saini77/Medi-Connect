import React from "react";
import { useState, useEffect } from "react";
import Data from "./data.json";

const Cards = () => {
    const [requests, setRequests] = useState([]);
    const [isVolunteer, setIsVolunteer] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequests = async () => {
            // try {
            //     const response = await fetch("http://localhost:3000/requests", {
            //         credentials: "include"
            //     });
            //     if (!response.ok) throw new Error("Failed to fetch requests");
                
            //     const data = await response.json();
            //     setRequests(data);
            // } catch (err) {
            //     setError(err.message);
            // }
            setRequests(Data);                                                      // Mock data for testing
        };

        fetchRequests();
    }, []);

    const handleStatusUpdate = async (requestId, newStatus) => {
        try {
            // const response = await fetch("http://localhost:3000/requests/update-status", {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     credentials: "include",
            //     body: JSON.stringify({
            //         requestId,
            //         status: newStatus
            //     })
            // });
        
            // if (!response.ok) {
            //     throw new Error("Failed to update request status");
            // }
        
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

    if (error) return <div className="text-red-600 text-center">{error}</div>;

    return (
        <main className="cards_container">
            {requests.map((request, index) => (
                <div key={index} className="card bg-white p-6 rounded-lg shadow-md">
                    <div className="card_content">
                        <h1 className="card_name text-xl font-bold mb-2">{request.name}</h1>
                        <h2 className="card_roll text-gray-600 mb-2">{request.roll}</h2>
                        <p className="text-gray-600 mb-3">Phone: {request.phone}</p>
                        <p className="text-gray-800 mb-3">{request.content}</p>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500">
                                {new Date(request.submittedAt).toLocaleString()}
                            </span>
                            <span className={`font-medium ${getStatusColor(request.status)}`}>
                                {request.status.replace('_', ' ').toUpperCase()}
                            </span>
                        </div>
                        {isVolunteer && (
                            <>
                                {request.status === 'pending' && (
                                    <button onClick={() => handleStatusUpdate(request._id, 'in_progress')}  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                                        Reach Out!
                                    </button>
                                )}
                                {request.status === 'in_progress' && (
                                    <button onClick={() => handleStatusUpdate(request._id, 'resolved')}  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors">
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