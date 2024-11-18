// Range Slider dengan Label
const rangeSlider = document.getElementById("range-slider");
const sliderLabel = document.getElementById("slider-value");

// Fungsi untuk memperbarui nilai dan posisi label
if (rangeSlider && sliderLabel) {
    rangeSlider.addEventListener("input", () => {
        const sliderValue = rangeSlider.value;
        const sliderWidth = rangeSlider.offsetWidth;
        const thumbWidth = 20; // Lebar thumb slider
        const min = rangeSlider.min;
        const max = rangeSlider.max;

        // Perbarui nilai label
        sliderLabel.textContent = sliderValue;

        // Hitung posisi label berdasarkan nilai slider
        const percentage = (sliderValue - min) / (max - min);
        const labelPosition =
            percentage * (sliderWidth - thumbWidth) + thumbWidth / 2;

        // Set posisi label
        sliderLabel.style.left = `${labelPosition}px`;
    });
}

// Scrollable Container Drag
const scrollableContainer = document.querySelector('.scrollable-container');
let isDragging = false;
let startX;
let scrollLeft;

if (scrollableContainer) {
    // Event Listener untuk mulai drag
    scrollableContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        scrollableContainer.classList.add('active');
        startX = e.pageX - scrollableContainer.offsetLeft;
        scrollLeft = scrollableContainer.scrollLeft;
    });

    scrollableContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        scrollableContainer.classList.remove('active');
    });

    scrollableContainer.addEventListener('mouseup', () => {
        isDragging = false;
        scrollableContainer.classList.remove('active');
    });

    scrollableContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollableContainer.offsetLeft;
        const walk = (x - startX) * 1; // Percepat gerakan drag
        scrollableContainer.scrollLeft = scrollLeft - walk;
    });
}

// Toast Notifications
const belanjaButtons = document.querySelectorAll('.btn-belanja');
const toastLiveExample = document.getElementById('liveToast');

if (belanjaButtons && toastLiveExample) {
    belanjaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const toast = new bootstrap.Toast(toastLiveExample);
            toast.show();
        });
    });
}
