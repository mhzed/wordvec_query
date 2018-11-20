#!/usr/bin/env bash
# run client via docker
docker run --rm --network=host  mhzed/wordvec_query client -- --server http://localhost:9999/thrift $@