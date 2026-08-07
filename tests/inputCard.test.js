import { describe, test, expect, beforeEach } from "@jest/globals";
import inputCard from "../project/src/components/inputCard.js";

describe("Input Card Component", () => {

    beforeEach(() => {
        document.body.innerHTML = inputCard();
    });

    test("renders the New Task heading", () => {
        expect(document.querySelector("h2").textContent).toBe("New Task");
    });

    test("renders the task name input", () => {
        expect(document.querySelector("#task-name")).not.toBeNull();
    });

    test("renders the priority input", () => {
        expect(document.querySelector("#difficulty")).not.toBeNull();
    });

    test("renders the assignee input", () => {
        expect(document.querySelector("#Assignee")).not.toBeNull();
    });

    test("renders the due date input", () => {
        expect(document.querySelector("#Priority")).not.toBeNull();
    });

    test("renders the Add Task button", () => {
        expect(document.querySelector("#addto-list").textContent).toContain("Add Task");
    });

    test("renders the exit button", () => {
        expect(document.querySelector('[data-action="exit"]')).not.toBeNull();
    });

});