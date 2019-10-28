#!/bin/bash
exec < /dev/tty

read -n1 -p "Run npm install? (y/n): " ANSWER 
echo '' # For the new line

case $ANSWER in  
  y|Y) exit 0 ;; 
  n|N) exit 1 ;; 
esac

exit 0