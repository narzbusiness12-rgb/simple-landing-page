const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const contactForm = document.getElementById("contact-form")
const productGrid = document.getElementById("product-grid")

// mobile responsive navbar toggle
hamburger.addEventListener("click", ()=> {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-item a").forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// 2. ambil data produk
async function getProducts(){
    try {
        const response = await fetch("https://fakestoreapi.com/products");

        // console.log(response)

        if(!response.ok) {
            throw new Error("Gagal mengambil data")
        }

        const products = await response.json();

        // console.log(products);

    //batasi hanya 9 product
    const limitedProducts = products.slice(0,9);

    renderProducts(limitedProducts);
    } catch (error) {
        console.error(error);

        productGrid.innerHTML = `
        <h2>Gagal memuat product</h2>`;
    }
}

    // tampilkan product ke HTML
    function renderProducts(products){
        productGrid.innerHTML = "";

        // console.log(products);

        products.forEach((product) => {
            const card = document.createElement("div");
            // console.log(product);

            card.className = "card reveal";

            card.innerHTML = `
            <img
            src="${product.image}"
            alt="${product.title}"
            class="product-image"
            >
            
            <h3>${product.title}</h3>
            
            <p>
            ${product.description.substring(0,80)}...
            </p>
            
            <div class= "card-footer">
            <span class= "price">
            $${product.price}
            </span>
            
            <a href="#" class="btn-sm">
            Detail
            </a>
            </div>
            `;

            productGrid.appendChild(card);
        });

        revealCards();
    }

    // reveal animation untuk scroll
    // fungsi untuk menampilkan animasi saat elemen muncul di layar
    function revealCards() {
        // mengambil semua elemen yang memiliki class "reveal"
        const reveal = document.querySelectorAll(".reveal");
        console.log(reveal);

        // membuat IntersectionObserver
        // yang digunakan untuk mengetahui apakah suatu elemen sedang terlihat (beririsan/insterspect) dengan viewport (layar browser) atau elemen parent tertentu
        const observer = new IntersectionObserver(
            (entries) => {
                console.log(entries)
                // melakukan perulangan untuk setiap elemen yang diamati
                entries.forEach((entry) => {
                    // mengecek apakah elemen sedang terlihat di viewport
                    if(entry.isIntersecting) {
                        // menambahkan class "active" ke elemen 
                        // biasanya digunakan untuk memicu animasi di CSS
                        entry.target.classList.add("active");
                    }
                }); 
            },

            // opsi observer
            {
                // observer akan aktif ketik minimal 20%
                // bagian elemen terlihat di viewport
                threshold: 0.2,

            },

        );

    // melakukan observasi pada setiap elemen dengan class "reveal"
    reveal.forEach((item)=> observer.observe(item));
    }

    function sendForm(e){
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        alert(
           `Nama: ${name}
            
            Email: ${email}
            
            Pesan: ${message}`,
        );

        contactForm.reset();
    }

    getProducts();
