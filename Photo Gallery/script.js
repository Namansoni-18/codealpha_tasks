/* =====================================
   PHOTO GALLERY JAVASCRIPT
===================================== */


/* =====================================
   PHOTO AND VIDEO DATA
===================================== */

const mediaData = [

    {
        id: 1,
        title: "Mountain Lake",
        type: "image",
        category: "nature",
        src: "https://picsum.photos/id/10/900/650",
        private: false
    },

    {
        id: 2,
        title: "Beautiful Forest",
        type: "image",
        category: "nature",
        src: "https://picsum.photos/id/11/900/650",
        private: false
    },

    {
        id: 3,
        title: "City Building",
        type: "image",
        category: "city",
        src: "https://picsum.photos/id/16/900/650",
        private: false
    },

    {
        id: 4,
        title: "City Street",
        type: "image",
        category: "city",
        src: "https://picsum.photos/id/20/900/650",
        private: false
    },

    {
        id: 5,
        title: "Nature View",
        type: "image",
        category: "nature",
        src: "https://picsum.photos/id/28/900/650",
        private: false
    },

    {
        id: 6,
        title: "Beach",
        type: "image",
        category: "nature",
        src: "https://picsum.photos/id/29/900/650",
        private: false
    },

    {
        id: 7,
        title: "Architecture",
        type: "image",
        category: "city",
        src: "https://picsum.photos/id/42/900/650",
        private: false
    },

    {
        id: 8,
        title: "Road Trip",
        type: "image",
        category: "city",
        src: "https://picsum.photos/id/45/900/650",
        private: false
    },

    {
        id: 9,
        title: "Green Mountains",
        type: "image",
        category: "nature",
        src: "https://picsum.photos/id/47/900/650",
        private: false
    },

    {
        id: 10,
        title: "Lake View",
        type: "image",
        category: "nature",
        src: "https://picsum.photos/id/58/900/650",
        private: false
    },

    {
        id: 11,
        title: "Urban Life",
        type: "image",
        category: "city",
        src: "https://picsum.photos/id/60/900/650",
        private: false
    },

    {
        id: 12,
        title: "Forest Road",
        type: "image",
        category: "nature",
        src: "https://picsum.photos/id/72/900/650",
        private: false
    },

    {
        id: 13,
        title: "People",
        type: "image",
        category: "people",
        src: "https://picsum.photos/id/91/900/650",
        private: false
    },

    {
        id: 14,
        title: "Friends",
        type: "image",
        category: "people",
        src: "https://picsum.photos/id/1005/900/650",
        private: false
    },

    {
        id: 15,
        title: "City Night",
        type: "image",
        category: "city",
        src: "https://picsum.photos/id/1011/900/650",
        private: false
    },

    {
        id: 16,
        title: "Mountain",
        type: "image",
        category: "nature",
        src: "https://picsum.photos/id/1015/900/650",
        private: false
    },

    {
        id: 17,
        title: "Private Photo 1",
        type: "image",
        category: "people",
        src: "https://picsum.photos/id/1027/900/650",
        private: true
    },

    {
        id: 18,
        title: "Private Photo 2",
        type: "image",
        category: "people",
        src: "https://picsum.photos/id/1000/900/650",
        private: true
    },

    {
        id: 19,
        title: "Private Photo 3",
        type: "image",
        category: "nature",
        src: "https://picsum.photos/id/1018/900/650",
        private: true
    },

    {
        id: 20,
        title: "Flower Video",
        type: "video",
        category: "videos",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        private: false
    },

    {
        id: 21,
        title: "Sample Video",
        type: "video",
        category: "videos",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
        private: false
    },

    {
        id: 22,
        title: "Private Video",
        type: "video",
        category: "videos",
        src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        private: true
    }

];


/* =====================================
   GET HTML ELEMENTS
===================================== */

const gallery = document.getElementById("gallery");

const searchInput = document.getElementById("searchInput");

const sortSelect = document.getElementById("sortSelect");

const photoCount = document.getElementById("photoCount");

