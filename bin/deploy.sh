#!/bin/bash
rm -rf output
gulp
rsync -avc --delete output/ rijx:/var/www/blog/
