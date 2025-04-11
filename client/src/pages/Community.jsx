import React, { useState, useEffect } from "react";
import axios from "axios";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLoggedInUser(res.data))
      .catch(() => setLoggedInUser(null));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  const createPost = () => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/posts", { message, token })
      .then((res) => {
        setPosts([res.data.post, ...posts]);
        setMessage("");
        setShowForm(false);
      });
  };

  const handleLike = (postId) => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:5000/posts/like/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setPosts(
          posts.map((post) => (post._id === postId ? res.data.post : post))
        );
      });
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h2>Welcome to the Community</h2>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="btn-group">
          <button className="btn btn-outline-primary">Today</button>
          <button className="btn btn-outline-primary">This Week</button>
          <button className="btn btn-outline-primary">This Month</button>
        </div>
        <button
          className="btn btn-success"
          onClick={() => setShowForm(!showForm)}
          disabled={!loggedInUser}
        >
          Create Post
        </button>
      </div>

      {!loggedInUser && (
        <div className="alert alert-warning">
          Please log in to create a post.
        </div>
      )}

      {showForm && (
        <div className="mb-4">
          <textarea
            className="form-control mb-2"
            placeholder="What's on your mind?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn btn-primary" onClick={createPost}>
            Post
          </button>
        </div>
      )}

      <div className="d-flex flex-column gap-3">
        {posts.map((post) => (
          <DisplayPost
            key={post._id}
            post={post}
            handleLike={handleLike}
            loggedInUser={loggedInUser}
          />
        ))}
      </div>
    </div>
  );
};

const DisplayPost = ({ post, handleLike, loggedInUser }) => {
  const isLiked = loggedInUser && post.likedUsers.includes(loggedInUser.userId);

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
        <p>{post.message}</p>
        <div className="d-flex justify-content-between text-muted">
          <small>{new Date(post.dateTime).toLocaleDateString()}</small>
          <button
            className="btn btn-link p-0"
            onClick={() => handleLike(post._id)}
            disabled={!loggedInUser}
            title={
              !loggedInUser
                ? "Login to like/dislike"
                : isLiked
                ? "Dislike"
                : "Like"
            }
          >
            {isLiked ? "❤️" : "🤍"} {post.likedUsers.length}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
