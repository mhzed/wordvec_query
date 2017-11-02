wordvec_query
--------

The wordvec query service.

The nmslib doesn't work.

The annoy version works.

## index/server

Index example:

    node src/index.js --annoy -t 50 ../extern/glove.6B/glove.6B.300d.txt

Server example:

    node src/server.js -p 9999 -a --data ../extern/glove.6B
    
Client example:

    node src/client.js --server localhost:9999 "wikipedia"    
