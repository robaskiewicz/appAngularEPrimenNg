export enum SituacaoFornecedor {
  ATIVO = 'ATIVO',
  BAIXADO = 'BAIXADO',
  SUSPENSO = 'SUSPENSO'
}

export class Fornecedor {
  public id: | string | null = null;
  public razaoSocial: | string | null = null;
  public email: | string | null = null;
  public telefone: | string | null = null;
  public cnpj: | string | null = null;
  public dataBaixa: | string | null = null;
  public situacaoFornecedor: | string | null = null;

  constructor() {
  }
}
