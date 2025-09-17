export async function onRequestGet() {
    return new Response("OK", { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } });
}
