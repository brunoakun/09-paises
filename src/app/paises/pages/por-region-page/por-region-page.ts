import { Component, inject, signal } from '@angular/core';
import { TablaPaises } from "../../components/tabla-paises/tabla-paises";
import { IPais } from '../../interfaces/pais';
import { PaisesService } from '../../services/paises.service';
import { RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-por-region-page',
  imports: [TablaPaises],
  templateUrl: './por-region-page.html',
  styleUrl: './por-region-page.css',
})

export class PorRegionPage {

  regions: string[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania', 'Antarctic',];
  regionSeleccionada = signal('');

  paisesSrv = inject(PaisesService);

  loading = signal<boolean>(false);
  isError = signal<string | null>(null);
  paisesList = signal<IPais[]>([]);

  buscar(txt: string) {
    if (this.loading()) return;
    this.regionSeleccionada.set(txt);

    this.loading.set(true);
    this.isError.set(null);
    this.paisesList.set([]);

    console.log('__buscar() txt', txt);
    this.paisesSrv.buscarPorRegion(txt).subscribe({
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
