import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { IMovel } from '../shared/model/movel.interface';

@Injectable({
  providedIn: 'root'
})
export class MovelService {
  private staticMoveis: IMovel[] = [
    {
      id: 1,
      title: 'Sofá cama Caster, pronta entrega',
      description: 'ACEITAMOS CARTÃO DE CRÉDITO E PARCELAMOS EM ATÉ 12x SEM JUROS ACEITAMOS PAGAMENTO VIA PICPAY NOVIDADE ACEITAMOS CARTÃO SENF EM ATÉ 3X SEM JUROS. OBS: VALORES SUJEITOS A ALTERAÇÃO A QUALQUER MOMENTO DEVIDO A DEMANDA DE FALTA DE MATERIA PRIMA.',
      createdAt: '2022-05-29 20:14',
      updatedAt: '2022-05-29 20:14',
      thumbnail: [{ id: 1, path: 'https://img.olx.com.br/images/83/832279274299273.jpg' }]
    },
    {
      id: 2,
      title: 'Móvel para Joias',
      description: 'São Carlos SP - Lindo móvel para joias com pintura rústica. Medidas: 76 cm altura x 52 cm largura x 31 cm profundidade. Passo cartão crédito e débito.',
      createdAt: '2022-05-30 20:14',
      updatedAt: '2022-05-30 20:14',
      thumbnail: [{ id: 1, path: 'https://img.olx.com.br/images/35/355284289578959.jpg' }]
    },
    {
      id: 3,
      title: 'Móvel para Joias',
      description: 'Escrivaninhas colorida.',
      createdAt: '2022-05-30 20:14',
      updatedAt: '2022-05-30 20:14',
      thumbnail: [{ id: 1, path: 'https://img.olx.com.br/images/35/355284289578959.jpg' }, { id: 2, path: 'https://img.olx.com.br/images/35/355211046390706.jpg' }, { id: 3, path: 'https://img.olx.com.br/images/35/350220529393872.jpg' }]
    }
  ]

  constructor() { }


  getMoveisAnunciados(): IMovel[] {
    return this.staticMoveis;
  }

  getMovelAnuncio(id:number):IMovel {
    return this.staticMoveis.find(movel => movel.id == id);
  }
}
