import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../shared/model/message.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages: Array<Message>;

  constructor(public httpClient: HttpClient) { }

  getMessages(user: string, receiver: string) {
    let params = new HttpParams();
    if (user) {
      params = params.set('user', user)
    }
    if (receiver) {
      params = params.set('receiver', receiver);
    }
    return this.httpClient.get(environment.apiUrl + 'movel',).pipe(map(messages => messages));
  }
}
