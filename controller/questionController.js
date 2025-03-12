const connection = require("../db/dbConfig");

const createQuestion = async (req, res) => {
    const { title, description, tags } = req.body;
    const userId = req.user.userId;

    if (!userId) {
        return res.status(400).json({ message: "User ID is missing." });
    }

    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required." });
    }

    const tagsValue = (tags !== undefined && tags !== null) ? String(tags) : null;

    try {
        await connection.execute(
            "INSERT INTO Questions (user_id, title, description, tags) VALUES (?, ?, ?, ?)",
            [userId, title, description, tagsValue]
        );

        res.status(201).json({ message: "Question posted successfully!" });
    } catch (error) {
        console.error("Error posting question:", error);
        if (error.message.includes("Bind parameters must not contain undefined")) {
            return res.status(400).json({ message: "Some required fields are missing or invalid." });
        }
        res.status(500).json({ message: "Internal server error." });
    }
};

const getAllQuestions = async (req, res) => {
    try {
        const [questions] = await connection.execute(
            "SELECT q.question_id, q.title, q.description, q.tags, q.created_at, u.username FROM Questions q JOIN Users u ON q.user_id = u.user_id ORDER BY q.created_at DESC"
        );

        res.status(200).json({ questions });
    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const getQuestionWithAnswers = async (req, res) => {
    const { questionId } = req.params;

    try {
        const [question] = await connection.execute(
            "SELECT q.*, u.username FROM Questions q JOIN Users u ON q.user_id = u.user_id WHERE q.question_id = ?",
            [questionId]
        );

        if (question.length === 0) {
            return res.status(404).json({ message: "Question not found." });
        }

        const [answers] = await connection.execute(
            "SELECT a.answer_id, a.content, a.created_at, u.username FROM Answers a JOIN Users u ON a.user_id = u.user_id WHERE a.question_id = ?",
            [questionId]
        );

        res.status(200).json({ question: question[0], answers });
    } catch (error) {
        console.error("Error fetching question details:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const updateQuestion = async (req, res) => {
    const { questionId } = req.params;
    const { title, description, tags } = req.body;
    const userId = req.user.userId;

    try {
        const [question] = await connection.execute(
            "SELECT * FROM Questions WHERE question_id = ? AND user_id = ?",
            [questionId, userId]
        );

        if (question.length === 0) {
            return res.status(403).json({ message: "You are not authorized to update this question." });
        }

        await connection.execute(
            "UPDATE Questions SET title = ?, description = ?, tags = ? WHERE question_id = ?",
            [title, description, tags, questionId]
        );

        res.status(200).json({ message: "Question updated successfully!" });
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const deleteQuestion = async (req, res) => {
    const { questionId } = req.params;
    const userId = req.user.userId;

    try {
        const [question] = await connection.execute(
            "SELECT * FROM Questions WHERE question_id = ? AND user_id = ?",
            [questionId, userId]
        );

        if (question.length === 0) {
            return res.status(403).json({ message: "You are not authorized to delete this question." });
        }

        await connection.execute("DELETE FROM Questions WHERE question_id = ?", [questionId]);
        res.status(200).json({ message: "Question deleted successfully!" });
    } catch (error) {
        console.error("Error deleting question:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { createQuestion, getAllQuestions, getQuestionWithAnswers, updateQuestion, deleteQuestion };