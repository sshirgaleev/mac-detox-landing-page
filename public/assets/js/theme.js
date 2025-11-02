/*-----------------------------------------------------------------------------------
    
    Template Name: Sasly - Multipurpose Landing Page PHP Template
    Description: Sasly is a flexible and professional Multipurpose HTML template, ideal for a variety of landing page needs including SaaS, software, fintech, Ai, E-learning, creative agencies, consulting services, software subscriptions, web applications, and digital marketing websites. Designed with all the essential elements to create an impactful landing page or corporate site, Sasly covers every detail to suit your business needs. We have included best practices of web development and you can create a great website layout based on Bootstrap or Grid 1320px.
    Version: 1.0 

    
-----------------------------------------------------------------------------------*/

(function($) {
    'use strict';

    //====== Sticky Header (Optimized for Safari)

    $(document).ready(function () {
        function initStickyHeader(headerSelector) {
            const header = $(headerSelector);
            let lastScroll = 0;
            let ticking = false;

            // Оптимизированная функция обновления sticky
            function updateSticky() {
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

                if (currentScroll > 200) {
                    if (currentScroll < lastScroll) {
                        if (!header.hasClass('sticky')) {
                            header.addClass('sticky');
                        }
                    } else {
                        header.removeClass('sticky');
                    }
                } else if (currentScroll === 0) {
                    header.removeClass('sticky');
                }

                lastScroll = currentScroll;
                ticking = false;
            }

            // Throttling с requestAnimationFrame для плавности
            $(window).on('scroll', function () {
                if (!ticking) {
                    window.requestAnimationFrame(updateSticky);
                    ticking = true;
                }
            }, { passive: true });
        }
        initStickyHeader('.header-area');
    });

    //===== Slick slider js

    if ($('.testimonial-slider').length) {
        $('.testimonial-slider').slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 800,
            autoplay: true,
            vertical: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<div class="prev"><i class="fas fa-angle-left"></i></div>',
            nextArrow: '<div class="next"><i class="fas fa-angle-right"></i></div>',
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 1,
                    }
                }
            ]
        });
    }

    if ($('.company-slider').length) {
        $('.company-slider').slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 6000,
            autoplay: true,
            autoplaySpeed: 0,
            cssEase: 'linear',
            slidesToShow: 7,
            slidesToScroll: 1,
            prevArrow: '<div class="prev"><i class="far fa-arrow-left"></i></div>',
            nextArrow: '<div class="next"><i class="far fa-arrow-right"></i></div>',
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 6,
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

})(window.jQuery);