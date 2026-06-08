# Práctica 05: Proyecto Integrador

Proyecto integrador desarrollado como una Single Page Application (SPA), utilizando **Laravel** para el backend (API REST) y **Vue.js** para el frontend.

## Descripción del Proyecto
Este sistema centraliza la gestión de inventario y el flujo de ventas. Integra **Pinia** para la gestión reactiva del estado, **Laravel Sanctum** para la seguridad de la API y un **Panel Administrativo** protegido mediante control de roles (RBAC).

## Tecnologías Utilizadas

### Frontend
- **Vue 3 (Vite):** Interfaz reactiva y moderna.
- **Pinia:** Gestión de estado global (Carrito, autenticación y sesión).
- **Axios:** Consumo de servicios RESTful con manejo de estados de carga.
- **Bootstrap 5:** Diseño responsivo y componentes de UI profesional.

### Backend
- **Laravel 10:** API RESTful.
- **Laravel Sanctum:** Protección de endpoints y gestión de tokens.
- **MariaDB:** Base de datos relacional con control de usuarios y roles.

## Características Implementadas (Parte D)
- **Validación en Frontend:** Verificación de datos antes del envío en formularios.
- **UX Profesional:** Implementación de *loading spinners* y alertas de éxito/error con auto-cierre.
- **Paginación Dinámica:** Catálogo de productos eficiente (10 ítems por vista).
- **Seguridad y Roles:** Panel administrativo protegido; acceso restringido solo para administradores.
- **Persistencia:** Gestión de estado global con sincronización en `localStorage`.

## Instrucciones de Instalación

### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
# Configura DB_DATABASE en .env
php artisan key:generate
php artisan migrate
php artisan storage:link
php artisan serve
```

## Frontend (Vue.js)
```bash
cd frontend
npm install
npm run dev
```

**Desarrollado por:** Jared Hernández González - Universidad Politécnica de Texcoco (UPTex) 