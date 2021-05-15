'use strict';

import menu from './modules/menu.js';

import mask from './modules/maskPhone.js';
import sendForm from './modules/sendForm.js';
import portfolioBlock from './modules/portfolio.js';
import popupRepair from './modules/popupRepair.js';
import repairNavSlider from './modules/repairNavSlider.js';
import accordion from './modules/accordion.js';
import successBlock from './modules/successBlock.js';
import openRepair from './modules/openRepair.js';
import transparencySlider from './modules/transparencySlider.js';
import tabRepairSlider from './modules/tabRepairSlider.js';
import reviews from './modules/reviews.js';
import privacy from './modules/privacy.js';
import consultation from './modules/consultation.js';

menu();

sendForm();
mask();
popupRepair();
portfolioBlock();
openRepair(0);
tabRepairSlider();
repairNavSlider();
transparencySlider();
accordion();
successBlock();
reviews();
privacy();
consultation();