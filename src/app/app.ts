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
  message = '';

  showMessage(){
    this.message = "Welcome to the Task Dashboard"
  }

}
