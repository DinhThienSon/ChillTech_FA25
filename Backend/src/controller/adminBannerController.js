const Banner = require("../models/Banner");

/**
 * GET /api/admin/banners
 * Admin: lấy tất cả banner
 */
const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
    res.json({ data: banners });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

/**
 * POST /api/admin/banners
 * Admin: tạo banner mới
 */
const createBanner = async (req, res) => {
  try {
    const banner = new Banner(req.body);
    await banner.save();
    res.json({ message: "Tạo banner thành công", data: banner });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * PUT /api/admin/banners/:id
 * Admin: cập nhật banner
 */
const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Cập nhật banner thành công", data: banner });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * DELETE /api/admin/banners/:id
 */
const deleteBanner = async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ message: "Xoá banner thành công" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * PATCH /api/admin/banners/:id/toggle
 */
const toggleBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    banner.active = !banner.active;
    await banner.save();
    res.json({ data: banner });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleBanner,
};
