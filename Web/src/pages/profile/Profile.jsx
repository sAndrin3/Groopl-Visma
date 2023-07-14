import "./profile.scss"
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from "../../components/posts/Posts"

const Profile = () => {
  return (
    <div className="profile">
      <div className="images">
        <img src="https://images.pexels.com/photos/17388779/pexels-photo-17388779/free-photo-of-city-nature-building-office.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" className="cover" />
        <img src="https://images.pexels.com/photos/16552809/pexels-photo-16552809/free-photo-of-colorful-lines-of-lights-in-darkness.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookIcon fontSize="large"/>
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large"/>
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large"/>
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large"/>
            </a>
          </div>
          <div className="center">
            <span>Collins</span>
            <div className="info">
              <div className="item">
                <PlaceIcon/>
                <span>KE</span>
              </div>
              <div className="item">
                <LanguageIcon/>
                <span>ENG</span>
              </div>
              </div>
              <button>follow</button>
          </div>
          <div className="right">
            <EmailIcon/>
            <MoreVertIcon/>
          </div>
        </div>
        <Posts/>
      </div>
    </div>
  )
}

export default Profile