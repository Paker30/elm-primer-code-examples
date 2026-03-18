const http = require("http");

const phrases = [
  "Looks Good To Me 👍",
  "Let's Go To Mars 🚀",
  "Love Grows Through Mistakes 💚",
  "Learning Goes Through Making 📚",
  "Life's Good, Trust Me ✨",
  "Let's Get This Merged 🎯",
  "Lovely Green Tea Moment 🍵",
  "Lunch Gathering This Monday 🍽️",
  "Legendary Groundbreaking Technical Marvel 🏆",
  "Let's Grab Tacos, Maybe? 🌮",
  "Laughing Genuinely This Much 😄",
  "Late Game Team Move ♟️",
  "Loops Getting Too Meta 🌀",
  "Lighthouse Guiding Through Midnight 🏮",
  "Literally Going Through Masterpiece 🎨",
];

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (Math.random() > 0.8 && req.method === "GET" && req.url === "/lgtm") {
    res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "randomized failure" }));
    return;
  }

  if (req.url === "/lgtm" && req.method === "GET") {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    const payload = { phrase, source: "random", length: phrase.length };
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(payload));
    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(3000, () =>
  console.log("Server running on http://localhost:3000"),
);
