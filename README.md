
# Duppla Countries

¡Bienvenido a Duppla Countries! Este proyecto es una galería interactiva de países, creada con React y pensada para demostrar mi uso de las herramientas solicitadas para ofrecer una navegabilidad entre paises.

## Características principales

- **Galería animada de países**: Navega por tarjetas de países con animaciones suaves y transiciones de página (slide izquierda/derecha).
- **Búsqueda y filtrado**: Filtra países por nombre, capital o región en tiempo real.
- **Detalles**: Cada país muestra información detallada con animación de aparición (fade-in).
- **Imágenes de banderas**: Las tarjetas usan la bandera como fondo, con overlays translúcidos para la información.
- **Paginación**: Barra de paginación fija, responsiva y ajustable automáticamente. Navegación con teclado (flechas izquierda/derecha).
- **Regreso rápido**: Desde la vista de detalles puedes volver con la tecla "Backspace".
- **Diseño responsivo**: Adaptado para móviles y escritorio, con animaciones y estilos que mejoran la experiencia en cualquier dispositivo.
- **Accesibilidad**: Navegación por teclado y botones accesibles.
- **Buenas prácticas**: Uso de hooks de React, separación de componentes, manejo eficiente de estado y efectos.
- **Tailwind CSS**: Utilizado para estilos rápidos, responsivos y modernos.
- **API REST**: Datos obtenidos en tiempo real desde [restcountries.com](https://restcountries.com).
- **Animaciones CSS personalizadas**: Para transiciones de página y aparición de detalles.
- **Gestión de dependencias**: Todo lo necesario está en `package.json`, listo para instalar con `npm install` en cualquier dispositivo.

## Decisiones técnicas destacadas

- **React Functional Components**: Todo el proyecto usa componentes funcionales y hooks para.
- **Separación de lógica y presentación**: Cada componente tiene responsabilidades claras (búsqueda, galería, detalles, etc).
- **Animaciones CSS**: Se crearon animaciones personalizadas para mejorar la experiencia visual.
- **Paginación y filtrado eficiente**: El filtrado y la paginación se hacen sobre los datos ya cargados, optimizando el rendimiento.
- **Accesibilidad y usabilidad**: Se pensó en la navegación por teclado y en la claridad visual de los elementos.
- **Responsive Design**: El layout y los componentes se adaptan a cualquier tamaño de pantalla.
- **Código limpio y comentado**: El código está estructurado y documentado para facilitar su mantenimiento y evolución.

## Guía paso a paso para compilar

1. **Instala Node.js**  
    Ve a [nodejs.org](https://nodejs.org/) y descarga la versión recomendada para tu sistema operativo (Windows, Mac o Linux). Instálalo siguiendo las instrucciones.

2. **Descarga el proyecto**  
    Haz clic en el botón "Code" de este repositorio y selecciona "Download ZIP". Extrae el archivo ZIP en una carpeta de tu computadora.

3. **Abre la carpeta del proyecto**  
    Busca la carpeta extraída (por ejemplo, `duppla-countries`) y ábrela.

4. **Abre una terminal o línea de comandos**  
    - En Windows: Busca "Símbolo del sistema" o "Terminal" en el menú de inicio.
    - En Mac: Abre "Terminal" desde Aplicaciones > Utilidades.
    - En Linux: Abre tu terminal habitual.

5. **Navega a la carpeta del proyecto**  
    Escribe el siguiente comando y presiona Enter (reemplaza la ruta si es necesario):

    ```bash
    cd ruta/del/proyecto
    ```

    Por ejemplo, si está en Descargas:

    ```bash
    cd Descargas/duppla-countries
    ```

6. **Instala las dependencias**  
    Escribe y ejecuta:

    ```bash
    npm install
    ```

    Esto descargará todo lo necesario para que funcione la app.

7. **Inicia la aplicación**  
    Escribe y ejecuta:

    ```bash
    npm start
    ```

    Se abrirá una ventana en tu navegador con la galería de países.

¡Listo! Ya puedes explorar la aplicación. Si tienes dudas, busca tutoriales de "cómo usar Node.js y npm" en YouTube para ver ejemplos visuales.

## Atajos y tips

- Usa las flechas izquierda/derecha para navegar entre páginas en la galería.
- Presiona "Backspace" en la vista de detalles para regresar rápidamente.
- Filtra países por nombre, capital o región usando la barra de búsqueda.

## Herramientas usadas

- [restcountries.com](https://restcountries.com) por la API de datos.
- [Node.js](https://nodejs.org/en) Ambiente de ejecución
- [Tailwind CSS](https://tailwindcss.com/) Extension para facilitar el uso de los estilos.
- [React](https://react.dev/) libreria usada para la interfaz.
- [VSCode](https://code.visualstudio.com/) IDE usado.
- Inspiración y feedback de la comunidad Duppla.
- GPT (Usado para realizar algunas acciones visuales y acceder rapidamente a elementos que desconocia (Hooks, loadTime, unBound y Props))