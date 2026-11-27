
import { useState, useEffect } from "react";

import {
  BookOpen,
  Image,
  CalendarDays,
  CheckCircle
} from "lucide-react";

import StatCard from "../components/StatCard";
import ProgressCard from "../components/ProgressCard";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/dashboard`
        );

        const result = await response.json();

        setDashboard(result.data);

      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (!dashboard) {
    return <p>Gagal memuat dashboard.</p>;
  }

  return (
    <div className="dashboard-page">

      <div className="welcome-section">
        <h2>Dashboard Siswa</h2>
        <p>Pantau perkembangan PKL kamu.</p>
      </div>

      <div className="stats-grid">

        <StatCard
          title="Total Jurnal"
          value={dashboard.totalJournals}
          description="Jurnal kegiatan"
          icon={BookOpen}
        />

        <StatCard
          title="Dokumentasi"
          value={dashboard.totalDocuments}
          description="Foto kegiatan"
          icon={Image}
        />

        <StatCard
          title="Hari PKL"
          value={dashboard.totalDays}
          description="Hari berjalan"
          icon={CalendarDays}
        />

        <StatCard
          title="Disetujui"
          value={dashboard.approvedJournals}
          description="Jurnal disetujui"
          icon={CheckCircle}
        />

      </div>

      <ProgressCard
        progress={dashboard.progress}
      />

    </div>
  );
}

export default Dashboard;
