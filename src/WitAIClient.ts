import axios, { AxiosInstance } from "axios";

import { WIT_AI__MESSAGE_ENDPOINT } from "./constants";
import { WitAIParseResponse } from "./WitAIParseResponse";
import { WitAIRequestError } from "./WitAIRequestError";

export interface WitAIClient {
    readonly axios: AxiosInstance;

    parse(message: string): Promise<WitAIParseResponse>;
}

export interface WitAIClientOptions {
    apiKey: string;
    version: string | number;
}

export function WitAIClient(options: WitAIClientOptions) {
    const axios = configureAxios(options);
    const client: WitAIClient = Object.freeze({ axios, parse });

    return client;

    async function parse(message: string): Promise<WitAIParseResponse> {
        const config = { params: { q: message } };
        try {
            const response = await axios.get(WIT_AI__MESSAGE_ENDPOINT, config);

            if (response.status !== 200) {
                // noinspection ExceptionCaughtLocallyJS
                throw new WitAIRequestError(response);
            }

            return response.data;
        } catch (e: any) {
            if (e instanceof WitAIRequestError) {
                throw e;
            }

            throw new WitAIRequestError({
                config,
                request: { config },
                status: e.status,
                statusText: e.statusText || e.message,
                headers: e.headers ?? {},
                data: {},
            });
        }
    }
}

function configureAxios({ apiKey, version: v }: WitAIClientOptions) {
    const headers = { Authorization: `Bearer ${apiKey}` };
    return axios.create({ headers, params: { v } });
}
