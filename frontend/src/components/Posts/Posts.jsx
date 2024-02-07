import React, { useEffect, useState } from "react";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../Loader/Loader";

function Posts() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // This useEffect hook will run when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch blogs
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/posts");
        const data = response.data; // Assuming the response is already JSON
        setBlogs(data);
        setLoading(false);
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
    <div className={`relative isolate -z-10 sm:top-44 top-32 max-w-7xl mx-auto px-6 `}>
      <div>
        <h2 className="sm:text-3xl text-2xl font-coolitalic sm:mb-6 ">Blog</h2>
        <h1 className=" sm:text-6xl text-4xl mt-6 font-coolregular sm:mb-6 w-1/2 sm:w-full">
          Welcome to the Journey{" "}
        </h1>
        <p className=" sm:text-4xl text-2xl mt-6 font-coolthin text-slate-500 tracking-wide w-[90%] sm:w-full">
          Whether you're a fellow coder, tech enthusiast, or curious soul, there's something here
          for everyone. Let's explore the future together!
        </p>

        {loading && (
          <div className=" mt-10">
            <Loader />
          </div>
        )}

        <hr className="mt-20 border-t-2 border-gray-200" />

        {!loading &&
          blogs.map((blog) => (
            <>
              <div
                key={blog._id}
                className=" font-coolregular sm:flex justify-between hidden h-[375px] items-center hover:bg-slate-400 hover:bg-opacity-10 p-6 my-10 rounded-xl"
              >
                <div className=" w-1/3">
                  {blog.createdAt ? (
                    <p className="mt-14 text-lg font-coolthin tracking-widest text-slate-400">
                      {formattedDate(blog.createdAt)}
                    </p>
                  ) : null}
                  {blog.updatedAt && blog.updatedAt !== blog.createdAt ? (
                    <p className=" font-coolthin italic tracking-widest text-slate-400 text-md">
                      {"Updated " + formattedDate(blog.updatedAt)}
                    </p>
                  ) : null}
                  {blog.author ? (
                    <p className=" my-4 font-coolitalic text-2xl text-slate-700">{blog.author}</p>
                  ) : null}
                </div>
                <div className=" w-2/3 flex flex-col justify-between h-4/5">
                  <h1 className=" text-3xl tracking-wide capitalize mt-10">{blog.title}</h1>
                  <p className=" my-4 text-slate-500 font-coolthin tracking-widest w-4/5 text-2xl">
                    {blog.content}
                  </p>
                  <div>
                    <Link to={`/posts/${blog._id}`}>
                      <button class="mb-4 text-lg font-coolregular tracking-wide bg-slate-700 text-white leading-6 capitalize duration-100 transform rounded-full shadow cursor-pointer focus:ring-4 focus:ring-slate-700 focus:ring-opacity-50 w-[120px] px-4 py-3 focus:outline-none hover:shadow-lg hover:-translate-y-1">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className=" sm:hidden flex flex-col ">
                {blog.createdAt ? (
                  <p className="mt-14 font-coolthin tracking-widest text-slate-400">
                    {formattedDate(blog.createdAt)}
                  </p>
                ) : null}
                {blog.updatedAt && blog.updatedAt !== blog.createdAt ? (
                  <p className=" font-coolthin tracking-widest text-slate-400 text-sm">
                    {"Updated " + formattedDate(blog.updatedAt)}
                  </p>
                ) : null}
                <h1 className=" my-4 font-coolregular text-2xl w-2/3 text-slate-700">
                  {blog.title}
                </h1>
                {blog.author ? (
                  <p className=" text-slate-700 font-coolitalic">{blog.author}</p>
                ) : null}
                <p className=" my-4 text-slate-500 font-coolregular tracking-wide w-4/5">
                  {blog.content}
                </p>
                {/* TODO: ADD LINK TO REDIRECT TO SPECIFIC POST */}
                <Link to={`/posts/${blog._id}`}>
                  <button className="mt-4 bg-slate-700 text-white font-coolregular tracking-wide px-4 py-2 mb-10 rounded-full w-1/2 flex justify-around">
                    Read More
                    <svg
                      width="24"
                      height="24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      fill="white"
                      clip-rule="evenodd"
                    >
                      <path d="M12 0c-6.623 0-12 5.377-12 12s5.377 12 12 12 12-5.377 12-12-5.377-12-12-12zm0 1c-6.071 0-11 4.929-11 11s4.929 11 11 11 11-4.929 11-11-4.929-11-11-11zm4.828 11.5l-4.608 3.763.679.737 6.101-5-6.112-5-.666.753 4.604 3.747h-11.826v1h11.828z" />
                    </svg>
                  </button>
                </Link>
              </div>
              {blog !== blogs.length - 1 ? <hr className="border-t-2 border-gray-200" /> : null}
            </>
          ))}

        <nav className="flex items-center justify-between px-4 sm:px-0 sm:py-10">
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
    </div>
  );
}

export default Posts;
