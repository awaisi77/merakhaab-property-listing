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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./platform/core/acl/resources/assets/js/profile.js":
/*!**********************************************************!*\
  !*** ./platform/core/acl/resources/assets/js/profile.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Created on 06/09/2015.
 */
var CropAvatar = /*#__PURE__*/function () {
  function CropAvatar($element) {
    _classCallCheck(this, CropAvatar);

    this.$container = $element;
    this.$avatarView = this.$container.find('.avatar-view');
    this.$triggerButton = this.$avatarView.find('.mt-overlay .btn-outline');
    this.$avatar = this.$avatarView.find('img');
    this.$avatarModal = this.$container.find('#avatar-modal');
    this.$loading = this.$container.find('.loading');
    this.$avatarForm = this.$avatarModal.find('.avatar-form');
    this.$avatarSrc = this.$avatarForm.find('.avatar-src');
    this.$avatarData = this.$avatarForm.find('.avatar-data');
    this.$avatarInput = this.$avatarForm.find('.avatar-input');
    this.$avatarSave = this.$avatarForm.find('.avatar-save');
    this.$avatarWrapper = this.$avatarModal.find('.avatar-wrapper');
    this.$avatarPreview = this.$avatarModal.find('.avatar-preview');
    this.support = {
      fileList: !!$('<input type="file">').prop('files'),
      fileReader: !!window.FileReader,
      formData: !!window.FormData
    };
  }

  _createClass(CropAvatar, [{
    key: "init",
    value: function init() {
      this.support.datauri = this.support.fileList && this.support.fileReader;

      if (!this.support.formData) {
        this.initIframe();
      }

      this.initTooltip();
      this.initModal();
      this.addListener();
    }
  }, {
    key: "addListener",
    value: function addListener() {
      this.$triggerButton.on('click', $.proxy(this.click, this));
      this.$avatarInput.on('change', $.proxy(this.change, this));
      this.$avatarForm.on('submit', $.proxy(this.submit, this));
    }
  }, {
    key: "initTooltip",
    value: function initTooltip() {
      this.$avatarView.tooltip({
        placement: 'bottom'
      });
    }
  }, {
    key: "initModal",
    value: function initModal() {
      this.$avatarModal.modal('hide');
      this.initPreview();
    }
  }, {
    key: "initPreview",
    value: function initPreview() {
      var url = this.$avatar.prop('src');
      this.$avatarPreview.empty().html('<img src="' + url + '">');
    }
  }, {
    key: "initIframe",
    value: function initIframe() {
      var iframeName = 'avatar-iframe-' + Math.random().toString().replace('.', ''),
          $iframe = $('<iframe name="' + iframeName + '" style="display:none;"></iframe>'),
          firstLoad = true,
          _this = this;

      this.$iframe = $iframe;
      this.$avatarForm.attr('target', iframeName).after($iframe);
      this.$iframe.on('load', function () {
        var data, win, doc;

        try {
          win = this.contentWindow;
          doc = this.contentDocument;
          doc = doc ? doc : win.document;
          data = doc ? doc.body.innerText : null;
        } catch (e) {}

        if (data) {
          _this.submitDone(data);
        } else if (firstLoad) {
          firstLoad = false;
        } else {
          _this.submitFail('Image upload failed!');
        }

        _this.submitEnd();
      });
    }
  }, {
    key: "click",
    value: function click() {
      this.$avatarModal.modal('show');
    }
  }, {
    key: "change",
    value: function change() {
      var files, file;

      if (this.support.datauri) {
        files = this.$avatarInput.prop('files');

        if (files.length > 0) {
          file = files[0];

          if (CropAvatar.isImageFile(file)) {
            this.read(file);
          }
        }
      } else {
        file = this.$avatarInput.val();

        if (CropAvatar.isImageFile(file)) {
          this.syncUpload();
        }
      }
    }
  }, {
    key: "submit",
    value: function submit() {
      if (!this.$avatarSrc.val() && !this.$avatarInput.val()) {
        Botble.showError('Please select image!');
        return false;
      }

      if (this.support.formData) {
        this.ajaxUpload();
        return false;
      }
    }
  }, {
    key: "read",
    value: function read(file) {
      var _this = this,
          fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = function () {
        _this.url = this.result;

        _this.startCropper();
      };
    }
  }, {
    key: "startCropper",
    value: function startCropper() {
      var _this = this;

      if (this.active) {
        this.$img.cropper('replace', this.url);
      } else {
        this.$img = $('<img src="' + this.url + '">');
        this.$avatarWrapper.empty().html(this.$img);
        this.$img.cropper({
          aspectRatio: 1,
          rotatable: true,
          preview: this.$avatarPreview.selector,
          done: function done(data) {
            var json = ['{"x":' + data.x, '"y":' + data.y, '"height":' + data.height, '"width":' + data.width + "}"].join();

            _this.$avatarData.val(json);
          }
        });
        this.active = true;
      }
    }
  }, {
    key: "stopCropper",
    value: function stopCropper() {
      if (this.active) {
        this.$img.cropper('destroy');
        this.$img.remove();
        this.active = false;
      }
    }
  }, {
    key: "ajaxUpload",
    value: function ajaxUpload() {
      var url = this.$avatarForm.attr('action'),
          data = new FormData(this.$avatarForm[0]),
          _this = this;

      $.ajax(url, {
        type: 'POST',
        data: data,
        processData: false,
        contentType: false,
        beforeSend: function beforeSend() {
          _this.submitStart();
        },
        success: function success(data) {
          _this.submitDone(data);
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          _this.submitFail(XMLHttpRequest.responseJSON, textStatus || errorThrown);
        },
        complete: function complete() {
          _this.submitEnd();
        }
      });
    }
  }, {
    key: "syncUpload",
    value: function syncUpload() {
      this.$avatarSave.trigger('click');
    }
  }, {
    key: "submitStart",
    value: function submitStart() {
      this.$loading.fadeIn();
      this.$avatarSave.attr('disabled', true).text('Saving...');
    }
  }, {
    key: "submitDone",
    value: function submitDone(data) {
      try {
        data = $.parseJSON(data);
      } catch (e) {}

      if (data && !data.error) {
        if (data.data) {
          this.url = data.data.url;

          if (this.support.datauri || this.uploaded) {
            this.uploaded = false;
            this.cropDone();
          } else {
            this.uploaded = true;
            this.$avatarSrc.val(this.url);
            this.startCropper();
          }

          this.$avatarInput.val('');
          Botble.showSuccess(data.message);
        } else {
          Botble.showError(data.message);
        }
      } else {
        Botble.showError(data.message);
      }
    }
  }, {
    key: "submitEnd",
    value: function submitEnd() {
      this.$loading.fadeOut();
      this.$avatarSave.removeAttr('disabled').text('Save');
    }
  }, {
    key: "cropDone",
    value: function cropDone() {
      this.$avatarSrc.val('');
      this.$avatarData.val('');
      this.$avatar.prop('src', this.url);
      $('.user-menu img').prop('src', this.url);
      $('.user.dropdown img').prop('src', this.url);
      this.stopCropper();
      this.initModal();
    }
  }], [{
    key: "isImageFile",
    value: function isImageFile(file) {
      if (file.type) {
        return /^image\/\w+$/.test(file.type);
      }

      return /\.(jpg|jpeg|png|gif)$/.test(file);
    }
  }, {
    key: "submitFail",
    value: function submitFail(errors) {
      Botble.handleError(errors);
    }
  }]);

  return CropAvatar;
}();

$(document).ready(function () {
  new CropAvatar($('.crop-avatar')).init();
});

/***/ }),

/***/ "./platform/core/acl/resources/assets/sass/login.scss":
/*!************************************************************!*\
  !*** ./platform/core/acl/resources/assets/sass/login.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/core/base/resources/assets/sass/base/themes/blue.scss":
/*!************************************************************************!*\
  !*** ./platform/core/base/resources/assets/sass/base/themes/blue.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/core/base/resources/assets/sass/base/themes/darkblue.scss":
/*!****************************************************************************!*\
  !*** ./platform/core/base/resources/assets/sass/base/themes/darkblue.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/core/base/resources/assets/sass/base/themes/default.scss":
/*!***************************************************************************!*\
  !*** ./platform/core/base/resources/assets/sass/base/themes/default.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/core/base/resources/assets/sass/base/themes/grey.scss":
/*!************************************************************************!*\
  !*** ./platform/core/base/resources/assets/sass/base/themes/grey.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/core/base/resources/assets/sass/base/themes/light.scss":
/*!*************************************************************************!*\
  !*** ./platform/core/base/resources/assets/sass/base/themes/light.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/core/base/resources/assets/sass/core.scss":
/*!************************************************************!*\
  !*** ./platform/core/base/resources/assets/sass/core.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/core/base/resources/assets/sass/custom/email.scss":
/*!********************************************************************!*\
  !*** ./platform/core/base/resources/assets/sass/custom/email.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/core/base/resources/assets/sass/custom/system-info.scss":
/*!**************************************************************************!*\
  !*** ./platform/core/base/resources/assets/sass/custom/system-info.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/core/dashboard/resources/assets/sass/dashboard.scss":
/*!**********************************************************************!*\
  !*** ./platform/core/dashboard/resources/assets/sass/dashboard.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/core/media/resources/assets/sass/media.scss":
/*!**************************************************************!*\
  !*** ./platform/core/media/resources/assets/sass/media.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/core/setting/resources/assets/sass/setting.scss":
/*!******************************************************************!*\
  !*** ./platform/core/setting/resources/assets/sass/setting.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/core/table/resources/assets/sass/table.scss":
/*!**************************************************************!*\
  !*** ./platform/core/table/resources/assets/sass/table.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/packages/menu/resources/assets/sass/menu.scss":
/*!****************************************************************!*\
  !*** ./platform/packages/menu/resources/assets/sass/menu.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/packages/plugin-management/resources/assets/sass/plugin.scss":
/*!*******************************************************************************!*\
  !*** ./platform/packages/plugin-management/resources/assets/sass/plugin.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/packages/revision/resources/assets/sass/revision.scss":
/*!************************************************************************!*\
  !*** ./platform/packages/revision/resources/assets/sass/revision.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/packages/seo-helper/resources/assets/sass/seo-helper.scss":
/*!****************************************************************************!*\
  !*** ./platform/packages/seo-helper/resources/assets/sass/seo-helper.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/packages/slug/resources/assets/sass/slug.scss":
/*!****************************************************************!*\
  !*** ./platform/packages/slug/resources/assets/sass/slug.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/packages/theme/resources/assets/sass/admin-bar.scss":
/*!**********************************************************************!*\
  !*** ./platform/packages/theme/resources/assets/sass/admin-bar.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/packages/theme/resources/assets/sass/custom-css.scss":
/*!***********************************************************************!*\
  !*** ./platform/packages/theme/resources/assets/sass/custom-css.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/packages/theme/resources/assets/sass/theme-options.scss":
/*!**************************************************************************!*\
  !*** ./platform/packages/theme/resources/assets/sass/theme-options.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/plugins/backup/resources/assets/sass/backup.scss":
/*!*******************************************************************!*\
  !*** ./platform/plugins/backup/resources/assets/sass/backup.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/plugins/contact/resources/assets/sass/contact-public.scss":
/*!****************************************************************************!*\
  !*** ./platform/plugins/contact/resources/assets/sass/contact-public.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/plugins/contact/resources/assets/sass/contact.scss":
/*!*********************************************************************!*\
  !*** ./platform/plugins/contact/resources/assets/sass/contact.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/plugins/cookie-consent/resources/assets/sass/cookie-consent.scss":
/*!***********************************************************************************!*\
  !*** ./platform/plugins/cookie-consent/resources/assets/sass/cookie-consent.scss ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/plugins/language/resources/assets/sass/language-public.scss":
/*!******************************************************************************!*\
  !*** ./platform/plugins/language/resources/assets/sass/language-public.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/plugins/language/resources/assets/sass/language.scss":
/*!***********************************************************************!*\
  !*** ./platform/plugins/language/resources/assets/sass/language.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/plugins/payment/resources/assets/sass/payment-methods.scss":
/*!*****************************************************************************!*\
  !*** ./platform/plugins/payment/resources/assets/sass/payment-methods.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/plugins/payment/resources/assets/sass/payment.scss":
/*!*********************************************************************!*\
  !*** ./platform/plugins/payment/resources/assets/sass/payment.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/plugins/real-estate/resources/assets/sass/account-admin.scss":
/*!*******************************************************************************!*\
  !*** ./platform/plugins/real-estate/resources/assets/sass/account-admin.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/plugins/real-estate/resources/assets/sass/account.scss":
/*!*************************************************************************!*\
  !*** ./platform/plugins/real-estate/resources/assets/sass/account.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/plugins/real-estate/resources/assets/sass/app.scss":
/*!*********************************************************************!*\
  !*** ./platform/plugins/real-estate/resources/assets/sass/app.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/css-loader/index.js):\nModuleBuildError: Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\nSassError: Undefined operation \"calc(1.6em + 0.75rem + 2px) - 2\".\n   ╷\n32 │   line-height: $input_height - 2;\n   │                ^^^^^^^^^^^^^^^^^\n   ╵\n  node_modules\\jquery-nice-select\\scss\\nice-select.scss 32:16  @import\n  D:\\xampp\\htdocs\\merakhaab\\platform\\plugins\\real-estate\\resources\\assets\\sass\\app.scss 23:9                                                   root stylesheet\n    at D:\\xampp\\htdocs\\merakhaab\\node_modules\\webpack\\lib\\NormalModule.js:316:20\n    at D:\\xampp\\htdocs\\merakhaab\\node_modules\\loader-runner\\lib\\LoaderRunner.js:367:11\n    at D:\\xampp\\htdocs\\merakhaab\\node_modules\\loader-runner\\lib\\LoaderRunner.js:233:18\n    at context.callback (D:\\xampp\\htdocs\\merakhaab\\node_modules\\loader-runner\\lib\\LoaderRunner.js:111:13)\n    at D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass-loader\\dist\\index.js:73:7\n    at Function.call$2 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:98993:16)\n    at render_closure1.call$2 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:84511:12)\n    at _RootZone.runBinary$3$3 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:29540:18)\n    at _FutureListener.handleError$1 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:28062:21)\n    at _Future__propagateToListeners_handleError.call$0 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:28369:49)\n    at Object._Future__propagateToListeners (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:3901:77)\n    at _Future._completeError$2 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:28215:9)\n    at _AsyncAwaitCompleter.completeError$2 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:27863:12)\n    at Object._asyncRethrow (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:3704:17)\n    at D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:19766:20\n    at _wrapJsFunctionForAsync_closure.$protected (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:3729:15)\n    at _wrapJsFunctionForAsync_closure.call$2 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:27882:12)\n    at _awaitOnObject_closure0.call$2 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:27876:25)\n    at _RootZone.runBinary$3$3 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:29540:18)\n    at _FutureListener.handleError$1 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:28062:21)\n    at _Future__propagateToListeners_handleError.call$0 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:28369:49)\n    at Object._Future__propagateToListeners (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:3901:77)\n    at _Future._completeError$2 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:28215:9)\n    at _AsyncAwaitCompleter.completeError$2 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:27863:12)\n    at Object._asyncRethrow (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:3704:17)\n    at D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:15273:20\n    at _wrapJsFunctionForAsync_closure.$protected (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:3729:15)\n    at _wrapJsFunctionForAsync_closure.call$2 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:27882:12)\n    at _awaitOnObject_closure0.call$2 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:27876:25)\n    at _RootZone.runBinary$3$3 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:29540:18)\n    at _FutureListener.handleError$1 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:28062:21)\n    at _Future__propagateToListeners_handleError.call$0 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:28369:49)\n    at Object._Future__propagateToListeners (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:3901:77)\n    at _Future._completeError$2 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:28215:9)\n    at _AsyncAwaitCompleter.completeError$2 (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:27863:12)\n    at Object._asyncRethrow (D:\\xampp\\htdocs\\merakhaab\\node_modules\\sass\\sass.dart.js:3704:17)");

/***/ }),

