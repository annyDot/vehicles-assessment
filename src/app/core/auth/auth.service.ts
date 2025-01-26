import { inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private auth0 = inject(Auth0Service);
  private http = inject(HttpClient);
  private router = inject(Router);
  private destroy$ = new Subject<void>();
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(
    Boolean(this.token)
  );
  isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  login(username: string, password: string): void {
    const payload = {
      grant_type: 'password',
      client_id: environment.auth.clientId,
      audience: environment.auth.audience,
      scope: 'openid profile email',
      username,
      password,
    };

    this.http
      .post(`https://${environment.auth.domain}/oauth/token`, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('id_token', response.id_token);
          this.isAuthenticatedSubject$.next(true);
          this.router.navigate(['/vehicles']);
        },
        error: (err) => {
          console.error(err);
          this.isAuthenticatedSubject$.next(false);
        },
      });
  }

  logout(): void {
    this.auth0.logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.clear();
    this.isAuthenticatedSubject$.next(false);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
