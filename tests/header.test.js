import { describe, test, expect } from "@jest/globals";
import Header from "../project/src/components/header.js";

console.log("Header test file loaded");

describe("Header Component", () => {

    test("returns an HTML string", () => {
        const html = Header();
        expect(typeof html).toBe("string");
    });

    test("contains the Task Manager heading", () => {
        const html = Header();
        expect(html).toContain("Task Manager");
    });

    test("contains the description text", () => {
        const html = Header();
        expect(html).toContain("Organize your work efficiently");
    });

    test("contains a section element", () => {
        const html = Header();
        expect(html).toContain("<section>");
    });

    test("contains the head-container class", () => {
        const html = Header();
        expect(html).toContain('class="head-container"');
    });

    test("contains the heading class", () => {
        const html = Header();
        expect(html).toContain('class="heading"');
    });

});