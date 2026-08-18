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
| `hero-scm.jpg` | 1080×1350 | Portada. **Ya está enchufado**: basta con sustituir el fichero |
| `hub-scm.jpg` | 1400×1800 | Mitad izquierda de la portada del grupo |
| `equipo-1..6.jpg` | 800×1000 | Retratos del equipo, vertical 4:5 |
| `actualidad-1..3.jpg` | 1200×750 | Tarjetas de la sección Actualidad. Aquí encajan la firma del contrato, la llegada al aeropuerto y los retratos con cifras |
| `partner-*.jpg` | 1200×750 | Los cinco bloques de SCM x Magno |

**El hero ya está conectado.** En `assets/img/hero-scm.jpg` hay ahora un
fondo provisional del color de la marca. Para poner la foto real solo hay que
**sustituir ese fichero conservando el nombre**: no hay que tocar ni una
línea de código.

La foto de presentación de Mangala con el Getafe lleva incrustada arriba la
franja de escudos de su trayectoria. El encuadre está calculado para dejarla
fuera: `--photo-hero-size: auto 150%` amplía la imagen y
`--photo-hero-position: center bottom` la ancla abajo, así que ese tercio
superior no se ve. Si algún día se usa una foto limpia, sin grafismo, se
cambia a `--photo-hero-size: cover`.

**El hero.** Va una foto **vertical** de un jugador de la agencia, formato
1080 x 1350 o parecido, que es justo el de una imagen de presentación para
redes. Ocupa una franja alta a la derecha de la pantalla y su borde
izquierdo se funde con el fondo, así que la cara no se recorta. En móvil
pasa a fondo completo con un velo oscuro encima.

- `--photo-hero-position` sube o baja el encuadre en escritorio.
- `--photo-hero-position-mobile` hace lo mismo para móvil, por separado.
- El crédito de abajo a la derecha se edita en `i18n-scm.js`, en
  `hero.creditName` y `hero.creditClub`.

Debe salir **solo el jugador**: es la primera pantalla de la agencia y una
foto con dos personas resta fuerza. Las fotos de firma de contrato o de
llegada quedan mejor en la sección Actualidad.

Hace falta autorización de imagen del jugador y, si aparece la equipación,
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
