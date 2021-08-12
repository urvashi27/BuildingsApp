import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { map, startWith } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 buildingsData=[];
 buildingsForm:FormGroup;
  selectedData=[];
  selectedId:number;
  stars = [1,2,3,4,5];
  selectedValue:number;
 details=false;
 searchControl=new FormControl("",Validators.required)
  constructor(
    private placesService:PlacesService,
    private fb:FormBuilder,
    private http: HttpClient
  ) { }
  filteredOptions: Observable<string[]>;
  ngOnInit() {
   // searchControl=new FormControl("",Validators.required)
   this.getAllBuildings();
   this.buildingsForm=this.fb.group(
    {
      searchControl:new FormControl("",Validators.required)
    });
  //this.stars=[{count:1},{count:2},{count:3},{count:4},{count:5}]
  console.log(this.stars);
  }
 
  getAllBuildings()
  {
    this.placesService.getPlaces().subscribe(
      (res:any)=>
      {
        if(res)
        {
          this.buildingsData=res;
          console.log(this.buildingsData);
        }
      })
  }
  onSelectBuilding(id)
  {
   this.selectedId=id;
   this.selectedValue=0;
  console.log(id);
  
  this.selectedData=this.buildingsData.filter((place)=>place.id==id);
  console.log(this.selectedData);
  }
  countStar(star) {
    this.selectedValue=star;
   for(var i=0;i<this.buildingsData.length;i++)
   {
     if(this.buildingsData[i].id==this.selectedId)
      {
        this.buildingsData[i].ratings=star
      }
   }
  
    localStorage.setItem('ratings',star);
  }
 
}
