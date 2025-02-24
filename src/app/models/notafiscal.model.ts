import {Fornecedor} from './fornecedor.model';
import {Produto} from './produto.model';

export class Notafiscal {

  public id: | string | null = null;
  public numeroNota: | string | null = null;
  public dataEHoraEmissao: | string | null = null;
  public fornecedor: Fornecedor | null = null;
  public endereco: | string | null = null;
  public valorTotalNota: number = 0;
  public itens: ItemNota[];

  constructor() {
    this.itens = [];
    this.valorTotalNota = 0;
  }
}

export class ItemNota {
  public id: | string | null = null;
  public produto: Produto | null = null;
  public valorUnitario: number = 0;
  public qtd:  number = 0;
  public valorTotalItem:  number = 0;
  constructor() {
  }
}
