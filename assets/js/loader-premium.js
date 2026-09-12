(function() {
    const leaf = document.querySelector("#pxl-loadding .leaf-wrap");
    const shine = document.querySelector("#pxl-loadding .shine");
    const foams = gsap.utils.toArray("#pxl-loadding .foam");
    const logo = document.querySelector("#pxl-loadding .logo-svg");

    if (!leaf || !shine) return;

    let logoTween;
    if (logo) {
        logoTween = gsap.to(logo, {
            y: -8,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    const tl = gsap.timeline({
        repeat: -1,
        defaults: {
            ease: "power2.inOut"
        }
    });

    gsap.set(leaf, {
        x: -210,
        y: 55,
        rotate: -18
    });

    gsap.set(shine, {
        x: -215,
        y: 55,
        rotate: -18,
        opacity: 0
    });

    tl
        .to(leaf, {
            x: 210,
            y: -55,
            rotate: -18,
            duration: 1.15
        }, 0)

        .to(shine, {
            x: 210,
            y: -55,
            opacity: 1,
            duration: 1.05
        }, 0.05)

        .to(leaf, {
            scaleX: 1.16,
            scaleY: .86,
            duration: .16,
            ease: "power1.out"
        }, .98)

        .to(leaf, {
            scaleX: 1,
            scaleY: 1,
            duration: .2,
            ease: "elastic.out(1, .45)"
        }, 1.13)

        .to(foams, {
            opacity: 1,
            x: -24,
            y: -18,
            scale: 1,
            stagger: .04,
            duration: .35
        }, .3)

        .to(foams, {
            opacity: 0,
            x: -42,
            y: -46,
            scale: .55,
            stagger: .04,
            duration: .5
        }, .78)

        .to(shine, {
            opacity: 0,
            duration: .35
        }, .95)

        .to({}, {
            duration: .22
        })

        .to(leaf, {
            x: -210,
            y: 55,
            rotate: -18,
            duration: 1.05
        })

        .to(leaf, {
            scaleX: 1.12,
            scaleY: .9,
            duration: .14
        }, "-=.12")

        .to(leaf, {
            scaleX: 1,
            scaleY: 1,
            duration: .22,
            ease: "elastic.out(1, .45)"
        });

    const killAnimations = () => {
        setTimeout(function() {
            if (logoTween) logoTween.kill();
            tl.kill();
        }, 1000);
    };

    if (document.readyState === "complete") {
        killAnimations();
    } else {
        window.addEventListener("load", killAnimations);
    }
})();
