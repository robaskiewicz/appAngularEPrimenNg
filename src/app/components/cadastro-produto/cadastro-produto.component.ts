import {Component, OnInit} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import {HttpClient} from '@angular/common/http'
import {ProdutoService} from '../../services/produto.service';
import {Produto, SituacaoProduto} from '../../models/produto.model';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';

@Component({
  standalone:true,
  selector: 'app-cadastro-produto',
  imports: [
    ButtonDirective, RouterModule, InputTextModule, FormsModule, DropdownModule
  ],
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.css'
})
export class CadastroProdutoComponent implements OnInit {

  produtoSelected: Produto = new Produto();
  objetoLocalizado: Produto = new Produto();
  errorMessage: string = '';
  situacaoProduto: any[] = [];

  constructor(
    private produtoService: ProdutoService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.situacaoProduto = [
      { label: 'Ativo', value: 'ATIVO' },
      { label: 'Inativo', value: 'INATIVO' }
    ];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {

        this.produtoService.getProdutoById(id).subscribe({
          next: (produto) => {
            this.objetoLocalizado = produto;
            if (this.objetoLocalizado) {
              this.produtoSelected = { ...this.objetoLocalizado };
              console.log('Editando produto com ID:', id);
            } else {
              console.log('Produto não encontrado.');
            }
          },
          error: (error) => {
            console.error('Erro ao buscar produto:', error);
          }
        });
      } else {
        console.log('Criando um novo produto');
      }
    });
  }

  salvar(): void {
    if (this.produtoSelected.id) {
      this.produtoService.updateProduto(this.produtoSelected).subscribe({
        next: () => this.router.navigate(['/listaprodutos']),
        error: (error) => {
          console.error('Erro ao atualizar produto:', error);
          this.errorMessage = 'Erro ao atualizar o produto. Tente novamente.';
        }
      });
    } else {
      this.produtoService.createProduto(this.produtoSelected).subscribe({
        next: () => this.router.navigate(['/listaprodutos']),
        error: (error) => {
          console.error('Erro ao cadastrar produto:', error);
          this.errorMessage = 'Erro ao cadastrar o produto. Tente novamente.';
        }
      });
    }
  }


}

