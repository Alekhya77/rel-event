import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  loggedIn: boolean;
  db : string;
  constructor(private authService: SocialAuthService, private router: Router,private service: UserService) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
  });
  this.db = localStorage.getItem('name');
  console.log(this.db);
}
  signOut(): void {
    this.authService.signOut();
    this.service.setUserLoggedOut();
  }

  logout() : void {
    this.loggedIn = false;
    this.router.navigate(['home']);
  }

  signInWithGoogle(): void {
    this.service.setUserLoggedIn();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.router.navigate(['home']);
  }
}

