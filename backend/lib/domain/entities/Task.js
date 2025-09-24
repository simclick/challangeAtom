"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
class Task {
    constructor(props) {
        this.props = props;
    }
    get id() { return this.props.id; }
    get userEmail() { return this.props.userEmail; }
    get title() { return this.props.title; }
    get description() { return this.props.description; }
    get completed() { return this.props.completed; }
    get createdAt() { return this.props.createdAt; }
    toObject() { return { ...this.props }; }
    static create(input) {
        return new Task({ userEmail: input.userEmail.toLowerCase(), title: input.title, description: input.description || '', completed: false, createdAt: new Date() });
    }
}
exports.Task = Task;
//# sourceMappingURL=Task.js.map