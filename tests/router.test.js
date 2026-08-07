import {
    describe,
    test,
    expect,
    beforeEach,
    jest
} from "@jest/globals";

const dispatch = jest.fn();
const subscribe = jest.fn();

jest.unstable_mockModule("../project/src/js/store.js", () => ({
    store: {
        dispatch,
        subscribe
    }
}));

jest.unstable_mockModule("../project/src/routes/home.js", () => ({
    default: () => "<h1>Home</h1>"
}));

jest.unstable_mockModule("../project/src/routes/login.js", () => ({
    default: () => "<h1>Login</h1>"
}));

jest.unstable_mockModule("../project/src/routes/app.js", () => ({
    default: () => "<h1>App</h1>"
}));

jest.unstable_mockModule("../project/src/components/render.js", () => ({
    renderTask: jest.fn()
}));

beforeEach(() => {
    dispatch.mockClear();
    subscribe.mockClear();

    document.body.innerHTML = `
        <div id="app"></div>
        <div class="center"></div>
    `;

    window.location.hash = "";
});

// Import AFTER all mocks
await import("../project/src/router.js");

describe("Router", () => {

    test("dispatches home route on load", () => {

        window.dispatchEvent(new Event("load"));

        expect(dispatch).toHaveBeenCalledWith({
            type: "ROUTE_CHANGED",
            payload: {
                path: "/",
                params: {}
            }
        });

    });

    test("dispatches login route on hashchange", () => {

        window.location.hash = "#login";

        window.dispatchEvent(new Event("hashchange"));

        expect(dispatch).toHaveBeenCalledWith({
            type: "ROUTE_CHANGED",
            payload: {
                path: "login",
                params: {}
            }
        });

    });

});