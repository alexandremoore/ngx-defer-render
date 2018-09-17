import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('visibilityChanged', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  usersObservable: Observable<any>;
  users: any[] = [];

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.usersObservable = this.http.get(
      'https://randomuser.me/api/?results=500'
    );
    this.usersObservable.subscribe(results => {
      results.results.map(user => {
        user.show = false;
        this.users.push(user);
      });
    });
  }

  onEnterViewPort(user: any): void {
    user.show = true;
    this.spinner.hide();
  }
}
