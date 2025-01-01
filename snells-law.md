---
title: Snell's Law
description: Interactive Snell's Law
date: 2019-06-01
tags: ['explorable']
thumbnail: /images/ink/snellslaw.gif
---

## Angles Of Reflection And Refraction

Consider a P-wave which is incident at an angle $\theta\_1$ measured with respect to the normal of the interface, as seen in the figure below where the approaching wave is represented as a ray. The angles of the reflected and refracted rays are as follows: :::{note} Note
**Law of Reflection:**

The angle of reflection equals the angle of incidence. So $\theta\_r = \theta\_1$.
::::::{note} Note
**Law of Refraction:**

The angle of refraction $\theta\_2$ is determined through Snell's Law: \frac{\sin \theta_1}{v_1} = \frac{\sin \theta_2}{v_2}
:::If the wave travels from a low velocity medium to a high velocity medium the wave gets refracted away from the normal. Conversely, it gets refracted toward the normal if the wave goes from a high velocity to a low velocity medium.

\

:::{aside}
$\theta_1$: °

\

$\theta_2$: No Refraction Wave°

\

$v_1$: m/s

\

$v_2$: m/s

\

:::

```
<ink-chart-text :x="-0.9*Math.sin(theta1) - 0.1" :y="0.9*Math.cos(theta1) - 0.1" :rotate="90-theta1*180/Math.PI" text="incident -->"></ink-chart-text>
<ink-chart-text :x="0.5*Math.sin(theta1) + 0.1" :y="0.5*Math.cos(theta1) - 0.1" :rotate="-90+theta1*180/Math.PI" text="reflected -->"></ink-chart-text>

<ink-chart-text :x="0.5*Math.sin(theta2 + 0.1)" :y="-0.5*Math.cos(theta2 + 0.1)" :rotate="90-theta2*180/Math.PI" text="refracted -->" :visible="isFinite(theta2)"></ink-chart-text>

<ink-chart-text :x="-0.35*Math.sin(theta1/2)" :y="0.35*Math.cos(theta1/2)" :text="Math.abs(theta1-thetac) * 180 / Math.PI < 0.1 ? '&theta;c' : '&theta;1'" :visible="theta1 *180 / Math.PI > 25" text-anchor="end"></ink-chart-text>
<ink-chart-text :x="0.35*Math.sin(theta1/2)" :y="0.35*Math.cos(theta1/2)" text="&theta;r" :visible="theta1 *180 / Math.PI > 25"></ink-chart-text>
<ink-chart-text :x="0.4*Math.sin(theta2/2)" :y="-0.4*Math.cos(theta2/2)" :text="theta2 * 180 / Math.PI > 89 ? '90&deg;' : '&theta;2'" :visible="isFinite(theta2) && theta2 *180 / Math.PI > 25" text-anchor="middle"></ink-chart-text>

<ink-chart-path :data="[[0,0], [-Math.sin(theta1), Math.cos(theta1)]]" stroke="red"></ink-chart-path>
<ink-chart-path :data="[[0,0], [Math.sin(theta1), Math.cos(theta1)]]" stroke="black"></ink-chart-path>
<ink-chart-path :data="[[0,0], [Math.sin(theta2), -Math.cos(theta2)]]" stroke="blue" :visible="isFinite(theta2)"></ink-chart-path>

<ink-chart-circle :x="-Math.sin(thetac)" :y="Math.cos(thetac)" fill="blue"></ink-chart-circle>

<ink-chart-eqn :domain="[-theta1, theta1]" eqn="[-0.3*Math.sin(t), 0.3*Math.cos(t)]" parameterize="t" stroke="#333" stroke-width="1" stroke-dasharray="3"></ink-chart-eqn>
<ink-chart-eqn :domain="[0, theta2]" eqn="[0.3*Math.sin(t), -0.3*Math.cos(t)]" parameterize="t" stroke="#333" stroke-width="1" stroke-dasharray="3" :visible="isFinite(theta2)"></ink-chart-eqn>

<ink-chart-node r="10" fill="#ccc" :x="-Math.sin(theta1)" :y="Math.cos(theta1)" bind="{theta1: Math.atan(-x/y)}" constrain="[-Math.sin(Math.atan(-Math.min(Math.max(x,-1),-1e-10)/Math.min(Math.max(y,1e-10),1))), Math.cos(Math.atan(-Math.min(Math.max(x,-1),-1e-10)/Math.min(Math.max(y,1e-10),1)))]"></ink-chart-node>
```

Snell's Law for two layers where $v\_1$= m/s and $v\_2$= m/s. The incident angle of the incoming wave is $\theta\_1$= °. When an incident wave has an angle over the critical angle, $\theta\_c$, there is no refracted wave.

The critical refraction angle, called {math}`\theta_c`, is a key concept in refraction seismology.
This is the angle of incidence for which the corresponding angle of refraction is 90°.
In this case, the refracted ray travels horizontally along the interface.
A formula for the critical angle can be derived from Snell’s law as follows:
\frac{\sin \theta_c}{v_1} = \frac{\sin 90^{\circ}}{v_2} = \frac{1}{v_2}
