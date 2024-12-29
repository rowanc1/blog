---
title: JupyterCon
description: Deploying a reproducible course
date: 2017-08-24
tags: ['presentations', 'geosci']
---

```{iframe} //www.youtube.com/embed/XY3Tq9Wd1_A
:width: 100%
```

---

## Description

In the deployment of a short-course on geophysics, we have been developing strategies for developing an "educational stack." Web-based textbooks and interactive simulations built in Jupyter notebooks provide an entry-point for course participants to reproduce content they are shown and to dive into the code used to build them. We will share the tools we are using and discuss some of our learnings.

## Abstract

How do you enable participants of a course to not only reproduce content they have seen in the presentation, but to interactively explore concepts and then build upon underlying tools to solve a problem in **their** work?

We have been exploring this question in the context of geophysics, and in particular in the delivery of a short-course on applied electromagnetics that is being delivered in ~30 locations worldwide this year ([http://​disc2017​.geosci​.xyz](http://disc2017.geosci.xyz)).

At a minimum, the ability to reproduce a numerical simulation or associated figure requires that the software is open source. However, opening the software is not sufficient for enabling course participants, who have potentially never programmed before, to engage with and explore the numerical simulations in a non-threatening way. Our first goal is to make concepts accessible - introduce them in context, through examples, case-histories and explanations, and provide an interactive way for participants to build intuition around the underlying physical principles. The approach we have taken is two-fold: (1) developing web-based "textbooks" ([http://​em​.geosci​.xyz](http://em.geosci.xyz), [http://​gpg​.geosci​.xyz](http://gpg.geosci.xyz)), built using python documentation tools, to provide the context, and (2) deploying Jupyter Notebook "apps" that use ipywidgets as the interface for driving numerical simulations around specific concepts ([http://​em​.geosci​.xyz​/apps​.html](http://em.geosci.xyz/apps.html)). During the course, the "apps" are introduced over the lunch-break and participants have the opportunity to reproduce figures and to purposefully explore and investigate concepts and questions that came up during the presentation.

The numerical software that enables the exploration of these concepts is the same set of tools that we use in our own research (SimPEG, <http://simpeg.xyz>). Our second goal is to make these computational tools accessible such that participants can add them to their own toolbox. This requires that we provide resources for participants to go a level deeper and look at the code under the hood. Within the GeoSci "textbooks", source-code for static figures is provided, and so the figures themselves provide a way for readers to dive a level deeper (e.g. [electrostatic sphere](http://em.geosci.xyz/content/maxwell2_static/fields_from_grounded_sources_dcr/electrostatic_sphere.html)). Parallel to this, we have also deployed a second set of Jupyter Notebooks that walk through the steps taken to set up a numerical simulation (with SimPEG), exposing all of the code required to do so. By having all of the layers, from numerical simulation software, to simulation "apps", to the case-histories and theory that provide context, available for exploration, there is now a trajectory for participants to dive from course content all the way to the research software used to build that content.

In this presentation we will discuss:

- the approach, tools, and philosophy that we are using to develop the tools and ideas that enable an "educational stack"
- the strategies we are using to foster a community; and
- some of the pain points and opportunities we see for development inside the Jupyter community that support this style of reproducible scientific communication.

---

## On Reproducibility

:::{figure} images/presentations/jupytercon2017.png
Don't just push for reproducible open-science, pull for it through extensible, explorable explanations.
:::
