import { Component } from '@angular/core';
import { TablaPaises } from "../../components/tabla-paises/tabla-paises";
import { SearchInput } from "../../components/search-input/search-input";

@Component({
  selector: 'app-por-capital-page',
  imports: [TablaPaises, SearchInput],
  templateUrl: './por-capital-page.html',
  styleUrl: './por-capital-page.css',
})
export class PorCapitalPage {
}
