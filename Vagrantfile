# -*- mode: ruby -*-
# vi: set ft=ruby :

$script = <<SCRIPT

apt-get update -y
apt-get install apache2 libapache2-mod-php5 -y
a2enmod php5
echo "ServerName localhost" | tee /etc/apache2/conf.d/fqdn
cp /etc/apache2/ports.conf /etc/apache2/ports.bak
sed 's/80/8080/' /etc/apache2/ports.bak > /etc/apache2/ports.conf
cp /etc/apache2/sites-enabled/000-default /etc/apache2/sites-enabled/000-default.bak
sed 's/80/8080/' /etc/apache2/sites-enabled/000-default.bak > /etc/apache2/sites-enabled/000-default
service apache2 restart

SCRIPT


VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
	config.vm.box = "precise64"
	config.vm.synced_folder "./", "/var/www"
	config.vm.network "forwarded_port", guest: 8080, host: 8080

	config.vm.provision "shell", inline: $script
end