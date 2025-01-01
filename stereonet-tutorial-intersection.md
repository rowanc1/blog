---
title: Line of intersection
description: Interactive lesson on how to plot a line of intersection on a stereonet.
date: 2013-04-26
tags: ['stereonet', 'explorable']
thumbnail: /images/stereonet/tutorial-intersection.gif
---

+++

## Intersection of Two Planes: and

:::{aside}

- Plot Plane 1:
- Plot Plane 2:
- Measure Line:
- Measure
  To the strike:
- Tick

  Use a pencil!

- Rotate

  Align N-S

- Measure

  From the right. Dip:

- Trace

  Draw a great circle.

- Rotate

  Back to north.

- Erase

  Did you use a pencil?

- Pick

  The line of intersection.

- Rotate

  Align E-W

- Measure

  The plunge is:

- Rotate

  Back to north.

- Measure

  The trend is:

- Visualize

  Two planes.

- Visualize

  One Line:

  /

- Remember

  It should be fun!

Step Play Pause
:::

```
    function setAniTime(time){
    $("#overlay").css({"-webkit-transition": "all "+time+"ms ease-in-out",
                        "-moz-transition": "all "+time+"ms ease-in-out",
                        "-ms-transition": "all "+time+"ms ease-in-out",
                        "-o-transition": "all "+time+"ms ease-in-out",
                        "transition": "all "+time+"ms ease-in-out"});
    }
    setAniTime(aniTime);

    function rotate(degree) {
        $('#overlay').css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
        $('#overlay').css({ '-moz-transform': 'rotate(' + degree + 'deg)'});
    }

    snet = new VG.SNet();
    overlay = new VG.SNet();
    snet.init('#base',rad);
    snet.numbers();
    overlay.showNet = false;
    overlay.showFineNet = false;
    overlay.init('#overlay',rad);
    overlay.circle.remove();
    overlay.lineNS.remove();
    overlay.lineEW.remove();

    var strike1 = 0;
    var dip1 = 0;
    var strike2 = 0;
    var dip2 = 0;

    var fmtStk = VG.NumberFormat.Strike();
    var fmtDip = VG.NumberFormat.Dip();

    var plane1 = new VG.SNetPlane(strike1,dip1);
    var plane2 = new VG.SNetPlane(strike2,dip2);
    plane1.lineAttr['stroke-width'] = 5;
    plane1.lineAttr['stroke'] = '#5C99E6';
    plane1.showPole = false;
    plane2.lineAttr['stroke-width'] = 5;
    plane2.lineAttr['stroke'] = '#74AF16';
    plane2.showPole = false;


    var steps = $('#headerSteps').children('li');

    var offset = 0;
    var planeArc1,planeArc2,measure,tick,line,lineObj;
    var funs = [
        function(){
            steps.css({background:"#003366"});$(steps[0]).css({background:"#74AF16"});
            offset = 0;
            $('#overlay').show();
            strike1 = nextInt(330)+20;
            dip1 = nextInt(50)+25;
            strike2 = nextInt(330)+20;
            dip2 = nextInt(50)+25;
            if(lineObj){plane1.remove();plane2.remove();lineObj.remove();}
            $(".strike1").html(fmtStk.format(strike1));
            $(".dip1").html(fmtDip.format(dip1));
            $(".strike2").html(fmtStk.format(strike2));
            $(".dip2").html(fmtDip.format(dip2));
            $(".strike").html(fmtStk.format(strike1));
            $(".dip").html(fmtDip.format(dip1));
            $(".trend").html('???').css({background:"none"});
            $(".plunge").html('??').css({background:"none"});
            $(".plane1").css({"border-bottom":"10px solid #5C99E6"});
            measure = overlay.annotate('circle',[0,strike1],1,aniTime);
            return aniTime*1.35;
        },
        function(){
            tick = overlay.annotate('tick',strike1,1,aniTime);
            return aniTime*1.5;
        },
        function(){
            rotate(-strike1)
            return aniTime*1.5;
        },
        function(){
            line = overlay.annotate('line',[strike1+90,0],[strike1+90,dip1],aniTime);
            return aniTime*1.5;
        },
        function(){
            plane1.dip = dip1;
            plane1.strike = 0;
            planeArc1 = plane1.drawArc(snet,aniTime);
            plane1.strike = strike1;
            return aniTime*1.5;
        },
        function(){
            planeArc1.remove();
            plane1.draw(overlay);
            rotate(0);
            return aniTime*1.5;
        },
        function(){
            tick.remove();
            measure.remove();
            line.remove();
            return aniTime;
        },
        //PLANE 2
        function(){
            offset = -7;
            steps.css({background:"#003366"});$(steps[1]).css({background:"#74AF16"});
            $(".plane1").css({"border-bottom":"none"});
            $(".plane2").css({"border-bottom":"10px solid #74AF16"});
            $(".strike").html(fmtStk.format(strike2));
            $(".dip").html(fmtDip.format(dip2));
            measure = overlay.annotate('circle',[0,strike2],1,aniTime);
            return aniTime*1.35;
        },
        function(){
            tick = overlay.annotate('tick',strike2,1,aniTime);
            return aniTime*1.5;
        },
        function(){
            rotate(-strike2)
            return aniTime*1.5;
        },
        function(){
            line = overlay.annotate('line',[strike2+90,0],[strike2+90,dip2],aniTime);
            return aniTime*1.5;
        },
        function(){
            plane2.dip = dip2;
            plane2.strike = 0;
            planeArc2 = plane2.drawArc(snet,aniTime);
            plane2.strike = strike2;
            return aniTime*1.5;
        },
        function(){
            planeArc2.remove();
            plane2.draw(overlay);
            rotate(0);
            return aniTime*1.5;
        },
        function(){
            $(".plane2").css({"border-bottom":"none"});
            tick.remove();
            measure.remove();
            line.remove();
            return aniTime;
        },
        //LINE
        function(){
            steps.css({background:"#003366"});$(steps[2]).css({background:"#74AF16"});
            lineObj = plane1.intersect(plane2);
            lineObj.pointAttr['fill'] = '#000000';
            lineObj.draw(overlay);
            lineObj.pulse();
            return aniTime;
        },
        function(){
            rotate(90-lineObj.trend);
            return aniTime;
        },
        function(){
            tick = overlay.annotate('tick',lineObj.trend,1,aniTime);
            line = overlay.annotate('line',[lineObj.trend,0],[lineObj.trend,lineObj.plunge],aniTime);
            $(".plunge").html(fmtDip.format(lineObj.plunge)).css({background:"#74AF16"});
            return aniTime*2.5;
        },
        function(){
            rotate(0);
            return aniTime*1.5;
        },
        function(){
            $(".trend").html(fmtStk.format(lineObj.trend)).css({background:"#74AF16"});
            measure = overlay.annotate('circle',[0,lineObj.trend],1,aniTime);
            return aniTime*1.85;
        },
        function(){
            lineObj.stop();
            tick.remove();
            measure.remove();
            line.remove();
            $('#overlay').hide();
            snet.to3D();
            plane1.lineAttr['fill-opacity'] = plane2.lineAttr['fill-opacity'] = 1;
            plane1.lineAttr['fill'] = '#5C99E6';
            plane2.lineAttr['fill'] = '#74AF16';
            plane1.draw(snet);
            plane2.draw(snet);
            return aniTime*2;
        },
        function(){
            plane1.lineAttr['fill-opacity'] = plane2.lineAttr['fill-opacity'] = 0;
            plane1.draw(snet);
            plane2.draw(snet);
            lineObj.draw(snet);
            return aniTime*2;
        },
        function(){
            snet.to2D();
            plane1.draw(snet);
            plane2.draw(snet);
            lineObj.draw(snet);
            return aniTime*2;
        }
    ];

    var pos = 0;
    var list = $('#list').children('dt');
    var timer;
    var isPlaying = true;
    function pause(){
        clearTimeout(timer);
        isPlaying = false;
    }
    function play(){
        if(!isPlaying){
            isPlaying = true;
            animate();
        }
    }
    function step(){
        if(!isPlaying){
            animate();
        }
    }
    function animate(){
        var time = funs[pos]();
        list.removeClass('active');
        $(list[pos+offset]).addClass('active');
        pos += 1;
        if(pos >= funs.length){
            pos = 0;
        }
        if(isPlaying){
            timer = setTimeout(animate,time);
        }
    }
    animate();

    $("#playButton").click(play);
    $("#pauseButton").click(pause);
    $("#stepButton").click(step);
});
```
