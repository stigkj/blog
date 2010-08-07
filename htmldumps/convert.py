#!/usr/bin/env python
import re
from BeautifulSoup import BeautifulSoup, NavigableString

MONTHS = [ 'January', 'February', 'March', 'April', 'June', 'July', 'August',
        'September', 'October', 'November', 'December' ]

with open('197', 'r') as f:
    input = BeautifulSoup(f.read())

#print input.find('title').content
title = input.head.title.string.split("&raquo;")[2].strip()

date_string = input.body.find('div', {'class': 'post-info'}).contents[0].split('in')[0].strip()
match = re.match('(.*) (\d{1,2}).*, (\d{4})', date_string)
month_name = match.group(1).strip()
month = int(MONTHS.index(month_name)) + 1
day_of_month = int(match.group(2))
year = int(match.group(3))
date = '%04d-%02d-%02d' % (year, month, day_of_month)

post = input.body.find('div', {'class': 'post'})
post.find('div', {'class': 'post-info'}).extract()

# output the resulting *.textile file
print '---'
print 'title: %s' % title
print 'kind: article'
print 'created_at: %s' % date
print 'author: Vincent Driessen'
print '---'
print ''
for part in post.contents:
    if isinstance(part, NavigableString):
        print part.strip()
    else:
        print ('%s' % part).strip()
