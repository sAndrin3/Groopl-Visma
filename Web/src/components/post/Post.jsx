import "./post.scss"
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from "react";

const Post =({post})=> {
  const [commentOpen, setCommentOpen] = useState(false)

  //dammy data
  const liked = false;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
            <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
               to={`/profile/${post.userId}`} style={{textDecoration:"none", color:"inherit "}}>
                <span className="name">{post.name}</span>
                </Link>
                <span className="date">1 min ago</span>
              
            </div>
            </div>
            <MoreHorizIcon/>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
            15 Likes
          </div>
          <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon/>
            10 Comments
          </div>
          <div className="item">
          <ShareOutlinedIcon/>
            Share
          </div> 
        </div>
        {commentOpen && <Comments/>}
    </div>
    </div> 
  );
};

export default Post