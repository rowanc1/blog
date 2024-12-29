---
title: Visible Earthquakes
description: Software to visualize earthquakes using InSAR data.
date: 2013-04-20
tags: ['visible-geology', 'thoughts']
---

At a conference in Knoxville I got to chatting with Gareth Funning about using some of my software to visualize earthquakes using InSAR data. Here is what wikipedia has to say about InSAR:

> **Interferometric synthetic aperture radar**, abbreviated **InSAR** or **IfSAR**, is a [radar](https://en.wikipedia.org/wiki/Radar 'Radar') technique used in [geodesy](https://en.wikipedia.org/wiki/Geodesy 'Geodesy') and [remote sensing](https://en.wikipedia.org/wiki/Remote_sensing 'Remote sensing'). This geodetic method uses two or more [synthetic aperture radar](https://en.wikipedia.org/wiki/Synthetic_aperture_radar 'Synthetic aperture radar') (SAR) images to generate maps of surface deformation or [digital elevation](https://en.wikipedia.org/wiki/Digital_elevation_map 'Digital elevation map'), using differences in the phase of the waves returning to the satellite{sup}`[\[1\]](https://en.wikipedia.org/wiki/Interferometric_synthetic_aperture_radar#cite_note-1)`{sup}`[\[2\]](https://en.wikipedia.org/wiki/Interferometric_synthetic_aperture_radar#cite_note-2)`{sup}`[\[3\]](https://en.wikipedia.org/wiki/Interferometric_synthetic_aperture_radar#cite_note-3)` or aircraft.

Did you read the part about surface deformation?! If a satellite flies over a piece of land before and after an earthquake occurs you can compare how much the ground has moved down to the millimeter. The data you get out of the satellite is called an interferogram and looks something like this:

:::{figure} images/earthquakes/model.png
Interferogram of the Dinar earthquake.
:::

You can count up the rings or fringes to determine the amount of deformation in wavelengths; here each wavelength is 2.83cm.

What can you do with this data? Well, being scientists and all, we like to classify things like earthquakes so that we can learn about their mechanisms, structure, and life-cycle. Was it a normal fault, a thrust fault, strike-slip ...? If we know more about an earthquake that just happened we can compare to different areas and make predictions and inferences about if an earthquake is likely to happen in a different area we care about!

So, what we need is a game plan, how to take this (pretty) picture and make an educated and informed guess about the world. Here is the roadmap:

1.  use a simple model of the earth,
2.  simulate a model earthquake with known geometries, size etc.,
3.  estimate the interferogram that the known earthquake creates,
4.  compare the simulated data to the true data,
5.  contemplate deeper meanings, make a better guess, and repeat until happy.

So after talking with Gareth and exchanging some code for the simple model (step 1.) I mocked up a simple InSAR modelling package that allows you to iteratively make an informed guess about the earthquake that produced the interferogram. Here is a screenshot of the program:

:::{figure} images/earthquakes/screenshot.png
:::

On the left is the true interferogram, and on the right is the model. You can change the length, strike, dip, rake, depth, and amount of slip of the fault. Most of these you can do by graphically pulling around a few handles. You can see the model update in (near) real time and see the 3D fault block representation.

**Why is this cool?**

- This is **real** data, this earthquake really happened
- This is a **real** scientific code, the answers students get are (almost) as good as the experts.
- This is **real** science, you are the one in charge of figuring out what the earthquake was.
- Look at the pretty colors! And a 3D fault block!

:::{figure} images/visible-geology/earthquakes.png
Visible Earthquakes in use
:::

A screenshot (no audio):

```{iframe} https://www.youtube.com/embed/ERycf82Yq5M?version=3&rel=1&fs=1&showsearch=0&showinfo=1&iv_load_policy=1&wmode=transparent
:width: 100%
```

---

The application was live for over a decade, sold to Seequent and then retired in 2022.
