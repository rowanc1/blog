---
title: 'Probability of an Oil Spill: Northern Gateway'
description: In the Northern Gateway project Enbridge calculates the expected time till first (major) oil spill. I decided to read the documents and think about probabilities over Christmas, with a few interesting results...
date: 2014-01-03
tags: ['thought', 'explorable']
thumbnail: /images/probability-of-a-spill/thumbnail.gif
---

+++
\<ink-var name=“p\_f\_array” type=“Array” value=“\[0.001, 0.0012, 0.0014, 0.0016, 0.0018, 0.002, 0.0025, 0.003, 0.0035, 0.004, 0.0045, 0.005, 0.0055, 0.006, 0.0065, 0.007, 0.0075, 0.008, 0.0085, 0.009, 0.0095, 0.01, 0.0105, 0.011, 0.0115, 0.012, 0.0125, 0.013, 0.0135, 0.014, 0.0145, 0.015, 0.0155, 0.016, 0.0165, 0.017, 0.0175, 0.018, 0.0185, 0.019, 0.0195, 0.02, 0.025, 0.03, 0.035, 0.04, 0.045, 0.05, 0.055, 0.06, 0.065, 0.07, 0.075, 0.08, 0.085, 0.09, 0.095, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55]”

>

\<ink-var name=“et2fail\_50” :value=“Math.log( 0.5 ) / Math.log( 1 - p\_f\_array\[p\_f\_pick\_50] )” format=“.1f”

>

\<ink-var name=“chance\_no\_spill\_p” :value=“Math.pow(1 - p\_f\_array\[p\_f\_pick\_p], years2fail\_p)” format=“.1%”

>



The Canadian Joint Review Panel for the proposed Enbridge Northern Gateway Project recommended that the federal government approve the project, subject to 209 required conditions.

