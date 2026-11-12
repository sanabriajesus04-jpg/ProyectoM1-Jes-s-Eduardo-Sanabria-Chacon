# 🤖 Bitácora de Asistencia con Inteligencia Artificial

Este documento registra cómo se integró la Inteligencia Artificial (Chatgpt) como herramienta de apoyo técnico, aprendizaje y revisión durante el desarrollo del **Generador de Colores**.

---

## 🎯 Rol de la IA en el Proyecto
La IA no se utilizó para generar el proyecto completo desde cero, sino como un **mentor técnico y revisor**:
- **Fase inicial (HTML/CSS):** Desarrollada de forma autónoma en un archivo único aplicando los conocimientos adquiridos en clase.
- **Fase de escalabilidad (JavaScript y Documentación):** Se recurrió a la IA para resolver bloqueos específicos, comprender algoritmos de conversión de color y estructurar las buenas prácticas de entrega.

---

## 📊 Registro de Interacciones Clave

| Etapa | Problema o Necesidad | Apoyo Recibido por la IA | Validación y Aprendizaje Propio |
| :--- | :--- | :--- | :--- |
| **1. Conversión de Colores (JS)** | Ya manejaba dos formatos de color, pero necesitaba integrar y alternar entre **HSL, HEX y RGBA** sin romper la lógica previa. | Explicación de las fórmulas matemáticas para traducir valores HSL a HEX y RGBA de forma limpia. | Adapté las funciones a mi código existente, probando cada formato en el navegador para asegurar que los colores coincidieran exactamente. |
| **2. Contraste y Accesibilidad** | Garantizar que el texto sobre las tarjetas fuera legible sin importar si el color aleatorio era muy claro u oscuro. | Sugerencia de cálculo de luminosidad relativa y uso de atributos `aria-live` y `:focus-visible`. | Implementé el cambio dinámico de color de texto y verifiqué la navegación usando únicamente el teclado. |
| **3. Estructura y Documentación** | Organizar el repositorio para una entrega profesional (`README.md`, índice, instalación local y commits semánticos). | Revisión de estructura Markdown, corrección de enlaces internos (`#instalacion`) y creación de esta bitácora. | Organicé las carpetas del proyecto, limpié directorios innecesarios y redacté los apuntes técnicos de cada fase. |

---

## 💡 Reflexión Final sobre el Uso de IA
* **Mayor aprendizaje:** Entender cómo escalar un código funcional (pasar de un solo archivo y dos formatos de color a una aplicación modular y accesible) apoyándome en explicaciones paso a paso en lugar de depender de soluciones automáticas.
* **Criterio técnico:** Cada sugerencia recibida fue analizada, modificada y probada manualmente antes de integrarse al repositorio final.