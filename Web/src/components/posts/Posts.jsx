import "./posts.scss";
import Post from "../post/Post";
import { useQuery } from 'react-query';
import { makeRequest } from "../../../axios";

const Posts = () => {
  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get("/posts").then((res) => res.data)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="posts">
      {data.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
