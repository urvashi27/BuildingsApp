import { Component, OnInit } from "@angular/core";
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


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
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
  ngOnInit() {
   
    this.getAllBuildings();
    this.buildingsForm = this.fb.group({
      searchControl: new FormControl("", Validators.required),
    });
   
    console.log(this.stars);
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
