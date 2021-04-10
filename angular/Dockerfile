FROM alpine

WORKDIR /usr/src/app/pdata
RUN apk update  && \
	apk add npm mc  && \
	npm install -g @angular/cli && \
	npm install -g jwt-decode && \
	apk add --no-cache tzdata	
ENV TZ=America/Los_Angeles
