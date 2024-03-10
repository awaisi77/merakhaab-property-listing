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
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./platform/plugins/contact/resources/assets/js/contact-public.js":
/*!************************************************************************!*\
  !*** ./platform/plugins/contact/resources/assets/js/contact-public.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  var showError = function showError(message) {
    $('.contact-error-message').html(message).show();
  };

  var showSuccess = function showSuccess(message) {
    $('.contact-success-message').html(message).show();
  };

  var handleError = function handleError(data) {
    if (typeof data.errors !== 'undefined' && data.errors.length) {
      handleValidationError(data.errors);
    } else {
      if (typeof data.responseJSON !== 'undefined') {
        if (typeof data.responseJSON.errors !== 'undefined') {
          if (data.status === 422) {
            handleValidationError(data.responseJSON.errors);
          }
        } else if (typeof data.responseJSON.message !== 'undefined') {
          showError(data.responseJSON.message);
        } else {
          $.each(data.responseJSON, function (index, el) {
            $.each(el, function (key, item) {
              showError(item);
            });
          });
        }
      } else {
        showError(data.statusText);
      }
    }
  };

  var handleValidationError = function handleValidationError(errors) {
    var message = '';
    $.each(errors, function (index, item) {
      if (message !== '') {
        message += '<br />';
      }

      message += item;
    });
    showError(message);
  };

  $(document).on('click', '.contact-form button[type=submit]', function (event) {
    var _this = this;

    event.preventDefault();
    event.stopPropagation();
    $(this).addClass('button-loading');
    $('.contact-success-message').html('').hide();
    $('.contact-error-message').html('').hide();
    $.ajax({
      type: 'POST',
      cache: false,
      url: $(this).closest('form').prop('action'),
      data: new FormData($(this).closest('form')[0]),
      contentType: false,
      processData: false,
      success: function success(res) {
        if (!res.error) {
          $(_this).closest('form').find('input[type=text]').val('');
          $(_this).closest('form').find('input[type=email]').val('');
          $(_this).closest('form').find('textarea').val('');
          showSuccess(res.message);
        } else {
          showError(res.message);
        }

        $(_this).removeClass('button-loading');

        if (typeof refreshRecaptcha !== 'undefined') {
          refreshRecaptcha();
        }
      },
      error: function error(res) {
        if (typeof refreshRecaptcha !== 'undefined') {
          refreshRecaptcha();
        }

        $(_this).removeClass('button-loading');
        handleError(res);
      }
    });
  });
});

/***/ }),

/***/ 30:
/*!******************************************************************************!*\
  !*** multi ./platform/plugins/contact/resources/assets/js/contact-public.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\contact\resources\assets\js\contact-public.js */"./platform/plugins/contact/resources/assets/js/contact-public.js");


/***/ })

/******/ });