#!/bin/sh
(curl -s 'http://feedburner.google.com/fb/a/pingSubmit?bloglink=http://dev.nvie.com' | grep -q 'Successfully pinged') && echo "Ping OK for dev.nvie.com. Feedburner now has new content." || echo "Ping failed for dev.nvie.com. Feedburner not updated."
(curl -s 'http://feedburner.google.com/fb/a/pingSubmit?bloglink=http://nvie.com' | grep -q 'Successfully pinged') && echo "Ping OK for nvie.com. Feedburner now has new content." || echo "Ping failed for nvie.com. Feedburner not updated."
