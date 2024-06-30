import inquirer from "inquirer";
import { TodoList } from "./TodoList.js";

async function promptUser(todoList: TodoList): Promise<void> {
  const mainMenuChoices = [
    "Add Task",
    "Toggle Task Completion",
    "Remove Task",
    "View Tasks",
    "Exit",
  ];

  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Choose an action:",
        choices: mainMenuChoices,
      },
    ]);

    switch (action) {
      case "Add Task":
        const { task } = await inquirer.prompt([
          {
            type: "input",
            name: "task",
            message: "Enter the task:",
          },
        ]);
        todoList.addTask(task);
        console.log("Task added!");
        break;
      case "Toggle Task Completion":
        const tasks = todoList.getAllTasks().map((todo: any) => ({
          name: todo.task,
          value: todo.id,
          checked: todo.completed,
        }));
        const { taskId } = await inquirer.prompt([
          {
            type: "checkbox",
            name: "taskId",
            message: "Select tasks to toggle completion:",
            choices: tasks,
          },
        ]);
        taskId.forEach((id: number) => todoList.toggleTaskCompletion(id));
        console.log("Task(s) completion toggled!");
        break;
      case "Remove Task":
        const tasksToRemove = todoList.getAllTasks().map((todo: any) => ({
          name: todo.task,
          value: todo.id,
        }));
        const { taskIdToRemove } = await inquirer.prompt([
          {
            type: "list",
            name: "taskIdToRemove",
            message: "Select task to remove:",
            choices: tasksToRemove,
          },
        ]);
        todoList.removeTask(taskIdToRemove);
        console.log("Task removed!");
        break;
      case "View Tasks":
        const allTasks = todoList.getAllTasks();
        if (allTasks.length === 0) {
          console.log("No tasks found.");
        } else {
          console.log("Tasks:");
          allTasks.forEach((todo: any) => {
            console.log(`[${todo.completed ? "x" : " "}] ${todo.task}`);
          });
        }
        break;
      case "Exit":
        console.log("Exiting Todo List App...");
        return;
      default:
        console.log("Invalid action.");
        break;
    }
  }
}

const todoList = new TodoList();
promptUser(todoList).catch((err) => console.error(err));
