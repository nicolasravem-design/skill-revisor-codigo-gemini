# Paso 3 — Video corto con Google Flow

**Herramienta:** Google Flow (flow.google.com), agente de Flow + modelo de video **Omni 1.1 Flash**
**Resultado:** [`entregables/video-revisar-codigo.mp4`](../entregables/video-revisar-codigo.mp4) — 24 s, 1280 × 720, 24 fps, con audio (voz en off)
**Versión web (comprimida):** `landing-page/assets/video.mp4` (1.7 MB)

## Guion (3 escenas de 8 s)

| Escena | Imagen | Voz en off (español latino) |
|---|---|---|
| 1. Frustración | Estudiante de noche frente a su laptop; una línea del código marcada en rojo. | "¿Tu código falla y no sabes por qué?" |
| 2. La revisión | Primer plano de la pantalla: se pega el código y aparece una tabla con etiquetas rojo/naranja/amarillo/verde. | "Nuestra Skill revisar-codigo hace que Gemini lo revise como un ingeniero senior." |
| 3. Éxito | El estudiante sonríe; aparece un gran check verde; la cámara se aleja. | "Encuentra bugs y fallas de seguridad, y te enseña a corregirlos." |

## Proceso

1. Creamos un **proyecto nuevo** en Flow (al ser la primera vez, Flow mostró su aviso de privacidad; las casillas opcionales de correos de marketing e investigación se dejaron **sin marcar**).
2. Configuración por defecto del agente: video 16:9, 1 resultado por generación, **confirmar antes de gastar créditos**.
3. Le escribimos al agente de Flow el guion completo (prompt abajo).
4. **Primer intento fallido:** las 3 generaciones devolvieron *"No se pudo generar el video"*. El agente rehízo el guion como *storyboard* (personaje "Mateo").
5. **Segundo intento:** confirmamos la generación (3 videos por **36 créditos**). Por alta demanda quedaron en cola unos minutos y luego se generaron los 3 clips de 8 s.
6. En **Escenas** creamos una escena nueva, agregamos los 3 clips en orden en la línea de tiempo y la nombramos *revisar-codigo - video explicativo*.
7. **Descargamos** la escena (botón "Descargar escena") → MP4 de 24 s.
8. Con `ffmpeg` hicimos una copia comprimida para la web (`-crf 28`, de 23 MB a 1.7 MB) y extrajimos un fotograma del segundo 19 como portada.

## Prompt utilizado

> Quiero un video corto explicativo (16:9, estilo cinematográfico moderno, tonos azul oscuro y verde) para presentar una Skill de Gemini llamada revisar-codigo, creada por un estudiante de Ingeniería Informática. Hazlo en 3 escenas de 8 segundos, cada una con voz en off en español latino (voz joven y clara), sin subtítulos y sin texto legible en pantalla. Escena 1: […] Voz en off: '¿Tu código falla y no sabes por qué?'. Escena 2: […] Voz en off: 'Nuestra Skill revisar-codigo hace que Gemini lo revise como un ingeniero senior.'. Escena 3: […] Voz en off: 'Encuentra bugs y fallas de seguridad, y te enseña a corregirlos.'. Genera las 3 escenas como videos.

Pedimos "sin texto legible en pantalla" porque los modelos de video suelen escribir texto con errores.

## Verificación

- `ffmpeg` confirma: duración 24.0 s, video H.264 1280×720 y pista de audio AAC estéreo (volumen medio −20 dB, o sea que sí hay sonido).
- **Observación:** la interfaz que aparece en la pantalla de la escena 2 es **inventada por el modelo** (no es la interfaz real de Gemini) y uno de sus íconos se parece al logo de otra empresa. Lo dejamos documentado como limitación de los videos generados con IA.

Capturas: `capturas/08-flow-agente-confirmacion-creditos.jpg`, `capturas/09-flow-tres-escenas-generadas.jpg`, `capturas/10-flow-escena-unida-24s.jpg`.
