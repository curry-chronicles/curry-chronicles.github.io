FROM centos:centos7
LABEL   MAINTAINER="curry-chronicles team" \
         IMAGE_NAME="curry-chronicles-back"

ARG RPMS='nodejs'

WORKDIR /opt

RUN mkdir curry-chronicles &&\
    curl -sL https://rpm.nodesource.com/setup_10.x | bash - &&\
    rpm --rebuilddb &&\
    yum install -y --nogpgcheck ${RPMS} &&\
    yum -y clean all

WORKDIR /opt/curry-chronicles

COPY package.json .
COPY package-lock.json .
COPY src src

RUN chmod -R 755 /opt &&\
    npm install

EXPOSE 3000

ENTRYPOINT ["npm", "run", "release"]
