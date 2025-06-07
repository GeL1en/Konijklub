$(document).ready(function () {

  /* === 1. Прогресс-бар для .horses__slider === */
  function setProgress(index) {
    const calc = ((index + 1) / ($slider.slick('getSlick').slideCount)) * 100;

    $progressBar
      .css('background-size', `${calc}% 100%`)
      .attr('aria-valuenow', calc);
  }

  const $slider = $('.horses__slider');
  const $progressBar = $('.progress');

  $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    setProgress(nextSlide);
  });

  /* === 2. Инициализация .horses__slider === */
  $('.horses__slider').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    appendDots: $('.horses__slider-dots'),
    prevArrow: $('.horses__arrow--prev'),
    nextArrow: $('.horses__arrow--next'),
    responsive: [
      {
        breakpoint: 1001,
        settings: {
          slidesToShow: 3.1,
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2.1,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 481,
        settings: {
          slidesToShow: 1.1,
          slidesToScroll: 1,
        }
      },
    ]
  });

  // Установка начального значения прогресс-бара
  setProgress(0);

  /* === 3. Плавный скролл по якорям === */
  $('.header__menu-item a, .footer__nav-item a').on('click', function (e) {
    e.preventDefault();
    var id = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({ scrollTop: top }, 600);
  });

  /* === 4. Открытие/закрытие бургер-меню === */
  $('.header__burger-menu').click(function () {
    $('.header__menu').toggleClass('is-show');
  });

  $('.header__menu-cross, .header__menu-item').click(function () {
    $('.header__menu').removeClass('is-show');
  });

  /* === 5, 6. Инициализация .reviews__slider и автопрокрутка === */
  $('.reviews__slider').slick({
  slidesToShow: 3,
  slidesToScroll: 3,
  autoplay: true,
  autoplaySpeed: 4000,
  Infinity: true,
  dots: true,
  appendDots: $('.reviews__slider-dots'),
  prevArrow: $('.reviews__arrow--prev'),
  nextArrow: $('.reviews__arrow--next'),
  responsive: [
    {
      breakpoint: 1001,
      settings: {
        slidesToShow: 3.1,
      }
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2.1,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 481,
      settings: {
        slidesToShow: 1.1,
        slidesToScroll: 1,
      }
    },
  ]
});

});

/* === 7. Анимированые цифры === */
function animateNumbersOnScroll() {
  const block = document.querySelector('.about__achievements');
  const nums = block.querySelectorAll('span');
  let shown = false;

  function animate() {
    if (shown) return;
    if (block.getBoundingClientRect().top < window.innerHeight) {
      nums.forEach(num => {
        const target = parseInt(num.textContent);
        let current = 0;
        const step = Math.ceil(target / 50);
        const interval = setInterval(() => {
          current += step;
          if (current >= target) {
            num.textContent = target + '+';
            clearInterval(interval);
          } else {
            num.textContent = current + '+';
          }
        }, 20);
      });
      shown = true;
    }
  }

  window.addEventListener('scroll', animate);
}
animateNumbersOnScroll();

// 8. Плавная прокрутка к якорям
$("a[href^='#']").on('click', function (e) {
  e.preventDefault();
  const target = $($(this).attr('href'));
  if (target.length) {
    $('html, body').animate({ scrollTop: target.offset().top - 60 }, 800);
    // Закрытие бургер-меню при переходе
    $('.header__menu').removeClass('open');
  }
});

// 9. Валидация формы
$('.questions__form').on('submit', function (e) {
  const name = $('#questions-input-name').val().trim();
  const phone = $('#questions-input-tel').val().trim();
  if (!name || !phone) {
    alert('Пожалуйста, заполните все поля');
    e.preventDefault();
  }
});

// 10. Маска номера телефона
$('#questions-input-tel').on('input', function () {
  let val = this.value.replace(/\D/g, '').slice(0, 11);
  let formatted = '+7 (' + val.slice(1, 4);
  if (val.length >= 4) formatted += ') ' + val.slice(4, 7);
  if (val.length >= 7) formatted += '-' + val.slice(7, 9);
  if (val.length >= 9) formatted += '-' + val.slice(9, 11);
  this.value = formatted;
})

// 11. Модальное окно после отправки формы
$('.questions__form').on('submit', function (e) {
  e.preventDefault();
  alert('Спасибо! Ваша заявка отправлена.');
});

// 12. Появление блоков при скролле
function revealOnScroll() {
  $('.reveal').each(function () {
    const elemTop = $(this).offset().top;
    const windowBottom = $(window).scrollTop() + $(window).height();
    if (elemTop < windowBottom - 100) {
      $(this).addClass('visible');
    }
  });
}
$(window).on('scroll', revealOnScroll);
$(document).ready(revealOnScroll)

// 13. Кнопка "Наверх"
$(document).ready(function () {
  $('body').append(`
    <button id="toTop" aria-label="Наверх">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 12L10 7L15 12" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `);
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 400) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });

  $('#toTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });
});

// 14. Отложенная загрузка изображений
$(document).ready(function () {
  $('img').each(function () {
    const src = $(this).attr('src');
    $(this).attr('data-src', src).removeAttr('src');
  });
  const lazyLoad = () => {
    $('img[data-src]').each(function () {
      const top = $(this).offset().top;
      const bottom = $(window).scrollTop() + $(window).height();
      if (top < bottom) {
        $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
      }
    });
  };
  $(window).on('scroll', lazyLoad);
  lazyLoad();
});

// 15. Переключение слайдов стрелками на клавиатуре
$(document).on('keydown', function (e) {
  if (e.key === 'ArrowRight') $('.horses__slider').slick('slickNext');
  if (e.key === 'ArrowLeft') $('.horses__slider').slick('slickPrev');
});