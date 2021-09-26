/* -------------------------------------------------------------------
 * Theme Name            : DesignMG Template
 * Author Name           : Amir Moghadasi
 * Version               : 1.0
 * File                  : main.js
------------------------------------------------------------------- */
/* -------------------------------------------------------------------
   All Functions                               
   ------------------------ /
 * 01.Preloader
 * 02.Nav and Scroll Top Btn
 * 03.Magnific Popup
 * 04.Isotope Js
 * 05.Owl Carousel
 * 06.Scroll It
 * 07.Counter Up
 * 08.WOW JS
------------------------------------------------------------------- */

$(document).ready(function () {
  // All Functions
  DesignMG_PreLoader();
  DesignMG_Nav();
  DesignMG_MGFPopup();
  DesignMG_IsotopeJs();
  DesignMG_OwlCarousel();
  DesignMG_ScrollIt();
  DesignMG_CounterUp();
  DesignMG_WowJs();
  DesignMG_PhoneNumAjax();
});

/* -------------------------------------------------------------------
 * 01.Preloader
------------------------------------------------------------------- */
function DesignMG_PreLoader() {
  // Variables
  let preloaderWrap = $("#preloader-wrap");
  let loaderInner = preloaderWrap.find(".preloader-inner");

  $(window).ready(function () {
    loaderInner.fadeOut();
    preloaderWrap.delay(350).fadeOut("slow");
  });
}
/* -------------------------------------------------------------------
 * 02.Nav and Scroll Top Btn
------------------------------------------------------------------- */
function DesignMG_Nav() {
  // Variables
  let header = $(".header");
  let scrollTopBtn = $(".scroll-top-btn");
  let scrollTop = $(window).scrollTop();
  // When Window On Scroll
  $(window).on("scroll", function () {
    let scrollTop = $(this).scrollTop();

    if (scrollTop > 50) {
      header.addClass("header-shrink");
      scrollTopBtn.addClass("active");
    } else {
      header.removeClass("header-shrink");
      scrollTopBtn.removeClass("active");
    }
  });

  // The same process is done without page scroll to prevent errors.
  if (scrollTop > 50) {
    header.addClass("header-shrink");
    scrollTopBtn.addClass("active");
  } else {
    header.removeClass("header-shrink");
    scrollTopBtn.removeClass("active");
  }
}

/* -------------------------------------------------------------------
 * 03.Magnific Popup
------------------------------------------------------------------- */
function DesignMG_MGFPopup() {
  $(".sample").magnificPopup({
    delegate: ".zoom-sample-img",
    type: "image",
  });
}

/* -------------------------------------------------------------------
 * 04.Isotope Js
------------------------------------------------------------------- */
function DesignMG_IsotopeJs() {
  // init Isotope
  var $grid = $(".grid").isotope({
    // options
    isOriginLeft: false,
  });
  // filter items on button click
  let portfolioFilterBtn = $(".filter-button-group button");
  $(".filter-button-group").on("click", "button", function () {
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
    portfolioFilterBtn.removeClass("current");
    $(this).addClass("current");
  });
  //****************************
  // Isotope Load more button
  //****************************
  var initShow = 4; //number of items loaded on init & onclick load more button
  var counter = initShow; //counter for load more button
  var iso = $grid.data("isotope"); // get Isotope instance

  loadMore(initShow); //execute function onload

  function loadMore(toShow) {
    $grid.find(".hidden").removeClass("hidden");

    var hiddenElems = iso.filteredItems
      .slice(toShow, iso.filteredItems.length)
      .map(function (item) {
        return item.element;
      });
    $(hiddenElems).addClass("hidden");
    $grid.isotope("layout");

    //when no more to load, hide show more button
    if (hiddenElems.length == 0) {
      jQuery("#load-more").addClass("deactive");
    } else {
      jQuery("#load-more").show();
    }
  }

  //append load more button
  $grid.after(
    '<button id="load-more" class="animated wow fadeInDown">نمونه کار های بیشتر</button>'
  );

  //when load more button clicked
  $("#load-more").click(function () {
    if ($("#filters").data("clicked")) {
      //when filter button clicked, set initial value for counter
      counter = initShow;
      $("#filters").data("clicked", false);
    } else {
      counter = counter;
    }

    counter = counter + initShow;

    loadMore(counter);
  });

  //when filter button clicked
  $("#filters").click(function () {
    $(this).data("clicked", true);

    loadMore(initShow);
  });

  // layout Isotope after each image loads
  $grid.imagesLoaded().progress(function () {
    $grid.isotope("layout");
  });
}

/* -------------------------------------------------------------------
 * 05.Owl Carousel
------------------------------------------------------------------- */
function DesignMG_OwlCarousel() {
  $(".owl-carousel").owlCarousel({
    nav: true,
    margin: 15,
    dots: false,
    mouseDrag: false,
    pullDrag: false,
    touchDrag: false,
    rtl: true,
    smartSpeed: 1000,
    navText: [
      "<span class='fa-regular fa-arrow-right-long'></span>",
      "<span class='fa-regular fa-arrow-left-long'></span>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      780: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });
  $(".owl-nav").addClass("animated wow fadeInUp");
}

/* -------------------------------------------------------------------
 * 06.Scroll It
------------------------------------------------------------------- */
function DesignMG_ScrollIt() {
  $(function () {
    $.scrollIt({
      upKey: 38, // key code to navigate to the next section
      downKey: 40, // key code to navigate to the previous section
      easing: "linear", // the easing function for animation
      scrollTime: 100, // how long (in ms) the animation takes
      activeClass: "active", // class given to the active nav element
      onPageChange: null, // function(pageIndex) that is called when page is changed
      topOffset: -70, // offste (in px) for fixed top navigation
    });
  });
}

/* -------------------------------------------------------------------
 * 07.Counter Up
------------------------------------------------------------------- */
function DesignMG_CounterUp() {
  const counterUp = window.counterUp.default;

  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting && !el.classList.contains("is-visible")) {
        counterUp(el, {
          duration: 1000,
          delay: 16,
        });
        el.classList.add("is-visible");
      }
    });
  };

  const IO = new IntersectionObserver(callback, { threshold: 1 });

  const el = document.querySelector(".counter");
  IO.observe(el);
}

/* -------------------------------------------------------------------
 * 08.WOW JS
------------------------------------------------------------------- */
function DesignMG_WowJs() {
    new WOW().init();
}
/* -------------------------------------------------------------------
 * 09.Phone Number AJAX
------------------------------------------------------------------- */
function DesignMG_PhoneNumAjax() {
  $('#phone-number').submit(function(e){
    e.preventDefault();
    let formData ={
      'number' : $('input[name=number]').val(),
    };
    
    $.ajax({
      type : 'POST',
      url : 'number.php',
      data : formData,
      dataType : 'json',
      encode : true,
    })

    .done(function(data){
        alert(data.number);
    })
    this.reset();
  })
}
