import { describe, test, expect, beforeEach } from "@jest/globals";
import { store } from "../project/src/js/store";
import taskCard from "../project/src/components/task";
import { renderTask } from "../project/src/components/render";
describe("Render card component", () =>{
    beforeEach(() => {
        document.body.innerHTML = `<div class="tasks"></div>`;
        store.dispatch({
            type: "ROUTE_CHANGED",
            payload: {path: "/", params: {}}
        });
    });

    test("should render real task", () => {
        const tasks = document.querySelector(".tasks")

        const sampleTask = {
            title: "Integration Testing",
            assigned: "Vaisakh",
            due: "2026-08-10",
            priority: "High",
            complete: false,
        };
        store.dispatch({
            type: "ADD_TASK",
            payload: sampleTask,
        });
        renderTask();
        expect(tasks.innerHTML).not.toBe("");
        expect(tasks.innerHTML).toContain("Integration Testing");
        expect(tasks.innerHTML).toContain("Vaisakh");
    });
});