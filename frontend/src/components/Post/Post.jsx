import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../Loader/Loader";
import { format } from "date-fns";
import SignUp from "../SignUp/SignUp";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${id}`);
        const data = response.data;
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  // Inside your component function
  const formattedDate = (dateString) => {
    // Use the 'format' function to convert the date string to the desired format
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    // Basic email validation
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);
    setIsValidEmail(isValid);
  };

  return (
    <>
      <div className={`relative isolate -z-10 sm:top-44 top-32 max-w-7xl mx-auto px-6 `}>
        {loading && <Loader />}
        {post && !loading && (
          <>
            {/* MOBILE MENU */}
            <div className=" sm:hidden text-center mb-44 ">
              {post.createdAt ? (
                <p className="font-coolthin tracking-wide text-slate-400 text-lg">
                  {formattedDate(post.createdAt)}
                </p>
              ) : null}
              {post.updatedAt !== post.createdAt && post.updatedAt && post.createdAt && (
                <p className="font-coolthin tracking-wide text-slate-400 text-lg">
                  Updated: {formattedDate(post.updatedAt)}
                </p>
              )}

              <h1 className=" font-coolcompressed tracking-wide text-6xl mt-6 text-slate-700">
                {post.title}
              </h1>
              <p className="text-slate-700 font-coolthin mt-6 mb-14">
                by{" "}
                <span className="font-coolregular italic text-slate-400 text-xl ml-1">
                  {post.author}
                </span>
              </p>
              <article className="text-slate-700 font-coolthin text-lg text-justify pb-10">
                {post.content}
              </article>
              {/* TODO: ADD A MORE ARTICLES SECTION */}
            </div>

            {/* DESKTOP VIEW */}
            <div className=" hidden sm:block text-center mb-44 ">
              {post.createdAt && (
                <p className="font-coolthin tracking-wide text-slate-400 text-2xl">
                  {formattedDate(post.createdAt)}
                </p>
              )}
              {post.updatedAt !== post.createdAt && post.updatedAt && post.createdAt && (
                <p className="font-coolthin tracking-wide text-slate-400 text-xl">
                  Updated: {formattedDate(post.updatedAt)}
                </p>
              )}

              <h1 className=" font-coolcompressed tracking-wide text-8xl mt-6 text-slate-700">
                {post.title}
              </h1>
              <p className="text-slate-700 font-coolthin mt-6 mb-14">
                by{" "}
                <span className="font-coolregular italic text-slate-400 text-2xl ml-1">
                  {post.author}
                </span>
              </p>
              <article className="text-slate-700 font-coolthin text-3xl text-center pb-10">
                {post.content}
              </article>

              {/* TODO: ADD A MORE ARTICLES SECTION */}
            </div>
          </>
        )}
      </div>

      <SignUp email={email} handleChange={handleChange} />
    </>
  );
}

export default Post;
