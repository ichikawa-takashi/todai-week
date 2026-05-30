
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    var topBtn = $('.to-top');
    topBtn.hide();

    var toTopMargin = parseInt(topBtn.css('bottom')) || 24;

    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var overviewTop = $('.overview').length ? $('.overview').offset().top : 0;
        var footerTop = $('footer').length ? $('footer').offset().top : 999999;
        var windowHeight = $(window).height();

        if (scrollTop < overviewTop - 600) {
            topBtn.fadeOut();
        } else {
            if (!topBtn.is(':visible')) topBtn.fadeIn();
            var footerOverlap = Math.max(0, scrollTop + windowHeight - footerTop);
            topBtn.css('bottom', (toTopMargin + footerOverlap) + 'px');
        }
    });

    // ボタンをクリックしたらスクロールして上に戻る
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 300, 'swing');
        return false;
    });

    //ドロワーメニュー
    $("#MenuButton").click(function () {
        // $(".l-drawer-menu").toggleClass("is-show");
        // $(".p-drawer-menu").toggleClass("is-show");
        $(".js-drawer-open").toggleClass("open");
        $(".drawer-menu").toggleClass("open");
        $("html").toggleClass("is-fixed");

    });


    // JavaScript（jQuery使用）
    $(function () {
        $('#page-top').click(function (e) {
            e.preventDefault(); // デフォルトのリンク動作をキャンセル
            $('html, body').animate({
                scrollTop: 0
            }, 500); // 500ミリ秒でトップにスクロール
        });
    });




    // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)

    $(document).on('click', 'a[href*="#"]', function () {
        let time = 400;
        let header = $('header').innerHeight();
        let target = $(this.hash);
        if (!target.length) return;
        let targetY = target.offset().top - header;
        $('html,body').animate({
            scrollTop: targetY
        }, time, 'swing');
        return false;
    });

    // ハンバーガーメニュー
    $(function () {
        $(".js-hamburger").click(function () {
            $(this).toggleClass("is-open");
            $(".js-drawer").fadeToggle();
            $(".js-header-overlay").fadeToggle();
        });
        $(".js-header-overlay").click(function () {
            $(this).removeClass("is-open");
            $(".js-drawer").fadeOut();
            $(this).fadeOut();

        });

        // ドロワーナビのaタグをクリックで閉じる
        $(".js-drawer a[href]").on("click", function () {
            $(".js-hamburger").removeClass("is-open");
            $(".js-drawer").fadeOut();
            $(".js-header-overlay").fadeOut();
        });

        // resizeイベント
        $(window).on('resize', function () {
            if (window.matchMedia("(min-width: 768px)").matches) {
                $(".js-hamburger").removeClass("is-open");
                $(".js-drawer").fadeOut();
                $(".js-header-overlay").fadeOut();
            }
        });
    });



    // アコーディオン
    $('.js-drawer-accordion').on('click', function () {
        $(this).next().slideToggle();
        $(this).toggleClass('is-open');
    });

    // function openDrawer() {
    //     $(".js-drawer").addClass("is-open");
    //     $(".js-hamburger").addClass("is-open");
    // }

    // function closeDrawer() {
    //     $(".js-drawer").removeClass("is-open");
    //     $(".js-hamburger").removeClass("is-open");
    // }

    // modal
    $('.js-modal-open').on('click', function () {
        var target = $(this).data('modal');
        var modal = document.getElementById(target);
        console.log(modal);
        $(modal).fadeIn();
        $('.js-modal-overlay').fadeIn();
        $("html,body").css("overflow", "hidden");
        $(".pc-header").css("display", "none");
        return false;
    });

    // モーダルウィンドウを閉じる
    $('.js-modal-close , .js-modal-overlay').on('click', function () {
        $('.js-modal').fadeOut();
        $('.js-modal-overlay').fadeOut();
        $("html,body").css("overflow", "initial");
        $(".pc-header").css("display", "block");
        return false;
    });

    $(document).ready(function () {
        $(window).scroll(function () {
            // var sec02Top = $('.sec02').offset().top;
            // var window_height = $(window).height();
            var scroll = $(window).scrollTop();

            if (scroll > 900) {
                $('.appear').fadeIn(10);
                $('.pc-header').addClass('header-color');
            } else {
                $('.appear').fadeOut(10);
                $('.pc-header').removeClass('header-color');
            }
        });
    });
});


jQuery(function ($) {
    const mv_swiper = new Swiper(".js-mv-swiper", {
        loop: true,
        speed: 2000,
        effect: "fade",
        allowTouchMove: false,
        fadeEffect: {
            crossFade: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
});

jQuery(function ($) {
    $('.js-faq-question').on('click', function () {
        $(this).next().slideToggle();
        $(this).toggleClass('is-open');
    });
});

$(window).on('load', function () {
    var leadMasks = document.querySelectorAll('.fv__lead > span');
    var leadTexts = document.querySelectorAll('.fv__lead-text');
    var decoOrder = [1, 6, 4, 2, 5, 3];

    var tl = gsap.timeline({ delay: 0.4 });

    leadMasks.forEach(function (mask, index) {
        var text = leadTexts[index];
    
        tl.to(mask, {
            '--reveal': '100%',
            duration: 1.6,   // 文字が出るスピード
            ease: 'power2.out'
        }, index === 0 ? 0 : '<0.13');
    
        tl.to(text, {
            opacity: 1,
            textShadow: '0 0 10px rgba(255, 255, 255, 0.45)',
            duration: 1.3,
            ease: 'sine.out'
        }, '<0.05');
    
        tl.to(text, {
            textShadow: '0 0 0px rgba(255, 255, 255, 0)',
            duration: 0.9,
            ease: 'sine.out'
        }, '<0.45');
    });

tl.add('decoStart', '-=0.6'); // 画像が出るまでの時間

    decoOrder.forEach(function (num, index) {
        var padded = String(num).padStart(2, '0');
        var deco = document.querySelector('.fv__deco--' + padded);

        if (deco) {
            tl.fromTo(deco,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.8,
                    ease: 'sine.out'
                },
                index === 0 ? 'decoStart' : '<0.35'
            );
        }
    });
});

const triggers = document.querySelectorAll('.btn p,.btn a,.header__nav-item a,.header__nav-modal-item a');

triggers.forEach(trigger => {
    const target01 = trigger.querySelector('.text01');
    const target02 = trigger.querySelector('.text02');

    trigger.addEventListener('mouseenter', () => {
        gsap.fromTo(target01, {
            y: '0px',
            opacity: 0,
        }, {
            y: '-105%',
            opacity: 1,
        });
    });

    trigger.addEventListener('mouseenter', () => {
        gsap.fromTo(target02, {
            y: '105%',
        }, {
            y: '0%',
        });
    });
});