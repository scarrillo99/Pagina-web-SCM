# Web SCM Sports Agency · Magno Marbella

Sitio web estático de las dos marcas del grupo. Una portada común reparte a
dos mundos con identidad propia:

- **SCM Sports Agency**, agencia 360º de futbolistas profesionales. Base
  oscura con la fotografía del jugador como protagonista y el rojo de marca
  como acento, más el sello *INIMITABLE* que encabeza cada sección.
- **Magno Marbella**, concierge en exclusiva para futbolistas profesionales
  y atletas de alto rendimiento. Fondo hueso, serif y gris cálido, siguiendo
  su guía de servicios.

Las dos marcas atienden al mismo cliente: una le lleva la carrera, la otra
todo lo que ocurre cuando aterriza en la Costa del Sol.

Sin build, sin dependencias, sin framework. HTML, CSS y JavaScript planos.

---

## Cómo verla en local

```bash
python3 -m http.server 8000
```

Y abrir <http://localhost:8000>.

## Estructura

```
index.html            Portada del grupo, pantalla partida entre las dos marcas
scm/index.html        SCM Sports Agency
magno/index.html      Magno Marbella
legal.html            Aviso legal (plantilla, ver abajo)
privacidad.html       Política de privacidad y cookies (plantilla)
404.html              Página de error

assets/css/
  base.css            Reset, espaciados y utilidades comunes
  hub.css             Portada del grupo
  scm.css             Marca deportiva
  magno.css           Marca lifestyle
  photos.css          Único sitio donde se enchufan las fotos
  doc.css             Páginas legales

assets/js/
  i18n.js             Motor de traducción (compartido)
  i18n-hub.js         Textos de la portada
  i18n-scm.js         Textos de SCM
  i18n-magno.js       Textos de Magno
  site.js             Menú, scroll, contadores y formulario

assets/img/
  logo-scm.png        Logotipo reconstruido del dossier (ver abajo)
  logo-magno.png      Sello reconstruido de la guía de servicios
  favicon*.svg        Iconos de pestaña
  clubes/             Un fichero por escudo, sustituible uno a uno
```

## Secciones de cada página

**SCM**: portada con cuatro retratos de jugador que se relevan, cifras del equipo, quiénes somos con
los seis valores en barras animadas, SCM Group con las doce
capacidades del grupo, historia en cronología, los siete servicios, nuestro
enfoque, el equipo con retratos, red de clubes con escudos, actualidad
enlazada a Instagram, enfoque internacional, el proceso de seis pasos, la
alianza con Magno y contacto.

En el contacto de SCM solo figura el correo. El teléfono sigue publicado en
Magno; si tampoco debe aparecer allí, se quita el bloque `contact__channel`
del teléfono en `magno/index.html`.

**Magno**: portada, entrenamiento y rendimiento, vídeos de Instagram,
lifestyle, los cinco centros, en imágenes, cómo reservar y contacto.

**Portada del grupo**: pantalla partida entre las dos marcas y la sección que
explica qué comparten.

## De dónde sale el contenido

Todos los textos, cifras y servicios provienen de los dos dossieres de marca:

- `SCM SPORTS AGENCY.pdf`: quiénes somos, valores, los siete servicios, los
  cinco enfoques, player management, enfoque internacional, el proceso de seis
  pasos y la alianza con Magno.
- `Magno Marbella · Services & Pricing Guide.pdf`: los dos bloques de
  servicio, los cinco centros deportivos y las condiciones de reserva.

**Las tarifas del dossier de Magno no se publican.** La web habla de servicios
y remite a propuesta escrita. Si en algún momento se decide publicarlas, el
sitio para hacerlo es la sección `#centros` de `magno/index.html`.

---

## Pendiente antes de publicar

### 1. Las cuatro fotos del hero de SCM

La portada rota cuatro fotos de marketing de jugadores de la agencia, una cada
segundo. Ahora mismo son marcadores en carbón: se sustituyen los ficheros
`assets/img/hero-scm-1.jpg` a `hero-scm-4.jpg` conservando el nombre y
aparecen solas, sin tocar código. El nombre y el club de abajo a la derecha van
en `data-name` y `data-club` de cada diapositiva, en `scm/index.html`, y la
velocidad en `data-interval`, en milisegundos.

Hace falta autorización de imagen del jugador.

### 2. Escudos de los clubes

Los veinte escudos de `assets/img/clubes/` son marcadores con el monograma
del club. Se sustituye el fichero conservando el nombre y aparecen solos. Ver
`assets/img/README.md`, que incluye el aviso sobre uso de marcas ajenas.

### 3. Fotos y nombres del equipo

La sección Equipo tiene seis fichas con "Nombre Apellido" y una silueta. Hay
que poner los nombres reales en `scm/index.html` y las fotos en `photos.css`.
Si el equipo es mayor o menor de seis, se añaden o quitan bloques `.member`.

### 4. Fechas de la historia

Los años de la cronología son `20XX`. Hay que sustituirlos por las fechas
reales o borrar el `<span>` del año si preferís una cronología sin fechas.

### 5. Vídeos de Instagram de Magno

Cada tarjeta de la sección de vídeos apunta al perfil general. Hay que poner
la URL de cada reel en su `href` y la miniatura en `photos.css`.

### 6. Redes sociales

Los enlaces apuntan a `instagram.com/scmsportsagency`,
`youtube.com/@scmsportsagency`, `linkedin.com/company/scm-sports-agency` y sus
equivalentes de Magno, deducidos de los dossieres. Conviene comprobarlos y
quitar los que no existan todavía.

