# Web SCM Sports Agency · Magno Marbella

Sitio estático de las dos marcas del grupo. Una portada común reparte a dos
mundos con identidad propia:

- **SCM Sports Agency**, firma boutique de Marbella dedicada al asesoramiento,
  la gestión y el acompañamiento de futbolistas profesionales. Base oscura por
  capas, ámbar de marca como acento y una serif en cursiva que aparece solo en
  los momentos editoriales.
- **Magno Marbella**, concierge en exclusiva para futbolistas profesionales y
  atletas de alto rendimiento. Fondo hueso, serif y gris cálido.

Las dos atienden al mismo cliente: una le lleva la carrera, la otra todo lo que
ocurre cuando aterriza en la Costa del Sol.

Sin build, sin dependencias, sin framework. HTML, CSS y JavaScript planos.

---

## Cómo verla en local

```bash
python3 -m http.server 8000
```

Y abrir <http://localhost:8000>.

## Estructura

```
index.html              Portada del grupo, pantalla partida entre las dos marcas

scm/index.html          SCM · Portada
scm/agencia.html        SCM · La agencia (quiénes somos, valores, enfoque, método, equipo)
scm/historia.html       SCM · Nuestra historia
scm/grupo.html          SCM · SCM Group, el ecosistema de doce áreas
scm/servicios.html      SCM · Los siete servicios
scm/red.html            SCM · Red internacional y mercados
scm/actualidad.html     SCM · Fichajes, renovaciones y trabajo diario
scm/contacto.html       SCM · Contacto

magno/index.html        Magno Marbella
legal.html              Aviso legal (plantilla, ver abajo)
privacidad.html         Política de privacidad y cookies (plantilla)
404.html                Página de error

assets/css/
  fonts.css             Tipografías alojadas aquí, no en Google
  base.css              Reset, espaciados y utilidades comunes
  hub.css               Portada del grupo
  scm.css               Sistema de diseño de SCM
  magno.css             Marca lifestyle
  photos.css            Único sitio donde se enchufan las fotos
  doc.css               Páginas legales

assets/js/
  i18n.js               Motor de traducción (compartido)
  i18n-hub.js           Textos de la portada del grupo
  i18n-scm.js           Textos de SCM, compartidos por sus ocho páginas
  i18n-magno.js         Textos de Magno
  site.js               Cabecera, menú, revelados, contadores, carrusel,
                        parallax, filtros y formulario

assets/fonts/           Archivo, Inter y Cormorant Garamond en woff2
assets/img/
  logo-scm.png          Logotipo reconstruido del dossier (ver abajo)
  logo-magno.png        Sello reconstruido de la guía de servicios
  clubes/               Un fichero por escudo, sustituible uno a uno
```

---

## Arquitectura de SCM

SCM dejó de ser una sola página con scroll infinito. Ahora son **ocho páginas
independientes**, cada una con su URL, su título y su descripción, lo que
además mejora el posicionamiento: Google indexa "agencia de futbolistas
Marbella" y "servicios" por separado en vez de todo en un mismo documento.

La **portada** presenta la compañía y reparte al resto: cifras, tres accesos
grandes, el arranque de la historia, la red, la alianza con Magno y la
actualidad. No lo cuenta todo, invita a entrar.

El sitio es HTML plano, sin plantillas, así que **la cabecera y el pie están
repetidos en las ocho páginas**. Si se cambia un enlace del menú hay que
cambiarlo en las ocho. Es el precio de no tener que compilar nada para publicar.

## Sistema de diseño

- **Color.** Seis planos de oscuridad en vez de un negro plano, más el hueso
  de las secciones claras. El acento es un **ámbar apagado** (`#c8823f` sobre
  oscuro, `#8a5623` sobre claro), no el rojo anterior.
- **Tipografía.** Archivo variable para titulares, aprovechando su eje de
  anchura, que es lo que la separa de cualquier grotesca de plantilla. Inter
  para el texto. Y **Cormorant Garamond en cursiva** solo en las frases que
  hablan de origen, relación y trato: la serif es el hilo de Marbella dentro de
  una marca deportiva.
