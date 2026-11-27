import {NavLink} from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Image,
  User,
  GraduationCap,
  LogOut,
} from "lucide-react"

function Sidebar() {

  const menuItems = [
    {name : "Dashboard", path : "/dashboard", icon : LayoutDashboard},
    {name : "Jurnal Harian", path : "/journals", icon : BookOpen},
    {name : "Dokumentasi", path : "/documents", icon : Image},
    {name : "Profil", path : "/profile", icon : User},
  ]

  return (
    <>
    <aside className="sidebar">
      <div className="sidebar-logo">
        <GraduationCap size={28}/>
        <div>
          <h2>
            Pkl System
          </h2>
          <span>
            Student Portal 
          </span>
        </div>
      </div>
      <div className="sidebar-menu">
        <p className="menu-label">
          MENU UTAMA
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          
          return(
            <NavLink 
            key={item.path} 
            to={item.path} 
            className={({isActive}) => {
              isActive ? "menu-item active" : "menu-item"
            }}
            >
              <Icon size={20}></Icon>
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
    </>
  )
}

export default Sidebar