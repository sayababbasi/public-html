
(function ($) {
	"use strict";

	let windowOn = $(window);

	/*=============================================
		=       tp-text-slide-active	      =
	=============================================*/

	let pc = gsap.matchMedia();
		pc.add("(min-width: 992px)", () => {
		if ($('.tp-fixed-thumb-wrap').length > 0) {
			let project_text = gsap.timeline({
				scrollTrigger: {
					trigger: ".tp-fixed-thumb-wrap",
					start: 'top center-=350',
					end: "bottom 65%",
					pin: ".tp-fixed-thumb",
					markers: false,
					pinSpacing: false,
					scrub: 1,
				}
			})
		}
		if ($('.tp-template-content-wrap').length > 0) {
			let project_text = gsap.timeline({
				scrollTrigger: {
					trigger: ".tp-template-content-wrap",
					start: "top 0%",
					end: "bottom -50%",
					pin: ".tp-template-content",
					markers: false, 
					pinSpacing: false,
					scrub: 1,
				}
			});
		}
	});

	/*=============================================
		=       tp-grid-slide-active	      =
	=============================================*/

	let tp_grid_slide = new Swiper(".tp-grid-slide-active", {
		loop: true,
		freemode: true,
		slidesPerView: 'auto',
		spaceBetween: 125,
		centeredSlides: true,
		allowTouchMove: false,
		speed: 2000,
		autoplay: {
		  delay: 1,
		  disableOnInteraction: true,
		},
	});

	/*=============================================
		=       tp-shop-slider-active	      =
	=============================================*/
	  let shop = new Swiper('.tp-shop-slider-active', {
			slidesPerView: 2,
			loop: true,
			autoplay: true,
			spaceBetween: 20,
			speed: 1000,
			navigation: {
				prevEl: '.tp-shop-prev',
				nextEl: '.tp-shop-next',
			},
			breakpoints: {
				'992': {
					slidesPerView: 2,
				},
				'768': {
					slidesPerView: 1,
				},
				'576': {
					slidesPerView: 1,
				},
				'0': {
					slidesPerView: 1,
				},
			},
			pagination: {
				el: '#paginations',
				type: 'custom',
				renderCustom: function (swiper, current, total) {
					let zero = total > 9 ? '' : '0';
					let index = zero + current
					let all = zero + total
					let html = `<div class="shop-slider-pagination">
									<span>${index}</span>
									<span>${all}</span>
								</div>`;
					return html;
				}
			}
  
	  });


	let tp_text_slide = new Swiper(".tp-text-slide-active", {
		loop: true,
		freemode: true,
		slidesPerView: 'auto',
		slidesPerView: 1,
		spaceBetween: 30,
		centeredSlides: true,
		allowTouchMove: false,
		speed: 14000,
		autoplay: {
		delay: 1,
		disableOnInteraction: true,
		},
	});

	  let blog = new Swiper('.tp-shop-slider-2-active', {
			slidesPerView: 2,
			loop: true,
			autoplay: true,
			spaceBetween: 20,
			speed: 1000,
			navigation: {
				prevEl: '.tp-blog-prev',
				nextEl: '.tp-blog-next',
			},
			breakpoints: {
				'992': {
					slidesPerView: 2,
				},
				'768': {
					slidesPerView: 1,
				},
				'576': {
					slidesPerView: 1,
				},
				'0': {
					slidesPerView: 1,
				},
			},
			pagination: {
				el: '#paginations-2',
				type: 'custom',
				renderCustom: function (swiper, current, total) {
					let zero = total > 9 ? '' : '0';
					let index = zero + current
					let all = zero + total
					let html = `<div class="shop-slider-pagination-2">
									<span>${index}</span>
									<span>${all}</span>
								</div>`;
					return html;
				}
			}
  
	  }); 
	  
	  
	var tp_feature_slide = new Swiper(".tp-feature-slide-top", {
		loop: true,
		freemode: true,
		slidesPerView: 'auto',
		spaceBetween: 15,
		centeredSlides: true,
		allowTouchMove: false,
		speed: 4000,
		autoplay: {
		delay: 1,
		disableOnInteraction: true,
		},
	});

	var tp_footer_slide = new Swiper(".tp-footer-slide-active", {
		loop: true,
		freemode: true,
		slidesPerView: 'auto',
		spaceBetween: 35,
		centeredSlides: true,
		allowTouchMove: false,
		speed: 6000,
		autoplay: {
		delay: 1,
		disableOnInteraction: true,
		},
	});

	var tp_feature_slide = new Swiper(".tp-feature-slide-middle", {
		loop: true,
		freemode: true,
		slidesPerView: 'auto',
		spaceBetween: 15,
		centeredSlides: true,
		allowTouchMove: false,
		speed: 4000,
		autoplay: {
		delay: 1,
		disableOnInteraction: true,
		},
	});

})(jQuery);