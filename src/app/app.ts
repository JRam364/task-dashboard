
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
// Define class that contains logic and data for 
// Angular component
export class App implements OnInit{
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

  // Define temperature as a signal with null first
  temperature = signal<number | null>(null);

  // Initialization function
  ngOnInit() {
      this.getWeather();
    }

  // Define this function that can wait for an API response
  async getWeather() {
    // Send a GET to weather API
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=39.48&longitude=-88.37&current=temperature_2m&temperature_unit=fahrenheit'
    );
    console.log('Response status:', response.status);

    // Wait for asynchronous operations to finish
    // Convert JSON into data object
    const data = await response.json();

    console.log('Weather data:', data);
    // Read current temperature and store result for display
    this.temperature.set(data.current.temperature_2m);
  }
}