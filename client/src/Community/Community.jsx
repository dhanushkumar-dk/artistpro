import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { BACKEND_BASE_URL } from "../config";
import axios from "axios";

import DisplayPost from "./DisplayPost";

// loggedInUser = userData
const Community = ({ loggedInUser }) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(BACKEND_BASE_URL);
    setSocket(newSocket);

    // Initial fetch
    axios.get(`${BACKEND_BASE_URL}/posts`).then((res) => {
      setPosts(res.data);
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleNewPost = (post) => {
      setPosts((prev) => [post, ...prev]);
    };

    const handleDeletePost = (postId) => {
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    };

    const handleUpdatePost = (updatedPost) => {
      setPosts((prev) =>
        prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
      );
    };

    socket.on("newPost", handleNewPost);
    socket.on("deletePost", handleDeletePost);
    socket.on("updatePost", handleUpdatePost);

    return () => {
      socket.off("newPost", handleNewPost);
      socket.off("deletePost", handleDeletePost);
      socket.off("updatePost", handleUpdatePost);
    };
  }, [socket]);

  const createPost = () => {
    const token = localStorage.getItem("token");
    axios.post(`${BACKEND_BASE_URL}/posts`, { message, token }).then(() => {
      setMessage("");
      setShowForm(false);
      // No need to update posts manually — server will emit via socket
    });
  };

  const handleLike = (postId) => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${BACKEND_BASE_URL}/posts/like/${postId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((err) => {
        console.error("Error liking post:", err);
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

export default Community;
