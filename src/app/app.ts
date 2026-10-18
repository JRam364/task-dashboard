
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterUpgradeInitializer } from '@angular/router/upgrade';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
// Define class that contains logic and data for 
// Angular component
export class App implements OnInit{
  // Initialization function
  ngOnInit() {
      this.getWeather();
      this.loadTasks();
    }


  title = 'Task Dashboard';

  
  taskTime = '';
  taskInput = '';
 

  // Make taskList store name, and completion
  taskList: { name: string; 
              completed: boolean; 
              dueTime:string;
            }[] = [];

  // Automatically change the number of tasks
  get activeCount(): number {
   return this.taskList.filter(task => !task.completed).length;
}

  get completedCount(): number {
    return this.taskList.filter(task => task.completed).length;
}

  // Push tasks with no completion.. yet!
  addTask() {
    if (this.taskInput.trim() === ""){
      return;
    }

     this.taskList.push({
      name: this.taskInput,
      completed: false,
      dueTime: this.taskTime

    });

    this.taskInput = '';
    this.taskTime = '';
    this.saveTasks();
  }

  // Remove item from an array with 
  // specific position and 1 item
  deleteTask(index: number) {
    this.taskList.splice(index, 1);
    this.saveTasks();
  }

  // Function for reversing boolean values
  toggleTask(index: number) {
    this.taskList[index].completed = !this.taskList[index].completed;

    this.saveTasks();
  }

  // Define temperature as a signal with null first
  temperature = signal<number | null>(null);

  
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

  // Initiate key to identify saved data
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.taskList));
  }

  loadTasks() {
    // Get any saved tasks from local storage
    const savedTasks = localStorage.getItem('tasks');

    // If any are present, add them to taskList
    if (savedTasks){
      this.taskList = JSON.parse(savedTasks);
    }
  }
}