$(function () {
  // header と footer を読み込んだあとにバーを初期化する
  $("#header").load("header.html", function () {
    $("#footer").load("footer.html");

    // header.html の中に splash_text が含まれている場合、load完了後に処理
    var splash_text = document.getElementById('splash_text');
    if (splash_text) {
      var bar = new ProgressBar.Line(splash_text, {
        easing: 'easeInOut',
        duration: 1000,
        strokeWidth: 0.2,
        color: '#6c9f82',
        trailWidth: 0.2,
        trailColor: '#6c9f82',
        text: {
          style: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            padding: '0',
            margin: '-30px 0 0 0',
            transform: 'translate(-50%,-50%)',
            'font-size': '1rem',
            color: '#6c9f82',
          },
          autoStyleContainer: false
        },
        step: function (state, bar) {
          bar.setText(Math.round(bar.value() * 100) + ' %');
        }
      });

      // アニメーションスタート
      bar.animate(1.0, function () {
        $("#splash").delay(500).fadeOut(800);
      });
    }
  });
});

// スクロール時のフェードイン処理
$(function () {
  $(window).on('load scroll', function () {
    $('.js-fadein').each(function () {
      var target = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var height = $(window).height();
      if (scroll > target - height) {
        $(this).addClass('is-active');
      }
    });
  });
});

// デザイン要素のふわっと表示
$(window).scroll(function () {
  var scrollTop = $(this).scrollTop();
  var scrollBottom = scrollTop + $(this).height();
  var effectPos = scrollBottom - 50;

  $(".js-design__fadein").each(function (i) {
    if (effectPos > $(this).offset().top) {
      var that = this;
      setTimeout(function () {
        $(that).addClass("is-show");
      }, 200 * i);
    }
  });
});

// モーダル初回表示処理
$(function () {
  var access = $.cookie('access');
  var flag = !access;
  if (flag) {
    $.cookie('access', false);
  }

  $(".js-modal-open").modaal({
    start_open: flag,
    overlay_close: true,
    before_open: function () {
      $('html').css('overflow-y', 'hidden');
    },
    after_close: function () {
      $('html').css('overflow-y', 'scroll');
    }
  });
});
