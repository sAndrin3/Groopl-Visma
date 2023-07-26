import "./posts.scss";
import Post from "../post/Post";
import { useQuery } from 'react-query';
import { makeRequest } from "../../../axios";
import Loaders from "../loaders";

const Posts = ({userId}) => {
  const { isLoading, error, data } = useQuery(['posts'], () =>
    makeRequest.get(`/posts?userId=`+userId).then((res) => res.data),
  );

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }
// console.log(data);
  return (
    <div className="posts">
      {error
      ? "something went wrong!"
      : isLoading
      ? <Loaders/>
      : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
