import { LoginService } from './../login/login.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BagService } from './../bag/bag.service';
import { CrudService } from './../../service/crud.service';
import { ServiceappService } from './../../service/serviceapp.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LojasService } from 'src/app/multLojas/lojas/lojas.service';
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  constructor(public service: ServiceappService, private crud: CrudService, private cookies: CookieService) { }

  ngOnInit(): void {

    window.scrollTo(0, 0);

  }



}
