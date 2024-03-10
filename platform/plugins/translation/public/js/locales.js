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
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./platform/plugins/translation/resources/assets/js/locales.js":
/*!*********************************************************************!*\
  !*** ./platform/plugins/translation/resources/assets/js/locales.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  var _this = this;

  var languageTable = $('.table-language');
  languageTable.on('click', '.delete-locale-button', function (event) {
    event.preventDefault();
    $('.delete-crud-entry').data('url', $(event.currentTarget).data('url'));
    $('.modal-confirm-delete').modal('show');
  });
  $(document).on('click', '.delete-crud-entry', function (event) {
    event.preventDefault();
    $('.modal-confirm-delete').modal('hide');
    var deleteURL = $(event.currentTarget).data('url');
    $(_this).prop('disabled', true).addClass('button-loading');
    $.ajax({
      url: deleteURL,
      type: 'DELETE',
      success: function success(data) {
        if (data.error) {
          Botble.showError(data.message);
        } else {
          if (data.data) {
            languageTable.find('i[data-locale=' + data.data + ']').unwrap();
            $('.tooltip').remove();
          }

          languageTable.find('a[data-url="' + deleteURL + '"]').closest('tr').remove();
          Botble.showSuccess(data.message);
        }

        $(_this).prop('disabled', false).removeClass('button-loading');
      },
      error: function error(data) {
        $(_this).prop('disabled', false).removeClass('button-loading');
        Botble.handleError(data);
      }
    });
  });
  $(document).on('click', '.add-locale-form button[type=submit]', function (event) {
    var _this2 = this;

    event.preventDefault();
    event.stopPropagation();
    $(this).prop('disabled', true).addClass('button-loading');
    $.ajax({
      type: 'POST',
      cache: false,
      url: $(this).closest('form').prop('action'),
      data: new FormData($(this).closest('form')[0]),
      contentType: false,
      processData: false,
      success: function success(res) {
        if (!res.error) {
          Botble.showSuccess(res.message);
          languageTable.load(window.location.href + ' .table-language > *');
        } else {
          Botble.showError(res.message);
        }

        $(_this2).prop('disabled', false).removeClass('button-loading');
      },
      error: function error(res) {
        $(_this2).prop('disabled', false).removeClass('button-loading');
        Botble.handleError(res);
      }
    });
  });
});

/***/ }),

/***/ 45:
/*!***************************************************************************!*\
  !*** multi ./platform/plugins/translation/resources/assets/js/locales.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\translation\resources\assets\js\locales.js */"./platform/plugins/translation/resources/assets/js/locales.js");


/***/ })

/******/ });