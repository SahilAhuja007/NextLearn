const Catogory = require("../models/Catogory");
const Course = require("../models/Course");

exports.createCatogory = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({
      success: false,
      data: "name and description is required",
    });
  }
  const catogory = await Catogory.create({
    name,
    description,
  });
  if (!catogory) {
    return res.status(400).json({
      success: false,
      data: "issue while creating tag",
    });
  }
  res.status(200).json({
    success: true,
    data: "category created successfully",
    catogory,
  });
};

exports.getAllCatogories = async (req, res) => {
  try {
    const catogories = await Catogory.find(
      {},
      { name: true, description: true }
    );
    if (!catogories) {
      return res.status(400).json({
        success: false,
        data: "issue while fetching tags",
      });
    }
    res.status(200).json({
      success: true,
      data: catogories,
      message: "All tags are here",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      data: e.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { category_id } = req.body;
    const selectedCatrogory = await Catogory.findById(category_id)
      .populate("course")
      .exec();
    if (!selectedCatrogory) {
      return res.status(400).json({
        success: false,
        message: "category is not present",
      });
    }
    const differentCategory = await Catogory.find({ _id: { $ne: category_id } })
      .populate("course")
      .exec();

    const topcourse = await Course.find({})
      .sort({ studentEnrolled: -1 })
      .limit(5);
    res.status(200).json({
      success: true,
      data: {
        selectedCatrogory: selectedCatrogory,
        differentCategory: differentCategory,
        topcourse: topcourse,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: error.message,
      message: "issue while fetching categoriwise detail",
    });
  }
};
