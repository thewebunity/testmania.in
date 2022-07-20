const express = require("express");
const { authenticateToken } = require("../middleware/authenticate");
const studentController = require("../controllers/student.controller");

const router = express.Router();

router.get(
  `/:id/current-exam/:examId`,
  authenticateToken,
  studentController.getCurrentExam
);

router.get(`/:id`, authenticateToken, studentController.getStudent);

router.post("/register", studentController.addStudent);

router.put(`/edit`, studentController.editStudent);

router.put(`/update-exam`, authenticateToken, studentController.updateExam);

router.put(`/submit-exam`, authenticateToken, studentController.submitExam);
router.post("/email/send", studentController.sendEmail);

module.exports = router;
