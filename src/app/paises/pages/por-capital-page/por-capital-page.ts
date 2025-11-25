import { Component, inject, signal } from '@angular/core';

// componentes
import { TablaPaises } from "../../components/tabla-paises/tabla-paises";
import { SearchInput } from "../../components/search-input/search-input";

// servicios
import { PaisesService } from '../../services/paises.service';
import { IPais } from '../../interfaces/pais';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-por-capital-page',
  imports: [TablaPaises, SearchInput,],
  templateUrl: './por-capital-page.html',
  styleUrl: './por-capital-page.css',
})
export class PorCapitalPage {
  paisesSrv = inject(PaisesService);

  // mirar si se pasan parámetros en la URL
  activatedRoute = inject(ActivatedRoute);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') || '';

  query = signal(this.queryParam);

  ngOnInit() {

    console.log('this.query', this.query());

    if (this.queryParam.length > 0) {
      this.buscar(this.query());
    }
  }

  loading = signal<boolean>(false);
  isError = signal<string | null>(null);
  paisesList = signal<IPais[]>([]);

  buscar(txt: string) {
    if (this.loading()) return;

    this.loading.set(true);
    this.isError.set(null);
    this.paisesList.set([]);

    console.log('__buscar() txt', txt);
    this.paisesSrv.buscarPorCapital(txt).subscribe({
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
