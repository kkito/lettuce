#!/bin/bash
rm -rf output
npm run build
# rsync -avc --delete output/ rijx:/var/www/blog/
rsync -avc output/ rijx:/var/www/html/
