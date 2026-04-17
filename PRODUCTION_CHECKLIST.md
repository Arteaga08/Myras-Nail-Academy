# Checklist de Producción — Myra's Nail Academy

Tareas pendientes para que el sitio funcione correctamente en producción.
Actualizar este archivo conforme se completen los puntos.

---

## Backend

### Variables de entorno

- [ ] `SMTP_USER` / `SMTP_PASS` — Configurar Gmail App Password (Google Account → Seguridad → Contraseñas de aplicación). Desbloquea emails de confirmación de compra y notificación al admin.
- [ ] `STRIPE_SECRET_KEY` — Cambiar de `sk_test_` a `sk_live_` cuando se active la cuenta de Stripe en modo producción.
- [ ] `STRIPE_WEBHOOK_SECRET` — Generar el `whsec_` desde el dashboard de Stripe para el endpoint de producción (no el de Stripe CLI, ese es solo para desarrollo local).
- [ ] `FRONTEND_URL` — Reemplazar `http://localhost:5173` con el dominio real del frontend (p. ej. `https://myrasnailacademy.com`). Afecta CORS.
- [ ] `NODE_ENV=production` — Asegurarse de que el servidor arranca en modo producción. Oculta stack traces en respuestas de error.
- [ ] `JWT_SECRET` — Ya generado y fuerte. Confirmar que el valor de producción no coincide con el de desarrollo.
- [ ] `MONGO_URI` — Confirmar que apunta al cluster de producción de Atlas (contraseña ya rotada).

### Seguridad

- [ ] CORS — Verificar que `FRONTEND_URL` en producción acepta solo el dominio real, no `*`.
- [ ] Helmet — Confirmar que los headers de seguridad HTTP están activos (`helmet()` ya está en `app.js`).
- [ ] Rate limiting — Revisar los límites (auth: 10/15 min, general: 100/1 min, órdenes: 5/5 min) y ajustar si el tráfico real los dispara falsos positivos.
- [ ] HTTPS — El servidor debe estar detrás de un proxy (nginx, Caddy, Railway, Render, etc.) que termine SSL. Node no debe exponer HTTP directo en producción.

### Infraestructura

- [ ] Proceso administrado — Usar PM2, Railway, Render, o similar para que el proceso Node se reinicie automáticamente si cae.
- [ ] Logs — Configurar un destino para los logs de producción (archivo rotado, servicio como Logtail, Datadog, etc.). Hoy los logs van solo a stdout.
- [ ] Health check — `/api/health` ya existe. Conectarlo al sistema de monitoreo del hosting para alertas de caída.
- [ ] Variables de entorno en el servidor — No subir `.env` a git. Configurar las variables directamente en el panel del hosting o usando un servicio de secrets.

### Base de datos (MongoDB Atlas)

- [ ] Índices — Agregar índices en los campos más consultados antes de tener tráfico real:
  - `User`: `email` (único, ya existe en el modelo)
  - `Course`: `isPublished`, `category`, `createdAt`
  - `Enrollment`: `userId + courseId` (compuesto, para lookup rápido)
  - `Order`: `userId`, `stripeIntentId`
  - `AuditLog`: `adminId`, `createdAt`
- [ ] Backup automático — Activar backups en Atlas (disponible desde el tier M2+).
- [ ] IP Allowlist — En Atlas Network Access, restringir las IPs permitidas al servidor de producción (hoy probablemente está en `0.0.0.0/0`).

### Testing

- [ ] Tests automatizados — Escribir tests de integración para los flujos críticos (auth, compra, webhook). Actualmente solo se hicieron pruebas manuales con curl.

---

## Frontend

- [ ] Build de producción — El cliente (`/client`) aún no está integrado con el backend. Implementar y verificar los flujos:
  - Registro / login de estudiante
  - Catálogo de cursos
  - Detalle de curso + lista de lecciones
  - Checkout Stripe (usar Stripe.js / Elements)
  - Dashboard del estudiante (mis cursos, progreso)
  - Panel de admin (login, stats, gestión de cursos/lecciones)
- [ ] Variables de entorno del cliente — Configurar `VITE_API_URL` (o equivalente) apuntando al backend de producción.
- [ ] Manejo de errores en UI — Mostrar mensajes claros cuando el API devuelve 400, 401, 404, 429, 500.
- [ ] Hosting del frontend — Configurar deploy (Vercel, Netlify, Render static, etc.) y dominio personalizado.

---

## Stripe (previo al lanzamiento)

- [ ] Activar cuenta de Stripe — Completar el proceso de verificación KYC en el dashboard de Stripe para poder cobrar en modo live.
- [ ] Registrar el webhook endpoint de producción en Stripe Dashboard → Developers → Webhooks. Apuntar a `https://tudominio.com/api/webhooks/stripe`.
- [ ] Probar el flujo completo con tarjeta real (cargo mínimo, p. ej. $10 MXN) antes de abrir al público.
- [ ] Configurar emails transaccionales de Stripe (recibos) si se desea complementar los emails propios.

---

## Dominio y DNS

- [ ] Registrar dominio (si no se tiene aún).
- [ ] Apuntar DNS al servidor / hosting del frontend y backend.
- [ ] Certificado SSL/TLS — Configurar HTTPS (Let's Encrypt es gratuito; la mayoría de hostings lo automatizan).

---

## Antes del lanzamiento público

- [ ] Prueba end-to-end en staging — Repetir el plan de verificación completo (las 10 fases) en el entorno de producción antes de abrir al público.
- [ ] Revisar que ningún `console.log` exponga datos sensibles (tokens, passwords, PII).
- [ ] Política de privacidad / Términos de uso — Requeridos por Stripe y recomendados legalmente.
- [ ] Configurar Google Analytics u otra herramienta de métricas si se necesitan.

---

_Última actualización: 2026-04-15_
