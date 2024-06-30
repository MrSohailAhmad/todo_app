export class Todo {
  constructor(
    public id: number,
    public task: string,
    public completed: boolean = false
  ) {}

  toggleCompletion(): void {
    this.completed = !this.completed;
  }
}
