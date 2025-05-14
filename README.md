Sistema de Validación de Direcciones para Envíos
Contexto
Trabajas en el área de logística de una empresa de comercio electrónico y debes implementar un sistema para validar direcciones de envío según nuevos estándares de calidad.

Objetivo
Cree un punto final que identifique direcciones que cumplan TODAS las reglas de validación para envíos prioritarios (las cuales pueden cambiar periódicamente).

Reglas de Validación de Direcciones (actuales)
Longitud: La dirección debe tener entre 20 y 60 caracteres.

Formato: Debe incluir un número de puerta o apartamento.

Caracteres prohibidos: No puede contener símbolos como ! @ # $ % ^ & * ( ) _ +.

Palabras requeridas: Debe incluir al menos una de: Calle, Avenida, Bulevar, Pasaje.

Consistencia: El código postal (si existe) debe estar al final de la dirección.

Sin abreviaturas: No permite abreviaturas como "Av." (debe ser "Avenida").

Mayúsculas: La primera letra de cada palabra debe ser mayúscula.

Requisitos
El endpoint se debe llamar /direcciones-validas

Debe devolver solo los clientes cuyas direcciones cumplen TODAS las reglas.

Formato de respuesta (sin incluir id ni dirección):

Configuración Puerto configurable por variable de entorno (PORT).

Estructura de archivos

src/
├── data/
│   └── clientes.json          # Datos de clientes
├── reglas/
│   └── reglas-direcciones.js  # Reglas de validación
├── index.js                   # Servidor y endpoints
└── package.json
Bonus Implementar un endpoint adicional /direcciones-invalidas que liste los clientes que no cumplen al menos una regla, reutilizando la lógica de validación.
