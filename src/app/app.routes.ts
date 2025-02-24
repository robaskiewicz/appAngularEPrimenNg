import { Routes } from '@angular/router';
import {CadastroProdutoComponent} from './components/cadastro-produto/cadastro-produto.component';
import {ListaProdutoComponent} from './components/lista-produto/lista-produto.component';
import {ListaFornecedorComponent} from './components/lista-fornecedor/lista-fornecedor.component';
import {CadastroFornecedorComponent} from './components/cadastro-fornecedor/cadastro-fornecedor.component';
import {ListaNotafiscalComponent} from './components/lista-notafiscal/lista-notafiscal.component';
import {CadastroNotafiscalComponent} from './components/cadastro-notafiscal/cadastro-notafiscal.component';

export const routes: Routes = [
  { path: '', redirectTo: '/listaprodutos', pathMatch: 'full' }, // Rota padrão
  { path: 'cadastroprodutos/:id', component: CadastroProdutoComponent },
  { path: 'cadastroprodutos', component: CadastroProdutoComponent },
  { path: 'listaprodutos', component: ListaProdutoComponent },
  { path: 'listafornecedores', component: ListaFornecedorComponent },
  { path: 'cadastrofornecedores/:id', component: CadastroFornecedorComponent },
  { path: 'cadastrofornecedores', component: CadastroFornecedorComponent },
  { path: 'listanotas', component: ListaNotafiscalComponent },
  { path: 'cadastronotas/:id', component: CadastroNotafiscalComponent },
  { path: 'cadastronotas', component: CadastroNotafiscalComponent },
];
