import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { IMessage } from 'src/app/shared/model/message.interface';
import { IUser, IUserMessage } from 'src/app/shared/model/user.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  usuarioId: string;
  movelId: string;
  user: IUser;
  messages: Array<IMessage>;
  isUserSender = false;
  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private chatService: ChatService,
    private authService: AuthService,
  ) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.authService.user.subscribe(user => {
      if (user) {
        return this.user = user;
      }
    });
    this.activatedRoute.queryParams.subscribe(routeParams => {
      this.usuarioId = routeParams.usuarioId;
      this.movelId = routeParams.movelId;
      this.chatService.getMessages(this.user.id.toString(), this.usuarioId).subscribe(message => {
        this.messages = message;
        if(message[0].usuario_id === this.user.id) {
          this.isUserSender = true;
        }
      })
      return routeParams;
    });
  }

  //TO:DO - Verifica necessidade de enviar
  onSubmit() {
    const receiver = this.usuarioId;
    const sender = this.user.id
    const message = this.chatForm.value.message;
    this.chatService.sendMessage(receiver, message).subscribe(response => {
      console.log(response);
    });
  }

}
