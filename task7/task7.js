"use strict";
class Subject {
    listeners;
    constructor() {
        this.listeners = [];
    }
    subscribe(observer) {
        this.listeners.push(observer);
        return () => {
            const index = this.listeners.indexOf(observer);
            this.listeners.splice(index, 1);
        };
    }
}
const subject = new Subject();
const unsubcribe = subject.subscribe((name) => console.log(name));
const greet = (name) => console.log(`Hello, ${name}`);
subject.subscribe(greet);
console.log(subject.listeners);
unsubcribe();
console.log(subject.listeners);
class CommandHistory {
    historyStack = [];
    undoStack = [];
    executeCommand(command) {
        command.execute();
        this.historyStack.push(command);
        this.undoStack.splice(0);
    }
    undo() {
        const command = this.historyStack.pop();
        if (command) {
            command.undo();
            this.undoStack.push(command);
        }
    }
    redo() {
        const command = this.undoStack.pop();
        if (command) {
            command.execute();
            this.historyStack.push(command);
        }
    }
}
const commandOne = {
    execute() {
        console.log("Command 1 executed");
    },
    undo() {
        console.log("Command 1 undo");
    },
};
const commandTwo = {
    execute() {
        console.log("Command 2 executed");
    },
    undo() {
        console.log("Command 2 undo");
    },
};
const commandHistory = new CommandHistory();
commandHistory.executeCommand(commandOne);
commandHistory.executeCommand(commandTwo);
commandHistory.undo();
commandHistory.redo();
