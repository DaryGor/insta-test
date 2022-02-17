import * as flsFunctions from "./modules/functions.js";
flsFunctions.isWebp();

import * as imputmask from "./modules/inputmask.min.js";
import * as modal from "./modules/modal.js";

import Swiper, { Navigation, Pagination } from 'swiper';

const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    simulateTouch: false,

    breakpoints: {
        1024: {
            allowTouchMove: false,       
        }
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
});