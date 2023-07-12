import "./navbar.scss"
import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AppsIcon from '@mui/icons-material/Apps';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import GridViewIcon from '@mui/icons-material/GridView';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

const Navbar = ()=> {

  const {toggle, darkMode} = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);

  return (
    <div className="navbar">
        <div className="left">
            <Link to ="/" style={{textDecoration: "none"}}>
                <span>Groopl.</span>
            </Link>
            <HomeIcon/>
            {darkMode ? (<WbSunnyIcon onClick={toggle} />) : (<DarkModeIcon onClick={toggle} />)}
            <GridViewIcon/>
            <div className="search">
              <SearchIcon/>
              <input type="text" placeholder="Search..."/>
            </div>
        </div>
        <div className="right">
          <PersonIcon/>
          <EmailIcon/>
          <NotificationsIcon/>
          <div className="user">
            <img src={currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
          </div>
        </div>
    </div>
  )
}

export default Navbar