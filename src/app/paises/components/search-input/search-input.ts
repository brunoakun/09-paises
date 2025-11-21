import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class SearchInput {

  // señales de entrada y salida
  placeholder = input<string>('Buscar...');   // por defecto 'Buscar...'
  txtBuscar = output<string>();

  buscar(txt: string) {
    this.txtBuscar.emit(txt);
  }
}
