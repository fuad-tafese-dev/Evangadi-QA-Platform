import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './AskQuestionPage.css';

const AskQuestionPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const isAuthenticated = !!localStorage.getItem('token');

    const handlePostQuestion = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            alert('You must be logged in to ask a question.');
            navigate('/login');
            return;
        }

        if (!title || !description) {
            alert('Please fill in both title and description.');
            return;
        }

        try {
            const response = await api.post('/question/create', { title, description });

            if (response.status === 201) {
                alert('Your question has been posted successfully!');
                navigate('/home'); // Redirect to home page after posting
            }
        } catch (error) {
            console.error('Error posting question:', error);
            alert('Failed to post your question. Please try again.');
        }
    };

    return (
        <div className="ask-question-container">
            <h2>Ask a Question</h2>

            <div className="instructions">
                <h3>Guidelines for Asking a Good Question</h3>
                <ul>
                    <li>Summarize your problem in a one-line title.</li>
                    <li>Describe your problem in more detail.</li>
                    <li>Explain what you tried and what you expected to happen.</li>
                    <li>Review your question and post it to the site.</li>
                </ul>
            </div>

            <form className="ask-question-form" onSubmit={handlePostQuestion}>
                <label>Question Title (max 200 characters):</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={200}
                    placeholder="Enter a short and clear question title"
                    required
                />

                <label>Question Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your problem in detail..."
                    required
                />

                <button type="submit">Post Your Question</button>
            </form>
        </div>
    );
};

export default AskQuestionPage;