const pageTitle = document.getElementById("pageTitle");

const emptyMessage = document.getElementById("emptyMessage");

const filterButtons =
    document.querySelectorAll(".filter-btn");


/* =====================================
   LIGHTBOX ELEMENTS
===================================== */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxVideo =
    document.getElementById("lightboxVideo");

const lightboxVideoSource =
    document.getElementById("lightboxVideoSource");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCounter =
    document.getElementById("lightboxCounter");

const closeLightbox =
    document.getElementById("closeLightbox");

const previousButton =
    document.getElementById("previousButton");

const nextButton =
    document.getElementById("nextButton");


/* =====================================
   PASSWORD ELEMENTS
===================================== */

const passwordModal =
    document.getElementById("passwordModal");

const privatePassword =
    document.getElementById("privatePassword");

const passwordError =
    document.getElementById("passwordError");

const unlockPassword =
    document.getElementById("unlockPassword");

const cancelPassword =
    document.getElementById("cancelPassword");


/* =====================================
   VARIABLES
===================================== */

let currentCategory = "all";

let currentItems = [];

let currentLightboxIndex = 0;

let privateUnlocked = false;


/* =====================================
   LOCAL STORAGE
===================================== */

let deletedItems =
    JSON.parse(
        localStorage.getItem("deletedItems")
    ) || [];

let favoriteItems =
    JSON.parse(
        localStorage.getItem("favoriteItems")
    ) || [];


/* =====================================
   SAVE DATA
===================================== */

function saveData() {

    localStorage.setItem(
        "deletedItems",
        JSON.stringify(deletedItems)
    );

    localStorage.setItem(
        "favoriteItems",
        JSON.stringify(favoriteItems)
    );
}


/* =====================================
   CHECK IF DELETED
===================================== */

function isDeleted(id) {

    return deletedItems.includes(id);

}


/* =====================================
   CHECK IF FAVORITE
===================================== */

function isFavorite(id) {

    return favoriteItems.includes(id);

}


/* =====================================
   RENDER GALLERY
===================================== */

function renderGallery() {

    gallery.innerHTML = "";

    let items = [];


    /* ---------------------------------
       NORMAL CATEGORIES
    --------------------------------- */

    if (currentCategory === "deleted") {

        items = mediaData.filter(function (item) {

            return isDeleted(item.id);

        });

    }

    else if (currentCategory === "private") {

        items = mediaData.filter(function (item) {

            return (
                item.private === true &&
                !isDeleted(item.id)
            );

        });

    }

    else if (currentCategory === "favorites") {

        items = mediaData.filter(function (item) {

            return (
                isFavorite(item.id) &&
                !isDeleted(item.id) &&
                !item.private
            );

        });

    }

    else if (currentCategory === "videos") {

        items = mediaData.filter(function (item) {

            return (
                item.type === "video" &&
                !isDeleted(item.id) &&
                !item.private
            );

        });

    }

    else if (currentCategory === "all") {

        items = mediaData.filter(function (item) {

            return (
                !isDeleted(item.id) &&
                !item.private
            );

        });

    }

    else {

        items = mediaData.filter(function (item) {

            return (
                item.category === currentCategory &&
                !isDeleted(item.id) &&
                !item.private
            );

        });

    }


    /* ---------------------------------
       SEARCH
    --------------------------------- */

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    if (searchText !== "") {

        items = items.filter(function (item) {

            return item.title
                .toLowerCase()
                .includes(searchText);

        });

    }


    /* ---------------------------------
       SORT
    --------------------------------- */

    const sortValue =
        sortSelect.value;


    if (sortValue === "name") {

        items.sort(function (a, b) {

            return a.title.localeCompare(
                b.title
            );

        });

    }


    if (sortValue === "type") {

        items.sort(function (a, b) {

            return a.type.localeCompare(
                b.type
            );

        });

    }


    currentItems = items;


    /* ---------------------------------
       COUNT
    --------------------------------- */

    photoCount.textContent =
        items.length +
        (items.length === 1 ? " item" : " items");


    /* ---------------------------------
       EMPTY MESSAGE
    --------------------------------- */

    if (items.length === 0) {

        emptyMessage.classList.add("show");

    }

    else {

        emptyMessage.classList.remove("show");

    }


    /* ---------------------------------
       CREATE CARDS
    --------------------------------- */

    items.forEach(function (item, index) {

        createCard(item, index);

    });

}


