'use strict';

@@include('_lib/swiper-bundle.js')

const swiper = new Swiper('.swiper-container', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});
