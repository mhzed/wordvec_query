#!/usr/bin/env bash

# run server via docker
cd ${0%/*}

# specify configs below
HOST_PORT=9999
LOCAL_DATA_DIR="$(pwd)/word.vec.data"
LOG_FILE=/tmp/$JOB_NAME.log
# configs end

JOB_NAME=`basename $0 .sh`
OPT="-p $HOST_PORT:9999 -v $LOCAL_DATA_DIR:/data"
IMAGE="mhzed/wordvec_query "

CMD="docker run -d -l $JOB_NAME $OPT $IMAGE server -- -p 9999 -a --data /data"
RUNNING=
DOCKERID=`docker ps -qa --filter label=$JOB_NAME`
if ! [ -z "$DOCKERID" ]; then
  if [ "$DOCKERID" == "`docker ps -q --filter label=$JOB_NAME`" ]; then
    RUNNING=1
  fi
fi

case $1 in
  start)
    if [ -z "$RUNNING" ]; then
      if [ -z "$DOCKERID" ]; then
        $CMD
      else
        docker start $DOCKERID
      fi
    else
      echo "Already running"
    fi
    ;;

  stop)
    if [ -z "$RUNNING" ]; then
      echo "Not running"
    else
      docker stop $DOCKERID
    fi
    ;;
  restart)
    if [ ! -z "$RUNNING" ]; then
      docker stop $DOCKERID
    fi
    docker start $DOCKERID
    ;;

  log)
    echo "Attaching to container to display stdout, ctrl-c to exit"
    docker attach --sig-proxy=false $DOCKERID
    ;;

  status)
    if [ -z "$RUNNING" ]; then
      if [ -z "$DOCKERID" ]; then
        echo "Not created"
      else
        echo "Not running"
      fi
    else
      echo "Running"
    fi
    ;;

  *)
    scriptname=`basename $0`
    echo "Usage: $scriptname {start|stop|status|log}"
    ;;

esac
exit 0