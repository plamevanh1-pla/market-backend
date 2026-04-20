   const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    console.log("PAY CALLBACK:", data);

    const status = data?.status;
    const custom = data?.custom_data;

    if (status === "completed" || status === "success") {
      await supabase.from("orders").insert([
        {
          user_id: custom.buyer_id,
          product_id: custom.product_id,
          seller_id: custom.seller_id,
          amount: data?.invoice?.total_amount,
          status: "paid",
        },
      ]);

      console.log("ORDER CREATED ✔");
    }

    res.status(200).send("OK");
  } catch (err) {
    console.log(err);
    res.status(500).send("ERROR");
  }
});

module.exports = router;