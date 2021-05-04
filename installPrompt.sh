#!/bin/bash

# Re-enables the keyboard input (https://github.com/typicode/husky/issues/597)
exec < /dev/tty

read -n1 -p "Run $1? (y/n): " ANSWER 
echo '' # For the new line

case $ANSWER in  
  y|Y) exit 0 ;; 
  n|N) exit 1 ;; 
esac

exit 0