import "./post.scss"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextsmsIcon from '@mui/icons-material/Textsms';
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Post =()=> {
  return (
    <div className="post">
        <div className="user">
            <div className="userInfo">

            </div>
            <MoreHorizIcon/>
        </div>
        <div className="content"></div>
        <div className="info"></div>
    </div>
  )
}

export default Post