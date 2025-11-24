import { Component, inject, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { TablaPaises } from "../../components/tabla-paises/tabla-paises";
import { PaisesService } from '../../services/paises.service';
import { IPais } from '../../interfaces/pais';

@Component({
  selector: 'app-por-pais-page',
  imports: [SearchInput, TablaPaises],
  templateUrl: './por-pais-page.html',
  styleUrl: './por-pais-page.css',
})
export class PorPaisPage {

  paisesSrv = inject(PaisesService);
  query = signal('');

  loading = signal<boolean>(false);
  isError = signal<string | null>(null);
  paisesList = signal<IPais[]>([]);

  buscar(txt: string) {
    if (this.loading()) return;

    this.loading.set(true);
    this.isError.set(null);
    this.paisesList.set([]);

    console.log('__buscar() txt', txt);
    this.paisesSrv.buscarPorPais(txt).subscribe({
      next: (resp) => {
        this.loading.set(false);
        console.log('__buscar() resp', resp);

        // Mapear la resp a el interfaz IPais
        const paises: IPais[] = resp.map((pais) => ({
          bandera: pais.flags.png,
          nombre: pais.translations['spa'].common ?? 'sin país en español...',
          capital: (pais.capital || []).join(', '),
          poblacion: pais.population,
          cca2: pais.cca2,
        }));

        this.paisesList.set(paises);
      },
      error: (err) => {
        this.loading.set(false);
        console.log('__buscar() error capturado', err);
        this.isError.set(err);
      },
    });
  }

}
