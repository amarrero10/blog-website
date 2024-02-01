import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";

function App() {
  // const {
  //   loginWithPopup,
  //   loginWithRedirect,
  //   logout,
  //   user,
  //   isAuthenticated,
  //   getAccessTokenSilently,
  // } = useAuth0();
  // const [unprotected, setUnprotected] = useState("");
  // const [protectedR, setProtectedR] = useState("");

  // async function callApi() {
  //   const token = await getAccessTokenSilently();

  //   const response = await axios.get("http://localhost:8000/api/posts/unprotected", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   setUnprotected(response.data);
  // }
  // async function callProtectedApi() {
  //   if (!isAuthenticated) {
  //     // If token is not available, redirect the user to login
  //     loginWithRedirect();
  //     return;
  //   }
  //   try {
  //     const token = await getAccessTokenSilently();

  //     const response = await axios.get("http://localhost:8000/api/posts", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     // Check if the response contains any elements
  //     if (response.data.length > 0) {
  //       // Access the first element in the array
  //       const firstPost = response.data[0];

  //       console.log(firstPost.title);
  //       setProtectedR(firstPost.title);
  //     } else {
  //       console.log("No posts found");
  //     }
  //   } catch (error) {
  //     // Handle any errors that occurred during the API call
  //     console.error("Error fetching data:", error);
  //   }
  // }

  // console.log(user);
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
    </>
  );
}

export default App;
