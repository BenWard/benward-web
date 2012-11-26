---
layout: blog
category: blog
title: "The Pastry Box: On ownership, services, and APIs"
date: "2012-06-19T00:00:00+01:00"
summary: "I’ve been thinking about the intersection of ownership, responsibility, and infrastructure in the development of businesses on the web. Users and potential businesses are involved in a difficult balancing act of ownership, obligation, and expectation. Every new service on the web seems to rub up against this at some point, regardless of the funding model. What’s more, I think that if the lessons of this generation of start-ups are clearly understood, start-ups and applications should be able to take a more fearless footing as they grow."
canonical: http://the-pastry-box-project.net/ben-ward/2012-june-19/
tags: ["pastry-box"]
geo:
  name: "San Francisco"
  xy: 37.77493,122.41942
---
I’ve been thinking about the intersection of ownership, responsibility, and infrastructure in the development of businesses on the web. Users and potential businesses are involved in a difficult balancing act of ownership, obligation, and expectation. Every new service on the web seems to rub up against this at some point, regardless of the funding model. What’s more, I think that if the lessons of this generation of start-ups are clearly understood, start-ups and applications should be able to take a more fearless footing as they grow.

So, here’s the basis of most web applications: You store data, which other people own. Other people create things and combine them with your service, either at point of creation or distribution. What *you* own is infrastructure; the machines, the principal applications that connect it all together, the interfaces through which people interact with their creations on your service. This infrastructure belong to you. At a basic level you have an obligation to your user to provide them with access to what’s theirs, but it’s all on infrastructure, which you own.

Now, although the data does not belong to you, the operations that aggregate that data, through it being entrusted to your network en mass, do. This is your product. You are entitled to profit from features built on these aggregations, insights and infrastructure.

Consider Rdio, MOG, or Spotify, and consider Last.FM. All are music companies, and all stream music. The first three—at least initially—have core businesses built around streaming alone and have developed infrastructure to that end. But, the product users pay for—the music—belongs to a third party. This makes them vulnerable, since changes from their supplier could cause a sudden imbalance to the entire business.

Last.FM—although also having a streaming component—has a product of its own, in the form of the aggregated, processed, and presented Audioscrobbler listening data of its users, that it serves back to them as a service. The user owns their listening data, the music labels own the music files, and Last.FM owns the entire infrastructure of data analysis, aggregation and presentation (and the iterative uses, such as music recommendations). There is a balance between the service and the user. If the streaming music licenses were pulled tomorrow, there remains a business in the data the user owns and the services Last.FM has built on it.

(Of course, online music is far from the simplest example, since there are so many licensing factors and contracts muddled into it. Rdio and Spotify surely have contractual assurances from labels for some period of time, and are working hard to build out unique aspects of their services as they grow—reviews, libraries, web playback APIs, and nested applications, for example—so please don’t mistake this example as writing them off.)

A well-balanced application doesn’t have to lock data away, and has an understanding with their users about what they give and what they get. In the applications we build, in the businesses we try to found on the web, this balance—or understanding thereof—is what we must strive for from the outset.

But what of APIs? APIs are interesting things. Beyond the raw basics—providing high fidelity data to your users—they enable a specific group of users to grow usage and personal investment in your service, and even define whole new usage patterns. With time, the influence of third-party designs can become de facto, and the core service may be shaped by them.

However, the idea that your service is obligated to third parties is muddied. It’s a relationship, because although ideas developed in the wild can prove essential, they could not succeed in isolation without your infrastructure, collective user-base, and even the adoption of those popular ideas themselves into features that other users come to understand. Everyone needs to understand that; you, as the provider of an API, and any user who chooses to build on top of your infrastructure.

The value of a business on the web comes from broad infrastructure. It’s the things you build that allow people to do more than what they might do in isolation. You provide and support the platforms on which people build new ways to perceive their creations and others. If successful, your business supports your work and yourself because as a whole—you, your users, your backers and advertisers, those who build around your infrastructure—you create a healthy, balanced relationship.