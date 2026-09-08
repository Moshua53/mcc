# Taller: Arquitectura e Implementación de un MVP — Mercado VIVA

> **Proyecto Académico / Estudiantil**  
> **Proceso Seleccionado:** Devolución de una compra digital en una tienda física (BORIS — *Buy Online, Return In-Store*).  
> **Stack Tecnológico:** 100% JavaScript / TypeScript (**React 18 + Next.js App Router + Node.js Serverless + Prisma ORM**).  
> **Estrategia de Despliegue:** Optimizado para despliegue en 1 clic en **Vercel** (Capa Gratuita / *Free Tier*).  

---

## 👥 Integrantes del Equipo

| Nombre y Apellido | Rol / Especialidad | Correo Institucional |
| :--- | :--- | :--- |
| *[Nombre Estudiante 1]* | Arquitectura & Backend en Node.js (Route Handlers, Prisma ORM, Reglas BORIS) | `estudiante1@universidad.edu.co` |
| *[Nombre Estudiante 2]* | Frontend en React (Next.js App Router, Tailwind CSS, Componentes UI) | `estudiante2@universidad.edu.co` |
| *[Nombre Estudiante 3]* | Base de Datos Relacional, Pruebas Automatizadas (Vitest) & Despliegue en Vercel | `estudiante3@universidad.edu.co` |

---

## 🌐 Enlaces del Proyecto

- **URL de la Aplicación en Producción (Vercel Free Tier):** [https://mercado-viva-mvp.vercel.app](https://mercado-viva-mvp.vercel.app)
- **Repositorio de Código Fuente (GitHub):** [https://github.com/Moshua53/mcc](https://github.com/Moshua53/mcc)
- **Archivo Editable Draw.io:** [`public/diagrams/mercado_viva_arquitectura.drawio`](public/diagrams/mercado_viva_arquitectura.drawio) (compatible con [diagrams.net](https://app.diagrams.net)).
- **Visualizadores Interactivos HTML (Archify):**
  - 📐 [Diagrama de Arquitectura del Sistema (React + Node.js)](public/diagrams/mercado_viva_arquitectura.html)
  - 🔄 [Diagrama de Flujo de Proceso Omnicanal (Workflow)](public/diagrams/mercado_viva_proceso.html)
  - ⏱️ [Diagrama de Secuencia de Llamadas API](public/diagrams/mercado_viva_secuencia.html)

---

## 1. Definición del Proceso Seleccionado

### 1.1. Problema Concreto que Resolverá
Los clientes de **Mercado VIVA** que adquieren productos por la tienda digital (web o app móvil) y desean tramitar una devolución enfrentan los siguientes inconvenientes:
1. El proceso habitual por correo o paquetería tarda entre **7 y 15 días hábiles** en recoger el producto, trasladarlo al centro de distribución y emitir el reembolso.
2. En las tiendas físicas, los cajeros carecen de una herramienta unificada para buscar la orden digital, comprobar las políticas comerciales e inspeccionar el artículo.
3. No existe sincronización inmediata entre la devolución en tienda y el inventario disponible en góndola para venta a otros clientes.

### 1.2. Usuarios y Actores Involucrados
- **Cliente Digital:** Comprador web/móvil que se acerca a una sucursal física con el producto y el código o QR de su compra.
- **Asesor / Cajero de Tienda Física:** Funcionario en mostrador o terminal POS que busca la orden, inspecciona físicamente el producto y valida la devolución en el sistema.
- **Backend Node.js (Servicios Serverless en Vercel):** Validador de reglas de negocio, cálculo de reembolsos, transacciones ACID y generación de vales.
- **Inventario Físico de la Sucursal:** Registro de existencias en góndola de la tienda receptora que recibe el incremento inmediato de stock.

### 1.3. Inicio y Finalización del Proceso
- **Inicio:** El cliente digital acude al mostrador de servicio al cliente de cualquier tienda física de Mercado VIVA y presenta el código de su orden (`ORD-XXXXX`) junto con los artículos a devolver.
- **Finalización:** El sistema emite un comprobante con un **Vale de Compra Digital** (`VALE-MV-XXXXX`) o confirma el reembolso al medio de pago original, cambia el estado del pedido a `DEVUELTO_PARCIAL` o `DEVUELTO_TOTAL` e incrementa automáticamente el inventario de la tienda receptora.

### 1.4. Reglas Principales del Negocio
1. **Estado de Entrega Requerido:** El pedido debe encontrarse en estado `ENTREGADO`. No se admiten pedidos en tránsito (`EN_CAMINO`) ni cancelados (`CANCELADO`).
2. **Ventana de 30 Días:** La solicitud debe realizarse dentro de los **30 días calendario** posteriores a la fecha de entrega (`deliveredAt`).
3. **Control de Duplicidad:** No se permite devolver cantidades mayores a las compradas ni procesar pedidos ya devueltos en su totalidad (`DEVUELTO_TOTAL`).
4. **Inspección de Estado:** Si el producto está en condición `ÓPTIMO`, se reingresa automáticamente al inventario físico de la tienda receptora (+1 en stock). Si está `DAÑADO`, se registra como merma y no suma inventario para la venta.
5. **Compensación Inmediata:** Se genera un vale digital (*Store Credit*) redimible al instante en cualquier punto de venta o compra digital.

### 1.5. Dos Restricciones del Caso
1. **Restricción de Presupuesto (Capas Gratuitas):** Toda la solución opera en la capa gratuita (*Free Tier*) de Vercel y servicios de bases de datos serverless (Neon / Supabase / SQLite) sin costo de licenciamiento.
2. **Restricción Tecnológica (Ecosistema JavaScript/TypeScript):** La solución está construida sin Python, empleando React 18, Next.js 14 y Node.js con tipado estricto en TypeScript.

### 1.6. Objetivo Medible del MVP
- **Disminución del tiempo de trámite:** Reducir el tiempo de gestión de una devolución de 15 días a **menos de 3 minutos en tienda**, con un **100% de trazabilidad transaccional** entre la compra digital y el inventario local.

---

## 2. Requisitos del MVP

### 2.1. Historias de Usuario (Requisitos Funcionales)

1. **HU01 — Búsqueda de Pedidos en Mostrador:**  
   *Como* asesor de tienda física, *quiero* ingresar el código de pedido o la cédula del cliente en el terminal, *para* visualizar los artículos comprados, fechas y montos en tiempo real.  
   *Criterio de Aceptación:* El sistema responde en menos de 500 ms mostrando los datos del pedido o un error 404 si no existe.

2. **HU02 — Diagnóstico Automático de Reglas BORIS:**  
   *Como* sistema omnicanal, *debo* validar automáticamente el estado `ENTREGADO`, la ventana máxima de 30 días y el saldo disponible de artículos, *para* bloquear devoluciones fuera de política comercial.  
   *Criterio de Aceptación:* Si un pedido tiene más de 30 días de entregado, el formulario queda deshabilitado y se muestra una alerta visual con los días transcurridos.

3. **HU03 — Selección e Inspección de Artículos:**  
   *Como* asesor de tienda, *quiero* marcar los artículos específicos que el cliente entrega, definir su cantidad e indicar el estado físico (`ÓPTIMO` o `DAÑADO`), *para* procesar devoluciones parciales o totales.  
   *Criterio de Aceptación:* No es posible ingresar una cantidad superior a la cantidad disponible por devolver.

4. **HU04 — Reincorporación Automática a Inventario:**  
   *Como* encargado de tienda, *quiero* que los artículos devueltos en estado óptimo se sumen inmediatamente al stock de mi sucursal, *para* habilitar su venta en góndola sin demoras.  
   *Criterio de Aceptación:* La tabla de inventarios de la tienda receptora refleja el incremento exacto tras confirmar la transacción.

5. **HU05 — Emisión Inmediata de Vale de Compra:**  
   *Como* cliente, *quiero* recibir un vale de compra digital con código único (`VALE-MV-XXXXX`) y comprobante imprimible, *para* utilizar mi dinero inmediatamente en el supermercado.  
   *Criterio de Aceptación:* El sistema genera un código alfanumérico no repetible y muestra un modal con el desglose y botón de impresión.

### 2.2. Requisitos No Funcionales (RNF)

1. **Seguridad (RNF01):** Validación estricta de esquemas DTO con **Zod** en todos los endpoints de la API y cabeceras seguras configuradas.
2. **Rendimiento (RNF02):** Ejecución serverless de baja latencia desplegada en la red Edge de Vercel con tiempos de respuesta inferiores a 500 ms.
3. **Mantenibilidad y Portabilidad (RNF03):** Código modular en TypeScript estructurado en capas (Componentes React, Route Handlers, Servicios de Dominio y Prisma ORM agnóstico a SQLite y PostgreSQL).

---

## 3. Arquitectura del Sistema

### 3.1. Diagrama de Componentes

```
+-----------------------------------------------------------------------------------+
|                           CAPA DE CLIENTES Y USUARIOS                             |
|                                                                                   |
|   +--------------------------+                 +------------------------------+   |
|   |   Cliente Digital        |                 |   Asesor / Cajero de Tienda  |   |
|   |   (Browser Web / Móvil)  |                 |   (Terminal POS en Caja)     |   |
|   +------------+-------------+                 +--------------+---------------+   |
+----------------|----------------------------------------------|-------------------+
                 | HTTPS                                        | HTTPS
                 v                                              v
+-----------------------------------------------------------------------------------+
|               CAPA DE PRESENTACIÓN — FRONTEND EN REACT (Next.js 14)               |
|                                                                                   |
|   • Módulo Mostrador / Caja POS (Checklist, Validación BORIS, Selector Tienda)   |
|   • Portal de Autogestión del Cliente (Consulta y Políticas)                      |
|   • Monitor de Inventario en Góndola en Tiempo Real                               |
|   • Modal de Comprobante Imprimible con Vale de Compra Digital                    |
+---------------------------------------+-------------------------------------------+
                                        | REST / JSON (Route Handlers)
                                        v
+-----------------------------------------------------------------------------------+
|       CAPA DE SERVICIOS — BACKEND EN NODE.JS (Vercel Serverless Platform)         |
|                                                                                   |
|   +---------------------------------------------------------------------------+   |
|   |   Next.js API Gateway: Validación de Schemas con Zod & CORS               |   |
|   +-------------------------------------+-------------------------------------+   |
|                                         |                                         |
|                 +-----------------------+-----------------------+                 |
|                 |                                               |                 |
|                 v                                               v                 |
|   +-----------------------------+               +-----------------------------+   |
|   |  Servicio de Devolución     |               |  Servicio de Inventario     |   |
|   |  (Reglas de 30 días,        |               |  (Reingreso local a góndola |   |
|   |   emisión de Vale Digital)  |               |   o registro de merma)      |   |
|   +--------------+--------------+               +--------------+--------------+   |
|                  |                                             |                  |
|                  +----------------------+----------------------+                  |
|                                         |                                         |
|                                         v                                         |
|   +---------------------------------------------------------------------------+   |
|   |  Capa de Datos: Prisma ORM 5.x (Transacciones ACID Atómicas)              |   |
|   +-------------------------------------+-------------------------------------+   |
+-----------------------------------------|-----------------------------------------+
                                          | SQL Queries
                                          v
+-----------------------------------------------------------------------------------+
|                           BASE DE DATOS RELACIONAL                                |
|                                                                                   |
|   • Desarrollo Local: SQLite (dev.db autogenerado)                                |
|   • Producción Vercel: PostgreSQL Serverless (Neon.tech / Vercel Postgres)        |
+-----------------------------------------------------------------------------------+
```

---

## 4. Tecnologías Utilizadas (Capas Gratuitas)

| Componente | Tecnología Seleccionada | Justificación y Capa Gratuita |
| :--- | :--- | :--- |
| **Frontend** | **React 18 + Next.js 14** | Componentes declarativos, renderizado optimizado, estilos con Tailwind CSS y cero configuración de bundlers externos. |
| **Backend** | **Node.js 20+ (Route Handlers)** | Ejecución serverless de alta velocidad nativa en Vercel, validación de contratos con **Zod**. |
| **ORM / Datos** | **Prisma ORM 5.x** | Tipado estricto en TypeScript, transacciones atómicas seguras y compatibilidad transparente entre SQLite y PostgreSQL. |
| **Pruebas** | **Vitest** | Entorno de pruebas unitarias e integrales ultrarrápido con soporte nativo de TypeScript. |
| **Hosting Cloud** | **Vercel Free Tier** | Plataforma nativa para Next.js con despliegue en 1 clic, HTTPS automático y CDN global. |
| **Diagramación** | **Draw.io & Archify** | Archivo `.drawio` editable de 3 páginas y visualizadores interactivos HTML con validación formal. |

---

## 5. Instrucciones para Ejecutar el Proyecto en Local

### 5.1. Requisitos Previos
- Node.js versión 18 o superior.
- Gestor de paquetes `npm` (incluido con Node.js).

### 5.2. Pasos de Instalación y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Moshua53/mcc.git
   cd mcc
   ```

2. **Instalar dependencias de Node.js:**
   ```bash
   npm install
   ```

3. **Sincronizar base de datos y sembrar datos de prueba:**
   ```bash
   npx prisma db push
   npm run prisma:seed
   ```

4. **Ejecutar la suite de pruebas automatizadas (Vitest):**
   ```bash
   npm test
   ```

   **Resultado esperado (5 pruebas aprobadas):**
   ```
    ✓ tests/returns.test.ts (5 tests) 1129ms
    Test Files  1 passed (1)
         Tests  5 passed (5)
   ```

5. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

6. **Abrir en el navegador:**
   - Aplicación Web: [http://localhost:3000](http://localhost:3000)
   - Healthcheck API: [http://localhost:3000/api/health](http://localhost:3000/api/health)

---

## 6. Guía de Despliegue en 1 Clic en Vercel

1. Sube tu código al repositorio en **GitHub**.
2. Ingresa a [https://vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
3. Haz clic en **Add New... > Project** y selecciona tu repositorio `mcc`.
4. Vercel detectará automáticamente que es un proyecto **Next.js**.
5. Configura en la sección **Environment Variables** (opcional para PostgreSQL):
   - `DATABASE_URL`: Cadena de conexión a tu PostgreSQL serverless gratuito de [Neon.tech](https://neon.tech), [Supabase](https://supabase.com) o Vercel Postgres.
   - `MAX_RETURN_DAYS`: `30`
6. Haz clic en **Deploy**. En menos de 60 segundos tu aplicación estará publicada y accesible en internet con HTTPS gratuito.

---

## 7. Casos de Prueba Disponibles para la Demostración

En la pestaña **Mostrador / Caja en Tienda**, se encuentran botones de prueba rápida para validar cada escenario ante los evaluadores:

| Código | Escenario | Comportamiento del Sistema |
| :--- | :--- | :--- |
| `ORD-2026-101` | **Flujo Exitoso:** Entregado hace 5 días. | Diagnóstico Verde. Permite devolver artículos, reingresa stock en sucursal y emite el vale `VALE-MV-XXXXX`. |
| `ORD-2026-105` | **Flujo Exitoso:** Entregado hace 2 días (múltiples ítems). | Permite devolución parcial o total con cálculo dinámico del reembolso. |
| `ORD-2026-102` | **Caso Excepcional:** Entregado hace 45 días. | Diagnóstico Rojo/Ámbar. **Rechaza** la devolución indicando que superó el plazo máximo de 30 días. |
| `ORD-2026-103` | **Caso Excepcional:** Pedido ya devuelto (`DEVUELTO_TOTAL`). | Diagnóstico Rojo/Ámbar. **Rechaza** porque todos los artículos ya fueron devueltos. |
| `ORD-2026-104` | **Caso Excepcional:** Pedido en camino (`EN_CAMINO`). | Diagnóstico Rojo/Ámbar. **Rechaza** porque el pedido aún no cuenta con fecha de entrega registrada. |