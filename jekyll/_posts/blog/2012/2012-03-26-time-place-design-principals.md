---
layout: blog
category: blog
title: "Time and Place. Foundations for a new blog."
date: "2012-03-26T23:03:13-07:00"
summary: "In stripping everything back and starting the blog anew, I've been able to cherry pick what's really important to me in terms of metadata and display, and try to present new posts in a way that I think is best for content on the web. Categories, timestamps, locations, timezones and more have all been considered."
tags: ["blogging"]
geo:
  name: "San Francisco"
  xy: "37.77493,122.41942"
---

Perhaps the most exciting moment when I started moving content out of WordPress—and the thing that pushed me over the edge to actual make this project happen—was the realization that I could reformat all of my posts metadata, not just the content. That sounds like a strange, tangential thing to get excited over. It's  certainly nerdy. But, over the years I've moved the location of my webserver multiple times, I've moved *myself*, and I've experimented with all manner of plugins that had appended tags and hidden fields of miscellaneous value and interest to my WordPress database. It was all just buried in there.

In extracting these buried fields and denormalising them into my post files I was able to think—as a purist—about how posts should be represented online. Especially for my circumstances. I have opinions, y'see.

## The Base Aesthetics

A quick note about the new look of the blog. It's actually much more of an aesthetic design accomplishment than I was planning. My previous site had approximately half a stylesheet, making text vaguely legible. This time around, starting from scratch I found myself doing a lot better for my limited visual design abilities.

I carry with me now a basic set of rules about design that I've learned, understand, and like. They are things like: 35ems being an optimal line length for reading, using a cleanly divisible grid, and being generous with whitespace. I also have some amount of taste, albeit quite unambitious in terms of visual expression (I work well with shades of grey.) So, that's the basis of the site: 35em single column content, and 32px as the default margin and padding unit (breaking down to 16px and 8px, and occasionally 24px when wanting to deliberately break out of the alignment. Everything else is really rather simple. CSS3's box shadows add a little artistic polish without requiring much actual skill.

I finally went and used [TypeKit](http://typekit.com), picking out [Museo Sans](https://typekit.com/fonts/museo-sans) (which is a strong favourite of mine, especially since the Elements text editor on iPhone and iPad employs it) and [Acuta](https://typekit.com/fonts/acuta), because I wanted serif body text, and a bit of variation from Georgia. I quite like the angles, although I'm not entirely comfortable with it yet.

Finally, I followed another increasingly mature design pattern that's both nice in its own right, and also a lifesaver for the chromaphobic, of the large-header, ‘cover’ image. I'll change that around quite often I'm sure, but the current image is of a defunct record shop on 24th Street in San Francisco. One thing I do love about America is the aesthetic of big old store front signs like these.

## Time and Place

The most important design effort on this blog concerns time. We throw a timestamp on most things on the web, but the usefulness of it is regularly diminished. This a blog with entries now spanning eight years. The things I wrote about, the way I wrote about them, stylistically and emotionally has changed, sometimes uncomfortably so. When I put something out onto the internet though, it's gone. It will be archived, spidered, and cached. If I look back at something I wrote in public and feel awkward, the best I can hope for is to represent my past work clearly in its correct context. As much as anything, this means that it's vital the timestamp be displayed at the *top* of each post, not in the as some blogs do.

Time on blogs is also interesting. I don't write very frequently, so as a differentiator a date would be sufficient. But the rest of a timestamp is so *interesting*. The time of day that I write can tell you so much about a piece. It's a tiny, but incredibly valuable insight to see if a post was written in the middle of the night, or published at a sober hour in the middle of the day. A blog gives you the freedom to say things spontaneously, sometimes rashly. Given that, I think it aids a reader to see when you were writing; to help understand your state of being.

The second piece of context which certainly doesn't apply to every writer, but which I also find fascinating, is the timezone. It is nerdy, for sure. A positive or negative number. It communicates a certain formality, too. But in with a library of posts that straddles two continents and countless holidays and conference trips, including the timezone in my article headers allows for another bit of relevant, interesting information. In newer posts I'm adding a geotag to the post, too.

I like this consistent device that illustrates when I'm on the West Coast (-0700, -0800), East Coast (-0500, -0400), or back in the UK (-0000, +0100). I also think I prefer the use of numerical zones over colloquial names (PDT, GMT, EST, etc.) Not least because I never remember which one is which, or how it relates.

<aside>Something I've really wanted for a long time on Twitter—where I work—is for us to store not just the UTC time of the Tweet, but also the local time. A huge number of notable events play out on Twitter, and it's a shame to me that all the timestamps are localised to the reader, not the author. Consider reading the eyewitness Tweets of the raid and assassination of Osama Bin Laden is much more meaningful if the timestamps of those messages reflect the local early morning, rather than the American mid-evening.</aside>

## The History of Time

The second, extremely important design decision around time concerns accessing older content. Ordinarily this isn't a very complicated concern, since whatever blog CMS you're running will surely generate an endless list of pages, calendar archives and indexes by keyword or category simultaneously.

A cost and benefit of building the new site with [Jekyll](http://jekyllrb.com/) was that this functionality is not all available out of the box, and enabling more of it has costs in terms of site generation time.

In early drafts, I did what one usually does with a blog, and enabled the pagination module, churning out a numbered history. But, I **hate** that.

Numbered pagination is *just awful*. It allows an interested visitor access to your older posts in the crudest fashion, but even when WordPress generated pretty URLs for `/page/1` and `/page/33` those URLs are useless. Every time I add a new post (or erase one), the content of every single page changes! What's on page ‘2’ today won't be in a month. You can partially fix it by reversing your numbering scheme (i.e. ‘page 1’ is actually the oldest posts) but it still breaks down if you remove an older post. There is no value to these pages in this form, and Jekyll gave me an opportunity to dump them for something much, much better.

Instead, I've crafted a simple, logical, time-delimited archive. You can list every post from a [year](/2010), and every post from [each month](/2012/03) in that year. At any point you can navigate upwards (from post to month, from month to year) and the ‘next page’ link at the foot of the index page will instead drop you into the archive at the point of the final post (so you don't need to click back through the archives of posts you've already seen summaries of.)

It's not complex, but these pages are meaningful. If a post is added or removed, only the content of one page changes; there's no ricochet into unrelated content. I also really like that there is only *one* archive. Rather than a duplicated paginated archive, and a calendar-based archive, and a tag archive, and a category archive.

I've not been and cleaned or modularised most of my Jekyll hacks yet, and I really need to. One advantage of a system that builds the site statically is that there's a low cost to being scrappy. Anyway, if you're at all curious in the interim, [it's up on GitHub](https://github.com/BenWard/benward/tree/master/jekyll).

---

So, that's the when and why of this new site.