---
title: Electromagnetics Simulations and Inversions
description: A framework for simulation and inversion in electromagnetics
date: 2017-10-01
tags: ['paper', 'simpeg', 'electromagnetics']
---

## Abstract

Simulations and inversions of electromagnetic geophysical data are paramount for discerning meaningful information about the subsurface from these data. Depending on the nature of the source electromagnetic experiments may be classified as time-domain or frequency-domain. Multiple heterogeneous and sometimes anisotropic physical properties, including electrical conductivity and magnetic permeability, may need be considered in a simulation. Depending on what one wants to accomplish in an inversion, the parameters which one inverts for may be a voxel-based description of the earth or some parametric representation that must be mapped onto a simulation mesh. Each of these permutations of the electromagnetic problem has implications in a numerical implementation of the forward simulation as well as in the computation of the sensitivities, which are required when considering gradient-based inversions. This paper proposes a framework for organizing and implementing electromagnetic simulations and gradient-based inversions in a modular, extensible fashion. We take an object-oriented approach for defining and organizing each of the necessary elements in an electromagnetic simulation, including: the physical properties, sources, formulation of the discrete problem to be solved, the resulting fields and fluxes, and receivers used to sample to the electromagnetic responses. A corresponding implementation is provided as part of the open source simulation and parameter estimation project SimPEG (http://simpeg.xyz). The application of the framework is demonstrated through two synthetic examples and one field example. The first example shows the application of the common framework for 1D time domain and frequency domain inversions. The second is a field example that demonstrates a 1D inversion of electromagnetic data collected over the Bookpurnong Irrigation District in Australia. The final example is a 3D example which shows how the modular implementation is used to compute the sensitivity for a parametric model where a transmitter is positioned inside a steel cased well.

:::{tip} Note
Lindsey wrote up [a retrospective](https://medium.com/simpeg/a-paper-about-simpegem-95ad60390542) on the paper process, what changed during the year long publication process.
:::

---

## Full Paper

:::{note} Note
Heagy, L. J., Cockett, R., Kang, S., Rosenkjaer, G. K., & Oldenburg, D. W. (2016). A framework for simulation and inversion in electromagnetics. Computers and Geosciences. @10.1016/j.cageo.2017.06.018
:::

:::{figure} images/papers/simpeg-em-thumbnail.png
A framework for simulation and inversion in electromagnetics
:::

---

## Highlights

- We propose a modular framework for simulating and inverting electromagnetic data.
- Time and frequency domain inversions are organized using an object oriented approach.
- Examples include the inversion of synthetic and field data.
- A 3D sensitivity calculation for a parametric model is demonstrated.
- The [electromagnetics simulation software](https://github.com/simpeg/simpeg) implementation and examples are open source.

---

## Favorite Parts

> The framework we have laid out has rigorously separated out various contributions to the electromagnetic equations in both time and frequency domain. We have organized these ideas into an object oriented hierarchy that is consistent across formulations and attends to implementation details and derivatives in a modular way. The organization of the framework and its associated numerical implementation are designed to reflect the math.
