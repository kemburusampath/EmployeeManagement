import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
userid:String;
password:String;
  constructor(
    private authService:AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user={
      userid:this.userid,
      password:this.password
    }
    this.authService.authenticateUser(user).subscribe(data=>{
      if(data.success){
        this.authService.storeUserData(data.token,data.user);
        this.flashMessage.show('Login Success',{cssClass:'alert-success',timeout:2000});
        this.router.navigate(['profile']);
      }else{
        this.flashMessage.show(data.msg,{cssClass:'alert-danger',timeout:2000})
        this.router.navigate(['login']);
      }
    })
  
  }
}
