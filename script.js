// fungsi typing
document.addEventListener('DOMContentLoaded', function () {
    const texts = [
        "Welcome to our e-commerce website.",
        "Here you can buy and order various items you want.",
        "Of course all the items here are very attractive and the prices are very affordable."
    ];
    const typingTextElement = document.getElementById('typing');
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < texts[textIndex].length) {
            typingTextElement.textContent += texts[textIndex].charAt(charIndex); // Ganti innerHTML dengan textContent
            charIndex++;
            setTimeout(type, Math.random() * 200 + 50);
        } else {
            setTimeout(erase, 2000); // Tunggu 2 detik sebelum mulai menghapus
        }
    }

    function erase() {
        if (!typingTextElement) return; // Periksa jika elemen ada
        if (charIndex > 0) {
            typingTextElement.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            requestAnimationFrame(() => setTimeout(erase, Math.random() * 100 + 50));
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500); // Tunggu 0.5 detik sebelum mulai mengetik lagi
        }
    }

    type();
});

const hamburgerBtn = document.getElementById('hamburger-btn');
const closeBtn = document.getElementById('close-btn');
const sidebarContainer = document.getElementById('sidebar-container');
var main = document.getElementsByTagName('main')[0];
var body = document.getElementsByTagName('body')[0];



// Menambahkan event listener untuk tombol hamburger
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.style.display = 'none';
        closeBtn.style.display = 'block';
        sidebarContainer.style.visibility = 'visible';
        sidebarContainer.style.transform = 'scale(1)';
        main.style.filter = 'blur(5px)';
        main.style.pointerEvents = 'none';
        body.style.overflow = 'hidden';
    });
}

// Menambahkan event listener untuk tombol close
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        closeBtn.style.display = 'none';
        hamburgerBtn.style.display = 'block';
        sidebarContainer.style.transform = 'scale(0)';
        main.style.filter = 'blur(0)';
        main.style.pointerEvents = 'auto';
        body.style.overflow = 'auto';
    });
}

// Mendapatkan elemen dari DOM
let contCheckout = document.getElementById('container-checkout');
let hamBtn = document.getElementsByClassName('hamburger-btn')[0];
let notificationContainer = document.querySelector('.container-notification');
let qrcodeContainer = document.querySelector('.container-qr-code');
var main = document.getElementsByTagName('main')[0];
var body = document.body;
let nav = document.getElementsByTagName('nav')[0];
let showCheckout = false; // Awalnya false, akan berubah jadi true ketika btn-buy diklik

// Data produk
let products = {
    product1: { name: 'ROG Strix XG16 Gaming', price: 100000, image: 'asset/product1.png', pricePaymentMethod: { Gopay: 102000, Dana: 103000, LinkAja: 104000, OVO: 105000 } },
    product2: { name: 'Iphone 15 Pro Max', price: 200000, image: 'asset/product2.png', pricePaymentMethod: { Gopay: 202000, Dana: 203000, LinkAja: 204000, OVO: 205000 } },
    product3: { name: "Macbook Pro", price: 300000, image: 'asset/product3.png', pricePaymentMethod: { Gopay: 303549, Dana: 303559, LinkAja: 304559, OVO: 305659 } },
    product4: { name: "Mackbook Air", price: 400000, image: 'asset/product4.png', pricePaymentMethod: { Gopay: 405549, Dana: 405359, LinkAja: 405559, OVO: 405659 } },
    product5: { name: 'Produk 5', price: 500000, image: 'asset/product5.png', pricePaymentMethod: { Gopay: 504599, Dana: 503500, LinkAja: 506304, OVO: 505066 } },
    product6: { name: 'Produk 6', price: 600000, image: 'asset/product6.png', pricePaymentMethod: { Gopay: 604599, Dana: 603500, LinkAja: 606304, OVO: 605066 } },
    product7: { name: 'Produk 7', price: 700000, image: 'asset/product7.png', pricePaymentMethod: { Gopay: 704599, Dana: 703500, LinkAja: 706304, OVO: 705066 } },
    product8: { name: 'Produk 8', price: 800000, image: 'asset/product8.png', pricePaymentMethod: { Gopay: 804599, Dana: 803500, LinkAja: 806304, OVO: 805066 } },
    product9: { name: 'Produk 9', price: 900000, image: 'asset/product9.png', pricePaymentMethod: { Gopay: 904599, Dana: 903500, LinkAja: 906304, OVO: 905066 } },
    product10: { name: 'Produk 10', price: 1000000, image: 'asset/product10.png', pricePaymentMethod: { Gopay: 1004599, Dana: 1003500, LinkAja: 1006304, OVO: 1005066 }}
};

