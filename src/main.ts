import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { PositionsComponent } from './app/components/positions/positions.component';
import { provideHttpClient } from '@angular/common/http';



bootstrapApplication(PositionsComponent, {
  providers: [
    provideHttpClient(), // Add this line
    // your other providers
  ]
});