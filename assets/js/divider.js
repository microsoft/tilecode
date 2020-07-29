function setWidths() {
    var t = document.body.clientWidth
      , n = Math.floor(t * ratio)
      , i = Math.max(t - n - dividerWidth, 8);
    leftContent.style.width = n + "px";
    divider.style.left = n + "px";
    divider.style.width = dividerWidth + "px";
    rightContent.style.left = n + dividerWidth + "px";
    rightContent.style.width = i + "px";
}

function startDrag() {
    let n = divider.onmouseover;
    let t = divider.onmouseout;
    divider.onmouseover = null;
    divider.onmouseout = null;
    leftContent.style.display = "none";
    rightContent.style.display = "none";
    document.body.onmousemove = function newMouseMove(e) {
        console.log("mousemove");
        if (!e) e = window.event;
        ratio = (e.clientX - dividerWidth/2) / document.body.clientWidth;
        if (ratio < .1) ratio = .1;
        if (ratio > .9) ratio = .9;
        setWidths();
    }
    document.body.onmouseup = function newMouseUp(e) {
        console.log("mouseup")
        if (!e) e = window.event;
        document.body.onmousemove = null;
        document.body.onmouseup = null; 
        divider.onmouseover = n;
        divider.onmouseout = t;
        leftContent.style.display = "block";
        rightContent.style.display = "block";
    }
}

var divider = document.getElementById("divider")
  , leftContent = document.getElementById("manual")
  , rightContent = document.getElementById("simframe")
  , ratio = .6
  , dividerWidth = 8;

window.onresize = setWidths;
setWidths()

divider.onmouseover = function() {
    document.body.style.cursor = "w-resize";
    divider.onmousedown = startDrag;
}

divider.onmouseout = function() {
    document.body.style.cursor = "default";
    divider.onmousedown = null;
}
