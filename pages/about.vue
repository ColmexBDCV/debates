<template>
  <div class="top-margin-page">
    <b-container>
      <b-row>
        <b-col>
          <div class="title">
            Sobre el Proyecto
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div
            style="
                background-image: url('/acercade.png');
                height: 400px;
                /* background-position: 60%; */
                background-size: cover;
              "
          />
        </b-col>
      </b-row>

      <b-row class="mt-5">
        <b-col>
          <p>
            La <a href="http://biblioteca.colmex.mx">Biblioteca Daniel Cosío Villegas</a> (BDCV) de&nbsp;<a
              href="http://www.colmex.mx/"
            >El Colegio de México</a>
            ha unido esfuerzos con el
            <a href="http://www-01.sil.org/mexico/">Instituto Lingüístico de Verano, A.C.</a>&nbsp;(ILV) en
            México para poner a disposición las cartillas de lectoescritura publicadas por el ILV México
            desde 1940 hasta 1980.&nbsp;
          </p>
          <p>
            La colección de cartillas impresas llegó a la BDCV a través de la donación de la Dra. Gloria
            Ruiz de Bravo
            Ahuja, profesora investigadora de El Colegio de México, quien ocupó también el cargo de
            directora del
            Instituto de Investigación e Integración Social del Estado de Oaxaca. Las cartillas que
            conforman esta
            colección sirvieron de base para la elaboración del segundo volumen de su obra:
            <a href="https://repositorio.colmex.mx/concern/books/9019s310g?locale=es">Los materiales
              didácticos para la enseñanza del español a los indígenas mexicanos.</a>
          </p>
          <p>
            En el 2016, la BDCV acordó con el Instituto Lingüístico de Verano en México, la donación de los
            archivos
            digitales de que disponían y así nació este proyecto que tiene como propósito difundir el
            trabajo realizado
            por el ILV, apoyar en el conocimiento de las lenguas indígenas mexicanas y contribuir con
            materiales
            didácticos para su enseñanza. Las cartillas fueron elaboradas para distintos niveles de
            aprendizaje por lo
            que incluyen: 1) Cuadros fonéticos, para el repaso y ejercicios, 2) narraciones breves que
            tienen continuidad
            de pensamiento, con el propósito de estimular al alumno a leer comprensivamente, 3) figuras
            asociadas con
            palabras y frases con el propósito de introducir nuevas letras y nuevas combinaciones de letras,
            4) Oraciones
            sin continuidad de pensamiento, para evaluar el grado de avance del alumno. Se incluyen, además,
            cuadernos de
            trabajo, manuales, vocabularios, cuentos y relatos. Además de los textos completos de las
            cartillas, el sitio
            integra un mapa en el cual es posible localizarlas por el lugar donde se habla la lengua a que
            se refiere la
            cartilla.
          </p>

          <p class="text-left title">
            Créditos:
          </p>

          <p class="text-left title">
            El Colegio de México
          </p>

          <p class="text-left">
            <strong>Micaela Chávez Villa</strong> - Directora de la Biblioteca
          </p>
          <p class="text-left">
            <strong>Noé Angeles, Manuel Diosdado, Claudia Escobar, Guadalupe Vega y Luz Vergara</strong> -
            Elaboración de
            metadatos
          </p>
          <p class="text-left">
            <strong>Arien Gonzalez</strong> - Preservacion Digital
          </p>
          <p class="text-left">
            <strong>Victor Cid</strong> - Bibliografo asignado al Centro de Estudios Históricos
          </p>
          <p class="text-left">
            <strong>Alberto Santiago Martínez</strong> - Diseño del sistema
          </p>
          <p class="text-left">
            <strong>Eime Javier Cisneros Brito</strong> - Desarrollo del sistema
          </p>
          <p class="text-left">
            <strong>Paola Vanesa Rosas</strong> - Redacción,&nbsp;revisión de datos y georeferencia
          </p>
          <p class="text-left">
            <strong>Miguel Alejandro Contreras Flores</strong> - Infraestructura tecnológica
          </p>

          <p class="text-left title">
            Instituto Lingüístico de Verano
          </p>

          <p class="text-left">
            <strong>Juanita Watters</strong> - Instituto Lingüístico de Verano, A.C.
          </p>
          <p class="text-left">
            <strong>Ana Ibel Santiago</strong> - Instituto Lingüístico de Verano, A.C.
          </p>
          <p class="text-left">
            <strong>Loren Hawthorne</strong> - Instituto Lingüístico de Verano, A.C.
          </p>
          <p class="text-left">
            <strong>Sue Regnier</strong> - Instituto Lingüístico de Verano, A.C.
          </p>
          <p class="text-left">
            <strong>Arisbe Aguilar</strong> - Instituto Lingüístico de Verano, A.C.
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'AboutPage'
}
</script>

<style scope>

.title{
  font-family: 'Playfair Display', serif;
  font-size: 2.5em;
  font-weight: lighter;
  color: var(--bs-collection);
}
</style>
