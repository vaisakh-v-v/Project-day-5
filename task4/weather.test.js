jest.mock("./weather-util.js");
const darkMode = require("./darkmode.js");
const weather = require("./weather.js");
const fetchData = require("./weather-util.js");


beforeEach(() => {
    document.body.innerHTML = `<div id=app></div>`;
});

afterEach(() => {

    jest.restoreAllMocks();
});
describe("Mocking local storage", () => {
    const localStorageMock = jest
        .spyOn(Storage.prototype, "getItem")
        .mockImplementation((data) => {
            if (data === "data-theme") return "dark";
        });
    test("if dark mode reads preference on init", () => {
        darkMode();
        expect(localStorageMock).toHaveBeenCalledWith("data-theme");
    });
});

describe("testing weather module", () => {
    test("checking the url", async () => {
        weather();
        expect(fetchData).toHaveBeenCalled();
    });
});