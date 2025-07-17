// server.js
const express = require("express");
const request = require("request");
const app = express();

app.get("/proxy-image", (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send("No image URL");

  request({
    url: imageUrl,
    headers: { Referer: "https://suitmedia-backend.suitdev.com" },
  })
    .on("error", () => res.sendStatus(500))
    .pipe(res);
});

app.listen(3001, () => console.log("Proxy server running on port 3001"));