/* =====================================
   CREATE CARD
===================================== */

function createCard(item, index) {

    const card =
        document.createElement("div");

    card.className = "gallery-card";


    if (currentCategory === "deleted") {

        card.classList.add("deleted-card");

    }


    /* ---------------------------------
       MEDIA
    --------------------------------- */

    let media;


    if (item.type === "video") {

        media =
            document.createElement("video");

        media.src = item.src;

        media.muted = true;

        media.preload = "metadata";

        media.className = "gallery-media";

    }

    else {

        media =
            document.createElement("img");

        media.src = item.src;

        media.alt = item.title;

        media.className = "gallery-media";

    }


    media.addEventListener(
        "click",
        function () {

            if (
                currentCategory !== "deleted"
            ) {

                openLightbox(index);

            }

        }
    );


    card.appendChild(media);


    /* ---------------------------------
       VIDEO BADGE
    --------------------------------- */

    if (item.type === "video") {

        const badge =
            document.createElement("div");

        badge.className = "video-badge";

        badge.textContent = "▶ VIDEO";

        card.appendChild(badge);

    }


    /* ---------------------------------
       TOP BUTTONS
    --------------------------------- */

    if (currentCategory !== "deleted") {

        const buttons =
            document.createElement("div");

        buttons.className = "card-buttons";


        /* FAVORITE */

        const favoriteButton =
            document.createElement("button");

        favoriteButton.className =
            "card-button favorite-button";

        favoriteButton.innerHTML =
            isFavorite(item.id)
                ? "❤️"
                : "♡";


        if (isFavorite(item.id)) {

            favoriteButton.classList.add(
                "active"
            );

        }


        favoriteButton.title =
            "Add to Favorites";


        favoriteButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                toggleFavorite(item.id);

            }
        );


        buttons.appendChild(
            favoriteButton
        );


        /* DELETE */

        const deleteButton =
            document.createElement("button");

        deleteButton.className =
            "card-button";

        deleteButton.innerHTML = "🗑️";

        deleteButton.title =
            "Move to Recently Deleted";


        deleteButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                deleteItem(item.id);

            }
        );


        buttons.appendChild(
            deleteButton
        );


        card.appendChild(buttons);

    }


    /* ---------------------------------
       CARD INFO
    --------------------------------- */

    const info =
        document.createElement("div");

    info.className = "card-info";


    const titleArea =
        document.createElement("div");


    const title =
        document.createElement("div");

    title.className = "card-title";

    title.textContent =
        item.title;


    const type =
        document.createElement("div");

    type.className = "card-type";

    type.textContent =
        item.type === "video"
            ? "Video"
            : "Photo";


    titleArea.appendChild(title);

    titleArea.appendChild(type);

    info.appendChild(titleArea);


    card.appendChild(info);


    /* ---------------------------------
       DELETED BUTTONS
    --------------------------------- */

    if (currentCategory === "deleted") {

        const deletedActions =
            document.createElement("div");

        deletedActions.className =
            "deleted-actions";


        const restoreButton =
            document.createElement("button");

        restoreButton.className =
            "restore-button";

        restoreButton.textContent =
            "↩ Restore";


        restoreButton.addEventListener(
            "click",
            function () {

                restoreItem(item.id);

            }
        );


        const permanentButton =
            document.createElement("button");

        permanentButton.className =
            "permanent-delete-button";

        permanentButton.textContent =
            "Delete Forever";


        permanentButton.addEventListener(
            "click",
            function () {

                permanentDelete(item.id);

            }
        );


        deletedActions.appendChild(
            restoreButton
        );

        deletedActions.appendChild(
            permanentButton
        );


        card.appendChild(
            deletedActions
        );

    }


    gallery.appendChild(card);

}


