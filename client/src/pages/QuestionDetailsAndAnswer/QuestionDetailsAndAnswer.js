import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../services/api'; // Updated import for API
import './QuestionDetailsAndAnswer.css';

const QuestionDetailsAndAnswer = () => {
    const { questionId } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswer] = useState('');
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchQuestionDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                setUserId(decodedToken.userId); // Set userId from token

                const response = await axios.get(`/question/${questionId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setQuestion(response.data.question);
                setAnswers(response.data.answers);
            } catch (error) {
                console.error('Error fetching question details:', error);
            }
        };

        fetchQuestionDetails();
    }, [questionId]);

    const handlePostAnswer = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                '/answer/create',
                { questionId, content: newAnswer },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setNewAnswer(''); // Clear the input after posting

            // Refresh answers
            const response = await axios.get(`/question/${questionId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAnswers(response.data.answers);
        } catch (error) {
            console.error('Error posting answer:', error);
        }
    };


    if (!question) {
        return <p>Loading...</p>;
    }

    const getAvatarColor = (username) => {
        const colors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a8", "#ff8c33", "#a833ff"];
        const index = username.charCodeAt(0) % colors.length; // Pick a color based on the username's first letter
        return colors[index];
    };

    const getInitial = (username) => {
        return username ? username.charAt(0).toUpperCase() : "?"; // Get first letter
    };

    return (
        <div className="question-details-container">
            <div className="question-header">
                <h2>Question</h2>
                <h3>{question.title}</h3>
                <p>{question.description}</p>
            </div>

            <div className="answers-section">
                <h2>Answer From The Community</h2>
                <div className="answers-list">
                    {answers.map((answer) => (
                        <div key={answer.answer_id} className="answer-item">
                            <div className="answer-user-icon" style={{ backgroundColor: getAvatarColor(answer.username) }}>
                                {getInitial(answer.username)}
                            </div>
                            <div className="answer-content">
                                <p>{answer.content}</p>
                                <p className="answer-username">{answer.username}</p>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="your-answer-section">
                <h2>Your Answer</h2>
                <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Your Answer..."
                />
                <button className="post-answer-button" onClick={handlePostAnswer}>
                    Post Your Answer
                </button>
            </div>
        </div>
    );
};

export default QuestionDetailsAndAnswer;
