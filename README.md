# Trabajo de Título

Este es mi trabajo de memoria para optar al título de ingeniera civil informática.

## Estructura

El proyecto está compuesto de tres aplicaciones:

1. Base de Datos en POSTRESQL. En back_end/db/db_dump se encuentra el respaldo más reciente.
2. API en Apollo Server (GraphQL) en back_end/graphql-api/. 
3. Frontend en Gatsby (basado en NodeJS) en front_end/.

## Instrucciones

`Nota: proyecto funcional en Ubuntu 20.04.1 LTS.`

`Requisitos: tener instalado docker versión 20.10.2+ y docker-compose versión 1.25.0+.`

1. Clonar el repositorio de Github.
2. En la raíz correr los siguientes tres comandos por separado como administrador:

```
$ docker-compose build
```
```
$ docker-compose up -d
```
```
$ docker exec db_container pg_restore --dbname=db_memoria --username=postgres /docker-entrypoint-initdb.d/dump-db_memoria-202101082020.sql --clean
```

Ahora la aplicación está disponible en localhost:8000.

Adicionalmente la interfaz gráfica de GraphQL queda diponible en localhost:4000 para hacer consultas sobre los datos.

Aparte, la aplicación se encuentra disponible en visualizaciones-congreso.lc-ip81.inf.utfsm.cl y la interfaz gráfica de GraphQL en datos-congreso.lc-ip81.inf.utfsm.cl.