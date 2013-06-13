---
layout: blog
category: blog
title: "Silicon Valley through a PRISM"
date: "2013-06-13T00:58:36-07:00"
summary: "This week's events surrounding NSA surveillance triggered some cynicism in the tech industry, but also carelessness and even hypothetical *enthusiasm* for the massive, untargeted collection of data by a government, and I find that quite weird. Along with  the ever-present privilege bias of the place, it set me thinking about how desensitised we as developers are to the entire practice."
tags: [prism, culture, technology, industry]
geo:
  name: "San Francisco"
  xy: "37.77493,122.41942"
---
Absorbing this week's equally exhilarating and disconcerting [revelations about NSA surveillance](http://www.guardian.co.uk/world/the-nsa-files) have resulted in me feeling a little sceptical about Silicon Vally.

There are a lot of problems here with privilege blindness, the corners so rounded by the ubiquity of white, wealthy, social liberalism that the depth of argument here concerns adjusting the border radii than changing the shape of society. As much as any issue, presence in this dominant group reduces any personal concern for the potential consequences of being caught and stored in a surveillance dragnet.

This week's events triggered some cynicism, but also carelessness and even hypothetical *enthusiasm* for the massive, untargeted collection of data by a government, and I find that quite weird.

Some of that stems from pedantry and cynicism doubting the alleged operation of the PRISM software that was leaked: It seemed far fetched and impractical for the NSA to have backdoors into any company's actual servers. Besides interacting with proprietary configurations, companies like Microsoft, Apple and AOL run massive, disparate systems within their networks. The idea that such an access scheme could be operated while authorising few enough people not to introduce plausible deniability of a leak seems unlikely at best. That was even before the strong blanket denials from the implicated companies themselves.

That implausibility contributes to people in this industry—myself included—reinterpreting the news, parsing the reported absolutes with scepticism. Likewise the PowerPoint slides from which the reports are sourced. We look for ways to read ‘direct access’ as a vague user experience generalisation, rather than the literal flow of data and credentials.

To whatever extent that's true, if the user experience is indistinguishable, I wonder if our reaction should be as well. Even if we conclude it acceptable for government agencies to use such methods, the total secrecy of both the actions and the authorization thereof should at least demand pointed questions over the lack of transparency. Here sits an opportunity for citizens to hold government to account, and for government to refresh the justification for their tools and behaviour, with their ‘War on Terror’ dismissed as insincere parody twelve years since 9/11. Yet here such apolitical sentiment seems isolated. Instead the discussion has moved to how the PRISM software could best be designed for iOS7.

