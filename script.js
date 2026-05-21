function openCartDrawer() {
    document.getElementById("cart-overlay").classList.add("open");
    document.body.style.overflow = "hidden";
    renderCartItems();
}

function closeCartDrawer() {
    document.getElementById("cart-overlay").classList.remove("open");
    document.body.style.overflow = "";
}

function renderCartItems() {
    const cartItems =
        document.getElementById("cart-items");
    const cartTotal =
        document.getElementById("cart-total");

    if (!cartItems || !cartTotal) {
        console.log("cart elements not found");
        return;
    }

    cartItems.innerHTML = "";
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p>YOUR CART IS EMPTY</p>
        `;
    cartTotal.textContent = "$0";
    return;
    }

    let total = 0;

    cart.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${product.name}
            $${product.price}
            × ${product.quantity}

        <button onclick="changeQty('${product.name}', -1)">−</button>
        <button onclick="changeQty('${product.name}', 1)">+</button>
        <button onclick="removeCartItem('${product.name}')">Remove</button>
        `;

        cartItems.appendChild(li);

        total +=
            product.price *
            product.quantity;
    });
    cartTotal.textContent = `$${total}`;
}


/*product*/
let currentPage = "p"; /*masuk memori lg di hlmn mana*/
  function goto(page) {
    document.querySelectorAll(".page").forEach(p => {
      p.classList.remove("active"); /*hide*/
    });
  const target = document.getElementById("page-" + page); /*cari di main*/

    if (!target) { console.warn("Page not found:", page); return; }

  target.classList.add("active");
    currentPage = page;
    window.scrollTo({ top: 0, behavior: "instant" });

    if (page==="products") renderProductGrid();
    if (page==="checkout") renderCheckoutSummary();
}


/*data*/

const PRODUCTS= [
{
    id: 1, 
    name: "HOUND COMPRESSION",
    price: 64,
    currency: "AUD",
    color: "#232325",
    img: "one.png",

    detail: {
        badge:"PRE-ORDER",
        title: "HOUND COMPRESSION",
        desc: `The most requested relic in the archive answers the call. The Onyx returns with a sigil chain marking the left arm. Those who waited since Black Friday finally claim what was promised.`,
        features: [
        "HOUND 3M Reflective Heart Logo",
        "HOUND 3M Reflective Back Logo",
        "HOUND 3M Reflective Sleeve Submark Label",
        "HOUND ContourFit Seam Pattern",
        "180GSM NylonSpandex Blend",
        "Model is 179cm wearing Size S",
        "The garment’s color may differ slightly when it arrives from the Tailory.",
        ],

        swatches: [
        {color: "#232325", label: "Onyx Black"},
        {color: "#343526", label: "Moss"},
        {color: "#ffe5e7", label: "Maya Pink"},
        {color: "#ffffff", label: "Quartz White"},
        ],
        sizes: ["XS", "S", "M", "L"],
        images: [
            
        "blkback.png",
        "blkbackcloseup.png",
        "blkfrontcloseup.png",


        ]
    }
},
    { id: 2, name: "HOUND REFLECTIVE HOODIE", price: 130, currency: "AUD", img: "seven.png"},
    { id: 3, name: "HOUND KNIT", price: 184, currency: "AUD", img: "six.png" },
    { id: 4, name: "HOUND ULTIMA", price: 140, currency: "AUD", img: "two.png" },
    { id: 5, name: "HOUND NECKLACE", price: 150, currency: "AUD", img: "three.png" },
    { id: 6, name: "HOUND REFLECTIVE TANK", price: 45,  currency: "AUD", img: "four.png" },
    { id: 7, name: "HOUND COMPRESSION V2", price: 80, currency: "AUD", img: "five.png" },
];

/*grid*/
function renderProductGrid() {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = PRODUCTS.map(p => {

    let imgHtml = "";
    if (p.img) {
    imgHtml = `<img class="product-card__img" src="${p.img}">`;

    } else {
    imgHtml = `
        <div class="product-card__placeholder"
        style="background:${p.color}">
        IMAGE
        </div>
        `;
    }
       
    return `
    <article class="product-card" onclick="openProduct(${p.id})">
      ${imgHtml}
      <div class="product-card__info">
        <p>${p.name}</p>
        <p>$${p.price.toFixed(2)} ${p.currency}</p>
      </div>
    </article>
  `;
}).join("");
}

function openProduct(id) {
    const product= PRODUCTS.find(p => p.id === id);
    if (!product || !product.detail) {
      populateDetail(PRODUCTS[0]);
    } else {
      populateDetail(product);
    }
    goto("detail");
  }


/*product details*/

     