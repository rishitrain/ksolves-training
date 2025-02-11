const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authenticate = require("./middleware");
const userRoutes = require("./routes/userroutes");
const blogRoutes = require("./routes/blogroutes");
const commentRoutes = require("./routes/commentroute");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

 app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);

 app.get("/api/auth", authenticate, (req, res) => {
  res.json({ message: "Protected route accessed successfully." });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
