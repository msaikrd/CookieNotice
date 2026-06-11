(function () {
    var cnArgs = {
        cache: "",
        cookieDomain: window.location.hostname,
        cookieName: "cookie_notice_accepted",
        cookieBodyText: typeof cookieNotice !== 'undefined' && typeof cookieNotice.cookieBodyText !== 'undefined' ? cookieNotice.cookieBodyText : "Utilizamos cookies para asegurar que damos la mejor experiencia al usuario en nuestro sitio web.",
        cookieButtonText: typeof cookieNotice !== 'undefined' && typeof cookieNotice.cookieButtonText !== 'undefined' ? cookieNotice.cookieButtonText : "Estoy de acuerdo",
        cookiePath: "/",
        cookieTime: "2592000",
        cookieValue: "true",
        hideEffect: typeof cookieNotice !== 'undefined' && typeof cookieNotice.hideEffect !== 'undefined' ? cookieNotice.hideEffect : "fade",
        onScroll: "no",
        cookiePosition: typeof cookieNotice !== 'undefined' && typeof cookieNotice.cookiePosition !== 'undefined' ? cookieNotice.cookiePosition : "bottom",
        onScrollOffset: "100",
        redirection: "",
        refuse: "no",
        revoke_cookies: "0",
        revoke_cookies_opt: "automatic",
        secure: "0",
        styleBackground: typeof cookieNotice !== 'undefined' && typeof cookieNotice.styleBackground !== 'undefined' ? cookieNotice.styleBackground : "rgb(255, 255, 255)",
        styleTextcolor: typeof cookieNotice !== 'undefined' && typeof cookieNotice.styleTextcolor !== 'undefined' ? cookieNotice.styleTextcolor : "#000000",
        styleButtoncolor: typeof cookieNotice !== 'undefined' && typeof cookieNotice.styleButtoncolor !== 'undefined' ? cookieNotice.styleButtoncolor : "#ffffff",
        styleButtontextcolor: typeof cookieNotice !== 'undefined' && typeof cookieNotice.styleButtontextcolor !== 'undefined' ? cookieNotice.styleButtontextcolor : "#000000"
    };

    function setCookieNoticeBodyClass(className) {
        document.body.classList.remove("cookies-revoke", "cookies-accepted", "cookies-refused", "cookies-set", "cookies-not-set");
        var classes = className.split(" ");
        for (var i = 0; i < classes.length; i++) {
            if (classes[i]) document.body.classList.add(classes[i]);
        }
    }

    function getCookieNotice() {
        var value = "; " + document.cookie;
        var parts = value.split("; " + cnArgs.cookieName + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
        return undefined;
    }

    function fadeIn(el, display) {
        el.style.opacity = 0;
        el.style.display = display || "block";
        el.style.visibility = "visible";
        var last = +new Date();
        var tick = function () {
            el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
            last = +new Date();
            if (+el.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            }
        };
        tick();
    }

    function fadeOut(el, callback) {
        el.style.opacity = 1;
        var last = +new Date();
        var tick = function () {
            el.style.opacity = +el.style.opacity - (new Date() - last) / 400;
            last = +new Date();
            if (+el.style.opacity > 0) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
            } else {
                el.style.display = "none";
                if (callback) callback();
            }
        };
        tick();
    }

    function slideDown(el, display) {
        el.style.display = display || "block";
        el.style.visibility = "visible";
        var height = el.scrollHeight;
        el.style.overflow = "hidden";
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
        el.style.transition = "all 400ms ease";
        setTimeout(function() {
            el.style.height = height + "px";
            el.style.paddingTop = "";
            el.style.paddingBottom = "";
        }, 10);
        setTimeout(function() {
            el.style.transition = "";
            el.style.height = "";
            el.style.overflow = "";
        }, 410);
    }

    function slideUp(el, callback) {
        var height = el.scrollHeight;
        el.style.overflow = "hidden";
        el.style.height = height + "px";
        el.style.transition = "all 400ms ease";
        setTimeout(function() {
            el.style.height = 0;
            el.style.paddingTop = 0;
            el.style.paddingBottom = 0;
        }, 10);
        setTimeout(function() {
            el.style.display = "none";
            el.style.transition = "";
            el.style.height = "";
            el.style.paddingTop = "";
            el.style.paddingBottom = "";
            el.style.overflow = "";
            if (callback) callback();
        }, 410);
    }

    function showCookieNotice(e) {
        document.dispatchEvent(new CustomEvent("showCookieNotice", { detail: { value: e, data: cnArgs } }));
        var notice = document.getElementById("cookie-notice");
        if (!notice) return;
        var revokeContainer = notice.querySelector(".cookie-notice-revoke-container");

        if (e === 0 || e === 2) {
            if (cnArgs.hideEffect === "fade") {
                fadeIn(notice);
            } else if (cnArgs.hideEffect === "slide") {
                slideDown(notice);
            } else {
                notice.style.visibility = "visible";
                notice.style.display = "block";
            }
        } else if (e === 1 || e === 3) {
            if (revokeContainer) {
                if (cnArgs.hideEffect === "fade") {
                    fadeOut(revokeContainer, function () { fadeIn(notice); });
                } else if (cnArgs.hideEffect === "slide") {
                    slideUp(revokeContainer, function () { slideDown(notice); });
                } else {
                    revokeContainer.style.display = "none";
                    notice.style.visibility = "visible";
                    notice.style.display = "block";
                }
            } else {
                if (cnArgs.hideEffect === "fade") fadeIn(notice);
                else if (cnArgs.hideEffect === "slide") slideDown(notice);
                else { notice.style.visibility = "visible"; notice.style.display = "block"; }
            }
        }
    }

    function hideCookieNotice(e) {
        document.dispatchEvent(new CustomEvent("hideCookieNotice", { detail: { value: e, data: cnArgs } }));
        var notice = document.getElementById("cookie-notice");
        if (!notice) return;
        var revokeContainer = notice.querySelector(".cookie-notice-revoke-container");

        if (e === 0) {
            if (cnArgs.hideEffect === "fade") fadeOut(notice);
            else if (cnArgs.hideEffect === "slide") slideUp(notice);
            else { notice.style.visibility = "hidden"; notice.style.display = "none"; }
        } else if (e === 1) {
            if (revokeContainer) {
                if (cnArgs.hideEffect === "fade") {
                    revokeContainer.style.display = "none";
                    fadeIn(revokeContainer);
                } else if (cnArgs.hideEffect === "slide") {
                    revokeContainer.style.display = "none";
                    slideDown(revokeContainer);
                } else {
                    revokeContainer.style.visibility = "visible";
                    revokeContainer.style.display = "block";
                }
            }
        } else if (e === 2) {
            if (revokeContainer) {
                if (cnArgs.hideEffect === "fade") {
                    fadeOut(notice, function () {
                        revokeContainer.style.display = "none";
                        fadeIn(revokeContainer);
                    });
                } else if (cnArgs.hideEffect === "slide") {
                    slideUp(notice, function () {
                        revokeContainer.style.display = "none";
                        slideDown(revokeContainer);
                    });
                } else {
                    notice.style.visibility = "hidden";
                    notice.style.display = "none";
                    revokeContainer.style.visibility = "visible";
                    revokeContainer.style.display = "block";
                }
            } else {
                if (cnArgs.hideEffect === "fade") fadeOut(notice);
                else if (cnArgs.hideEffect === "slide") slideUp(notice);
                else { notice.style.visibility = "hidden"; notice.style.display = "none"; }
            }
        }
    }

    function setCookieNotice(e) {
        if (cnArgs.onScroll === "yes") {
            window.removeEventListener("scroll", scrollHandler);
        }
        var i = new Date(),
            o = new Date();
        
        o.setTime(parseInt(i.getTime()) + 1e3 * parseInt(cnArgs.cookieTime));
        e = e === "accept" ? "true" : "false";
        
        var cookieString = cnArgs.cookieName + "=" + e + ";expires=" + o.toUTCString() + ";";
        if (cnArgs.cookieDomain !== undefined && cnArgs.cookieDomain !== "") cookieString += "domain=" + cnArgs.cookieDomain + ";";
        if (cnArgs.cookiePath !== undefined && cnArgs.cookiePath !== "") cookieString += "path=" + cnArgs.cookiePath + ";";
        if (cnArgs.secure === "1") cookieString += "secure;";
        
        document.cookie = cookieString;
        
        document.dispatchEvent(new CustomEvent("setCookieNotice", { detail: { value: e, time: i, expires: o } }));
        setCookieNoticeBodyClass("cookies-set " + (e === "true" ? "cookies-accepted" : "cookies-refused"));
        
        if (cnArgs.refuse === "yes" && cnArgs.revoke_cookies === "1" && cnArgs.revoke_cookies_opt === "automatic") {
            hideCookieNotice(2);
        } else {
            hideCookieNotice(0);
        }
        
        if (e && cnArgs.redirection === "1") {
            var c = window.location.protocol + "//",
                n = window.location.host + "/" + window.location.pathname;
            if (cnArgs.cache === "1") {
                c = c + n.replace("//", "/") + (window.location.search === "" ? "?" : window.location.search + "&") + "cn-reloaded=1" + window.location.hash;
                window.location.href = c;
            } else {
                c = c + n.replace("//", "/") + window.location.search + window.location.hash;
                window.location.reload(true);
            }
        }
    }

    function scrollHandler() {
        if (window.scrollY > parseInt(cnArgs.onScrollOffset)) {
            setCookieNotice("accept");
            window.removeEventListener("scroll", scrollHandler);
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        var bodyText = cnArgs.cookieBodyText;
        var buttonText = cnArgs.cookieButtonText;
        
        var customStyles = "body.cookies-accepted #cookie-notice{display:none !important;} #cookie-notice.cookie-position-bottom { position: fixed; left: 0; right: 0; text-align: center; z-index:99999999; } #cookie-notice.cookie-position-bottom {bottom: 0;} #cookie-notice.cookie-position-top {top: 0;} #cookie-notice .cookie-notice-container { display: inline-block; padding: 10px; } #cookie-notice.cookie-position-bottom .cn-set-cookie { padding: 5px 15px; margin-left: 10px; }";
        var styleEl = document.createElement('style');
        styleEl.type = "text/css";
        styleEl.innerHTML = customStyles;
        document.head.appendChild(styleEl);

        var noticeDiv = document.createElement('div');
        noticeDiv.id = "cookie-notice";
        noticeDiv.className = "cookie-position-" + cnArgs.cookiePosition;
        noticeDiv.style.backgroundColor = cnArgs.styleBackground;
        noticeDiv.style.display = "none";

        var containerDiv = document.createElement('div');
        containerDiv.className = "cookie-notice-container";

        var textSpan = document.createElement('span');
        textSpan.id = "cn-notice-text";
        textSpan.innerHTML = bodyText;
        textSpan.style.color = cnArgs.styleTextcolor;
        containerDiv.appendChild(textSpan);
        noticeDiv.appendChild(containerDiv);

        var acceptBtn = document.createElement('a');
        acceptBtn.id = "cn-accept-cookie";
        acceptBtn.className = "cn-set-cookie";
        acceptBtn.innerText = buttonText;
        acceptBtn.setAttribute('data-cookie-set', 'accept');
        acceptBtn.href = "#";
        acceptBtn.style.backgroundColor = cnArgs.styleButtoncolor;
        acceptBtn.style.color = cnArgs.styleButtontextcolor;
        noticeDiv.appendChild(acceptBtn);

        document.body.appendChild(noticeDiv);

        var c = getCookieNotice();

        document.addEventListener("click", function (e) {
            if (e.target.closest('.cn-set-cookie')) {
                e.preventDefault();
                setCookieNotice(e.target.closest('.cn-set-cookie').getAttribute("data-cookie-set"));
            }
            if (e.target.closest('.cn-revoke-cookie')) {
                e.preventDefault();
                if (cnArgs.refuse === "yes") {
                    var el = e.target.closest('.cn-revoke-cookie');
                    if (cnArgs.onScroll === "yes") {
                        window.addEventListener("scroll", scrollHandler);
                    }
                    if (cnArgs.revoke_cookies === "1") {
                        if (el.classList.contains("cn-revoke-inline")) {
                            if (!document.body.classList.contains("cookies-revoke") && !document.body.classList.contains("cookies-not-set")) {
                                if (cnArgs.revoke_cookies_opt === "automatic") showCookieNotice(3);
                                else showCookieNotice(2);
                            }
                        } else {
                            showCookieNotice(1);
                        }
                        c = getCookieNotice();
                        setCookieNoticeBodyClass("cookies-set cookies-revoke " + (c === "true" ? "cookies-accepted" : "cookies-refused"));
                    }
                }
            }
        });

        if (c === undefined) {
            if (cnArgs.onScroll === "yes") window.addEventListener("scroll", scrollHandler);
            showCookieNotice(0);
            setCookieNoticeBodyClass("cookies-not-set");
        } else if (cnArgs.refuse === "yes") {
            if (cnArgs.revoke_cookies === "1" && cnArgs.revoke_cookies_opt === "automatic") {
                hideCookieNotice(1);
            }
            setCookieNoticeBodyClass("cookies-set " + (c === "true" ? "cookies-accepted" : "cookies-refused"));
        } else {
            setCookieNoticeBodyClass("cookies-set " + (c === "true" ? "cookies-accepted" : "cookies-refused"));
        }
    });

})();