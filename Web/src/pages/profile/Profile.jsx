import "./profile.scss"
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { makeRequest } from "../../../axios";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Update } from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] =useState(false)
  const {currentUser} = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2])

  const { isLoading, error, data } = useQuery(['user'], () =>
  makeRequest.get(`/users/find=${userId}`).then((res) => res.data)
);
const { isLoading: rIsLoading,data: relationshipData } = useQuery(['relationship'], () =>
makeRequest.get(`/relationships?followedUserId=${userId}`).then((res) => res.data)
);

const queryClient = useQueryClient();

const mutation = useMutation(
  (following) => {
    if(following) return makeRequest.delete(`/relationships?userId=${userId}`);
    return makeRequest.post("/relationship", {userId});
  },
  {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["relationship"]);
    },
  }
);

const handleFollow = () => {
  mutation.mutate(data && data.includes(currentUser.id))
}


  return (
    <div className="profile">
      {isLoading ? ("loading") : (<>
        <div className="images">
        <img src={data?.coverPic} alt="" className="cover" />
        <img src= {data?.profilePic} alt="" className="profilePic" />
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
            <span>{data?.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon/>
                <span>{data?.city}</span>
              </div>
              <div className="item">
                <LanguageIcon/>
                <span>{data?.website}</span>
              </div>
              </div>
              {rIsLoading ? ("loading") : userId=== currentUser.id ? (
              <button onClick={()=>setOpenUpdate(true)}>update</button>) :
               (<button onclick={handleFollow}>{relationshipData.includes(currentUser.id) ? "Following" : "Follow"}</button>)}
          </div>
          <div className="right">
            <EmailIcon/>
            <MoreVertIcon/>
          </div>
        </div>
        <Posts userId={userId}/>
      </div>
      </>)} 
      {openUpdate && <Update setopenUpdate={setOpenUpdate} user={data}/>}
    </div>
  )
}

export default Profile