import { Bell, Search, UserCircle } from "lucide-react"

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-title">
        <h2>
          Dashboard
        </h2>
        <p>
          selamat datang di sistem laporan PKL
        </p>
      </div>
      <div className="navbar-actions">
        <div className="search-box">
          <Search size={20}></Search>
          <input type="text" placeholder="cari sesuatu..."/>
        </div>
        <button className="notification-button">
          <Bell size={20}/>
        </button>
        <div className="user-info">
          <UserCircle size={36}/>
          <div>
            <strong>Nama Siswa</strong>
            <span>Student</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar