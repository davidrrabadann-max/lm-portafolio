# UT05 · Inventario de Equipos de Red (Aula ASIR-104)

## Comparativa XML vs JSON para el inventario
- **XML + XSD (`inventario_red.xml` / `inventario_red.xsd`):** Garantiza integridad estricta de red mediante expresiones regulares (`xs:pattern` para IPv4 y MAC), fechas ISO (`xs:date`) y unicidad de identificadores (`xs:unique`). Resulta más verboso al repetir etiquetas de apertura y cierre.
- **JSON (`inventario_red.json`):** Ocupa menos espacio, soporta booleanos nativos (`"activo": true`) y se parsea directamente en lenguajes de automatización y paneles web sin necesidad de parsers DOM.

## Formato elegido para herramienta de monitorización
Para exportar el inventario a una herramienta de monitorización moderna (como Zabbix API, Prometheus HTTP SD, Grafana o NetBox) **usaría JSON**, porque las APIs REST de descubrimiento automático (*Service Discovery*) consumen payloads JSON directamente con menor latencia y sin sobrecarga de análisis sintáctico.
