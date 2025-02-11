const express = require("express");
const cors = require("cors");
const stockRoutes = require("./routes/stockroute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

 app.use("/api", stockRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
