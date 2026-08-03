type Observer<T> = (arg: T) => void;
type  Unsubscribe = () => void;

interface Observable<T> {
  subscribe(observer: Observer<T>): Unsubscribe;
}

class Subject<T> implements Observable<T> {
  listeners: Observer<T>[];

  constructor() {
    this.listeners = [];
  }

  subscribe(observer: Observer<T>) {
    this.listeners.push(observer);
    return () => {
      const index = this.listeners.indexOf(observer);
      this.listeners.splice(index, 1);
    };
  }
}

const subject = new Subject<string>();
const unsubcribe = subject.subscribe((name: string) => console.log(name));
const greet = (name: string) => console.log(`Hello, ${name}`);
subject.subscribe(greet);
console.log(subject.listeners);
unsubcribe();
console.log(subject.listeners);

interface Command {
  execute(): void;
  undo(): void;
}

class CommandHistory {
  private historyStack: Command[] = [];
  private undoStack: Command[] = [];
  executeCommand(command: Command): void {
    command.execute();
    this.historyStack.push(command);
    this.undoStack.splice(0);
  }
  undo(): void {
    const command = this.historyStack.pop();
    if (command) {
      command.undo();
      this.undoStack.push(command);
    }
  }
  redo(): void {
    const command = this.undoStack.pop();
    if (command) {
      command.execute();
      this.historyStack.push(command);
    }
    }
}

const commandOne: Command = {
  execute() {
    console.log("Command 1 executed");
  },
  undo() {
    console.log("Command 1 undo");
  },
};

const commandTwo: Command = {
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