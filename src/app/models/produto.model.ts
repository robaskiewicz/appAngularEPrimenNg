export enum SituacaoProduto {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO'
}

export class Produto {
  id: | string | null = null;
  descricao: string  | null = null;
  situacaoProduto: SituacaoProduto | undefined | null | any = null;

  constructor() {
  }


}
