import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { IUser } from 'src/app/shared/model/user.interface';

@Component({
  selector: 'app-meus-chats',
  templateUrl: './meus-chats.page.html',
  styleUrls: ['./meus-chats.page.scss'],
})
export class MeusChatsPage implements OnInit {
  user: IUser;
  meusChats: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private chatService: ChatService,
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.authService.user.subscribe(user => {
      if (user) {
        return this.user = user;
      }
    });
    this.chatService.getUserChats().subscribe(chats => {
      this.meusChats = chats;
    })
  }
  selectChat(receiverId) {
    return this.router.navigate(['/chat'], { queryParams: {receiverId: receiverId} });
  }
}