/* =====================================
   FAVORITE
===================================== */

function toggleFavorite(id) {

    if (isFavorite(id)) {

        favoriteItems =
            favoriteItems.filter(
                function (itemId) {

                    return itemId !== id;

                }
            );

    }

    else {

        favoriteItems.push(id);

    }

    saveData();

    renderGallery();

}


/* =====================================
   DELETE
===================================== */

function deleteItem(id) {

    if (!deletedItems.includes(id)) {

        deletedItems.push(id);

    }

    saveData();

    renderGallery();

}


/* =====================================
   RESTORE
===================================== */

function restoreItem(id) {

    deletedItems =
        deletedItems.filter(
            function (itemId) {

                return itemId !== id;

            }
        );

    saveData();

    renderGallery();

}


/* =====================================
   PERMANENT DELETE
===================================== */

function permanentDelete(id) {

    const answer =
        confirm(
            "Are you sure you want to permanently delete this item?"
        );


    if (!answer) {

        return;

    }


    deletedItems =
        deletedItems.filter(
            function (itemId) {

                return itemId !== id;

            }
        );


    favoriteItems =
        favoriteItems.filter(
            function (itemId) {

                return itemId !== id;

            }
        );


    saveData();

    renderGallery();

}


/* =====================================
   FILTER BUTTONS
===================================== */

filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const category =
                    button.dataset.category;


                /* PRIVATE FOLDER */

                if (category === "private") {

                    if (!privateUnlocked) {

                        openPasswordModal();

                        return;

                    }

                }


                currentCategory =
                    category;


                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                updatePageTitle();

                renderGallery();

            }
        );

    }
);


/* =====================================
   PAGE TITLE
===================================== */

function updatePageTitle() {

    const titles = {

        all: "All Photos",

        favorites: "Favorites",

        videos: "Videos",

        nature: "Nature",

        city: "City",

        people: "People",

        private: "Private Folder",

        deleted: "Recently Deleted"

    };


    pageTitle.textContent =
        titles[currentCategory] ||
        "Photo Gallery";

}


/* =====================================
   SEARCH
===================================== */

searchInput.addEventListener(
    "input",
    function () {

        renderGallery();

    }
);


/* =====================================
   SORT
===================================== */

sortSelect.addEventListener(
    "change",
    function () {

        renderGallery();

    }
);


/* =====================================
   LIGHTBOX
===================================== */

