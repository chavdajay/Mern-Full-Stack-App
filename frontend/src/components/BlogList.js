import React from "react";
import { deleteUsers } from "../Api";

const BlogList = ({ blogs, fetchData, setEditBlog }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this blog?")) {
      try {
        await deleteUsers(id);
        alert("Blog deleted");
        fetchData();
      } catch {
        alert("Delete failed");
      }
    }
  };

  return (
    <div>
      {blogs.length === 0 ? (
        <p className="text-muted text-center">No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5>{blog.title}</h5>
              <p>{blog.description}</p>
              <small className="text-muted">Date: {blog.date}</small>
              {blog.img && (
                <div className="text-center my-2">
                  <img
                    src={`${process.env.REACT_APP_API_BASE_URL}uploads/${blog.img}`}
                    alt={blog.title}
                    className="img-thumbnail"
                    style={{ width: "150px" }}
                  />
                </div>
              )}
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => setEditBlog(blog)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
