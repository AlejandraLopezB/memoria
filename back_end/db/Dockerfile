FROM postgres:12.5

ENV POSTGRES_PASSWORD bdpass 
ENV POSTGRES_DB db_memoria

COPY ./db_dump/dump-db_memoria-202101082020.sql /docker-entrypoint-initdb.d/