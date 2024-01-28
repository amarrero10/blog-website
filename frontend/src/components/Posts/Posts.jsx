import React, { useEffect, useState } from "react";
import axios from "axios";

function Posts() {
  const [blogs, setBlogs] = useState([]);

  // This useEffect hook will run when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch blogs
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/posts");
        const data = response.data; // Assuming the response is already JSON
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    // Call the asynchronous function to fetch blogs
    fetchBlogs();
  }, [blogs]); // The empty dependency array ensures this effect runs only once, similar to componentDidMount

  return (
    <div>
      {blogs.map((blog) => {
        return (
          <div key={blog._id}>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
