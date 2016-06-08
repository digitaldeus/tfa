#!/bin/bash

echo "----- starting the server -----"
cd /vagrant
bundle
npm install

tmux new -s rails -d
tmux send-keys -t rails 'rails s -b 0.0.0.0' C-m