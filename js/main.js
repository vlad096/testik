 $(document).ready(function() {

   $('.mobile-wrap').on('click', function() {
     $(this).find('.main-nav__toggle').toggleClass('open');
     $('.main-header__list').slideToggle();
   });

   $(window).resize(function() {

     if ($(window).width() >= 780) {
       $('.main-header__list').attr('style', '');
       $('.main-nav__toggle').removeClass('open');
     }

     changeElem();
   });

   let slider = $('.reviews__slider');

   slider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
     let i = (currentSlide ? currentSlide : 0) + 1;
     let current = $('.reviews__current');
     let all = $('.reviews__all');

     current.text(i);
     all.text(slick.slideCount);
   });


   slider.slick({
     slidesToShow: 2,
     slidesToScroll: 1,
     dots: false,
     arrows: true,
     appendArrows: $('.reviews__arrows'),
     prevArrow: '<button class="reviews__arrow reviews__arrow--dir_left"></div>',
     nextArrow: '<button class="reviews__arrow reviews__arrow--dir_right"></button>',

     responsive: [{
         breakpoint: 960,
         settings: {
           slidesToShow: 2,
           slidesToScroll: 1
         }
       },
       {
         breakpoint: 781,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1
         }
       }

     ]
   });


   $(".single__box").click(function() {
     $(".single__box").removeClass("single__box--active").eq($(this).index()).addClass("single__box--active");
     var index = $(this).index();
     $(".single__item").hide().eq(index).fadeIn()
   });

   function changeElem() {

    let boxes = $('[data-mobile]');

    boxes.each((idx, box) => {
      if ($(window).width() <= 780) {
        $(box).html($(box).data('mobile'));
      } else {
        $(box).html($(box).data('desktop'));
      }

    })
  }

  changeElem();

   if (document.querySelectorAll('.stages__elem').length > 0) {
     // Получаем нужный элемент
     var elements = document.querySelectorAll('.stages__first, .stages__elem');
     var isResizeble = false;

     var Visible = function(target) {
       // Все позиции элемента
       var targetPosition = {
           top: window.pageYOffset + target.getBoundingClientRect().top,
           left: window.pageXOffset + target.getBoundingClientRect().left,
           right: window.pageXOffset + target.getBoundingClientRect().right,
           bottom: window.pageYOffset + target.getBoundingClientRect().bottom
         },
         // Получаем позиции окна
         windowPosition = {
           top: window.pageYOffset,
           left: window.pageXOffset,
           right: window.pageXOffset + document.documentElement.clientWidth,
           bottom: window.pageYOffset + document.documentElement.clientHeight
         };



       if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
         targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
         targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
         targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
         // Если элемент полностью видно, то запускаем следующий код

         console.log('Вы видите элемент :)');
         target.classList.add('active');

       } else {
         target.classList.remove('active');
       }

     }

     // Запускаем функцию при прокрутке страницы
     window.addEventListener('scroll', function() {
       for (let elem of elements) {
         Visible(elem);
       }
     });

     // А также запустим функцию сразу. А то вдруг, элемент изначально видно

     for (let elem of elements) {
       Visible(elem);
     }

   }

   function validate(input, length, regExp, error, phone) {

     $(input).on('blur keyup', function() {
       var value = $(this).val();
       var that = $(this);

       regExp = regExp == '' ? /./ : regExp;

       if (phone === true) {
         bool_reg = !regExp.test(value);
       } else {
         bool_reg = regExp.test(value);
       }

       if (value.length > length && value !== '' && bool_reg) {
         that.removeClass('form-fail').addClass('form-done');
         $(error).slideUp();
       } else {
         that.removeClass('form-done').addClass('form-fail');
         $(error).slideDown();
       }
     });

   }

   // деакцивация кнопки если есть поле с ошибкой

   function disBtn(input, btn) {
     var input = $(input);
     input.on('blur keyup', function() {

       if (input.hasClass('form-fail')) {
         $(btn).attr('disabled', 'disabled');
       } else {
         $(btn).removeAttr('disabled');
       }

     });

   }

   // для проверки при нажатии

   function valClick(input, length, regExp, error, btn, phone) {
     var value = $(input).val();

     regExp = regExp == '' ? /./ : regExp;

     if (phone === true) {
       bool_reg = regExp.test(value);
     } else {
       bool_reg = !regExp.test(value);
     }

     if (value.length < length && value === '' && bool_reg) {
       $(input).addClass('form-fail');
       $(error).slideDown();
     }
   }

   //  деакцивация кнопки при нажатии

   function disBtnClick(input, btn) {
     var input = $(input);

     if (input.hasClass('form-fail')) {
       $(btn).attr('disabled', 'disabled');
       return false;
     } else {
       return true;
     }

   }

   function validateCheck(input) {
     $(input).on('change', function() {

       var check = $(this).prop('checked');
       if (check) {
         $('button').prop('disabled', false);
       } else {
         $('button').prop('disabled', true);
       }
     });
   }

   $('input[type="tel"]').mask("+38 (999) 999-99-99");

   var regName = /^[a-zA-Zа-яА-ЯёЁ]+/;
   var regEmail = /[-.\w]+@[-.\w]+\.[-.\w]+/i;
   var regPhone = /[_]/i;
   // пример использования

   validate('#m_name', 1, regName, '.main-footer__fail-name');
   validate('#m_email', 1, regEmail, '.main-footer__fail-email');
   validate('#m_phone', 1, regPhone, '.main-footer__fail-phone', true);

   disBtn('#m_name, #m_email, #m_phone', '.main-footer__btn');


 });