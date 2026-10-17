import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
// Define class that contains logic and data for 
// Angular component
export class App {
  title = 'Task Dashboard';

  taskInput = '';
  taskList: string[] = [];
 

  addTask() {
    this.taskList.push(this.taskInput);
  }

  // Remove item from an array with 
  // specific position and 1 item
  deleteTask(index: number) {
  this.taskList.splice(index, 1);
}
}
