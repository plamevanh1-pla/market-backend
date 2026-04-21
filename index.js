 const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.json({
    message: "API OK 🚀",
    status: "success"
  });
});

// TEST API SIMPLE
app.get("/test", (req, res) => {
  res.json({
    ok: true,
    time: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
}); 