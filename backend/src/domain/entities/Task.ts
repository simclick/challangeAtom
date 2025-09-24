export interface TaskProps { id?: string; userEmail: string; title: string; description?: string; completed: boolean; createdAt: Date; }
export class Task {
  constructor(private props: TaskProps) {}
  get id(){return this.props.id;} get userEmail(){return this.props.userEmail;} get title(){return this.props.title;} get description(){return this.props.description;} get completed(){return this.props.completed;} get createdAt(){return this.props.createdAt;}
  toObject(){return {...this.props};}
  static create(input: {userEmail: string; title: string; description?: string}) {
    return new Task({ userEmail: input.userEmail.toLowerCase(), title: input.title, description: input.description || '', completed: false, createdAt: new Date() });
  }
}
