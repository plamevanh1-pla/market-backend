   const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_KEY || ""
);

router.post("/", async (req, res) => {
  try {
    const { productId, userId, amount, status } = req.body;

    if (!productId || !userId) {
      return res.status(400).json({ error: "Missing data" });
    }

    const { data, error } = await supabase
      .from("orders")
      .insert([
        {
          product_id: productId,
          user_id: userId,
          amount,
          status: status || "paid",
        },
      ]);

    if (error) {
      console.log(error);
      return res.status(500).json({ error: "DB error" });
    }

    return res.json({
      success: true,
      message: "Order saved",
      data,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router; 