function openLightbox(index) {

    currentLightboxIndex = index;

    showLightboxItem();

    lightbox.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


/* =====================================
   SHOW LIGHTBOX ITEM
===================================== */

function showLightboxItem() {

    const item =
        currentItems[currentLightboxIndex];


    if (!item) {

        return;

    }


    lightboxTitle.textContent =
        item.title;


    lightboxCounter.textContent =
        (currentLightboxIndex + 1) +
        " / " +
        currentItems.length;


    /* ---------------------------------
       IMAGE
    --------------------------------- */

    if (item.type === "image") {

        lightboxImage.src =
            item.src;

        lightboxImage.style.display =
            "block";

        lightboxVideo.style.display =
            "none";

        lightboxVideo.pause();

    }


    /* ---------------------------------
       VIDEO
    --------------------------------- */

    else {

        lightboxImage.style.display =
            "none";

        lightboxVideo.style.display =
            "block";

        lightboxVideoSource.src =
            item.src;

        lightboxVideo.load();

    }

}


/* =====================================
   CLOSE LIGHTBOX
===================================== */

function closeLightboxFunction() {

    lightbox.classList.remove(
        "show"
    );

    lightboxVideo.pause();

    lightboxVideoSource.src = "";

    document.body.style.overflow =
        "auto";

}


closeLightbox.addEventListener(
    "click",
    closeLightboxFunction
);


/* =====================================
   PREVIOUS
===================================== */

previousButton.addEventListener(
    "click",
    function () {

        if (currentItems.length === 0) {

            return;

        }


        currentLightboxIndex--;


        if (currentLightboxIndex < 0) {

            currentLightboxIndex =
                currentItems.length - 1;

        }


        showLightboxItem();

    }
);


/* =====================================
   NEXT
===================================== */

nextButton.addEventListener(
    "click",
    function () {

        if (currentItems.length === 0) {

            return;

        }


        currentLightboxIndex++;


        if (
            currentLightboxIndex >=
            currentItems.length
        ) {

            currentLightboxIndex = 0;

        }


        showLightboxItem();

    }
);


/* =====================================
   CLICK OUTSIDE LIGHTBOX
===================================== */

lightbox.addEventListener(
    "click",
    function (event) {

        if (
            event.target === lightbox
        ) {

            closeLightboxFunction();

        }

    }
);


/* =====================================
   KEYBOARD CONTROLS
===================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            !lightbox.classList.contains(
                "show"
            )
        ) {

            return;

        }


        if (event.key === "Escape") {

            closeLightboxFunction();

        }


        if (event.key === "ArrowRight") {

            nextButton.click();

        }


        if (event.key === "ArrowLeft") {

            previousButton.click();

        }

    }
);


/* =====================================
   PRIVATE PASSWORD
===================================== */

function openPasswordModal() {

    passwordModal.classList.add(
        "show"
    );

    privatePassword.value = "";

    passwordError.classList.remove(
        "show"
    );

    setTimeout(
        function () {

            privatePassword.focus();

        },
        100
    );

}


/* =====================================
   UNLOCK PRIVATE FOLDER
===================================== */

unlockPassword.addEventListener(
    "click",
    function () {

        const password =
            privatePassword.value;


        if (password === "1234") {

            privateUnlocked = true;

            passwordModal.classList.remove(
                "show"
            );


            currentCategory =
                "private";


            filterButtons.forEach(
                function (button) {

                    button.classList.remove(
                        "active"
                    );


                    if (
                        button.dataset.category ===
                        "private"
                    ) {

                        button.classList.add(
                            "active"
                        );

                    }

                }
            );


            updatePageTitle();

            renderGallery();

        }

        else {

            passwordError.classList.add(
                "show"
            );

        }

    }
);


/* =====================================
   PASSWORD ENTER KEY
===================================== */

privatePassword.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            unlockPassword.click();

        }

    }
);


/* =====================================
   CANCEL PASSWORD
===================================== */

cancelPassword.addEventListener(
    "click",
    function () {

        passwordModal.classList.remove(
            "show"
        );

    }
);


/* =====================================
   PRIVATE HEADER BUTTON
===================================== */

const privateHeaderButton =
    document.getElementById(
        "privateHeaderButton"
    );


privateHeaderButton.addEventListener(
    "click",
    function () {

        if (!privateUnlocked) {

            openPasswordModal();

        }

        else {

            currentCategory =
                "private";


            filterButtons.forEach(
                function (button) {

                    button.classList.remove(
                        "active"
                    );


                    if (
                        button.dataset.category ===
                        "private"
                    ) {

                        button.classList.add(
                            "active"
                        );

                    }

                }
            );


            updatePageTitle();

            renderGallery();

        }

    }
);


/* =====================================
   THEME BUTTON
===================================== */

const themeButton =
    document.getElementById(
        "themeButton"
    );


let lightMode =
    localStorage.getItem(
        "lightMode"
    ) === "true";


function updateTheme() {

    if (lightMode) {

        document.body.classList.add(
            "light-mode"
        );

        themeButton.textContent =
            "☀️";

    }

    else {

        document.body.classList.remove(
            "light-mode"
        );

        themeButton.textContent =
            "🌙";

    }

}


themeButton.addEventListener(
    "click",
    function () {

        lightMode = !lightMode;

        localStorage.setItem(
            "lightMode",
            lightMode
        );

        updateTheme();

    }
);


/* =====================================
   INITIAL LOAD
===================================== */

updateTheme();

updatePageTitle();

renderGallery();