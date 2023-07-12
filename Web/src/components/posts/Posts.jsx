import "./posts.scss"
import "../post/Post"

const Posts = () => {
  //dammy data
  const posts = [
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
    }
  ];

  return (
    <div className="posts">
      {posts.map(post=>(
        <Post post={post} key={post.id}/>
      ))}
    </div>
  )
}

export default Posts