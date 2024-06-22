import { Component, OnInit } from '@angular/core';
import { NotebookService } from '../../services/notebook.service';
import { notebook } from '../interfaces/notebook.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  notebooks: notebook[] = [];
  newNotebook: notebook = { id: '', title: '', body: '', createdAt: '' };
  selectedNotebook: notebook | null = null;

  constructor(private notebookService: NotebookService) { }

  ngOnInit(): void {
    this.fetchAllNotebooks();
  }

  fetchAllNotebooks(): void {
    this.notebookService.fetchAllNotebooks().subscribe(notebooks => {
      this.notebooks = notebooks;
    });
  }

  createNotebook(): void {
    this.notebookService.createNotebook(this.newNotebook).subscribe(notebook => {
      this.notebooks.push(notebook);
      this.newNotebook = { id: '', title: '', body: '', createdAt: '' }; // Reset form
    });
  }

  updateNotebook(notebook: notebook): void {
    if (notebook && notebook.id) {
      this.notebookService.updateNotebook(notebook.id, notebook).subscribe(updatedNotebook => {
        const index = this.notebooks.findIndex(n => n.id === updatedNotebook.id);
        if (index !== -1) {
          this.notebooks[index] = updatedNotebook;
        }
        this.clearSelectedNotebook(); // Clear the selected notebook after update
      });
    }
  }

  deleteNotebook(id: string): void {
    this.notebookService.deleteNotebook(id).subscribe(() => {
      this.notebooks = this.notebooks.filter(notebook => notebook.id !== id);
    });
  }

  setSelectedNotebook(notebook: notebook): void {
    this.selectedNotebook = { ...notebook };
  }

  clearSelectedNotebook(): void {
    this.selectedNotebook = null;
  }
}
