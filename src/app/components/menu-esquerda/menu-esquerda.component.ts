import { Component } from '@angular/core';
import {Menu} from 'primeng/menu';
import { MenuModule } from 'primeng/menu';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-menu-esquerda',
  imports: [
    Menu, MenuModule
  ],
  templateUrl: './menu-esquerda.component.html',
  styleUrl: './menu-esquerda.component.css'
})
export class MenuEsquerdaComponent {

  constructor(private router: Router) {}

  menuItems = [
    { label: 'Produtos', icon: 'pi pi-box', command: () => this.navegar('listaprodutos') },
    { label: 'Fornecedores', icon: 'pi pi-box', command: () => this.navegar('listafornecedores') },
    { label: 'Notas Fiscais', icon: 'pi pi-box', command: () => this.navegar('listanotas') }
  ];

  navegar(item: string) {
    console.log(`Navegando para ${item}`);
    this.router.navigate([item]);
  }
}