/***/ "./platform/plugins/real-estate/resources/assets/sass/currencies.scss":
/*!****************************************************************************!*\
  !*** ./platform/plugins/real-estate/resources/assets/sass/currencies.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/plugins/real-estate/resources/assets/sass/real-estate.scss":
/*!*****************************************************************************!*\
  !*** ./platform/plugins/real-estate/resources/assets/sass/real-estate.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/plugins/social-login/resources/assets/sass/social-login.scss":
/*!*******************************************************************************!*\
  !*** ./platform/plugins/social-login/resources/assets/sass/social-login.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/plugins/translation/resources/assets/sass/theme-translations.scss":
/*!************************************************************************************!*\
  !*** ./platform/plugins/translation/resources/assets/sass/theme-translations.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/plugins/translation/resources/assets/sass/translation.scss":
/*!*****************************************************************************!*\
  !*** ./platform/plugins/translation/resources/assets/sass/translation.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/themes/flex-home/assets/sass/rtl-style.scss":
/*!**************************************************************!*\
  !*** ./platform/themes/flex-home/assets/sass/rtl-style.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./platform/themes/flex-home/assets/sass/style.scss":
/*!**********************************************************!*\
  !*** ./platform/themes/flex-home/assets/sass/style.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/css-loader/index.js):\nModuleBuildError: Module build failed (from ./node_modules/postcss-loader/src/index.js):\nError: PostCSS plugin postcss-purgecss requires PostCSS 8.\nMigration guide for end-users:\nhttps://github.com/postcss/postcss/wiki/PostCSS-8-for-end-users\n    at Processor.normalize (D:\\xampp\\htdocs\\merakhaab\\node_modules\\postcss-loader\\node_modules\\postcss\\lib\\processor.js:167:15)\n    at new Processor (D:\\xampp\\htdocs\\merakhaab\\node_modules\\postcss-loader\\node_modules\\postcss\\lib\\processor.js:56:25)\n    at postcss (D:\\xampp\\htdocs\\merakhaab\\node_modules\\postcss-loader\\node_modules\\postcss\\lib\\postcss.js:55:10)\n    at D:\\xampp\\htdocs\\merakhaab\\node_modules\\postcss-loader\\src\\index.js:140:12\n    at D:\\xampp\\htdocs\\merakhaab\\node_modules\\webpack\\lib\\NormalModule.js:316:20\n    at D:\\xampp\\htdocs\\merakhaab\\node_modules\\loader-runner\\lib\\LoaderRunner.js:367:11\n    at D:\\xampp\\htdocs\\merakhaab\\node_modules\\loader-runner\\lib\\LoaderRunner.js:233:18\n    at context.callback (D:\\xampp\\htdocs\\merakhaab\\node_modules\\loader-runner\\lib\\LoaderRunner.js:111:13)\n    at D:\\xampp\\htdocs\\merakhaab\\node_modules\\postcss-loader\\src\\index.js:208:9");

/***/ }),

