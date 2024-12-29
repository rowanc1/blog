---
title: On Teaching the Stereonet
description: Thoughts on how to use the stereonet in education.
date: 2013-06-14
tags: ['thoughts', 'stereonet']
---

On my way to a conference in Italy, I chose to spend a week in France: hiking, drinking coffee and wine, and thinking about education. One thing that has been bugging me lately is how the geoscience community teaches how to manipulate and interrogate spatially oriented data. There are lots of problems that require us to take spatially oriented data visualize the data in a meaningful way, and synthesize what it all means!

For example, we might go out into the field, and collect many measurements of folded beds, which might have folds on the order of centimeters or kilometers. Are these folds related? What were the regional pressures that created these folds? We must find a way to synthesize the information into a few meaningful clues that tell us more than the data themselves. This is science after all.

## Stereonet

In structural geology education the stereonet is our tool of choice, it allows visualization of things like bedding plane orientations among other things. So how do we use it? First write down all of the bedding plane data that you collected in the field (strikes and dips), and forget about where it came from; that is forget about the location information of the data. We are only going to care, right now, about the bedding planes orientation in space. A single bedding plane inside the bottom half of a sphere might look like this:

:::{figure} images/stereonet/snet3d.png
A plane in 3D intersecting with a sphere.
:::

### Stereographic Projection

The game now goes like this: that beautiful 3D diagram is hard to draw in my notebook, so let's do some crazy 'stereographic' projection to only look at the bedding plane in two dimensions.

:::{figure} images/stereonet/3d_to_2d.png
Rotate the stereonet so you look at it from the top, and project it into two dimensions.
:::

Wonderful, let's do exactly the same thing for the the rest of our data!

:::{figure} images/stereonet/alldata.png
Information overload!
:::

#### Planes

Yes, that is a lot more data, but right away you can see a pattern (ah, science): you can see the darker spot in center-right. Let us do one more thing to clean up our data: every one of our planes has a single line that uniquely defines the plane. But what does it all mean!?! Try this: raise your right hand \[and repeat after me...or not], your hand is the bedding plane: stick a finger of your left hand through the gaps between the fingers of your right hand. Notice that, if you keep your finger in one place, you can 'spin' your right hand around it, but you cannot \[without breaking your precious finger] change the orientation of your bedding plane, err, hand.

#### Lines

So with that, you may be somewhat convinced that there is only a single line (finger) that defines the orientation of a plane (hand). For lack of a picture of hands doing strange things, we shall look at this in 3D:

:::{figure} images/stereonet/pole.png
What your finger and hand should have looked like.
:::

We shall refer to this unique line as a _pole_, or _a normal_ to the plane. Again, let us play the game of rotating this up into two dimensions so we can work with it in our notebooks.

:::{figure} images/stereonet/pole2d.png
Rotate again into 2D, and plot the pole.
:::

#### What About Points?!

Some things to notice: when we went from three dimensions to two dimensions, planes become lines, and lines become points. So by that logic, what on earth happens to points? _Do they disappear_? Ah, but don't you remember we threw away that information when we got rid of location data right at the beginning, so that is OK!

Let us replot all of our data, but instead of drawing both the plane and the pole let's just plot the poles:

:::{figure} images/stereonet/poles.png
Poles to our bedding planes.
:::

### Best Fitting Planes

Again, there is some sort of order to this clutter of points. It looks to me that we can approximate all of those data points by a single (best-fitting) plane. Nature is not exact, so we can expect some noise around our approximation.

:::{figure} images/stereonet/bestfit2d.png
The best fitting plane.
:::

We have done quite a few things to get here, but it is best to remember what this all looks like in 3D:

:::{figure} images/stereonet/bestfit3d.png
Remember that this is in 3D, right!
:::

So now we have an approximation of all of our data with just two numbers (the strike and dip of this weird-orange-plane)! The cool thing about approximating things, is now we can model it! I will choose to model this fold in a wonderful little program of my own creation: Visible Geology.

### Remember it is a Fold

We have to create the fold so that if we cut the weird-orange-plane through the fold, it would always look the same. So we can twiddle with the program a bit (you need to add a tilting event as well as a folding event, although they may have happened at the same time!). I have put a cross section in that has the same strike as the weird-orange-plane.

:::{figure} images/stereonet/model1.png
The folding event.
:::

:::{figure} images/stereonet/model2.png
Looking down the 'hinge line': the pole of our weird-orange-plane.
:::

If you are viewing this in a good browser, the following should allow you to play around a bit:

Cool right?!

## Simulate Data!

But, the sceptical scientist in you is screaming: "I do not believe!", how on earth did you go from a weird-orange-plane to a folding event that looked like that?!?!

Quite correct, we should really test this hypothetical model. What did we do before? We went and took measurements: there's an app for that, go to the _explore_ tab!

:::{figure} images/stereonet/model4.png
Create some test data.
:::

Now that we have data, let's plot it up, and see how it compares. And when I say you should do it, really I mean click a button and discover the magic of automation:

:::{figure} images/stereonet/model5.png
Plot all of the data on a stereonet (click a button!)
:::

Looks pretty good, a bit too perfect in my opinion (obviously the computer is very good at using a Brunton compass). What I think is extremely useful now, is to take that 3D view, and train yourself to look at the stereonet in 3D, and then switch back to the block diagram. Back and forth, until it clicks. Then the next step, rotate the stereonet up and down 2D-3D-2D-3D until that clicks.

:::{figure} images/stereonet/model6.png
Convince yourself of what you are looking at. Switch back and forth between the views of the block and the stereonet.
:::

Maybe you believe now that all that crazy data we had, really just represented one regional folding scheme. We took the data from our notebook, learned a new way to look at it, simplified that way of looking at it, synthesized the data into a few numbers, used those numbers to create a model, and then tested that model/hypothesis to see if we got back our data. And somehow it all worked! Now you can make important points and observations about the area, compare our area to other areas, show your friends pretty pictures in 3D and with excellent color schemes, and grab a coffee \[maybe at a french cafe!].

Sounds like science to me.

## Thoughts on Teaching Stereonets

I was motivated to write this article because I wanted to complain about how traditional methods of teaching stereonets can be pretty bad. This was my experience when I learned them, and numerous quotes can be found of students complaining of stereonets, not getting it, or instructors saying that the stereonet is a notoriously difficult concept to teach. My plea is: **_can't it be better_**?!

I thought I could just jump right into ranting, but that would not be overly productive, so I grabbed a dataset and did some science. I tried not to focus on what a stereonet is, or how to create it, very little terminology, and _most certainly_ I did not tell you how to do this all by hand: _Draw 200 planes, by hand, come back next year and we will tell you what it all means._

It all comes down to: **_what do we want students to learn_**? How to plot a plane on a stereonet? Really? If this is truly the case, by all means steal hours away from the students and force them to get their pins out of their erasers and struggle with _abstractions of dimensionality_. Beat a drum as you strap on the blinders: (1) draw a circle, (2) rotate your tracing paper, (3) count to 35, (4) rotate, all together now, boom boom, (5) Trace, make sure your hand isn't shaking, (6) admire the line. Don't you get it?!?! Well maybe if we do it again...

I wonder, perhaps, if we show the students the point of it all in some novel and inspiring ways; if we remove the blinders, and let the students explore to the beat of their own drum, perhaps, if we are lucky _we won't even have to teach a thing_.

Now, you might believe I am attacking the stereonet, but no I think it is a wonderful and beautiful piece of technology: great for visualizing large data sets and it has stood the test of time. However, creating detailed stereonets by hand is a struggle because many students do not see the point and cannot visualize the concept: **_we_** have lost them, our fault not theirs.

