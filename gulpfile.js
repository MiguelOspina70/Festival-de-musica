// Importa funciones específicas de Gulp:
// - `src`: para leer archivos
// - `dest`: para escribir archivos
// - `watch`: para observar cambios en archivos
import { src, dest, watch } from 'gulp'

// Importa el plugin `gulp-sass`, que se usa para compilar archivos SCSS a CSS
import gulpSass from 'gulp-sass'

// Importa el compilador `dart-sass`, una versión oficial moderna de Sass
import * as dartSass from 'sass'

// Conecta el compilador `dartSass` con el plugin `gulp-sass`
const sass = gulpSass(dartSass)

// Define una función/tarea llamada `css` para compilar el archivo SCSS
export function css(done) {
    // Toma el archivo `app.scss` ubicado en `src/scss/`
    src('src/scss/app.scss')
        // Lo pasa por el compilador Sass para convertirlo a CSS
        .pipe(sass().on('error', sass.logError))
        // Escribe el resultado en la carpeta `build/css/`
        .pipe(dest('build/css'))

    // Indica que la tarea ha terminado
    done()
}

// Define una función/tarea llamada `dev` para el entorno de desarrollo
export function dev() {
    // Observa el archivo `app.scss`
    // Cada vez que detecta un cambio, ejecuta la función `css`
    // los asteriscos (`**`) indican que se observarán todos los archivos SCSS dentro de esa carpeta y sus subcarpetas
    watch('src/scss/**/*.scss', css)
}