import {
	createCors,
	error, // creates error Responses
	json, // creates JSON Responses
	Router, // the Router itself
	withParams, // middleware to extract params into the Request itself
} from 'itty-router';
import { getFGOEventWithDetailTime } from './FGO/util';
import { getAKEventWithDetailTime } from './Arknights/util';

// create the CORS pair
const { preflight, corsify } = createCors({
	methods: ['GET', 'PATCH', 'POST', 'OPTION'],
	origins: [
		'https://gameevent-frontend.pages.dev',
		'http://localhost:5173',
		'https://d7b65e5b.gameevent-frontend.pages.dev',
		'https://gameevent.sikara.asia',
		'https://ge.lee-sikaha.cloudns.ch',
	],
	// headers: {
	//   'my-funky-header': 'is pretty funky indeed',
	// },
});

const router = Router();

router
	// register the preflight middleware
	.all('*', preflight)

	// GET todos - just return some data!
	.get('/todos', (_, env) => env.VITE_PCR_API)

	.get('/pcr', async (_, env) => await fetch(env.VITE_PCR_API))

	.get('/genshin', async (_, env) => {
		try {
			const response = await fetch(env.VITE_GENSHIN_API);
			const genshin: any = await response.json();
			return genshin.data?.list.find((item: { type_id: number }) => item.type_id === 1);
		} catch (error: any) {
			return error(500, error.message);
		}
	})

	.get('/starrail', async (_, env) => {
		try {
			const response = await fetch(env.VITE_STARRAIL_API);
			const starrail: any = await response.json();
			return starrail.data?.list.find((item: { type_id: number }) => item.type_id === 4);
		} catch (error: any) {
			return error(500, error.message);
		}
	})

	.get('/fgo', async (_, env) => {
		try {
			const data = await getFGOEventWithDetailTime(env.VITE_FGOEventList_API);
			return { code: 200, data };
		} catch (error: any) {
			return error(500, error.message);
		}
	})

	.get('/ak', async (_, env) => {
		try {
			const data = await getAKEventWithDetailTime(env.VITE_AKEventList_API, env.VITE_AKEventDetail_API);
			return { code: 200, data };
		} catch (error: any) {
			return error(500, error.message);
		}
	})

	// *any* HTTP method works, even ones you make up
	.puppy('/secret', () => 'Because why not?')

	// return a 404 for anything else
	.all('*', () => error(404));
export interface Env {
	VITE_PCR_API: string;
	VITE_GENSHIN_API: string;
	VITE_STARRAIL_API: string;
	VITE_FGOEventList_API: string;
	VITE_AKEventList_API: string;
	VITE_AKEventDetail_API: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// return new Response('Hello World!');
		console.log('game-events-calendar-backend is running...');
		return (
			router
				.handle(request, env, ctx)
				.then(json)
				.catch(error)
				// add CORS headers to all requests,
				// including errors
				.then(corsify)
		);
	},
};
