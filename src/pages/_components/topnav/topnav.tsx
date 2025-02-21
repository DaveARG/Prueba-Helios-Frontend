import twitterLogo from "@/assets/twitter.png"
import MenuItem from "./menu-item"
import Question from "@/assets/svg/question"
import Job from "@/assets/svg/job"
import Bell from "@/assets/svg/bell"
import ArrowDown from "@/assets/svg/arrow-down"
import ActionButton from "./action-button"

export default function TopNav() {
  return (
    <nav className="topnav">
      <div className="topnav__left">
        <a href="/">
          <img src={twitterLogo} alt="Logo" className="topnav__logo" />
        </a>
        <div className="topnav__menu">
          <MenuItem href="#">Dashboard</MenuItem>
          <MenuItem href="#" isActive>
            Organización
          </MenuItem>
          <MenuItem href="#" withArrow>
            Modelos
          </MenuItem>
          <MenuItem href="#" withArrow>
            Seguimiento
          </MenuItem>
        </div>
      </div>
      <div className="topnav__right">
        <div className="topnav__actions">
          <ActionButton>
            <Job />
          </ActionButton>
          <ActionButton>
            <Question />
          </ActionButton>
          <ActionButton>
            <div className="notification-wrapper">
              <Bell />
              <span className="notification-badge">3</span>
            </div>
          </ActionButton>
        </div>
        <div className="topnav__user">
          <div className="topnav__user-avatar">
            <span className="topnav__user-avatar-initial">A</span>
          </div>
          <span className="topnav__user-text">Administrador</span>
        </div>
        <ArrowDown className="topnav__menu-item-arrow_down" />
      </div>
    </nav>
  )
}
