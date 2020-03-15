let war = new Deck();


function getWidth() {
    // return Math.max(
    //   document.body.scrollWidth,
    //   document.documentElement.scrollWidth,
    //   document.body.offsetWidth,
    //   document.documentElement.offsetWidth,
    //   document.documentElement.clientWidth
    // );

    return window.outerWidth;
  }

  setInterval(() => 
  {
            document.getElementById("widthDebug").innerHTML = getWidth();
  }, 10);