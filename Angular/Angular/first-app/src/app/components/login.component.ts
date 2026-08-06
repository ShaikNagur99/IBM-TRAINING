import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [ReactiveFormsModule],

    template: `
    <div class="login-container">

        <h1>Login Form</h1>

        <form [formGroup]="loginForm"
              (ngSubmit)="login()">

            <div>
                <label>Username</label>
                <input
                    type="text"
                    formControlName="username">

                @if(loginForm.get('username')?.invalid &&
                    loginForm.get('username')?.touched){

                    <p>Username is required</p>
                }
            </div>

            <div>
                <label>Password</label>
                <input
                    type="password"
                    formControlName="password">

                @if(loginForm.get('password')?.invalid &&
                    loginForm.get('password')?.touched){

                    <p>Password should be minimum 6 characters</p>
                }
            </div>

            <button
                type="submit"
                [disabled]="loginForm.invalid">

                Login

            </button>

        </form>

    </div>
    `,

    styles: [`
        .login-container{
            width:380px;
            margin:80px auto;
            padding:30px;
            background:#fff;
            border-radius:10px;
            box-shadow:0 0 10px rgba(0,0,0,0.2);
            font-family: Arial, Helvetica, sans-serif;
        }

        h1{
            text-align:center;
            margin-bottom:25px;
        }

        label{
            display:block;
            margin-bottom:6px;
            font-weight:bold;
        }

        input{
            width:100%;
            padding:10px;
            margin-top:5px;
            margin-bottom:15px;
            border:1px solid #ccc;
            border-radius:5px;
            box-sizing:border-box;
        }

        input:focus{
            outline:none;
            border-color:#007bff;
        }

        button{
            width:100%;
            padding:10px;
            background:#007bff;
            color:white;
            border:none;
            border-radius:5px;
            cursor:pointer;
            font-size:16px;
        }

        button:hover:not(:disabled){
            background:#0056b3;
        }

        button:disabled{
            background:#bdbdbd;
            cursor:not-allowed;
        }

        p{
            color:red;
            font-size:14px;
            margin-top:-10px;
            margin-bottom:15px;
        }
    `]
})
export class LoginComponent {

    constructor(private router: Router) { }

    loginForm = new FormGroup({

        username: new FormControl('', [
            Validators.required
        ]),

        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ])

    });

    login() {

        if (this.loginForm.valid) {

            const username = this.loginForm.value.username;
            const password = this.loginForm.value.password;

            if (
                username === 'shaik' &&
                password === '123456'
            ) {

                console.log('Login Successful');

                this.router.navigate(['/transaction']);

            } else {

                alert('Invalid Username or Password');

            }
        }
    }
}