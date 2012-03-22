# Hack the YAML parser back into syck, since psych has problems
require 'yaml'
YAML::ENGINE.yamler = 'syck'