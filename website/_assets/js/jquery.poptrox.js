/* jquery.poptrox.js v2.5.2-dev | (c) @ajlkn | github.com/ajlkn/jquery.poptrox | MIT licensed */
!(function (e) {
  (e.fn.poptrox_disableSelection = function () {
    return e(this)
      .css("user-select", "none")
      .css("-khtml-user-select", "none")
      .css("-moz-user-select", "none")
      .css("-o-user-select", "none")
      .css("-webkit-user-select", "none");
  }),
    (e.fn.poptrox = function (o) {
      if (0 == this.length) return e(this);
      if (this.length > 1) {
        for (var t = 0; t < this.length; t++) e(this[t]).poptrox(o);
        return e(this);
      }
      var p,
        i,
        s = e.extend(
          {
            preload: !1,
            baseZIndex: 1e3,
            fadeSpeed: 300,
            overlayColor: "#000000",
            overlayOpacity: 0.6,
            overlayClass: "poptrox-overlay",
            windowMargin: 50,
            windowHeightPad: 0,
            selector: "a",
            caption: null,
            parent: "body",
            popupSpeed: 300,
            popupWidth: 200,
            popupHeight: 100,
            popupIsFixed: !1,
            useBodyOverflow: !1,
            usePopupEasyClose: !0,
            usePopupForceClose: !1,
            usePopupLoader: !0,
            usePopupCloser: !0,
            usePopupCaption: !1,
            usePopupNav: !1,
            usePopupDefaultStyling: !0,
            popupBackgroundColor: "#FFFFFF",
            popupTextColor: "#000000",
            popupLoaderTextSize: "2em",
            popupCloserBackgroundColor: "#000000",
            popupCloserTextColor: "#FFFFFF",
            popupCloserTextSize: "20px",
            popupPadding: 10,
            popupCaptionHeight: 60,
            popupCaptionTextSize: null,
            popupBlankCaptionText: "(untitled)",
            popupCloserText: "&#215;",
            popupLoaderText: "&bull;&bull;&bull;&bull;",
            popupClass: "poptrox-popup",
            popupSelector: null,
            popupLoaderSelector: ".loader",
            popupCloserSelector: ".closer",
            popupCaptionSelector: ".caption",
            popupNavPreviousSelector: ".nav-previous",
            popupNavNextSelector: ".nav-next",
            onPopupClose: null,
            onPopupOpen: null,
          },
          o,
        ),
        r = e(this),
        n = e("body"),
        a = e('<div class="' + s.overlayClass + '"></div>'),
        l = e(window),
        u = [],
        d = 0,
        h = !1,
        g = new Array(),
        f = function () {
          (p = l.width()), (i = l.height() + s.windowHeightPad);
          var e = Math.abs(x.width() - x.outerWidth()),
            o = Math.abs(x.height() - x.outerHeight()),
            t = p - 2 * s.windowMargin - e,
            r = i - 2 * s.windowMargin - o;
          x.css("min-width", s.popupWidth).css("min-height", s.popupHeight),
            v.children().css("max-width", t).css("max-height", r);
        };
      s.usePopupLoader || (s.popupLoaderSelector = null),
        s.usePopupCloser || (s.popupCloserSelector = null),
        s.usePopupCaption || (s.popupCaptionSelector = null),
        s.usePopupNav || ((s.popupNavPreviousSelector = null), (s.popupNavNextSelector = null));
      var x;
      x = e(
        s.popupSelector
          ? s.popupSelector
          : '<div class="' +
              s.popupClass +
              '">' +
              (s.popupLoaderSelector ? '<div class="loader">' + s.popupLoaderText + "</div>" : "") +
              '<div class="pic"></div>' +
              (s.popupCaptionSelector ? '<div class="caption"></div>' : "") +
              (s.popupCloserSelector ? '<span class="closer">' + s.popupCloserText + "</span>" : "") +
              (s.popupNavPreviousSelector ? '<div class="nav-previous"></div>' : "") +
              (s.popupNavNextSelector ? '<div class="nav-next"></div>' : "") +
              "</div>",
      );
      var v = x.find(".pic"),
        w = e(),
        b = x.find(s.popupLoaderSelector),
        m = x.find(s.popupCaptionSelector),
        C = x.find(s.popupCloserSelector),
        y = x.find(s.popupNavNextSelector),
        S = x.find(s.popupNavPreviousSelector),
        P = y.add(S);
      if (
        s.usePopupDefaultStyling &&
        (x
          .css("background", s.popupBackgroundColor)
          .css("color", s.popupTextColor)
          .css("padding", s.popupPadding + "px"),
        m.length > 0 &&
          (x.css("padding-bottom", s.popupCaptionHeight + "px"),
          m
            .css("position", "absolute")
            .css("left", "0")
            .css("bottom", "0")
            .css("width", "100%")
            .css("text-align", "center")
            .css("height", s.popupCaptionHeight + "px")
            .css("line-height", s.popupCaptionHeight + "px"),
          s.popupCaptionTextSize && m.css("font-size", popupCaptionTextSize)),
        C.length > 0 &&
          C.html(s.popupCloserText)
            .css("font-size", s.popupCloserTextSize)
            .css("background", s.popupCloserBackgroundColor)
            .css("color", s.popupCloserTextColor)
            .css("display", "block")
            .css("width", "40px")
            .css("height", "40px")
            .css("line-height", "40px")
            .css("text-align", "center")
            .css("position", "absolute")
            .css("text-decoration", "none")
            .css("outline", "0")
            .css("top", "0")
            .css("right", "-40px"),
        b.length > 0 &&
          b
            .html("")
            .css("position", "relative")
            .css("font-size", s.popupLoaderTextSize)
            .on("startSpinning", function (o) {
              var t = e("<div>" + s.popupLoaderText + "</div>");
              t
                .css("height", Math.floor(s.popupHeight / 2) + "px")
                .css("overflow", "hidden")
                .css("line-height", Math.floor(s.popupHeight / 2) + "px")
                .css("text-align", "center")
                .css("margin-top", Math.floor((x.height() - t.height() + (m.length > 0 ? m.height() : 0)) / 2))
                .css("color", s.popupTextColor ? s.popupTextColor : "")
                .on("xfin", function () {
                  t.fadeTo(300, 0.5, function () {
                    t.trigger("xfout");
                  });
                })
                .on("xfout", function () {
                  t.fadeTo(300, 0.05, function () {
                    t.trigger("xfin");
                  });
                })
                .trigger("xfin"),
                b.append(t);
            })
            .on("stopSpinning", function (e) {
              var o = b.find("div");
              o.remove();
            }),
        2 == P.length)
      ) {
        P.css("font-size", "75px")
          .css("text-align", "center")
          .css("color", "#fff")
          .css("text-shadow", "none")
          .css("height", "100%")
          .css("position", "absolute")
          .css("top", "0")
          .css("opacity", "0.35")
          .css("cursor", "pointer")
          .css("box-shadow", "inset 0px 0px 10px 0px rgba(0,0,0,0)")
          .poptrox_disableSelection();
        var k, T;
        s.usePopupEasyClose ? ((k = "100px"), (T = "100px")) : ((k = "75%"), (T = "25%")),
          y
            .css("right", "0")
            .css("width", k)
            .html(
              '<div style="position: absolute; height: 100px; width: 125px; top: 50%; right: 0; margin-top: -50px;">&gt;</div>',
            ),
          S.css("left", "0")
            .css("width", T)
            .html(
              '<div style="position: absolute; height: 100px; width: 125px; top: 50%; left: 0; margin-top: -50px;">&lt;</div>',
            );
      }
      return (
        l.on("resize orientationchange", function () {
          f();
        }),
        m.on("update", function (e, o) {
          (o && 0 != o.length) || (o = s.popupBlankCaptionText), m.html(o);
        }),
        C.css("cursor", "pointer").on("click", function (e) {
          return e.preventDefault(), e.stopPropagation(), x.trigger("poptrox_close"), !0;
        }),
        y.on("click", function (e) {
          e.stopPropagation(), e.preventDefault(), x.trigger("poptrox_next");
        }),
        S.on("click", function (e) {
          e.stopPropagation(), e.preventDefault(), x.trigger("poptrox_previous");
        }),
        a
          .css("position", "fixed")
          .css("left", 0)
          .css("top", 0)
          .css("z-index", s.baseZIndex)
          .css("width", "100%")
          .css("height", "100%")
          .css("text-align", "center")
          .css("cursor", "pointer")
          .appendTo(s.parent)
          .prepend('<div style="display:inline-block;height:100%;vertical-align:middle;"></div>')
          .append(
            '<div style="position:absolute;left:0;top:0;width:100%;height:100%;background:' +
              s.overlayColor +
              ";opacity:" +
              s.overlayOpacity +
              ";filter:alpha(opacity=" +
              100 * s.overlayOpacity +
              ');"></div>',
          )
          .hide()
          .on("touchmove", function (e) {
            return !1;
          })
          .on("click", function (e) {
            e.preventDefault(), e.stopPropagation(), x.trigger("poptrox_close");
          }),
        x
          .css("display", "inline-block")
          .css("vertical-align", "middle")
          .css("position", "relative")
          .css("z-index", 1)
          .css("cursor", "auto")
          .appendTo(a)
          .hide()
          .on("poptrox_next", function () {
            var e = d + 1;
            e >= u.length && (e = 0), x.trigger("poptrox_switch", [e]);
          })
          .on("poptrox_previous", function () {
            var e = d - 1;
            e < 0 && (e = u.length - 1), x.trigger("poptrox_switch", [e]);
          })
          .on("poptrox_reset", function () {
            f(),
              x.data("width", s.popupWidth).data("height", s.popupHeight),
              b.hide().trigger("stopSpinning"),
              m.hide(),
              C.hide(),
              P.hide(),
              v.hide(),
              w.attr("src", "").detach();
          })
          .on("poptrox_open", function (e, o) {
            return (
              !!h ||
              ((h = !0),
              s.useBodyOverflow && n.css("overflow", "hidden"),
              s.onPopupOpen && s.onPopupOpen(),
              x.addClass("loading"),
              void a.fadeTo(s.fadeSpeed, 1, function () {
                x.trigger("poptrox_switch", [o, !0]);
              }))
            );
          })
          .on("poptrox_switch", function (o, t, p) {
            var i;
            if (!p && h) return !0;
            if (
              ((h = !0),
              x.addClass("loading").css("width", x.data("width")).css("height", x.data("height")),
              m.hide(),
              w.attr("src") && w.attr("src", ""),
              w.detach(),
              (i = u[t]),
              (w = i.object),
              w.off("load"),
              v.css("text-indent", "-9999px").show().append(w),
              "ajax" == i.type
                ? e.get(i.src, function (e) {
                    w.html(e), w.trigger("load");
                  })
                : w.attr("src", i.src),
              "image" != i.type)
            ) {
              var r, n;
              (r = i.width),
                (n = i.height),
                "%" == r.slice(-1) && (r = (parseInt(r.substring(0, r.length - 1)) / 100) * l.width()),
                "%" == n.slice(-1) && (n = (parseInt(n.substring(0, n.length - 1)) / 100) * l.height()),
                w
                  .css("position", "relative")
                  .css("outline", "0")
                  .css("z-index", s.baseZIndex + 100)
                  .width(r)
                  .height(n);
            }
            b.trigger("startSpinning").fadeIn(300),
              x.show(),
              s.popupIsFixed
                ? (x.removeClass("loading").width(s.popupWidth).height(s.popupHeight),
                  w.on("load", function () {
                    w.off("load"),
                      b.hide().trigger("stopSpinning"),
                      m.trigger("update", [i.captionText]).fadeIn(s.fadeSpeed),
                      C.fadeIn(s.fadeSpeed),
                      v
                        .css("text-indent", 0)
                        .hide()
                        .fadeIn(s.fadeSpeed, function () {
                          h = !1;
                        }),
                      (d = t),
                      P.fadeIn(s.fadeSpeed);
                  }))
                : w.on("load", function () {
                    f(), w.off("load"), b.hide().trigger("stopSpinning");
                    var e = w.width(),
                      o = w.height(),
                      p = function () {
                        m.trigger("update", [i.captionText]).fadeIn(s.fadeSpeed),
                          C.fadeIn(s.fadeSpeed),
                          v
                            .css("text-indent", 0)
                            .hide()
                            .fadeIn(s.fadeSpeed, function () {
                              h = !1;
                            }),
                          (d = t),
                          P.fadeIn(s.fadeSpeed),
                          x
                            .removeClass("loading")
                            .data("width", e)
                            .data("height", o)
                            .css("width", "auto")
                            .css("height", "auto");
                      };
                    e == x.data("width") && o == x.data("height")
                      ? p()
                      : x.animate({ width: e, height: o }, s.popupSpeed, "swing", p);
                  }),
              "image" != i.type && w.trigger("load");
          })
          .on("poptrox_close", function () {
            return (
              !(!h || s.usePopupForceClose) ||
              ((h = !0),
              x.hide().trigger("poptrox_reset"),
              s.onPopupClose && s.onPopupClose(),
              void a.fadeOut(s.fadeSpeed, function () {
                s.useBodyOverflow && n.css("overflow", "auto"), (h = !1);
              }))
            );
          })
          .trigger("poptrox_reset"),
        s.usePopupEasyClose
          ? (m.on("click", "a", function (e) {
              e.stopPropagation();
            }),
            x.css("cursor", "pointer").on("click", function (e) {
              e.stopPropagation(), e.preventDefault(), x.trigger("poptrox_close");
            }))
          : x.on("click", function (e) {
              e.stopPropagation();
            }),
        l.keydown(function (e) {
          if (x.is(":visible"))
            switch (e.keyCode) {
              case 37:
              case 32:
                if (s.usePopupNav) return x.trigger("poptrox_previous"), !1;
                break;
              case 39:
                if (s.usePopupNav) return x.trigger("poptrox_next"), !1;
                break;
              case 27:
                return x.trigger("poptrox_close"), !1;
            }
        }),
        r.find(s.selector).each(function (o) {
          var t,
            p,
            i = e(this),
            r = i.find("img"),
            n = i.data("poptrox");
          if ("ignore" != n && i.attr("href")) {
            if (
              ((t = {
                src: i.attr("href"),
                captionText: r.attr("title"),
                width: null,
                height: null,
                type: null,
                object: null,
                options: null,
              }),
              s.caption)
            ) {
              if ("function" == typeof s.caption) c = s.caption(i);
              else if ("selector" in s.caption) {
                var a;
                (a = i.find(s.caption.selector)),
                  "attribute" in s.caption
                    ? (c = a.attr(s.caption.attribute))
                    : ((c = a.html()), s.caption.remove === !0 && a.remove());
              }
            } else c = r.attr("title");
            if (((t.captionText = c), n)) {
              var l = n.split(",");
              0 in l && (t.type = l[0]),
                1 in l &&
                  ((p = l[1].match(/([0-9%]+)x([0-9%]+)/)),
                  p && 3 == p.length && ((t.width = p[1]), (t.height = p[2]))),
                2 in l && (t.options = l[2]);
            }
            if (!t.type)
              switch (((p = t.src.match(/\/\/([a-z0-9\.]+)\/.*/)), (!p || p.length < 2) && (p = [!1]), p[1])) {
                case "api.soundcloud.com":
                  t.type = "soundcloud";
                  break;
                case "youtu.be":
                  t.type = "youtube";
                  break;
                case "vimeo.com":
                  t.type = "vimeo";
                  break;
                case "wistia.net":
                  t.type = "wistia";
                  break;
                case "bcove.me":
                  t.type = "bcove";
                  break;
                default:
                  t.type = "image";
              }
            switch (((p = t.src.match(/\/\/[a-z0-9\.]+\/(.*)/)), t.type)) {
              case "iframe":
                (t.object = e('<iframe src="" frameborder="0"></iframe>')),
                  t.object
                    .on("click", function (e) {
                      e.stopPropagation();
                    })
                    .css("cursor", "auto"),
                  (t.width && t.height) || ((t.width = "600"), (t.height = "400"));
                break;
              case "ajax":
                (t.object = e('<div class="poptrox-ajax"></div>')),
                  t.object
                    .on("click", function (e) {
                      e.stopPropagation();
                    })
                    .css("cursor", "auto")
                    .css("overflow", "auto"),
                  (t.width && t.height) || ((t.width = "600"), (t.height = "400"));
                break;
              case "soundcloud":
                (t.object = e('<iframe scrolling="no" frameborder="no" src=""></iframe>')),
                  (t.src = "//w.soundcloud.com/player/?url=" + escape(t.src) + (t.options ? "&" + t.options : "")),
                  (t.width = "600"),
                  (t.height = "166");
                break;
              case "youtube":
                (t.object = e('<iframe src="" frameborder="0" allowfullscreen="1"></iframe>')),
                  (t.src = "//www.youtube.com/embed/" + p[1] + (t.options ? "?" + t.options : "")),
                  (t.width && t.height) || ((t.width = "800"), (t.height = "480"));
                break;
              case "vimeo":
                (t.object = e('<iframe src="" frameborder="0" allowFullScreen="1"></iframe>')),
                  (t.src = "//player.vimeo.com/video/" + p[1] + (t.options ? "?" + t.options : "")),
                  (t.width && t.height) || ((t.width = "800"), (t.height = "480"));
                break;
              case "wistia":
                (t.object = e('<iframe src="" frameborder="0" allowFullScreen="1"></iframe>')),
                  (t.src = "//fast.wistia.net/" + p[1] + (t.options ? "?" + t.options : "")),
                  (t.width && t.height) || ((t.width = "800"), (t.height = "480"));
                break;
              case "bcove":
                (t.object = e('<iframe src="" frameborder="0" allowFullScreen="1" width="100%"></iframe>')),
                  (t.src = "//bcove.me/" + p[1] + (t.options ? "?" + t.options : "")),
                  (t.width && t.height) || ((t.width = "640"), (t.height = "360"));
                break;
              default:
                if (((t.object = e('<img src="" alt="" style="vertical-align:bottom" />')), s.preload)) {
                  var p = document.createElement("img");
                  (p.src = t.src), g.push(p);
                }
                (t.width = i.attr("width")), (t.height = i.attr("height"));
            }
            "file:" == window.location.protocol && t.src.match(/^\/\//) && (t.src = "http:" + t.src),
              u.push(t),
              r.removeAttr("title"),
              i
                .removeAttr("href")
                .css("cursor", "pointer")
                .css("outline", 0)
                .on("click", function (e) {
                  e.preventDefault(), e.stopPropagation(), x.trigger("poptrox_open", [o]);
                });
          }
        }),
        r.prop("_poptrox", s),
        r
      );
    });
})(jQuery);
