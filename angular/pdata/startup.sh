
if [ ! -d fastapi ] ; then 
ng new fastapi --routing --defaults=true
fi
cd fastapi
npm install
#ng build --prod --output-path /usr/src/app/django/survey/static/ang/main  --watch --output-hashing none
ng serve --host 0.0.0.0 --disable-host-check
