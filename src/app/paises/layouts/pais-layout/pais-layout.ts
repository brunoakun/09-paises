import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { MenuTop } from "../../components/menu-top/menu-top";

@Component({
  selector: 'app-pais-layout',
  imports: [RouterOutlet, MenuTop],
  templateUrl: './pais-layout.html',
  styleUrl: './pais-layout.css',
})
export class PaisLayout {

}
