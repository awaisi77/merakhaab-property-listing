/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./platform/plugins/payment/resources/assets/js/payment.js":
/*!*****************************************************************!*\
  !*** ./platform/plugins/payment/resources/assets/js/payment.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BPayment = BPayment || {};

BPayment.init = function () {
  if ($('.stripe-card-wrapper').length > 0) {
    new Card({
      form: '.payment-checkout-form',
      container: '.stripe-card-wrapper',
      formSelectors: {
        numberInput: 'input#stripe-number',
        expiryInput: 'input#stripe-exp',
        cvcInput: 'input#stripe-cvc',
        nameInput: 'input#stripe-name'
      }
    });
  }

  $(document).on('change', '.js_payment_method', function () {
    $('.payment_collapse_wrap').removeClass('collapse').removeClass('show').removeClass('active');
  });
  $(document).on('click', '.payment-checkout-btn', function () {
    var _self = $(this);

    var form = _self.closest('form');

    _self.attr('disabled', 'disabled');

    var submitInitialText = _self.html();

    _self.html('<i class="fa fa-gear fa-spin"></i> ' + _self.data('processing-text'));

    if ($('input[name=payment_method]:checked').val() === 'stripe') {
      Stripe.setPublishableKey($('#payment-stripe-key').data('value'));
      Stripe.card.createToken(form, function (status, response) {
        if (response.error) {
          if (typeof Botble != 'undefined') {
            Botble.showError(response.error.message, _self.data('error-header'));
          } else {
            alert(response.error.message);
          }

          _self.removeAttr('disabled');

          _self.html(submitInitialText);
        } else {
          form.append($('<input type="hidden" name="stripeToken">').val(response.id));
          form.submit();
        }
      });
    } else {
      form.submit();
    }
  });
};

$(document).ready(function () {
  BPayment.init();
});

/***/ }),

/***/ 36:
/*!***********************************************************************!*\
  !*** multi ./platform/plugins/payment/resources/assets/js/payment.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\payment\resources\assets\js\payment.js */"./platform/plugins/payment/resources/assets/js/payment.js");


/***/ })

/******/ });