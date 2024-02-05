import React, { useEffect, useState } from "react";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { format } from "date-fns";

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

  // Inside your component function
  const formattedDate = (dateString) => {
    // Use the 'format' function to convert the date string to the desired format
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  return (
    <div className="relative isolate -z-10 sm:top-44 top-32 max-w-7xl mx-auto">
      <h2 className="sm:text-3xl text-2xl font-coolitalic sm:mb-6 ">Blog</h2>
      <h1 className=" sm:text-6xl text-4xl mt-6 font-coolregular sm:mb-6">
        Welcome to the Journey{" "}
      </h1>
      <p className=" sm:text-4xl font-coolthin text-slate-500 tracking-wide">
        Whether you're a fellow coder, tech enthusiast, or curious soul, there's something here for
        everyone. Let's explore the future together!
      </p>

      <hr className="mt-6 border-t-2 border-gray-200" />
      {blogs.map((blog) => {
        return (
          <>
            <div key={blog._id} className=" font-coolregular flex justify-between">
              <div>
                {blog.author ? <p>{blog.author}</p> : null}
                {blog.createdAt ? <p>{formattedDate(blog.createdAt)}</p> : null}
                {blog.updatedAt && blog.updatedAt !== blog.createdAt ? (
                  <p>{"Updated on " + formattedDate(blog.updatedAt)}</p>
                ) : null}
              </div>
              <div>
                <h1>{blog.title}</h1>
                <p>{blog.content}</p>
              </div>
            </div>
            <hr className="mt-6 border-t-2 border-gray-200" />
          </>
        );
      })}
      <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
        <div className="-mt-px flex w-0 flex-1">
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            Previous
          </a>
        </div>
        <div className="hidden md:-mt-px md:flex">
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            1
          </a>
          {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
            aria-current="page"
          >
            2
          </a>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            3
          </a>
          <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
            ...
          </span>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            8
          </a>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            9
          </a>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            10
          </a>
        </div>
        <div className="-mt-px flex w-0 flex-1 justify-end">
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Posts;
