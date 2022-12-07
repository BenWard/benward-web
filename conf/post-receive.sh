#!/bin/sh

# This script is a rather hacky post-receive hook used on my production server to
# rebuild the site when I commit to a dedicated 'live' repo

# Before this will function, do the following:
#
# Ensure that the `www` group exists, and that you (benward) are a member; otherwise the chmod will fail without sudo
# Install bundler, and configure it to install gems locally in the project directory

# User this var as we're about to operate on a different repo clone
unset GIT_DIR

# Redeploy benward.uk Jekyll site to /var/www/benward
DEPLOY_LOCATION=/var/www/benward
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# Move to deploy location, clean and pull updates
cd $DEPLOY_LOCATION
git reset --hard -q
git pull -q

# update dependencies
bundle

# rebuild Jekyll
bundle exec rake build

# Fix permissions to serve content as www
chown -R benward:www $DEPLOY_LOCATION

echo
echo "benward.uk updated"
