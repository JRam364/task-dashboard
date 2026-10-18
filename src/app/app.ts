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

temperature: number | null = null;

// Define this function that can wait for an API response
async getWeather() {
  // Send a GET to weather API
  const response = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current=temperature_2m&temperature_unit=fahrenheit'
  );
  // Wait for asynchronous operations to finish
  // Convert JSON into data object
  const data = await response.json();

  // Read current temperature and store result for display
  this.temperature = data.current.temperature_2m;
}
}