From an educational perspective there is a price to any piece of technology, be it software or a rotating piece of tracing paper: the price is _learning the technology_. Traditionally we have to teach the students **_tricks_** of how to plot a plane on the stereonet, and I believe that this approach often overshadows **_learning the concepts_** of what is going on in a higher dimension. If we dedicate our time to teaching students the tricks of how to complete an exercise (e.g. intersection between two planes or simply plotting a plane) then it will be easy for the student to forget why they are following the rote-memorized steps. I believe that we should start with a technology that lowers the barrier to visualization of the concept, and circumvents the learning of tricks.

What is a stereonet but _math disguised as pretty pictures_, perhaps we should give students the choice between the pretty pictures and the linear algebra. Then the students will fall in love with stereonets! Ah well, that is a topic for another day.

$$
\mathbf{u \times v}= \begin{vmatrix} u_2 & u_3\\\ v_2 & v_3 \end{vmatrix}\mathbf{i} +\begin{vmatrix} u_3 & u_1\\\ v_3 & v_1 \end{vmatrix}\mathbf{j} +\begin{vmatrix} u_1 & u_2\\\ v_1 & v_2 \end{vmatrix}\mathbf{k}
$$

---

### On the Twitter

There is an [interesting conversation](https://twitter.com/stressrelated/status/228956660612358144) on Twitter that asks some of these questions. Some of the highlights and questions these bring up are:

> \@[stressrelated](https://twitter.com/stressrelated) I think you have to at least START by hand for the hands-on learners...- \
> Callan Bentley (\@callanbentley) [July 27, 2012](http://twitter.com/#!/callanbentley/status/228998013236957184)

I think there are many more ways to be hands on, than by doing things by hand. I also believe that you should always *start *with the concept of what you are doing, and only jump to the technology (of tracing paper and tricks for plotting) when the student has a solid idea of what the stereonet visualizes.

\@stressrelated also points out what I have been trying to say: _what are we trying to teach students_?

> \@[stressrelated](https://twitter.com/stressrelated) \@[callanbentley](https://twitter.com/callanbentley) Messing up stereonets is important! Going through process got me thinking about angles and orientation...- \
> Patrick Donohue (\@poikiloblastic) [July 31, 2012](http://twitter.com/#!/poikiloblastic/status/230373141657047040)

The process of plotting and interacting with the stereonet is important. In developing my software, I have tried to digitize that interactive experience: you have planes that you can create by clicking and dragging, not just by entering in a spreadsheet. Additionally, you can rotate into three-dimensions to explore the angles and orientations _without_ the abstraction of the stereonet.

---

## Conclusions & Questions

To sum up, stereonets are excellent tools for visualizing data, however, I believe they are traditionally taught poorly, and **_it can be done better_**. We should pick the technology that gets out of the way and is easy for students to **_play_** with: this allows us to teach **_science_**. In my opinion, the technology of spinning tracing papers is clumsy, inefficient, and outdated.

> Let's teach science and concepts not tricks and techniques.

### Is all software the same?

I believe that the act of pasting data and clicking buttons is not going to teach your students anything. In fact, this might be why so many instructors avoid stereonet programs! What I have built is an interactive stereonet program that is based on interactivity and the link between 3D and 2D representations of data. Engaging and interacting with the data is what is key, this is often not possible in many software packages.

### Does this mean that we stop teaching hand based methods completely?

Not necessarily! I think it is extremely important to have many ways of interacting with data, however, the focus must be on the data and what it means, not on the tricks of how to plot it.

### If we don't teach our students to do it by hand, how on earth will we test them?

Sketches. Do we actually care what the intersection is between road cut #17 and geologic layer #27? No, neither does the student. Why not just tell them to sketch inside a circle what the orientation of the layers are, and estimate the intersection. Not only is this faster, but it ensures that the student has _learned_ the concepts and is not following rote-memorized steps.

This was written between sips of cafe au lait, overlooking a French city. I have probably forgotten and overlooked quite a few things. Feel free to correct me via Twitter.
