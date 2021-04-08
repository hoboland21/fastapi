FROM python:3.8.9-alpine

WORKDIR /usr/src/app/pdata
COPY  requirements.txt /usr/src/app/pdata

RUN apk update  && \ 
	apk add --no-cache tzdata &&\
	apk add mc gcc make libc-dev musl-dev linux-headers pcre-dev mariadb-dev build-base postgresql-dev 

RUN pip install --upgrade pip

RUN	pip install -r requirements.txt 

ENV TZ=America/Los_Angeles
