const mongoose = require("mongoose");
const Journal = require("../models/Journal");

const notFound = (res) =>
  res.status(404).json({ success: false, message: "Jurnal tidak ditemukan" });

const serverError = (res, message) =>
  res.status(500).json({ success: false, message });

// GET semua jurnal
const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find().sort({ createdAt: 1 });
    res.json({ success: true, data: journals });
  } catch (error) {
    serverError(res, "Gagal mengambil jurnal");
  }
};

// GET satu jurnal
const getJournalById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);

    const journal = await Journal.findById(req.params.id);
    if (!journal) return notFound(res);

    res.json({ success: true, data: journal });
  } catch (error) {
    serverError(res, "Gagal mengambil jurnal");
  }
};

// POST tambah jurnal
const createJournal = async (req, res) => {
  try {
    const { date, activity, description, result } = req.body;

    if (!date || !activity || !description || !result) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    const newJournal = await Journal.create({
      date,
      activity,
      description,
      result,
    });

    res.status(201).json({
      success: true,
      message: "Jurnal berhasil ditambahkan",
      data: newJournal,
    });
  } catch (error) {
    serverError(res, "Gagal menambahkan jurnal");
  }
};

// PUT edit jurnal
const updateJournal = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);

    const { date, activity, description, result } = req.body;

    if (!date || !activity || !description || !result) {
      return res.status(400).json({
        success: false,
        message: "Semua field wajib diisi",
      });
    }

    const journal = await Journal.findByIdAndUpdate(
      req.params.id,
      { date, activity, description, result },
      { new: true, runValidators: true }
    );

    if (!journal) return notFound(res);

    res.json({
      success: true,
      message: "Jurnal berhasil diperbarui",
      data: journal,
    });
  } catch (error) {
    serverError(res, "Gagal memperbarui jurnal");
  }
};

// DELETE jurnal
const deleteJournal = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return notFound(res);

    const journal = await Journal.findByIdAndDelete(req.params.id);
    if (!journal) return notFound(res);

    res.json({ success: true, message: "Jurnal berhasil dihapus" });
  } catch (error) {
    serverError(res, "Gagal menghapus jurnal");
  }
};

module.exports = {
  getJournals,
  getJournalById,
  createJournal,
  updateJournal,
  deleteJournal,
};