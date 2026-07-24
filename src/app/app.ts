import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Loading} from './shared/loading/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Loading],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mortall-site');
}
