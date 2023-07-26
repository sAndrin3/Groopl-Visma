import "./rightbar.scss"

function Rightbar() {
  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/13965293/pexels-photo-13965293.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" />
              <span>Wout Van Aert</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/1173777/pexels-photo-1173777.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
              <span>Bongo Mathao</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Recent Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://media.istockphoto.com/id/156530720/photo/rastafarian.jpg?b=1&s=612x612&w=0&k=20&c=_HAmTnKCagOuj54oe0B9TJ0hmOaLg8xrC3RdBRv67no=" alt="" />
              <p>
                <span>Dedan Kimathi</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/933498/pexels-photo-933498.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
              <p>
                <span>Bosco Collins</span> liked your post
              </p>
            </div>
            <span>3hrs ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
              <p>
                <span>Marlen Ruesser</span> followed you
              </p>
            </div>
            <span>an hour ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/457418/pexels-photo-457418.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />
              <p>
                <span>Kinuthia </span> commented on your post
              </p>
            </div>
            <span>25 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/4386429/pexels-photo-4386429.jpeg?auto=compress&cs=tinysrgb&w=400" alt="" />

                <div className="online"/>
                <span>Sepp Kuss</span> 
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Rightbar