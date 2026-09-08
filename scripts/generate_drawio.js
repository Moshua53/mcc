const fs = require("fs");
const path = require("path");

const xml = `<mxfile host="app.diagrams.net" modified="2026-09-07T18:00:00.000Z" agent="Mozilla/5.0" version="24.7.5">
  <diagram id="page-1-arch" name="1. Arquitectura de Componentes (React + Node.js + Vercel)">
    <mxGraphModel dx="1422" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="900" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Titulo Principal -->
        <mxCell id="title" value="MERCADO VIVA — ARQUITECTURA DE COMPONENTES DEL MVP (BORIS)&#xa;Stack: React 18 + Next.js App Router + Node.js Serverless + Vercel Free Tier + Prisma ORM" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=18;fontStyle=1;fontColor=#1E3A8A;" vertex="1" parent="1">
          <mxGeometry x="250" y="30" width="900" height="50" as="geometry" />
        </mxCell>

        <!-- Capa 1: Usuarios y Actores -->
        <mxCell id="box-users" value="CAPA DE CLIENTES Y USUARIOS" style="swimlane;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;fontStyle=1;fontSize=12;fontColor=#334155;" vertex="1" parent="1">
          <mxGeometry x="80" y="110" width="1240" height="130" as="geometry" />
        </mxCell>
        <mxCell id="actor-client" value="&lt;b&gt;Cliente Digital&lt;/b&gt;&lt;br&gt;Comprador Web / Móvil&lt;br&gt;&lt;i&gt;Lleva producto + Código QR&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;fontColor=#0369A1;" vertex="1" parent="box-users">
          <mxGeometry x="150" y="40" width="200" height="60" as="geometry" />
        </mxCell>
        <mxCell id="actor-clerk" value="&lt;b&gt;Asesor / Cajero de Tienda&lt;/b&gt;&lt;br&gt;Terminal POS / Mostrador Servicio&lt;br&gt;&lt;i&gt;Inspección física y aprobación&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;fontColor=#0369A1;" vertex="1" parent="box-users">
          <mxGeometry x="750" y="40" width="240" height="60" as="geometry" />
        </mxCell>

        <!-- Capa 2: Frontend React -->
        <mxCell id="box-front" value="CAPA DE PRESENTACIÓN — FRONTEND EN REACT (Next.js App Router)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#16A34A;fontStyle=1;fontSize=12;fontColor=#166534;" vertex="1" parent="1">
          <mxGeometry x="80" y="270" width="1240" height="150" as="geometry" />
        </mxCell>
        <mxCell id="fe-pos" value="&lt;b&gt;Módulo Mostrador / POS&lt;/b&gt;&lt;br&gt;React Client Component&lt;br&gt;Búsqueda, checklist &amp; cálculo refund" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#22C55E;fontColor=#14532D;" vertex="1" parent="box-front">
          <mxGeometry x="150" y="45" width="220" height="70" as="geometry" />
        </mxCell>
        <mxCell id="fe-customer" value="&lt;b&gt;Portal Autogestión Cliente&lt;/b&gt;&lt;br&gt;Consulta de compras &amp; políticas" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#22C55E;fontColor=#14532D;" vertex="1" parent="box-front">
          <mxGeometry x="450" y="45" width="200" height="70" as="geometry" />
        </mxCell>
        <mxCell id="fe-inv" value="&lt;b&gt;Monitor Inventario en Góndola&lt;/b&gt;&lt;br&gt;Visualización de stock en tiempo real" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#22C55E;fontColor=#14532D;" vertex="1" parent="box-front">
          <mxGeometry x="720" y="45" width="220" height="70" as="geometry" />
        </mxCell>
        <mxCell id="fe-audit" value="&lt;b&gt;Historial &amp; Vale Imprimible&lt;/b&gt;&lt;br&gt;Modal con Vale Store Credit" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#22C55E;fontColor=#14532D;" vertex="1" parent="box-front">
          <mxGeometry x="980" y="45" width="190" height="70" as="geometry" />
        </mxCell>

        <!-- Capa 3: Backend Node.js Serverless & Vercel -->
        <mxCell id="box-back" value="CAPA DE SERVICIOS — BACKEND EN NODE.JS (Serverless Functions en Vercel Free Tier)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;fontStyle=1;fontSize=12;fontColor=#1E40AF;" vertex="1" parent="1">
          <mxGeometry x="80" y="450" width="1240" height="210" as="geometry" />
        </mxCell>
        <mxCell id="api-gw" value="&lt;b&gt;Next.js API Routes Gateway&lt;/b&gt;&lt;br&gt;Route Handlers Serverless&lt;br&gt;Validación Zod DTO + CORS" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;fontColor=#1E3A8A;fontStyle=1;" vertex="1" parent="box-back">
          <mxGeometry x="120" y="45" width="220" height="130" as="geometry" />
        </mxCell>
        <mxCell id="srv-boris" value="&lt;b&gt;Servicio de Devolución BORIS&lt;/b&gt;&lt;br&gt;• Valida plazo &amp;le; 30 días calendario&lt;br&gt;• Valida estado ENTREGADO&lt;br&gt;• Genera código único RET &amp; VALE-MV&lt;br&gt;• Actualiza status de orden" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;fontColor=#1E3A8A;" vertex="1" parent="box-back">
          <mxGeometry x="400" y="45" width="260" height="130" as="geometry" />
        </mxCell>
        <mxCell id="srv-inv" value="&lt;b&gt;Servicio de Inventario Local&lt;/b&gt;&lt;br&gt;• Reingreso físico atómico&lt;br&gt;• Si ÓPTIMO: Stock góndola +qty&lt;br&gt;• Si DAÑADO: Registro de merma&lt;br&gt;• Consulta de stock por sucursal" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;fontColor=#1E3A8A;" vertex="1" parent="box-back">
          <mxGeometry x="710" y="45" width="250" height="130" as="geometry" />
        </mxCell>
        <mxCell id="orm-prisma" value="&lt;b&gt;Prisma ORM 5.x&lt;/b&gt;&lt;br&gt;Transacciones ACID&lt;br&gt;Single-connection pool&lt;br&gt;Type-Safe Queries" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;fontColor=#92400E;fontStyle=1;" vertex="1" parent="box-back">
          <mxGeometry x="1010" y="45" width="180" height="130" as="geometry" />
        </mxCell>

        <!-- Capa 4: Base de Datos Relacional -->
        <mxCell id="box-db" value="CAPA DE PERSISTENCIA — BASE DE DATOS RELACIONAL" style="swimlane;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#D97706;fontStyle=1;fontSize=12;fontColor=#92400E;" vertex="1" parent="1">
          <mxGeometry x="80" y="690" width="1240" height="140" as="geometry" />
        </mxCell>
        <mxCell id="db-local" value="&lt;b&gt;SQLite (Local)&lt;/b&gt;&lt;br&gt;Zero config, rápida ejecución&lt;br&gt;dev.db con semillero inicial" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#FEF3C7;strokeColor=#D97706;fontColor=#78350F;" vertex="1" parent="box-db">
          <mxGeometry x="250" y="40" width="200" height="80" as="geometry" />
        </mxCell>
        <mxCell id="db-cloud" value="&lt;b&gt;PostgreSQL Serverless (Cloud)&lt;/b&gt;&lt;br&gt;Neon.tech / Supabase / Vercel Postgres&lt;br&gt;&lt;i&gt;Capa 100% Gratuita (Free Tier)&lt;/i&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#FEF3C7;strokeColor=#D97706;fontColor=#78350F;" vertex="1" parent="box-db">
          <mxGeometry x="750" y="40" width="260" height="80" as="geometry" />
        </mxCell>

        <!-- Conexiones -->
        <mxCell id="edge-client-pos" edge="1" parent="1" source="actor-client" target="fe-customer" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=2;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge-clerk-pos" edge="1" parent="1" source="actor-clerk" target="fe-pos" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=2;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge-fe-api" edge="1" parent="1" source="fe-pos" target="api-gw" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=2;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge-api-boris" edge="1" parent="1" source="api-gw" target="srv-boris" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge-api-inv" edge="1" parent="1" source="api-gw" target="srv-inv" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge-boris-orm" edge="1" parent="1" source="srv-boris" target="orm-prisma" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge-inv-orm" edge="1" parent="1" source="srv-inv" target="orm-prisma" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge-orm-db" edge="1" parent="1" source="orm-prisma" target="db-cloud" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#D97706;strokeWidth=2;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>

  <diagram id="page-2-bpmn" name="2. Diagrama de Proceso BPMN (Flujo BORIS)">
    <mxGraphModel dx="1422" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="900" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <mxCell id="bpmn-title" value="MERCADO VIVA — PROCESO DE DEVOLUCIÓN DE COMPRA DIGITAL EN TIENDA FÍSICA (BPMN)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=18;fontStyle=1;fontColor=#166534;" vertex="1" parent="1">
          <mxGeometry x="250" y="20" width="900" height="40" as="geometry" />
        </mxCell>

        <!-- Swimlane 1: Cliente -->
        <mxCell id="pool-client" value="Cliente Digital" style="swimlane;horizontal=0;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="60" y="80" width="1280" height="150" as="geometry" />
        </mxCell>
        <mxCell id="start-node" value="" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#22C55E;strokeColor=#15803D;" vertex="1" parent="pool-client">
          <mxGeometry x="60" y="55" width="40" height="40" as="geometry" />
        </mxCell>
        <mxCell id="act-present" value="Acude a tienda física con producto y código/QR" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;" vertex="1" parent="pool-client">
          <mxGeometry x="150" y="45" width="160" height="60" as="geometry" />
        </mxCell>
        <mxCell id="act-receive-voucher" value="Recibe Vale de Compra Digital o comprobante de reembolso" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;fontStyle=1;" vertex="1" parent="pool-client">
          <mxGeometry x="1000" y="45" width="190" height="60" as="geometry" />
        </mxCell>

        <!-- Swimlane 2: Asesor de Tienda -->
        <mxCell id="pool-clerk" value="Asesor / Cajero POS" style="swimlane;horizontal=0;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#16A34A;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="60" y="230" width="1280" height="160" as="geometry" />
        </mxCell>
        <mxCell id="act-search" value="Ingresa código o documento en terminal React" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;" vertex="1" parent="pool-clerk">
          <mxGeometry x="150" y="50" width="160" height="60" as="geometry" />
        </mxCell>
        <mxCell id="act-inspect" value="Inspección física del producto y empaque" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;" vertex="1" parent="pool-clerk">
          <mxGeometry x="580" y="50" width="150" height="60" as="geometry" />
        </mxCell>
        <mxCell id="act-confirm" value="Confirma devolución en pantalla y selecciona medio" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;" vertex="1" parent="pool-clerk">
          <mxGeometry x="780" y="50" width="160" height="60" as="geometry" />
        </mxCell>

        <!-- Swimlane 3: Backend Node.js & Reglas -->
        <mxCell id="pool-back" value="Backend Node.js &amp; Reglas" style="swimlane;horizontal=0;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="60" y="390" width="1280" height="180" as="geometry" />
        </mxCell>
        <mxCell id="gate-delivered" value="¿Estado es&#xa;ENTREGADO?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;fontStyle=1;fontSize=11;" vertex="1" parent="pool-back">
          <mxGeometry x="360" y="40" width="110" height="80" as="geometry" />
        </mxCell>
        <mxCell id="gate-days" value="¿Antigüedad&#xa;&amp;le; 30 días?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;fontStyle=1;fontSize=11;" vertex="1" parent="pool-back">
          <mxGeometry x="500" y="40" width="110" height="80" as="geometry" />
        </mxCell>
        <mxCell id="act-reject" value="Rechazar devolución y mostrar motivo de negocio" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;fontColor=#991B1B;fontStyle=1;" vertex="1" parent="pool-back">
          <mxGeometry x="420" y="130" width="150" height="40" as="geometry" />
        </mxCell>
        <mxCell id="act-trans" value="Transacción atómica: emite vale, actualiza pedido y reingresa stock" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;fontStyle=1;" vertex="1" parent="pool-back">
          <mxGeometry x="970" y="45" width="220" height="70" as="geometry" />
        </mxCell>

        <!-- Swimlane 4: Inventario en Góndola -->
        <mxCell id="pool-inv" value="Inventario Tienda Física" style="swimlane;horizontal=0;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#D97706;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="60" y="570" width="1280" height="130" as="geometry" />
        </mxCell>
        <mxCell id="gate-apt" value="¿Producto en&#xa;estado ÓPTIMO?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;fontStyle=1;fontSize=11;" vertex="1" parent="pool-inv">
          <mxGeometry x="780" y="25" width="130" height="80" as="geometry" />
        </mxCell>
        <mxCell id="act-restock" value="Incrementar stock de góndola (+qty) en sucursal" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;fontColor=#14532D;fontStyle=1;" vertex="1" parent="pool-inv">
          <mxGeometry x="970" y="15" width="190" height="45" as="geometry" />
        </mxCell>
        <mxCell id="act-waste" value="Registrar merma / descarte (no suma stock góndola)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;fontColor=#991B1B;" vertex="1" parent="pool-inv">
          <mxGeometry x="970" y="70" width="190" height="45" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>

  <diagram id="page-3-specs" name="3. Ficha Técnica, URL y Equipo">
    <mxGraphModel dx="1422" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="900" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <mxCell id="card-desc" value="&lt;b&gt;1. DESCRIPCIÓN DEL PROCESO SELECCIONADO&lt;/b&gt;&lt;br&gt;&lt;br&gt;&lt;b&gt;Proceso:&lt;/b&gt; Devolución de una compra digital en una tienda física (BORIS — Buy Online, Return In-Store).&lt;br&gt;&lt;b&gt;Problema:&lt;/b&gt; Elimina el tiempo de espera de 15 días por logística inversa, ofreciendo al cliente reembolso inmediato en tienda física y reingresando stock a góndola en tiempo real.&lt;br&gt;&lt;b&gt;Reglas de Negocio:&lt;/b&gt;&lt;br&gt;1. El pedido debe encontrarse en estado ENTREGADO.&lt;br&gt;2. Plazo máximo de devolución de 30 días calendario.&lt;br&gt;3. Inspección física: solo productos en estado ÓPTIMO se reingresan a góndola (+stock).&lt;br&gt;4. Emisión de Vale de Compra Digital (VALE-MV-XXXXX) redimible al instante.&lt;br&gt;5. No duplicidad: control atómico de cantidades devueltas." style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;align=left;spacingLeft=15;" vertex="1" parent="1">
          <mxGeometry x="80" y="40" width="600" height="230" as="geometry" />
        </mxCell>

        <mxCell id="card-tech" value="&lt;b&gt;2. TECNOLOGÍAS UTILIZADAS (100% Código Abierto &amp; Capas Gratuitas)&lt;/b&gt;&lt;br&gt;&lt;br&gt;• &lt;b&gt;Frontend:&lt;/b&gt; React 18, Next.js 14 (App Router), Tailwind CSS, Lucide Icons.&lt;br&gt;• &lt;b&gt;Backend:&lt;/b&gt; Node.js 20+, Route Handlers Serverless de Next.js, Zod (Validación DTO).&lt;br&gt;• &lt;b&gt;ORM &amp; Datos:&lt;/b&gt; Prisma ORM con soporte agnóstico SQLite (dev.db local) y PostgreSQL (Neon.tech / Vercel Postgres en producción).&lt;br&gt;• &lt;b&gt;Pruebas Automatizadas:&lt;/b&gt; Vitest (5 pruebas unitarias e integrales que cubren flujo feliz y casos excepcionales).&lt;br&gt;• &lt;b&gt;Hosting &amp; Despliegue:&lt;/b&gt; Vercel Free Tier (Serverless Edge Deployment en 1 clic)." style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;align=left;spacingLeft=15;" vertex="1" parent="1">
          <mxGeometry x="720" y="40" width="600" height="230" as="geometry" />
        </mxCell>

        <mxCell id="card-run" value="&lt;b&gt;3. INSTRUCCIONES PARA EJECUTAR EL PROYECTO&lt;/b&gt;&lt;br&gt;&lt;br&gt;&lt;code&gt;1. Clonar repositorio: git clone &amp;lt;repo_url&amp;gt; &amp;&amp; cd mcc&lt;br&gt;2. Instalar dependencias: npm install&lt;br&gt;3. Inicializar base de datos y semillero: npx prisma db push &amp;&amp; npm run prisma:seed&lt;br&gt;4. Ejecutar pruebas automatizadas: npm test&lt;br&gt;5. Iniciar aplicación web: npm run dev&lt;br&gt;6. Abrir en navegador: http://localhost:3000&lt;/code&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#16A34A;align=left;spacingLeft=15;" vertex="1" parent="1">
          <mxGeometry x="80" y="300" width="600" height="200" as="geometry" />
        </mxCell>

        <mxCell id="card-deploy" value="&lt;b&gt;4. DESPLIEGUE EN VERCEL &amp; URL PÚBLICA&lt;/b&gt;&lt;br&gt;&lt;br&gt;• &lt;b&gt;URL de la Aplicación en Producción (Vercel Free Tier):&lt;/b&gt;&lt;br&gt;&lt;a href=&quot;https://mercado-viva-mvp.vercel.app&quot;&gt;https://mercado-viva-mvp.vercel.app&lt;/a&gt;&lt;br&gt;&lt;br&gt;• &lt;b&gt;Despliegue en 1 Clic:&lt;/b&gt;&lt;br&gt;Conectar el repositorio en dashboard.vercel.com -&gt; Import Project -&gt; Deploy.&lt;br&gt;Vercel compila Next.js automáticamente y expone los Route Handlers como Serverless Functions sin configuración manual." style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#D97706;align=left;spacingLeft=15;" vertex="1" parent="1">
          <mxGeometry x="720" y="300" width="600" height="200" as="geometry" />
        </mxCell>

        <mxCell id="card-team" value="&lt;b&gt;5. INTEGRANTES DEL EQUIPO&lt;/b&gt;&lt;br&gt;&lt;br&gt;• &lt;b&gt;Estudiante 1:&lt;/b&gt; [Nombre y Apellidos] — Rol: Arquitectura &amp; Backend Node.js (Route Handlers, Prisma)&lt;br&gt;• &lt;b&gt;Estudiante 2:&lt;/b&gt; [Nombre y Apellidos] — Rol: Frontend en React (Next.js App Router, Tailwind CSS)&lt;br&gt;• &lt;b&gt;Estudiante 3:&lt;/b&gt; [Nombre y Apellidos] — Rol: Base de Datos, Pruebas Automatizadas (Vitest) &amp; Despliegue en Vercel" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;align=left;spacingLeft=15;" vertex="1" parent="1">
          <mxGeometry x="80" y="530" width="1240" height="150" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

const target = path.join(__dirname, "..", "public", "diagrams", "mercado_viva_arquitectura.drawio");
fs.writeFileSync(target, xml, "utf8");
console.log("Archivo Draw.io multi-página generado exitosamente en:", target);