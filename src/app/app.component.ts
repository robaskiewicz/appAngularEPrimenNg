import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuEsquerdaComponent} from './components/menu-esquerda/menu-esquerda.component';

@Component({
  standalone:true,
  selector: 'app-root',
  imports: [RouterOutlet, MenuEsquerdaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'appAngularEPrimeNg';
}
