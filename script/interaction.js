document.addEventListener("DOMContentLoaded", (event) => {
  let toggle = document.querySelector(".toggle");
  let navigation = document.querySelector(".navigation");
  let main = document.querySelector(".main");

  // Activate navigation when the website loads
  navigation.classList.add("active");
  main.classList.add("active");

  toggle.onclick = function () {
    navigation.classList.toggle("active");
    main.classList.toggle("active");
  };

  // add hovered class in selected list items
  let list = document.querySelectorAll(".navigation li");
  function activeLink() {
    list.forEach((item) => item.classList.remove("hovered"));
    this.classList.add("hovered");
  }
  list.forEach((item) => item.addEventListener("mouseover", activeLink));
});


$(document).ready(function () {
  $(document).on("scroll", onScroll);
  
  //smoothscroll
  $('a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");
      
      $('a').each(function () {
          $(this).removeClass('active');
      })
      $(this).addClass('active');
    
      var target = this.hash,
          menu = target;
      $target = $(target);
      $('html, body').stop().animate({
          'scrollTop': $target.offset().top+2
      }, 500, 'swing', function () {
          window.location.hash = target;
          $(document).on("scroll", onScroll);
      });
  });
});

function onScroll(event){
  var scrollPos = $(document).scrollTop();
  $('#menu-center a').each(function () {
      var currLink = $(this);
      var refElement = $(currLink.attr("href"));
      if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
          $('#menu-center ul li a').removeClass("active");
          currLink.addClass("active");
      }
      else{
          currLink.removeClass("active");
      }
  });
}



