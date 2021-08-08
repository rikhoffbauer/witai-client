import {
    MoxiosResponse,
    getMostRecentRequest,
    respondToMostRecentRequest,
    useMoxios,
    waitForMoxios,
} from "./__test-helpers__/moxios-helpers";
import { WitAIClient, WitAIClientOptions } from "./WitAIClient";
import { WitAIRequestError } from "./WitAIRequestError";

describe("WitAIClient(options)", () => {
    describe("#parse(message)", () => {
        const apiKey = "apiKey";
        const version = "version";
        const options: WitAIClientOptions = { apiKey, version };

        let client: WitAIClient;

        beforeEach(() => {
            client = WitAIClient(options);
        });

        useMoxios(() => client.axios);

        it("should call the wit.ai message endpoint with the provided message", async () => {
            const message = "message";
            // noinspection ES6MissingAwait
            client.parse(message);
            await waitForMoxios();
            const request = getMostRecentRequest();
            expect(request.config.params.q).toBe(message);
        });

        it("should call the wit.ai message endpoint with the provided version", async () => {
            // noinspection ES6MissingAwait
            client.parse("");
            await waitForMoxios();
            const request = getMostRecentRequest();
            expect(request.config.params.v).toBe(version);
        });

        it("should call the wit.ai message endpoint with the provided apiKey", async () => {
            // noinspection ES6MissingAwait
            client.parse("");
            await waitForMoxios();
            const request = getMostRecentRequest();
            const authorizationHeader: any =
                request.config.headers["Authorization"];
            expect(authorizationHeader).toBe(`Bearer ${apiKey}`);
        });

        it("should throw a WitAIRequestError if the request fails", async () => {
            const response = { status: 500 } as MoxiosResponse;

            const promise = client.parse("");

            await waitForMoxios(async () => {
                getMostRecentRequest().reject(response);

                await new Promise<void>(resolve =>
                    promise.catch(err => {
                        expect(err).toBeInstanceOf(WitAIRequestError);
                        resolve();
                    }),
                );
            });
        });

        it("should return the data the wit.ai API responded with", async () => {
            const responseBody = { responseBody: true };
            const clientParseResponsePromise = client.parse("");
            await waitForMoxios();
            await respondToMostRecentRequest({
                status: 200,
                response: responseBody,
            });
            const result = await clientParseResponsePromise;
            expect(result).toBe(responseBody);
        });
    });
});
