/**
 * Sites deployment adapter.
 *
 * The publication itself remains fully prerendered. This Worker performs no
 * rendering, data access, or API work; it only asks the platform's static asset
 * binding for the files already present in dist/client.
 */
export default {
  async fetch(request, env) {
    if (!env?.ASSETS?.fetch) {
      return new Response("Static asset binding unavailable.", { status: 500 });
    }

    const original = await env.ASSETS.fetch(request);
    if (original.status !== 404 || !["GET", "HEAD"].includes(request.method)) {
      return original;
    }

    const url = new URL(request.url);
    if (!url.pathname.endsWith("/") && !url.pathname.split("/").at(-1)?.includes(".")) {
      url.pathname += "/";
    }
    if (url.pathname.endsWith("/")) {
      url.pathname += "index.html";
      const indexResponse = await env.ASSETS.fetch(new Request(url, request));
      if (indexResponse.status !== 404) return indexResponse;
    }

    const fallbackUrl = new URL("/404.html", request.url);
    const fallback = await env.ASSETS.fetch(new Request(fallbackUrl, request));
    return new Response(fallback.body, {
      status: 404,
      headers: fallback.headers
    });
  }
};
