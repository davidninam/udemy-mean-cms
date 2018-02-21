import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userNotExists = false;
  wrongPassword = false;
  userAfterRegistration = false;
  username: string;
  password: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('data')) {
      this.router.navigateByUrl('');
    }

    if (localStorage.getItem('userRegistered')) {
      this.userAfterRegistration = true;
      localStorage.removeItem('userRegistered');
    }
  }

  login(f) {
    const value = f.value;
    const valid = f.valid;

    if (valid) {
      this.userService.login(value).subscribe(res => {
        if (res === 'userNotExists') {
          this.userNotExists = true;
          setTimeout(
            function() {
              this.userNotExists = false;
            }.bind(this),
            5000
          );
        } else if (res === 'wrongPassword') {
          this.wrongPassword = true;
          setTimeout(
            function() {
              this.wrongPassword = false;
            }.bind(this),
            5000
          );
        } else {
          localStorage.setItem('data', JSON.stringify(res));
          if (localStorage.getItem('data') === '"admin"') {
            this.router.navigateByUrl('admin/pages');
          } else {
            this.router.navigateByUrl('');
          }
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
