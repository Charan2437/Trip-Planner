"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { useRouter,useSearchParams } from 'next/navigation';
import { foods_items } from "../../../data/plan";

const TestEndpoint = () => {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [plan,setPlan] = useState(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const dataParam = searchParams.get('data');
        if (dataParam) {
            setPlan(JSON.parse(dataParam));
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            setData(foods_items);
        };

        fetchData();
    }, []);

    const handleDownload = async () => {
        const html2pdf = (await import('html2pdf.js')).default;
        const element = document.getElementById('downloadable-content');
        const opt = {
            margin: 1,
            filename: 'placename_plan.pdf',
            image: { type: 'jpeg', quality: 0.98 },
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
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <div id="downloadable-content">
                <div className="section">
                    <h2>Itinerary</h2>
                    <div className="cards-container">
                        {plan && plan.slice(1).map((day, index) => (
                            <div key={index} className="card">
                                <ReactMarkdown>{generateMarkdown(day)}</ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="section">
                    <h2>Foods</h2>
                    <div className="cards-container">
                        {data && data[0].foods.map((item, i) => (
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
                </div>
                <div className="section">
                    <h2>Items</h2>
                    <div className="cards-container">
                        {data && data[1].items.map((item, i) => (
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