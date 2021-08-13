import { Component, OnInit,ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { PlacesService } from "../places.service";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import * as L from 'leaflet';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @ViewChild("mapContainer", { static:false }) mapElement: ElementRef;
 
  map:L.map;
  buildingsData = [];
  buildingsForm: FormGroup;
  selectedData = [];
  selectedId: number;
  stars = [1, 2, 3, 4, 5];
  selectedValue: number;
  details = false;
  searchControl = new FormControl("", Validators.required);
  constructor(
    private placesService: PlacesService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}
  filteredOptions: Observable<string[]>;
  initMap(): void {
    this.map = L.map(this.mapElement.nativeElement, {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }
  ngOnInit() {
   
    this.getAllBuildings();
    this.buildingsForm = this.fb.group({
      searchControl: new FormControl("", Validators.required),
    });
  
    console.log(this.stars);
  }
  ngAfterViewInit(): void {
    this.initMap();
  }
//Api call for get buildings
  getAllBuildings() {
    this.placesService.getPlaces().subscribe((res: any) => {
      if (res) {
        this.buildingsData = res;
       
      }
    });
  }
  //On selction of Building
  onSelectBuilding(id) {
    this.selectedId = id;
    this.selectedValue = 0;
   
     //filtering the data from array by selected Id
    this.selectedData = this.buildingsData.filter((place) => place.id == id);
    console.log(this.selectedData);
  }
//on click of ratings
  countStar(star) {
    this.selectedValue = star;
    for (var i = 0; i < this.buildingsData.length; i++) {
      if (this.buildingsData[i].id == this.selectedId) {
        this.buildingsData[i].ratings = star;
      }
    }

    
  }
  
}
