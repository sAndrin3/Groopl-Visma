import "./post.scss"
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useContext, useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { makeRequest } from "../../../axios";
import { AuthContext } from "../../context/authContext";

const Post =({post})=> {
  const [commentOpen, setCommentOpen] = useState(false);

  const {currentUser} = useContext(AuthContext)

  const { isLoading, error, data } = useQuery(['likes',post.id], () =>
  makeRequest.get(`/likes?postId=${post.id}`).then((res) => res.data)
);

const queryClient = useQueryClient();

const mutation = useMutation(
  (liked) => {
    if(liked) return makeRequest.delete(`/likes?postId=${post.id}`);
    return makeRequest.post("/likes", {postId:post.id});
  },
  {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["likes"]);
    },
  }
);

const handleLike = () => {
  mutation.mutate(data && data.includes(currentUser.id))
}

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
                <span className="date">{moment(post.createdAt).fromNow()}</span>
              
            </div>
            </div>
            <MoreHorizIcon/>
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/"+post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? "loading" : data && data.includes(currentUser.id) ? <FavoriteIcon style={{color:"red"}} onClick={handleLike}/> : <FavoriteBorderIcon onClick={handleLike}/>}
            {data ? data.length :0} Likes
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
        {commentOpen && <Comments postId={post.id}/>}
    </div>
    </div> 
  );
};

export default Post