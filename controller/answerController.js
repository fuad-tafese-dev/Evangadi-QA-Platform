const connection = require("../db/dbConfig");

const createAnswer = async (req, res) => {
    const { questionId, content } = req.body;
    const userId = req.user.userId;

    if (!questionId || !content) {
        return res.status(400).json({ message: "Question ID and content are required." });
    }

    try {
        await connection.execute(
            "INSERT INTO Answers (question_id, user_id, content) VALUES (?, ?, ?)",
            [questionId, userId, content]
        );

        res.status(201).json({ message: "Answer added successfully!" });
    } catch (error) {
        console.error("Error adding answer:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const getAnswersByQuestion = async (req, res) => {
    const { questionId } = req.params;

    try {
        const [answers] = await connection.execute(
            "SELECT a.answer_id, a.content, a.created_at, u.username FROM Answers a JOIN Users u ON a.user_id = u.user_id WHERE a.question_id = ?",
            [questionId]
        );

        res.status(200).json({ answers });
    } catch (error) {
        console.error("Error fetching answers:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const deleteAnswer = async (req, res) => {
    const { answerId } = req.params;
    const userId = req.user.userId;

    try {
        const [answer] = await connection.execute(
            "SELECT * FROM Answers WHERE answer_id = ? AND user_id = ?",
            [answerId, userId]
        );

        if (answer.length === 0) {
            return res.status(403).json({ message: "You are not authorized to delete this answer." });
        }

        await connection.execute("DELETE FROM Answers WHERE answer_id = ?", [answerId]);
        res.status(200).json({ message: "Answer deleted successfully!" });
    } catch (error) {
        console.error("Error deleting answer:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const updateAnswer = async (req, res) => {
    const { answerId } = req.params;
    const { content } = req.body;
    const userId = req.user.userId;

    if (!content) {
        return res.status(400).json({ message: "Content is required to update the answer." });
    }

    try {
        const [answer] = await connection.execute(
            "SELECT * FROM Answers WHERE answer_id = ? AND user_id = ?",
            [answerId, userId]
        );

        if (answer.length === 0) {
            return res.status(403).json({ message: "You are not authorized to update this answer." });
        }

        await connection.execute(
            "UPDATE Answers SET content = ? WHERE answer_id = ?",
            [content, answerId]
        );

        res.status(200).json({ message: "Answer updated successfully!" });
    } catch (error) {
        console.error("Error updating answer:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const getAllAnswers = async (req, res) => {
    try {
        const [answers] = await connection.execute(
            "SELECT a.answer_id, a.content, a.created_at, u.username, q.title AS question_title FROM Answers a JOIN Users u ON a.user_id = u.user_id JOIN Questions q ON a.question_id = q.question_id"
        );

        res.status(200).json({ answers });
    } catch (error) {
        console.error("Error fetching answers:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { getAllAnswers, createAnswer, getAnswersByQuestion, deleteAnswer, updateAnswer };