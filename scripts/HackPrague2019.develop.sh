#!/bin/bash

getScriptPath () {
    echo ${0%/*}/.
}
currentPath=$(getScriptPath)
cd $currentPath
cd ..

#todo auto open Developer tools command--devtools is not working for me
firefox --browser http://localhost:3000/api/v1/
nautilus .
code .

#todo maybe with disown - gnome-terminal & disown
gnome-terminal -- npx concurrently "gnome-terminal --tab -- npm run server-watch" "gnome-terminal --tab -- npm run prettier-watch"
