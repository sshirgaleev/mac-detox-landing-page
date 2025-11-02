/*-----------------------------------------------------------------------------------
    
    Template Name: Sasly - Multipurpose Landing Page PHP Template
    Description: Sasly is a flexible and professional Multipurpose HTML template, ideal for a variety of landing page needs including SaaS, software, fintech, Ai, E-learning, creative agencies, consulting services, software subscriptions, web applications, and digital marketing websites. Designed with all the essential elements to create an impactful landing page or corporate site, Sasly covers every detail to suit your business needs. We have included best practices of web development and you can create a great website layout based on Bootstrap or Grid 1320px.
    Version: 1.0 

    Note: This is Main Js file

-----------------------------------------------------------------------------------
    ===================
    Js INDEX
    ===================
    ## Main Menu
    ## Document Ready
    ## Nav Overlay
    ## Preloader
    ## Sticky
    ## Back to top
    ## Magnific-popup js
    ## Nice select
    ## Gsap
    ## AOS Js
    
-----------------------------------------------------------------------------------*/

(function($) {
    'use strict';

    //===== Main Menu

    function mainMenu() {
        
        var var_window = $(window),
        navContainer = $('.header-navigation'),
        navbarToggler = $('.navbar-toggler'),
        navMenu = $('.sasly-nav-menu'),
        navMenuLi = $('.sasly-nav-menu ul li ul li'),
        closeIcon = $('.navbar-close');

        navbarToggler.on('click', function() {
            navbarToggler.toggleClass('active');
            navMenu.toggleClass('menu-on');
        });

        closeIcon.on('click', function() {
            navMenu.removeClass('menu-on');
            navbarToggler.removeClass('active');
        });

        navMenu.find("li a").each(function() {
            if ($(this).children('.dd-trigger').length < 1) {
                if ($(this).next().length > 0) {
                    $(this).append('<span class="dd-trigger"><i class="far fa-angle-down"></i></span>')
                }
            }
        });

        navMenu.on('click', '.dd-trigger', function(e) {
            e.preventDefault();
            $(this).parent().parent().siblings().children('ul.sub-menu').slideUp();
            $(this).parent().next('ul.sub-menu').stop(true, true).slideToggle(350);
            $(this).toggleClass('sub-menu-open');
        });

    };

    //===== Offcanvas Overlay

    function offCanvas() {
        const $overlay = $(".offcanvas__overlay");
        const $toggler = $(".navbar-toggler");
        const $menu = $(".sasly-nav-menu");
        $toggler.add($overlay).add(".navbar-close, .panel-close-btn").on("click", function () {
            $overlay.toggleClass("overlay-open");
            if ($(this).is($overlay)) {
                $toggler.removeClass("active");
                $menu.removeClass("menu-on");
            }
        });
        $(window).on("resize", function () {
            if ($(window).width() > 991) $overlay.removeClass("overlay-open");
        });
    }

    //===== Windows load

    $(window).on('load', function(event) {
        //===== Preloader
        $('.preloader').delay(500).fadeOut(500);
    })

    //===== Magnific-popup js
    
    if ($('.video-popup').length){
        $('.video-popup').magnificPopup({
            type: 'iframe',
            removalDelay: 300,
            mainClass: 'mfp-fade'
        });
    }

    if ($('.img-popup').length){
        $(".img-popup").magnificPopup({
            type: "image",
             gallery: { 
              enabled: true 
            }
        });
    }


    //===== Gasp

    gsap.registerPlugin(SplitText, ScrollTrigger, ScrollSmoother);

    // Gsap ScrollSmoother
    // ⚠️ SAFARI FIX: ScrollSmoother ОТКЛЮЧЕН для Safari (главный источник лагов!)
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (!isSafari) {
        // Только для Chrome/Firefox
        ScrollSmoother.create({
            smooth: 1,
            effects: true,
            smoothTouch: 0.1,
        });
        console.log('ScrollSmoother enabled (Chrome/Firefox)');
    } else {
        // Safari: используем нативный скролл (самый быстрый!)
        console.log('ScrollSmoother DISABLED for Safari - using native scroll');
    }

    // Gsap SplitText
    // ⚠️ SAFARI FIX: SplitText анимации отключены для Safari (тяжелые для производительности)

    if (!isSafari && $('.split').length > 0) {
        // Split text into characters
        let mySplitText = new SplitText(".split", { type: "chars" });
        let chars = mySplitText.chars;

        // GSAP animation
        gsap.from(chars, {
            yPercent: 100,
            stagger: 0.065,
            ease: "back.out",
            duration: 1,
            scrollTrigger: {
                trigger: ".split",
                start: "top 50%",
            }
        });
    }

    if ($('.text-anm').length) {
        if (!isSafari) {
            // CHROME: Полная версия - посимвольная анимация
            let staggerAmount = 0.02,
                translateXValue = 20,
                delayValue = .2,
                easeType = "power2.out",
                animatedTextElements = document.querySelectorAll('.text-anm');
            animatedTextElements.forEach((element) => {
                let animationSplitText = new SplitText(element, { type: "chars, words" });
                gsap.from(animationSplitText.chars, {
                    duration: 1,
                    delay: delayValue,
                    x: translateXValue,
                    autoAlpha: 0,
                    stagger: staggerAmount,
                    ease: easeType,
                    scrollTrigger: { trigger: element, start: "top 85%"},
                });
            });
        }
        // SAFARI: Анимации отключены (используем только CSS)
    }

    if (!isSafari && $('.text-anm-two').length) {
        // CHROME: Посимвольная анимация
        let animatedTextElements = document.querySelectorAll('.text-anm-two'),
            staggerAmount = 0.02,
            translateXValueNegative = -20,
            delayValue = .5,
            easeType = "power2.out";
        animatedTextElements.forEach((element) => {
            let animationSplitText = new SplitText(element, { type: "chars, words" });
            gsap.from(animationSplitText.chars, {
                duration: 1,
                delay: delayValue,
                x: translateXValueNegative,
                autoAlpha: 0,
                stagger: staggerAmount,
                ease: easeType,
                scrollTrigger: { trigger: element, start: "top 85%" },
            });
        });
    }
    // SAFARI: text-anm-two отключен



    if (!isSafari && $('.text-anm-three').length) {
        // Select the text container
        const $container = $(".text-anm-three");
        const text = $container.text();
        const characters = text.split("");
        $container.empty();
        characters.forEach(char => {
            $container.append(`<span class='char'>${char}</span>`);
        });
        const $chars = $container.find(".char");
        gsap.timeline({ repeat: -1 })
        .from($chars, {
            y: 50,
            opacity: 0,
            ease: "back.out(2)",
            stagger: 0.08,
            duration: 0.8,
        })
    } else if (isSafari && $('.text-anm-three').length) {
        // Простая анимация для Safari (без повторения)
        gsap.from('.text-anm-three', {
            duration: 0.8,
            opacity: 0,
            y: 30,
            ease: "power2.out"
        });
    }
    
    // Gsap ScrollTrigger
    $(function () {
        var width = $(window).width();
        if (width > 991) { 
            "use strict";
            
            $(function () {
                let cards = gsap.utils.toArray(".project-item-list .sasly-project-item");
    
                let stickDistance = 100; 
    
                
                let lastCardST = ScrollTrigger.create({
                    trigger: cards[cards.length - 1],
                    start: "bottom bottom",
                    markers: false 
                });
    
                cards.forEach((card, index) => {
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top top", 
                        end: () => lastCardST.start + stickDistance, 
                        pin: true,      
                        pinSpacing: false, 
                        ease: "none",    
                        scrub: true,     
                        toggleActions: "reverse none none reverse",
                        markers: false 
                    });
                });
            });
        }
    });
    

    //====== Aos
    // ⚠️ SAFARI: Сбалансированные настройки (красота + производительность)

    if (isSafari) {
        // Safari: Максимально легкие настройки для производительности
        AOS.init({
            offset: 100,
            duration: 300,       // Быстрые анимации
            easing: 'ease',      // Простая функция
            once: true,          // Только один раз!
            mirror: false,       // Без reverse анимаций
            disable: 'mobile',   // Отключено на мобильных
            throttleDelay: 200,  // Редкие проверки
            debounceDelay: 100
        });
        console.log('AOS initialized (performance mode for Safari)');
    } else {
        // Chrome: Полные настройки
        AOS.init({
            offset: 50,
            duration: 800,
            easing: 'ease-out-cubic',
            once: false,
            mirror: true
        });
        console.log('AOS initialized (full mode)');
    }

    // Document Ready
    $(function() {
        mainMenu();
        offCanvas();
    });

})(window.jQuery);