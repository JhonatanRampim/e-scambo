import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovelService } from 'src/app/services/movel.service';
import { IMovel } from 'src/app/shared/model/movel.interface';

@Component({
  selector: 'app-consulta-anuncios',
  templateUrl: './consulta-anuncios.page.html',
  styleUrls: ['./consulta-anuncios.page.scss'],
})
export class ConsultaAnunciosPage implements OnInit {
  moveis: IMovel[];
  constructor(
    public movelService: MovelService,
    public router: Router
  ) { }

  ngOnInit() {
    this.moveis = this.movelService.getMoveisAnunciados();
  }
  verDetalhes(selectedId:number) {
    this.router.navigate(['/detalhe-anuncio', selectedId]);
  }
}
