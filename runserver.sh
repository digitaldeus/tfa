#!/bin/bash

echo "----- starting the server -----"
#sudo iptables -P INPUT ACCEPT
#sudo iptables -P OUTPUT ACCEPT
#sudo iptables -F
cd /vagrant
bundle
npm install

tmux new -s rails -d
tmux send-keys -t rails 'rails s -b 0.0.0.0' C-m