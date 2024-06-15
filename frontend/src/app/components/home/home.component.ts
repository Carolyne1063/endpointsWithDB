import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  landingImage= 'data:image/png;base64,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'
  landingImage1= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqDMu8QBzUF39DiSF911ounSVouEs8PFSo_A&s'
  landingImage2= 'https://static2.jetpens.com/images/a/000/094/94305.jpg?ba=middle%2Ccenter&balph=3&blend64=aHR0cDovL3d3dy5qZXRwZW5zLmNvbS9pbWFnZXMvYXNzZXRzL3dhdGVybWFyazIucG5n&bm=difference&bs=inherit&mark64=aHR0cDovL3d3dy5qZXRwZW5zLmNvbS9pbWFnZXMvYXNzZXRzL3dhdGVybWFyazEucG5n&markalign=top%2Cright&markalpha=30&markscale=16&q=90&s=177cf9f57450f055b0c0894c1a817292'
}
