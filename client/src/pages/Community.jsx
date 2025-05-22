import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderBanner from "../components/Banners/HeaderBanner";
import Navbar from "../components/Navbar";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [filter, setFilter] = useState("all");

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
    const fetchPosts = () => {
      axios.get("http://localhost:5000/posts").then((res) => {
        setPosts(res.data);
      });
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 3000); // Fixed interval to 3 seconds

    return () => clearInterval(interval);
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

  const filterPosts = () => {
    const now = new Date();

    return posts.filter((post) => {
      const postDate = new Date(post.dateTime);

      if (filter === "today") {
        return postDate.toDateString() === now.toDateString();
      }

      if (filter === "week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return postDate >= oneWeekAgo;
      }

      if (filter === "month") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return postDate >= oneMonthAgo;
      }

      return true;
    });
  };

  return (
    <div className="bg-light">
      <HeaderBanner />
      <Navbar />
      <div className="container py-4">
        <div className="text-center mb-4">
          <h2>Welcome to the Community</h2>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="btn-group">
            {["all", "today", "week", "month"].map((timeframe) => (
              <button
                key={timeframe}
                className={`btn btn-outline-primary ${
                  filter === timeframe ? "active" : ""
                }`}
                onClick={() => setFilter(timeframe)}
              >
                {timeframe === "all"
                  ? "All"
                  : timeframe === "today"
                  ? "Today"
                  : timeframe === "week"
                  ? "This Week"
                  : "This Month"}
              </button>
            ))}
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
              placeholder={`What's on your mind?\n(Use line breaks to structure your post)`}
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="btn btn-primary" onClick={createPost}>
              Post
            </button>
          </div>
        )}

        <div className="d-flex flex-column gap-3">
          {filterPosts().map((post) => (
            <DisplayPost
              key={post._id}
              post={post}
              handleLike={handleLike}
              loggedInUser={loggedInUser}
              setPosts={setPosts}
              posts={posts}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const DisplayPost = ({ post, handleLike, loggedInUser, setPosts, posts }) => {
  const isLiked = loggedInUser && post.likedUsers.includes(loggedInUser.userId);

  const isPostOwner =
    loggedInUser && post.userId.toString() === loggedInUser.userId;

  const deletePost = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5000/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setPosts(posts.filter((p) => p._id !== post._id));
      })
      .catch((err) => {
        console.error("Error deleting post:", err);
      });
  };

  // Function to convert URLs into clickable links
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

        {/* Render message with line breaks and links */}
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

export default Community;
