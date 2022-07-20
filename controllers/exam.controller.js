const Student = require("../models/student");
const Exam = require("../models/exam");
const { ObjectId } = require("mongodb");

function transformData(data) {
  let transformedData;
  if (data.length > 0) {
    transformedData = data.map((item) => {
      let temp = {
        id: item._id,
        ...item,
      };
      delete temp._id;
      return temp;
    });
  } else {
    transformedData = {
      id: data._id,
      ...data,
    };
    delete transformedData._id;
  }

  return transformedData;
}
exports.getExamsByDate = async (req, res) => {
  console.log(`---------------- Getting getExams ------------------`);
  try {
    let exams;
    exams = await Exam.find({
      $and: [
       
        { startDate: { $gte: new Date() } },
      ],
    })
      .populate("subject", "name description")
      .sort({ createdAt: -1 })
      .lean();



    return res.status(200).json({
      message: `Successfully got exams!`,
      exams,
    });
  } catch (err) {
    console.log(`Error while getting exams :========> ${err.message}`);
    return res.status(500).json({ message: `Error while getting exams ` });
  }
};

exports.getExams = async (req, res) => {
  console.log(`---------------- Getting getExams ------------------`);
  try {
    const student = await Student.findOne({
      _id: req.params.id,
    }).lean();

    let exams = student.exams;

    console.log("exams", exams);
    if (exams.length > 0) {
      exams = transformData(exams);
    }

    exams = exams.sort((a, b) => b.submittedAt - a.submittedAt);

    return res.status(200).json({
      message: `Successfully got exams!`,
      exams,
    });
  } catch (err) {
    console.log(`Error while getting exams :========> ${err.message}`);
    return res.status(500).json({ message: `Error while getting exams ` });
  }
};

exports.getAvailableExams = async (req, res) => {
  console.log(`---------------- Getting available exams ------------------`);
  try {
    let exams;

    exams = await Exam.find({
      $and: [
        { startDate: { $gte: new Date() } ,
         endDate: { $gte: new Date() } },
      ],
    })
      .populate("subject", "name description")
      .sort({ createdAt: -1 })
      .lean();

    console.log(exams);
    try {
      const student = await Student.findOne(
        { _id: res.locals.uid },
        { exams: 1 }
      ).lean();

      if (student.exams.length > 0) {
        exams = exams.filter((exam) => {
          return !student.exams.find(
            (e) => e._id.toString() === exam._id.toString()
          );
        });
      }

      exams = exams.filter((e) => e.questions.length > 0);
      console.log("exams :=====================> ", exams);

      if (exams.length > 0) {
        exams = transformData(exams);
      }
    } catch (err) {
      console.log(`Error while getting exams :========> ${err.message}`);
      return res.status(500).json({ message: `Error while getting exams ` });
    }

    return res.status(200).json({
      message: `Successfully got exams!`,
      exams,
    });
  } catch (err) {
    console.log(
      `Error while getting available exams :========> ${err.message}`
    );
    return res
      .status(500)
      .json({ message: `Error while getting available exams ` });
  }
};

exports.beginExam = async (req, res) => {
  console.log(`---------------- Begin exam ------------------`);
  const { examId, id } = req.body;

  // Get exam
  try {
    const exam = await Exam.findOne({ _id: ObjectId(examId) })
      .populate("subject", "name description")
      .sort({ createdAt: -1 })
      .lean();

    try {
      await Student.updateOne({ _id: id }, { $addToSet: { exams: exam } });
      await Student.updateMany(
        {
          _id: id,
        },
        {
          $set: {
            "exams.$[elem].inProgress": true,
            "exams.$[elem].startedAt": new Date(),
          },
        },
        { arrayFilters: [{ "elem._id": ObjectId(exam._id) }] }
      );
      return res.status(200).json({
        message: `Successfully started exam!`,
        duration: exam.duration,
      });
    } catch (err) {
      console.log(`Error while beginning exams :========> ${err.message}`);
      return res.status(500).json({ message: `Error while beginning exam ` });
    }
  } catch (err) {
    console.log(`Error while beginning exams :========> ${err.message}`);
    return res.status(500).json({ message: `Error while beginning exam ` });
  }
};


exports.getLastExams = async (req, res) => {
  console.log(`---------------- Getting getExams ------------------`);
  try {
    const exams = await Exam.find().sort({_id:-1}).limit(4);
    



    return res.status(200).json({
      message: `Successfully got last exams!`,
      exams,
    });
  } catch (err) {
    console.log(`Error while getting last exams :========> ${err.message}`);
    return res.status(500).json({ message: `Error while getting exams ` });
  }
};
