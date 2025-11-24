(function ($) {

/*----------------------------
jQuery MeanMenu
------------------------------ */
	jQuery('nav#dropdown').meanmenu();	
	
	
/*----------------------------
Full page Preloader
-----------------------------*/
    jQuery(window).on('load', function() {
      jQuery("#loader").fadeOut();
      jQuery("#loader_wrapper").delay(350).fadeOut("slow");
    });
	
	$(document).ready(function() {
		"use strict";
	
/*--------------------------
 Sticky Menu 
---------------------------- */
	$(window).on('scroll', function(){
		if( $(window).scrollTop()>750 ){
			$('#sticky').addClass('sticky');
			} else {
			$('#sticky').removeClass('sticky');
		}
	});	
	

	
//Single page scroll js for main menu

	$('.menu_scroll ul li a').on('click' , function(e){
	  $('.menu_scroll ul li').removeClass('active');
	  $(this).parent().addClass('active');
	  var target = $('[data-scroll='+$(this).attr('href')+']');
	  e.preventDefault();
	  var targetHeight = target.offset().top-parseInt('75', 0);
	  $('html, body').animate({
	   scrollTop: targetHeight
	  }, 1000);
	});
	
	$(window).scroll(function() {
	  var windscroll = $(window).scrollTop();
	  var target = $('.menu_scroll ul li');
	  if (windscroll >= 0) {
	   $('[data-scroll]').each(function(i) {
		if ($(this).position().top <= windscroll + 95) {
		 target.removeClass('active');
		 target.eq(i).addClass('active');
		}
	   });
	  }else{
	   target.removeClass('active');
	   $('.menu_scroll ul li:first').addClass('active');
	  }

	});
	
//Single page scroll js for side menu

	$('.mean-nav ul li a').on('click' , function(e){
	  $('.mean-nav ul li a').removeClass('active');
	  $(this).parent().addClass('active');
	  var target = $('[data-scroll='+$(this).attr('href')+']');
	  e.preventDefault();
	  var targetHeight = target.offset().top-parseInt('75', 0);
	  $('html, body').animate({
	   scrollTop: targetHeight
	  }, 1000);
	});
	
	$(window).scroll(function() {
	  var windscroll = $(window).scrollTop();
	  var target = $('.sidenav a');
	  if (windscroll >= 0) {
	   $('[data-scroll]').each(function(i) {
		if ($(this).position().top <= windscroll + 95) {
		 target.removeClass('active');
		 target.eq(i).addClass('active');
		}
	   });
	  }else{
	   target.removeClass('active');
	   $('.mean-nav ul li:first').addClass('active');
	  }

	});
	
/*----------------------------
wow js active
------------------------------ */
	new WOW().init();
 
/*----------------------------
owl active
------------------------------ */ 
	//Product Slider
        if ($(".product-slider").length) {
                $(".product-slider").owlCarousel({
                        autoPlay: false,
                        slideSpeed:2000,
                        pagination:false,
                        navigation:true,
                        items : 4,
                        /* transitionStyle : "fade", */    /* [This code for animation ] */
                        navigationText:["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"],
                        itemsDesktop : [1199,4],
                        itemsDesktopSmall : [992,3],
                        itemsTablet: [768,2],
                        itemsMobile : [480,1],
                });
        }

        //Testimonial Slider
        if ($(".testimonial-slider").length) {
                $(".testimonial-slider").owlCarousel({
                        autoPlay: false,
                        slideSpeed:2000,
                        pagination:false,
                        navigation:true,
                        items : 1,
                        /* transitionStyle : "fade", */    /* [This code for animation ] */
                        navigationText:["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"],
                        itemsDesktop : [1199,1],
                        itemsDesktopSmall : [992,1],
                        itemsTablet: [768,1],
                        itemsMobile : [480,1],
                });
        }
/*--------------------------
 counterUp active
---------------------------- */
	$('.count').counterUp({
        delay: 10,
        time: 1000
    });
/*--------------------------
bxslider active
---------------------------- */   
        if ($('.bx-demo').length) {
                $('.bx-demo').bxSlider({
                        pagerCustom: '.bx-thumb'
                });
        }
	
/*--------------------------
nice Select active
---------------------------- */ 
	$('select').niceSelect();

	
/*----------------------------
isotope active
------------------------------ */     
        var $grid = $('.grid');
        if ($grid.length) {
                $grid.isotope({
                        itemSelector: '.grid-item',
                        stagger: 30
                });

                $('.filter-demo').on( 'click', '.button', function() {
                        var filterValue = $(this).attr('data-filter');
                        $grid.isotope({ filter: filterValue });
                });

                // change is-checked class on buttons

                $('.filter').each( function( i, buttonGroup ) {
                        var $buttonGroup = $( buttonGroup );
                        $buttonGroup.on( 'click', '.button', function() {
                                $buttonGroup.find('.is-checked').removeClass('is-checked');
                                $( this ).addClass('is-checked');
                        });
                });
        }

/*----------------------------
magnific Popup active
------------------------------ */
        if ($('#gallery').length) {
                $('#gallery').magnificPopup({
                        delegate: '.g-link',
                        type: 'image',
                        closeOnContentClick: false,
                        closeBtnInside: false,
                        mainClass: 'mfp-with-zoom mfp-img-mobile',
                        image: {
                                verticalFit: true,
                                titleSrc: function(item) {
                                        return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
                                }
                        },
                        gallery: {
                                enabled: true
                        },
                        zoom: {
                                enabled: true,
                                duration: 300, // don't foget to change the duration also in CSS
                                opener: function(element) {
                                        return element.find('img');
                                }
                        }

                });
        }

	//Video Play
	$('.video-play-icon').magnificPopup({
        type: 'iframe'
      });
      $.extend(true, $.magnificPopup.defaults, {
        iframe: {
          patterns: {
            youtube: {
              index: 'youtube.com/',
              id: 'v=',
              src: 'http://www.youtube.com/embed/%id%?autoplay=1'
            }
          }
        }
      });
/*--------------------------
jarallax active
---------------------------- */
	$('.jarallax').jarallax({
		speed: 0.5
	});

/*--------------------------
masonry active
---------------------------- */	
	$('.grids').masonry({
	  itemSelector: '.blog-grid'
	});  
	
		// Contact Form Submition
	function checkRequire(formId , targetResp){
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
		var target = (typeof formId == 'object')? $(formId):$('#'+formId);
		target.find('input , textarea , select').each(function(){
			if($(this).hasClass('require')){
				if($(this).val().trim() == ''){
					check = 1;
					$(this).focus();
					targetResp.html('You missed out some fields.');
					$(this).addClass('error');
					return false;
				}else{
					$(this).removeClass('error');
				}
			}
			if($(this).val().trim() != ''){
				var valid = $(this).attr('data-valid');
				if(typeof valid != 'undefined'){
					if(!eval(valid).test($(this).val().trim())){
						$(this).addClass('error');
						$(this).focus();
						check = 1;
						targetResp.html($(this).attr('data-error'));
						return false;
					}else{
						$(this).removeClass('error');
					}
				}
			}
		});
		return check;
	}
	$(".submitForm").on("click", function() {
		var _this = $(this);
		var targetForm = _this.closest('form');
		var errroTarget = targetForm.find('.response');
		var check = checkRequire(targetForm , errroTarget);
		if(check == 0){
			var formDetail = new FormData(targetForm[0]);
			formDetail.append('form_type' , _this.attr('form-type'));
			$.ajax({
				method : 'post',
				url : 'ajax.php',
				data:formDetail,
				cache:false,
				contentType: false,
				processData: false
			}).done(function(resp){
				if(resp == 1){
					targetForm.find('input').val('');
					targetForm.find('textarea').val('');
					errroTarget.html('<p style="color:green;">Mail has been sent successfully.</p>');
				}else{
					errroTarget.html('<p style="color:red;">Something went wrong please try again latter.</p>');
				}
			});
		}
	});
	
	
	
	// -------------------------------------------------------------
// Shuffle
// -------------------------------------------------------------

$(window).on('load', function() {
    /** this is come when complete page is fully loaded, including all frames, objects and images **/

    if ($('#gridWrapper').length > 0) {
     
        /* initialize shuffle plugin */
        var $grid = $('#gridWrapper');

        $grid.shuffle({
            itemSelector: '.portfolio-wrapper' // the selector for the items in the grid
        });

        /* reshuffle when user clicks a filter item */
        $('#filter a').on('click', function (e) {
            e.preventDefault();

            // set active class
            $('#filter a').removeClass('active');
            $(this).addClass('active');

            // get group name from clicked item
            var groupName = $(this).attr('data-group');

            // reshuffle grid
            $grid.shuffle('shuffle', groupName );
        });
    }
});



	$('.gc_filter_text').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1]
			},
			image: {
				tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
				titleSrc: function(item) {
					return item.el.attr('title') + '<small></small>';
				}
			}
		});
			
			
			
			/*--- Responsive Menu Start ----*/

$("#toggle").on("click", function(){
  var w = $('#sidebar').width();
  var pos = $('#sidebar').offset().left;
 
  if(pos == 0){
  $("#sidebar").animate({"left": -w}, "slow");
  }
  else
  {
  $("#sidebar").animate({"left": "0"}, "slow");
  }
  
});

$("#toggle_close").on("click", function(){
  var w = $('#sidebar').width();
  var pos = $('#sidebar').offset().left;
 
  if(pos == 0){
  $("#sidebar").animate({"left": -w}, "slow");
  }
  else
  {
  $("#sidebar").animate({"left": "0"}, "slow");
  }
  
});
	
/*--------------------------
scrollUp
---------------------------- */	
		// ===== Scroll to Top ==== 
$(window).scroll(function() {
    if ($(this).scrollTop() >= 100) {       
        $('#return-to-top').fadeIn(200);   
    } else {
        $('#return-to-top').fadeOut(200);  
    }
});
$('#return-to-top').on('click', function() {     
    $('body,html').animate({
        scrollTop : 0                
    }, 500);
});	   
 
 });
 
})(jQuery); 