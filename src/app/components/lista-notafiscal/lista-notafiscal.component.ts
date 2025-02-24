import {Component, OnInit} from '@angular/core';
import {Notafiscal} from '../../models/notafiscal.model';
import {Router, RouterLink} from '@angular/router';
import {NotafiscalService} from '../../services/notafiscal.service';
import {TableModule, TableRowCollapseEvent, TableRowExpandEvent} from 'primeng/table';
import {Button} from 'primeng/button';
import {CurrencyPipe, DatePipe} from '@angular/common';


@Component({
  standalone:true,
  selector: 'app-lista-notafiscal',
  imports: [
    TableModule,
    Button,
    RouterLink,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './lista-notafiscal.component.html',
  styleUrl: './lista-notafiscal.component.css'
})
export class ListaNotafiscalComponent implements OnInit{
  notas: Notafiscal | any = new Notafiscal();
  errorMessage: string = '';

  expandedRows = {};



  onRowExpand(event: TableRowExpandEvent) {
    // console.log("onRowExpand")
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    // console.log("onRowCollapse")
  }

  constructor(private router: Router,
              private notafiscalService : NotafiscalService) {
    this.notas = [];
  }

  ngOnInit(): void {
    this.carregaNotas();
  }

  carregaNotas(): void {
    this.notafiscalService.getNotasFiscais().subscribe({
      next: (data: Notafiscal[]) => {
        // console.log('Dados da API:', data); // Adicione esta linha
        this.notas = data;
      },
      error: (err) => {
        console.error('Erro ao carregar notas fiscais:', err);
        this.errorMessage = `Erro ao carregar as notas fiscais: ${err.message}`;
      }
    });

  }
}
