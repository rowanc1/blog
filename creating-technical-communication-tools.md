---
title: Creating Technical Communication Tools
description: Reflecting on creating tools for technical communication.
date: 2019-11-12
tags: ['thought', 'visible-geology', 'omf', 'simpeg']
thumbnail: images/visible-geology/static-creative-thumbnail.png
---

How do you get a complex geoscience idea out of someone's head and transfer it to someone else? Furthermore, how do you do that efficiently, effectively, and in such a way that it is scalable and open to interrogation?

For the [last decade](story.md), I have been building tools and communities that have targeted aspects of technical geoscience communication. I wanted to share my reflections and learnings on the commonalities between three projects: [Visible Geology](visible-geology.md), [SimPEG](simpeg.md), and [OMF](omf.md).

- [Visible Geology](visible-geology.md), is an online geologic block modelling tool that is targeted at and used in introductory and structural geology courses around the world. Students are able to combine geologic events in any order to create their own geologic models.
- [SimPEG](simpeg.md) is a framework and toolkit for simulation and gradient based parameter estimation in (non-seismic) geophysical applications, for example, direct current resistivity, electromagnetics, gravity, and fluid flow.
- The [Open Mining Format (OMF)](omf.md) is an industry effort to standardize the data outputs in mining in order to encourage and enable interoperability. The approach that [OMF](omf.md) uses is a set of simple, primitive objects that can be combined to represent the existing data-artifacts in the industry.

---

These projects range from educational visualization apps to geophysical research frameworks to industry data standards, I have summarized three principles that I see as important to the success of these projects:

- **Community-building is more important than tool-building.** For example, [SimPEG](simpeg.md) focuses just as much on community building as it does on the underlying computational and geophysical sciences. This community building has included ridiculous amounts of course materials and helping to support [short-courses in 26 countries](https://disc2017.geosci.xyz) (i.e. the [GeoSci.xyz project](geosci.md)).
- **Design tools to be accessible.** By accessible, I am referring to aspects that improve use and contribution by the widest possible range of people. This involves everything from the user interface/experience, programmatic interface, language choice, license, documentation, to community guidelines. My first [Visible Geology](visible-geology.md) prototype was in Matlab; less than 500 people used it, due in part to the non-accessible language and install process. In contrast, moving [Visible Geology](visible-geology.md) to the web has enabled people to create over one million geologic models.
- **Focus on the combinable, interoperable components.** In [Visible Geology](visible-geology.md), the components are geologic events that users can combine in any order. Throughout [my PhD](phd.md) I was intent on describing the framework of components and interfaces that appropriately described the geophysical simulation and inversion process; this was codified with collaborators through [SimPEG](simpeg.md). These geophysical components can be combined to solve new problems without scientists having to create every part of that process themselves. In [OMF](omf.md), we identified the components that make up the core data-primitives in mining (e.g. an Array or a ColorMap) and combining them to describe higher-level elements (e.g. Meshes, BoreHoles, BlockModels). The focus on creating components that work together enables the option for emergent creativity through their combination.

:::{figure} images/visible-geology/static-creative.png
As the components are iteratively defined, the users of your tool can move from static interaction to creative contribution. See [my 2015 reflections](on-creative-tools.md) for more on this.
:::

---

All three of these principles are interrelated and reinforce each other. For example, the focus on components allows for documentation and testing of those components; this improves accessibility, allowing the community to grow. Furthermore, the necessary combinable components are often revealed through the process of refactoring ideas to support new case-studies that have come in through community contribution or application.

I believe that the technical communication of ideas, be it through prose, conversation or software, is foundational to making progress in our geoscience discipline. As such, the tools that we build to further geocomputing should endeavour to foster accessible, interoperable, combinable communities.

:::{note} Context
This article was written for [52 Things You Should Know About Geocomputing](https://agilescientific.com/blog/2014/12/29/geocomputing-call-for-papers) an initiative by [Agile Scientific](https://agilescientific.com).
:::
