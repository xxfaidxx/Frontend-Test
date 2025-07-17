import fetch from "node-fetch";

/**
 * Proxy image from a remote URL and return it to bypass CORS issues.
 */
const handler = async (req, context) => {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new Response("Missing 'url' query parameter", { status: 400 });
  }

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return new Response("Failed to fetch image from source.", {
        status: response.status,
      });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const imageBuffer = await response.arrayBuffer();

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    return new Response("Proxy error: " + error.message, { status: 502 });
  }
};

export default handler;
