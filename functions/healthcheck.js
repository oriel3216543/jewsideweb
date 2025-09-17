/**
 * Cloudflare Pages Function: GET /healthcheck
 * @returns {Promise<Response>}
 */
export async function onRequestGet() {
  try {
    return new Response("OK", { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } });
  } catch (_) {
    return new Response("OK", { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } });
  }
}
