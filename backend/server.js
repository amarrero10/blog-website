const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
// const { auth } = require("express-oauth2-jwt-bearer");
// const { expressjwt: jwt } = require("express-jwt");
// const jwks = require("jwks-rsa");
// const axios = require("axios");

dotenv.load();

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
// const verifyJwt = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 10,
//     jwksUri: "https://dev-lnacf2pxir6xfgy3.us.auth0.com/.well-known/jwks.json",
//   }),
//   audience: "https://localhost:3000",
//   issuer: "https://dev-lnacf2pxir6xfgy3.us.auth0.com/",
//   algorithms: ["RS256"],
// }).unless({ path: ["/api/posts/unprotected"] });

async function connect() {
  try {
    const connectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "blog-website", // Specify the desired database name here
    };

    await mongoose.connect(process.env.ATLAS_URI, connectionOptions);
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

const port = process.env.PORT || 8001;

// Use the routes
// app.use(verifyJwt);
app.use("/api", postRoutes);

app.get("/logout", (req, res) => {
  req.logout(); // This clears the authentication state
  res.redirect("/");
});

connect();

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
