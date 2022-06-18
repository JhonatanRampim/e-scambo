import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessage } from '../shared/model/message.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages: Array<IMessage>;

  constructor(public httpClient: HttpClient) { }

  getMessages(user: string, receiver: string) {
    let params = new HttpParams();
    if (user) {
      params = params.set('user', user)
    }
    if (receiver) {
      params = params.set('receiver', receiver);
    }
    return this.httpClient.get<any>(environment.apiUrl + 'messages',).pipe(map(messages => messages));
  }

  sendMessage(receiver: string, message: string, user?: string) {
    return this.httpClient.post<any>(environment.apiUrl + 'messages', { receiverId: receiver, message })
      .pipe(map(messages => messages));
  }
}
