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
| `hero-scm-1..3.jpg` | 1920×1080 | Portada a pantalla completa, las fotos que rotan. **Ya están puestas** |
| `hub-scm.jpg` | 1400×1800 | Mitad izquierda de la portada del grupo |
| `equipo-1..6.jpg` | 800×1000 | Retratos del equipo, vertical 4:5 |
| `actualidad-1..3.jpg` | 1200×750 | Tarjetas de la sección Actualidad. La tercera ya lleva el retrato de Mangala con sus cifras; faltan la de mercado y la de entrenamiento |
| `partner-*.jpg` | 1200×750 | Los cinco bloques de SCM x Magno |

**El hero ya lleva fotos reales.** Son tres, recortadas a 16:9 desde las
originales que subisteis:

| Fichero | De dónde sale |
|---|---|
| `hero-scm-1.jpg` | Llegada con la bufanda del club, en el exterior del aeropuerto |
| `hero-scm-2.jpg` | Llegada con el equipaje, dentro de la terminal |
| `hero-scm-3.jpg` | Presentación de Orel Mangala con el Getafe |

Para cambiar cualquiera basta con **sustituir el fichero conservando el
nombre**, y para añadir una cuarta se copia una diapositiva en
`scm/index.html` y se añade `--photo-hero4` en `photos.css`.

**Cómo elegir las fotos.** Horizontal, 1920 x 1080. Con **aire en la mitad
izquierda**, que es donde cae el titular, y con **el jugador a la derecha**:
en móvil la pantalla es mucho más estrecha y el encuadre está desplazado al
68 % de ancho para no dejarlo fuera. Que salga **solo el jugador**.

Las fotos con grafismo incrustado (escudos de trayectoria, cifras de carrera)
no funcionan de fondo: llevan su propia tipografía y chocan con el titular de
la portada. Esas van mejor en la sección Actualidad, donde el texto va debajo
de la imagen y no encima.

**Lo que se puede ajustar:**

- **La velocidad**, en `data-interval` del bloque `hero__portraits` de
  `scm/index.html`, en milisegundos. Ahora está en `1000`, un segundo. Si
  resulta agitado, `4000` deja respirar cada foto.
- **El nombre y el club**, en `data-name` y `data-club` de cada diapositiva.
  La foto que los deja vacíos no muestra crédito.
- **El encuadre general**, en `photos.css`: `--photo-hero-position` para
  escritorio y `--photo-hero-position-mobile` para móvil.
- **El encuadre de una foto suelta**: se le añade su propio `--photo-size` y
  `--photo-position` en el `style` de su diapositiva.

Hace falta autorización de imagen de cada jugador y, si aparece la equipación,
también conviene comprobarlo con el club.

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
