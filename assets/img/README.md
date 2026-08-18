# Imágenes

La web funciona sin ninguna fotografía: donde va una imagen se pinta un
degradado de marca con su icono, y donde va un escudo se ve el monograma del
club. Todo lo que sigue mejora el resultado, pero nada bloquea la publicación.

Las fotos se enchufan **descomentando la línea que toque en
`assets/css/photos.css`**. No hay que tocar el HTML.

## Cómo elegir las fotos

- **Las cabeceras llevan texto encima.** Escoged fotos con una zona tranquila
  a la izquierda, que es donde cae el titular.
- **SCM** pide fotografía de contraste alto; encima va siempre un velo oscuro.
- **Magno** pide luz natural y planos amplios: instalaciones, villas, mar.
  Nada de banco de imágenes con gente sonriendo a cámara.
- **Los retratos del equipo** deben tener el mismo encuadre en los seis. Una
  rejilla con recortes distintos se nota mucho.
- Exportad en **WebP** si podéis, o JPG al 80 %. Ninguna imagen debería pasar
  de **300 KB**; las de portada, de 500 KB.

---

## SCM Sports Agency

### La portada

Tres fotos que se relevan solas cada ocho segundos, a pantalla completa.

| Fichero | Tamaño | Estado |
|---|---|---|
| `hero-scm-1.jpg` | 1920×1080 | Llegada con la bufanda, en el exterior |
| `hero-scm-2.jpg` | 1920×1080 | Llegada con el equipaje, en la terminal |
| `hero-scm-3.jpg` | 1920×1080 | Presentación de Orel Mangala con el Getafe |

Formato **horizontal**. Con **aire en la mitad izquierda** y **el jugador a la
derecha**: en móvil la pantalla es mucho más estrecha y el encuadre está
desplazado al 68 % de ancho para no dejarlo fuera. Que salga **solo el
jugador**.

Las fotos con grafismo incrustado, tipo escudos de trayectoria o cifras de
carrera, no funcionan de fondo: llevan su propia tipografía y chocan con el
titular. Esas van mejor en Actualidad, donde el texto queda debajo.

Para cambiar una basta con sustituir el fichero conservando el nombre. Para
añadir una cuarta se copia una diapositiva en `scm/index.html` y se añade
`--photo-hero4` en `photos.css`.

Lo que se puede ajustar:

- **La velocidad**, en `data-interval` del bloque `hero__portraits`, en
  milisegundos. Ahora está en `8000`.
- **El nombre y el club**, en `data-name` y `data-club` de cada diapositiva.
  La foto que los deja vacíos no muestra crédito.
- **El encuadre general**, en `photos.css`: `--photo-hero-position` para
  escritorio y `--photo-hero-position-mobile` para móvil.
- **El encuadre de una foto suelta**: se le añade su propio `--photo-size` y
  `--photo-position` en el `style` de su diapositiva.

Hace falta autorización de imagen de cada jugador y, si aparece la equipación,
conviene comprobarlo también con el club.

### El resto de huecos

| Variable | Fichero sugerido | Tamaño | Dónde sale |
|---|---|---|---|
| `--photo-gate1..3` | `gate-*.jpg` | 1200×1500 | Los tres accesos de la portada. Ahora reutilizan las fotos del hero |
| `--photo-story` | `historia-marbella.jpg` | 1600×900 | Bloque de historia en la portada. Encaja Marbella o la Costa del Sol |
| `--photo-story2` | `historia-magno.jpg` | 1600×900 | Cronología: Magno Marbella, villa o estancia |
| `--photo-story6` | `historia-internacional.jpg` | 1600×900 | Cronología: estadio, palco, reunión |
| `--photo-head-*` | `head-*.jpg` | 1920×1080 | Cabecera de cada página interior. Sin foto se pinta un degradado de marca, que funciona: no es obligatorio rellenarlas |
| `--photo-serv1..7` | `serv-*.jpg` | 1200×900 | Uno por servicio, en el orden de la página |
| `--photo-team1..6` | `equipo-*.jpg` | 800×1000 | Retratos del equipo, vertical 4:5 |
| `--photo-news1..3` | `actualidad-*.jpg` | 1200×750 | Tarjetas de Actualidad. La tercera ya lleva el retrato con las cifras |

Qué pide cada servicio, por orden:

1. **Asesoramiento integral** · reunión, despacho, conversación
2. **Análisis de rendimiento** · vídeo, datos, pizarra táctica
3. **Apoyo psicológico** · sesión, concentración, vestuario
4. **Nutrición** · cocina, comida real, laboratorio
5. **Desarrollo deportivo** · entrenamiento individual, gimnasio
6. **Marca personal** · rodaje, cámara, sesión de fotos
7. **Inversiones y patrimonio** · firma, propiedad, oficina

---

## Escudos de clubes

Están en `assets/img/clubes/`, un fichero por club. Los que hay ahora son
**marcadores**: un círculo con el monograma. Para poner el escudo real basta
con sustituir el fichero conservando el nombre:

```
assets/img/clubes/real-madrid.svg   <- reemplazar por el escudo real
assets/img/clubes/barcelona.svg
...
```

Si el escudo es PNG en vez de SVG, hay que cambiar también la extensión en el
`src` de `scm/red.html`, que es donde salen: en el muro y en las dos cintas en
movimiento. Se pueden ir poniendo de uno en uno; los que falten siguen
mostrando el monograma.

Formato recomendado: SVG, o PNG de 200 × 200 con fondo transparente.

> **Aviso.** Los escudos son marcas registradas de cada club. Mostrarlos como
> referencia de una red de contactos es habitual en el sector, pero conviene
> que vuestra asesoría lo confirme, sobre todo si la web sugiere una relación
> comercial que el club no ha autorizado. La nota al pie de la sección ya
> aclara que los escudos pertenecen a sus clubes.

---

## Logotipos de las marcas

`logo-scm.png`, `logo-scm-light.png` y `logo-magno.png` están **reconstruidos
a partir de los PDF** de marca, recomponiendo imagen y máscara de
transparencia. Rondan los 500 px de ancho: llegan para la web, no para
imprimir. Si aparecen los originales en SVG o AI, se sustituyen sin más.

La versión clara conserva el naranja del ojo: se generó píxel a píxel en vez
de invertir el logo con un filtro, porque `invert()` convertía ese naranja en
cian.

---

## Magno Marbella

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
vídeo con un botón que abre el reel en Instagram. Hay que hacer dos cosas por
vídeo:

1. Poner la miniatura en `--photo-reel1` y siguientes, en `photos.css`.
2. Cambiar el `href` de la tarjeta en `magno/index.html` por la URL del reel.
