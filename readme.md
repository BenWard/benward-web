# `viewsource://benward.uk`

This repo is my personal site, all of it. Everything you can see already in public already at [benward.uk](http://benward.uk) is here in raw form, such that you might learn from it.

The site is built statically, using [Jekyll](http://jekyllrb.com), and all of that is inside the `/jekyll` subdirectory. There's templates, configuration, a rudimentary `Rakefile` for some basic post operations, and a directory of scrappy hacks that augment the standard Jekyll gem. They're not documented yet, and they really need to be broken out into separate gems in their own right, but one advantage of a static site generator is that there's a low cost to unoptimised, hacky code when all you're trying to do is relaunch your blog. Anyway, please learn from it, or teach me things, too.

## Licensing

This repo contains mixed content.

* Any text file ending in a `.css`, `.md`, `.html`, or `.textile` extension, and binary files, are by default Copyright All Rights Reserved by me, Ben Ward. These are the design elements, pages, and articles published on my site, and you need my permission to reproduce them. By all means, ask.
* Ruby code, YAML configurations and Liquid templates (which are the .html files contained within the `_layouts` directory) are free for you to use however you wish. A line of attribution would be lovely, but do whatever's appropriate.

If you clone the repo to work with your own Jekyll set-up, please erase the `_posts` directory and use your own stub content. That way no-one has any accidental publishing accidents.

## Enjoy!

Plugin code really does need a refactor, but if they help you learn a little about how Jekyll's internals work, or how to augment them with Ruby, then that's all for the better.

Ben <https://benward.uk>
