import { AxiosResponse } from "axios";

export class WitAIRequestError extends Error {
    public readonly name = "WitAIRequestError";
    public readonly response: AxiosResponse;

    constructor(response: AxiosResponse) {
        super(
            response.statusText ||
                `WitAI AI responded with status code: ${response.status}`,
        );
        this.response = response;
    }

    public getStatusCode(): number {
        return this.response.status;
    }
}
