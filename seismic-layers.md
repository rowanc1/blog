---
title: Seismic Layers
description: Seismic velocity in layers.
date: 2019-05-12
tags: ['thought', 'explorable']
thumbnail: /images/ink/seismic.gif
---

What do seismic waves look like when they propagate through multiple layers of different velocity?

```{iframe} //www.youtube.com/embed/0z2WTLLKjGY?loop=1&playlist=0z2WTLLKjGY
:width: 100%
```

## Interactive Layers

In this document we will explore the different types of seismic ray paths in a three layered earth, seeing how they depend on layer depth and velocities. \
To learn more check out the online resource for [Geophysics for Practicing Geoscientists](https://gpg.geosci.xyz/content/seismic/waves_at_interfaces.html#angles-of-reflection-and-refraction), much of the text content here was adapted from that resource.

## Angles Of Reflection And Refraction

Consider a P-wave which is incident at an angle $\theta\_1$ measured with respect to the normal of the interface, as seen in the figure below where the approaching wave is represented as a ray. The angles of the reflected and refracted rays are as follows: **Law of Reflection:** The angle of reflection equals the angle of incidence. So $\theta\_r = \theta\_1$. **Law of Refraction:** The angle of refraction $\theta\_2$ is determined through Snell's Law: \frac{\sin \theta_1}{v_1} = \frac{\sin \theta_2}{v_2} If the wave travels from a low velocity medium to a high velocity medium the wave gets refracted away from the normal. Conversely, it gets refracted toward the normal if the wave goes from a high velocity to a low velocity medium.

```
</p>
<ink-var name="theta1" value="0.7853981633974483"></ink-var>
<ink-var name="v1" value="400"></ink-var>
<ink-var name="v2" value="500"></ink-var>
<ink-var name="theta2" :value="Math.asin(v2 * Math.sin(theta1) / v1)"></ink-var>
<ink-var name="thetac" :value="Math.asin(v1 / v2)"></ink-var>

<br>
<ink-aside>
    $\theta_1$: <ink-dynamic :value="theta1 * 180 / Math.PI" bind="{theta1: value * Math.PI / 180}" min="0" max="90">&deg;</ink-dynamic><br>
    $\theta_2$: <ink-span :visible="!isFinite(theta2)">No Refraction Wave</ink-span><ink-span :visible="isFinite(theta2)"><ink-display name="theta2" transform="value*180/Math.PI"></ink-display>&deg;</ink-span><br>
    $v_1$: <ink-range name="v1" min="100" :max="v2" step="10" width="100px"></ink-range> <ink-display name="v1"></ink-display> m/s<br>
    $v_2$: <ink-range name="v2" :min="v1" max="2000" step="10" width="100px"></ink-range> <ink-display name="v2"></ink-display> m/s<br>
</ink-aside>

<ink-chart xlim="[-1.1,1.1]" ylim="[-1.1,1.1]" width="400" height="400" x-axis-location="hidden" y-axis-location="hidden" style="text-align: center;">
    <ink-chart-path data="[[-1, 0], [1, 0]]" stroke="black"></ink-chart-path>
    <ink-chart-path data="[[0, -1], [0, 1]]" stroke="black" stroke-dasharray="3 3"></ink-chart-path>
    <ink-chart-text x="-0.8" y="0.15" text="v1"></ink-chart-text>
    <ink-chart-text x="-0.8" y="-0.2" text="v2 > v1"></ink-chart-text>
    <ink-chart-text :x="0.5" :y="-0.2" text="No Refraction Wave" :visible="!isFinite(theta2)" text-anchor="middle"></ink-chart-text>

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
</ink-chart>
<p style="text-align:center; font-size: 0.8em;color:#aaa">
    Snell's Law for two layers where $v_1$= <ink-display name="v1"></ink-display> m/s and $v_2$= <ink-display name="v2"></ink-display> m/s.
    The incident angle of the incoming wave is $\theta_1$= <ink-display name="theta1" transform="value*180/Math.PI"></ink-display>&deg;.
    <ink-span :visible="!isFinite(theta2)">When an incident wave has an angle over the critical angle, $\theta_c$, there is no refracted wave.</ink-span>
</p>


The critical refraction angle, called $\theta_c$, is a key concept in refraction seismology.
This is the angle of incidence for which the corresponding angle of <ink-action bind="{theta1: thetac}">refraction is 90&deg;</ink-action>.
In this case, the refracted ray travels horizontally along the interface.
A formula for the critical angle can be derived from Snell's law as follows:
<ink-equation>
    \frac{\sin \theta_c}{v_1} = \frac{\sin 90^{\circ}}{v_2} = \frac{1}{v_2}
</ink-equation>
```

## Direct Wave and Reflection off Layer 1

Time: s

## Refraction - Layer 1

When the wave in the second medium is critically refracted, it travels parallel to the interface at a speed of $v\_2$. As it travels, it radiates energy into the upper medium with the associated ray path making an angle $\theta\_c$ with the normal. This critically refracted wave is also called a "head wave". It is somewhat analogous to the bow wave of a moving boat.

Velocity 1: m/s

\

Velocity 2: m/s

\

Velocity 3: m/s

\

Offset: m

\

Time: s

## First Arrivals

Try adjusting the velocity of each layer using the controls on the right and adjust the depth of each layer by dragging the vertical sliders on the ray path plot. You can adjust the receiver offset by dragging the node on either plot. Finally, you can use the horizontal slider on the travel-time plot to explore how the rays progress as time advances. On the top plot, the path of each ray up to the time specified by the time slider are shown as thick solid lines. Thin dashed lines show how the rays will continue to propagate after the specified time. The travel-time vs offset plots for the refracted rays will be dashed for offsets at which the rays will arrive after the direct wave.

Velocity 1: m/s

\

Velocity 2: m/s

\

Velocity 3: m/s

\

Offset: m

\

Time: s

```
<ink-chart-path :data="[[0, z1], [xmax, z1]]" stroke="#333" stroke-width="0.5"></ink-chart-path>
<ink-chart-text :x="xmax" :y="z1-1" :text="'Layer 1 = ' + Math.round(z1) + 'm'" text-anchor="end"></ink-chart-text>
<ink-chart-path :data="[[0, z1+z2], [xmax, z1+z2]]" stroke="#333" stroke-width="0.5"></ink-chart-path>
<ink-chart-text :x="xmax" :y="z1+z2-1" :text="'Layer 2 = ' + Math.round(z2) + 'm'" text-anchor="end"></ink-chart-text>
<ink-chart-path :data="[[offset, 50], [offset, -5]]" stroke="#333" stroke-width="0.5"></ink-chart-path>
<ink-chart-text :x="offset - 1" y="-2" :text="'Offset = ' + Math.round(offset) + 'm'" text-anchor="end"></ink-chart-text>

<ink-chart-path :data="direct_path" stroke="red" stroke-dasharray="10 2" stroke-width="1"></ink-chart-path>
<ink-chart-path :data="direct_path_full" stroke="red" stroke-width="3"></ink-chart-path>
<ink-chart-path :data="lPath" stroke="black" stroke-dasharray="10 2" stroke-width="1"></ink-chart-path>
<ink-chart-path :data="lPath_full" stroke="black" stroke-width="3"></ink-chart-path>
<ink-chart-path :data="rPath_1" stroke="blue" stroke-dasharray="10 2" stroke-width="1" :visible="rPath_1_visible"></ink-chart-path>
<ink-chart-path :data="rPath_1_full" stroke="blue" stroke-width="3" :visible="rPath_1_visible"></ink-chart-path>
<ink-chart-path :data="rPath_2" stroke="green" stroke-dasharray="10 2" stroke-width="1" :visible="rPath_2_visible"></ink-chart-path>
<ink-chart-path :data="rPath_2_full" stroke="green" stroke-width="3" :visible="rPath_2_visible"></ink-chart-path>
<ink-chart-node :x="offset" :y="z1" bind="{offset:x, z1:y}" constrain="[Math.min(Math.max(0, x), xmax), Math.min(Math.max(2.5, y), Math.min(30, 50 - z2))]" r="10" fill="#ccc"></ink-chart-node>
<ink-chart-node :x="offset" :y="z1 + z2" bind="{offset:x, z2:y - z1}" constrain="[Math.min(Math.max(0, x), xmax), Math.min(Math.max(z1+5, y), 50)]" r="10" fill="#ccc"></ink-chart-node>
<ink-chart-node :x="Math.min(time * v1, offset)" :y="0" bind="{time:x / v1}" constrain="[Math.min(Math.max(0, x), offset), 0]" r="5" fill="red"></ink-chart-node>
```

## Time vs Depth
