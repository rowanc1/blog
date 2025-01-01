---
title: Taylor Series
description: Taylor Series
date: 2019-05-12
tags: ['explorable']
thumbnail: /images/ink/taylor.gif
---

+++
The Taylor series of a real or complex-valued function $f(x)$ that is infinitely differentiable at a real or complex number $a$ is the power series.

$$
f(x) \approx f(a) + \frac {f'(a)}{1!} (x-a) + \frac{f''(a)}{2!} (x-a)^2 + \frac{f^{(3)}(a)}{3!}(x-a)^3 + \cdots
$$

where $n!$ denotes the factorial of $n$ and $f^{(n)}(a)$ denotes the $n$th derivative of $f$ evaluated at the point $a$. In the more compact sigma notation, this can be written as

$$\sum \_{n=0}^{\infty }{\frac {f^{(n)}(a)}{n!}}(x-a)^{n}$$

The derivative of order zero of $f$ is defined to be $f$ itself and $(x - a)^0$ and $0!$ are both defined to be 1. When $a = 0$, the series is also called a Maclaurin series.

The sine function is closely approximated by its Taylor polynomial of degree 7 for a full period centered at the origin. Try expanding the Taylor series:
