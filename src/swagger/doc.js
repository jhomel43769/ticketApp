import swaggerJSDoc from "swagger-jsdoc";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password_hash
 *         - firstName
 *         - lastName
 *         - role
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del usuario
 *         username:
 *           type: string
 *           description: Nombre de usuario único
 *         email:
 *           type: string
 *           format: email
 *           description: Email del usuario
 *         password_hash:
 *           type: string
 *           description: Contraseña hasheada
 *         firstName:
 *           type: string
 *           description: Nombre del usuario
 *         lastName:
 *           type: string
 *           description: Apellido del usuario
 *         role:
 *           type: string
 *           description: ID del rol del usuario
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: Estado del usuario
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *     
 *     Role:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del rol
 *         name:
 *           type: string
 *           enum: [admin, creador, usuario]
 *           description: Nombre del rol
 *         description:
 *           type: string
 *           description: Descripción del rol
 *         Permissions:
 *           type: array
 *           items:
 *             type: string
 *             enum:
 *               - "project:create"
 *               - "project:read"
 *               - "project:update"
 *               - "project:delete"
 *               - "issue:create"
 *               - "issue:read"
 *               - "issue:update"
 *               - "issue:delete"
 *               - "user:read_all"
 *               - "user:manage_roles"
 *           description: Permisos del rol
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     
 *     Project:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - createdBy
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del proyecto
 *         name:
 *           type: string
 *           description: Nombre único del proyecto
 *         description:
 *           type: string
 *           description: Descripción del proyecto
 *         createdBy:
 *           type: string
 *           description: ID del usuario creador
 *         leader:
 *           type: string
 *           description: ID del líder del proyecto
 *         status:
 *           type: string
 *           enum: [activado, archivado, completado]
 *           default: activado
 *           description: Estado del proyecto
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     
 *     Issue:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - type
 *         - priority
 *         - project
 *         - reportedBy
 *         - assignedTo
 *         - dueDate
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único de la issue
 *         title:
 *           type: string
 *           description: Título de la issue
 *         description:
 *           type: string
 *           description: Descripción detallada
 *         type:
 *           type: string
 *           enum: [Peticion, Tarea, Error]
 *           description: Tipo de issue
 *         priority:
 *           type: string
 *           enum: [Baja, Media, Alta, Critica]
 *           default: Media
 *           description: Prioridad de la issue
 *         status:
 *           type: string
 *           enum: ["Por Hacer", "En Progreso", "En revisión", "Terminada"]
 *           default: "Por Hacer"
 *           description: Estado actual
 *         code:
 *           type: string
 *           description: Código único generado automáticamente
 *         dueDate:
 *           type: string
 *           format: date-time
 *           description: Fecha límite
 *         project:
 *           type: string
 *           description: ID del proyecto
 *         reportedBy:
 *           type: string
 *           description: ID del usuario que reportó
 *         assignedTo:
 *           type: string
 *           description: ID del usuario asignado
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               text:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *         attachments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               fileName:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *               mimeType:
 *                 type: string
 *               size:
 *                 type: number
 *               uploadedBy:
 *                 type: string
 *               uploadedAt:
 *                 type: string
 *                 format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Mensaje de error
 *         message:
 *           type: string
 *           description: Mensaje descriptivo
 */

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Endpoints de autenticación de usuarios
 *   - name: Users
 *     description: Gestión de usuarios
 *   - name: Projects
 *     description: Gestión de proyectos
 *   - name: Issues
 *     description: Gestión de issues/tickets
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Registrar un nuevo usuario
 *     description: Crea una nueva cuenta de usuario en el sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password_hash
 *               - firstName
 *               - lastName
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *                 example: "johndoe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password_hash:
 *                 type: string
 *                 example: "mySecretPassword123"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               role:
 *                 type: string
 *                 description: ID del rol del usuario
 *                 example: "60f1b2b3c4d5e6f7g8h9i0j1"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "usuario creado con exito"
 *       400:
 *         description: Error en los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Iniciar sesión
 *     description: Autentica a un usuario y devuelve un token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password_hash
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               password_hash:
 *                 type: string
 *                 example: "mySecretPassword123"
 *     responses:
 *       201:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "session inciada con exito"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/auth/profiles:
 *   get:
 *     tags: [Users]
 *     summary: Obtener todos los usuarios
 *     description: Devuelve una lista de todos los usuarios del sistema
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       400:
 *         description: No se encuentran usuarios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/auth/profile/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Obtener usuario por ID
 *     description: Devuelve la información de un usuario específico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del usuario
 *         example: "60f1b2b3c4d5e6f7g8h9i0j1"
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// src/routes/project.route.js - Agregar estas anotaciones

/**
 * @swagger
 * /api/project/create:
 *   post:
 *     tags: [Projects]
 *     summary: Crear un nuevo proyecto
 *     description: Crea un nuevo proyecto (requiere permisos de creación)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Proyecto Web E-commerce"
 *               description:
 *                 type: string
 *                 example: "Desarrollo de plataforma de comercio electrónico"
 *               leaderId:
 *                 type: string
 *                 example: "60f1b2b3c4d5e6f7g8h9i0j1"
 *               status:
 *                 type: string
 *                 enum: [activado, archivado, completado]
 *                 default: activado
 *                 example: "activado"
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Proyecto creado con éxito"
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Error en los datos o proyecto ya existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token no válido o usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Sin permisos para crear proyectos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/project/showprojects:
 *   get:
 *     tags: [Projects]
 *     summary: Obtener todos los proyectos
 *     description: Devuelve una lista de todos los proyectos
 *     responses:
 *       200:
 *         description: Lista de proyectos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/project/{id}:
 *   get:
 *     tags: [Projects]
 *     summary: Obtener proyecto por ID
 *     description: Devuelve la información de un proyecto específico
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del proyecto
 *         example: "60f1b2b3c4d5e6f7g8h9i0j1"
 *     responses:
 *       200:
 *         description: Proyecto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       404:
 *         description: Proyecto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   
 *   put:
 *     tags: [Projects]
 *     summary: Actualizar proyecto
 *     description: Actualiza la información de un proyecto existente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del proyecto
 *         example: "60f1b2b3c4d5e6f7g8h9i0j1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Proyecto Web E-commerce Actualizado"
 *               description:
 *                 type: string
 *                 example: "Descripción actualizada del proyecto"
 *               leaderId:
 *                 type: string
 *                 example: "60f1b2b3c4d5e6f7g8h9i0j1"
 *               status:
 *                 type: string
 *                 enum: [activado, desactivado]
 *                 example: "activado"
 *     responses:
 *       200:
 *         description: Proyecto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Proyecto actualizado con éxito"
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       400:
 *         description: Error en los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Proyecto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   
 *   delete:
 *     tags: [Projects]
 *     summary: Eliminar proyecto
 *     description: Elimina un proyecto del sistema
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único del proyecto
 *         example: "60f1b2b3c4d5e6f7g8h9i0j1"
 *     responses:
 *       200:
 *         description: Proyecto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Proyecto eliminado con éxito"
 *       404:
 *         description: Proyecto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

// src/routes/issue.route.js - Agregar estas anotaciones

/**
 * @swagger
 * /api/issue/create:
 *   post:
 *     tags: [Issues]
 *     summary: Crear una nueva issue
 *     description: Crea una nueva issue/ticket en el sistema con archivos adjuntos opcionales
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - type
 *               - priority
 *               - project
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Error en el sistema de pagos"
 *               description:
 *                 type: string
 *                 example: "El sistema no procesa correctamente los pagos con tarjeta de crédito"
 *               type:
 *                 type: string
 *                 enum: [Peticion, Tarea, Error]
 *                 example: "Error"
 *               priority:
 *                 type: string
 *                 enum: [Baja, Media, Alta, Critica]
 *                 example: "Alta"
 *               status:
 *                 type: string
 *                 enum: ["Por Hacer", "En Progreso", "En revisión", "Terminada"]
 *                 default: "Por Hacer"
 *                 example: "Por Hacer"
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-31T23:59:59Z"
 *               project:
 *                 type: string
 *                 example: "60f1b2b3c4d5e6f7g8h9i0j1"
 *               assignedTo:
 *                 type: string
 *                 example: "60f1b2b3c4d5e6f7g8h9i0j2"
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Archivos adjuntos (máx. 5 archivos de 5MB cada uno)
 *                 maxItems: 5
 *     responses:
 *       201:
 *         description: Issue creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Issue creada con éxito"
 *                 issue:
 *                   $ref: '#/components/schemas/Issue'
 *       400:
 *         description: Error en los datos enviados o validación
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/Error'
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Los campos 'title', 'description', 'type', 'priority' y 'project' son requeridos."
 *       401:
 *         description: Token no válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/issue/showissues:
 *   get:
 *     tags: [Issues]
 *     summary: Obtener todas las issues
 *     description: Devuelve una lista de todas las issues del sistema con información poblada
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de issues obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 issues:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Issue'
 *       404:
 *         description: No se encontraron issues
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontraron issues."
 *       401:
 *         description: Token no válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/issue/showissues/{id}:
 *   get:
 *     tags: [Issues]
 *     summary: Obtener issue por ID
 *     description: Devuelve la información detallada de una issue específica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID único de la issue
 *         example: "60f1b2b3c4d5e6f7g8h9i0j1"
 *     responses:
 *       200:
 *         description: Issue encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 issue:
 *                   $ref: '#/components/schemas/Issue'
 *       404:
 *         description: Issue no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Issue no encontrada."
 *       401:
 *         description: Token no válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */