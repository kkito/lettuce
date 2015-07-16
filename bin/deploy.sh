#!/bin/bash
rm -rf output
gulp
# rsync -avc --delete output/ rijx:/var/www/blog/
rsync -avc output/ rijx:/var/www/blog/
