import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {AppComponent} from './components/app/app.component';
import {StartPageComponent} from './components/start-page/start-page.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {MainPageGuard} from './guards/main-page.guard';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputNumberModule} from "primeng/inputnumber";
import {TableModule} from "primeng/table";
import {StartPageGuard} from "./guards/start-page.guard";
import {ScrollPanelModule} from "primeng/scrollpanel";

const routes: Routes = [
  {path: "", redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: StartPageComponent, canActivate: [StartPageGuard]},
  {path: 'main', component: MainPageComponent, canActivate: [MainPageGuard]},
  {path: '**', component: NotFoundComponent}
];

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    MainPageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    InputNumberModule,
    TableModule,
    ScrollPanelModule
  ],
  providers: [MainPageGuard, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})



export class AppModule {

}
