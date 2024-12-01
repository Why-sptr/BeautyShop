// Range Slider dengan Label
const rangeSlider = document.getElementById("range-slider");
const sliderLabel = document.getElementById("slider-value");

// Fungsi untuk memperbarui nilai dan posisi label
if (rangeSlider && sliderLabel) {
    rangeSlider.addEventListener("input", () => {
        const sliderValue = rangeSlider.value;
        const sliderWidth = rangeSlider.offsetWidth;
        const thumbWidth = 20;
        const min = rangeSlider.min;
        const max = rangeSlider.max;

        sliderLabel.textContent = formatNumber(sliderValue);

        const percentage = (sliderValue - min) / (max - min);
        const labelPosition =
            percentage * (sliderWidth - thumbWidth) + thumbWidth / 2;

        sliderLabel.style.left = `${labelPosition}px`;
    });
}

function formatNumber(value) {
    return Number(value).toLocaleString();
}

// Scrollable Container Drag
const scrollableContainer = document.querySelector(".scrollable-container");
let isDragging = false;
let startX;
let scrollLeft;

if (scrollableContainer) {
    scrollableContainer.addEventListener("mousedown", (e) => {
        isDragging = true;
        scrollableContainer.classList.add("active");
        startX = e.pageX - scrollableContainer.offsetLeft;
        scrollLeft = scrollableContainer.scrollLeft;
    });

    scrollableContainer.addEventListener("mouseleave", () => {
        isDragging = false;
        scrollableContainer.classList.remove("active");
    });

    scrollableContainer.addEventListener("mouseup", () => {
        isDragging = false;
        scrollableContainer.classList.remove("active");
    });

    scrollableContainer.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollableContainer.offsetLeft;
        const walk = (x - startX) * 1;
        scrollableContainer.scrollLeft = scrollLeft - walk;
    });
}

// Add Cart Notifications
localStorage.removeItem("cartItemCount");
let cartItemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;

function updateCartBadge() {
    const cartBadge = document.getElementById("cart-badge");

    if (cartBadge) {
        if (cartItemCount > 0) {
            cartBadge.textContent = cartItemCount;
            cartBadge.style.display = 'inline-block';
        } else {
            cartBadge.style.display = 'none';
        }
    }
}


function showToast(productName, productImage) {
    const toastLiveExample = document.getElementById("liveToast");

    if (toastLiveExample) {
        document.getElementById("toast-product-name").textContent = productName;
        document.getElementById("toast-product-img").src = productImage;
        document.getElementById("toast-message").textContent = `${productName} berhasil ditambahkan ke keranjang!`;

        const toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
    }
}

const belanjaButtons = document.querySelectorAll(".btn-belanja");

belanjaButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.stopPropagation();

        const productCard = button.closest('.card');
        const productImage = productCard.querySelector('.card-img-top').src;
        const productTitle = productCard.querySelector('.card-title').textContent;

        cartItemCount++;

        localStorage.setItem("cartItemCount", cartItemCount);

        updateCartBadge();

        showToast(productTitle, productImage);
    });
});

// Update Badge Cart
document.addEventListener("DOMContentLoaded", function () {
    updateCartBadge();
});

// Delete Product Dynamic
const products = [
    {
        id: 1,
        name: "Niacinamide Brightening Moisturizer Gel",
        image: "image/Product 1.png",
        price: 100000,
        variant: "30 G",
    },
    {
        id: 2,
        name: "SKINTIFIC - Zero Oil Cleansing Balm",
        image: "image/Product 2.png",
        price: 150000,
        variant: "100 ML",
    },
    {
        id: 3,
        name: "SKINTIFIC - Niacinamide Brightening Serum",
        image: "image/Product 3.png",
        price: 200000,
        variant: "50 ML",
    },
];

document.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("btn-hapus")) {
        console.log("Button clicked:", event.target);

        const productId = event.target.getAttribute("data-product-id");

        const productIndex = products.findIndex(
            (product) => product.id === parseInt(productId)
        );
        console.log("Product ID to remove:", productId);

        const productName = products[productIndex].name;
        const productImage = products[productIndex].image;

        document.getElementById("toast-product-name").textContent = productName;
        document.getElementById("toast-product-img").src = productImage;
        document.getElementById(
            "toast-message"
        ).textContent = `${productName} berhasil dihapus!`;

        const toastElement = document.getElementById("liveToastDelete");
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        if (productIndex > -1) {
            products.splice(productIndex, 1);
            console.log("Product removed:", products);
        }

        renderProductList();
    }
});

