# Cookie Notice

Un script ligero, dependiente de jQuery, para mostrar un banner de aviso de cookies (Cookie Notice) en tu sitio web. 
El script inyecta automáticamente sus estilos necesarios sin requerir archivos CSS externos adicionales.

## Características

- Personalización completa de colores (fondo, texto, botón).
- Posición configurable (arriba `top` o abajo `bottom`).
- Textos ajustables.
- Inyección de CSS integrada.
- Recordatorio de la decisión del usuario mediante cookies (30 días por defecto).

## Requisitos

- Ninguno. Es Vanilla JS, no requiere ninguna librería externa.

## Instalación y Uso

1. Descarga el archivo `cookie-noticev1.js` y colócalo en tu proyecto.
2. Incluye el script de Cookie Notice en tu archivo HTML.

```html
<!-- Script de Cookie Notice -->
<script src="ruta/a/tu/cookie-noticev1.js"></script>
```

### Configuración Personalizada

Puedes personalizar la apariencia y los textos definiendo un objeto `cookieNotice` **antes** de cargar el script `cookie-noticev1.js`.

```html
<script>
    var cookieNotice = {
        cookieBodyText: "Utilizamos cookies para asegurar que damos la mejor experiencia al usuario en nuestro sitio web.",
        cookieButtonText: "Estoy de acuerdo",
        cookiePosition: "bottom", // Puede ser 'bottom' o 'top'
        styleBackground: "#2c3e50", // Color de fondo del aviso
        styleTextcolor: "#ffffff", // Color del texto
        styleButtoncolor: "#e74c3c", // Color de fondo del botón
        styleButtontextcolor: "#ffffff" // Color del texto del botón
    };
</script>
<script src="cookie-noticev1.js"></script>
```

## Ejemplo

Revisa el archivo `index.html` incluido en este repositorio para ver un ejemplo funcional de cómo implementar y personalizar el aviso.

## Licencia

Este proyecto está disponible bajo la licencia MIT.
