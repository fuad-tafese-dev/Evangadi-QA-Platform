const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    createQuestion,
    getAllQuestions,
    getQuestionWithAnswers,
    updateQuestion,
    deleteQuestion
} = require("../controller/questionController");


router.post("/create", authMiddleware, createQuestion);


router.get("/", authMiddleware, getAllQuestions);


router.get("/:questionId", authMiddleware, getQuestionWithAnswers);


router.put("/:questionId", authMiddleware, updateQuestion);


router.delete("/:questionId", authMiddleware, deleteQuestion);

module.exports = router;
