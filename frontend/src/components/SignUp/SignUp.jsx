import { useState } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import jsonp from "jsonp";

export default function SignUp({ email, handleChange }) {
  const [signedUp, setSignedUp] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const url =
      "https://gmail.us10.list-manage.com/subscribe/post-json?u=4ee3268eea55162490ef7e48b&amp;id=906fc9643f&amp;f_id=0004e8e5f0";
    jsonp(`${url}&EMAIL=${email}`, { param: "c" }, (_, data) => {
      const { msg, result } = data;
      // do something with response
      setSignedUp(msg);
    });
  };

  return (
    <div className="bg-white -mb-10 sm:py-24 px-2">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-slate-800 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32 rounded-lg">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Stay In the Loop!
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
            Sign up now to receive alerts whenever a new blog post hits the virtual shelves.
            Unsubscribe anytime!
          </p>

          <form className="mx-auto mt-10 flex max-w-md gap-x-4" onSubmit={onSubmit}>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={handleChange}
              required
              className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4 text-white">{signedUp}</p>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient
                id="759c1415-0410-454c-8f7c-9a820de03641"
                cx={0}
                cy={0}
                r={1}
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(512 512) rotate(90) scale(512)"
              >
                {/* Using Analogous Colors */}
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#56D156" stopOpacity={0} />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
