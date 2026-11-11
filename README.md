# Proyecto 01 — Banderas del Mundo

SPA con Vite + React + TypeScript + Tailwind + React Router que consume la API de países
[countries.dev](https://countries.dev) (compatible con REST Countries; la `restcountries.com/v3.1` original ya exige API key).

- `/` inicio · `/explorar` lista con búsqueda y filtro por región · `/explorar/:id` detalle (código alpha3)
- `/favoritos` (estado en Context, persiste entre rutas) · `/contacto` formulario controlado con validación · `*` 404
- Toasts (éxito/error/info, auto-dismiss), `<dialog>` con `useRef` + `showModal()`, modal con dark pattern
  comentado en `src/components/ConfirmDialog.tsx`.

```bash
npm install
npm run dev
```

Aplicación desplegada en Vercel: https://proyecto-01-flame.vercel.app/
