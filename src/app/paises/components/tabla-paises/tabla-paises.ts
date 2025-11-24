import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

// interfaces
import { IPais } from '../../interfaces/pais';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-tabla-paises',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './tabla-paises.html',
  styleUrl: './tabla-paises.css',
})
export class TablaPaises {

  paisesList = input.required<IPais[]>();   // Obligatorio

}
