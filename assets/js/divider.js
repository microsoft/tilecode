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
    manualContent.style.pointerEvents = "none";
    simulatorContent.style.pointerEvents = "none";
    //manualContent.style.visibility = "hidden",
    //simulatorContent.style.visibility = "hidden";
    var n = divider.onmouseover
      , t = divider.onmouseout;
    divider.onmouseover = null,
    divider.onmouseout = null,
    document.body.onmousemove = function(n) {
        n || (n = window.event),
        ratio = (n.clientX - dividerWidth / 2) / document.body.clientWidth,
        ratio < .1 && (ratio = .1),
        ratio > .9 && (ratio = .9),
        setWidths()
    }
    ,
    document.body.onmouseup = function() {
        document.body.onmousemove = null,
        document.body.onmouseup = null,
        manualContent.style.pointerEvents = "auto";
        simulatorContent.style.pointerEvents = "auto";
        //manualContent.style.visibility = "inherit",
        //simulatorContent.style.visibility = "inherit",
        divider.onmouseover = n,
        divider.onmouseout = t
    }
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
