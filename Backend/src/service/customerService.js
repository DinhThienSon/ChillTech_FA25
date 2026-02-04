const bcrypt = require("bcryptjs");
const Account = require("../models/Account");
const Customer = require("../models/Customer");

const createUser = async (userData) => {
  const {
    customerName,
    address,
    gender,
    email,
    password,
    phone,
  } = userData;

  // check email tồn tại
  const existed = await Account.findOne({ email });
  if (existed) {
    const err = new Error("EMAIL_EXISTED");
    err.code = 11000;
    throw err;
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const account = await Account.create({
    email,
    password: hashedPassword,
    phone,
    role: "CUSTOMER",
    status: "ACTIVE",
  });

  const customer = await Customer.create({
    account: account._id,
    customerName,
    address,
    gender,
  });

  return { account, customer };
};

module.exports = {
  createUser,
};
