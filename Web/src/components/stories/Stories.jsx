import { useContext } from "react";
import "./stories.scss"
import {AuthContext} from "../../context/authContext"

const Stories = () => {
    const {currentUser} = useContext(AuthContext)

    //Dammy Data
    const stories = [
        {
            id: 1,
            name: "Jonas",
            img: "https://images.pexels.com/photos/2876872/pexels-photo-2876872.jpeg?auto=compress&cs=tinysrgb&w=400"

        },
        {
            id: 2,
            name: "Pogacar",
            img: "https://images.pexels.com/photos/3642537/pexels-photo-3642537.jpeg?auto=compress&cs=tinysrgb&w=400"

        },
        {
            id: 3,
            name: "Laporte",
            img: "https://images.pexels.com/photos/248547/pexels-photo-248547.jpeg?auto=compress&cs=tinysrgb&w=400"

        },
        {
            id: 4,
            name: "Kelderman",
            img: "https://images.pexels.com/photos/754595/pexels-photo-754595.jpeg?auto=compress&cs=tinysrgb&w=400"

        },
    ];
  return (
    <div className="stories">
        <div className="story">
                <img src={currentUser.profilePic} alt="" />
                <span>{currentUser.name}</span>
            </div>
        {stories.map(story=>(
            <div className="story">
                <img src={story.img} alt="" />
                <span>{story.name}</span>
            </div>
        ))}
    </div>
  )
}

export default Stories