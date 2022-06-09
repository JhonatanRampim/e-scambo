import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService {

  constructor(private httpClient: HttpClient) { }

  signup(data?) {
    return this.httpClient.post<any>(environment.apiUrl + '/signup',
      { name: data.nome, email: data.email, password: data.password, phone: data.phone })
      .pipe(map(signedUp => signedUp));
  }
}
