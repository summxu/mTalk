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
  // getCheckCode(): Observable<any> {
  //   return this.http.get(`/checkCode`);
  // }

  // 注册
  register(body: any): Observable<any> {
    return this.http.post(`/api/u/signup`, body);
  }

  // 登录
  login(body: any): Observable<any> {
    return this.http.post(`/api/u/login`, body);
  }

  // 发帖子
  sendpost(body: any): Observable<any> {
    return this.http.post(`/api/p/newpost`, body);
  }
  /* 帖子浏览 */
  getPosts(): Observable<any> {
    return this.http.get('/api/p/posts');
  }
  /* 帖子详情 */

  getPostDetail(body: any): Observable<any> {
    return this.http.post('/api/p/onepost', body);
  }
  /* 发表评论 */
  sendCommit(body: any): Observable<any> {
    return this.http.post('/api/c/newcommit', body);
  }
  /* 获取帖子评论 */
  getCommit(body: any): Observable<any> {
    return this.http.post('/api/c/findCommits', body);
  }
  /* dianzhan */
  start(body: any): Observable<any> {
    return this.http.post('/api/c/addStart', body);
  }

  // 修改个人信息
  updateUser(body: any): Observable<any> {
    return this.http.post(`/api/u/update`, body);
  }

  // 修改个人信息
  updateById(body: any): Observable<any> {
    return this.http.post(`/api/u/updateById`, body);
  }

  /* 所有用户 */
  getUsers(): Observable<any> {
    return this.http.get(`/api/u/users`);
  }
  /* 删除用户 */
  delUser(body: any): Observable<any> {
    return this.http.post(`/api/u/delete`, body);
  }

  /* 删除帖子 */
  delPost(body: any): Observable<any> {
    return this.http.post(`/api/p/deletepost`, body);
  }

  /* 搜索 */
  searchPost(body: any): Observable<any> {
    return this.http.post('/api/p/search', body);
  }
  /* 标签查询 */
  tagPost(body: any): Observable<any> {
    return this.http.post('/api/p/tagPost', body);
  }

  /* 获取话 */
  getSite(): Observable<any> {
    return this.http.get('/api/s/siteInit');
  }

  /* 更新站点信息 */
  updateSite(body: any): Observable<any> {
    return this.http.post('/api/s/updateSite', body);
  }

  /* 插入标签 */
  newTag(body: any): Observable<any> {
    return this.http.post('/api/t/newtags', body);
  }

  /* huoqubiaoqian  */
  getTags(): Observable<any> {
    return this.http.get('/api/t/tags');
  }

}
