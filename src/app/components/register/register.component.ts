import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  loading = false;
  submitted = false;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      displayName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {

      this.submitted = true;

      if ( this.registerForm.invalid) {
        return;
      }

      this.loading = true;

      this.authenticationService.registerUser(this.registerForm.value)
      .subscribe({
        next: () => {
            this.router.navigate(['/home']);
        },
        error: (data) => {
            this.loading = false;
            alert(`Registration failed ${data.error}`);
        }
      });
  }

}

