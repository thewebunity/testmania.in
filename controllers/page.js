
const Page = require("../models/page");
const { ObjectId } = require("mongodb");
const Footer = require("../models/footer");
const Logo = require('../models/logo');




exports.getPage = async (req, res) => {
    try {
      let page = await Page.findOne({
        name: req.params.name
      })
  

  
      return res.status(200).json({
        success:true,
        page,
      });
    } catch (err) {
      console.log(`Error finding  :=======> ${err.message}`);
      res
        .status(500)
        .json({ message: `Error finding  :=======> ${err.message} ` });
    }
  };

  
exports.getFooter = async (req, res) => {
  try {
    let footer = await Footer.find();



    return res.status(200).json({
      success:true,
      footer,
    });
  } catch (err) {
    console.log(`Error finding  :=======> ${err.message}`);
    res
      .status(500)
      .json({ message: `Error finding  :=======> ${err.message} ` });
  }
};

exports.getLogo = async (req, res) => {
  try {
    let logo = await Logo.findOne({
      _id: 'logo'
    })



    return res.status(200).json({
      success:true,
      logo,
    });
  } catch (err) {
    console.log(`Error ${err.message}`);
    res
      .status(500)
      .json({ message: `Error  ${err.message} ` });
  }
};