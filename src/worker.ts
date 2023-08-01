/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// Export a default object containing event handlers
export default {
	// The fetch handler is invoked when this worker receives a HTTP(S) request
	// and should return a Response (optionally wrapped in a Promise)
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// You'll find it helpful to parse the request.url string into a URL object. Learn more at https://developer.mozilla.org/en-US/docs/Web/API/URL
		const url = new URL(request.url);

		const type = getMimeTypeFromUrl(request.url);
		const init = {
			headers: {
				'content-type': `${type};charset=UTF-8`,
			},
		};
		// You can get pretty far with simple logic like if/switch-statements
		const regex = /^(\/my|\/ranking|\/_next\/.*)$/;
		if (regex.test(url.pathname)) {
			const serverUrl = 'http://localhost:3000/' + url.pathname;
			const response = await fetch(serverUrl, init);
			const results = await gatherResponse(response);
			return new Response(results, init);
		} else {
			const serverUrl = 'http://localhost:5500/static/index.html';
			const response = await fetch(serverUrl, init);
			const results = await gatherResponse(response);
			return new Response(results, init);
		}

		// return new Response(
		// 	`
		// 	Try making requests to:
		//   <ul style="font-size: 28px">
		//   <li><code><a href="/test/my">/test/my</a></code></li>
		//   <li><code><a href="/test/a">/test/a</a></code></li>
		//   <li><code><a href="/test/c">/test/c</a></code></li>
		// 	`,
		// 	{ headers: { 'Content-Type': 'text/html' } }
		// );
		return new Response('hello');
	},
};

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response: Response) {
	const { headers } = response;
	const contentType = headers.get('content-type') || '';
	if (contentType.includes('application/json')) {
		return JSON.stringify(await response.json());
	} else if (contentType.includes('application/text')) {
		return response.text();
	} else if (contentType.includes('text/html')) {
		return response.text();
	} else {
		return response.text();
	}
}

type MimeType = 'text/html' | 'text/css' | 'application/javascript' | 'image/jpeg' | 'image/png' | 'application/json' | 'text/plain';

function getMimeTypeFromUrl(url: string): MimeType | null {
	const extension = url.split('.').pop();

	switch (extension) {
		case 'html':
			return 'text/html';
		case 'css':
			return 'text/css';
		case 'js':
			return 'application/javascript';
		case 'jpeg':
		case 'jpg':
			return 'image/jpeg';
		case 'png':
			return 'image/png';
		case 'json':
			return 'application/json';
		case 'txt':
			return 'text/plain';
		default:
			return null;
	}
}
