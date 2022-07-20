const express = require("express");
const { authenticateToken } = require("../middleware/authenticate");
const examController = require("../controllers/exam.controller");

const router = express.Router();

router.get(`/available`, authenticateToken, examController.getAvailableExams);
router.get(`/exam_date`,  examController.getExamsByDate);

router.get(`/:id`, authenticateToken, examController.getExams);

router.get(`/exams/last`, examController.getLastExams);

router.post(`/begin`, authenticateToken, examController.beginExam);

module.exports = router;
