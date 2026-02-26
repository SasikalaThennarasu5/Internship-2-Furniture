import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import api from "../services/api";


function BlogDetail() {
  const { slug } = useParams();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("access");
  const isAuthenticated = !!token;

  useEffect(() => {
    api.get(`blogs/${slug}/`)
      .then((res) => {
        setBlog(res.data);
        setComments(res.data.comments || []);
      })
      .catch((err) => console.error(err));
  }, [slug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    api.post(`blogs/${blog.id}/comment/`, {
  comment: message,
})
      .then((res) => {
        setComments([...comments, res.data]);
        setName("");
        setMessage("");
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  if (!blog) {
    return (
      <MainLayout>
        <div className="text-center mt-20 text-xl">Loading...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="px-20 py-16 max-w-4xl mx-auto">
        {/* Blog Image */}
        <img
          src={getImageUrl(blog.thumbnail)}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <p className="text-gray-500 mb-6">
          {new Date(blog.created_at).toDateString()}
        </p>

        {/* Content */}
        <div
          className="prose max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* ================= COMMENTS SECTION ================= */}

        <h2 className="text-2xl font-bold mb-6">
          Comments ({comments.length})
        </h2>

        {/* Comment List */}
        <div className="space-y-6 mb-12">
          {comments.map((comment) => (
            <div key={comment.id} className="border p-4 rounded-lg">
              <h4 className="font-semibold">{comment.name}</h4>
              <p className="text-gray-600 text-sm mb-2">
                {new Date(comment.created_at).toDateString()}
              </p>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">
  Comments ({comments.length})
</h2>

{/* Comment List */}
<div className="space-y-6 mb-12">
  {comments.map((comment) => (
    <div key={comment.id} className="border p-4 rounded-lg">
      <h4 className="font-semibold">{comment.user}</h4>
      <p className="text-gray-600 text-sm mb-2">
        {new Date(comment.created_at).toDateString()}
      </p>
      <p>{comment.comment}</p>
    </div>
  ))}
</div>

{/* ================= CONDITIONAL RENDER ================= */}

{isAuthenticated ? (
  <form onSubmit={handleSubmit} className="space-y-4">
    <h3 className="text-xl font-semibold">Leave a Comment</h3>

    <textarea
      placeholder="Your Comment"
      className="w-full border px-4 py-2 rounded h-32"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      required
    />

    <button
      type="submit"
      className="bg-black text-white px-6 py-3 rounded"
      disabled={loading}
    >
      {loading ? "Posting..." : "Post Comment"}
    </button>
  </form>
) : (
  <div className="border p-6 rounded-lg bg-gray-100 text-center">
    <p className="mb-4 font-medium">
      You must be logged in to post a comment.
    </p>
    <a
      href="/login"
      className="bg-black text-white px-6 py-3 rounded inline-block"
    >
      Login
    </a>
  </div>
)}
        </form>
      </div>
    </MainLayout>
  );
}

export default BlogDetail;