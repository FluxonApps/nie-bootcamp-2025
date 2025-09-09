import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../components/Header";
import { Heart, MessageCircle, Plus } from "lucide-react";
import "./Posts.css";

interface Comment {
  userId: string;
  text: string;
  createdAt: string;
}

interface Post {
  _id: string;
  caption: string;
  imageUrl?: string;
  author?: {
    _id: string;
    name: string;
    email: string;
  };
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [showModal, setShowModal] = useState(false);

  const userId = localStorage.getItem("userId") || "";

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await api.get("/get/posts");
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Create post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption && !image) return alert("Please add a caption or image!");

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("author", userId);
    if (image) formData.append("image", image);

    try {
      setLoading(true);
      await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCaption("");
      setImage(null);
      setShowModal(false); // Close modal
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  // Like post
  const handleLike = async (postId: string) => {
    try {
      await api.post(`/posts/${postId}/like`, { userId });
      fetchPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Add comment
  const handleComment = async (postId: string) => {
    const text = commentText[postId];
    if (!text) return;

    try {
      await api.post(`/posts/${postId}/comment`, { userId, text });
      setCommentText((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="posts-page">
      {/* ✅ Header */}
      <Header />

      {/* Posts Feed */}
      <div className="posts-wrapper">
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              {/* Post Header */}
              <div className="post-header">
                <div className="profile-circle">
                  {post.author?.name?.[0] || "U"}
                </div>
                <div>
                  <p className="author-name">{post.author?.name || "Unknown"}</p>
                  <p className="post-date">
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Caption */}
              <p className="caption">{post.caption}</p>

              {/* Post Image */}
              {post.imageUrl && (
                <img
                  src={`http://localhost:8002${post.imageUrl}`}
                  alt="Post"
                  className="post-image"
                />
              )}

              {/* Like & Comment Actions */}
              <div className="post-actions">
                <button
                  className={`like-btn ${
                    post.likes?.includes(userId) ? "liked" : ""
                  }`}
                  onClick={() => handleLike(post._id)}
                >
                  <Heart
                    size={20}
                    fill={post.likes?.includes(userId) ? "red" : "none"}
                  />
                  <span>{post.likes?.length}</span>
                </button>

                <div className="comments-count">
                  <MessageCircle size={20} />
                  <span>{post.comments.length}</span>
                </div>
              </div>

              {/* Comments */}
              <div className="comments-section">
                {post.comments.map((c, idx) => (
                  <p key={idx}>
                    <span className="comment-user">{c.userId}</span>: {c.text}
                  </p>
                ))}

                {/* Add Comment */}
                <div className="add-comment">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText[post._id] || ""}
                    onChange={(e) =>
                      setCommentText((prev) => ({
                        ...prev,
                        [post._id]: e.target.value,
                      }))
                    }
                  />
                  <button onClick={() => handleComment(post._id)}>Post</button>
                </div>
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <p className="no-posts">No posts yet. Be the first to post!</p>
          )}
        </div>
      </div>

      {/* ✅ Floating Plus Button */}
      <button className="floating-btn" onClick={() => setShowModal(true)}>
        <Plus size={28} />
      </button>

      {/* ✅ Create Post Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create a Post</h2>
            <form onSubmit={handleCreatePost}>
              <textarea
                placeholder="What's on your mind?"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={loading}>
                  {loading ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
