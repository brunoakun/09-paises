import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';
import { debounce, interval, of, tap } from 'rxjs';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class SearchInput {

  // señales de entrada y salida
  placeholder = input<string>('Buscar...');   // por defecto 'Buscar...'
  valorInicial = input<string>('');
  tiempoDebounce = input<number>(500);
  txtBuscar = output<string>();

  // linkedSignal para inicializar una señal con un valor  computado de otra señal
  valorTecleado = linkedSignal<string>(() => this.valorInicial() ?? '');

  // Buscar el valor tecleado automáticamante si este cambia, pero no buscar si hace menos de 500ms que no cambia
  debounceEfecto = effect((oncleanUp) => {
    const value = this.valorTecleado();

    const timeout = setTimeout(() => {
      this.txtBuscar.emit(this.valorTecleado());
    }, this.tiempoDebounce());

    oncleanUp(() => {
      clearTimeout(timeout);
    })
  });




  buscar(txt: string) {
    this.txtBuscar.emit(txt);
  }
}