I think there's a deep rooted trait within this industry that sedates the outrage. That is the normality, complicity, and dependency on ‘surveillance’ in the software we make. The explicitness ranges from politely asking a user to submit a crash report, opting into anonymised interaction logging, right to the extreme of advertisers [bypassing your browser's privacy protections](http://webpolicy.org/2012/02/17/safari-trackers/). It extends in scope from a neat little [Gaug.es](http://gaug.es) script you and I might put in our personal websites to sate curiosity (I do), to the devices enabled by the Google Corporation's impenetrable, cross-product unified privacy policy, DoubleClick advertising network subsidiary, and Android software carried in millions of pockets around the world. It's everywhere, and it's not challenged.

The product decisions of the applications we use daily are informed by data. To what degree that data outweighs intuition and taste depends on the company, but the baseline capture and analysis required to make any decision is not dissimilar.

Logging is the default across technology, not just business. When you install Apache or nginx on your server, the initial site configuration will write access logs containing identifying IP addresses. It has been *normal* for technologists to acquire this data just-in-case, since the first time we published something to the web.

The transactions that make up the operation of the internet are in general *not private*. Everything that attempts to enable privacy over the network is an enhancement, an opt-in, an extra service. SSL encryption of your requests and responses? Most web content is not available encrypted. Someone between you and the site can analyse your traffic. Within individual services themselves, privacy controls are devices to *discard* information, rather than never receiving it at all.

It should be acknowledged that I work at Twitter on the team that builds [Tweet buttons](http://twitter.com/buttons) and other embeddables. You've likely seen them *everywhere* on the internet. The astute amongst you may therefore question my personal conflict in this logging game. There are two things: The first is that this is not an argument against logging, product usage analysis, or aggregation of data to do useful things. What I feel like challenging is the thoughtless, catch-all default that is presumed in the development of technology, and to question the comfort technologists at large have developed for the practice. I don't believe it is well aligned with the preferred attitudes of society at large, yet the inevitability of technology leaves no room for debate.

The second part is that where I am concerned about thoughtlessness, I am immensely *proud* of how thoughtful the people are at Twitter who work on these things are, and the extended cast of people in the company who take an impassioned interested in them. When Twitter wanted to build [a feature](https://support.twitter.com/articles/20169421) for users derived from logs, we were amongst the first large commercial organisations to support the [Do-Not-Track standard](http://donottrack.us) (the “ask websites not to track me” setting in your web browser.) We went further still, and allowed users to set the equivalent preference against their account for any browser, and allow site owners and publishers to [apply DNT opt-out behaviour on behalf of all their visitors](https://dev.twitter.com/docs/tweet-button#optout). The EFF said [some supportive things](https://www.eff.org/deeplinks/2012/05/new-privacy-policy-twitter-commits-respecting-do-not-track) at the time about this implementation, too.

Of course, it is *policy*, and that's where the behaviour of our industry dovetails back into the NSA story. Whistleblower Edward Snowden is [claiming](http://www.guardian.co.uk/world/video/2013/jun/09/nsa-whistleblower-edward-snowden-interview-video) that the NSA has a vast warehouse of historical monitoring data. He says this:

> […] Eventually there will be a time where policies will change
> because the only thing that restricts the activities of the 
> surveillance state are policy. Even our agreements with other 
> sovereign governments, we consider that to be a stipulation of 
> policy rather then a stipulation of law. And because of that a 
> new leader will be elected, they'll find the switch.

— Edward Snowden in conversation with [Glenn Greenwald](https://twitter.com/ggreenwald), from a [transcription at PolicyMic](http://www.policymic.com/articles/47355/edward-snowden-interview-transcript-full-text-read-the-guardian-s-entire-interview-with-the-man-who-leaked-prism)

For all of our best intentions, policies can be changed. Snowden's fear of the NSA is that a new policy will be applied not just to newly acquired data, but the archived information dating back a decade. So it is with our application logging. By gathering everything and intending to be nice, someone can break your promises. Silicon Valley takes great pride in its positivity, trust, and enthusiasm for people doing the right thing with the best of intentions. We expect to make innocent, forgivable mistakes in the process, but that doing so is OK. Applied in the workplace that's a boost to productivity and morale, but as a broad attitude to an industry it's [hopelessly naïve](http://www.wired.com/gadgetlab/2012/02/path-social-media-app-uploads-ios-address-books-to-its-servers/). Applied to the unfettered mechanisms of government, I find it pitiable.

Beyond policy is law. This industry desperately wants to avoid the hand of regulation, but in any case there's no risk of that here. Any law restricting data retention is informed by the very same government who would like to use that data in an investigation. In fact, law restricts communications services *minimum* period to hold data, as well as lengthy maximums.

I do believe that a lot of logging in technology is entirely reasonable and respectful. I believe that the vast majority of the analysis and use of logs from the web and applications is reasonable and respectful, discards or ignores things that could be abused, and ultimate does inform more usable technology. But in observing such a collective shrug to the implications and the potential of the NSA behaviour, I feel a great discomfort in this culture where logging is on by default, ‘just because’ and ‘just in case.’

I wish that we would go further and champion the practice of technologically implementing privacy, rather than just policies. I want an industry that avoids the senseless warehousing of raw data, and celebrates ways to design analytical tools to deform destroy unnecessary, sensitive data before it's stored at all. I wish that our culture was to issued warrants, rather than to trawl for patterns in our blanket surveillance.

I wish that developers would at least give it a second thought.