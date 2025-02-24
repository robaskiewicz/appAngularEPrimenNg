import {Component, OnInit} from '@angular/core';
import {Fornecedor} from '../../models/fornecedor.model';
import {ItemNota, Notafiscal} from '../../models/notafiscal.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NotafiscalService} from '../../services/notafiscal.service';
import {Button, ButtonDirective} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {AutoComplete, AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {FornecedorService} from '../../services/fornecedor.service';
import {Produto} from '../../models/produto.model';
import {ProdutoService} from '../../services/produto.service';
import {InputNumberModule} from 'primeng/inputnumber';
import {TableModule} from 'primeng/table';
import {CurrencyPipe} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-cadastro-notafiscal',
  imports: [
    ButtonDirective,
    DropdownModule,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    AutoComplete,
    RouterLink,
    InputNumberModule,
    Button,
    TableModule,
    CurrencyPipe
  ],
  templateUrl: './cadastro-notafiscal.component.html',
  styleUrl: './cadastro-notafiscal.component.css'
})
export class CadastroNotafiscalComponent implements OnInit {
  notaSelected: Notafiscal = new Notafiscal();
  objetoLocalizado: Notafiscal = new Notafiscal();
  errorMessage: string = '';
  fornecedores: Fornecedor[] = [];
  produtos: Produto[] = [];
  itemNotaSelected: ItemNota = new ItemNota();
  editaItemNota: boolean = false;

  search(event: AutoCompleteCompleteEvent) {
    this.fornecedorService.buscarFornecedores(event.query).subscribe({
      next: (fornecedor: Fornecedor[]) => {
        this.fornecedores = fornecedor;
        console.log("AA: " + this.fornecedores)
      },
      error: (error) => {
        console.error('Erro ao buscar fornecedores:', error);
      }
    });
  }

  searchProduto(event: AutoCompleteCompleteEvent) {
    this.produtoService.buscarProdutos(event.query).subscribe({
      next: (produto: Produto[]) => {
        this.produtos = produto;
        // console.log("AA: " + this.produtos)
      },
      error: (error) => {
        console.error('Erro ao buscar produtos:', error);
      }
    });
  }

  constructor(
    private notafiscalService: NotafiscalService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {

        this.notafiscalService.getNotafiscalById(id).subscribe({
          next: (nota) => {
            this.objetoLocalizado = nota;
            if (this.objetoLocalizado) {
              this.notaSelected = {...this.objetoLocalizado};
              console.log('Editando nota com ID:', id);
            } else {
              console.log('Nota não encontrada.');
            }
          },
          error: (error) => {
            console.error('Erro ao buscar nota:', error);
          }
        });
      } else {
        console.log('Criando uma nova nota');
      }
    });
  }

  adicionarItem(): void {

    const produtoJaAdicionado = this.notaSelected.itens.some(
      item => item.produto?.id === this.itemNotaSelected.produto?.id
    );

    if (this.editaItemNota) {
      const index = this.notaSelected.itens.findIndex(item => item.produto?.id === this.itemNotaSelected.produto?.id);
      if (index !== -1) {
        this.notaSelected.itens[index] = this.itemNotaSelected;
        this.recalcularValorTotal();
        this.itemNotaSelected = new ItemNota();
        this.editaItemNota = false;
      }
    }

    if (produtoJaAdicionado) {
      console.error('Produto já adicionado à lista.');
      return;
    }

    if (this.itemNotaSelected.produto && this.itemNotaSelected.valorUnitario && this.itemNotaSelected.qtd) {
      const item: ItemNota = new ItemNota();
      item.produto = this.itemNotaSelected.produto;
      item.valorUnitario = this.itemNotaSelected.valorUnitario;
      item.qtd = this.itemNotaSelected.qtd;
      item.valorTotalItem = item.valorUnitario * item.qtd;

      this.notaSelected.itens.push(item);
      this.recalcularValorTotal();
      this.limparCampos();
    }
    this.editaItemNota = false;
  }

  recalcularValorTotal(): void {
    if (this.notaSelected && this.notaSelected.itens) {
      let novoValorTotal = 0;
      for (const item of this.notaSelected.itens) {
        novoValorTotal += item.valorUnitario * item.qtd;
        item.valorTotalItem = item.valorUnitario * item.qtd;
      }
      this.notaSelected.valorTotalNota = novoValorTotal;
    }
  }

  editarItemNota(itemNota: ItemNota): void {
    this.editaItemNota = true;
    this.itemNotaSelected.produto = itemNota.produto;
    this.itemNotaSelected.qtd = itemNota.qtd;
    this.itemNotaSelected.valorUnitario = itemNota.valorUnitario;
  }

  exluirItemNota(itemNota: ItemNota): void {
    if (this.notaSelected && this.notaSelected.itens) {
      const index = this.notaSelected.itens.findIndex(item => item.produto?.id === itemNota.produto?.id);
      if (index !== -1) {
        this.notaSelected.itens.splice(index, 1);
        this.recalcularValorTotal();
      }
    }
  }

  limparCampos(): void {
    this.itemNotaSelected.produto = null;
    this.itemNotaSelected.valorUnitario = 0;
    this.itemNotaSelected.qtd = 0;
  }

  salvar(): void {
    if (this.notaSelected.id) {
      this.notafiscalService.updateNotafiscal(this.notaSelected).subscribe({
        next: () => this.router.navigate(['/listanotas']),
        error: (error) => {
          console.error('Erro ao atualizar produto:', error);
          this.errorMessage = 'Erro ao atualizar o produto. Tente novamente.';
        }
      });
    } else {
      this.notafiscalService.createNotafiscal(this.notaSelected).subscribe({
        next: () => this.router.navigate(['/listanotas']),
        error: (error) => {
          console.error('Erro ao cadastrar nota:', error);
          this.errorMessage = 'Erro ao cadastrar a nota. Tente novamente.';
        }
      });
    }
  }

}
