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
  // Super liberal CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Max-Age", "86400");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (Math.random() > 0.8) {
    res.writeHead(500);
    res.end();
  } else if (req.url === "/lgtm" && req.method === "GET") {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(phrase);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () =>
  console.log("Server running on http://localhost:3000"),
);
