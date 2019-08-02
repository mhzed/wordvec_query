wordvec_query
--------

Provides interface (apache thrift) for wordvec lookup and find nearest neighbors.

Uses leveldb for word/vector lookup.  Uses annoy for nearest vector neighbours lookup.

## Setup

Install https://yarnpkg.com/

Then install dependencies by runing in this directory:

    yarn

Recommend to use Visual Studio Code as IDE, https://code.visualstudio.com

Project is implented in typescript, http://www.typescriptlang.org

## index/query

The input file format should be:

1. text file, one line per word
2. N tokens deliminated by whitespace(s) per line
3. first token is the word
4. subsequent tokens are the values in the vector for the word
5. number of tokens per every line must be the same

After indexing, the file is converted to:

1. a level db providing two eay word <-> vector lookup
2. an annoy db for nearest neighbor (cosine similarity) vectors lookup

Index example:

    node src/index.js --annoy -t 50 ../extern/glove.6B/glove.6B.300d.txt

Then launch the query server on the indexed data:

Example:

    node src/server.js -p 9999 -e -a --data ../extern/glove.6B
    # the docker equivalent
    docker run --rm -v /host/path/to/data:/data -p 9999:9999 mhzed/wordvec_query server -- -p 9999 -a --data /data

To query the server via command line:

    node src/client.js --server http://localhost:9999/thrift "wikipedia"
    # the docker version
    docker run --rm mhzed/wordvec_query client -- --server http://docker.for.mac.localhost:9999/thrift "wikipedia"

To query the server from whatever language you prefer, the protocol is defined in file ./thrift/vecquery.thrift.  Use Apache thrift
to compile the protocol into the language choice you prefer.

## Devlopment

The full build command is

    # fish
    npm run peg;npm run compile-thrift;npm run compile;npm run test

    # bash
    npm run peg && npm run compile-thrift && npm run compile && npm run test