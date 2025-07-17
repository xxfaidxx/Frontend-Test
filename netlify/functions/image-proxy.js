// netlify/functions/image-proxy.js
const fetch = require("node-fetch");

exports.handler = async function (event) {
  const imageUrl = event.queryStringParameters.url;

  if (!imageUrl) {
    return {
      statusCode: 400,
      body: "Missing image URL",
    };
  }

  try {
    const response = await fetch(imageUrl);
    const contentType = response.headers.get("content-type");
    const body = await response.buffer();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
      },
      body: body.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Image fetch failed",
    };
  }
};
