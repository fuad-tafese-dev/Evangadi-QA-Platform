const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createAnswer, getAnswersByQuestion, deleteAnswer, updateAnswer, getAllAnswers } = require("../controller/answerController");


router.post("/create", authMiddleware, createAnswer);


router.get("/:questionId", authMiddleware, getAnswersByQuestion);


router.put("/:answerId", authMiddleware, updateAnswer);


router.delete("/:answerId", authMiddleware, deleteAnswer);

router.get("/", authMiddleware, getAllAnswers);

module.exports = router;
