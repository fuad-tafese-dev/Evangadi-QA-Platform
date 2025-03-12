import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user'));
    const username = user?.username || "User";

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await api.get('/question', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const sortedQuestions = response.data.questions.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
                setQuestions(sortedQuestions);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching questions");
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [navigate]);

    // Function to generate a random color
    const getRandomColor = () => {
        const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFC300", "#8E44AD", "#16A085", "#E74C3C", "#2ECC71", "#3498DB"];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="home-page">
            <div className="header-bar">
                <h1 className="welcome-message">Welcome: {username}</h1>
                <Link to="/ask-question" className="ask-question-button">Ask Question</Link>
            </div>

            <div className="content-container">
                <h2 className="questions-title">Questions</h2>

                {loading && <div className="loading-state">Loading questions...</div>}
                {error && <div className="error-state">{error}</div>}

                <div className="question-list">
                    {questions.map((question) => {
                        const avatarColor = getRandomColor(); // Assign random color for each question
                        return (
                            <div key={question.question_id} className="question-card">
                                <div className="user-avatar" style={{ backgroundColor: avatarColor }}>
                                    {question.username?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <div className="question-content">
                                    <div className="question-meta">
                                        <span className="username">@{question.username}</span>
                                    </div>
                                    <Link to={`/question/${question.question_id}`} className="question-text">
                                        <h3>{question.title}</h3>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
