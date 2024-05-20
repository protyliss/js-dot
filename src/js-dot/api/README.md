# @js-dot/api

API Design Pattern

* [http](http/README.md)
* worker
* ws
* sse

---

## Pipe Operators

### HTTP

#### Setters

| Name         | (Sugar)     | Description                                                     |
|--------------|-------------|-----------------------------------------------------------------|
| $credentials |             | Set Credentials                                                 |
| $intercept   |             | Set Interceptor for __Change Request and Response__             |
|              | $before     | Set Interceptor for __Change Request__                          |
|              | $after      | Set Interceptor for __Change Response__                         |
| $request     |             | Set Transformer for Change __Request Path Parameters and Body__ |
|              | $parameters | Set Transformer for __Request Path Parameters__                 |
|              | $body       | Set Transformer for __Request Body__                            |
| $response    |             | Set Transformer for __Response Body__                           |


#### Getters

| Name   | Sugar | Description                |
|--------|-------|----------------------------|
| clone$ |       | Get Copied `HttpRequester` |

