# Práctica 06: Relaciones Eloquent

Proyecto enfocado en la modelación de datos relacionales mediante Eloquent ORM de Laravel, permitiendo una arquitectura de productos categorizados con gestión de API anidada.   

## Descripción del Proyecto
Extenderás la aplicación de productos para organizarlos en categorías. Un producto pertenece a una categoría (belongsTo) y una categoría tiene muchos productos (hasMany). Vue mostrará el catálogo agrupado y permitirá filtrar por categoría.

## Tecnologías Utilizadas

### Backend
- **Laravel 10:** Eloquent ORM para modelado de relaciones.
- **API Resources:** Transformación de datos mediante recursos anidados para respuestas JSON estructuradas. 
- **Seeding:** Carga automatizada de datos de prueba utilizando Faker.

### Frontend
- **Vue 3 (Vite):** Implementación de navegación por pestañas (tabs) para el filtrado de productos.  
- **Axios:** Consumo dinámico de endpoints categorizados.  

## Características Implementadas
- **Integridad Referencial:** Implementación de claves foráneas con restricción nullOnDelete para asegurar la estabilidad de la base de datos.  
- **Relaciones Eloquent:** Definición clara de la relación uno a muchos entre categorías y productos.  
- **Catálogo Agrupado:** Interfaz de usuario con filtrado dinámico mediante tabs, permitiendo una experiencia de compra organizada.  
- **Optimización de API:** Uso de eager loading en controladores para reducir las consultas a base de datos y mejorar la velocidad de respuesta.  
- **Formularios Reactivos:** Selector inteligente de categorías integrado en el flujo de creación y edición de productos.  

## Instrucciones de Instalación

### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
# Configura DB_DATABASE en .env
php artisan migrate:fresh --seed --seeder=CategoriaProductoSeeder
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