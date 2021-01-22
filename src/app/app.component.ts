import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import { FileService } from './file.service';
import { Router, Params } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  home = true;
  title = 'http-interceptor-example';
  currpage;
  totalAngularPackages;
  htmlfile;
  urls;
  domain;

  constructor(private http: HttpClient,
    private sanitizer:DomSanitizer,
    private router: Router) {
      this.currpage = router.url;
    }
  
  url_parser(url: string) {
    var regex = /[/]/g;
    this.domain = url.split('/')[1];
    console.log(this.domain);
    return "proxy_" + url.replace('/', '').replace(regex, '_');
  }

  href_parser(file: string) {
    var lines = file.split('\n');
    var num = lines.length;
    var i;
    var a_pattern = /<a [^>]*href="[^"]*"[^>]*>/gm
    var as = file.match(a_pattern);
    for (i = 0; i < as.length; i++) {
      // console.log(as);
      var link = as[i]
      var path = as[i];
      
      // var path1 = path.replace(/.*href=("[^"]*").*/, '$1');
      // console.log(path1)
      var path2 = path.replace(/.*href="([^"]*)".*/, '$1');
      console.log(path2);
      var long = link;
      console.log(link);
      long = long.replace(path2, 'localhost:4200/www.s2wlab.com/' + path2)
      file = file.replace(link, long);
    }
    return file;
  }

  image_parser(file: string) {
    var lines = file.split('\n');
    var num = lines.length;
    var i;
    var image_pattern = /<img [^>]*src="[^"]*"[^>]*>/gm
    var images = file.match(image_pattern);
    for (i = 0; i < images.length; i++) {
      // console.log(as);
      var link = images[i]
      var path = images[i];
      
      // var path1 = path.replace(/.*href=("[^"]*").*/, '$1');
      // console.log(path1)
      var path2 = path.replace(/.*src="([^"]*)".*/, '$1');
      console.log(path2);
      var long = link;
      console.log(link);
      long = long.replace(path2, 'http://localhost:8080/' + path2)
      file = file.replace(link, long);
    }
    return file;
  }
    

  // html_parser(file: string) {
  //   var lines = file.split('\n');
  //   var num = lines.length;
  //   var i;
  //   var uri_pattern = /<img [^>]*src="[^"]*"[^>]*>/gm
  //   var script_pattern = /<script [^>]*src="[^"]*"[^>]*>/gm
  //   var href_pattern = /<link [^>]*href="[^"]*"[^>]*>/gm
  //   var a_pattern = /<a [^>]*href="[^"]*"[^>]*>/gm
  //   var imgs = file.match(uri_pattern).map(x => x.replace(/.*src="([^"]*)".*/, '$1'));
  //   var scripts = file.match(script_pattern).map(x => x.replace(/.*src="([^"]*)".*/, '$1'));
  //   var links = file.match(href_pattern).map(x => x.replace(/.*href="([^"]*)".*/, '$1'));
  //   var as = file.match(a_pattern);
  //   for (i = 0; i < as.length; i++) {
  //     var link = as[i]
  //     var path = as[i];
  //     // console.log(as);
  //     var path1 = path.replace(/.*href=("[^"]*").*/, '$1');
  //     var path2 = path.replace(/.*href="([^"]*)".*/, '$1');
  //     // console.log(path1);
  //     var long = link;
  //     long = long.replace(path1, `"" (click)="goLink()"`)
  //     // console.log(long);
  //     file = file.replace(link, long);
  //   }
  //   return file

    //return imgs.concat(scripts, links, as);
  // }

  // myFunc(url: string): void {
  //   console.log(url);
  //   this.home = false;
  //   this.urls = url
  //   this.http.get(url, {responseType: 'text'})
  //   .subscribe(res => {

  //     //this.totalAngularPackages = this.sanitizer.bypassSecurityTrustHtml(res);
  //     this.htmlfile = res;
  //     this.totalAngularPackages = this.sanitizer.bypassSecurityTrustHtml(this.html_parser(this.htmlfile));
  //     //todo
  //   });
  // }
  goHome(): void {
    this.home = true;
  }
  // goLink(): void {
  //   this.http.get('https://www.s2wlab.com/about.html', {responseType: 'text'})
  //     .subscribe(res => {
  //       this.totalAngularPackages = this.sanitizer.bypassSecurityTrustHtml(res);
  //       this.htmlfile = res;
  //       var re = /src/gi; 
  //       this.htmlfile = this.html_parser(this.htmlfile);
  //       //todo
  //     });
  // }
  
  

  ngOnInit(): void {
    this.http.get(this.url_parser(this.currpage), {responseType: 'text'})
      .subscribe(res => {
  
        //this.totalAngularPackages = this.sanitizer.bypassSecurityTrustHtml(res)
        this.totalAngularPackages = this.sanitizer.bypassSecurityTrustHtml(this.image_parser(this.href_parser(res)));
        
        //todo
      });

    // this.htmlfile = this.http.get('https://www.s2wlab.com/index.html')


    // this.http.get(this.currpage, {responseType: 'text'})
    //   .subscribe(res => {
    //     this.totalAngularPackages = this.sanitizer.bypassSecurityTrustHtml(res);
    //     this.htmlfile = res;
    //     var re = /src/gi; 
    //     this.htmlfile = this.html_parser(this.htmlfile);
    //     //todo
    //   });
    // this.http.get('https://www.s2wlab.com/contact.html')
    //   .subscribe(data => {
    //     //todo
    //   });
    // this.http.get('https://www.s2wlab.com/products.html')
    //   .subscribe(data => {
    //     //todo
    //   });    
  }
}
