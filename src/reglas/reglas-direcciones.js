
  const reglasDirecciones = [
    // Validación de longitud
   {
      regla: "Longitud entre 20 y 60 caracteres",
      fn: (direccion) => direccion.length >= 20 && direccion.length <= 60,
    },

    
    {  // Verifica si contiene al menos un número
      regla: "Debe contener al menos un dígito numérico",
      fn: (direccion) => {
      const numeros = ["0","1","2", "3", "4","5", "6", "7", "8", "9" ];
      return numeros.some((caracter) => direccion.includes(caracter));
    },

  },
  {
  // Verifica si contiene caracteres prohibidos
      regla: "No debe contener caracteres prohibidos",
      fn: (direccion) => {
      const simbolosProhibidos = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+'];
      return (!simbolosProhibidos.some((caracter) => direccion.includes(caracter)));

    }
  },
  {
      // Verifica si contiene alguna palabra requerida
      regla:"No contiene palabras requeridas.",        
      fn: (direccion) => {
      const palabrasRequeridas = ['Calle', 'Avenida', 'Bulevar', 'Pasaje'];
      return (palabrasRequeridas.some(palabra => direccion.includes(palabra)));
  }
  },

  {
  // Verifica si hay abreviaturas prohibidas
      regla:"Contiene abreviaturas no permitidas.",
      fn: (direccion) => {
      const sinAbreviaturas = ['Av.'];
      return (!sinAbreviaturas.some(abreviatura => direccion.includes(abreviatura)));
  }
},

{
    // Verifica que cada palabra comience con mayúscula
      regla:"Cada palabra debe iniciar con mayúscula.",
      fn: (direccion) => {
      const palabras = direccion.split(' ');
      return (!palabras.some(p => p[0] !== p[0]?.toUpperCase()));
  }
}, 

  {
  // Verifica si el código postal está al final y es válido
      regla:"Código postal no al final.",
      fn: (direccion) => {
      const partes = direccion.trim().split(' ');
      const ultima = partes[partes.length - 1];
      const esNumero = !isNaN(ultima) && Number.isInteger(Number(ultima));
      const largoValido = ultima.length >= 4 && ultima.length <= 6;
      return esNumero && largoValido;
    }
}

]

  // Función principal de validación
      function validarDireccion(direccion) {
      return reglasDirecciones
      .filter(regla => !regla.fn(direccion))
      .map(regla => regla.regla);
}

module.exports = validarDireccion;








