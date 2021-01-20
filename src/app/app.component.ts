import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import { FileService } from './file.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'http-interceptor-example';
  totalAngularPackages;
  htmlfile;
  urls;

  constructor(private http: HttpClient,
    private sanitizer:DomSanitizer) {

    }

  html_parser(file: string) {
    var lines = file.split('\n');
    var num = lines.length;
    var i;
    var uri_pattern = /<img [^>]*src="[^"]*"[^>]*>/gm
    var script_pattern = /<script [^>]*src="[^"]*"[^>]*>/gm
    var href_pattern = /<link [^>]*href="[^"]*"[^>]*>/gm
    var imgs = file.match(uri_pattern).map(x => x.replace(/.*src="([^"]*)".*/, '$1'));
    var scripts = file.match(script_pattern).map(x => x.replace(/.*src="([^"]*)".*/, '$1'));
    var links = file.match(href_pattern).map(x => x.replace(/.*href="([^"]*)".*/, '$1'));
    this.urls = imgs.concat(scripts, links);
  }
  
  

  ngOnInit(): void {
    this.htmlfile = this.http.get('https://www.s2wlab.com/index.html')


    this.http.get('https://www.s2wlab.com/products.html', {responseType: 'text'})
      .subscribe(res => {
        this.totalAngularPackages = this.sanitizer.bypassSecurityTrustHtml(res);
        this.htmlfile = res;
        var re = /src/gi; 
        this.htmlfile = this.html_parser(this.htmlfile);
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
