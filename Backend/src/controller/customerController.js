const customerService = require("../service/customerService");

const handleRegisterCustomer = async (req, res) => {
  try {
    const {
      customerName,
      address,
      gender,
      email,
      password,
      phone,
    } = req.body;

    if (!email || !password || !customerName) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    const result = await customerService.createUser({
      customerName,
      address,
      gender,
      email,
      password,
      phone,
    });

    return res.status(201).json({
      message: "Đăng ký thành công",
      data: {
        accountId: result.account._id,
        customerId: result.customer._id,
      },
    });
  } catch (error) {
  console.error("REGISTER ERROR FULL:", error); // 👈 BẮT BUỘC

  if (error.code === 11000) {
    return res.status(400).json({ message: "Email đã được sử dụng" });
  }

  return res.status(500).json({ message: error.message });
}
};

module.exports = {
  handleRegisterCustomer,
};
