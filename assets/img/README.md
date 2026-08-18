# Imágenes

La web funciona sin ninguna fotografía: donde va una imagen se pinta un
bloque de color con su icono, y donde va un escudo se ve el monograma del
club. Todo lo que sigue mejora el resultado, pero nada de esto bloquea la
publicación.

## Escudos de clubes

Están en `assets/img/clubes/`, un fichero por club. Los que hay ahora son
**marcadores**: un círculo con el monograma. Para poner el escudo real basta
con sustituir el fichero conservando el nombre:

```
assets/img/clubes/real-madrid.svg   <- reemplazar por el escudo real
assets/img/clubes/barcelona.svg
...
```

Si el escudo que tenéis es PNG en vez de SVG, cambiad también la extensión en
el `src` de `scm/index.html`. Se pueden ir poniendo de uno en uno: los que
falten siguen mostrando el monograma.

Formato recomendado: SVG, o PNG de 200 x 200 con fondo transparente.

> **Aviso.** Los escudos son marcas registradas de cada club. Mostrarlos como
> referencia de una red de contactos es habitual en el sector, pero conviene
> que vuestra asesoría lo confirme, sobre todo si la web sugiere una relación
> comercial que el club no ha autorizado. La nota al pie de la sección ya
> aclara que los escudos pertenecen a sus clubes.

## Logotipos de las marcas

`logo-scm.png` y `logo-magno.png` están **reconstruidos a partir de los PDF**
de marca, recomponiendo imagen y máscara de transparencia. Rondan los 500 px
de ancho: llegan para la web, no para imprimir. Si aparecen los originales en
SVG o AI, se sustituyen sin más. El CSS los invierte a blanco donde el fondo
es oscuro (`filter: invert(1)`), así que un vector monocromo funciona igual.

## Fotografías

Se enchufan descomentando la línea que toque en `assets/css/photos.css`. No
hay que tocar el HTML.

### SCM Sports Agency

| Fichero | Tamaño | Dónde sale |
|---|---|---|
| `hero-scm-1..4.jpg` | 1920×1080 | Portada a pantalla completa, las cuatro fotos que rotan. **Ya están enchufadas**: basta con sustituir cada fichero |
| `hub-scm.jpg` | 1400×1800 | Mitad izquierda de la portada del grupo |
| `equipo-1..6.jpg` | 800×1000 | Retratos del equipo, vertical 4:5 |
| `actualidad-1..3.jpg` | 1200×750 | Tarjetas de la sección Actualidad. Aquí encajan la firma del contrato, la llegada al aeropuerto y los retratos con cifras |
| `partner-*.jpg` | 1200×750 | Los cinco bloques de SCM x Magno |

**El hero ya está conectado.** En `assets/img/hero-scm-1.jpg` a
`hero-scm-4.jpg` hay ahora cuatro marcadores que dicen en pantalla qué fichero
sustituye cada uno. Para poner las fotos reales solo hay que **sustituir esos
ficheros conservando el nombre**: no hay que tocar ni una línea de código.

**El hero.** La fotografía es el fondo de toda la portada, de lado a lado, con
el titular encima. Son **cuatro fotos que se relevan solas** por fundido.

Formato: **horizontal, 1920 x 1080** o parecido. Una foto vertical de
presentación también entra, pero al llenar una pantalla apaisada se le recorta
bastante por arriba y por abajo, así que se aprovechan mucho mejor las
horizontales.

Escoged fotos con **aire en la mitad izquierda**: ahí cae el titular. Y que en
cada una salga **solo el jugador**: es la primera pantalla de la agencia y una
imagen con dos personas resta fuerza. Las fotos de firma de contrato o de
llegada quedan mejor en la sección Actualidad.

Lo que se puede ajustar:

- **La velocidad**, en `data-interval` del bloque `hero__portraits` de
  `scm/index.html`, en milisegundos. Ahora está en `1000`, un segundo. Si
  resulta agitado, `4000` deja respirar cada foto.
- **El nombre y el club** de abajo a la derecha, en `data-name` y `data-club`
  de cada diapositiva. Cambian solos al cambiar la foto.
- **El encuadre general**, en `photos.css`: `--photo-hero-position` sube o
  baja el recorte en escritorio y `--photo-hero-position-mobile` hace lo mismo
  en móvil, por separado. Están en 25 % y 20 % para que la cara quede en el
  tercio superior.
- **El encuadre de una foto suelta**, si una necesita otro recorte que las
  demás: se le añade su propio `--photo-size` y `--photo-position` en el
  `style` de su diapositiva y esa manda sobre el general.

Hace falta autorización de imagen de cada jugador y, si aparece la equipación,
también conviene comprobarlo con el club.

Si de momento solo hay una foto buena, se puede dejar una sola diapositiva en
el HTML: con menos de dos el carrusel no arranca y se ve fija, sin errores.

### Magno Marbella

| Fichero | Tamaño | Dónde sale |
|---|---|---|
| `hero-magno.jpg` | 1920×1080 | Portada, a pantalla completa |
| `hub-magno.jpg` | 1400×1800 | Mitad derecha de la portada del grupo |
| `magno-campos/sesiones/gimnasio/fotografo.jpg` | 1200×900 | Los cuatro servicios de entrenamiento |
| `magno-villas/hoteles/vehiculos/nautica/eventos/shopping.jpg` | 1200×900 | Los seis servicios de lifestyle |
| `reel-1..4.jpg` | 720×1280 | Portadas de los vídeos de Instagram, vertical 9:16 |
| `magno-entrenamiento/recuperacion/villa.jpg` | 1200×900 | Sección En imágenes |

Las fotos de instalaciones y villas de vuestra guía de servicios sirven
directamente para casi todos estos huecos.

### Vídeos de Instagram

La sección de vídeos no incrusta el reproductor de Instagram, que obligaría a
cargar su script y a poner banner de cookies. Cada tarjeta es la portada del
vídeo con un botón de reproducción que abre el reel en Instagram. Hay que
hacer dos cosas por vídeo:

1. Poner la miniatura en `--photo-reel1` y siguientes, en `photos.css`.
2. Cambiar el `href` de la tarjeta en `magno/index.html` por la URL del reel.

## Cómo elegir las fotos

- **Los heroes llevan texto encima.** Escoged fotos con una zona tranquila
  donde caiga el titular.
- **SCM** pide fotografía de jugador con contraste alto; el hero le pone un
  velo oscuro por encima.
- **Magno** pide luz natural y planos amplios: instalaciones, villas, mar.
  Nada de banco de imágenes con gente sonriendo a cámara.
- **Los retratos del equipo** deben tener el mismo encuadre en los seis. Una
  rejilla con recortes distintos se nota mucho.

## Peso

Exportad en **WebP** si podéis, o JPG al 80 %. Ninguna imagen debería pasar
de **300 KB**; los heroes, de 500 KB.
