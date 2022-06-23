import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { PusherService } from 'src/app/services/pusher.service';
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
  receiverId: string;
  private _channel: any;

  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private chatService: ChatService,
    private authService: AuthService,
    private _pusherService: PusherService
  ) {

  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.authService.user.subscribe(user => {
      if (user) {
        return this.user = user;
      }
    });
    this.activatedRoute.queryParams.subscribe(routeParams => {
      this.receiverId = routeParams.receiverId;
      this.chatService.getMessages(this.user.id.toString(), this.receiverId).subscribe(message => {
        this.messages = message;
      })
      return routeParams;
    });
    this._channel = this._pusherService.getPusher().subscribe('chat.1');
    this.getChannel().bind("App\\Events\\PrivateMessage", data => {
      console.log(data);
      if(data){
        this.messages.push(data.message);
      }
    
    });
  }
  getChannel() {
    return this._channel;
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      id: 'firstLoading',
      cssClass: 'my-custom-class',
      message: 'Carregando...',
    });
    await loading.present();
  }

  async onSubmit() {
    await this.presentLoading();
    const receiver = this.receiverId;
    const message = this.chatForm.value.message;
    this.chatService.sendMessage(receiver, message).subscribe(async response => {
      this.chatForm.controls.message.setValue('');
      await this.loadingController.dismiss('firstLoading');
      // window.location.reload();
    }, async error => {
      await this.loadingController.dismiss('firstLoading');
    });
  }

}
