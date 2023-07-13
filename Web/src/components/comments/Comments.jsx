import { useContext } from "react";
import "./comments.scss"
import {AuthContext} from "../../context/authContext"
const Comments = ()=> {
    const {currentUser} = useContext(AuthContext)

    //dammy data

    const comments = [
        {
            id: 1,
            name: "Collins",
            userId: 1,
            profilePic: "https://images.pexels.com/photos/5807580/pexels-photo-5807580.jpeg?auto=compress&cs=tinysrgb&w=400",
            desc: "Best coffee place in town",
            img: "https://images.pexels.com/photos/1819635/pexels-photo-1819635.jpeg?auto=compress&cs=tinysrgb&w=400"
     },
        {
          id: 2,
          name: "Bingo",
          userId: 2,
          profilePic: "https://images.pexels.com/photos/5117913/pexels-photo-5117913.jpeg?auto=compress&cs=tinysrgb&w=400",
          desc: "Nature Quest Live it! Love it!",
          img: "https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
    ];
  return (
    <div className="comments">
        <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment"/>
        <button>Send</button>
        </div>
        {comments.map(comment=>(
            <div className="comment">
                <img src={comment.profilePic} alt="" />
                <div className="info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className="date">1 hour ago</span>
            </div>
        ))
    }</div>
  )
}

export default Comments