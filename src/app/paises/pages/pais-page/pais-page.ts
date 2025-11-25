import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

// servicios
import { PaisesService } from '../../services/paises.service';

//  interfaces
import { IPais } from '../../interfaces/pais';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-pais-page',
  imports: [DecimalPipe, RouterLink],
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

  public currentYear = computed(() => new Date().getFullYear());

  ngOnInit(): void {
    console.log('__ngOnInit buscar codPais', this.codPais);

    this.loading.set(true);
    this.paisesSrv.buscarPais(this.codPais).subscribe({
      next: (resp) => {
        this.loading.set(false);
        console.log('__buscar() resp', resp);

        // Mapear la resp a el interfaz IPais
        // Gini viene como un objeto con año:valor, por ejemplo { "2018": 35.7 }
        // Extraer el primer valor numérico disponible o 0 si no hay ninguno
        const giniValue: number =
          resp.gini && Object.values(resp.gini).length > 0
            ? Number(Object.values(resp.gini)[0])
            : 0;

        const paisMapped: IPais = {
          bandera: resp.flags.png,
          nombre: resp.translations['spa'].common ?? 'sin país en español...',
          capital: (resp.capital || []).join(', '),
          poblacion: resp.population,
          cca2: resp.cca2,
          area: resp.area,
          pib: giniValue,
          escudo: resp.coatOfArms.png,
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
