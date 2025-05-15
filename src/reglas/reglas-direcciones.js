function validarDireccion(direccion) {
  const errores = [];

  const palabrasRequeridas = ['Calle', 'Avenida', 'Bulevar', 'Pasaje'];
  const simbolosProhibidos = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'];
  const sinAbreviaturas = ['Av.'];
  const sinEspacios = direccion.trim();

  // Validación de longitud
  if (sinEspacios.length < 20 || sinEspacios.length > 60) {
    errores.push("Longitud inválida.");
  }

  // Verifica si contiene al menos un número
  function contieneNumero(texto) {
    for (let i = 0; i < texto.length; i++) {
      const char = texto[i];
      if (char >= '0' && char <= '9') {
        return true;
      }
    }
    return false;
  }

  if (!contieneNumero(sinEspacios)) {
    errores.push("Falta número de puerta o apartamento.");
  }

  // Verifica si contiene caracteres prohibidos
  for (let i = 0; i < simbolosProhibidos.length; i++) {
    if (sinEspacios.includes(simbolosProhibidos[i])) {
      errores.push("Contiene caracteres prohibidos.");
      break;
    }
  }

  // Verifica si contiene alguna palabra requerida
  if (!palabrasRequeridas.some(palabra => sinEspacios.includes(palabra))) {
    errores.push("No contiene palabras requeridas.");
  }

  // Verifica si el código postal está al final y es válido
  function codigoPostalAlFinal(texto) {
    const partes = texto.trim().split(' ');
    const ultima = partes[partes.length - 1];

    const esNumero = !isNaN(ultima) && Number.isInteger(Number(ultima));
    const largoValido = ultima.length >= 4 && ultima.length <= 6;

    return esNumero && largoValido;
  }

  if (!codigoPostalAlFinal(sinEspacios)) {
    errores.push("Código postal no al final.");
  }

  // Verifica si hay abreviaturas prohibidas
  if (sinAbreviaturas.some(abreviatura => sinEspacios.includes(abreviatura))) {
    errores.push("Contiene abreviaturas no permitidas.");
  }

  // Verifica que cada palabra comience con mayúscula
  const palabras = sinEspacios.split(' ');
  if (palabras.some(p => p[0] !== p[0]?.toUpperCase())) {
    errores.push("Cada palabra debe iniciar con mayúscula.");
  }

  return errores;
}

module.exports = { validarDireccion };








