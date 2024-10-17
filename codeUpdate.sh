#!/bin/bash
cwd=`pwd`
BASEDIR=`pwd`

prepareforUpdate() {
    cd $BASEDIR
    git pull origin main
}

updateCode() {
    cd $BASEDIR
    npm run build
    cp -r dist/* /home/ubuntu/FrontEnd/vsystech-ui/dist/
}


restartServices() {
    sudo systemctl restart nginx
    sleep 5
}


prepareforUpdate
updateCode
restartServices
#
