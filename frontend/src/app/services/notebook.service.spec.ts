// src/app/services/notebook.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { NotebookService } from './notebook.service';
import { notebook } from '../components/interfaces/notebook.interface';

describe('NotebookService', () => {
  let service: NotebookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        NotebookService,
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(NotebookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a notebook', () => {
    const newNotebook: notebook = { id: '1', title: 'Test Notebook', body: 'This is a test notebook', createdAt: '2023-01-01T00:00:00Z' };

    service.createNotebook(newNotebook).subscribe(response => {
      expect(response).toEqual(newNotebook);
    });

    const req = httpMock.expectOne(service.getApiUrl());
    expect(req.request.method).toBe('POST');
    req.flush(newNotebook);
  });

  it('should update a notebook', () => {
    const updatedNotebook: notebook = { id: '1', title: 'Updated Notebook', body: 'Updated content', createdAt: '2023-01-01T00:00:00Z' };

    service.updateNotebook('1', updatedNotebook).subscribe(response => {
      expect(response).toEqual(updatedNotebook);
    });

    const req = httpMock.expectOne(`${service.getApiUrl()}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedNotebook);
  });

  it('should delete a notebook', () => {
    const notebookId = '123'; 

    service.deleteNotebook(notebookId).subscribe((response) => {
      expect(response).toBeNull(); // Adjust this expectation based on your service's response handling
    });

    const req = httpMock.expectOne(`${service.getApiUrl()}/123`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should fetch all notebooks', () => {
    const mockNotebooks: notebook[] = [
      { id: '1', title: 'Test Notebook 1', body: 'Content 1', createdAt: '2023-01-01T00:00:00Z' },
      { id: '2', title: 'Test Notebook 2', body: 'Content 2', createdAt: '2023-01-01T00:00:00Z' }
    ];

    service.fetchAllNotebooks().subscribe(response => {
      expect(response.length).toBe(2);
      expect(response).toEqual(mockNotebooks);
    });

    const req = httpMock.expectOne(service.getApiUrl());
    expect(req.request.method).toBe('GET');
    req.flush(mockNotebooks);
  });

  it('should fetch a notebook by ID', () => {
    const mockNotebook: notebook = { id: '1', title: 'Test Notebook', body: 'Content', createdAt: '2023-01-01T00:00:00Z' };

    service.fetchNotebookById('1').subscribe(response => {
      expect(response).toEqual(mockNotebook);
    });

    const req = httpMock.expectOne(`${service.getApiUrl()}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockNotebook);
  });
});
