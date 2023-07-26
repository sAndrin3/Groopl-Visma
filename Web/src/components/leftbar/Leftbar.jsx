import "./leftbar.scss"
import friends from "../../assets/friends.png"
import courses from "../../assets/courses.png"
import events from "../../assets/events.png"
import fund from "../../assets/fund.png"
import gallery from "../../assets/gallery.png"
import gaming from "../../assets/gaming.png"
import groups from "../../assets/groups.png"
import market from "../../assets/market.png"
import memories from "../../assets/memories.png"
import tutorials from "../../assets/tutorials.png"
import videos from "../../assets/videos.png"
import watch from "../../assets/watch.png"
import messages from "../../assets/messages.png"
import { useContext } from "react"
import { AuthContext } from "../../context/authContext";
import {Link} from  'react-router-dom';

const Leftbar = () =>  {
  const {currentUser} = useContext(AuthContext);


  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <div className="user">
          <img src={currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
            
          </div>
          
          <div className="item">
            <img src={friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={groups} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={market} alt="" />
            <span>MarketPlace</span>
          </div>
          {/* <div className="item">
            <img src={memories} alt="" />
            <span>Memories</span>
          </div> */}
          {/* <div className="item">
            <img src={watch} alt="" />
            <span>Watch</span>
          </div> */}
        </div>
        <hr/>
        <div className="menu">
          <span>Shortcuts</span>
          {/* <div className="item">
            <img src={events} alt="" />
            <span>Events</span>
          </div> */}
          {/* <div className="item">
            <img src={gaming} alt="" />
            <span>Gaming</span>
          </div> */}
          <div className="item">
            <img src={gallery} alt="" />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={videos} alt="" />
            <span>Videos</span>
          </div>
          <div className="item">
            <img src={messages} alt="" />
            <Link to="/messages" style={{textDecoration:"none"}}>Messages</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leftbar