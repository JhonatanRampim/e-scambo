import { Injectable } from '@angular/core';
import { ICategory } from '../shared/model/category.interface copy';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  category: ICategory[];
  constructor() { }

  getCategories() {
    return this.category = [
      { title: 'Sofá' }, { title: 'Banqueta' }, { title: 'Cômoda' }, { title: 'Mesa de Jantar' },
      { title: 'Mesa de Escritório' }, { title: 'Colchão' }, { title: 'Cama' },
      { title: 'Guarda-roupa' }, { title: 'TV' }, { title: 'Geladeira' }, { title: 'Fogão' }, 
      { title: 'Micro-ondas' }, { title: 'Poltrona' }, { title: 'Guarda-Roupa' }, { title: 'Armário' }];
  }
}
