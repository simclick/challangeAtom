"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(props) {
        this.props = props;
    }
    get id() { return this.props.id; }
    get email() { return this.props.email; }
    get displayName() { return this.props.displayName; }
    get createdAt() { return this.props.createdAt; }
    toObject() { return { ...this.props }; }
    static create(email, displayName) { return new User({ email: email.toLowerCase(), displayName, createdAt: new Date() }); }
}
exports.User = User;
//# sourceMappingURL=User.js.map