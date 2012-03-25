---
layout: blog
category: blog
title: "Unfinished Again"
date: "2012-03-24T19:30:00-07:00"
summary: "This site has been here in some form or other for ten years, most of them as a blog, and seven of those running WordPress. But from time to time you just have to tear it up and start again. Here then begins an adventure in Jekyll-powered, git-stored, version-controlled blogging. Not that it will ever end."
tags: ["technology", "blogging"]
geo:
  name: "San Francisco"
  xy: 37.77493,122.41942
---

At the time of writing, the last entry on this site was posted in 2010. That's quite a long while. I've been blogging in other places instead: Tumblr, mostly. My own site has sat here in digital decay because of the ease of writing in other places.

[In 2005](/blog/wordpress_ldelgdilemmal_delg_switch) I switched away from my initial blogging platform—b2Evolution—and followed my friends to WordPress, which was clearly the way to go. We scoffed at Movable Type for its static page generation and Perl, and none of us really had the time management, inclination, or understanding of blogs as a medium to go and write their own system.

It's worth noting that as far as my experience with writing and technology went, building on WordPress worked out pretty well. I've written more, ever improving content to the point that I'm now quite pleased with my writing ability. I really enjoy the process of it, too. I've had various opportunities to write in other places and for other people as a result of the practice I've gotten from my blog. Currently I'm writing monthly for [The Pastry Box](http://the-pastry-box-project.net).

Then two years ago, my final project for Yahoo involved moving WordPress into their internal infrastructure. I can't understate the benefit of working with code I already know well.

The rot on this domain started for a handful of reasons, that in the shiny gleam of a new site are worth covering. It reflects the shift in what's important about writing on the web for me.

## Syntax.

I set up WordPress with Textile, so all my posts from 2004 through 2010 are written up in that syntax. But I found a preference for writing in Markdown; a cleaner, more logical syntax for my tastes. I needed a system that would support the old and new syntax choices simply.

## Comments.

The commentary on commentary has hit popularism this year, but it boils down to three tangential things that arrive in the same place:

* Often the quality of comments left on a site are low. Of those that are of high quality, they're trapped in a packed stream of all the others.
* Filtering spam is a ridiculous pass-time.
* Philosophically, I'm an own your words kinda guy. I think that ideally, everyone should have their own space on the web and they should respond to one another by expanding discussion with something of substance. I think that since hosted blog services are now commodities: Tumblr, WordPress, Posturous, et al, and that this is an accessible enough option for people. For communicating the proliferation of these distributed discussions (and for pieces of feedback that don't warrant an entire post), we have made up for the automated spam infested failures of Trackback and Pingback with the manual, personal success of Twitter.

Together, these justify not having comments on my blog. All the old discussions are still here—of course—and all have their original `#comment-1234` permalinks on the pages, but they've been exported into the entries now, and I'm not hosting any subsequent discussion.

<aside>All that said, a curious thing happened in the course of rebuilding all my pages though, which is that I went and read a lot of old comments and found them regularly delightful. I wouldn't say that my removal of the function is necessarily final.</aside>

In place of commenting on the site, I'd like people to message me on Twitter (<a href="https://twitter.com/intent/tweet?related=BenWard&amp;screen_name=BenWard">like this</a>), or other systems (email, IM, etc.), and simply tell me about interesting follow-ups they have or have seen. I'm an admirer of other sites (such as [Matt Gemmell](http://mattgemmell.com/2011/11/29/comments-off/)'s, and [John Gruber](http://daringfireball.net)'s) who don't have comments, but who make an effort to post follow-up entires documenting expansion and dissent. I'd like to give it a try.

## Back-up Paranoia

The third big reason for wanting to move from WordPress is that I want to continue self-hosting my blog, on a VPS host, with all of the benefits of running my own software persistently on the internet, but I wanted to lower the risk to the content I've written. WordPress runs in a MySQL database. That database needs to be backed up often. I am negligent about doing this. Therefore, an architecture that enables me to keep my content safer is preferable.

This time, the answer to that is git. Git's nature as a decentralized system means that everywhere the repository is checked out, all the data is there too. So on my Mac where I'm writing this post there's an entire back-up of my site. I'm storing the repository for my site on GitHub, so there's another copy there (plus whatever back-up strategy they have in place.) Then there's another remote copy of my site on my webserver itself. Three copies easily created just to write a post. If I edit a post from the office, I'll automatically create another back-up there, too.

The second benefit of the content being in git rather than a database is that the posts now exist not as a query of multiple tables, but as a single denormalised text file. The content of the posts and their metadata are accessible even after the front-end of the site is gone. It's crude, but also intrinsically robust. With growing collective awareness of how frail the internet is (see [Archive Team](http://www.archiveteam.org)) this is a quality I value above most others. It's logical to build this next experiment with my own site with that value at the center.

---

There's an awful lot more to cover about the how and why of building a site this way. There are costs to it to, of course. For now though, I'm really pleased with my redesign. There's infinitely more to do, but I rather hope you like what I've done with it. There's a lot more to write, so here are some forthcoming posts that you should hassle me about if it seems like too much time has passed:

* Experience with Jekyll, ruby, git and how everything currently in the back works. There are various hacks and plug-ins I've made for Jekyll I can repackage and share.
* The design philosophy behind the site. It's very simple, and I want to draw attention to how and why. There's no numerical pagination, for example.
* The downsides. Of course, there's a cost to a crude data storage system, and one reliant on git, of all things. I need to write up the limitations I planned for, the ones I ran into later, and how I plan to fill the gaps.