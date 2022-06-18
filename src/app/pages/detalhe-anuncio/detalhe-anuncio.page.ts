import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { MovelService } from 'src/app/services/movel.service';
import { IMovel } from 'src/app/shared/model/movel.interface';
import { IUser } from 'src/app/shared/model/user.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalhe-anuncio',
  templateUrl: './detalhe-anuncio.page.html',
  styleUrls: ['./detalhe-anuncio.page.scss'],
})
export class DetalheAnuncioPage implements OnInit {
  movel: IMovel;
  images: GalleryItem[] = [];
  user: IUser;
  isOpen = false;
  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  receiverId: string;
  constructor(
    public movelService: MovelService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    private loadingController: LoadingController,
    private authService: AuthService,
    private chatService: ChatService,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.activatedRoute.params.subscribe(routeParams => {
      this.getMyListsItems(routeParams.id);
      this.movelService.getMovelAnuncio(routeParams.id).toPromise();
      return routeParams;
    });
    this.authService.user.subscribe(user => {
      if (user) {
        return this.user = user;
      }
    });
  }
  ngOnInit() { }
  async getMyListsItems(listaId) {
    await this.presentLoading();
    this.movelService.getMovelAnuncio(listaId).subscribe(async response => {
      this.movel = response;
      this.movel.estado = response.category.split(',');
      this.images = this.movel.foto.map(picture =>
        new ImageItem({ src: `${environment.imageUrl}${picture.path}`, thumb: `${environment.imageUrl}${picture.path}` })
      );
      await this.loadingController.dismiss('firstLoading');
    }, async error => {
      await this.loadingController.dismiss('firstLoading');
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      id: 'firstLoading',
      cssClass: 'my-custom-class',
      message: 'Carregando...',
    });
    await loading.present();
  }
  closeModal() {
    this.isOpen = false;
  }

  createChat(usuarioId) {
    this.isOpen = true;
    this.receiverId = usuarioId;
  }

  async onSubmit() {
    await this.presentLoading();
    this.chatForm.value.message;
    this.receiverId;
    this.isOpen = false;
    this.chatService.sendMessage(this.receiverId, this.chatForm.value.message).subscribe(async response => {
      console.log(response);
      await this.loadingController.dismiss('firstLoading');
      await this.presentSuccessAlert();
    }, async error => {
      await this.loadingController.dismiss('firstLoading');
      console.error(error);
    });
  }

  async presentSuccessAlert(message?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mesagem enviada!',
      message: 'Aguarde a resposta. Você pode verificar na Tela Inicial -> Minhas Conversas.',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.router.navigate(['/home/meus-chats']);
        }
      }]
    });
    await alert.present();
  }
}
