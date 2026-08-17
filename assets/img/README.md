# Imágenes

La web funciona sin ninguna foto: donde va una imagen se pinta un bloque de
color de la paleta. Para poner las fotos reales **no hay que tocar el HTML**:
se descomentan las líneas de `assets/css/photos.css` y se dejan los ficheros
en esta carpeta.

## Logotipos

`logo-scm.png` y `logo-magno.png` están **reconstruidos a partir de los PDF
de marca**: se extrajeron la imagen y su máscara de transparencia y se
recompusieron con alfa, recortando el margen sobrante. Rondan los 500 px de
ancho, que llega para la web pero no para imprimir ni para crecer.

Si aparecen los originales en SVG o AI, basta con sustituirlos. El CSS los
invierte a blanco donde el fondo es oscuro (`filter: invert(1)`), así que un
vector monocromo funciona igual.

## Fotografías que hacen falta

| Fichero | Tamaño | Dónde sale |
|---|---|---|
| `hero-magno.jpg` | 1920×1080 | Portada de Magno, pantalla completa |
| `hero-scm.jpg` | 1920×1080 | Portada de SCM — **opcional**, el hero rojo funciona solo |
| `hub-scm.jpg` | 1400×1800 | Mitad izquierda de la portada del grupo |
| `hub-magno.jpg` | 1400×1800 | Mitad derecha de la portada del grupo |
| `magno-entrenamiento.jpg` | 1200×900 | Sección "En imágenes" (tarjeta ancha) |
| `magno-gimnasio.jpg` | 1200×900 | Sección "En imágenes" |
| `magno-villa.jpg` | 1200×900 | Sección "En imágenes" |
| `og-grupo.jpg`, `og-scm.jpg`, `og-magno.jpg` | 1200×630 | Vista previa al compartir en WhatsApp, LinkedIn, X |

Las fotos de instalaciones y villas de la guía de Magno sirven directamente
para las tres de "En imágenes": gimnasio, sala de recuperación y villa con
piscina.

## Cómo elegirlas

- **Los heroes llevan texto encima.** Escoge fotos con una zona tranquila
  (cielo, césped, agua) donde caiga el titular. Si la foto tiene mucho detalle
  en el centro, el texto no se lee.
- **SCM** pide fotografía de partido o entrenamiento. Como el hero es rojo, la
  imagen debe aguantar un velo de ese color encima sin ensuciarse: mejor tomas
  con contraste alto y poco color propio.
- **Magno** pide luz natural y planos amplios: instalaciones, villas, mar.
  Nada de fotos de banco de imágenes con gente sonriendo a cámara.

## Peso

Exporta en **WebP** si puedes, o JPG al 80 %. Ninguna imagen debería pasar de
**300 KB**; los heroes, de 500 KB.

## Derechos

No uses fotos de jugadores sin autorización de imagen, ni de villas sin
permiso del propietario o de la agencia que las comercializa.
