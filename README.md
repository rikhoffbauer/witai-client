# witai-client

A client for [wit.ai](https://wit.ai) apps for `nodejs` and the browser written in `TypeScript`.

## Installation

```shell
# using npm
npm i witai-client

# using yarn
yarn add witai-client

# using pnpm
pnpm i witai-client
```

## Usage

```typescript
import { WitAIClient } from "witai-client";

const client = new WitAIClient({
    apiKey: "xxxxx",
    version: 20210803 // may be a string too
});

const result = await client.parse("Hey man, I would like to order a venti caramello choca-mocha-loca with soy milk and tears of the children of god with extra choca, mocha and loca");

```

This gives the `result` variable a value that looks somethign like following:

```json
{
    "text": "Hey man, I would like to order a venti caramello choca-mocha-loca with soy milk and tears of the children of god with extra choca, mocha and loca",
    "intents": [
        {
            "id": "313103496475850",
            "name": "order",
            "confidence": 0.9247
        }
    ],
    "entities": {
        "product_name:product_name": [
            {
                "id": "3266075100124262",
                "name": "product_name",
                "role": "product_name",
                "start": 7,
                "end": 8,
                "body": "venti caramello choca-mocha-loca",
                "confidence": 0.84562,
                "entities": [
                    {
                        "id": "925892752307590",
                        "name": "coffee_size:coffee_size",
                        "role": "coffee_size:coffee_size",
                        "value": "venti",
                        "body": "venti",
                        "start": "venti",
                        "end": "venti",
                        "confidence": 0.66232,
                        "suggested": false,
                        "type": "value"
                    }
                ],
                "suggested": true,
                "value": "venti caramello choca-mocha-loca",
                "type": "value"
            }
        ]
    },
    "traits": {
        "wit$sentiment": [
            {
                "id": "5ac2b50a-44e4-466e-9d49-bad6bd40092c",
                "value": "neutral",
                "confidence": 0.9043
            }
        ],
        "wit$greetings": [
            {
                "id": "5900cc2d-41b7-45b2-b21f-b950d3ae3c5c",
                "value": "true",
                "confidence": 0.9992
            }
        ]
    }
}
```
