
import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatSidenavModule,
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'frontend-admin';
  isMobile = false;
  loadingService = inject(LoadingService);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver) {}

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      this.isMobile = res.matches;
      if (this.isMobile) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  logout() {
    window.location.href = 'http://localhost:5173';
  }
}
