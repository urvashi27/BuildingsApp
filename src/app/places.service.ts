import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlacesService {
baseUrl='https://narayan.iqnext.io';
httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http:HttpClient) { }

  getPlaces():Observable<any>
  {
    return this.http.get(this.baseUrl+'/places/',{ headers: this.httpHeaders });
  }
}
