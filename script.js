
document.addEventListener('DOMContentLoaded', function () {


    /* ======================================
       1. ELEMENT
    ====================================== */

    const menuButton = document.querySelector('.menu-toggle');

    const navbar = document.querySelector('.navbar');

    const navLinks = document.querySelectorAll('.nav-link');

    const sections = document.querySelectorAll('main > .page');


    /* ======================================
       2. MEMASANG BACKGROUND KE 7 SLIDE
    ====================================== */

    document.querySelectorAll('.background-page').forEach(function (section) {

        const imagePath = section.getAttribute('data-background');

        if (!imagePath) return;

        section.style.setProperty(
            '--page-background',
            `url("${imagePath}")`
        );


        // Memeriksa gambar

        const image = new Image();

        image.onload = function () {

            console.log('Gambar berhasil dimuat:', imagePath);

        };

        image.onerror = function () {

            console.error('Gambar tidak ditemukan:', imagePath);

        };

        image.src = imagePath;

    });


    /* ======================================
       3. HAMBURGER MENU
    ====================================== */

    if (menuButton && navbar) {

        menuButton.addEventListener('click', function () {

            const isOpen = navbar.classList.toggle('is-open');

            menuButton.setAttribute(
                'aria-expanded',
                isOpen ? 'true' : 'false'
            );

            menuButton.setAttribute(
                'aria-label',
                isOpen ? 'Tutup menu' : 'Buka menu'
            );

        });


        // Tutup menu setelah link diklik

        navLinks.forEach(function (link) {

            link.addEventListener('click', function () {

                navbar.classList.remove('is-open');

                menuButton.setAttribute('aria-expanded', 'false');

                menuButton.setAttribute('aria-label', 'Buka menu');

            });

        });


        // Tutup menu saat kembali ke desktop

        window.addEventListener('resize', function () {

            if (window.innerWidth > 700) {

                navbar.classList.remove('is-open');

                menuButton.setAttribute('aria-expanded', 'false');

            }

        });

    }


    /* ======================================
       4. NAVIGASI KE BAGIAN SLIDE
    ====================================== */

    navLinks.forEach(function (link) {

        link.addEventListener('click', function (event) {

            const targetId = link.getAttribute('href');

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            history.replaceState(null, '', targetId);

        });

    });


    /* ======================================
       5. NAVBAR AKTIF SESUAI SLIDE
    ====================================== */

    if ('IntersectionObserver' in window) {

        const observer = new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) return;

                    let currentId = entry.target.id;


                    // ABOUT BOTTOM menggunakan menu ABOUT

                    if (currentId === 'about-bottom') {

                        currentId = 'about';

                    }


                    // PROJECT 2 menggunakan menu PROJECT

                    if (currentId === 'project2') {

                        currentId = 'project1';

                    }


                    // CONTACT 2 menggunakan menu CONTACT

                    if (currentId === 'contact2') {

                        currentId = 'contact1';

                    }


                    navLinks.forEach(function (link) {

                        const isActive =
                            link.getAttribute('href') === '#' + currentId;

                        link.classList.toggle('active', isActive);

                    });

                });

            },

            {
                threshold: 0.5
            }

        );


        sections.forEach(function (section) {

            observer.observe(section);

        });

    }

});

    /* ==============================
        6. ABOUT PHOTO CAROUSEL
    ============================== */

    document.addEventListener("DOMContentLoaded", function () {

    const aboutSlide = document.getElementById("aboutSlide");
    const aboutPrev = document.getElementById("aboutPrev");
    const aboutNext = document.getElementById("aboutNext");
    const aboutCounter = document.getElementById("aboutCounter");

    const photos = [
        "assets/dokumentasi/Foto1.png",
        "assets/dokumentasi/Foto2.png",
        "assets/dokumentasi/Foto3.png",
        "assets/dokumentasi/Foto4.png"
    ];

    let currentPhoto = 0;

    function showPhoto(index) {

        currentPhoto = (index + photos.length) % photos.length;

        aboutSlide.src = photos[currentPhoto];

        aboutCounter.textContent =
            (currentPhoto + 1) + " / " + photos.length;
    }

    // Tombol foto sebelumnya
    aboutPrev.addEventListener("click", function () {
        showPhoto(currentPhoto - 1);
    });

    // Tombol foto berikutnya
    aboutNext.addEventListener("click", function () {
        showPhoto(currentPhoto + 1);
    });

});