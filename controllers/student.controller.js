const Student = require("../models/student");
const { ObjectId } = require("mongodb");
const { auth } = require("../middleware/firebaseConfig");
const mail = require('../utils/mail');

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

exports.getStudent = async (req, res) => {
  try {
    let student = await Student.findOne({
      _id: req.params.id.toString(),
    }).lean();

    student = transformData(student);

    console.log(`Student Found! :=========> `, student);

    return res.status(200).json({
      message: `Got student successfully!`,
      student,
    });
  } catch (err) {
    console.log(`Error finding student :=======> ${err.message}`);
    res
      .status(500)
      .json({ message: `Error finding student :=======> ${err.message} ` });
  }
};

exports.getCurrentExam = async (req, res) => {
  const { id, examId } = req.params;

  try {
    const student = await Student.findOne({
      _id: id,
    }).lean();

    const exam = student.exams.find((i) => i._id == examId);

    console.log(`Current exam found! :=========> `, exam);

    return res.status(200).json({
      message: `Got current exam successfully!`,
      exam,
    });
  } catch (err) {
    console.log(`Error finding current exam :=======> ${err.message}`);
    res.status(500).json({
      message: `Error finding current exam :=======> ${err.message} `,
    });
  }
};

exports.updateExam = async (req, res) => {
  const { id, exam } = req.body;
  console.log("----------------- Updating exam ------------------------");

  try {
    const student = await Student.updateMany(
      {
        _id: id,
      },
      { $set: { "exams.$[elem].questions": exam.questions } },
      { arrayFilters: [{ "elem._id": ObjectId(exam._id) }] }
    );

    return res.status(200).json({
      message: `Updated Answer successfully!`,
    });
  } catch (err) {
    console.log(`Error finding current exam :=======> ${err.message}`);
    res.status(500).json({
      message: `Error finding current exam :=======> ${err.message} `,
    });
  }
};

const generateScore = async (id, exam) => {
  try {
    const student = await Student.findOne({
      _id: id,
    }).lean();

    const currentExam = student.exams.find((i) => i._id == exam._id);

    let score = 0;
    currentExam.questions.forEach((question) => {
      if (question.selectedAnswer == question.answer) {
        score += 1;
      }
    });
    console.log(`Score :=============++> ${score}`);

    try {
      await Student.updateOne(
        { _id: id },
        {
          $set: {
            "exams.$[elem].score": score,
          },
        },
        { arrayFilters: [{ "elem._id": ObjectId(exam._id) }] }
      );

      return true;
    } catch (err) {
      console.log(`Error while updating score :============> ${err}`);
      return false;
    }
  } catch (err) {
    console.log(`Error while generating score :============> ${err}`);
    throw new Error(err);
  }
};

exports.submitExam = async (req, res) => {
  const { id, exam } = req.body;
  console.log("----------------- Updating exam ------------------------");

  try {
    await Student.updateMany(
      {
        _id: id,
      },
      {
        $set: {
          "exams.$[elem].questions": exam.questions,
          "exams.$[elem].isSubmitted": true,
          "exams.$[elem].inProgress": false,
          "exams.$[elem].submittedAt": new Date(),
        },
      },
      { arrayFilters: [{ "elem._id": ObjectId(exam._id) }] }
    );

    try {
      const response = await generateScore(id, exam);
      if (response === true) {
        return res.status(200).json({
          message: `Submitted exam successfully!`,
        });
      } else {
        return res.status(500).json({
          message: `Error while generating score!`,
        });
      }
    } catch (err) {
      console.log(`Error while generating score :============> ${err}`);
      res.status(500).json({
        message: `Error while generating score :============> ${err}`,
      });
    }
  } catch (err) {
    console.log(`Error while submitting exam :=======> ${err.message}`);
    res.status(500).json({
      message: `Error while submitting exam :=======> ${err.message} `,
    });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { name, password, email, phone, dob, gender , school } = req.body;

 
const ff="+91"+phone;
    const { uid } = await auth.createUser({
      displayName: name,
      password,
      email,
      phoneNumber: this.ff
    });

    try {
      const student = await Student.create({
        _id: uid,
        name,
        email,
        phone,
        school,
        dob,
        gender,
      });

      console.log("Student created successfully!", student);
      return res.status(200).json({ message: "User added successfully!" });
    } catch (err) {
      console.log("Error while adding student :=======> ", err);
      return res.status(500).json({ message: err.message });
    }
  } catch (err) {
    console.log("Error while creating student :=======> ", err);
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
  }
};

exports.editStudent = async (req, res) => {
  try {
    console.log(req.body.name);
    await Student.updateOne(
      { _id: req.body.id },
      {
        name: req.body.name,
        phone: req.body.phone,
        school: req.body.school,
        gender: req.body.gender,
        dob: req.body.dob,

      }
    );
    const email=req.body.email;
    const password=req.body.password;
    const phone=req.body.phone;

    

    if(password.length>0){
      const a = await auth.updateUser(req.body.id, {
        displayName: req.body.name,
        
        password,
        phoneNumber: "+91" + phone,
  
        email,
      });
    }else {
      const a = await auth.updateUser(req.body.id, {
        displayName: req.body.name,
        
       
        phoneNumber: "+91" + phone,
  
        email,
      });
    }

    console.log(`Student updated successfully!`);
    return res.status(200).json({ message: `Student updated successfully!` });
  } catch (err) {
    console.log(`Error while updating student :============> ${err}`);
    res
      .status(500)
      .json({ message: `Error while updating student :============> ${err}` });
  }
};

exports.sendEmail = async (req, res) => {
 
  console.log(req.body.email);
  let data = {};

  data.emailAddress = req.body.email;
  data.phone=req.body.phone;
  data.subject=req.body.subject;
  data.msg=req.body.msg;
  data.name=req.body.name;

  

  mail.sendingMail(data);
 

  return res.status(200).json({ success:true, message: "Email sent" });
};
