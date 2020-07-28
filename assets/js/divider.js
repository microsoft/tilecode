function setWidths() {
    var t = document.body.clientWidth
      , n = Math.floor(t * ratio)
      , i = Math.max(t - n - dividerWidth, 4);
    manualContent.style.width = n + "px",
    divider.style.left = n + "px",
    divider.style.width = dividerWidth + "px",
    simulatorContent.style.left = n + dividerWidth + "px",
    simulatorContent.style.width = i + "px"
}

function startDrag() {
    let n = divider.onmouseover;
    let t = divider.onmouseout;
    divider.onmouseover = null;
    divider.onmouseout = null;
    function newMouseMove(e) {
        e || (e = window.event),
        ratio = (e.clientX - dividerWidth / 2) / document.body.clientWidth,
        ratio < .1 && (ratio = .1),
        ratio > .9 && (ratio = .9),
        setWidths(),
        e.preventDefault();
    }
    function newMouseUp(e) {
        e || (e = window.event),
        document.body.removeEventListener('mousemove', newMouseMove),
        document.body.removeEventListener('mouseup', newMouseUp),
        divider.onmouseover = n,
        divider.onmouseout = t,
        e.preventDefault();
    }
    document.body.addEventListener('mousemove', newMouseMove, true);
    document.body.addEventListener('mouseup', newMouseUp, true);
}

var divider = document.getElementById("divider")
  , manualContent = document.getElementById("manual")
  , simulatorContent = document.getElementById("simframe")
  , ratio = .6
  , dividerWidth = 4;
window.onresize = setWidths
setWidths()

divider.onmouseover = function() {
    document.body.style.cursor = "w-resize",
    divider.onmousedown = startDrag
}

divider.onmouseout = function() {
    document.body.style.cursor = "default",
    divider.onmousedown = null
}
