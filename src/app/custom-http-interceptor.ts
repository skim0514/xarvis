import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize, retry} from 'rxjs/operators';
import {UrlSerializer, UrlTree, DefaultUrlSerializer} from '@angular/router'


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

    constructor() { }

    
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const urlcut = req.url
        const newurl = urlcut.replace("https://www.s2wlab.com/", "http://localhost:8080/");

        
        const dupReq = req.clone({ url: newurl});
        if (newurl != urlcut) {
            return next.handle(dupReq)
            .pipe(
                finalize(() => {
                    const pofilingMsg = `${req.method} "${dupReq.urlWithParams}" `;
                    console.log(pofilingMsg);
                    })
                );
        } else {
            return next.handle(req.clone({ url: urlcut}))
            .pipe(
                finalize(() => {
                    const pofilingMsg = `${req.method} "${req.urlWithParams}" `;
                    console.log(pofilingMsg);
                    })
                );
        }
        
    }
    // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //     const hardcodedToken = '1d38d128-0671-4121-8084-f6332a992a40';
    //     req = req.clone({
    //         setHeaders: {
    //             Authorization: `Bearer ${hardcodedToken}`
    //         }
    //     });
    //     return next.handle(req)
    //         .pipe (
    //             retry(2),
    //             catchError((error:HttpErrorResponse) => {
    //                 alert(` HTTP Error: ${ req.url } `);
    //                 return throwError(error);
    //             }), 


    //             finalize(() => {
    //                 const pofilingMsg = `${req.method} "${req.urlWithParams}" `;
    //                 console.log(pofilingMsg);
    //             })
    //             );
    // }
}

// export function myComponent(options: any): Rule {
//     return (tree: Tree, _context: SchematicContext) => {
//       const content: Buffer | null = tree.read("./menu.component.html");
//       let strContent: string = '';
//       if(content) strContent = content.toString();
  
//       const appendIndex = strContent.indexOf('</ul>');
//       const content2Append = '    <li><a href="/contact">contact</a></li> \n';
//       const updatedContent = strContent.slice(0, appendIndex) + content2Append + strContent.slice(appendIndex);
  
//       tree.overwrite("./menu.component.html", updatedContent);
//       return tree;
//     };
//   }
