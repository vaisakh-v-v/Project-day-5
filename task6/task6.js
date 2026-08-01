"use strict";
async function fetchJSON(url, payload) {
    try {
        const resp = await fetch(url, payload);
        if (!resp.ok) {
            throw new Error("Request not found");
        }
        return await resp.json();
    }
    catch (err) {
        if (err instanceof Error)
            return Promise.reject(err.message);
        return Promise.reject("Not resolved error");
    }
}
class ApiClient {
    baseUrl;
    requestInterceptor;
    responseInterceptor;
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    setRequestInterceptor(requestInterceptorCallback) {
        this.requestInterceptor = requestInterceptorCallback;
    }
    setResponseInterceptor(responseInterceptorCallback) {
        this.responseInterceptor = responseInterceptorCallback;
    }
    next(response) {
        return this.responseInterceptor(response);
    }
    async get(path) {
        return this.requestInterceptor(this.baseUrl + path);
    }
    async post(path, body) {
        return this.requestInterceptor(this.baseUrl + path, {
            method: "POST",
            body: JSON.stringify(body),
        });
    }
    async put(path, body) {
        return this.requestInterceptor(this.baseUrl + path, {
            method: "PUT",
            body: JSON.stringify(body),
        });
    }
    async delete(path) {
        return this.requestInterceptor(this.baseUrl + path, { method: "DELETE" });
    }
}
const mockApiClient = new ApiClient("https://jsonplaceholder.typicode.com");
mockApiClient.setRequestInterceptor(async (path, payload) => {
    console.log("Request is intercepted here");
    const resp = await fetchJSON(path, payload);
    return mockApiClient.next(resp);
});
mockApiClient.setResponseInterceptor((response) => {
    console.log("Response is intercepted here");
    console.log(response);
    return response;
});
mockApiClient.get("/posts/1");
