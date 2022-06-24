import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('scrollMe') content: ElementRef;
  @ViewChild('myElement') firstname: any;
  usuarioId: string;
  movelId: string;
  user: IUser;
  messages: Array<IMessage>;
  receiverId: string;
  private _channel: any;

  chatForm = new FormGroup({
    message: new FormControl(''),
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
  ngAfterViewChecked() {        
    this.scrollToBottom();        
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
        this.scrollToBottom();
      })
      return routeParams;
    });
    this._channel = this._pusherService.getPusher().subscribe(`chat.${this.user.id}`);
    this.getChannel().bind("App\\Events\\PrivateMessage", data => {
      if (data) {
        this.messages.push(data.message);
        this.scrollToBottom();
        this.firstname.nativeElement.focus();
        this.firstname.nativeElement.click();
      }
    });
  }
  getChannel() {
    return this._channel;
  }

  scrollToBottom(): void {
    try {
        this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
    } catch(err) { }
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
    if (this.chatForm.invalid) {
      return;
    }
    const receiver = this.receiverId;
    const message = this.chatForm.value.message;
    this.chatService.sendMessage(receiver, message).subscribe(response => {
      this.chatForm.controls.message.setValue('');
      this.messages.push(response.data);
      this.firstname.nativeElement.focus();
      this.firstname.nativeElement.click();
    }, async error => {
      // await this.loadingController.dismiss('firstLoading');
    });
  }

}
