import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IMovel } from '../shared/model/movel.interface';

@Injectable({
  providedIn: 'root'
})
export class MovelService {
  public moveis: Observable<IMovel[]>;


  constructor(public httpClient: HttpClient) { }


  getMoveisAnunciados() {
    return this.httpClient.get<any>(environment.apiUrl + 'movel/')
      .pipe(map(moveis => moveis.data));
  }

  getMovelAnuncio(id) {
    return this.httpClient.get<any>(environment.apiUrl + 'movel/', { params: new HttpParams().set('id', id) })
      .pipe(map(moveis => moveis.data[0]));
  }
  create(formData: FormData) {
    return this.httpClient.post<any>(environment.apiUrl + 'movel/', formData)
      .pipe(map(signedUp => signedUp));
  }
}
