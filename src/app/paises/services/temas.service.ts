// servicio para cambiar el tema de daisyui

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TemasService {
  private themes = ['nord', 'abyss', 'sunset', 'cupcake', 'dracula'];
  private currentThemeSubject = new BehaviorSubject<string>('cupcake');

  currentTheme$ = this.currentThemeSubject.asObservable();

  constructor() {
    this.initTheme();
  }

  private initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'cupcake';
    this.setTheme(savedTheme);
  }

  setTheme(theme: string) {
    if (this.themes.includes(theme)) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      this.currentThemeSubject.next(theme);
    }
  }

  getTheme(): string {
    return this.currentThemeSubject.value;
  }

  getThemes(): string[] {
    return this.themes;
  }

  toggleTheme() {
    const current = this.currentThemeSubject.value;
    const currentIndex = this.themes.indexOf(current);
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.setTheme(this.themes[nextIndex]);
  }
}
