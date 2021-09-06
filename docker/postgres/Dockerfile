FROM mdillon/postgis

RUN apt-get update \
      && apt-cache showpkg postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR \
      && apt-get install -y --no-install-recommends \
           postgresql-plpython-$PG_MAJOR \
           curl python3.4 python-pip \
      && pip install requests
