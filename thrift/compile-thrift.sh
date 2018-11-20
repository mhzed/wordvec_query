#!/usr/bin/env bash

../node_modules/.bin/thrift-typescript --rootDir . --sourceDir nmslib --outDir nmslib protocol.thrift
../node_modules/.bin/thrift-typescript --rootDir . --sourceDir . --outDir . vecquery.thrift
