IT Drinks Frontend
Frontend en React + Vite para gestionar cócteles e ingredientes de la plataforma IT Drinks. Incluye autenticación con roles, panel administrativo y vistas especializadas para CRUD de recetas e insumos.

Stack
Vite + React + TypeScript
Tailwind CSS para el diseño
TanStack Query para caché y fetching
React Hook Form + Zod para formularios
Axios con interceptores (token Bearer desde Passport/Laravel)
Estructura
src/
├─ app/               # Proveedores globales + rutas protegidas
├─ shared/            # Constantes, tipos, hooks y componentes comunes
├─ features/
│  ├─ auth/           # Login/registro, provider y hooks de sesión
│  ├─ dashboard/      # Panel principal tras autenticarse
│  ├─ cocktails/      # Listado, detalle, creación/edición de cócteles
│  └─ ingredients/    # Despensa, formularios y búsqueda por ingrediente
└─ main.tsx           # Entrada que monta AppProviders
Scripts
Comando	Descripción
npm install	Instala dependencias
npm run dev	Arranca Vite (http://localhost:5173)

Rutas principales
/login, /register: autenticación pública.
/app/dashboard: vista principal protegida.
/app/cocktails: listado, filtro y CRUD (admin).
/app/ingredients: despensa con filtros, búsqueda y acceso a cócteles relacionados.
Conexión con la API
Todas las llamadas pasan por src/shared/lib/http/client.ts, donde se configura Axios con el baseURL (VITE_API_URL) y el interceptor que añade el token y limpia sesión en 401.

Variables de entorno
Crea un .env con al menos:

VITE_API_URL=http://localhost:8000/api
Flujo de trabajo sugerido
npm install
Configura .env.
npm run dev para desarrollo.

Descripción de inicio de sesión:
inicio de sesión con usuario de prueba(permisos de usuario)
 usuario: prueba@prueba.com
 password: 12345678
 <img width="641" height="544" alt="image" src="https://github.com/user-attachments/assets/a10e8f60-d169-46f4-b95f-c6eb3823e589" />


inicio de sesión con administrador(permisos de administrador)
 usuario: admin@admin.com
 password: 12345678
 <img width="712" height="616" alt="image" src="https://github.com/user-attachments/assets/ee4ab61d-d38a-4d74-b16e-7aabef0774e9" />


Si se quiere iniciar sesión registrándose:
 Botón 'regístrate aqui' y rellenar formulario.
<img width="585" height="717" alt="image" src="https://github.com/user-attachments/assets/cd18c3cb-6f5c-455c-a690-07464afa5d1e" />

Una vez iniciada la sesión(user):
user, una pantalla principal para elegir que quieres ver cocktails o ingredientes:
<img width="1865" height="691" alt="image" src="https://github.com/user-attachments/assets/7d4627e2-cacb-4abb-a670-6739f8fdb226" />
cocktails, listado de cocktails:
<img width="1638" height="802" alt="image" src="https://github.com/user-attachments/assets/c44b5e53-457e-43ba-a2a6-86a9462c7df5" />
ingredientes, listado de ingredientes, con accion a los cocktails con ese ingrediente:
<img width="1540" height="746" alt="image" src="https://github.com/user-attachments/assets/805cf70b-2cb2-44f8-b5a6-7b97b7b7ea13" />

Una vez iniciada la sesión(admin):
pantalla principal igual
cocktails aparece una pestaña superior para crear
<img width="1498" height="506" alt="image" src="https://github.com/user-attachments/assets/ca750509-fa2b-462e-80c3-863b728f122e" />
Formulario para crear cocktail, en este se especifica nombre, categoria, descripción, a parte se tiene que eligir ingredientes de la lista de ingredientes, si no esta hay que crearlo antes, en el caso de que el ingrediente sea liquido poner los ml de ese ingrediente.
<img width="1443" height="809" alt="image" src="https://github.com/user-attachments/assets/d7778764-2a5d-4c5c-a475-f746979b7712" />
en ingredientes tambien aparece este boton para crear.
Formulario para crear ingrediente, en este se especidica, nombre, marca, origen, clasificación y en el caso de ser alcoholico el %de alcohol.
<img width="1502" height="701" alt="image" src="https://github.com/user-attachments/assets/89de68d8-23d4-4709-9d94-002dbf60a533" />

 
