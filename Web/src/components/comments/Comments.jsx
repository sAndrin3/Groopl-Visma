import { useContext, useState, useEffect } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "react-query";
import { makeRequest } from "../../../axios";
import moment from "moment";
import { useMutation, useQueryClient } from "react-query";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get(`/comments?postId=${postId}`).then((res) => res.data)
  );
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );

  useEffect(() => {
    setDesc("");
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      mutation.mutate({ desc, postId, userId: currentUser.id });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading ? (
        "loading"
      ) : Array.isArray(data) ? (
        data.map((comment) => (
          <div className="comment" key={comment.id}>
            <img src={comment.profilePic} alt="" />
            <div className="info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
        ))
      ) : (
        <p>No comments found</p>
      )}
    </div>
  );
};

export default Comments;
