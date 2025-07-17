import { BACKEND_BASE_URL } from "../config";

import axios from "axios";

const DisplayPost = ({ post, handleLike, loggedInUser, setPosts, posts }) => {
  const isLiked = loggedInUser && post.likedUsers.includes(loggedInUser.userId);
  const isPostOwner =
    loggedInUser && post.userId.toString() === loggedInUser.userId;

  const deletePost = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${BACKEND_BASE_URL}/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((err) => {
        console.error("Error deleting post:", err);
      });
  };

  const renderMessageWithLinks = (text) => {
    return text.split(/(https?:\/\/[^\s]+)/g).map((part, index) =>
      part.match(/^https?:\/\/[^\s]+$/) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-decoration-underline"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-center mb-2">
          <div className="me-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="white"
              style={{
                backgroundColor: "#6c757d",
                borderRadius: "50%",
                padding: "3px",
              }}
            >
              <path
                d="M12 2C9.24 2 7 4.24 7 7s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 
                3-3 3 1.35 3 3-1.35 3-3 3zm0 3c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5zm-8 
                5c0-1.99 5.33-3 8-3s8 1.01 8 3v1H4v-1z"
              />
            </svg>
          </div>
          <strong>{post.userName}</strong>
        </div>

        <div style={{ whiteSpace: "pre-wrap" }}>
          {renderMessageWithLinks(post.message)}
        </div>

        <div className="d-flex justify-content-between text-muted mt-2">
          <small>{new Date(post.dateTime).toLocaleDateString()}</small>
          <div className="d-flex align-items-center">
            <button
              className="btn btn-outline-primary p-0 d-flex align-items-center"
              onClick={() => handleLike(post._id)}
              disabled={!loggedInUser || post.userId === loggedInUser.userId}
              title={
                !loggedInUser
                  ? "Login to like/dislike"
                  : isLiked
                  ? "Dislike"
                  : "Like"
              }
            >
              <span
                className={`me-2 ${isLiked ? "text-danger" : "text-muted"}`}
              >
                {isLiked ? "❤️" : "🤍"}
              </span>
              <span>{post.likedUsers.length}</span>
            </button>

            {isPostOwner && (
              <button
                className="btn btn-outline-danger ms-3 p-0 d-flex align-items-center"
                onClick={deletePost}
                title="Delete Post"
              >
                <span className="me-2">🗑️</span>
                <span className="d-none d-sm-inline">Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayPost;
