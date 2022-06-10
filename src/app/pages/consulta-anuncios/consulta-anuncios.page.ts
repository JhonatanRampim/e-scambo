import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { MovelService } from 'src/app/services/movel.service';
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

  constructor(
    public movelService: MovelService,
    public router: Router
  ) { }

  ngOnInit() {
    this.movelService.getMoveisAnunciados().subscribe(moveis => {
      moveis.forEach(movel => {
        this.moveis.push(movel);
      });
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

}