// Fungsi untuk menampilkan produk di container checkout
function buyNow(productKey) {
    let product = products[productKey];
    sessionStorage.setItem('selectedProduct', JSON.stringify(product));
    showCheckout = true; // Tandai bahwa checkout sedang aktif
    displayProductDetails();
}

function displayProductDetails() {
    let selectedProduct = JSON.parse(sessionStorage.getItem('selectedProduct'));

    if (selectedProduct && showCheckout) {
        contCheckout.innerHTML = `
            <button class="close-checkout" id="close-checkout"><span class="material-symbols-outlined">close</span></button>
            <img src="${selectedProduct.image}" alt="Gambar ${selectedProduct.name}" width="150px">
            <p>Nama Produk: <span>${selectedProduct.name}</span></p>
            <p>Harga: <span id="price">${formatToCurrency(selectedProduct.price)}</span></p>
            <button class="payment-method" data-method="Gopay">Gopay</button>
            <button class="payment-method" data-method="Dana">Dana</button>
            <button class="payment-method" data-method="LinkAja">LinkAja</button>
            <button class="payment-method" data-method="OVO">OVO</button><br>
            <button class="btn-checkout" id="btn-checkout" onclick="showNotification()">Checkout</button>
        `;

        // Fungsi untuk memformat harga ke format lokal Indonesia
        function formatToCurrency(value) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(value);
        }

        // Menambahkan event listener pada setiap metode pembayaran
        let priceElement = document.getElementById('price');
        let paymentButtons = document.querySelectorAll('.payment-method');

        paymentButtons.forEach(button => {
            button.addEventListener('click', function (event) {
                // Menghapus class 'active' dari semua tombol
                paymentButtons.forEach(btn => btn.classList.remove('active'));

                // Menambahkan class 'active' ke tombol yang diklik
                this.classList.add('active');

                let paymentMethod = event.currentTarget.getAttribute('data-method');
                let newPrice = selectedProduct.pricePaymentMethod[paymentMethod];
                priceElement.textContent = formatToCurrency(newPrice);
            });
        });

        // Tampilkan checkout, blur main, dan nonaktifkan scroll pada body
        contCheckout.style.display = 'block';
        main.style.filter = 'blur(5px)';
        main.style.pointerEvents = 'none';
        body.style.overflow = 'hidden';
        hamBtn.style.pointerEvents = 'none';
        nav.style.pointerEvents = 'none';
        showCheckout = true;

        // Tambahkan event listener untuk tombol close-checkout
        document.getElementById('close-checkout').addEventListener('click', () => {
            hideCheckout();
        });
    } else {
        hideCheckout();
    }
}

// Fungsi untuk menyembunyikan checkout dan reset
function hideCheckout() {
    contCheckout.style.display = 'none';
    main.style.filter = 'blur(0)';
    main.style.pointerEvents = 'auto';
    body.style.overflow = 'auto';
    hamBtn.style.pointerEvents = 'auto';
    nav.style.pointerEvents = 'auto';
    showCheckout = false; // Reset state showCheckout
}

// Tambahkan event listener ke semua tombol dengan class btn-buy
let buyButtons = document.querySelectorAll('.btn-buy');

buyButtons.forEach(button => {
    button.addEventListener('click', function () {
        let productKey = this.getAttribute('data-product');
        buyNow(productKey);
    });
});

// Pastikan checkout hanya muncul saat ada produk yang dipilih DAN showCheckout true
window.onload = function () {
    showCheckout = false; // Reset state saat halaman dimuat ulang
    displayProductDetails();
};

