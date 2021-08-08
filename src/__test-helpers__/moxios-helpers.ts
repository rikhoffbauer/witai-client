import { AxiosInstance } from "axios";
import moxios from "moxios";

export function useMoxios(getAxiosInstance?: () => AxiosInstance) {
    beforeEach(() => moxios.install(getAxiosInstance && getAxiosInstance()));
    afterEach(() => moxios.uninstall(getAxiosInstance && getAxiosInstance()));
}

export function waitForMoxios<T = void>(
    fn?: () => T | Promise<T>,
    delay?: number,
) {
    return new Promise<T>(resolve => {
        moxios.wait(async () => {
            let result: T;

            if (fn) {
                result = await fn();
            }

            resolve(result);
        }, delay);
    });
}

export function getMostRecentRequest(): MoxiosRequest {
    return moxios.requests.mostRecent() as MoxiosRequest;
}

export type MoxiosRequest = ReturnType<typeof moxios.requests.mostRecent> & {
    reject(value: any): void;
};
export type MoxiosRespondWithOptions = Parameters<
    MoxiosRequest["respondWith"]
>[0];
export type PromiseValue<T> = T extends PromiseLike<infer U> ? U : T;
export type MoxiosResponse = PromiseValue<
    ReturnType<MoxiosRequest["respondWith"]>
>;

export function stubRequest(
    urlOrPattern: string | RegExp,
    response: MoxiosResponse,
): void {
    moxios.stubRequest(urlOrPattern, response);
}

export async function stubFailure(
    method: string,
    urlOrPattern: string | RegExp,
    response: MoxiosResponse,
): Promise<void> {
    await moxios.stubFailure(method, urlOrPattern, response);
}

export function respondToMostRecentRequest(
    response: MoxiosRespondWithOptions,
): Promise<MoxiosResponse> {
    return respondToRequest(getMostRecentRequest(), response);
}

export function respondToRequest(
    request: MoxiosRequest,
    response: MoxiosRespondWithOptions,
): Promise<MoxiosResponse> {
    return request.respondWith(response);
}
