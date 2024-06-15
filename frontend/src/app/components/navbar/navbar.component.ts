import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  title:string = 'ArolNOTES'
  navBarHome:string = 'Home'
  navBarServices:string = 'Our Services'
  navBarAbout:string = 'About Us'
  navBarContact:string = 'Contact Us'
}
