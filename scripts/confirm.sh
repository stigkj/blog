#!/bin/sh
echo "Really publish this to http://nvie.com?  Type 'yes'."
read FOO
[[ "$FOO" = 'yes' ]]
