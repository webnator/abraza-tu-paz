# Nuevas imágenes y prompts

Generadas con la herramienta integrada **Imagegen**. Los originales se conservan en `../research/generated-assets-v2/`; los prompts exactos y la procedencia acompañan a cada original en un archivo `.provenance.json`. La web consume las versiones WebP optimizadas.

| Activo utilizado | Original y prompt | Versión web |
| --- | --- | --- |
| Jardín con refugio distante | `jardin-refugio-v1.png` / `jardin-refugio-v1.provenance.json` | `public/images/jardin-refugio-v1.webp` |
| Refugio de escritorio con matcha y objetos | `refuge-objects-v2.png` / `refuge-objects-v2.provenance.json` | `public/images/refugio-objetos-v1.webp` |
| Cartel de madera transparente | `cartel-madera-v1.png` / `cartel-madera-v1.provenance.json` | `public/images/cartel-madera-v1.webp` |
| Refugio vertical para móvil | `refuge-mobile-v1.png` / `refuge-mobile-v1.provenance.json` | `public/images/refugio-mobile-v1.webp` |
| Primer plano vertical transparente | `refuge-mobile-foreground-v1.png` / `refuge-mobile-foreground-v1.provenance.json` | `public/images/refugio-mobile-foreground-v1.webp` |

## Criterios de los prompts

El jardín mantiene vegetación íntima, agua pequeña y luz natural; el sendero conduce a una puerta cálida en un edificio distante. El refugio conserva piedra, madera, mimbre y jardín abierto. La vista móvil reencuadra ese mismo lugar y muestra sus objetos principales. El cartel y los primeros planos tienen alpha real. Las fotografías de Gabriela son archivos suministrados, superpuestos como imágenes reales; no hay rostros generados.

Los fondos de escritorio son 1672×941; la vista móvil y su foreground son 863×1823. El cartel es 1448×1086. Se han conservado las resoluciones nativas sin ampliación artificial. Los primeros planos anteriores se reutilizan en escritorio.

El registro de rasters completos está en `media-manifest.json`. Los sidecars `.json` de cada raster permiten recuperar el prompt o su origen sin modificar los bytes de originales anteriores.
