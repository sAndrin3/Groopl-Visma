import "./home.scss"
import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"

function Home() {
  return (
    <div className="home">
      <Stories/>
      <Posts/>
    </div>
  )
}

export default Home