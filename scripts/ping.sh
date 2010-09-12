#!/bin/sh
(curl -s 'http://feedburner.google.com/fb/a/pingSubmit?org.apache.struts.taglib.html.TOKEN=24aab68d458a943935b504586da7b3d0&bloglink=http://dev.nvie.com' | grep -q 'Successfully pinged') && echo "Ping OK. Feedburner now has new content." || echo "Ping failed. Feedburner not updated."
