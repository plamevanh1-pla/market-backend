require("dotenv").config({ path: __dirname + "/.env" });

console.log("URL:", process.env.SUPABASE_URL);
console.log("KEY:", process.env.SUPABASE_SERVICE_KEY);

const express = require("express");
const cors = require("cors");

// 🔥 IMPORTANT : app doit être créé AVANT usage
const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/pay", require("./routes/pay"));
app.use("/api/callback", require("./routes/callback"));

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port " + PORT);
});