function showQRCodeContainer() {
    let selectedProduct = JSON.parse(sessionStorage.getItem('selectedProduct'));
    let activeButton = document.querySelector('.payment-method.active');
    let orderId = sessionStorage.getItem('orderId');
    let qrcodeContainer = document.querySelector('.container-qr-code');
    let notificationContainer = document.querySelector('.container-notification');

    if (!qrcodeContainer || !notificationContainer) return; // Periksa jika elemen ada

    if (selectedProduct && activeButton) {
        qrcodeContainer.style.display = 'block';
        notificationContainer.style.display = 'none';
        let paymentMethod = activeButton.getAttribute('data-method');

        // Tentukan URL gambar berdasarkan metode pembayaran
        let qrCodeImageSrc = '';
        switch (paymentMethod) {
            case 'Gopay':
                qrCodeImageSrc = 'asset/gopay.png';
                break;
            case 'Dana':
                qrCodeImageSrc = 'asset/dana.png';
                break;
            case 'LinkAja':
                qrCodeImageSrc = 'asset/linkaja.png';
                break;
            case 'OVO':
                qrCodeImageSrc = 'asset/ovo.png';
                break;
            default:
                qrCodeImageSrc = '';
        }

        // Gunakan template literals dengan hati-hati untuk menghindari XSS
        qrcodeContainer.innerHTML = `
            <h2>Scan QR Code untuk menyelesaikan pembayaran</h2>
            <div id="qr-code">
                <img src="${qrCodeImageSrc}" alt="QR Code ${paymentMethod}" width="250" height="250">
            </div>
            <p>Nama Produk: ${escapeHtml(selectedProduct.name)}</p>
            <p>Harga: ${formatToCurrency(selectedProduct.pricePaymentMethod[paymentMethod])}</p>
            <p>Metode Pembayaran: ${escapeHtml(paymentMethod)}</p>
            <p>ID Pesanan: ${escapeHtml(orderId)}</p>
            <p id="payment-status">Status Pembayaran: Menunggu Pembayaran</p>
            <button id="finish-btn">Selesai</button>
        `;

// Fungsi untuk meloloskan karakter-karakter HTML khusus
function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function (match) {
        switch (match) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&#039;';
        }
    });
}}

        // Polling untuk memeriksa status pembayaran setiap 5 detik
        function checkPaymentStatus(orderId) {
            return fetch(`/check-status/${orderId}`)
                .then(response => response.json())
                .catch(error => {
                    console.error('Gagal memeriksa status pembayaran:', error);
                    throw error; // Re-throw error untuk ditangani di tempat lain
                });
        }

        let paymentCheckInterval = setInterval(() => {
            checkPaymentStatus(orderId)
                .then(data => {
                    if (data.status === 'paid') {
                        clearInterval(paymentCheckInterval);
                        showNotification();
                    } else if (data.status === 'failed') {
                        clearInterval(paymentCheckInterval);
                        alert('Pembayaran gagal. Silakan coba lagi.');
                    }
                })
                .catch(error => {
                    console.error('Gagal memeriksa status pembayaran:', error);
                });
        }, 5000);

        document.getElementById('finish-btn').addEventListener('click', () => {
            clearInterval(paymentCheckInterval); // Hentikan polling saat pengguna mengklik Selesai
            finishCheckout();
        });
    };

// Fungsi untuk mengakhiri proses checkout dan mereset state
function finishCheckout() {
    qrcodeContainer.style.display = 'none';
    main.style.filter = 'blur(0)';
    main.style.pointerEvents = 'auto';
    body.style.overflow = 'auto';
    hamBtn.style.pointerEvents = 'auto';
    nav.style.pointerEvents = 'auto';
    showCheckout = false; // Reset state showCheckout
}

// Fungsi untuk memformat harga ke format lokal Indonesia
function formatToCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(value);
}

function generateOrderId() {
    // Menghasilkan angka acak 9 digit
    return Math.floor(100000000 + Math.random() * 900000000);
}

function showNotification() {
    let selectedProduct = JSON.parse(sessionStorage.getItem('selectedProduct'));
    if (selectedProduct) {
        let activeButton = document.querySelector('.payment-method.active');
        let orderId = generateOrderId();
        sessionStorage.setItem('orderId', orderId); // Simpan ID pesanan dalam sessionStorage

        // Cek apakah ada metode pembayaran yang dipilih
        if (!activeButton) {
            // Jika tidak ada metode pembayaran yang dipilih, tampilkan notifikasi
            notificationContainer.innerHTML = `
                <p>Silahkan pilih metode pembayaran terlebih dahulu.</p>
                <button id="back-btn">Kembali</button>
            `;

            // Event listener untuk tombol Kembali
            document.getElementById('back-btn').addEventListener('click', () => {
                notificationContainer.style.display = 'none';
                contCheckout.style.display = 'block';
            });

        } else {
            // Jika metode pembayaran dipilih, tampilkan notifikasi checkout
            notificationContainer.innerHTML = `
                <img src="${selectedProduct.image}" alt="${selectedProduct.name}">
                <p>Nama produk: ${selectedProduct.name}.</p>
                <p>Subtotal: ${formatToCurrency(selectedProduct.pricePaymentMethod[activeButton.getAttribute('data-method')])}.</p>
                <p>Metode pembayaran yang dipilih: ${activeButton.getAttribute('data-method')}.</p>
                <div><button id="continue-btn">Lanjutkan</button><button id="back-btn">Kembali</button></div>
            `;

            // Tambahkan event listener untuk tombol Lanjutkan
            document.getElementById('continue-btn').addEventListener('click', () => {
                showQRCodeContainer();
            });

            // Tambahkan event listener untuk tombol Kembali
            document.getElementById('back-btn').addEventListener('click', () => {
                notificationContainer.style.display = 'none';
                contCheckout.style.display = 'block';
            });
        }

        // Tampilkan notifikasi dan sembunyikan checkout
        notificationContainer.style.display = 'block';
        contCheckout.style.display = 'none';
    }
}
