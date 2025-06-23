/*--------------------- Copyright (c) 2025 -----------------------
[Master Javascript]
Project: Azmall HTML 
-------------------------------------------------------------------*/
(function ($) {
  "use strict";
  var solarsupplier = {
    initialised: false,
    version: 1.0,
    init: function () {
      if (!this.initialised) {
        this.initialised = true;
      } else {
        return;
      }
      /*-------------- Cycling Functions Calling -------------------------------------------------*/
      this.cyc_loader();
      this.cyc_nav_menu();
      this.cyc_banner_slider();
      this.cyc_listgrid_view();
      this.cyc_quantity();
      this.Select2();
      this.CheckoutPayment();
      this.PopupImage();
    },
    /*-------------- Cycling Functions Calling -------------------------------------------------*/

    // loader js
     cyc_loader: function () {
      jQuery(window).on('load', function () {
        $(".cyc-loader").fadeOut();
        $(".cyc-spin").delay(500).fadeOut("slow");
      });
    },
    // nav menu toggle
    cyc_nav_menu: function () {
      $(document).on("click", function (event) {
        var $trigger = $(".cyc-toggle-btn");
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
          $("body").removeClass("cyc-menu-open");
        }
      });
      $(".cyc-toggle-btn").click(function () {
        $("body").toggleClass("cyc-menu-open");
      });

      //submenu
      $('.cyc-has-menu > a').click(function (event) {
        event.stopPropagation();
        var $submenu = $(this).next('.cyc-submenu');
        $('.cyc-submenu').not($submenu).removeClass('cyc-submenu-open');
        $submenu.toggleClass('cyc-submenu-open');
      });
      $('.cyc-submenu a').click(function (event) {
        event.stopPropagation();
      });
      $(document).on("click", function (event) {
        if (!$(event.target).closest('.cyc-has-menu').length) {
          $('.cyc-submenu').removeClass('cyc-submenu-open')
        }
      })
    },

    // care slider
    cyc_banner_slider: function (){
      var image = ["assets/images/ban-sm1.png","assets/images/ban-sm2.png", "assets/images/ban-sm3.png" ]
      var bannerSwiper = new Swiper(".cyc-banner-slider", {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        // speed: 2000,
        // autoplay: {
        //   delay: 2000,
        // },
        navigation: {
          nextEl: '.cyc-banner-slider-sec .swiper-button-next',
          prevEl: '.cyc-banner-slider-sec .swiper-button-prev',
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            if(index==3){
              index = 0
            }
            return '<div class="' + className + '"> <div class="cyc-bullet-image"><img src="' + image[index] + '" alt="img"/></div></div>';
          }
        },
      });
    },
    // list-grid-view js
    
    cyc_listgrid_view: function (){
      $(".cyc-grid-view > a").on("click", function () {
        $(".cyc-grid-view > a").removeClass("active");
        $(this).addClass("active");
      });
      $(".list-view ").on("click", function () {
          $(".cyc-gridview-content").addClass("product-list-view");
      });
      $(".grid-view").on("click", function () {
          $(".cyc-gridview-content").removeClass("product-list-view");
      });
    },


    cyc_quantity: function () {
      $('.shop-add').click(function () {
        if ($(this).prev().val() < 50000) {
          $(this).prev().val(+$(this).prev().val() + 1);
        }
      });
      $('.shop-sub').click(function () {
        let inputElement = $(this).siblings('input');
        if (inputElement.val() > 1) {
          inputElement.val(+inputElement.val() - 1);
        }
      });

    },
    Select2: function () {
      $('.mySelect').select2({
        placeholder: 'Select an option',
        width: '100%',
        dropdownAutoWidth: true,
        minimumResultsForSearch: Infinity
      });
    },
    // Checkout Payment			
    CheckoutPayment: function () {
      $("input[name$='checkout']").on("click", function () {
        var test = $(this).val();
        $(".payment_box").hide('slow');
        $(".payment_box[data-period='" + test + "']").show('slow');
      });
    },
    PopupImage: function() {
      $(".popup img").click(function () {
        var $src = $(this).attr("src");
        $(".popup-imgshow").fadeIn();
        $(".img-show img").attr("src", $src);
    });
    
    $("span, .overlay").click(function () {
        $(".popup-imgshow").fadeOut();
    });
    },
  };
  solarsupplier.init();
}
  (jQuery));


function checkRequire(formId, targetResp) {
  targetResp.html('');
  var email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  var url = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
  var image = /\.(jpe?g|gif|png|PNG|JPE?G)$/;
  var mobile = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
  var facebook = /^(https?:\/\/)?(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
  var twitter = /^(https?:\/\/)?(www\.)?twitter.com\/[a-zA-Z0-9(\.\?)?]/;
  var google_plus = /^(https?:\/\/)?(www\.)?plus.google.com\/[a-zA-Z0-9(\.\?)?]/;
  var check = 0;
  $('#er_msg').remove();
  var target = (typeof formId == 'object') ? $(formId) : $('#' + formId);
  target.find('input , textarea , select').each(function () {
    if ($(this).hasClass('require')) {
      if ($(this).val().trim() == '') {
        check = 1;
        $(this).focus();
        $(this).parent('div').addClass('form_error');
        targetResp.html('You missed out some fields.');
        $(this).addClass('error');
        return false;
      } else {
        $(this).removeClass('error');
        $(this).parent('div').removeClass('form_error');
        targetResp.addClass("sent"); 
        targetResp.html('Message sent succefully.');
      }
    }
    if ($(this).val().trim() != '') {
      var valid = $(this).attr('data-valid');
      if (typeof valid != 'undefined') {
        if (!eval(valid).test($(this).val().trim())) {
          $(this).addClass('error');
          $(this).focus();
          check = 1;
          targetResp.html($(this).attr('data-error'));
          return false;
        } else {
          $(this).removeClass('error');
        }
      }
    }
  });
  return check;
}
$(".submitForm").on('click', function () {
  var _this = $(this);
  var targetForm = _this.closest('form');
  var errroTarget = targetForm.find('.response');
  var check = checkRequire(targetForm, errroTarget);

  if (check == 0) {
    var formDetail = new FormData(targetForm[0]);
    formDetail.append('form_type', _this.attr('form-type'));
    $.ajax({
      method: 'post',
      url: 'ajaxmail.php',
      data: formDetail,
      cache: false,
      contentType: false,
      processData: false
    }).done(function (resp) {
      console.log(resp);
      if (resp == 1) {
        targetForm.find('input').val('');
        targetForm.find('textarea').val('');
        errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
      } else {
        errroTarget.html('<p style="color:red;">Something went wrong please try again latter.</p>');
      }
    });
  }
});
;