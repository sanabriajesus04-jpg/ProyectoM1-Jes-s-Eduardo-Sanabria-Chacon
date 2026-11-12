# ⚙️ Conceptos Básicos y Evolución en JavaScript

Esta carpeta documenta el proceso de aprendizaje, refactorización y escalabilidad de la lógica de programación aplicada en el proyecto, especialmente en el manejo de espacios de color.

## 📈 Proceso de Desarrollo en JavaScript

### 1. La Fase Inicial (Versión Base)
* Al principio, la lógica se construyó manejando únicamente **dos formatos de color** básicos. 
* Se implementaron funciones simples para generar valores aleatorios y mostrarlos en pantalla de manera estática dentro de un solo archivo de trabajo.

### 2. La Fase de Escalabilidad y Refactorización
* **Ampliación de formatos:** A medida que fui comprendiendo mejor la manipulación del DOM y las matemáticas detrás de los modelos de color, modifiqué la estructura inicial para soportar y alternar dinámicamente entre **HEX, RGBA y HSL**.
* **Funciones de Conversión:** Creación de algoritmos propios para traducir los valores matemáticos de HSL hacia códigos HEX y RGBA legibles por el navegador.
* **Interactividad y Estado:** 
  - Implementación del **sistema de bloqueo** (para evitar que ciertos colores cambien al generar una nueva paleta).
  - Integración de la **Clipboard API** (`navigator.clipboard.writeText`) para copiar los códigos de color al hacer clic con retroalimentación visual inmediata.
  - Cálculo dinámico de contraste (luminosidad) para cambiar automáticamente el color del texto de la tarjeta entre blanco y negro según el fondo.

[volver](../README.md)