import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { MockModule, MockProvider } from 'ng-mocks';
import { ToolbarModule } from 'primeng/toolbar';
import { By } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MockModule(AuthModule),
        HttpClientTestingModule,
        MockModule(ToolbarModule),
        MockModule(ButtonModule),
      ],
      declarations: [AppComponent, NavbarComponent],
      providers: [MockProvider(AuthService), HttpTestingController],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have title 'VehicleOverviewApp'`, () => {
    expect(component.title).toEqual('VehicleOverviewApp');
  });

  it('should pass the title to NavbarComponent', () => {
    const navbarElement = fixture.debugElement.query(By.css('app-navbar'));
    const navbarInstance = navbarElement.componentInstance;

    expect(navbarInstance.title).toEqual('Vehicle Overview App');
  });
});
