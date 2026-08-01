type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Payload = {
  method: Method;
  body?: string;
};

async function fetchJSON<T>(url: string, payload?: Payload): Promise<T> {
  try {
    const resp: Response = await fetch(url, payload);
    if (!resp.ok) {
      throw new Error("Request not found");
    }
    return await resp.json();
  } catch (err) {
    if (err instanceof Error) return Promise.reject(err.message);
    return Promise.reject("Not resolved error");
  }
}

class ApiClient {
  private baseUrl: string;
  private requestInterceptor!: <T>(
    url: string,
    payload?: Payload,
  ) => Promise<T>;
  private responseInterceptor!: <T>(response: T) => T;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setRequestInterceptor(
    requestInterceptorCallback: <T>(
      url: string,
      payload?: Payload,
    ) => Promise<T>,
  ) {
    this.requestInterceptor = requestInterceptorCallback;
  }

  setResponseInterceptor(responseInterceptorCallback: <T>(response: T) => T) {
    this.responseInterceptor = responseInterceptorCallback;
  }

  next<T>(response: T): T {
    return this.responseInterceptor(response);
  }

  async get<T>(path: string): Promise<T> {
    return this.requestInterceptor(this.baseUrl + path);
  }
  async post<T, B>(path: string, body: B): Promise<T> {
    return this.requestInterceptor(this.baseUrl + path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }
  async put<T, B>(path: string, body: B): Promise<T> {
    return this.requestInterceptor(this.baseUrl + path, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }
  async delete<T>(path: string): Promise<T> {
    return this.requestInterceptor(this.baseUrl + path, { method: "DELETE" });
  }
}

const mockApiClient = new ApiClient("https://jsonplaceholder.typicode.com");

mockApiClient.setRequestInterceptor(
  async <T>(path: string, payload?: Payload) => {
    console.log("Request is intercepted here");
    const resp = await fetchJSON<T>(path, payload);
    return mockApiClient.next(resp);
  },
);

mockApiClient.setResponseInterceptor(<T>(response: T) => {
  console.log("Response is intercepted here");
  console.log(response);
  return response;
});

mockApiClient.get("/posts/1");