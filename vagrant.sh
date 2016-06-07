#!/bin/bash
echo '---- Provisioning the vm -----'
    sudo apt-get install -y git build-essential nodejs tmux

echo '---- Installing RVM -----'
    gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3
    \curl -sSL https://get.rvm.io | bash
    source /home/vagrant/.rvm/scripts/rvm

echo '---- Installing RVM and ruby -----'
    rvm install ruby-2.3.1
    gem install bundler

echo '---- Installing PG -----'
    sudo /usr/sbin/update-locale LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8
    sudo apt-get install -y postgresql libpq-dev
    sudo su - postgres -c "createuser vagrant"
    sudo su - postgres -c "psql -c 'alter role vagrant CREATEDB;'"

echo '---- Installing nodejs -----'
    curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
    sudo apt-get install -y nodejs

echo '---- setup the rails server -----'
    cd /vagrant
    npm install bower
    npm install
    bundle
    bin/rake db:create
    bin/rake db:migrate