import { Todo } from "./Todo.js";

export class TodoList {
  private todos: Todo[] = [];

  addTask(task: string): void {
    const newTodo = new Todo(Date.now(), task);
    this.todos.push(newTodo);
  }

  toggleTaskCompletion(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.toggleCompletion();
    }
  }

  removeTask(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  getAllTasks(): Todo[] {
    return this.todos;
  }
}
