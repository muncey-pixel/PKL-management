
let journals = [
    {
        id: 1,
        date: "2026-11-27",
        activity: "Mempelajari React.js",
        description: "Mempelajari props dan implikasi useEffect",
        result: "Aku jadi mengerti",
        status: "approved"
    }
];

// GET semua jurnal
const getJournals = (req, res) => {
    res.json({
        success: true,
        data: journals
    });
};

// GET satu jurnal
const getJournalById = (req, res) => {
    const journal = journals.find(
        item => item.id === Number(req.params.id)
    );

    if (!journal) {
        return res.status(404).json({
            success: false,
            message: "Jurnal tidak ditemukan"
        });
    }

    res.json({
        success: true,
        data: journal
    });
};

// POST tambah jurnal
const createJournal = (req, res) => {
    const { date, activity, description, result } = req.body;

    if (!date || !activity || !description || !result) {
        return res.status(400).json({
            success: false,
            message: "Semua field wajib diisi"
        });
    }

    const newJournal = {
        id: Date.now(),
        date,
        activity,
        description,
        result,
        status: "pending"
    };

    journals.push(newJournal);

    res.status(201).json({
        success: true,
        message: "Jurnal berhasil ditambahkan",
        data: newJournal
    });
};

// PUT edit jurnal
const updateJournal = (req, res) => {
    const id = Number(req.params.id);

    const index = journals.findIndex(
        item => item.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Jurnal tidak ditemukan"
        });
    }

    const { date, activity, description, result } = req.body;

    if (!date || !activity || !description || !result) {
        return res.status(400).json({
            success: false,
            message: "Semua field wajib diisi"
        });
    }

    journals[index] = {
        ...journals[index],
        date,
        activity,
        description,
        result
    };

    res.json({
        success: true,
        message: "Jurnal berhasil diperbarui",
        data: journals[index]
    });
};

// DELETE jurnal
const deleteJournal = (req, res) => {
    const id = Number(req.params.id);

    const exists = journals.some(
        item => item.id === id
    );

    if (!exists) {
        return res.status(404).json({
            success: false,
            message: "Jurnal tidak ditemukan"
        });
    }

    journals = journals.filter(
        item => item.id !== id
    );

    res.json({
        success: true,
        message: "Jurnal berhasil dihapus"
    });
};

module.exports = {
    getJournals,
    getJournalById,
    createJournal,
    updateJournal,
    deleteJournal
};
