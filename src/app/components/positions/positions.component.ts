import { Component,OnInit } from '@angular/core';
import { PositionService } from '../../services/position.service';
import { HttpClient,HttpClientModule  } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';  // import spinner module
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { BuySell } from '../../services/position.service';
import { ActionType } from '../../services/position.service';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';



@Component({
  selector: 'equity-positions',
  imports: [CommonModule, MatProgressSpinnerModule,MatTableModule,FormsModule, HttpClientModule],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss'
})
export class PositionsComponent implements OnInit {
  positions: { securityCode: string; quantity: number }[] = [];
  loading = false;
  error: string | null = null;

    // ===== ADDITIONS =====
  showAddForm = false;

  newPosition: {
  securityCode: string;
  quantity: number;
  buySell: BuySell;
  action: ActionType;
} = {
  securityCode: '',
  quantity: 0,
  buySell: 'BUY',
  action: 'INSERT' 
};

  displayedColumns = ['securityCode', 'quantity'];

  constructor(private positionService: PositionService) {}

  ngOnInit(): void {
    this.fetchPositions();
  }
  fetchPositions(): void {
    this.loading = true;
    this.error = null;

    this.positionService.getPositions().subscribe({
      next: (data) => {
        // Convert returned object into array for *ngFor in template
          console.log(data);
        this.positions = Object.entries(data).map(([securityCode, quantity]) => ({
          securityCode,
          quantity
        }));
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load positions.';
        this.loading = false;
      }
    });
  }

  // ===== ADD POSITION =====
  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  addPosition(): void {
    if (!this.newPosition.securityCode || this.newPosition.quantity <= 0) {
      return;
    }

    this.positionService.addPosition(this.newPosition).subscribe({
      next: () => {
        this.fetchPositions();     // refresh existing data
        this.resetForm();
        this.showAddForm = false;
      },
      error: () => {
        this.error = 'Failed to add position.';
      }
    });
  } 
  resetForm(): void {
    this.newPosition = {
      securityCode: '',
      quantity: 0,
      buySell: 'BUY',
      action: 'INSERT'
    };
  }
}