- **Profundidad.** Grano de película sobre todo el documento, lavados de color
  radiales detrás de algunas secciones y degradados de marca donde todavía no
  hay fotografía. Nunca un bloque de color liso.
- **Movimiento.** Revelado al entrar en pantalla, contadores, máscara en los
  titulares, parallax corto solo en escritorio con ratón, cinta de escudos y
  hover sobre imagen. Todo con `transform` y `opacity`, y todo apagado con
  `prefers-reduced-motion`.
- **Sin fundido de salida entre páginas** a propósito: obligaría a retrasar
  cada clic unos cientos de milisegundos. La entrada sí se anima porque no
  cuesta nada.

## De dónde sale el contenido

Los servicios, los valores, el proceso y los datos del grupo provienen del
dossier de la agencia. La historia, la nueva estructura y el tono los
proporcionó la propiedad.

**Las tarifas del dossier de Magno no se publican.** La web habla de servicios
y remite a propuesta escrita.

---

## Pendiente antes de publicar

### 1. Los nombres de la sección Historia

En `scm/historia.html` aparecen tres nombres de futbolistas como referencia
del entorno en el que trabaja la agencia, con una nota debajo que aclara que no
implican representación, contrato ni vínculo comercial.

**Conviene que lo revise vuestra asesoría jurídica antes de publicar.** Citar
el nombre de un deportista profesional en una web comercial puede requerir su
autorización aunque la afirmación sea cierta y aunque no se sugiera relación
contractual. Los nombres están en un solo sitio del HTML, en el bloque
`<ul class="names">`, y se quitan o se cambian en un minuto.

### 2. Nombres de los jugadores de la portada

Dos de las tres fotos del hero salen **sin crédito** porque no sabemos quién es
el jugador ni en qué club firmaba. Se pone en `data-name` y `data-club` de su
diapositiva, en `scm/index.html`, y el crédito aparece solo.

### 3. Fotografías

Todo funciona sin fotos: donde va una imagen se pinta un degradado de marca con
su icono. Para poner las reales se descomentan las líneas de
`assets/css/photos.css`; no hay que tocar el HTML. El listado con tamaños y
sugerencias está en `assets/img/README.md`.

### 4. Fotos y nombres del equipo

La sección Equipo de `scm/agencia.html` tiene seis fichas con "Nombre Apellido"
y una silueta. Los nombres se ponen en el HTML y las fotos en `photos.css`. Si
el equipo no son seis, se añaden o se quitan bloques `.member`.

### 5. Publicaciones de Actualidad

`scm/actualidad.html` lleva cuatro tarjetas que describen qué se publica en
cada categoría. Sirven tal cual mientras no haya publicaciones reales.

Cada tarjeta es un bloque `<a class="post">` con un comentario encima que
explica qué cambiar: la categoría (`data-category` vale `transfers`, `renewals`
o `daily`), el titular, el texto, el enlace y la variable de la foto. Para
añadir una publicación se copia el bloque entero.

### 6. Escudos de los clubes

Los veinte escudos de `assets/img/clubes/` son marcadores con el monograma del
club. Se sustituye el fichero conservando el nombre y aparecen solos, en el
muro y en las dos cintas. Ver `assets/img/README.md`, que incluye el aviso
sobre uso de marcas ajenas.

### 7. Cifras que conviene confirmar

La portada publica **10 agentes**, **15 scouts**, **8 mercados con presencia
directa** y **12 años de experiencia**. Los dos primeros venían del dossier; el
tercero sale de contar los mercados que el propio dossier enumera.

El cuarto merece una decisión vuestra: el dossier hablaba de **15 años**, pero
la historia que ahora cuenta la web arranca **en 2014**, y de 2014 a hoy van
12. Se ha puesto 12 para que las dos cifras de la web no se contradigan. Si el
recorrido real es de 15 años porque empezó antes, se cambia el `data-count` de
la cuarta cifra en `scm/index.html` y la fecha de la historia.

Son las cifras que un director deportivo va a mirar primero.

### 8. Redes sociales

