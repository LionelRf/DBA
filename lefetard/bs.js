/*globals $, window, document */
$(document).ready(function () {
  var $headerMain = $('.header-main'),
    $boxHeading = $headerMain.find('.box-heading');
  if (typeof $boxHeading !== 'undefined' && $boxHeading.length) {
    var backgroundUrl = $boxHeading.data('url');
    if (typeof backgroundUrl !== 'undefined' && backgroundUrl.length) {
      if (jQuery('.header-main').find('.box-menu').length) {
        target = $boxHeading.parent().parent();
      } else {
        target = $headerMain;
      }
      target.css({
        'background-image': 'url(' + backgroundUrl.replace('[width]', parseInt($('.header-main').width())) + ')',
        'background-size': 'cover'
      });
    }
  }
  if ($('.authors-list li').length) {
    $('.authors-list li').parents('.box-author').show()
  }
  $("#form-comment-add").validate({
    submitHandler: function (form) {
      if ($('#form-comment-add input[name=post_comment_remember]').prop('checked')) {
        $.cookie('remember', true, {
          expires: 365,
          path: '/',
          raw: true
        });
        $(['post_comment_author', 'post_comment_author_email', 'post_comment_author_link']).each(function (k, v) {
          $.cookie(v, $('#form-comment-add input[name=' + v + ']').val(), {
            expires: 365,
            path: '/',
            raw: true
          });
        });
      } else {
        $(['post_comment_remember', 'post_comment_author', 'post_comment_author_email', 'post_comment_author_link']).each(function (k, v) {
          $.removeCookie(v);
        });
      }
      form.submit();
    },
    rules: {
      "post_comment_author": {
        "required": true,
        "maxlength": 255
      },
      "post_comment_author_email": {
        "required": true,
        "email": true,
        "maxlength": 255
      },
      "post_comment_author_link": {
        "required": false,
        "url": true,
        "maxlength": 255
      },
      "post_comment_source": {
        "required": true
      }
    }
  });
  $("form.form-newsletter").each(function () {
    $(this).validate({
      rules: {
        "email": {
          "required": true,
          "email": true,
          "maxlength": 255
        }
      }
    });
  });
  $("form.form-search").each(function () {
    $(this).validate({
      rules: {
        "s": {
          "required": true,
          "maxlength": 255
        }
      }
    });
  });
  $("#form-contact").validate({
    rules: {
      "contact_name": {
        "required": true,
        "maxlength": 255
      },
      "contact_email": {
        "required": true,
        "email": true,
        "maxlength": 255
      },
      "contact_url": {
        "required": false,
        "url": true,
        "maxlength": 255
      },
      "contact_message": {
        "required": true
      }
    }
  });
  if ($('#form-comment-add').length && $.cookie('remember')) {
    $('#form-comment-add input[name=post_comment_remember]').prop('checked', 1);
    $(['post_comment_author', 'post_comment_author_email', 'post_comment_author_link']).each(function (k, v) {
      $('#form-comment-add input[name=' + v + ']').val($.cookie(v));
    });
  }
  $(document).on('tap click', 'a.comment-info-respond', function () {
    $('#form-comment-add #post_comment_username').val($(this).data('author'));
    $('#form-comment-add #post_comment_parent').val($(this).data('id'));
    $('#respondtoauthor .form-value').text($(this).data('author'));
    $('#respondtoauthor').show();
  });
  if ($('#fb-root').length && $('meta[property="fb:app_id"]').length) {
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1&appId=" + $('meta[property="fb:app_id"]').attr('content');
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
  $(document).on('tap click', '.alertlink', function (event) {
    event.preventDefault();
    window.open($(event.target).attr('href'), "", "scrollbars=1,width=900,height=650");
  });
  $(document).on('tap click', "#display-navigation", function () {
    var $menu = $("#navigation-to-display");
    $(window).on('resize', function () {
      var win = $(this); //this = window
      if (win.width() >= 480) {
        $menu.slideDown();
      }
    });
    if ($menu.is(':visible')) {
      $menu.slideUp();
    } else {
      $menu.slideDown();
    }
  });
  if ($('.menu-main .box-menu-sticky').length) {
    $(window).scroll(function () {
      if ($(window).scrollTop() > $('.menu-main').position().top) {
        $('.menu-main').removeClass('no-sticky').addClass('sticky');
      } else {
        $('.menu-main').removeClass('sticky').addClass('no-sticky');
      }
    });
    $(window).scroll();
  }
  if ($('.carousel').length) {
    $('.carousel').each(function () {
      if ($(this).find('li.item').length) {
        $(this).carousel();
      } else {
        $(this).find('.carousel-control').hide();
      }
    });
  }
});
$(window).load(function () {
  $(function () {
    if ($().masonry) {
      $('.masonry').masonry({
        "itemSelector": '.masonry-thumb',
        "gutter": ".gutter-sizer",
        "columnWidth": ".grid-sizer"
      });
      $('.popin').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
          enabled: true
        }
      });
    }
  });
});
