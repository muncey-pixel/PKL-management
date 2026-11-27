
import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  BookOpen
} from "lucide-react";

const API_URL = "http://localhost:5000/api/journals";

function Journals() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    date: new Date().toISOString().slice(0, 10),
    activity: "",
    description: "",
    result: ""
  };

  const [form, setForm] = useState(initialForm);

  // Mengambil semua jurnal
  const fetchJournals = async () => {
    try {
      setError("");

      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setJournals(result.data);

    } catch (err) {
      setError("Gagal mengambil data jurnal.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  // Mengubah input form
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Membuka form tambah jurnal
  const openAddForm = () => {
    setEditingId(null);
    setForm(initialForm);
    setShowForm(true);
  };

  // Membuka form edit jurnal
  const handleEdit = (journal) => {
    setEditingId(journal.id);

    setForm({
      date: journal.date,
      activity: journal.activity,
      description: journal.description,
      result: journal.result
    });

    setShowForm(true);
  };

  // Simpan jurnal
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEditing = editingId !== null;

    const url = isEditing
      ? `${API_URL}/${editingId}`
      : API_URL;

    try {
      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setShowForm(false);
      setForm(initialForm);
      setEditingId(null);

      await fetchJournals();

    } catch (err) {
      setError(err.message || "Gagal menyimpan jurnal.");
    }
  };

  // Hapus jurnal
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Apakah kamu yakin ingin menghapus jurnal ini?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      await fetchJournals();

    } catch (err) {
      setError(err.message || "Gagal menghapus jurnal.");
    }
  };

  return (
    <div className="journals-page">

      <div className="journals-header">
        <div>
          <h2>Jurnal Harian</h2>
          <p>Catat seluruh aktivitas kegiatan PKL kamu.</p>
        </div>

        <button
          className="primary-button add-journal-btn"
          onClick={openAddForm}
        >
          <Plus size={18} />
          Tambah Jurnal
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {showForm && (
        <div className="journal-form-card">

          <div className="form-header">
            <h3>
              {editingId ? "Edit Jurnal" : "Tambah Jurnal"}
            </h3>

            <button
              className="close-button"
              type="button"
              onClick={() => setShowForm(false)}
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Tanggal</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Nama Kegiatan</label>
              <input
                type="text"
                name="activity"
                placeholder="Contoh: Mempelajari React.js"
                value={form.activity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Keterangan Kegiatan</label>
              <textarea
                name="description"
                rows="4"
                placeholder="Jelaskan kegiatan yang dilakukan..."
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Hasil yang Diperoleh</label>
              <textarea
                name="result"
                rows="3"
                placeholder="Jelaskan hasil dari kegiatan..."
                value={form.result}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Batal
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                {editingId ? "Simpan Perubahan" : "Simpan Jurnal"}
              </button>
            </div>

          </form>
        </div>
      )}

      <div className="journal-list-card">

        <div className="journal-list-header">
          <div>
            <h3>Daftar Jurnal</h3>
            <p>{journals.length} jurnal tercatat</p>
          </div>
          <BookOpen size={22} />
        </div>

        {loading ? (
          <p>Memuat jurnal...</p>
        ) : journals.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={35} />
            <p>Belum ada jurnal.</p>
            <span>Mulai catat kegiatan PKL kamu.</span>
          </div>
        ) : (
          <div className="journal-table-wrapper">
            <table className="journal-table">

              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Kegiatan</th>
                  <th>Keterangan</th>
                  <th>Hasil</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {journals.map(journal => (
                  <tr key={journal.id}>
                    <td>{journal.date}</td>
                    <td>{journal.activity}</td>
                    <td>{journal.description}</td>
                    <td>{journal.result}</td>
                    <td>
                      <span className={`status ${journal.status}`}>
                        {journal.status === "approved"
                          ? "Disetujui"
                          : "Menunggu"}
                      </span>
                    </td>
                    <td>
                      <div className="journal-actions">
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(journal)}
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="delete-button"
                          onClick={() => handleDelete(journal.id)}
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>

    </div>
  );
}

export default Journals;