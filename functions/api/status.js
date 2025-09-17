/**
 * Cloudflare Pages Function: GET /api/status
 * Returns environment-aware deployment info so the landing can verify the pipeline.
 */
export async function onRequestGet({ env, request }) {
    const url = new URL(request.url);
    const payload = {
        ok: true,
        branch: env?.CF_PAGES_BRANCH || null,
        commit: env?.CF_PAGES_COMMIT_SHA || null,
        url: env?.CF_PAGES_URL || url.origin,
        hostname: url.hostname,
        timestamp: new Date().toISOString(),
    };
    return new Response(JSON.stringify(payload, null, 2), {
        headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
    });
}
