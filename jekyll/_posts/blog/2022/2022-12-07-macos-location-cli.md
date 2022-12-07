---
layout: blog
category: blog
title: Using macOS location on the command line
date: '2022-12-07T00:22:52-08:00'
summary: "As part of reviving this blog, I had to update some of the support scripts that help me write it and re-develop my method of using macOS location APIs from the command line."
tags:
- mac
- location
- shortcuts
- scripting
- cli
geo:
  name: San Francisco, United States
---

As you may be aware, reading this, I recently fixed my blog and in an act of pure incredulity, I have determined to actually write something new in it as well. It's going to be very specific.

This blog is a static-site, powered by Jekyll. There are a handful of details in my templates that use custom metadata (see [the source for this post](https://github.com/BenWard/benward-web/tree/main/jekyll/_posts/blog/2022/2022-12-07-macos-location-cli.md) and one of those is location information for geotagging.

I have a very simple `rake` task for generating new blog post files when I start writing, which handles creating the file in the right place and pre-populating the date and slug and so on. It also attempts to fetch my current location. Previously I was doing this using a cli tool named — obscurely enough — [CoreLocationCLI](https://github.com/fulldecent/corelocationcli), but it appears to be broken in macOS Ventura, as it is no-longer possible to grant it access to Location Services. I tried compiling it myself to no avail, and set about figuring out an alternative.

I wanted to use CoreLocation because it's available locally on the system, and doesn't make my post creation script dependent on a network connection. Though I appreciate that I _don't_ write blog posts, when I _don't not write_ them, I'm often unplugged on a train or plane or some other borderline-hostile distraction-free environment.

I recently learned that the slowly maturely macOS and iOS [Shortcuts](https://support.apple.com/en-gb/guide/shortcuts-mac/apdf22b0444c/mac) platform can now be invoked from the command line, and with this comes the ability to effectively create command line tools that channel data from apps and higher-level areas of macOS into the terminal. It is… a little fiddly, but here's how I got location data from macOS into a rake script.

You can skip to the end and [download the shortcut I wrote from iCloud](https://www.icloud.com/shortcuts/1121da1aeece4d38aec5d38007944b6f).

You can create a shortcut that accesses location fairly easily, my first attempt is pictured, and uses the “Get current location” action, cherry picks the fields I want to use into a `dictionary` and serialises it into JSON by simply stuffing the dictionary into a text block, where Shorts will automagically serialise the object into JSON.

![A screenshot of a simple macOS shortcut to “Get current location”, apply some select fields into a “Dictionary” and output that dictionary as text.](https://media.benward.uk/web/posts/cli-location-shortcut-1.png)

To run the shortcut, invoke it from the command line with `shortcuts`:

```
> shortcuts run <name-of-shortcut>
```

Now, if you're anything like me and usually treat shortcuts as approachable, friendly user interface, you likely give them nice clear label names. That's annoying in this case as you end up having to type `shortcuts run "Get CoreLocation JSON Data"` or somesuch. For these kinds of utilities, I've gone for more terminal and programming friendly `getCoreLocationData`.

Now things get confusing. Run as above, no text output appears on the terminal. `shortcuts` says you can specify output with the `-o` switch, and this does work to write data into a text file. Attempting to send that output to `stdout` didn't work as expected though:

```
> shortcuts run getCoreLocationData -o /dev/stdout
>
> Errr? Hello?
```

Nothing. This caused some consternation, and a brief diversion into setting the resultant JSON onto the clipboard and using `pbpaste` to get it back again. This was dumb and fortunately while being dumb I accidentally discovered that you can _pipe_ the output of the shortcut, which is all you need to work with it, ergo:

```
> shortcuts run getCoreLocationData | json_pp
> {
>   "address" : "San Francisco, United States",
>   "latitude" : "37.12345678910",
>   "longitude" : "-122.12345678910"
> }
```

Back in my rakefile I'm then essentially just <code>JSON.parse(`shortcuts run getCoreLocationData`, { :symbolize_names => true })</code> to get my location object, with all the location permissions having been handled at the Shortcuts layer.

I did one more iteration, which as you'll see in the download handled some buggy behaviour in Shortcuts: Namely that mapping some of the `Current Location` fields into a dictionary assigned empty data unless they were interpolated into a string, so the final shortcut has an ugly hack to do that and cleans up after itself. Also, since dictionaries in Shortcuts are typed, you can't easily set the empty values to JSON `null` without doing a grubby text replace on the output at the end.

![A larger screenshot of a the more complex macOS shortcut steps eventually employed to output nicely massaged location data.](https://media.benward.uk/web/posts/cli-location-shortcut-2.png)

<aside>One privacy note, while I have you: Shortcuts “Get current location” action allows you to specify the desired location precision (“Best”, down to “Nearest 3 Kilometers”.) However, be aware that <em>this is not a privacy filter</em>: If CoreLocation has more precise data to hand, it will return it (including the resolved street address.) This makes the option to “Ask Every Time” fairly useless, as it can't be reliably used to filter or obfuscate location from the script you're running. “Precision” is not equivalent to the classic Fire Eagle granular exposure control.</aside>

I hope you find this useful, both potentially for location scripting needs, but also as an introduction to how macOS shortcuts can be used in CLI environments to bridge macOS into the terminal. Increasingly, third party apps expose shortcuts for automation, and little bridges like this could make them more powerful still.
