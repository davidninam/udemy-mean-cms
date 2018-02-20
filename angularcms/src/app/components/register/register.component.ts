import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  userExists = false;
  emailExists = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem('data')) {
      this.router.navigateByUrl('');
    }
  }

  register(f) {
    const value = f.value;
    const valid = f.valid;

    if (valid) {
      this.userService.register(value).subscribe(res => {
        if (res === 'usernameExists') {
          this.userExists = true;
          setTimeout(
            function() {
              this.userExists = false;
            }.bind(this),
            5000
          );
        } else if (res === 'emailExists') {
          this.emailExists = true;
          setTimeout(
            function() {
              this.emailExists = false;
            }.bind(this),
            5000
          );
        } else {
          localStorage.setItem('userRegistered', 'true');
          this.router.navigateByUrl('login');
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
