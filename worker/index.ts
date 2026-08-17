import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

async function fetchStaticAsset(request: Request, env: Env, pathname: string) {
  const assetUrl = new URL(request.url);
  assetUrl.pathname = pathname;
  return env.ASSETS.fetch(new Request(assetUrl, request));
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return fetchStaticAsset(request, env, "/index.html");
    }

    if (url.pathname.endsWith("/")) {
      const response = await fetchStaticAsset(
        request,
        env,
        `${url.pathname}index.html`,
      );
      if (response.ok) return response;
    }

    if (
      url.pathname === "/index.html" ||
      url.pathname.startsWith("/assets/") ||
      url.pathname.startsWith("/papers/")
    ) {
      return fetchStaticAsset(request, env, url.pathname);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
