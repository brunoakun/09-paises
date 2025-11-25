import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class TestLayout {
  sidebarOpen = false;

  navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Equipo', href: '#', current: false },
    { name: 'Proyectos', href: '#', current: false },
    { name: 'Calendario', href: '#', current: false },
    { name: 'Documentos', href: '#', current: false },
    { name: 'Reportes', href: '#', current: false },
  ];
}
