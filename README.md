# 09Paises

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.2.

## Development server

ng serve

## Aplicación consulta API

1.- Signal, Resources, rxResources, Señales,Servicios
2.- Reutilización de componentes, Peticiones http, Operadores de RXJS
3.- Usar un debounceEffect para Buscar el valor tecleado automáticamante si este cambia, pero no buscar si hace menos de 500ms que no cambia
4.- Crear un caché para guardar las busquedas anteriores y evitar llamadas a la API
5.- Guardar en localStorage el texto tecleado en las búsquedas para que se pueda recuperar en el siguiente inicio de la app

## DaisyUI y TailwindCSS:

Instalar tailwind
npm install tailwindcss @tailwindcss/postcss postcss --force

Instalar DaisyUI
npm i -D daisyui@latest

## iconos:

https://iconify.design/

## API de paises:

https://restcountries.com/

## crear variables de entorno:

ng g environments
eso crea el archivo src/environments/environment.ts con las variables de entorno, y el fileReplacements en el archivo angular.json

## conponentes con tailwind:

flowbite.com/docs/components/gallery

## Ctrl + Shift + p -> Paste Json as Code

Con esto crea un interface con el json copiado

## Depurar la aplicación

Marcar los BrackPoints en el código de Visual studio code y en la teminal pulsar F5
