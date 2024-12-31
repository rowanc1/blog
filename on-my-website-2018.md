---
title: Website Redesign
description: Some ideas about the scholarly commons.
date: 2018-02-03
tags: ['bricks', 'thoughts', 'explorable-meta']
thumbnail: /images/website/life.png
---

+++

## Motivation

While working on my PhD and some related activities in [geoscience education](/geosci) I explored ideas around scientific communication, the current publication process, interactive reproducible figures, collaboration, and combining computation and context. I have recently finished my PhD, and have devoted some time to redesigning my website. I want this to be an experiment to explore some of these ideas in more detail than I was able to during my PhD. The context for this is to look at the very [broken publication machine](/guardian-publishing) that has entangled itself with scientists, and has put their work behind pay-walls. :::{aside}
Unless you are

[Germany](/germany-elsevier)

and just refuse to pay? Interesting!
::: We pay for the privileged of buying our own work - and if you want to own your work or let citizens read it, that costs more. And by we pay, I mean you dear citizen - three times over (1) the scientists salary, (2) for the "volunteers" checking the work, and (3) for the final published product. It just [isn't fair](/fair-principles). :::{aside}
FAIR: Findable, Accessible, Interoperable, Re-usable. The current system maybe gets a $1.2/4$.
::: So. I am going to make a website, and in a weird convoluted way try to make a point.

You need a [force](/force11) of people coming at this from many different perspectives.

## Dreams

I think it would be totally cool to have a website that is an interactive visualization of all of your work. For the context of this article, your scientific contributions. Currently, your scientific resume is determined by your h-index, and not only is mine terrible, getting boiled down to [a number](/google-scholar-rowan) is both terrifying and **really boring**. ::::{aside}
:::{figure} images/website/github-contributions.png
GitHub contributions, but only the ones they determine worthy.
:::
::::There are some projects out there (e.g. [impact story](/impact-story-rowan)) that do a slightly better job of this though alt-metrics. GitHub shows you a dashboard of your coding contributions. However, these [examples](/growkudos) still have the problem that [other people dictate your story](/github-counting-contributions). I have worked on a bunch of different things and have threads of ideas that intermittently surface over the years and come together in unique ways - they certainly aren't all on GitHub and about zero are on Facebook if you round up. It would be totally cool to see this story - and communicate a slightly richer picture of my influences, ideas, thoughts and projects. **My scholarship**. I really have no idea what this would look like, but to get to anything sensible, you will need to start by getting data.

:::{figure} images/website/life.png
Not quite sure what good looks like. Maybe a [stream graph](/blocks-streamgraph) showing [all projects](/projects), contributions, broken up into categories and scaled by its AIF (arbitrary importance factor). Whatever it is, it has to be [eloquent](/book-of-life-eloquence) and [beautiful](/information-is-beautiful).
:::

## Start with data

:::{note} Note
The next bit is going to show a bit of code, however, the only thing I am trying to show is different representations of small, modular ideas. Stick with me.
:::

So I have a goal, my website should really show all sorts of things that I am up to, in various streams that has a sense of time, grouping, magnitude. You can zoom into things, drill down, explore. It should obviously be connected to github, slideshare, orcid, twitter, linkedin. A rich visualization needs rich data - and most of the data I actually want to show is hidden away in documents and is not accessible to visualize in other ways. My CV is a perfect example of this, it is written in `latex`, which at least allows me to comment things out and re-render it without loosing data. :::{aside}
Did you know that the PDF only really became a

[truly open standard](/wiki-pdf)

in July 2017?
::: However, a PDF is not as interactive as the web, so it is a poor target environment to render to (who prints things anyways...?!). I am going to start with pulling apart the idea of a CV, specifically [an award](/innovative-dissemination-award-simpeg) we received for [SimPEG](/simpeg), because it makes sense that this might be a node in the visualization above and should be interacted with as a distinct thing. :::{aside}
Eventually this will probably look more like

[Linked Data](/wiki-linked-data)

to give it

`@context`

.
::: I am going to represent this as `JSON` and throw a few things inside an object.

{ "\_\_class\_\_": "CvAward", "uid": "scholarship-ubc-simpeg", "title": "UBC Library Innovative Dissemination of Research Award", "description": "Awarded for the SimPEG framework and community development", "amount": 1000, "level": "institutional", "date": "2016/04/08", "declined": false, "url_more": "/innovative-dissemination-award-simpeg" } \`\`\`

This needs to be parsed or loaded up by something to transform it into a rendered form. In this case, I have chosen Python to parse the `JSON` and the [properties](/properties) library to add structure, type-checking and validation. As you can see in the `JSON` above, there is a `__class__` that will determine which python class to load into, which is shown below. Here `CvItem` inherits from a base class which has the shared pieces like `uid`, `title` and `description`. I am using the properties library to do things like limit the choices of the `level` of the award to a typo-free subset.

class CvAward(CvItem): style_item = 'cv-award' amount = properties.Float('amount of the award') declined = properties.Bool('Award declined?', default=False) level = properties.StringChoice( 'level of the award', choices={ 'institutional', 'regional', 'national', 'international' } ) \`\`\`

It is easy to deserialize the `JSON` to create an instance of this `CvAward` class: \
`instance = CvAward.deserialize(data)`\
This is important because now this data is in an executable form. For example, other methods can be added to the python class to `render` this to something more beautiful and readable than `JSON`! :::{aside}
I am using

[Jinja2 Registry](/jinja2-registry)

to do my rendering, which adds some nice things to Jinja2.
:::We can choose `html` as a render target language or perhaps even `latex` for that mater if you are making a PDF! Here I have chosen to focus mostly on the `html` side of things and am using the web components standard and [Polymer 2.0](/polymer) to modularize these classes into custom DOM elements. The [CvAward](/github-ink-components-cv-award) code is on GitHub, in a repository called [Ink](/github-ink-components). :::{aside}
The repository needs a bit of love before it is that usable by other people, but feel free to help out.
::: At the end of the day (after a bit of css and javascript) this award can be included in the page:

\<cv-award title="UBC Library Innovative Dissemination of Research Award" description="Awarded for the SimPEG framework and community development" amount=1000.0 level="institutional" date="2016" url="/innovative-dissemination-award-simpeg" >\</cv-award> \`\`\`

## Components are bricks!

When we render this component in `html`, it looks like:

\~~~~

\~~~~

This is a `brick`. It is a thing that I can build with. :::{aside}
I am calling these components

`bricks`

, because there is

[Chaos in the Brickyard](/chaos-in-the-brickyard)

.
:::Each `brick` (component, artifact, thing) is completely stand-alone, so I can have a rather [boring page](/scholarship-ubc-simpeg) that shows that `CvItem` all by itself. I should also eventually add a REST or GraphQL API so that you can load these up client side or query them from somewhere else. This would ultimately allow for the visualization at the start of this post - or much more importantly **imports** of content into a page. By that I mean: \
`<brick-import src="/api/v1/scholarship-ubc-simpeg"></brick-import>`\
Which could be added to an existing article, this is of course where things get really interesting. However, before we get there I want to explore a bit more about how you can combine these into various different pages.

## Composing pages

These `brick`s are stand-alone contributions, however, to give them context they need to be embedded in other pages, which means you need to find them programmatically. Each `brick` should have a persistent unique identifier (`uid`) so I can query it either directly or search for similar content - currently I am using a human readable slug. Also, right now my "database" is the file system and my caching layer is a python dictionary - the height of sophistication, and ready for production use (clearly).

### Query

I should probably look more into [GraphQL](/graphql) here, because that community has actually given some thought on how to structure queries - regardless of your database implementation. :::{aside}
GraphQL is

[similar](/graphql-vs-jsonld)

in principle to

[Linked Data](/wiki-linked-data)

as it defines a standard way to transfer data, and hosts its own schema/ontology in a discoverable way - but GraphQL is more approachable (e.g.

[than RDF](/rdf-schema)

) and seems to have slightly

[better tooling](/graphene-python)

and documentation.
::: For example, I would like to query by `CvItems` that are featured and tagged as education to go in my CV. Similar to my stellar database implementation, this requires a lot more work and integration with current standards. However, to get up and running, I rolled my own Query Language-ish (really?!) that allows you to query by `kind`, `tag` or `uid` or a combination of these. This I have exposed as a series of collection classes.

{ "\_\_class\_\_": "CollectionItems", "title": "Awards", "description": "Collection of awards", "license": "CC-BY-4.0", "query_type": \["kind"], "query_kind": "CvAward", "uid": "collection-awards" } \`\`\`

Similar to before, this `brick` can be [exposed independently](/collection-awards) and in this case is a collection of all of my awards.

### List

Most pages will be slightly more specific about exactly how they should act - importing specific bricks (probably at specific [immutable versions](/immutable-versioning)). In this case, the page that provides context is [my CV](/curriculum-vitae), which has a whole list of awards, education, experience and skills.

{ "\_\_class\_\_": "Collection", "uid": "curriculum-vitae", "title": "Curriculum Vitae", "description": "Rowan Cockett's Curriculum Vitae", "license": "CC-BY-4.0", "query_type": \["uid"], "thumbnail": "/images/rowan/requesting-to-join.png", "query_uids": \[ "cv-intro", "collection-education", "hr", "collection-experience", "hr", "collection-awards" ] } \`\`\`

The link to my CV can be included on my [home page](/), which in turn is a query into this data source - featured thoughts, ideas, and contributions. In this example, I got sick of writing some of the very simple pieces, like a horizontal-rule `<hr>`, so I just made this into a reusable component. This is probably the silliest, most over-designed infrastructure to put four characters into an html page ever invented. Thankfully, this has other uses like importing ideas.

---

## Importing ideas

In the CV example, I have shown that you can break your document into a database and represent each line (almost) as an entry that can be queried or exposed in multiple ways (json, executable code, latex or html). These rather simple ideas lead to creating pages through composition of data sources rather than composition in the solely artistic sense. Above, there were commonly used bricks that emerged as I was writing. Some of these were solely for layout, however, some of these - especially when I was writing my phd - were more useful: figures, equations, sections of text.

### Equation bank

I have experimented with [reusable equations](/github-simpeg-equations) and the same idea for [figures](/github-simpeg-figures) in my thesis. This is difficult to actually do in practice, and my thesis git repository had to have complex pointers to all of the dependencies. A paper I wrote that referenced these equations inevitably ends up on a different version of the equation, it is a bit intricate to stay organized - very possible - but easier to copy and paste. :::{aside}
I used

[Git Project](/github-git-project)

to keep track of specific links to commit hashes and repositories.
::: I intended to have these equations used by the [SimPEG community](/simpeg), but the uptake was ~0, although enthusiasm was notoriously high ([7 likes, wooo!](/twitter-reuse-equations) ha). In the [GeoSci community](/geosci), however, the development of ideas is necessarily more collaborative and for consistency of equations across the entire resource of interconnected pages, it was worth the time to invest in an [equation bank](/geosci-equation-bank). This allows us to debate and invest time in notation, which [is important](/on-breakthroughs). The equation bank is a list of equations with correct notation, and expose these to the entire GeoSci not-a-textbook textbook. For example, pulling from the article on [Lenz's Law](/geosci-lenzs-law) we can see that the equations are dynamically `.. include::`-ed - the [restructured text](/rst) equivalent of an import statement.

```text
  A convenient way to quantify the strength of the magnetic field in a particular region is the
  magnetic flux: .. include:: ../../equation_bank/magnetic_flux_time.rst which provides a measure of
  the magnetic flux density over a given area. Faraday's Law of induction, .. include::
  ../../equation_bank/faraday_lenz_time.rst
```

I also used the idea of an equation bank in [my thesis](/phd-thesis) written in `latex`, this allowed me to import equations: \
`\input{equations/something-horrendous}`\
which magically creates a [block matrix equation](/github-simpeg-equations-richards) for the [Richards equation derivative](/richards-paper).

\begin{aligned} \overbrace{ \left\[ \frac{1}{\Delta t} \frac{\partial \boldsymbol{\theta}^{n+1}}{\partial\boldsymbol{\psi}^{n+1}} -\mathbf{D} \text{ diag}\left( \mathbf{G} \boldsymbol{\psi}^{n+1} \right) \frac{\partial \mathbf{k}\_{Av}}{\partial\boldsymbol{\psi}^{n+1}} -\mathbf{D} \text{ diag}\left( \mathbf{k}\_{Av}(\boldsymbol{\psi}^{n+1},\mathbf{m}) \right) \mathbf{G} - \mathbf{G}\_{z} \frac{\partial \mathbf{k}\_{Av}}{\partial\boldsymbol{\psi}^{n+1}} \right] }^{\mathbf{A}\_0(\boldsymbol{\psi}^{n+1})} \frac{\partial \boldsymbol{\psi}^{n+1}}{\partial\mathbf{m}} \\\ + \underbrace{ \left\[ -\frac{1}{\Delta t} \frac{\partial \boldsymbol{\theta}^n}{\partial\boldsymbol{\psi}^n} \right] }\_{\mathbf{A}\_{-1}(\boldsymbol{\psi}^n)} \frac{\partial \boldsymbol{\psi}^n}{\partial\mathbf{m}} = \underbrace{ \left\[ -\mathbf{D} \text{ diag}\left( \mathbf{G} \boldsymbol{\psi}^{n+1} \right) \frac{\partial \mathbf{k}\_{Av}}{\partial\mathbf{m}} -\mathbf{G}\_{z} \frac{\partial \mathbf{k}\_{Av}}{\partial\mathbf{m}} \right] }\_{\mathbf{B}(\psi^{n+1})}& \end{aligned}

I can use this equation in [my thesis](/phd-thesis), [my paper](/richards-paper), and [presentations](/static/richards-equation/index.html#/9) - and know that it is correct! Which it never is, so you can just [release a new version](/github-simpeg-equations-bump) - and update things, because you didn't copy and paste. By using an equation bank, we can discuss syntax and [define the meaning of the variables](/geosci-variables) and [standardize our naming](/github-standard-names) of variables. :::{aside}
These common resources are referred to as the

[Scholarly Commons](/force11-scholarly-commons-working-group)

, which has

[principles](/force11-principles-scholarly-commons)

and sketches at

[infrastructure](/herbert-scholarly-infrastructure)

.
:::However, if we copy and paste, it isn't worth putting any effort into making an equation any good if you are only going to use it once. If we build it up as common resource, you can invest in them.

### It's all just math...

For example, if we had a true equation bank - maybe we could invest more in showing our readers the derivation of an equation. We could have a [look up table](/geosci-variables) for our variables with links to more work. Or see where this equation is used throughout our work.

:::{note} Note
Try clicking the DC resistivity equation below to see a

[full derivation](/pixels-and-their-neighbors)

. Can't do that in a pdf.
:::

When actually writing, the annoying part is that you never just copy the equation in directly, it has to be changed via notation and isolation of variables. But heck, because we invested in an equation bank this is trivial right?!

\<ink-equation src="/api/v1/dc-resistivity-eqn" substitute='{"sigma": "\frac{1}{\rho}"}' isolate="phi" >\</ink-equation> \`\`\`

This would obviously substitute out variables and use [SymPy](/sympy) to isolate the variable $\phi$ dynamically - and [solve the PDE](/discretize) in the process. Some of this work is ... not quite done yet. Stay tuned! However, I have wrapped up [Katex](/katex) in a web component, because MathJax is slooooow ([63ms vs 1048ms](/katex-vs-mathjax)).

:::{figure} images/website/ink-math.gif
I am linking the `brick.math` property to rendering in KaTex - which is super fast!
:::

## On collaboration

::::{aside}
:::{figure} images/website/lindsey-refactoring.png
[Refactoring Geoscience Education](/refactoring-geoscience-education)
:::
::::

One of my favorite talks is one that Lindsey Heagy gave at SciPy 2016 on [Refactoring Geoscience Education](/refactoring-geoscience-education) where she presented some of these ideas using the analogy of programming and open source. How do we go from copy-paste, serial, scientific writing to something that is a bit more ... modern and inspired. We gave a follow up at [JupyterCon in 2017](/jupytercon2017). There are a lot of ideas in here, and I will unpack them later. The important piece is that these `bricks` (components, equations, CvItems, and figures) should be able to be imported through some sort of Distributed Idea Registry :::{aside}
The Distributed Idea Registry, kinda like

[dir](/linux-dir)

, but for all the ideas.
::: system. Why? The hard ideas require collaboration.

I wrote my whole thesis and most of my papers in Google Docs mostly because the collaboration that Docs offers is better than anything else. In these documents, we can strip out most of the latex to produce equations and figures into small, targeted files that are tracked independently. This allows us to use a collaborative document editor to do what it is good at.

:::{figure} images/website/collaboration.png
Each sentence is edited by multiple people. All of this is lost when we compile to Latex.
:::

The real-time editing means that most sentences are written by multiple people, and the commenting system allows us to sidestep the formal scientific prose and have a more human conversation on the side while we figure out what we are trying to say.

:::{figure} images/website/comments.png
The comment stream on choosing a single word is long and collaborative as we try to articulate what we actually mean. I still don't know [any{del}`every`thing](/everywhere-and-anywhere).
:::

### Attribution over plagiarism

It is really hard to communicate complex ideas, this is the main reason (beyond vanity) that [ideas need attribution](/on-ideas-and-pencils). These ideas, comments, nuances, references, citations are important to record, however, the final published version of a {del}`blog post` scientific article are supposed to show you just the final articulation, and a handful of potentially unresolvable citations to previous works. However, maybe it would be nice if we didn't loose all this context and discussion? Traditional citations are big and clunky. By big I mean they can't point to a paragraph, figure, or character. These citations can't tell you, dear reader, why I cited that silly paper - maybe the [{"reason": "Just to please Reviewer #2"}](/on-research). By clunky I mean by the time I have flipped to the bibliography, Googled the citation, logged in to my university VPN, remembered my password, got past the publishers pay wall, and downloaded the PDF - I have completely forgotten why this paper was even important. It probably wasn't?

:::{figure} images/website/ink-cite.gif
We still need the traditional citations, but these are clumsy. Why do I have to cite a whole paper, [instead of a single paragraph](/twitter-worrydream-paragraph)?
:::

There is lots to explore here, and lots of people are exploring how to [annotate](/hypothesis) articles and [where and how](/herbert-scholarly-decentralization) to store that data. The ideas of citations should allow researchers to point to a figure, an equation, or a [subset of a dataset](/force11-data-citation-principles). Again, I am just [poking at ideas](/on-breakthroughs) and skimming the surface with some experimentation. However, I do think that we may be able to re-evaluate how we display a reference. A portrait-only-rectangle of paper can't have overlays, pop-ups, hyperlinks, so instead we sacrifice space at the end of a sentence to provide a look-up key (People et al., [1776](/wiki-first-journal)) to another lookup table kept at the end of your stack of yellowing papyrus. With all our fancy technology these days - maybe we can dream our way past 250 years of indoctrination.

### Support the chaos

::::{aside}
:::{figure} images/website/idea-brick.png
Ideas are small, and should be captured and expanded in the Commons. It is more about the [Act of Commoning](https://pentandra.com/blog/putting-the-pieces-together-technology/) than the product. Learn from evolution. Learn from science. Process over product.
:::
::::

By breaking these ideas up into their component pieces - the `brick` like building blocks - we can cite the pieces, version independently, pull in other peoples work. The [infrastructure](/force11-enabling-technologies-and-infrastructures) that supports this process - working openly, researching, thinking - can fundamentally change how we view scholarship. When we get to this stage, attribution is built into the fabric of the system - so as long as you use appropriate tools - plagiarism isn't possible. The [tools](/bio-entity) to assist in the act of [scholarly commoning](https://pentandra.com/blog/putting-the-pieces-together-technology/) will necessarily be diverse, tailored to the task at hand - yet follow some [principles](/force11-principles-scholarly-commons) and [standards](/jsonld-standard). We currently worry about silly things with scorn from our towers high atop the status quo, like the [Least Publishable Unit](/wiki-least-publishable-unit) or [self plagiarism and recycling fraud](/wiki-self-plagiarism). If you have the tiniest of ideas, publish it - if you want to reuse your work, just [creatively license](/creative-commons) it to yourself. You shouldn't have to ask permission to work on ideas. You shouldn't be criticized for making your work accessible through re-publication. There is no one-true-way to explain something - if you are working on something hard, messy, nuanced, or vague - it will require all the [distillation](/distill-research-debt) and [curation](/on-breakthroughs) you can throw at it.

---

## Do you really care?

[You don't](/climate-change-vs-star-wars). You have no time to dig into all the details. You want the high level overview. The executive summary. [The picture](/probability-of-a-spill). The easy. Right up until the point where you actually have to understand it, to dig into the details, and dive into the reasons, explanations, proof, references and related ideas. Wouldn't it be nice if we broke through our ingrained habits of thinking about static paper rectangles as the only way to render something - as if the ability to print is synonymous with archiving. This is an [inhumane representation of thought](/humane-representation-of-thought). Ideas are rarely linear.

:::{figure} images/website/icare.gif
[Expand an idea](/weakform-dc) to drill down into what is really going on.
:::

The writer, or at least the environment, should have some empathy for the reader: don't waste my time. :::{aside}
Have

[Tufte style sidenotes](/tufte-sidenotes)

to add sarcastic or poignant insights.
::: Allow me to drill down, navigate quickly to an idea, jump, skip, skim, collapse, star, fork, loot, think, and most importantly - interact.

:::{figure} images/website/ink-outline.gif
Don't get lost, keep the outline close. Jump to the important stuff.
:::

---

## Interactive figures

If you haven't yet seen all of [Bret Victor](/bretvictor)'s [videos](/vimeo-worrydream) and [essays](/worrydream-ladder-of-abstraction) - I should have probably redirected you at the beginning of my undirected rant. My apologies. This will wait.

:::{figure} images/website/tangle.gif
Linked text and visualization to reason about [probability of oil spills](/probability-of-a-spill) using government data.
:::

Also. [Mike Bostock](/bostock-algorithms) on visualizing algorithms and on his new project [Observable](/observable). [Douglas Engelbart](/engelbart-augmenting-human-intellect) on augmenting human intellect. And [many](/edward-tufte), [many](/acko) [others](/jupyter). Again, I am only skimming the surface here, playing with things like [explorable explanations](/explorabl-es) and [`tangle.js`](/tanglejs).:::{aside}
Apparently Tangle is only in

[Chapter 2](/bretvictor)

of 4 (so far). So we all have some work to do to catch up...
::: Experimenting with ideas of how to link computation, visualization, (con)text, and presentations. The [example](/probability-of-a-spill) above does all of the computation in the web browser, which can do a lot - but javascript often isn't the language of choice for the [scientific conversation](/jupyter), which invariably has some computation sprinkled in.

In [GeoSci](/geosci) many of the figures in the content are generated dynamically in Python using [SimPEG](/simpeg) when the entire resource is compiled. This is a big step forward from [loosing the numerical instructions](/refactoring-geoscience-education-3m7s) to create the figure in the first place. Distributing the source code allows you to jump into the instructions and check for bugs, or change and [extend the resource](/jupytercon2017) to your own experimentation. However, as it stands now we are recompiling the entire resource and making the plots every time - not only is this wasteful of computational resources, it means that we can't use the figures easily in other contexts, textbooks, and presentations. :::{aside}
Again, these common, standards-based, invested-in

`bricks`

are what I see as elements of the

[Scholarly Commons](/force11-scholarly-commons-working-group)

.
::: It also means that investing in the `FigureBrick` is hampered or non-existent. The figure doesn't have an interactive button that spins up a [JupyterHub](/jupyterhub) instance and interactively creates your pictures/data on the fly. It should. Heck, it probably [will even be "free"](/colaboratory).

:::{figure} images/website/sphinx-figures.png
These [figures](/geosci-electrostatic-sphere) are generated from source every time the not-a-textbook textbook is recompiled. The source code is a click away, but the figure is still static.
:::

---

## Summary

If you are just making a simple website for yourself - this is probably the worst idea. You should look to your favorite [static site generator](/python-pelican) and host it on [GitHub Pages](/github-pages) or similar. However, if you are trying to think about how to coordinate the collaborative development of ideas, [scientific textbooks](/geosci), or [interactive articles](/probability-of-a-spill) and you want to capture attribution of the development and inspiration of the ideas in a more sophisticated way than an unresolvable text-only citation that is non-specific as to why you even are citing it - maybe you should [join the conversation](/force11-scholarly-commons-working-group).

::::{aside}
:::{figure} images/website/chalk-talk.png
The future is exciting. We won't be waiting for these ideas to hit the printed page. We will be interacting with them out in the world. See [Chalk Talk](/chalk-talk) by [Ken Perlin](/ken-perlin).
:::
::::

I think there are some interesting ideas to explore when you start thinking about your scholarly contributions as data. By [rigorously defining](/schema-creative-work) the component pieces - the figures, equations, methods sections, abstracts, and layouts - we can start to [creatively compose](/chalk-talk) all sorts of things that we can't do by ourselves alone. I wish to work on big things. Those things that are not possible to do by yourself. I wish to work on the things that I cannot. To work on the things that are not possible. A big part of this is not just what we work on, but how we work. The action, the verb is so much more important than the noun. It is not the current scientific theory that we are proud of - it is the scientific process we use to show the theory can be improved or is totally wrong.

The commoning and the commons.:::{aside}
And the

[commoners](/force11-members)

, I suppose...
:::

This will require the schemas, the data, the tools, and a diversity of opinions. Also, it won't be locked away in a PDF, or even on a computer screen or in virtual reality - it will be out in the world. Anyways, that is what [Chapter 4](/dynamicland) is about.

### Why this matters?

I started out this article talking about taking control of your own story. The publishing companies know that if they control how you "[communicate who you are and what you've done as a researcher](/mendeley-profile)", and they keep the h-index close at hand, they control the whole system. How we judge ourselves and our peers. How we promote, tenure-ify.

The thing is, you are more interesting than a handful of numbers - and ultimately it is you who should be in control of telling your story.

So. I made a website.

---

## Acknowledgments

Thanks to [Lindsey Heagy](/lindsey-heagy) for refining these ideas with me for the past few years. [Chris Chapman](https://pentandra.com) for his welcoming, editing and work on the [enabling technologies and infrastructures](/force11-enabling-technologies-and-infrastructures) working group. :::{aside}
Does this count as peer review?
:::[Evan Bianco](/evan-bianco) for editing, adding thoughts and pointers. And many others who are constructively working past the status quo for how we conduct, capture and judge scholarly outputs.
