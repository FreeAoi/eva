import type { paths } from './api';
import { Fetcher } from './fetcher';
import type { Middleware } from './types';

const logger: Middleware = async (url, init, next) => {
    console.log(`fetching ${url}`);
    const response = await next(url, init);
    console.log(`fetched ${url}`);
    return response;
};

const fetcher = Fetcher.for<paths>();
fetcher.configure({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    use: [logger],
});

export function getUser(role: 'STUDENT' | 'TEACHER') {
    if (role === 'STUDENT') {
        return fetcher.path('/api/student/me').method('get').create();
    }

    return fetcher.path('/api/teacher').method('get').create();
}

export default fetcher;
