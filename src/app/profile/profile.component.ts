import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  @Input() updatedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  }; // Decorator
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.fetchApiData.getUser().subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
      this.updatedUser.Username = this.user.Username;
      this.updatedUser.Email = this.user.Email;
      this.updatedUser.Birthday = this.user.Birthday;
      console.log(this.updatedUser);
    });
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Profile was updated successfully.', 'OK', {
        duration: 2000,
      });
      if (this.user.Username !== result.Username) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Profile was updated successfully. Please login using the new credentials.',
          'OK',
          { duration: 2000 }
        );
      }
    });
  }

  deleteUser(): void {
    if (
      confirm(
        'Are you sure you want to delete your information? This action cannot be undone!'
      )
    ) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Profile was deleted successfully.', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
/** console.log(result);
        localStorage.clear();
        this.snackBar.open('User delete successful', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['welcome']);
      },
      (result) => {
        this.snackBar.open('User delete failed', 'OK', {
          duration: 2000,
        }); */
