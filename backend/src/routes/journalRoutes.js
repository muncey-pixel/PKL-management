const express = require("express");
const router = express.Router();

const {
  getJournals,
  getJournalById,
  createJournal,
  updateJournal,
  updateJournalStatus,
  deleteJournal
} = require("../controllers/journalController");

// GET semua jurnal
router.get("/", getJournals);

// GET jurnal berdasarkan ID
router.get("/:id", getJournalById);

// POST tambah jurnal
router.post("/", createJournal);

// PUT edit jurnal
router.put("/:id", updateJournal);

// PATCH ubah status jurnal
router.patch("/:id/status", updateJournalStatus);

// DELETE jurnal
router.delete("/:id", deleteJournal);

module.exports = router;