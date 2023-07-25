import React, { useContext, useState, useEffect } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "react-query";
import { makeRequest } from "../../../axios";
import moment from "moment";
import { useMutation, useQueryClient } from "react-query";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data: comments } = useQuery(["comments", postId], () =>
    makeRequest.get(`/comments/${postId}`).then((res) => res.data)
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post(`/comments/${postId}`, newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the comments query
        queryClient.invalidateQueries(["comments", postId]);
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
      ) : comments && comments.length > 0 ? (
        comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <img src={comment.profilePic} alt="" />
            <div className="info">
              <span>{comment.name}</span> {/* Use comment name instead of authorName */}
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
