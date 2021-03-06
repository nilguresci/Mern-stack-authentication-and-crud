const User = require("../models/User");
//const Product= require('../models/Product')
const Customer = require("../models/Customer");
const ErrorResponse = require("../utils/errorResponse");

exports.getPrivateData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "private dataya erişim var",
  });
};

//admins
exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
};

//get customers
exports.getCustomers = (req, res, next) => {
  Customer.find()
    .then((customers) => res.json(customers))
    .catch((err) => res.status(400).json("Error: " + err));
};

//get customer with id
exports.getOneCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    res.send(customer); //200-ok
  } catch {
    next(new ErrorResponse("Customer doesn't exist!", 404));
  }
};

//add customer
exports.addCustomer = async (req, res, next) => {
  const {
    firstname,
    lastname,
    companyName,
    city,
    town,
    address,
    sector,
    email,
    phone,
  } = req.body;

  try {
    const customer = await Customer.create({
      firstname,
      lastname,
      companyName,
      city,
      town,
      address,
      sector,
      phone,
      email,
    });

    res.send(customer);
  } catch (error) {
    next(error);
  }
};

//update with id
exports.updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    if (req.body.firstname) {
      customer.firstname = req.body.firstname;
    }

    if (req.body.lastname) {
      customer.lastname = req.body.lastname;
    }

    if (req.body.companyName) {
      customer.companyName = req.body.companyName;
    }
    if (req.body.city) {
      customer.city = req.body.city;
    }
    if (req.body.town) {
      customer.town = req.body.town;
    }
    if (req.body.address) {
      customer.address = req.body.address;
    }
    if (req.body.sector) {
      customer.sector = req.body.sector;
    }
    if (req.body.email) {
      customer.email = req.body.email;
    }
    if (req.body.phone) {
      customer.phone = req.body.phone;
    }

    await customer.save();
    res.send(customer); //200-ok
  } catch (error) {
    next(new ErrorResponse("Customer doesn't exist!", 404));
  }
};

//delete customer
exports.deleteCustomer = async (req, res, next) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    res.status(204).send(); //204-no content
  } catch (error) {
    next(new ErrorResponse("Customer doesn't exist!", 404));
  }
};

const sendToken = (customer, statusCode, res) => {
  const token = customer.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
