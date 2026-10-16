document.addEventListener("DOMContentLoaded", () => {

    const hotspots = document.querySelectorAll(".product-hotspot");

    if (!hotspots.length) {
        return;
    }


    /* =====================================================
       HOTSPOT CLICK
    ===================================================== */

    hotspots.forEach((hotspot) => {

        hotspot.addEventListener("click", (event) => {

            event.stopPropagation();

            /*
             * If this hotspot is already active,
             * clicking it again will close it.
             */
            const isActive = hotspot.classList.contains("is-active");


            // Close all hotspots first
            hotspots.forEach((item) => {
                item.classList.remove("is-active");
            });


            // Re-open the clicked hotspot if it wasn't active
            if (!isActive) {
                hotspot.classList.add("is-active");
            }

        });

    });


    /* =====================================================
       CLICK OUTSIDE
    ===================================================== */

    document.addEventListener("click", () => {

        hotspots.forEach((hotspot) => {
            hotspot.classList.remove("is-active");
        });

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            hotspots.forEach((hotspot) => {
                hotspot.classList.remove("is-active");
            });

        }

    });

});