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
              <img src="https://images.pexels.com/photos/13965293/pexels-photo-13965293.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" />
              <span>Wout Van Aert</span>
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
              <img src="https://images.pexels.com/photos/13965293/pexels-photo-13965293.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" />
              <p>
                <span>Wout Van Aert</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/13965293/pexels-photo-13965293.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" />
              <p>
                <span>Wout Van Aert</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/13965293/pexels-photo-13965293.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" />
              <p>
                <span>Wout Van Aert</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/13965293/pexels-photo-13965293.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" />
              <p>
                <span>Wout Van Aert</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/13965293/pexels-photo-13965293.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" />

                <div className="online"/>
                <span>Sepp Kuss</span> 
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/13965293/pexels-photo-13965293.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" />

                <div className="online"/>
                <span>Sepp Kuss</span> 
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/13965293/pexels-photo-13965293.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" />

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