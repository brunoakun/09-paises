import { Component } from '@angular/core';
import { TemasService } from '../../../paises/services/temas';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  isDark = false;

  constructor(public temasSrv: TemasService) { }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme') || 'cupcake';
    this.isDark = savedTheme === 'sunset' || savedTheme === 'dracula';
    this.applyTheme();
  }

  toggleDarkMode() {
    this.isDark = !this.isDark;
    this.applyTheme();
  }

  private applyTheme() {
    const theme = this.isDark ? 'sunset' : 'cupcake';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
  changeTheme(theme: string) {
    this.temasSrv.setTheme(theme);
  }

}
