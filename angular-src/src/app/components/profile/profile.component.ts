import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:Object;
  name:String;
  userid:String;
  email:String;
  password:String;
  role:String;
  department:String;
  closeResult: string;
  modelRef:NgbModalRef;
  title:String;
  status:String;
  phnum:Number;
  address:String;
  date:Date;
  time:String;

  

  constructor(
    private validateService:ValidateService,
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router:Router,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
     this.user=JSON.parse(localStorage.getItem('user'));
    
    console.log(this.user);

  }

  open(content) {
    this.modelRef=this.modalService.open(content);
    var user=JSON.parse(localStorage.getItem('user'));
    if(user.role=='employee'||user.role=='hr')
    {
    this.userid=user.userid;
    this.name=user.name;
    this.email=user.email;
    this.password=user.password; 
    this.role=user.role;
    this.department=user.department;
    this.phnum=user.phnum;
    this.address=user.address;
    }
    
  }
 

  onAddEmpSubmit(){
    this.modelRef.close()
    const user={
      name:this.name,
      email:this.email,
      userid:this.userid,
      password:this.password,
      role:this.role,
      department:this.department
    };

  if(!this.validateService.validateRegister(user)){
    console.log('please fill all the feilds');
    this.flashMessage.show('please fill all feilds',{cssClass:'alert-danger',timeout:3000});
    return false;
  }

  if(!this.validateService.validateEmail(user.email)){
    console.log('please use a valid email');
     this.flashMessage.show('please use a valid email',{cssClass:'alert-danger',timeout:3000});
    return false;
  }

  this.authService.registerUser(user).subscribe(data=>{
    if(data.success){
      this.flashMessage.show('registration sucess',{cssClass:'alert-success',timeout:3000});
      console.log('user register');
      // this.router.navigate(['/login']);
    }else{
      console.log('not register');
      // this.router.navigate(['/register']);
    }
  })
  
  }
  onDelEmpSubmit(){
    this.modelRef.close()
    const user={
      userid:this.userid
    }
    // if(!this.validateService.validateRegister(user)){
    //   console.log('please fill all the feilds');
    //   this.flashMessage.show('please fill all feilds',{cssClass:'alert-danger',timeout:3000});
    //   return false;
    // }

    this.authService.deleteUser(user).subscribe(data=>{
      if(data.success){
        this.flashMessage.show('user deleted',{cssClass:'alert-success',timeout:3000});
      }else{
        this.flashMessage.show('user not found',{cssClass:'alert-danger',timeout:3000});
      }
    })



  }

  

  onEditProfileSubmit(){
    this.modelRef.close()

    const user={ 
      userid:this.userid,
      name:this.name,
      email:this.email,
      password:this.password,
      role:this.role,
      department:this.department,
      phnum:this.phnum,
      address:this.address
    };
    
    this.authService.editUser(user).subscribe(data=>{
      if(data.success){
        this.flashMessage.show('user profile edited',{cssClass:'alert-success',timeout:3000});
        this.authService.getProfile(user.userid).subscribe(result=>localStorage.setItem('user',JSON.stringify(result.user)));
        location.reload();
      }
      else{
        this.flashMessage.show('user profile not edited',{cssClass:'alert-danger',timeout:3000});
      }
  });
  }

//status
onStatusSubmit(){
  this.modelRef.close()
  const user={
    userid:this.userid,
    department:this.department,
    date:this.date,
    time:this.time,
    title:this.title,
    status:this.status
  }
  if(!this.validateService.validateEdit(user)){
    console.log('please fill all the feilds');
    this.flashMessage.show('please fill all feilds',{cssClass:'alert-danger',timeout:3000});
    return false;
  }
  this.authService.statusUser(user).subscribe(data=>{
    if(data.msg=="posted successfully"){
        this.flashMessage.show('status uploaded',{cssClass:'alert-success',timeout:2000});
    }
    else{
      console.log(data)
      this.flashMessage.show('not posted',{cssClass:'alert-danger',timeout:3000});
    }
});
}


}

