var responsive;
var isMenuOut;
//---------------------------------
window.onload = function () {
    document.body.removeChild(document.getElementById("loading"));
    document.body.style.overflowY = "visible";
    //---------------------------------
    setVars();
    setResponsive();
    setResize();
    setMenu();
    setPanel();
    setAboutBar();
    emitParticles();
    setAnimations();
};
//---------------------------------
function setVars() {
    isMenuOut = true;
}

function setResponsive() {
    var width = $(window).width();
    if (width < 768) {
        responsive = "small";
    } else {
        responsive = "wide";
    }
}

function setResize() {
    $(window).resize(function () {
        setResponsive();
        //---------------------------------
        if (responsive == "wide") {
            $(".aboutHeader").css({
                "top": "25px"
            });
            initAboutBar();
            $(".aboutBar").css({
                "visibility": "visible",
                "opacity": "1"
            });
            //---------------------------------
            if ($(window).scrollTop() > 100) {
                $(".menu").animate({
                    right: "30px"
                }, 500, "swing");
            } else {
                $(".menu").animate({
                    right: "-80px"
                }, 500, "swing");
            }
        } else {
            $(".aboutBar").css({
                "visibility": "hidden"
            });
            //---------------------------------
            $(".menu").animate({
                right: "30px"
            }, 500, "swing");
        }
    });
}

function setMenu() {
    if (responsive == "wide") {
        if ($(window).scrollTop() > 100) {
            $(".menu").css({
                "right": "30px"
            });
        }
    }
    //---------------------------------
    $(window).scroll(function () {
        if (responsive == "wide") {
            if ($(window).scrollTop() > 100) {
                if (isMenuOut) {
                    $(".menu").animate({
                        right: "30px"
                    }, 500, "swing");
                    isMenuOut = false;
                }
            } else {
                if (!isMenuOut) {
                    $(".menu").animate({
                        right: "-80px"
                    }, 500, "swing");
                    isMenuOut = true;
                }
            }
        }
    });
    //---------------------------------
    $(".menu").click(function () {
        $(".panel").css({
            "visibility": "visible",
            "opacity": "1"
        });
        //---------------------------------
        if (responsive == "wide") $(".panelHeader").css({
            "top": "100px"
        });
        else $(".panelHeader").css({
            "top": "50px"
        });
    });
}

function setPanel() {
    $(".panelClose").click(function () {
        hidePanel();
    });
}

function hidePanel(dest) {
    $(".panel").css({
        "opacity": "0"
    });
    setTimeout(function () {
        $(".panel").css({
            "visibility": "hidden"
        });
    }, 500);
    //---------------------------------
    $(".panelHeader").css({
        "top": "-100px"
    });
    //---------------------------------
    if (dest) scrollingTo(dest);
}

function scrollingTo(dest) {
    $('body, html').animate({
        scrollTop: $(dest).offset().top
    }, 1000);
}

function setAboutBar() {
    $('.aboutHeader a').each(function (i, item) {
        $(item).on("mouseover", function (event) {
            var target = $(event.target.parentElement);
            $(".aboutBar").css({
                "top": (target.offset().top + (target.height() / 1.3)) + "px",
                "left": (target.offset().left + (target.width() / 4)) + "px",
                "transition-delay": "0s"
            });
        });
        //---------------------------------
        $(item).on("mouseout", function (event) {
            initAboutBar();
            $(".aboutBar").css({
                "transition-delay": "0.25s"
            });
        });
    });
}

function initAboutBar() {
    var target = $(".aboutHeader li:first-child");
    $(".aboutBar").css({
        "top": (target.offset().top + (target.height() / 1.3)) + "px",
        "left": (target.offset().left + (target.width() / 4)) + "px"
    });
}

function constrain(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    else return value;
}

function emitParticles() {
    particlesJS.load('particles-js', 'assets/particlesjs-config.json');
}

function setAnimations() {
    var animSpeed = 500;
    var totalDelay = 0;
    //---------------------------------
    if (responsive == "wide") {
        $(".aboutHeader").animate({
            top: "25px"
        }, animSpeed, "swing", function () {
            initAboutBar();
            $(".aboutBar").css({
                "visibility": "visible"
            });
            $(".aboutBar").animate({
                opacity: "1"
            }, animSpeed);
        });
        totalDelay += animSpeed * 2;
    } else {
        $(".menu").animate({
            right: "30px"
        }, animSpeed);
        totalDelay += animSpeed;
    }
    //---------------------------------
    setTimeout(function () {
        let fr = "Hello, my name is"
        if (qs && qs.lang == 'pt'){
            fr = "Olá, me chamo"
        }
        $(".aboutHello").typed({
            strings: [fr],
            typeSpeed: 0
        });
    }, totalDelay);
    totalDelay += animSpeed * 2;
    //---------------------------------
    setTimeout(function () {
        $(".aboutTitle").typed({
            strings: ["Gabriel Tavares"],
            typeSpeed: 0
        });
    }, totalDelay);
    totalDelay += animSpeed * 2.25;
    //---------------------------------
    $(".titleSplash").delay(totalDelay).animate({
        opacity: "1"
    }, animSpeed);
    totalDelay += animSpeed * 1.5;
    //---------------------------------
    $(".aboutInfo p").delay(totalDelay).animate({
        opacity: "1"
    }, animSpeed);
    totalDelay += animSpeed;
    //---------------------------------
    setTimeout(function () {
        $(".aboutPic").css({
            "transform": "scale(1, 1)"
        });
    }, totalDelay);
    totalDelay += animSpeed;
    //---------------------------------
    $(".socialButtons img").delay(totalDelay).animate({
        opacity: "1"
    }, animSpeed);
    totalDelay += animSpeed;
    //---------------------------------
    setTimeout(function () {
        $("#particles-js").css({
            "transform": "scale(1, 1)"
        });
    }, totalDelay);
    //---------------------------------
    if ($(window).width() > 768) {
        $(".skillsHeader").waypoint(function () {
            $(".skillsHeader").addClass("animated");
            $(".skillsHeader").addClass("fadeIn");
        }, {
            offset: '100%'
        });
        //---------------------------------
        $(".skillsBorder").each(function (i, item) {
            $(item).waypoint(function () {
                $(item).addClass("animated");
                if (responsive == "wide") {
                    $(item).addClass("zoomIn");
                } else {
                    if (i % 2 == 0) $(item).addClass("fadeInRight");
                    else $(item).addClass("fadeInLeft");
                }
            }, {
                offset: '100%'
            });
        });
        //---------------------------------
        $(".workHeader").waypoint(function () {
            $(".workHeader").addClass("animated");
            $(".workHeader").addClass("fadeIn");
        }, {
            offset: '100%'
        });
        //---------------------------------
        $(".workBorder").each(function (i, item) {
            $(item).waypoint(function () {
                $(item).addClass("animated");
                if (i % 2 == 0) $(item).addClass("fadeInLeft");
                else $(item).addClass("fadeInRight");
            }, {
                offset: '100%'
            });
        });
        //---------------------------------
        $(".contactHeader").waypoint(function () {
            $(".contactHeader").addClass("animated");
            $(".contactHeader").addClass("fadeIn");
        }, {
            offset: '100%'
        });
        //---------------------------------
        $('.contactContent [class*="col-xs-12"]').each(function (i, item) {
            $(item).waypoint(function () {
                $(item).addClass("animated");
                $(item).addClass("bounce");
            }, {
                offset: '100%'
            });
        });
    }
}
var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));