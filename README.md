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
* SALT_ROUNDS = Salt rounds para generar hash de documentos y reset de claves
* TOKEN_KEY = clave para generar el JWT
* BASE_PATH = path a la raiz del proyecto, se utiliza para la subida y bajada de archivos
* MX_HOST = host del servidor smtp de mail
* MX_PORT = puerto del servidor smtp de mail 
* MX_USER = usuario del servidor smtp de mail 
* MX_PASSWORD = clave del servidor smtp de mail 


### Documentos

Dentro de ```BASE_PATH/static/files``` se crean carpetas cuyos nombres serán los cuil de cada usuario, en las mismas se deben depositar los documentos correspondientes a cada uno.

Los documentos se retornarán ordenados de acuerdo a su nombre.


### Banners

Dentro de ```BASE_PATH/static/banners``` se deben crear carpetas cuyos nombres serán dependerán del orden del banner al que se refiere, y se deberán depositar allí los banners correspondientes a cada uno.

En el siguiente Ejemplo se muestra una estructura de carpetas para 3 banners: 

``` 
.../static/banners/1
.../static/banners/2
.../static/banners/3
``` 

Los nombres de los banner deberán cumplir con el siguiente formato:

AAAAMMDD-AAAAMMDD.extensión, donde el primer AAAAMMDD corresponde a la fecha de inicio en que el banner se comenzará a mostrar y el segundo AAAAMMDD corresponde a la última fecha en que el banner se mostrará.

En el caso de que dos archivos se solapen en los períodos de muestra para el mismo banner, el sistema retornará el primero que sea detectado.

Las extensiones permitidas para los banners son: 
* png
* svg
* gif
* jpg
* webp




