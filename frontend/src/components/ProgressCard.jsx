
function ProgressCard({ progress }) {
  return (
    <div className="content-card progress-card">

      <div className="card-heading">
        <div>
          <h3>Progress PKL</h3>
          <p>Perkembangan kegiatan PKL kamu</p>
        </div>

        <span className="progress-badge">
          {progress}%
        </span>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="progress-footer">
        <span>Mulai</span>
        <span>Target laporan</span>
      </div>

    </div>
  );
}

export default ProgressCard;
