import { Component } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { TablaPaises } from "../../components/tabla-paises/tabla-paises";

@Component({
  selector: 'app-por-pais-page',
  imports: [SearchInput, TablaPaises],
  templateUrl: './por-pais-page.html',
  styleUrl: './por-pais-page.css',
})
export class PorPaisPage {

}
