function setWidths() {
    var t = document.body.clientWidth
      , n = Math.floor(t * ratio)
      , i = Math.max(t - n - dividerWidth, 4);
    manualContent.style.width = n + "px";
    divider.style.left = n + "px";
    divider.style.width = dividerWidth + "px";
    simulatorContent.style.left = n + dividerWidth + "px";
    simulatorContent.style.width = i + "px";
}

function startDrag() {
    let n = divider.onmouseover;
    let t = divider.onmouseout;
    divider.onmousedown = null;
    divider.onmouseover = null;
    divider.onmouseout = null;
    function newMouseMove(e) {
        if (!e) e = window.event;
        e.preventDefault();
        ratio = e.clientX / document.body.clientWidth;
        if (ratio < .1) ratio = .1;
        if (ratio > .9) ratio = .9;
        setWidths();
    }
    function newMouseUp(e) {
        if (!e) e = window.event;
        e.preventDefault();
        document.body.removeEventListener('mousemove', newMouseMove, true);
        document.body.removeEventListener('mouseup', newMouseUp, true);
        document.body.removeEventListener('mouseup', newMouseUp);
        divider.onmouseover = n;
        divider.onmouseout = t;
    }
    document.body.addEventListener('mousemove', newMouseMove, true);
    document.body.addEventListener('mouseup', newMouseUp, true);
    document.body.addEventListener('mouseup', newMouseUp);
}

var divider = document.getElementById("divider")
  , manualContent = document.getElementById("manual")
  , simulatorContent = document.getElementById("simframe")
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
