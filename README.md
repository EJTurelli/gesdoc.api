# Gesdoc API

Api del proyecto Gesdoc

## Instalación

```npm i```

## Importante

### Variables de entorno a definir

* API_PORT = puerto en que se expondrá la API
* DB_HOST = host donde funcionará la base de datos
* DB_PORT = puerto de conexión a la base de datos
* DB_USER = usuario de conexión a la base de datos
* DB_PASSWORD = clave de conexión a la base de datos
* DB_DATABASE = nombre de la base de datos
* PASS_SALT_ROUNDS = Salt rounds para generar el hash de las claves
* FILES_SALT_ROUNDS = Salt rounds para generar el hash de los documentos
* TOKEN_KEY = clave para generar el JWT
* BASE_PATH = path a la raiz del proyecto, se utiliza para la subida y bajada de archivos

### Documentos

Dentro de ```BASE_PATH/static/files``` se crean carpetas cuyos nombres serán los cuil de cada usuario, en las mismas se deben depositar los documentos correspondientes a cada uno.


