import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Fornecedor} from '../../models/fornecedor.model';
import {FornecedorService} from '../../services/fornecedor.service';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Produto} from '../../models/produto.model';

@Component({
  standalone:true,
  selector: 'app-lista-fornecedor',
  imports: [
    TableModule,
    RouterLink,
    Button
  ],
  templateUrl: './lista-fornecedor.component.html',
  styleUrl: './lista-fornecedor.component.css'
})
export class ListaFornecedorComponent implements OnInit{

  fornecedores: Fornecedor | any = new Fornecedor();
  errorMessage: string = '';

  constructor(private router: Router,
              private fornecedorService : FornecedorService) {
    this.fornecedores = [];
  }
  ngOnInit(): void {
    this.carregaFornecedores();
  }

  editarFornecedor(produto: Produto): void {
    this.router.navigate(['/cadastrofornecedores/', produto.id]);
  }

  excluirFornecedor(id: string): void {
    if (confirm('Tem certeza que deseja excluir este fornecedor?')) {
      this.fornecedorService.deleteFornecedor(id).subscribe(() => {
        console.log('Fornecedor excluído com sucesso!');
        this.carregaFornecedores();
        this.router.navigate(['/listafornecedores']);
      });
    }
  }

  carregaFornecedores(): void {
    this.fornecedorService.getFornecedores().subscribe({
      next: (data: Fornecedor[]) => {
        this.fornecedores = data;
      },
      error: (err) => {
        console.error('Erro ao carregar fornecedores:', err);
        this.errorMessage = `Erro ao carregar fornecedores: ${err.message}`;
      }
    });

  }
}
