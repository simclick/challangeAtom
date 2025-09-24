export interface UserProps { id?: string; email: string; displayName?: string; createdAt: Date; }
export class User {
  constructor(private props: UserProps) {}
  get id(){return this.props.id;} get email(){return this.props.email;} get displayName(){return this.props.displayName;} get createdAt(){return this.props.createdAt;}
  toObject(){return {...this.props};}
  static create(email: string, displayName?: string){ return new User({ email: email.toLowerCase(), displayName, createdAt: new Date() }); }
}
