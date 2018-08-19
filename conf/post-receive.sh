#!/bin/sh

# This script is a rather hacky post-receive hook used on my production server to
# rebuild the site when I commit to a dedicated 'live' repo

# We're about to operate on a different repo clone
unset GIT_DIR

# Redeploy benward.uk Jekyll site
DEPLOY_LOCATION=/var/www/benward
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# Move to deploy location, clean and pull updates
cd $DEPLOY_LOCATION
git reset --hard -q
git pull -q

# rebuild Jekyll
bundle exec rake build

# Fix permissions to serve content as www
chown -R benward:www $DEPLOY_LOCATION

echo
echo "benward.uk updated"
