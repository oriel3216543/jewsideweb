export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const env: Record<string, string | undefined> = (globalThis as any).process?.env || {};
    const payload = {
      ok: true,
      branch: env.CF_PAGES_BRANCH ?? null,
      commit: env.CF_PAGES_COMMIT_SHA ?? null,
      url: env.CF_PAGES_URL ?? url.origin,
      hostname: url.hostname,
      timestamp: new Date().toISOString(),
    };
    return new Response(JSON.stringify(payload, null, 2), {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  } catch (e) {
    const fallback = {
      ok: false,
      branch: null,
      commit: null,
      url: "",
      hostname: "",
      timestamp: new Date().toISOString(),
    };
    return new Response(JSON.stringify(fallback, null, 2), {
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "no-store",
      },
      status: 200,
    });
  }
}
