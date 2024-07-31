'use client';

import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../connection'; // Adjust the import path as needed
import axios from 'axios';
import "./loading.css"

function AdminPage() {
  const [responses, setResponses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const responsesPerPage = 10;

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'responses'));
        const responsesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })).sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
        setResponses(responsesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching responses:', error);
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'responses', id));
      setResponses(responses.filter(response => response.id !== id));
      setSelectedResponse(null);
    } catch (error) {
      console.error('Error deleting response:', error);
    }
  };

  const handleSend = async () => {
    if (selectedResponse) {
        try {
            const response = await axios.post('http://127.0.0.1:5000/send-email', {
                email: selectedResponse.email,
                message: replyMessage,
            });

            if (response.data.status === 'success') {
                await updateDoc(doc(db, 'responses', selectedResponse.id), {
                    status: 'sent',
                    replyMessage,
                });
                
                setResponses(responses.map(response => response.id === selectedResponse.id ? { ...response, status: 'sent', replyMessage } : response));
                setSelectedResponse(null);
            } else {
                console.error('Error:', response.data.message);
                alert('Failed to send email: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error sending response:', error);
            alert('An error occurred while sending the email.');
        }
    }
};

const handleGenerate = async () => {
  if (!selectedResponse) return;
  
  try {
    const response = await axios.post('http://localhost:5000/generate-email', {
      message: selectedResponse.message,
      user_name: selectedResponse.email.split('@')[0], // Example to extract user name from email
    });

    if (response.data.status === 'success') {
      setReplyMessage(response.data.generated_response);
    } else {
      alert('Failed to generate response: ' + response.data.message);
    }
  } catch (error) {
    console.error('Error generating response:', error);
    alert('Error generating response');
  }
};

  const handleCardClick = (response) => {
    setSelectedResponse(response);
    setReplyMessage(response.replyMessage || '');
  };

  const closePopup = () => {
    setSelectedResponse(null);
    setReplyMessage('');
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && (currentPage * responsesPerPage) < responses.length) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedResponses = responses.slice((currentPage - 1) * responsesPerPage, currentPage * responsesPerPage);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 pt-36 relative">
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">
          Responses
        </h1>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {paginatedResponses.map(response => (
              <div
                key={response.id}
                className={`p-4 rounded-lg border ${response.status === 'sent' ? 'border-green-500' : 'border-red-500'} bg-neutral-950 text-white cursor-pointer`}
                onClick={() => handleCardClick(response)}
              >
                <h2 className="text-xl font-semibold">{response.email}</h2>
                <p className="mt-2">{response.message}</p>
                <p className="mt-2 text-sm text-neutral-500">
                  {new Date(response.timestamp.seconds * 1000).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between mt-8">
          <button className="px-4 py-2 rounded-lg bg-gray-700 text-white" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
            Previous
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-700 text-white" onClick={() => handlePageChange('next')} disabled={(currentPage * responsesPerPage) >= responses.length}>
            Next
          </button>
        </div>
      </div>

      {selectedResponse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closePopup}>
              &times;
            </button>
            <h2 className="text-xl font-semibold">{selectedResponse.email}</h2>
            <p className="mt-2">{selectedResponse.message}</p>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply here..."
              className="mt-4 p-2 w-full border rounded-lg"
              rows={4}
              style={{color: 'black'}}
            ></textarea>
            <div className="flex justify-end space-x-4 mt-4">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={() => handleDelete(selectedResponse.id)}>
                Delete
              </button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg" onClick={handleGenerate}>
                Generate
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${selectedResponse.status === 'sent' ? 'bg-gray-500' : 'bg-blue-500 text-white'}`}
                onClick={handleSend}
                disabled={selectedResponse.status === 'sent'}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;