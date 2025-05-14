function validarDireccion(direccion) {
  const errores = [];

  const palabrasRequeridas = ['Calle', 'Avenida', 'Bulevar', 'Pasaje'];
  const simbolosProhibidos = /[!@#$%^&*\(\)_+]/; 
  const sinAbreviaturas = ['Av.'];

  const sinEspacios = direccion.trim();

  if (sinEspacios.length < 20 || sinEspacios.length > 60) {
    errores.push("Longitud inválida.");
  }

  if (!/\d+/.test(sinEspacios)) {
    errores.push("Falta número de puerta o apartamento.");
  } //\d+ busca una secuencia de uno o más números.

  if (simbolosProhibidos.test(sinEspacios)) { //testea
    errores.push("Contiene caracteres prohibidos.");
  }

  if (!palabrasRequeridas.some(palabra => sinEspacios.includes(palabra))) {
    errores.push("No contiene palabras requeridas.");
  }

  const cpAlFinal = sinEspacios.match(/\b\d{4,6}\b/); // .match(...) busca coincidencias en la cadena sinEspacios
  if (cpAlFinal && !sinEspacios.endsWith(cpAlFinal[0])) {//\b = límite de palabra (es decir, no debe haber letras o números justo antes o después).
    errores.push("Código postal no al final.");//\d{4,6} = una secuencia de entre 4 y 6 dígitos.
  }

  if (sinAbreviaturas.some(abreviatura => sinEspacios.includes(abreviatura))) {
    errores.push("Contiene abreviaturas no permitidas.");
  }

  const palabras = sinEspacios.split(/\s+/); ///\s+/ significa uno o más espacios en blanco.
  if (palabras.some(p => p[0] !== p[0]?.toUpperCase())) { //toUppercase compara la primera letra original con su versión en mayúscula.
    errores.push("Cada palabra debe iniciar con mayúscula.");
  }

  return errores;
}

module.exports = { validarDireccion };







