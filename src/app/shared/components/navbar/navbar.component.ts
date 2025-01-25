import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() title = '';
  private currentRoute = '';
  private router = inject(Router);
  authService = inject(AuthService);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    this.router.events.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  isLogoutButtonVisible(): boolean {
    return this.currentRoute !== '/login';
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
