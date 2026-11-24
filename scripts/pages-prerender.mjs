// Vinext beta.5 requests unprefixed paths from its internal prerender server
// even when basePath is configured. Correct only these build-time requests;
// neither browser requests nor the local development server use this hook.
const originalFetch = globalThis.fetch;
globalThis.fetch = (input, options) => {
  if (process.env.VINEXT_PRERENDER === '1') {
    const url = new URL(input instanceof Request ? input.url : input);
    if (
      url.hostname === '127.0.0.1' &&
      url.port &&
      !url.pathname.startsWith('/__vinext/')
    ) {
      if (!url.pathname.startsWith('/abraza-tu-paz/'))
        url.pathname = `/abraza-tu-paz${url.pathname}`;
      if (!url.pathname.endsWith('/') && !url.pathname.split('/').at(-1).includes('.'))
        url.pathname += '/';
      input = input instanceof Request ? new Request(url, input) : url;
    }
  }
  return originalFetch(input, options);
};
