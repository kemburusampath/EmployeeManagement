import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  
  validateRegister(user){
    if(user.name==undefined||user.userid==undefined||user.email==undefined||user.role==undefined||user.department==undefined)
    return false;
    else
    return true;
  }
  validateEdit(user){
    if(user.userid==undefined||user.department==undefined||user.title==undefined||user.status==undefined||user.date==undefined||user.time==undefined)
    return false;
    else
    return true;
  }
 validateEmail(email){
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
 }
}