### 7. Logotipos en vectorial

Los logos que hay ahora se han **reconstruido a partir de los PDF**: se han
extraído la imagen y su máscara de transparencia y se han recompuesto. Son
PNG de unos 500 px de ancho, suficientes para la web actual pero no para
crecer ni para imprimir.

Si tenéis los originales en SVG, AI o EPS, sustituid
`assets/img/logo-scm.png` y `assets/img/logo-magno.png` y ganaréis nitidez en
pantallas de alta densidad. El CSS los invierte a blanco donde hace falta con
`filter: invert(1)`, así que un SVG monocromo funcionará igual.

### 8. Fotografías

Todo funciona sin fotos: donde va una imagen se pinta un bloque de color. Para
poner las reales se descomentan las líneas de `assets/css/photos.css`; no hay
que tocar el HTML. El listado con tamaños está en `assets/img/README.md`.

El hero de SCM son cuatro retratos verticales que rotan; el de Magno, una
fotografía a pantalla completa. Los dos llevan un velo oscuro encima.

### 9. Textos legales

`legal.html` y `privacidad.html` son **plantillas con la estructura correcta**
(LSSI-CE y RGPD). Ya llevan la dirección, el teléfono y el correo reales, pero
faltan la denominación social, el NIF y los datos registrales. Los dos
documentos muestran un recuadro de aviso que debe borrarse cuando estén
revisados por asesoría jurídica: mientras siga ahí, es señal de que no están
listos.

---

## Cómo se editan los textos

Todo el texto visible vive en los diccionarios `assets/js/i18n-*.js`, en
español e inglés. El HTML solo lleva la versión por defecto, que se sustituye
al cargar la página.

Para cambiar una frase, se busca su clave y se edita en los dos idiomas:

```js
'hero.lead': 'Asesoramos íntegramente a…',   // en el bloque es
'hero.lead': 'We advise professional…',      // en el bloque en
```

El idioma elegido se guarda en el navegador y se mantiene al saltar entre las
tres páginas. Si el visitante llega con el navegador en inglés, la web arranca
en inglés sola.

Para marcar texto nuevo como traducible:

```html
<p data-i18n="mi.clave">Texto por defecto</p>
<p data-i18n-html="mi.clave">Texto con <em>markup</em></p>
<input data-i18n-attr="placeholder:mi.clave" />
```

---

## El formulario de contacto

Ahora mismo **no hay servidor**: al enviar, el formulario abre el gestor de
correo del visitante con el mensaje ya redactado. Funciona, pero pierde
solicitudes de quien navega sin cliente de correo configurado.

Para recibir los envíos de verdad, lo más rápido es un servicio de formularios
(Formspree, Web3Forms, Netlify Forms):

1. Dar de alta el formulario y copiar la URL que dan.
2. En el `<form>`, cambiar `data-mailto-form="…"` por
   `action="URL_DEL_SERVICIO" method="POST"`.

El manejador de `site.js` solo actúa sobre formularios con
`data-mailto-form`, así que al quitar ese atributo el envío pasa a ser normal
sin tocar el JavaScript.

Los formularios de SCM van a `info@scmsportsagency.com` y los de Magno a
`magnomarbellaservices@gmail.com`.

---

## Publicar

### GitHub Pages

**Settings → Pages**, origen `Deploy from a branch`, rama `main`, carpeta
`/ (root)`. El fichero `.nojekyll` ya está puesto.

### Netlify o Vercel

Conectar el repositorio y dejar el comando de build vacío. Directorio de
publicación: la raíz (`.`).

### Dominios

La estructura está pensada para un dominio con dos rutas
(`dominio.com/scm/` y `dominio.com/magno/`). Si cada marca acaba con dominio
propio, se puede apuntar cada uno a su carpeta desde el hosting; los enlaces
entre marcas son relativos y habría que revisarlos.

Recordad cambiar `example.com` por el dominio definitivo en `sitemap.xml` y
`robots.txt`.

---

## Detalles técnicos

- **Sin cookies.** Solo `localStorage` para recordar el idioma. Por eso no
  hace falta banner de consentimiento; si se añade analítica, sí.
- **Accesibilidad.** Enlace de salto, foco visible, `aria-label` en los
  controles y respeto a `prefers-reduced-motion`. El contraste del selector de
  idioma está comprobado en las dos marcas y en los dos estados de scroll
  (mínimo 14,9:1).
- **Tipografías desde Google Fonts** (Archivo, Inter, Cormorant Garamond,
  Jost). Para no depender de Google, y quitar la mención de la política de
  privacidad, se descargan a `assets/fonts/` y se sustituyen los `<link>` por
  `@font-face`.
- **Navegadores.** Se usa `:has()` para el efecto de la portada partida; donde
  no esté soportado, las dos mitades simplemente no se ensanchan al pasar el
  ratón.
- **Apilamiento.** Los heroes llevan `isolation: isolate` porque sus capas de
  fondo van con `z-index` negativo; sin ese aislamiento se pintarían por
  detrás del propio fondo de la sección y no se verían.
- **Secciones claras sobre base oscura.** En SCM, `.section--light` no
  duplica componentes: solo redefine los tokens de color, así que las mismas
  clases funcionan sobre fondo claro y oscuro.
- **Sin rayas en la copia.** Los textos evitan el guion largo a propósito.
