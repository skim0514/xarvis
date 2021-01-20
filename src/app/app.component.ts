import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'http-interceptor-example';
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get('https://www.s2wlab.com/about.html')
      .subscribe(data => {
        //todo
      });
    this.http.get('https://www.s2wlab.com/contact.html')
      .subscribe(data => {
        //todo
      });
    this.http.get('https://www.s2wlab.com/products.html')
      .subscribe(data => {
        //todo
      });
  }
}
