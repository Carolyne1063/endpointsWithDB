import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserDashboardComponent } from './user-dashboard.component';

describe('UserDashboardComponent', () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDashboardComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no outstanding requests
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch notebooks on initialization', () => {
    const mockNotebooks = [
      { id: '1', title: 'Notebook 1', body: '', createdAt: new Date() },
      { id: '2', title: 'Notebook 2', body: '', createdAt: new Date() }
    ];

    // Trigger the initialization of the component (e.g., ngOnInit)
    fixture.detectChanges();

    // Mock HTTP request
    const req = httpTestingController.expectOne('http://localhost:3000/api/notebooks');
    expect(req.request.method).toEqual('GET');

    // Respond with mock data
    req.flush(mockNotebooks);

    // Assert that component received the data
    expect(component.notebooks).toEqual(jasmine.arrayContaining(mockNotebooks));
  });
});