/***/ 0:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** multi ./platform/core/acl/resources/assets/js/profile.js ./platform/core/acl/resources/assets/sass/login.scss ./platform/core/base/resources/assets/sass/base/themes/blue.scss ./platform/core/base/resources/assets/sass/base/themes/darkblue.scss ./platform/core/base/resources/assets/sass/base/themes/default.scss ./platform/core/base/resources/assets/sass/base/themes/grey.scss ./platform/core/base/resources/assets/sass/base/themes/light.scss ./platform/core/base/resources/assets/sass/core.scss ./platform/core/base/resources/assets/sass/custom/system-info.scss ./platform/core/base/resources/assets/sass/custom/email.scss ./platform/core/dashboard/resources/assets/sass/dashboard.scss ./platform/core/media/resources/assets/sass/media.scss ./platform/core/setting/resources/assets/sass/setting.scss ./platform/core/table/resources/assets/sass/table.scss ./platform/packages/menu/resources/assets/sass/menu.scss ./platform/packages/plugin-management/resources/assets/sass/plugin.scss ./platform/packages/revision/resources/assets/sass/revision.scss ./platform/packages/seo-helper/resources/assets/sass/seo-helper.scss ./platform/packages/slug/resources/assets/sass/slug.scss ./platform/packages/theme/resources/assets/sass/custom-css.scss ./platform/packages/theme/resources/assets/sass/theme-options.scss ./platform/packages/theme/resources/assets/sass/admin-bar.scss ./platform/plugins/backup/resources/assets/sass/backup.scss ./platform/plugins/contact/resources/assets/sass/contact.scss ./platform/plugins/contact/resources/assets/sass/contact-public.scss ./platform/plugins/cookie-consent/resources/assets/sass/cookie-consent.scss ./platform/plugins/language/resources/assets/sass/language.scss ./platform/plugins/language/resources/assets/sass/language-public.scss ./platform/plugins/payment/resources/assets/sass/payment.scss ./platform/plugins/payment/resources/assets/sass/payment-methods.scss ./platform/plugins/real-estate/resources/assets/sass/real-estate.scss ./platform/plugins/real-estate/resources/assets/sass/currencies.scss ./platform/plugins/real-estate/resources/assets/sass/account-admin.scss ./platform/plugins/real-estate/resources/assets/sass/account.scss ./platform/plugins/real-estate/resources/assets/sass/app.scss ./platform/plugins/social-login/resources/assets/sass/social-login.scss ./platform/plugins/translation/resources/assets/sass/translation.scss ./platform/plugins/translation/resources/assets/sass/theme-translations.scss ./platform/themes/flex-home/assets/sass/style.scss ./platform/themes/flex-home/assets/sass/rtl-style.scss ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\core\acl\resources\assets\js\profile.js */"./platform/core/acl/resources/assets/js/profile.js");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\core\acl\resources\assets\sass\login.scss */"./platform/core/acl/resources/assets/sass/login.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\core\base\resources\assets\sass\base\themes\blue.scss */"./platform/core/base/resources/assets/sass/base/themes/blue.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\core\base\resources\assets\sass\base\themes\darkblue.scss */"./platform/core/base/resources/assets/sass/base/themes/darkblue.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\core\base\resources\assets\sass\base\themes\default.scss */"./platform/core/base/resources/assets/sass/base/themes/default.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\core\base\resources\assets\sass\base\themes\grey.scss */"./platform/core/base/resources/assets/sass/base/themes/grey.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\core\base\resources\assets\sass\base\themes\light.scss */"./platform/core/base/resources/assets/sass/base/themes/light.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\core\base\resources\assets\sass\core.scss */"./platform/core/base/resources/assets/sass/core.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\core\base\resources\assets\sass\custom\system-info.scss */"./platform/core/base/resources/assets/sass/custom/system-info.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\core\base\resources\assets\sass\custom\email.scss */"./platform/core/base/resources/assets/sass/custom/email.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\core\dashboard\resources\assets\sass\dashboard.scss */"./platform/core/dashboard/resources/assets/sass/dashboard.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\core\media\resources\assets\sass\media.scss */"./platform/core/media/resources/assets/sass/media.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\core\setting\resources\assets\sass\setting.scss */"./platform/core/setting/resources/assets/sass/setting.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\core\table\resources\assets\sass\table.scss */"./platform/core/table/resources/assets/sass/table.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\packages\menu\resources\assets\sass\menu.scss */"./platform/packages/menu/resources/assets/sass/menu.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\packages\plugin-management\resources\assets\sass\plugin.scss */"./platform/packages/plugin-management/resources/assets/sass/plugin.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\packages\revision\resources\assets\sass\revision.scss */"./platform/packages/revision/resources/assets/sass/revision.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\packages\seo-helper\resources\assets\sass\seo-helper.scss */"./platform/packages/seo-helper/resources/assets/sass/seo-helper.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\packages\slug\resources\assets\sass\slug.scss */"./platform/packages/slug/resources/assets/sass/slug.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\packages\theme\resources\assets\sass\custom-css.scss */"./platform/packages/theme/resources/assets/sass/custom-css.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\packages\theme\resources\assets\sass\theme-options.scss */"./platform/packages/theme/resources/assets/sass/theme-options.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\packages\theme\resources\assets\sass\admin-bar.scss */"./platform/packages/theme/resources/assets/sass/admin-bar.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\backup\resources\assets\sass\backup.scss */"./platform/plugins/backup/resources/assets/sass/backup.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\contact\resources\assets\sass\contact.scss */"./platform/plugins/contact/resources/assets/sass/contact.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\contact\resources\assets\sass\contact-public.scss */"./platform/plugins/contact/resources/assets/sass/contact-public.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\cookie-consent\resources\assets\sass\cookie-consent.scss */"./platform/plugins/cookie-consent/resources/assets/sass/cookie-consent.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\language\resources\assets\sass\language.scss */"./platform/plugins/language/resources/assets/sass/language.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\language\resources\assets\sass\language-public.scss */"./platform/plugins/language/resources/assets/sass/language-public.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\payment\resources\assets\sass\payment.scss */"./platform/plugins/payment/resources/assets/sass/payment.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\payment\resources\assets\sass\payment-methods.scss */"./platform/plugins/payment/resources/assets/sass/payment-methods.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\real-estate\resources\assets\sass\real-estate.scss */"./platform/plugins/real-estate/resources/assets/sass/real-estate.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\real-estate\resources\assets\sass\currencies.scss */"./platform/plugins/real-estate/resources/assets/sass/currencies.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\real-estate\resources\assets\sass\account-admin.scss */"./platform/plugins/real-estate/resources/assets/sass/account-admin.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\real-estate\resources\assets\sass\account.scss */"./platform/plugins/real-estate/resources/assets/sass/account.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\real-estate\resources\assets\sass\app.scss */"./platform/plugins/real-estate/resources/assets/sass/app.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\social-login\resources\assets\sass\social-login.scss */"./platform/plugins/social-login/resources/assets/sass/social-login.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\translation\resources\assets\sass\translation.scss */"./platform/plugins/translation/resources/assets/sass/translation.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\plugins\translation\resources\assets\sass\theme-translations.scss */"./platform/plugins/translation/resources/assets/sass/theme-translations.scss");
__webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\themes\flex-home\assets\sass\style.scss */"./platform/themes/flex-home/assets/sass/style.scss");
module.exports = __webpack_require__(/*! D:\xampp\htdocs\merakhaab\platform\themes\flex-home\assets\sass\rtl-style.scss */"./platform/themes/flex-home/assets/sass/rtl-style.scss");


/***/ })

/******/ });