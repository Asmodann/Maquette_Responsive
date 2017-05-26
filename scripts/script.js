function include(file) {
  var script = document.createElement("script");
  script.src = "scripts/" + file.toLowerCase() + ".js";
  document.head.appendChild(script);
}

include("my_jquery");
var c = 0;
var timer = 5000;

window.addEventListener("load", function() {
  var haveSubnav = $(".have-subnav");
  var sliderBtn = $(".slider-content__btn");

  for (var i = 0; i < haveSubnav.length; i++) {
    var parent = haveSubnav[i].parentElement;
    clicked(haveSubnav[i], i, parent);
  }

  for (i = 0; i < sliderBtn.length; i++) {
    slider(sliderBtn[i]);
  }

  setInterval(slider_images, timer);
});

var clicked = function(link, k, parent) {
  link.addEventListener("click", function(evt) {
    var subnav = parent.children[1];
    var arrows = $(".navigation-menu__i");
    var arrow = link.children[0];
    for (var i = 0; i < arrows.length; i++) {
      arrows[i].setAttribute("class", "navigation-menu__i");
    }
    evt.preventDefault();
    var others = $(".navigation-menu__subnav-content");
    for (i = 0; i < others.length; i++) {
      if (others[i].tagName === "UL" && others[i] !== subnav) {
        others[i].setAttribute("class", "navigation-menu__subnav-content");
      }
    }
    if (subnav.getAttribute("class") === "navigation-menu__subnav-content") {
      subnav.setAttribute("class", "navigation-menu__subnav-content--active");
      arrow.setAttribute("class", "navigation-menu__i--active");
    } else {
      subnav.setAttribute("class", "navigation-menu__subnav-content");
    }
  });
};

var slider = function(btn) {
  btn.addEventListener("click", function(evt) {
    evt.preventDefault();
    slider_images(btn);
  });
};

var slider_images = function(btn) {
  var images = $(".slider-content__image");
  var selector = $(".slider-content__a-selector");

  if (btn === undefined) {
    c += 1;
    if (c === images.length) {
      c = 0;
    }
  } else {
    if (btn.getAttribute("class").match(/next/)) {
        c += 1;
      if (c > images.length - 1)
        c = 0;
    } else if (btn.getAttribute("class").match(/prev/)) {
        c -= 1;
      if (c < 0)
        c = images.length - 1;
    }
  }
  show_image(images, selector);
};

var show_image = function(images, selector) {
  for (var i = 0; i < images.length; i++) {
    if (i === c) {
      images[i].setAttribute("class", "slider-content__image--active");
      selector[i].setAttribute("class", "slider-content__a-selector--active");
    } else {
      images[i].setAttribute("class", "slider-content__image");
      selector[i].setAttribute("class", "slider-content__a-selector");
    }
  }
};