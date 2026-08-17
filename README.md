# Web SCM Sports Agency · Magno Marbella

Sitio web estático de las dos marcas del grupo. Una portada común reparte a
dos mundos con identidad visual propia: **SCM** (agencia de representación de
futbolistas, oscura y deportiva) y **Magno** (concierge privado en Marbella,
marfil y oro).

Sin build, sin dependencias, sin framework. Son HTML, CSS y JavaScript
planos: se abren con doble clic y se publican copiando la carpeta.

---

## Cómo verla en local

```bash
python3 -m http.server 8000
```

Y abrir <http://localhost:8000>. También vale abrir `index.html` directamente
en el navegador, aunque con el servidor las rutas se comportan igual que en
producción.

## Estructura

```
index.html            Portada del grupo — pantalla partida entre las dos marcas
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

assets/img/           Imágenes — ver assets/img/README.md
```

---

## Antes de publicar

Estos puntos están pendientes porque dependen de datos reales que la web no
puede inventar. Van ordenados por urgencia.

### 1. Cifras de la sección de estadísticas (SCM)

En `scm/index.html`, la sección `<!-- cifras -->` tiene cuatro valores
**provisionales**: 24 jugadores, 60 operaciones, 9 ligas y 12 años. Son
marcadores de posición para que el diseño se vea completo. **Hay que
sustituirlos por las cifras reales o eliminar la sección**: publicar datos
inventados sobre la trayectoria de la agencia es un problema, no un detalle.

Se cambian en el atributo `data-count` de cada bloque.

### 2. Teléfonos y correo de Magno

Los teléfonos son `+34 000 000 000` en las dos páginas, marcados con un
comentario HTML. El correo de Magno apunta de momento a
`s.carrillo@scmsportsagency.com`; si la marca tiene dirección propia, hay que
cambiarla en dos sitios de `magno/index.html`: el enlace `mailto:` visible y
el atributo `data-mailto-form` del formulario.

### 3. Jugadores reales

La rejilla de `scm/index.html` lleva cuatro tarjetas con "Nombre Apellido".
Sustituir por la cartera real —con autorización de imagen de cada jugador— o
retirar la sección si de momento no interesa hacerla pública.

### 4. Fotografías

Todo funciona sin fotos: donde va una imagen se pinta un bloque de color. Para
poner las reales se descomentan las líneas de `assets/css/photos.css`; no hay
que tocar el HTML. El listado de qué hace falta, con tamaños, está en
`assets/img/README.md`.

### 5. Textos legales

`legal.html` y `privacidad.html` son **plantillas con la estructura correcta**
(LSSI-CE y RGPD) pero con los datos identificativos entre corchetes. Hay que
rellenarlos y pasarlos por asesoría jurídica. Los dos documentos llevan un
recuadro de aviso visible que debe borrarse cuando estén revisados: mientras
esté ahí, es señal de que no están listos.

### 6. Testimonios

La cita de `magno/index.html` es un ejemplo. Sustituir por un testimonio real
y autorizado, o quitar la sección.

---

## Cómo se editan los textos

Todo el texto visible vive en los diccionarios `assets/js/i18n-*.js`, en
español e inglés. El HTML solo lleva la versión por defecto, que se sustituye
al cargar la página.

Para cambiar una frase, se busca su clave en el diccionario y se edita en los
dos idiomas:

```js
'hero.lead': 'Somos la agencia que gestiona…',   // en el bloque es
'hero.lead': 'We manage the careers of…',        // en el bloque en
```

El idioma elegido se guarda en el navegador y se mantiene al saltar entre las
tres páginas. Si el visitante llega con el navegador en inglés, la web arranca
en inglés sola.

Para marcar texto nuevo como traducible basta con añadir el atributo:

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

Cuando se quiera recibir los envíos por email de verdad, la vía más rápida es
un servicio de formularios (Formspree, Web3Forms, Netlify Forms). Basta con:

1. Dar de alta el formulario en el servicio y copiar la URL que dan.
2. En el `<form>`, cambiar `data-mailto-form="…"` por
   `action="URL_DEL_SERVICIO" method="POST"`.

El manejador de `site.js` solo actúa sobre formularios con
`data-mailto-form`, así que al quitar ese atributo el envío pasa a ser normal
sin tocar el JavaScript.

---

## Publicar

### GitHub Pages

En **Settings → Pages**, origen `Deploy from a branch`, rama `main`, carpeta
`/ (root)`. El fichero `.nojekyll` ya está puesto para que GitHub no procese
la carpeta `assets`.

### Netlify o Vercel

Conectar el repositorio y dejar el comando de build vacío. El directorio de
publicación es la raíz (`.`). No hay nada que compilar.

### Dominios

La estructura está pensada para un dominio con dos rutas
(`dominio.com/scm/` y `dominio.com/magno/`). Si cada marca acaba teniendo
dominio propio, se puede apuntar cada uno a su carpeta desde la
configuración del hosting sin tocar el código; los enlaces entre marcas son
relativos y habría que revisarlos.

---

## Detalles técnicos

- **Sin cookies.** Solo `localStorage` para recordar el idioma. Por eso la
  web no necesita banner de consentimiento — si se añade analítica, sí.
- **Accesibilidad.** Enlace de salto al contenido, foco visible, `aria-label`
  en los controles y respeto a `prefers-reduced-motion`: quien tenga las
  animaciones desactivadas en su sistema ve la web sin movimiento.
- **Tipografías desde Google Fonts.** Si se prefiere no depender de Google
  (y evitar la mención en la política de privacidad), se descargan las
  fuentes a `assets/fonts/` y se sustituyen los `<link>` por un `@font-face`.
- **Navegadores.** Se usa `:has()` para el efecto de la portada partida; en
  navegadores antiguos las dos mitades simplemente no se ensanchan al pasar
  el ratón, que es una degradación aceptable.
