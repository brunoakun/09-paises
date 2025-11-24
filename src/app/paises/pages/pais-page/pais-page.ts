import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

// servicios
import { PaisesService } from '../../services/paises.service';

//  interfaces
import { IPais } from '../../interfaces/pais';
import { DecimalPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-pais-page',
  imports: [DecimalPipe, JsonPipe, RouterLink],
  templateUrl: './pais-page.html',
  styleUrl: './pais-page.css',
})
export class PaisPage {
  paisesSrv = inject(PaisesService);

  loading = signal<boolean>(false);
  isError = signal<string | null>(null);
  pais = signal<IPais | null>(null);

  // recuperar el codigo del pais de la url
  private codPais: string = inject(ActivatedRoute).snapshot.params['codPais'];

  ngOnInit(): void {
    console.log('__ngOnInit buscar codPais', this.codPais);

    this.loading.set(true);
    this.paisesSrv.buscarPais(this.codPais).subscribe({
      next: (resp) => {
        this.loading.set(false);
        console.log('__buscar() resp', resp);

        // Mapear la resp a el interfaz IPais
        const paisMapped: IPais = {
          bandera: resp.flags.png,
          nombre: resp.translations['spa'].common ?? 'sin país en español...',
          capital: (resp.capital || []).join(', '),
          poblacion: resp.population,
          cca2: resp.cca2
        }
        this.pais.set(paisMapped);
      },
      error: (err) => {
        this.loading.set(false);
        console.log('__buscar() error capturado', err);
        this.isError.set(err);
      },

    }
    );
  }
}
