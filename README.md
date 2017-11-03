wordvec_query
--------

Provides interface (apache thrift) for wordvec lookup and find nearest neighbors.

The nmslib relies on the nmslib docker container, but the results seem all wrong, and 
the indexing speed is unbearably slow.

The annoy version works well.

## index/server

Index example:

    node src/index.js --annoy -t 50 ../extern/glove.6B/glove.6B.300d.txt

Server example:

    node src/server.js -p 9999 -a --data ../extern/glove.6B
    
Client example:

    node src/client.js --server localhost:9999 "wikipedia"    
