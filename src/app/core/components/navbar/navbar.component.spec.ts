import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MockProvider } from 'ng-mocks';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;
  let routerMock: any;

  beforeEach(async () => {
    routerMock = {
      navigate: () => {},
      url: '/vehicles',
      events: of({}),
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent],
      providers: [MockProvider(AuthService), MockProvider(Router, routerMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const title = 'Test Title';
    component.title = title;

    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('.p-toolbar-title'));

    expect(titleElement.nativeElement.textContent).toContain(title);
  });
});
