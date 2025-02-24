import {Component, OnInit} from '@angular/core';
import {Fornecedor} from '../../models/fornecedor.model';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FornecedorService} from '../../services/fornecedor.service';
import {FormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonDirective} from 'primeng/button';

@Component({
  standalone:true,
  selector: 'app-cadastro-fornecedor',
  imports: [
    FormsModule,
    DropdownModule,
    RouterLink,
    InputTextModule, ButtonDirective
  ],
  templateUrl: './cadastro-fornecedor.component.html',
  styleUrl: './cadastro-fornecedor.component.css'
})
export class CadastroFornecedorComponent implements OnInit{
  fornecedorSelected: Fornecedor = new Fornecedor();
  objetoLocalizado: Fornecedor = new Fornecedor();
  errorMessage: string = '';
  situacaoFornecedor: any[] = [];

  constructor(
    private fornecedorService: FornecedorService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.situacaoFornecedor = [
      { label: 'Ativo', value: 'ATIVO' },
      { label: 'Baixado', value: 'BAIXADO' },
      { label: 'Suspenso', value: 'SUSPENSO' }
    ];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {

        this.fornecedorService.getFornecedorById(id).subscribe({
          next: (fornecedor) => {
            this.objetoLocalizado = fornecedor;
            if (this.objetoLocalizado) {
              this.fornecedorSelected = { ...this.objetoLocalizado };
              console.log('Editando fornecedor com ID:', id);
            } else {
              console.log('Fornecedor não encontrado.');
            }
          },
          error: (error) => {
            console.error('Erro ao buscar fornecedor:', error);
          }
        });
      } else {
        console.log('Criando um novo fornecedor');
      }
    });
  }

  salvar(): void {
    if (this.fornecedorSelected.id) {
      this.fornecedorService.updateFornecedor(this.fornecedorSelected).subscribe({
        next: () => this.router.navigate(['/listafornecedores']),
        error: (error) => {
          console.error('Erro ao atualizar fornecedor:', error);
          this.errorMessage = 'Erro ao atualizar o fornecedor. Tente novamente.';
        }
      });
    } else {
      this.fornecedorService.createFornecedor(this.fornecedorSelected).subscribe({
        next: () => this.router.navigate(['/listafornecedores']),
        error: (error) => {
          console.error('Erro ao cadastrar fornecedor:', error);
          this.errorMessage = 'Erro ao cadastrar o fornecedor. Tente novamente.';
        }
      });
    }
  }

}
