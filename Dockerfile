FROM node:8.9.3-stretch as build
#ENV http_proxy=http://192.168.65.1:14891
#ENV https_proxy=http://192.168.65.1:14891
COPY . /wordvec_query
RUN cd /wordvec_query && npm install --production

FROM node:8.9.3-slim
COPY --from=build /wordvec_query /wordvec_query
WORKDIR /wordvec_query
ENTRYPOINT ["npm", "run"]



