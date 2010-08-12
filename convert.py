#!/usr/bin/env python
import htmlentitydefs
import re
from BeautifulSoup import BeautifulSoup, NavigableString

import os
os.chdir(os.path.join(os.path.dirname(__file__), 'htmldumps'))

MONTHS = ['January', 'February', 'March', 'April', 'June', 'July', 'August',
        'September', 'October', 'November', 'December']


def my_unescape(text):
    text = text.replace('&#8217;', "'")
    text = text.replace('&#8220;', '"')
    text = text.replace('&#8221;', '"')
    text = text.replace('&#151;', '--')
    text = text.replace('&quot;', '"')
    return unescape(text)

def unescape(text):
    def fixup(m):
        text = m.group(0)
        if text[:2] == "&#":
            # character reference
            try:
                if text[:3] == "&#x":
                    return unichr(int(text[3:-1], 16))
                else:
                    return unichr(int(text[2:-1]))
            except ValueError:
                pass
        else:
            # named entity
            try:
                text = unichr(htmlentitydefs.name2codepoint[text[1:-1]])
            except KeyError:
                pass
        return text # leave as is
    return re.sub("&#?\w+;", fixup, text)


def convert_file(fname):
    with open(fname, 'r') as f:
        input = BeautifulSoup(re.sub('-[0-9]+x[0-9]+\.png', '.png', f.read()))

    title = input.head.title.string.split("&raquo;")[2].strip()

    date_string = input.body.find('div', {'class': 'post-info'}) \
            .contents[0].split('in')[0].strip()
    match = re.match('(.*) (\d{1,2}).*, (\d{4})', date_string)
    month_name = match.group(1).strip()
    month = int(MONTHS.index(month_name)) + 1
    day_of_month = int(match.group(2))
    year = int(match.group(3))
    date = '%04d-%02d-%02d' % (year, month, day_of_month)

    post = input.body.find('div', {'class': 'post'})
    post.find('div', {'class': 'post-info'}).extract()

    # output the resulting *.textile file
    meta = {}
    meta['title'] = title
    meta['author'] = 'Vincent Driessen'
    meta['kind'] = 'article'
    meta['created_at'] = date
    return (date, meta, convert(post))


def strip_tags(fragment):
    if isinstance(fragment, NavigableString):
        return unicode(my_unescape(fragment))
    strings = [strip_tags(part) for part in fragment.contents]
    return filter(lambda c: ord(c) <= 127, ''.join(strings))


def make_relative(link, subdir='img'):
    strip_pattern = r'^http://nvie\.com/wp-content/uploads/([0-9]{4})/([0-9]{2})/(.*)$'
    if re.match(strip_pattern, link):
        dir = re.sub(strip_pattern, r'content/%s/\1/\2' % subdir, link)
        outputfile = re.sub(strip_pattern, dir + r'/\3', link)
        outputurl = re.sub(strip_pattern, r'/%s/\1/\2/\3' % subdir, link)
        print '(if [ ! -f "%s" ]; then mkdir -p "%s"; wget -O "%s" "%s"; fi)' % (outputfile, dir, outputfile, link)
        return outputurl
    else:
        return link

def convert(fragment):
    if isinstance(fragment, NavigableString):
        return unicode(my_unescape(fragment)).replace('\n', '')

    id = cls = ''
    if fragment.has_key('class'):
        cls = fragment['class']
    if fragment.has_key('id'):
        id = '#' + fragment['id']
    if cls or id:
        attrs = '(%s%s)' % (cls, id)
    else:
        attrs = ''

    if fragment.has_key('style'):
        attrs += '{%s}' % fragment['style']

    content = None
    prefix = suffix = ''
    strip_content = False
    n = fragment.name
    if n in ['pre']:
        langclass = preclass = ""
        if fragment.has_key('class'):
            classes = fragment['class'].split()
            if len(classes) > 1:
                preclass = ' class="%s"' % ' '.join(classes[1:])
                langclass = ' class="language-%s"' % classes[0]
            else:
                langclass = ' class="language-%s"' % fragment['class']
        code = strip_tags(fragment)
        content = '\n\n<pre%s><code%s>%s</code></pre>\n\n' % (preclass, langclass, code)
    elif n in ['script', 'table']:
        return "\n%s\n" % unicode(fragment)
    elif n in ['p', 'div']:
        prefix = "\n\n"
        suffix = "\n"
    elif n in ['blockquote']:
        prefix = '\n\nbq. '
        strip_content = True
        suffix = '\n\n'
    elif n in ['code']:
        prefix = suffix = '@'
    elif n in ['br']:
        prefix = "\n"
    elif n in ['h1']:
        content = ''  # skip H1
    elif n in ['h2', 'h3', 'h4', 'h5', 'h6']:
        prefix = "\n\n%s%s. " % (n, attrs)
        suffix = "\n"
    elif n in ['ul']:
        prefix = '\n\n'
        suffix = '\n'
    elif n in ['li']:
        prefix = '* '
        suffix = "\n"
    elif n in ['ol']:
        prefix = '# '
        suffix = "\n"
    elif n in ['a']:
        prefix = '"'
        suffix = '":%s' % make_relative(fragment['href'])
    elif n in ['img']:
        content = "!%s!" % make_relative(fragment['src'])
    elif n == 'b':
        prefix = suffix = '**'
    elif n == 'strong':
        prefix = suffix = '*'
    elif n in ['i', 'em']:
        prefix = suffix = '_'
    elif n == 'ins':
        prefix = suffix = '+'
    elif n == 'del':
        prefix = suffix = '-'
    else:
        prefix = '%s%s. ' % (n, attrs)

    if not content is None:
        return content

    result = []
    for part in fragment.contents:
        result.append(convert(part))
    joined = ''.join(result)
    if strip_content:
        joined = joined.strip()
    joined = prefix + joined + suffix
    joined = re.sub("\n{3,}", "\n\n", joined)
    return joined


if __name__ == '__main__':
    import sys
    import codecs
    if len(sys.argv) > 1:
        filelist = [sys.argv[1]]
    else:
        filelist = [#'published/197',   # already converted
                    #'published/243',
                    #'published/263',
                    #'published/310',
                    #'published/319',
                    #'published/343',
                    'published/420',
                    'published/435',
                    'published/438',
                    'published/470',
                    'published/492',
                    'draft/515',
                    'draft/537',
                   ]

    count = 0
    for file in filelist:
        created_at, meta, text = convert_file(file)
        status, basename = os.path.split(file)
        meta['status'] = status
        meta['alt_url'] = '/archives/%s' % basename
        output = '../content/posts/%s-%s.textile' % (created_at, \
                meta['title'] \
                        .replace('.', '') \
                        .replace(',', '') \
                        .replace(' ', '-'))

        #print "Writing %s..." % output.replace('../', '')
        count += 1
        f = codecs.open(output, encoding='utf-8', mode='w')
        f.write('---\n')
        for key, val in meta.items():
            f.write('%s: %s\n' % (key, val))
        f.write('---\n')
        f.write(text.strip())
    #print "Converted %d blog posts." % count
