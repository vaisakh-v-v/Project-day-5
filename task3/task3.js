"use strict";
// Task 3 (45 min) - Discriminated Unions for API Responses
// 632. Define ApiResponse<T> = { success: true; data: T } | { success: false; error: string; statusCode:
// number }
// 633. Write handleResponse<T>(response: ApiResponse<T>) that TypeScript narrows correctly in
// each branch
// 634. Define LoadingState<T>: idle | loading | { status: 'success'; data: T } | { status: 'error'; error:
// Error }
// 635. Use LoadingState<User[]> in a function that returns the correct HTML string for each state
function handleResponse(response) {
    if (!(response !== null && typeof response === "object"))
        return;
    if (!response.success) {
        return `Executed some function on error ${JSON.stringify(response.error)}`;
    }
    return `Executed some function on data ${JSON.stringify(response.data)}`;
}
function returnHTML(state) {
    switch (state.status) {
        case "idle":
            return `<span>Idle</span>`;
        case "loading":
            return `<span>loading</span>`;
        case "error":
            return `<span>Error:${state.error.message}</span>`;
        case "success":
            return `<span>Success: ${JSON.stringify(state.data)}</span>`;
    }
}
console.log(returnHTML({
    status: "success",
    data: [
        {
            name: "Vaisakh",
            avatar: "Some Avatar",
            id: "some id",
            createdAt: "today",
        },
    ],
}));
