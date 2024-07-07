const express = require("express");
const Admin = require("../module/resadmin");
const Hotelinfo = require("../module/hotelinfo");
const Employee = require("../module/employee");

const router = express.Router();

// Post details of the restaurant owner as a guest
router.post("/addresowinfo", async (req, res) => {
  try {
    const {
      name,
      photo,
      aadharCardphoto,
      aadharCardno,
      fssaCertificatephoto,
      fssaCertificateno,
    } = req.body;
    const admin = await Admin.create({
      name,
      photo,
      aadharCardphoto,
      aadharCardno,
      fssaCertificatephoto,
      fssaCertificateno,
    });

    return res.status(201).json(admin);
  } catch (error) {
    console.error("Error while posting:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding info" });
  }
});

// Get all information about the restaurant owner
router.get("/addresowinfo/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Admin.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error while fetching the details:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the details" });
  }
});

// Post a restaurant owner hotel information
router.post("/hotelinfo/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { hotelName, address, contactNumber, email, registrationNumber } =
      req.body;
    const hotelinfo = await Hotelinfo.create({
      hotelName,
      address,
      contactNumber,
      email,
      registrationNumber,
    });

    const admin = await Admin.findById(userId);
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!admin.hotelinfo) {
      admin.hotelinfo = [];
    }

    admin.hotelinfo.push(hotelinfo._id);
    await admin.save();

    return res.status(201).json(hotelinfo);
  } catch (error) {
    console.log("Error while posting:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding hotel info" });
  }
});

// Get hotel information by hotelinfoid and userid
router.get("/gethotelinfo/:hotelInfoId/:userId", async (req, res) => {
  try {
    const { hotelInfoId, userId } = req.params;

    // Find the admin by userId and populate hotelinfo
    const admin = await Admin.findById(userId).populate("hotelinfo");

    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the admin has the specified hotelinfo
    const hotelinfo = admin.hotelinfo.find(
      (info) => info._id.toString() === hotelInfoId
    );

    if (!hotelinfo) {
      return res.status(404).json({ message: "Hotel information not found" });
    }

    return res.status(200).json(hotelinfo);
  } catch (error) {
    console.log("Error while getting the hotel info:", error);
    return res
      .status(500)
      .json({ error: "Error while getting the info details" });
  }
});

// Post the employee details from the resadmin info
router.post("/addemp/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { empname, empNo, empexperience } = req.body;
    const employee = await Employee.create({ empname, empNo, empexperience });
    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!admin.employee) {
      admin.employee = [];
    }

    admin.employee.push(employee._id);
    await admin.save();

    return res.status(201).json(employee);
  } catch (error) {
    console.log("Error while posting", error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding employee info" });
  }
});

//get the employee details by userId and employee id
router.get("/getemp/:empId/:userId", async (req, res) => {
  try {
    const { empId, userId } = req.params;

    //Find the admin by userId and populate employee
    const admin = await Admin.findById(userId).populate("employee");

    // check if the admin has the specified employeeinfo
    const employee = admin.employee.find(
      (info) => info._id.toString() === empId
    );

    if (!employee) {
      return res.status(404).json({ message: "Hotel information not found" });
    }

    return res.status(200).json(employee);
  } catch (error) {
    console.log("Error while getting the employee", error);
    return res.status(500).json({ error: "Error while getting emp details" });
  }
});
module.exports = router;
