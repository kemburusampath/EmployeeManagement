import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import  'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
authToken:any;
user:any;

    constructor(private http:Http) {}
    registerUser(user){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/admin/register',user,{headers:headers})
       .map(res=>res.json());
    }

    deleteUser(user){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/admin/delete',user,{headers:headers})
       .map(res=>res.json());
    }

    authenticateUser(user){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/users/authenticate',user,{headers:headers})
       .map(res=>res.json());
    }


    getProfile(userid){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.get('http://localhost:3000/users/profile/'+userid,{headers:headers})
       .map(res=>res.json());
    }

    editUser(user){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/users/edit',user,{headers:headers})
      .map(res=>{console.log(res);return res.json();});
    }

    statusUser(user){
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.post('http://localhost:3000/users/status',user,{headers:headers})
       .map(res=>res.json());
    }
    
    displayStatus(){
      return this.http.get('http://localhost:3000/users/gettingstatus').map(res=>res.json());
    }

    storeUserData(token,user){
      localStorage.setItem('id_token',token);
      localStorage.setItem('user',JSON.stringify(user));
      this.authToken=token;
      this.user=user;
    }

    loadToken(){
      const token =localStorage.getItem('id_token');
      this.authToken=token;
    }

    loggedIn(){
      return tokenNotExpired('id_token');
    }

    adminLoggedIn(){
      var data=JSON.parse(localStorage.getItem('user'));
      if(!data) {data=null;return false;}

      else if(data.name=="admin"&&this.loggedIn())
      { data=null;
        return true;}
      else{
        data=null;
        return false;}
    }

    logout(){
      this.authToken=null;
      this.user=null;
      localStorage.clear();
    }

    employeeLoggedIn(){
      var data=JSON.parse(localStorage.getItem('user'));
      if(!data) {data=null;return false;}

      else if(data.role=="employee"&&this.loggedIn())
      { data=null;
        return true;}
      else{
        data=null;
        return false;}
    }

    hrLoggedIn(){
      var data=JSON.parse(localStorage.getItem('user'));
      if(!data) {data=null;return false;}

      else if(data.role=="hr"&&this.loggedIn())
      { data=null;
        return true;}
      else{
        data=null;
        return false;}
    }

    
   }
