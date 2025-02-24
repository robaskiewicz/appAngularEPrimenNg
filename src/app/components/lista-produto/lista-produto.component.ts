import {Component, OnInit} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {Router, RouterModule} from '@angular/router';
import { TableModule } from 'primeng/table';
import {Produto} from '../../models/produto.model';
import {ProdutoService} from '../../services/produto.service';

@Component({
  standalone:true,
  selector: 'app-lista-produto',
  imports: [ButtonModule, RouterModule, TableModule],
  templateUrl: './lista-produto.component.html',
  styleUrl: './lista-produto.component.css'
})
export class ListaProdutoComponent implements OnInit{

  produtos: Produto[] = [];
  errorMessage: string = '';

  constructor(private router: Router,
              private produtoService : ProdutoService) {
    this.produtos = [];
  }

  ngOnInit(): void {
    this.carregaProdutos();
  }

  editarProduto(produto: Produto): void {
    this.router.navigate(['/cadastroprodutos/', produto.id]);
  }

  excluirProduto(id: string): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.produtoService.deleteProduto(id).subscribe(() => {
        console.log('Produto excluído com sucesso!');
        this.carregaProdutos();
        this.router.navigate(['/listaprodutos']);
      });
    }
  }

  carregaProdutos(): void {
    this.produtoService.getProdutos().subscribe({
      next: (data: Produto[]) => {
        this.produtos = data;
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.errorMessage = `Erro ao carregar produtos: ${err.message}`;
      }
    });

  }


}
