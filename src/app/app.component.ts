import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PositionsComponent } from './components/positions/positions.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, PositionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'equity-positions-app';
}
