import { Task } from "./classes";

console.log(typeof Task);
let task = new Task();
task.showId();
Task.loadAll();