function renderProductList() {
    const productList = document.getElementById("product-list");

    if (!productList) {
        console.error("Element #product-list not found.");
        return;
    }

    productList.innerHTML = "";

    products.forEach((product) => {
        const productRow = document.createElement("div");
        productRow.classList.add("row", "py-3", "border-bottom", "align-items-center");
        productRow.id = `product-${product.id}`;

        productRow.innerHTML = `
        <div class="col-md-4 d-flex align-items-center">
            <img src="${product.image}" class="rounded" style="max-width: 150px; max-height: 150px; object-fit: cover;" alt="Product Image" id="product-img-${product.id}">
            <div class="ms-3">
            <h5 class="mb-0" id="product-name-${product.id}">${product.name}</h5>
            <small class="text-muted">${product.variant}</small>
            <div class="input-group justify-content-center mobile">
                <button class="btn btn-primary btn-minus" type="button" style="background-color: #3A2D36; border-color: #3A2D36" data-item="${product.id}">-</button>
                    <input type="text" class="form-control-item" placeholder="Quantity" aria-label="Quantity" value="1" id="quantity-input-${product.id}">
                <button class="btn btn-primary btn-plus" type="button" style="background-color: #3A2D36; border-color: #3A2D36" data-item="${product.id}">+</button>
            </div>
            </div>
        </div>
        <div class="col-md-2 text-center desktop">
            <input type="text" class="form-control-item text-center" value="${product.variant}" readonly>
        </div>
        <div id="desktop-quantity" class="col-md-3 text-center d-flex align-items-center justify-content-center desktop">
    <div class="input-group justify-content-center">
        <button class="btn-web1 btn-minus-desktop" type="button" data-item-desktop="${product.id}">-</button>
        <input type="text" class="form-control-item" placeholder="Quantity" aria-label="Quantity" value="1" id="quantity-input-desktop-${product.id}">
        <button class="btn-web1 btn-plus-desktop" type="button" data-item-desktop="${product.id}">+</button>
    </div>
    </div>
        <div class="col-md-2 text-center desktop">
            <h5 class="mb-0 text-web2 fw-semibold">Rp ${product.price.toLocaleString()}</h5>
        </div>
        <div class="col-md-1 text-center desktop">
            <button class="btn-web5 btn-hapus" data-product-id="${product.id}">Hapus</button>
        </div>
        <div id="mobile-quantity" class="d-flex align-items-center justify-content-between mobile">
    <h5 class="mb-0 text-web2 fw-semibold">Rp ${product.price.toLocaleString()}</h5>
    <button class="btn-web5 btn-hapus" data-product-id="${product.id}">Hapus</button>
    </div>
    `;

        productList.appendChild(productRow);
    });

    if (products.length === 0) {
        document.getElementById("empty-message").style.display = "flex";
        document.getElementById("cart-summary").style.display = "none";
    } else {
        document.getElementById("empty-message").style.display = "none";
        document.getElementById("cart-summary").style.display = "block";
    }
}

renderProductList();

// Detail Product
function goToDetailPage() {
    window.location.href = "product-page.html";
}
// Shop Page
function goToShopPage() {
    window.location.href = "shop-page.html";
}
// Checkout Page
function goToCheckoutPage() {
    window.location.href = "checkout-page.html";
}
// Blog Page
function goToDetailBlogPage() {
    window.location.href = "detail-blog-page.html";
}

// Increase Decrease
function handleQuantityChange(event) {
    const button = event.target;
    const itemId = button.getAttribute("data-item");
    const quantityInput = document.getElementById(`quantity-input-${itemId}`);
    let currentValue = parseInt(quantityInput.value);

    if (button.classList.contains("btn-minus")) {
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    }

    if (button.classList.contains("btn-plus")) {
        quantityInput.value = currentValue + 1;
    }
}

const minusButtons = document.querySelectorAll(".btn-minus");
const plusButtons = document.querySelectorAll(".btn-plus");

minusButtons.forEach((button) => {
    button.addEventListener("click", handleQuantityChange);
});

plusButtons.forEach((button) => {
    button.addEventListener("click", handleQuantityChange);
});

// Increase Decrease
function handleQuantityChangeDesktop(event) {
    const button = event.target;
    const itemId = button.getAttribute("data-item-desktop");
    const quantityInput = document.getElementById(`quantity-input-desktop-${itemId}`);
    let currentValue = parseInt(quantityInput.value);

    if (button.classList.contains("btn-minus-desktop")) {
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    }

    if (button.classList.contains("btn-plus-desktop")) {
        quantityInput.value = currentValue + 1;
    }
}
const minusButtonsDesktop = document.querySelectorAll(".btn-minus-desktop");
const plusButtonsDesktop = document.querySelectorAll(".btn-plus-desktop");

minusButtonsDesktop.forEach((button) => {
    button.addEventListener("click", handleQuantityChangeDesktop);
});

plusButtonsDesktop.forEach((button) => {
    button.addEventListener("click", handleQuantityChangeDesktop);
});

// Submit Allert
const submitButtonMessage = document.getElementById("submitButtonMessage");
const successAlert = document.getElementById("successAlert");

submitButtonMessage.addEventListener("click", (event) => {
    event.preventDefault();

    successAlert.classList.remove("d-none");

    setTimeout(() => {
        successAlert.classList.add("d-none");
    }, 3000);
});

// Payment Modal
document.querySelector('#confirmationModal .btn-success').addEventListener('click', function () {
    window.location.href = 'checkout-page.html';
});

// Change Mian Image Product
function changeImage(imageSrc) {
    document.getElementById('mainImage').src = imageSrc;
}