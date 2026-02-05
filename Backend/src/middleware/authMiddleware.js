const jwt = require("jsonwebtoken");
const Account = require("../models/Account");
const Customer = require("../models/Customer");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret_key"
    );

    const account = await Account.findById(decoded.id).lean();
    if (!account) {
      return res.status(401).json({ message: "Tài khoản không tồn tại" });
    }

    // 🔥 ADMIN → KHÔNG CHECK CUSTOMER
    if (account.role === "ADMIN") {
      req.user = {
        accountId: account._id,
        role: account.role,
      };
      return next();
    }

    // 🔥 CUSTOMER → BẮT BUỘC CÓ CUSTOMER
    const customer = await Customer.findOne({ account: account._id }).lean();
    if (!customer) {
      return res.status(401).json({ message: "Customer không tồn tại" });
    }

    req.user = {
      accountId: account._id,
      customerId: customer._id,
      role: account.role,
    };

    next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR:", error);
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};

module.exports = authMiddleware;
