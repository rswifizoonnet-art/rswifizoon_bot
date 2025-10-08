import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// তোমার বটের টোকেন ও চ্যাট আইডি
const BOT_TOKEN = "8312207925:AAHQJAnGyl60GrnSM_mk92z77M0SLOGJxR0";
const CHAT_ID = "-4910989435";

// Telegram webhook endpoint
app.post(`/webhook/${BOT_TOKEN}`, async (req, res) => {
  const update = req.body;

  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text;

    console.log("📩 নতুন মেসেজ:", text);

    // ইউজারকে রিপ্লে পাঠানো
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `📨 আপনি লিখেছেন: ${text}`
      })
    });
  }

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("✅ RS WiFi ZOON Bot Server চলছে!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Bot server running on port ${PORT}`));
