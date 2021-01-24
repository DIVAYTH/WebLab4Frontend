import {Component} from '@angular/core';
import {StartPageService} from "../../services/start-page.service";
import {User} from "../../classes/user";
import {Router} from "@angular/router";
import {Auth} from "../../classes/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  public auth;
  public userForm: FormGroup;

  constructor(private startPageService: StartPageService, private router: Router, private formBuilder: FormBuilder) {
    this.userForm = this.createForm();
    this.auth = new Auth("", false)
  }

  private createForm() {
    return this.userForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    });
  }

  get login() {
    return this.userForm.controls['login'];
  }

  get password() {
    return this.userForm.controls['password'];
  }

  public authorization() {
    let user: User = new User(this.login.value, this.password.value);
    this.startPageService.authorization(user).subscribe(response => {
      localStorage.setItem("login", user.login);
      localStorage.setItem("password", user.password);
      this.auth = new Auth(response.result, true);
      this.router.navigate(["/main"]);
    }, () => {
      this.auth = new Auth("Логин или пароль введен не верно", false);
    })
  }

  public registration() {
    this.startPageService.registration(new User(this.login.value, this.password.value)).subscribe(response => {
      this.auth = new Auth(response.result, true);
    }, () => {
      this.auth = new Auth("Такой пользователь уже зарегестрирован", false);
    });
  }
}
