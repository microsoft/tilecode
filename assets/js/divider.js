function setWidths() {
    var t = document.body.clientWidth
      , n = Math.floor(t * ratio)
      , i = Math.max(t - n - dividerWidth, 4);
    leftContent.style.width = n + "px";
    divider.style.left = n + "px";
    divider.style.width = dividerWidth + "px";
    rightContent.style.left = n + dividerWidth + "px";
    rightContent.style.width = i + "px";
}

function startDrag() {
    let n = divider.onmouseover;
    let t = divider.onmouseout;
    divider.onmousedown = null;
    divider.onmouseover = null;
    divider.onmouseout = null;
    leftContent.style.display = "none";
    rightContent.style.display = "none";
    document.body.onmousemove = function newMouseMove(e) {
        if (!e) e = window.event;
        e.preventDefault();
        ratio = e.clientX / document.body.clientWidth;
        if (ratio < .1) ratio = .1;
        if (ratio > .9) ratio = .9;
        setWidths();
    }
    document.body.onmouseup = function newMouseUp(e) {
        if (!e) e = window.event;
        e.preventDefault();
        document.body.onmousemove = null;
        // removeEventListener('mousemove', newMouseMove, true);
        document.body.onmouseup = null; 
        // removeEventListener('mouseup', newMouseUp, true);
        //document.removeEventListener('mouseup', newMouseUp);
        divider.onmouseover = n;
        divider.onmouseout = t;
        leftContent.style.display = "block";
        rightContent.style.display = "block";
    }
    //document.body.addEventListener('mousemove', newMouseMove, true);
    //document.addEventListener('mouseup', newMouseUp, true);
    //document.addEventListener('mouseup', newMouseUp);
}

var divider = document.getElementById("divider")
  , leftContent = document.getElementById("simframe")
  , rightContent = document.getElementById("manual")
  , ratio = .6
  , dividerWidth = 4;

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
