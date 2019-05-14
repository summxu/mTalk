import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MtalkHttpService {

  constructor(private http: HttpClient) { }

  /**
   * CheckCode检查验证码
   */
  getCheckCode(): Observable<any> {
    return this.http.get('/asd/asd');
  }
}
