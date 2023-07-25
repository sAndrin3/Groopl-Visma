import { useState, useContext,useEffect } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { makeRequest } from "../../../axios";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import "./post.scss";
import Cookies from 'js-cookie';
import { Button } from "@mui/material";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Retrieve the accessToken from the cookie when the component mounts
    const accessToken = Cookies.get('accessToken');
    setAccessToken(accessToken);
  }, []);

  const { isLoading, data } = useQuery(['likes', post.id], () => {
    if (!accessToken) return []; // Return an empty array if the accessToken is not available
    const config = {
      headers: {
        authorization: {accessToken},
      },
    };
    console.log(accessToken)
    return makeRequest.get(`/likes/${post.id}`, config).then((res) => res.data);
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (liked) => {
      const config = {
        headers: {
          authorization: {accessToken},
        },
      };

      if (liked) {
        await makeRequest.delete(`/likes/${post.id}`, config);
      } else {
        await makeRequest.post("/likes", { postId: post.id }, config);
      }
    },
    {
      onMutate: ({ liked }) => {
        queryClient.cancelQueries(['likes', post.id]);
        const previousData = queryClient.getQueryData(['likes', post.id]);
        queryClient.setQueryData(['likes', post.id], (oldData) => {
          if (oldData) {
            if (liked) {
              // Unlike the post
              return oldData.filter((userId) => userId !== currentUser?.id);
            } else {
              // Like the post
              return [...oldData, currentUser?.id];
            }
          }
          return liked ? [] : [currentUser?.id];
        });
        return { previousData };
      },
      onError: (error, newTodo, context) => {
        if (context && context.previousData) {
          queryClient.setQueryData(['likes', post.id], context.previousData);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['likes', post.id]);
      },
    }
  );

    // const mutation = useMutation(
    //   (liked) => {
    //     if(liked) return makeRequest.delete("/likes?postId="+post.id);
    //     return makeRequest.post("/likes", {postId: post.id});
    //   },
    //   {
    //     onSuccess: () => {
    //       queryClient.invalidateQueries(["likes"])
    //     },
    //   }
    // )

  const deleteMutation = useMutation(
    (postId) => {
    return makeRequest.delete("/posts/"+ postId);
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"])
    }
  });

  const handleLike = () => {
    const isLiked = data && data.includes(currentUser?.id);
    mutation.mutate(!isLiked);
  };
  // const handleLike = () => {
  //   mutation.mutate(data.includes(currentUser.id));
  // }

  const handleDelete = () => {
    deleteMutation.mutate(post.id)
  }

// console.log(post);
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link to={`/profile/${post.authorId}`} style={{ textDecoration: "none", color: "inherit " }}>
                <span className="name">{post.authorName}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={()=>setMenuOpen(!menuOpen)}/>
          {menuOpen && post.userId === currentUser.id && (<button onClick={handleDelete}>delete</button>)}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? "loading" : (data && data.includes(currentUser?.id)) ? <FavoriteIcon style={{ color: "red" }} onClick={handleLike} /> : <FavoriteBorderIcon onClick={handleLike} />}
            {data ? data.length : 0} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            10 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;