Los enlaces apuntan a `instagram.com/scmsportsagency`,
`youtube.com/@scmsportsagency` y `linkedin.com/company/scm-sports-agency`.
Conviene comprobarlos y quitar los que no existan todavía.

### 9. Logotipos en vectorial

Los logos actuales se **reconstruyeron a partir de los PDF** de marca. Son PNG
de unos 500 px de ancho, suficientes para la web actual pero no para crecer ni
para imprimir. Si aparecen los originales en SVG, AI o EPS, se sustituyen
`assets/img/logo-scm.png` y `logo-scm-light.png` y se gana nitidez en pantallas
de alta densidad.

### 10. Textos legales

`legal.html` y `privacidad.html` son **plantillas con la estructura correcta**
(LSSI-CE y RGPD). Faltan la denominación social, el NIF y los datos
registrales. Los dos muestran un recuadro de aviso que debe borrarse cuando
estén revisados por asesoría jurídica: mientras siga ahí, es señal de que no
están listos.

Nota: al alojar las tipografías en el propio servidor, la web ya **no hace
ninguna petición a Google**, así que la política de privacidad no tiene que
mencionarlo.

---

## Cómo se editan los textos

Todo el texto visible vive en los diccionarios `assets/js/i18n-*.js`, en
español e inglés. El HTML lleva la versión por defecto, que se sustituye al
cargar la página. Las ocho páginas de SCM comparten `i18n-scm.js`: se edita una
frase y cambia en todas.

```js
'hero.lead': 'Asesoramiento, gestión y…',    // en el bloque es
'hero.lead': 'Advice, management and…',      // en el bloque en
```

El idioma elegido se guarda en el navegador y se mantiene al saltar entre
páginas. Si el visitante llega con el navegador en inglés, la web arranca en
inglés sola.

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
2. En el `<form>` de `scm/contacto.html`, cambiar `data-mailto-form="…"` por
   `action="URL_DEL_SERVICIO" method="POST"`.

El manejador de `site.js` solo actúa sobre formularios con `data-mailto-form`,
así que al quitar ese atributo el envío pasa a ser normal sin tocar el
JavaScript.

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

La estructura está pensada para un dominio con dos rutas (`dominio.com/scm/` y
`dominio.com/magno/`). Recordad cambiar `example.com` por el dominio definitivo
en `sitemap.xml`, `robots.txt` y las etiquetas `canonical` de cada página.

---

## Detalles técnicos

- **Sin cookies y sin terceros.** Solo `localStorage` para recordar el idioma.
  Las tipografías se sirven desde el propio dominio, así que no hay ninguna
  petición externa y no hace falta banner de consentimiento. Si se añade
  analítica, sí.
- **Accesibilidad.** Enlace de salto, foco visible, `aria-label` en los
  controles, `aria-current` en la página activa y respeto a
  `prefers-reduced-motion`. Todos los textos de SCM pasan el contraste AA;
  el mínimo medido es 5,46:1.
- **Rendimiento.** Sin dependencias, sin framework y sin fundido de salida
  entre páginas. Las animaciones usan solo `transform` y `opacity`, y el
  parallax recalcula una vez por fotograma con `requestAnimationFrame`.
- **Comprobado.** En cada cambio se pasa una auditoría automática de las doce
  páginas en escritorio, tablet y móvil: errores de consola, recursos rotos,
  desbordamiento horizontal, imágenes deformadas, enlaces sin destino, enlaces
  internos rotos, cobertura de traducciones y contraste.
- **Apilamiento.** Los heroes llevan `isolation: isolate` porque sus capas de
  fondo van con `z-index` negativo; sin ese aislamiento se pintarían por detrás
  del propio fondo de la sección.
- **Sin rayas en la copia.** Los textos evitan el guion largo a propósito, y
  los puntos de las listas son rombos, no guiones.
- **El sello INIMITABLE** del dossier encabeza cada bloque principal, con la
  barra ámbar delante y el nombre de la sección debajo.
- **El logotipo de Magno viene ya en blanco.** No hay que invertirlo sobre
  fondo oscuro: invertirlo lo pinta de negro y desaparece. En la portada del
  grupo y en la cabecera de Magno, donde el fondo es hueso, sí se invierte.
