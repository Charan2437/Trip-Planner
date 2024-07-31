'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { plan } from "../../../data/plan";
import { ThreeDots } from 'react-loader-spinner';

const TestEndpoint = () => {
    const [itineraryData, setItineraryData] = useState(null);
    const [foodsData, setFoodsData] = useState(null);
    const [itemsData, setItemsData] = useState(null);
    const [loadingItinerary, setLoadingItinerary] = useState(false);
    const [loadingFoods, setLoadingFoods] = useState(false);
    const [loadingItems, setLoadingItems] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingItinerary(true);
            setLoadingFoods(true);
            setLoadingItems(true);
            setError(null);
            try {
                const response = await axios.post('http://127.0.0.1:5000/generate-suggestions', {
                    input_text: "ooty",
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setItineraryData(plan.slice(1)); // Assuming the plan data doesn't require fetching
                setFoodsData(response.data[0].foods);
                setItemsData(response.data[1].items);
            } catch (err) {
                setError(err.message);
            }
            setLoadingItinerary(false);
            setLoadingFoods(false);
            setLoadingItems(false);
        };

        fetchData();
    }, []);

    const handleDownload = async () => {
        const html2pdf = (await import('html2pdf.js')).default;
        const element = document.getElementById('downloadable-content');
        const opt = {
            margin: 1,
            filename: 'placename_plan.pdf',
            image: { type: 'jpeg', quality: 2 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    };

    const generateMarkdown = (day) => {
        let markdown = `## ${day.title}\n\n${day.description}\n\n`;
        day.components.forEach(place => {
            markdown +=` ### ${place.displayName}\n${place.description}\n\n;`
        });
        return markdown;
    };

    return (
        <div className="container">
            <h1>Plan and Recommendations</h1>
            {error && <p className="error">{error}</p>}
            <div id="downloadable-content">
                <div className="section">
                    <h2>Itinerary</h2>
                    {loadingItinerary ? (
                        <div className="loader-container">
                            <ThreeDots height="80" width="80" color="#007BFF" ariaLabel="loading-indicator" />
                        </div>
                    ) : (
                        <div className="cards-container">
                            {itineraryData && itineraryData.map((day, index) => (
                                <div key={index} className="card">
                                    <ReactMarkdown>{generateMarkdown(day)}</ReactMarkdown>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="section">
                    <h2>Foods</h2>
                    {loadingFoods ? (
                        <div className="loader-container">
                            <ThreeDots height="80" width="80" color="#007BFF" ariaLabel="loading-indicator" />
                        </div>
                    ) : (
                        <div className="cards-container">
                            {foodsData && foodsData.map((item, i) => (
                                <div key={i} className="card">
                                    <strong>{item.name}</strong>: {item.description}
                                    <div className="image-container">
                                        {item.images[1] && (
                                            <img src={item.images[1]} alt={item.name} className="item-image" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="section">
                    <h2>Items</h2>
                    {loadingItems ? (
                        <div className="loader-container">
                            <ThreeDots height="80" width="80" color="#007BFF" ariaLabel="loading-indicator" />
                        </div>
                    ) : (
                        <div className="cards-container">
                            {itemsData && itemsData.map((item, i) => (
                                <div key={i} className="card">
                                    <strong>{item.name}</strong>: {item.description}
                                    <div className="image-container">
                                        {item.images[1] && (
                                            <img src={item.images[1]} alt={item.name} className="item-image" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <button onClick={handleDownload} className="download-button">Download as PDF</button>
            <style jsx>{`
                .container {
                    padding: 20px;
                    font-family: Arial, sans-serif;
                }
                h1 {
                    text-align: center;
                    margin-bottom: 20px;
                }
                .error {
                    color: red;
                    text-align: center;
                }
                .loader-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 200px; /* Adjust height as needed */
                }
                .section {
                    margin-bottom: 40px;
                }
                .section h2 {
                    text-align: center;
                    margin-bottom: 20px;
                    color: #007BFF;
                }
                .cards-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                }
                .card {
                    background-color: #f9f9f9;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    color: #333;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                }
                .card h3 {
                    margin-bottom: 10px;
                    font-size: 16px;
                    color: #007BFF;
                }
                .card p {
                    margin-bottom: 10px;
                    font-size: 14px;
                    color: #555;
                }
                .place, .item {
                    margin-bottom: 15px;
                }
                .place h4, .item strong {
                    font-size: 14px;
                    color: #333;
                }
                .place p, .item p {
                    font-size: 14px;
                    color: #555;
                }
                .image-container {
                    text-align: center;
                    margin-top: 10px;
                }
                .item-image {
                    width: 100px;
                    height: 100px;
                    margin: 10px auto;
                    display: block;
                    border-radius: 5px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .download-button {
                    display: block;
                    margin: 20px auto;
                    padding: 10px 20px;
                    font-size: 16px;
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    text-align: center;
                }
                .download-button:hover {
                    background-color: #0056b3;
                }
                @media (max-width: 768px) {
                    .card {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default TestEndpoint;