> According to Northern Gateway risk assessments, the probability of a tanker spill of any size would be about 0.4 per cent in any given year. The company estimated the return period (average interval between events) would be 250 years for a marine spill. Northern Gateway said the probability of a full-bore rupture on the oil pipeline would be 0.2 per cent in a given year, based on an estimated return period of 464 years.
>
> National Energy Board & Canadian Environmental Assessment Agency (2013-12-19) [Joint Review Panel](http://gatewaypanel.review-examen.gc.ca/clf-nsi/dcmnt/rcmndtnsrprt/rcmndtnsrprtvlm1-eng.html#s51)

---

One curiosity of their report is the risk numbers. Let us crunch their numbers for fun! This may be of interest as they should perhaps change their calculations in future. They calculated the *expected time* until the first spill, however the *median time*, for example, until a spill may be more informative.

Northern Gateway estimates the probability of a major spill on the pipeline is 0.2% ($p = 0.002$) per year; they double this risk on the tanker transport side ($p=0.004$). It is a simple calculation from there to show that the expected number of years until the first spill is 500 years.

That is, if $p$ is the probability of a spill each year, the expected time to the first spill, $\text{E}\[s]$, is:

```
$$\text{E}[s] = \frac{1}{p}$$
```

---

## Here is the reasoning

The probability of the first spill being in year $n+1$ is the probability there is no spill in the first $n$ years, $(1-p)^n$, times the probability, $p$, that there is a spill in year $n+1$. This makes the expected year in which the first spill occurs:

```
$$\text{E}[s] = \sum_{n=0}^\infty (n+1)(1-p)^np$$

<p>
  This fortunately is a well-known infinite sum. To obtain a closed form for it we need to make
  some observations. First note that, when $q&lt;1$:
</p>

$$1 = \sum_{n=0}^\infty q^n - q( \sum_{n=0}^\infty q^n)$$

<p>so that</p>

$$\frac{1}{(1-q)} = \sum_{n=0}^\infty q^n$$

<p>differentiating this with respect to $q$ gives:</p>

$$\frac{1}{(1-q)^2} = \sum_{n=1}^\infty nq^{n-1} = \sum_{n=0}^\infty (n+1)q^n$$

<p>so that</p>

$$\text{E}[s] = \frac{1}{(1-(1-p))^2}p = \frac{1}{p}$$

<p>
  Thus, the Joint Review Panel got their math correct, although they could revisit
  <a href="http://en.wikipedia.org/wiki/Significant_figures">significant digits</a>.
</p>

<hr />
```

Interestingly, you can reverse this calculation! That is, if one has a pipeline with a first spill (assuming this has happened roughly at the expected value) one can calculate $p$. Consider the [Kalamazoo oil spill](https://en.wikipedia.org/wiki/Kalamazoo_River_oil_spill) in 2010, the largest on-land oil spill, and one of the costliest spills, in U.S. history. Of course, as it was maintained by the same company who is now proposing to build the Northern Gateway, it cannot be viewed as being completely irrelevant. This pipeline was described by the company as an aging pipeline. It was, in fact, built in the sixties so it was roughly 50 years old when it ruptured. Using this as baseline, this fixes the risk of a spill at 2% per year.

```
$$p = \frac{1}{\text{E}[s]} = \frac{1}{50} = 0.02$$
```

This is interesting, as the review panel has therefore accepted the company's assertion that (due to improved technology) the probability of a spill has decreased by an *order of magnitude* (a factor of 10) since then. Furthermore, on the basis of this the review panel was happy to state that the first expected pipeline spill is in 500 years. Recalling that the Kalamazoo spill was in 2010 and it was the same company which was responsible for maintaining that line (in an easily accessible area), this is a significant improvement!

There is another aspect of this calculation that is interesting: the review panel supplied the *expected value*. An expected value is heavily influenced by large values with very low probabilities. It is possible, though unlikely, that there will not be a spill for thousands of years! As discussed above, this calculation is a summation of the probability of a spill over all years (i.e. an infinite sum), so there are lots of large values. A different calculation is of the median, which is the time at which there is a 50% probability a spill will already have occurred.

```
<p>This suggests:</p>
<ul>
  <li :visible="icare>3">
    for $p=0.2 \%$, within 346 years there is a 50% chance of a major spill (still negligible)
  </li>
  <li :visible="icare>3">
    for $p=2.0 \%$, within 34 years there is a 50% chance of a major spill (not negligible, and
    in line with what happened)
  </li>
  <li>
    for $p=$
    <ink-dynamic
      name="p_f_pick_50"
      transform="p_f_array[value]"
      min="0"
      :max="p_f_array.length-1"
      format=".2%"
    ></ink-dynamic
    >, within <ink-display name="et2fail_50"></ink-display> years there is a 50% chance of a
    major spill
  </li>
</ul>
<p>
  In fact, surely the panel should be thinking about the probability that there is no spill over
  the lifetime of the pipeline. Suppose the pipeline is to be decommissioned in 30 years, let us
  calculate the probability that there will be no spill in that time:
</p>

<ul>
  <li :visible="icare>3">
    $p= 0.2 \%$ no spill for 30 years $(1-p)^{30} = 94 \%$ (seems good)
  </li>
  <li :visible="icare>3">
    $p= 2.0 \%$ no spill for 30 years $(1-p)^{30} = 55 \%$ (seems not so good)
  </li>
  <li>
    $p=$
    <ink-dynamic
      name="p_f_pick_p"
      transform="p_f_array[value]"
      min="0"
      :max="p_f_array.length-1"
      format=".2%"
    ></ink-dynamic>
    no spill for $x=$ <ink-dynamic name="years2fail_p" min="0" max="550"> years</ink-dynamic>
    <ink-equation inline>
      (1-
      <ink-display name="p_f_pick_p" transform="p_f_array[value]" format=".4f"></ink-display
      >)^{<ink-display name="years2fail_p"></ink-display>} =
      <ink-display name="chance_no_spill_p" format=".1f" transform="value * 100"></ink-display>
      \%
    </ink-equation>
  </li>
</ul>

<hr />
```

%  These should really be in example scopes, but still no way to share the p_f_array easily between scopes 

%  Need for showing 50% chance of a spill in years 

%  Need for showing years to fail 

## **Risky Business**: What risk of an oil spill are you comfortable with?

In order to gain insight into the potential risk of an oil spill, you can play with the parameters below! You can *drag* the blue highlighted numbers to adjust the interactive graph.

Let's say the probability of a spill is per year (Use [Table 1](#table1)). Let's say you are comfortable with a probability of *not* having a spill. **With your risk tolerance and this probability, the pipeline should not be operated longer than years.**

When the probability of a spill is the average interval between spills (the return period) as calculated by Northern Gateway is years. **At years there is a chance there has already been an oil spill.**

%  silly legend 

Figure 1: Probability of no spill when the failure rate is per year.

---

Table 1: Northern Gateway's summary of representative parameters for oil spill probabilities. *Click* a row to change the graph above.

| Spill Type                      | Return Period | Annual Probability | Page Reference                                                                                                                                                                                                    |
| ------------------------------- | ------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oil Pipeline, Other Spills      | 4 years       | 25%                | [page 67](http://gatewaypanel.review-examen.gc.ca/clf-nsi/dcmnt/rcmndtnsrprt/rcmndtnsrprtvlm1-eng.pdf) ([html](http://gatewaypanel.review-examen.gc.ca/clf-nsi/dcmnt/rcmndtnsrprt/rcmndtnsrprtvlm1-eng.html#s54)) |
| Marine Terminal Spill           | 61 years      | 1.64%              | [page 67](http://gatewaypanel.review-examen.gc.ca/clf-nsi/dcmnt/rcmndtnsrprt/rcmndtnsrprtvlm1-eng.pdf) ([html](http://gatewaypanel.review-examen.gc.ca/clf-nsi/dcmnt/rcmndtnsrprt/rcmndtnsrprtvlm1-eng.html#s54)) |
| Oil Pipeline, Full-bore Rupture | 240 years     | 0.417%             | [page 67](http://gatewaypanel.review-examen.gc.ca/clf-nsi/dcmnt/rcmndtnsrprt/rcmndtnsrprtvlm1-eng.pdf) ([html](http://gatewaypanel.review-examen.gc.ca/clf-nsi/dcmnt/rcmndtnsrprt/rcmndtnsrprtvlm1-eng.html#s54)) |
| Tanker Spill (any size)         | 250 years     | 0.4%               | [page 60](http://gatewaypanel.review-examen.gc.ca/clf-nsi/dcmnt/rcmndtnsrprt/rcmndtnsrprtvlm1-eng.pdf) ([html](http://gatewaypanel.review-examen.gc.ca/clf-nsi/dcmnt/rcmndtnsrprt/rcmndtnsrprtvlm1-eng.html#s51)) |
| Full-Bore Rupture, Oil Pipeline | 464 years     | 0.2%               | [page 60](http://gatewaypanel.review-examen.gc.ca/clf-nsi/dcmnt/rcmndtnsrprt/rcmndtnsrprtvlm1-eng.pdf) ([html](http://gatewaypanel.review-examen.gc.ca/clf-nsi/dcmnt/rcmndtnsrprt/rcmndtnsrprtvlm1-eng.html#s51)) |

## Special Thanks

*   Tangle.js

    [http://​worrydream​.com​/Tangle/](http://worrydream.com/Tangle/)

*   d3.js

    <http://d3js.org/>

*   Collision Detection

    [http://​bl​.ocks​.org​/mbostock​/3231298](http://bl.ocks.org/mbostock/3231298)

*   Family

    and time over the holidays!

---

## Some Extra Reading

*   Review Panel Report

    [http://​gatewaypanel​.review​-examen​.gc​.ca​/clf​-nsi​/hm​-eng​.html](http://gatewaypanel.review-examen.gc.ca/clf-nsi/hm-eng.html)

*   Dogwood Initiative

    [http://​dogwoodinitiative​.org​/no​-tankers​/learn​-more](http://dogwoodinitiative.org/no-tankers/learn-more)

*   Wikipedia

    [Kalamazoo River oil spill](https://en.wikipedia.org/wiki/Kalamazoo_River_oil_spill)
