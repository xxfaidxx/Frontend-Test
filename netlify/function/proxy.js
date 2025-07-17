const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { url } = event.queryStringParameters;

  if (!url) {
    return {
      statusCode: 400,
      body: "Missing URL parameter",
    };
  }

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");
    const buffer = await response.arrayBuffer();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
      },
      body: Buffer.from(buffer).toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error fetching image: ${error.message}`,
    };
  }
};
