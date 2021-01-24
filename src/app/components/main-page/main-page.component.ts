import {Component, OnInit} from '@angular/core';
import {MainPageService} from "../../services/main-page.service";
import {Results} from "../../classes/results";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Point} from "../../classes/point";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public results = new Array<Results>();
  public user = localStorage.getItem('login');
  public pointForm: FormGroup;

  constructor(private mainPageService: MainPageService, private router: Router, private formBuilder: FormBuilder) {
    this.pointForm = this.createForm();
  }

  private createForm() {
    return this.pointForm = this.formBuilder.group({
      y: [undefined, [Validators.required, Validators.min(-3), Validators.max(3), Validators.pattern(/^-?\d*(\.\d+)?$/)]],
      x: [0, [Validators.required, Validators.min(-5), Validators.max(3)]],
      r: [1, [Validators.required, Validators.min(1), Validators.max(3)]]
    });
  }

  get x() {
    return this.pointForm.controls['x'];
  }

  get y() {
    return this.pointForm.controls['y'];
  }

  get r() {
    return this.pointForm.controls['r'];
  }

  public setPoint(e: MouseEvent) {
    if (this.r.valid) {
      let r = this.r.value;
      let x = Number((((e.offsetX - 200) * r) / 140).toFixed(1));
      let y = Number((((200 - e.offsetY) * r) / 140).toFixed(1));
      this.mainPageService.sendPoint(new Point(x, y, r)).subscribe(results => {
        this.results.push(results);
      })
    }
  }

  public sendPoint() {
    this.mainPageService.sendPoint(new Point(this.x.value, this.y.value, this.r.value)).subscribe(results => {
      this.results.push(results)
    });
  }

  public resetPoint() {
    this.mainPageService.resetPoint().subscribe(() => {
      this.results.length = 0;
    })
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(["/login"])
  }

  ngOnInit(): void {
    this.mainPageService.getResult().subscribe(results => {
      this.results = results;
    })
  }
}
