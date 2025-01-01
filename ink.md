---
title: Ink Components
description: Scientific web components
date: 2019-05-12
tags: ['bricks', 'projects']
thumbnail: /images/ink/tangled-cookies.gif
---

The goal of [components.ink](https://components.ink) is to provide web-components for interactive scientific writing, reactive documents and [explorable explanations](https://explorabl.es/). Included in [components.ink](https://components.ink) are ways to create, update and display variables as text, equations and charts.

::::{aside}
:::{figure} images/logo/ink.png
Check out [components.ink](https://components.ink) to learn more about the library.
:::
::::

## Tangled Cookies

`ink` is heavily inspired by [tangle.js](http://worrydream.com/Tangle/guide.html), re-imagined to use web-components! This means you can declaratively write your variables and how to display them in `html` markup. To get an idea of what that looks like, let's take the canonical example of Tangled Cookies - a simple reactive document to encourage you to not eat more than 42 cookies in one day.

```
<ink-var name="hide" value="1"></ink-var>


<ink-button bind="{hide: !hide}" :text="(!hide ? 'Hide' : 'Show') + ' Advanced Example'" style="float: right; margin-right: 5px;"></ink-button>
<ink-div :visible="!!hide">
    <ink-demo>
        <ink-var name="cookies" value="3" format=".4"></ink-var>
        <p>
            When you eat <ink-dynamic name="cookies" min="2" max="100"> cookies</ink-dynamic>,
            you consume <ink-display :value="cookies * 50" format=".0f"/></ink-display> calories.
        </p>
    </ink-demo>
</ink-div>

<ink-div :visible="!hide">
    <ink-demo>
        <ink-var name="cookies" value="3" format=".4"></ink-var>
        <ink-var name="caloriesPerCookie" value="50"></ink-var>
        <ink-var name="dailyCalories" value="2100"></ink-var>

        <ink-var name="calories" :value="cookies * caloriesPerCookie" format=".0f"></ink-var>
        <ink-var name="dailyPercent" :value="calories / dailyCalories" format=".0%"></ink-var>

        <p>
            When you eat <ink-dynamic name="cookies" min="2" max="100"> cookies</ink-dynamic>,
            you consume <ink-display name="calories"></ink-display> calories.<br>
            That's <ink-display name="dailyPercent"></ink-display> of your recommended daily calories.
        </p>
    </ink-demo>
</ink-div>
```

---

Examples
