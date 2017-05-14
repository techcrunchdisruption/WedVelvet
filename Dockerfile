FROM node:7.10.0
#FROM node:6.3.1

RUN useradd --user-group --create-home --shell /bin/false appuser

ENV HOME=/home/appuser

#RUN chown -R appuser:appuser $HOME/*

#RUN npm install -g react-vr-cli

USER appuser

WORKDIR $HOME

COPY package.json $HOME/

COPY .babelrc $HOME
COPY .flowconfig $HOME
COPY .watchmanconfig $HOME


#COPY rn-cli.config.js $HOME/
#COPY index.vr.js $HOME/
COPY *.pem $HOME/
COPY *.js $HOME/
COPY package.json $HOME/
COPY vr/ $HOME/vr/
COPY static_assets/ $HOME/static_assets/

RUN npm install
RUN npm cache clean

EXPOSE 8081
EXPOSE 8000

COPY start.sh $HOME/

#CMD ["npm", "start"]
CMD [ "/home/appuser/start.sh" ]
