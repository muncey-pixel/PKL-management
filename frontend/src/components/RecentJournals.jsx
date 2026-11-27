
function RecentJournals({ journals }) {
  return (
    <div className="content-card">

      <div className="card-heading">
        <div>
          <h3>Jurnal Terbaru</h3>
          <p>Aktivitas PKL terakhir kamu</p>
        </div>

        <a href="/journals">Lihat semua</a>
      </div>

      <div className="table-wrapper">
        <table className="journal-table">

          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Kegiatan</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {journals.map((journal) => (
              <tr key={journal.id}>
                <td>{journal.date}</td>
                <td>{journal.activity}</td>
                <td>
                  <span className={`status ${journal.status}`}>
                    {journal.status === "approved"
                      ? "Disetujui"
                      : "Menunggu"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default RecentJournals;
