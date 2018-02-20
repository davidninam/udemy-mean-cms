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
  userExists = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}

  register(f) {
    const value = f.value;
    const valid = f.valid;

    if (valid) {
      this.userService.register(value).subscribe(res => {
        if (res === 'userExists') {
          this.userExists = true;
          setTimeout(
            function() {
              this.userExists = false;
            }.bind(this),
            2000
          );
        } else {
          this.router.navigateByUrl('login');
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
