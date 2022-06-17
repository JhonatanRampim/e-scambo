import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSearchbar, LoadingController } from '@ionic/angular';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MovelService } from 'src/app/services/movel.service';
import { ICategory } from 'src/app/shared/model/category.interface copy';
import { IMovel } from 'src/app/shared/model/movel.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consulta-anuncios',
  templateUrl: './consulta-anuncios.page.html',
  styleUrls: ['./consulta-anuncios.page.scss'],
})
export class ConsultaAnunciosPage implements OnInit {
  @ViewChild(IonSearchbar) input: IonSearchbar;
  moveis: Array<IMovel> = [];
  showSearchBar = false;
  apiLink = environment.imageUrl;
  filtroForm = new FormGroup({
    nome: new FormControl(''),
    categoria: new FormControl(''),
  });
  categoryList: ICategory[];

  constructor(
    public movelService: MovelService,
    public router: Router,
    public loadingController: LoadingController,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.getMyListsItems();
    this.categoryList = this.categoriaService.getCategories()
  }

  async getMyListsItems() {
    await this.presentLoading();
    this.moveis = [];
    this.movelService.getMoveisAnunciados().subscribe(moveis => {
      moveis.forEach(movel => {
        this.moveis.push(movel);
      });
      this.loadingController.dismiss('firstLoading');
    }, (error) => {
      this.loadingController.dismiss('firstLoading');
      console.error(error)
    });
  }
  verDetalhes(selectedId: number) {
    this.router.navigate(['/detalhe-anuncio', selectedId]);
  }
  enableSearchBar() {
    this.showSearchBar = !this.showSearchBar;
    if (this.showSearchBar === true) {
      setTimeout(() => { this.input.setFocus(); }, 150);
    }
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
    const categoriaFilter = (this.filtroForm.value.categoria) ? this.filtroForm.value.categoria.title : '';
    const nome = (this.filtroForm.value.nome) ? this.filtroForm.value.nome : '';
    this.movelService.getMoveisAnunciados(nome, categoriaFilter).subscribe(async (data) => {
      this.moveis = [];
      data.forEach(movel => {
        this.moveis.push(movel);
      });
      await this.loadingController.dismiss('firstLoading');
    }, async error => {
      await this.loadingController.dismiss('firstLoading');
      console.error(error);
    })
  }

}
