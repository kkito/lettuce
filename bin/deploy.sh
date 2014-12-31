#!/bin/bash
rm -rf output
gulp
rsync -av --delete output/ rijx:/var/www/blog/
