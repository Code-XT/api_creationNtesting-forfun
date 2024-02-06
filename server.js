const express = require("express");
const fortunes = require("./json/fortune.js");
const emojiData = require("./json/emoji.json");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Fun API Testing...Ignore");
});

app.get("/fortune", (req, res) => {
  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  console.log("Fortune requested");

  res.send("Today's fortune: " + randomFortune);
});

app.get("/emoji", (req, res) => {
  res.json(emojiData || []);
});

app.get("/emoji/:keyword", (req, res) => {
  const keyword = req.params.keyword.toLowerCase().split(" ");
  const matchingEmojis = emojiData.emojis.filter((emoji) => {
    const emojiName = emoji.name.toLowerCase();
    return keyword.every((keyword) => emojiName.includes(keyword));
  });

  return res.json(matchingEmojis);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
