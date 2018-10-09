import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {Http,Headers} from '@angular/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  S:any[];
  constructor(
    private auth:AuthService
  ) { }

  ngOnInit() {
    this.auth.displayStatus().subscribe(data=>{
      this.S=data;
      this.S.sort((a,b) => 0 - (a > b ? 1 : -1));
      // location.reload();
    }
     );
    
  }
  
}
