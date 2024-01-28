const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const { auth } = require("express-oauth2-jwt-bearer");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const axios = require("axios");

const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: "https://dev-lnacf2pxir6xfgy3.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://localhost:3000",
  issuer: "https://dev-lnacf2pxir6xfgy3.us.auth0.com/",
  algorithms: ["RS256"],
});

// Create a new post
// Add verifyJwt when in production to protect route
router.post("/create/posts", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/posts/unprotected", verifyJwt, async (req, res) => {
  try {
    res.send("unprotected route!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add other routes as needed (e.g., update and delete)

module.exports = router;
