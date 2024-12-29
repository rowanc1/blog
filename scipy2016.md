---
title: SciPy2016
description: All the geophysics but backwards.
date: 2016-07-15
tags: ['presentations', 'simpeg', 'phd']
thumbnail: images/presentations/scipy2016.png
---

```{iframe} //www.youtube.com/embed/yUm01YsS9hQ
:width: 100%
```

---

## Short Description

Geophysical inversions are tools for constructing models of the subsurface (images) given a finite amount of data. [SimPEG](http://simpeg.xyz) is an effort to synthesize geophysical forward and inverse methodologies into a consistent framework. We will show seven geophysical methods based around a diamond exploration case study, combining the results to drive a more informed decision.

## Abstract

The goal of geophysical methods are to create pictures of the subsurface that inform geologic interpretations, and constrain the realm of possibilities to an actionable decision. Integration between methods is key to extracting the most from geophysical data. If we aim to integrate these methods, they must be treated from a consistent framework, so that methodological and parameter choices are not obfuscated by spaghetti-code solutions used to tie together different algorithms implementing each experiment. Geophysical inversions are the tools used for creating models (pictures) from the geophysical data. Inversions require many complex, moving pieces to be brought together before you even begin: simulation, physics, linear algebra, data processing, optimization, etc. Together these pieces can be combined to run a single geophysical inversion. However, the real goal is how these disciplines work together to contribute to a more informed decision.

We will present our continued work on a geophysical simulation and parameter estimation framework ([SimPEG](http://simpeg.xyz)) and the recent developments that have expanded to include seven geophysical methods: (a) magnetics, (b) gravity, (b) electromagnetics, (c) magnetotellurics, (d) direct current resistivity, (e) induced polarization, and (f) seismic. Each of these methods provides a different lens for looking at the subsurface, and each have their own challenges. The SimPEG framework has been designed to provide the structure and supporting code-base for these methods to work together in a consistent, accessible way. Individual methods will be discussed using a diamond exploration case study and further expanded upon in the posters on: "Where are the diamonds?".

Working within the SimPEG framework has created the opportunity for individual advances to feed back into the underlying framework, making these advancements accessible to the wider community. Examples of this will be shared within the context of searching for shiny diamonds!
