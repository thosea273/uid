/*checkour*/
let cart= []

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].quantity;
  }
  badge.textContent = total; /*go through the cart and add up all the quantities*/
}

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
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  if (!cartItems || !cartTotal) {
    console.log("cart elements not found");
    return;
  }

  cartItems.innerHTML = "";
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>YOUR CART IS EMPTY</p>";
    cartTotal.textContent = "$0.00 AUD";
    return;
  }

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];

    const li = document.createElement("li");
    li.style.cssText = "list-style:none; margin-bottom:18px; padding-bottom:18px; border-bottom:1px solid rgba(0,0,0,0.1);";

    li.innerHTML =
    "<div style='display:flex; gap:12px; align-items:flex-start;'>" +
    "<div class='cart-item__swatch' style='background:" + item.color + ";'></div>" +
    "<div style='flex:1;'>" +
        "<p class='cart-item__name'>" + item.name + "</p>" +
        "<p class='cart-item__sub'>" + item.size + " · Pre-order</p>" +
        "<p class='cart-item__price'>$" + item.price.toFixed(2) + " AUD</p>" +
    "<div class='qty-control'>" +
        "<button class='qty-btn' onclick='changeQty(\"" + item.name + "\", -1)'>−</button>" +
        "<span class='qty-val'>" + item.quantity + "</span>" +
        "<button class='qty-btn' onclick='changeQty(\"" + item.name + "\", 1)'>+</button>" +
    "</div>" +
        "<button class='remove-btn' onclick='removeCartItem(\"" + item.name + "\")'>Remove</button>" +
        "</div>" +
        "<p class='cart-item__price'>$" + (item.price * item.quantity).toFixed(2) + "</p>" +
      "</div>";

    cartItems.appendChild(li); /*put items into cart*/
    total = total + (item.price * item.quantity);
  }

  cartTotal.textContent = "$" + total.toFixed(2) + " AUD";
}

function changeQty(name, amount) {
  let item = null;
  for (let i = 0; i < cart.length; i++) {
  if (cart[i].name === name) {
      item = cart[i]; /*find item in cart*/
    }
  }

  if(!item) return;
  if (amount === 1) {
    item.quantity = item.quantity + 1;
  }

  if(amount === -1) {
    item.quantity = item.quantity - 1;
  }

  if(item.quantity === 0) {
    removeCartItem(name);
    return;
  }

  updateCartBadge();
  renderCartItems();
}

function removeCartItem(name) {
const newCart = [];

for (let i = 0; i < cart.length; i++) {
if (cart[i].name !== name) {
      newCart.push(cart[i]);
    }
  }

cart = newCart;
updateCartBadge();
renderCartItems();
}

function goToCheckout() {
  closeCartDrawer();
  goto("checkout");
}
    



/*search bar*/

let activeColors = [];
let activeSizes  = [];
let activeSort   = "default";
let searchQuery  = "";

function toggleSearch() {
  const bar = document.getElementById("search-bar");
  bar.classList.toggle("open");
  if (bar.classList.contains("open")) {
    document.getElementById("search-input").focus();
  }
}

function handleSearch() {
  searchQuery = document.getElementById("search-input").value.toLowerCase();
  goto("products");
  applyFiltersAndSort();
}


function toggleFilter() {
  document.getElementById("filter-panel").classList.toggle("open");
  document.getElementById("filter-overlay").classList.toggle("open");
}

function toggleColorFilter(color) {
  const index =activeColors.indexOf(color);
  if (index ===-1) {
  activeColors.push(color);
  } else {
  activeColors.splice(index, 1);
  }
  updateFilterButtons();
  applyFiltersAndSort();
}

function toggleSizeFilter(size) {
  const index=activeSizes.indexOf(size);
  if (index===-1){
  activeSizes.push(size);
  } else {
  activeSizes.splice(index, 1);
  }
updateFilterButtons();
applyFiltersAndSort();
}

function updateFilterButtons() {
  const colorBtns = document.querySelectorAll(".filter-color-btn");
  for (let i = 0; i < colorBtns.length; i++) {
  if (activeColors.indexOf(colorBtns[i].dataset.color) !== -1) {
    colorBtns[i].classList.add("active");
    } else {
    colorBtns[i].classList.remove("active");
  }
  }
  const sizeBtns = document.querySelectorAll(".filter-size-btn");
  for (let i = 0; i < sizeBtns.length; i++) {
    if (activeSizes.indexOf(sizeBtns[i].dataset.size) !== -1) {
    sizeBtns[i].classList.add("active");
    }else{
    sizeBtns[i].classList.remove("active");
  }
  }
}

function clearFilters() {
  activeColors = [];
  activeSizes  = [];
  searchQuery  = "";
  const input = document.getElementById("search-input");
  if (input) input.value = "";
  updateFilterButtons();
  applyFiltersAndSort();
}

function toggleSortDropdown() {
  document.getElementById("sort-dropdown").classList.toggle("open");
}

function setSort(type) {
  activeSort = type;
  const labels = {
    "default":    "SORT ▼",
    "price-low":  "PRICE: LOW → HIGH ▼",
    "price-high": "PRICE: HIGH → LOW ▼"
  };
  updateText("sort-btn-label", labels[type]);
  document.getElementById("sort-dropdown").classList.remove("open");
  applyFiltersAndSort();
}

function applyFiltersAndSort() {
  let results = [];
  for (let i = 0; i < PRODUCTS.length; i++) {
  results.push(PRODUCTS[i]);
  }

  /* search*/
  if (searchQuery.length > 0) {
    let out = [];
    for (let i = 0; i < results.length; i++) {
    if (results[i].name.toLowerCase().indexOf(searchQuery) !== -1) {
      out.push(results[i]);
      }
    }
    results = out;
  }

  /* color*/
  if (activeColors.length > 0) {
    let out = [];
    for (let i = 0; i < results.length; i++) {
      const p = results[i];
      if (p.detail && p.detail.swatches) {
      for (let j = 0; j < p.detail.swatches.length; j++) {
        if (activeColors.indexOf(p.detail.swatches[j].label) !== -1) {
          out.push(p);
          break;
      }
      }
    }
  }
    results = out;
  }

  /* size */
  if (activeSizes.length > 0) {
    let out = [];
    for (let i = 0; i < results.length; i++) {
      const p = results[i];
      if (p.detail && p.detail.sizes) {
      for (let j = 0; j < p.detail.sizes.length; j++) {
        if (activeSizes.indexOf(p.detail.sizes[j]) !== -1) {
          out.push(p);
          break;
        }
      }
  }
  }
    results = out;
  }

  /* sort */
  if (activeSort === "price-low") {
  results.sort(function(a, b) { return a.price - b.price; });
  }
  if (activeSort === "price-high") {
  results.sort(function(a, b) { return b.price - a.price; });
  }

  updateText("showing-count", "SHOWING " + results.length + "/" + PRODUCTS.length + " PRODUCTS");
  renderFilteredGrid(results);
}

function renderFilteredGrid(products) {
  const grid = document.getElementById("product-grid");
  if (products.length === 0) {
    grid.innerHTML = "<p style='padding:40px; font-family:var(--pixel-font); font-size:10px; opacity:0.5; grid-column: 1/-1;'>NO RESULTS FOUND</p>";
    return;
  }
  let html = "";
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    let imgHtml = p.img
      ? "<img class='product-card__img' src='" + p.img + "'>"
      : "<div class='product-card__placeholder' style='background:" + p.color + ";'>IMAGE</div>";
    html += "<article class='product-card' onclick='openProduct(" + p.id + ")'>" +
      imgHtml +
      "<div class='product-card__info'><p>" + p.name + "</p><p>$" + p.price.toFixed(2) + " " + p.currency + "</p></div>" +
    "</article>";
  }
  grid.innerHTML = html;
}

/* update renderProductGrid to use the new system */
function renderProductGrid() {
  activeColors = [];
  activeSizes  = [];
  activeSort   = "default";
  searchQuery  = "";
  applyFiltersAndSort();
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

const PRODUCTS = [
  {
    id: 1,
    name: "HOUND COMPRESSION",
    price: 64,
    currency: "AUD",
    color: "#232325",
    img: "one.png",
    detail: {
      badge: "PRE-ORDER",
      title: "HOUND COMPRESSION",
      desc: `The most requested relic in the archive answers the call. The Onyx returns with a sigil chain marking the left arm. Those who waited since Black Friday finally claim what was promised.`,
      features: [
        "HOUND 3M Reflective Heart Logo",
        "HOUND 3M Reflective Back Logo",
        "HOUND 3M Reflective Sleeve Submark Label",
        "HOUND ContourFit Seam Pattern",
        "180GSM NylonSpandex Blend",
        "Model is 179cm wearing Size S",
        "The garment's color may differ slightly when it arrives from the Tailory.",
      ],
      swatches: [
        { color: "#232325", label: "Onyx Black", images: ["one.png", "blkback.png", "blkfrontcloseup.png", "blkbackcloseup.png"] },
        { color: "#343526", label: "Moss",       images: ["greenfront.png", "greenback.png", "greenfrontclose.png", "greenbackclose.png"] },
        { color: "#ffe5e7", label: "Maya Pink",  images: ["pnkfront.png", "pnkback.png", "pnkfrontclose.png", "pnkbackclose.png"] },
        { color: "#ffffff", label: "Quartz White", images: ["whitefront.png", "whiteback.png", "whitefrontclose.png", "whitebackclose.png"] },
      ],
      sizes: ["XS", "S", "M", "L"],
      images: ["one.png", "blkback.png", "blkfrontcloseup.png", "blkbackcloseup.png"],
    }
  },

  {
    id: 2,
    name: "HOUND REFLECTIVE HOODIE",
    price: 130,
    currency: "AUD",
    color: "#ffffff",
    img: "seven.png",
    detail: {
      badge: "PRE-ORDER",
      title: "HOUND REFLECTIVE HOODIE",
      desc: `The archive's most elusive layer. Engineered for movement, built to disappear into the crowd — until the light hits.`,
      features: [
        "HOUND 3M Reflective Print",
        "Heavyweight French Terry",
        "Relaxed Fit",
        "Model is 179cm wearing Size S",
        "The garment's color may differ slightly when it arrives from the Tailory.",
      ],
      swatches: [
        { color: "#ffffff", label: "Quartz White", images: ["seven.png", "girlback.png", "girlfront.png", "girlbackclose.png"] },
      ],
      sizes: ["XS", "S", "M", "L"],
      images: ["seven.png", "girlback.png", "girlfront.png", "girlbackclose.png"],
    }
  },

  {
    id: 3,
    name: "HOUND KNIT",
    price: 184,
    currency: "AUD",
    color: "#ffe5e7",
    img: "six.png",
    detail: {
      badge: "PRE-ORDER",
      title: "HOUND KNIT",
      desc: `A Celestehaven relic dyed in Maya's favourite bloom. Light as cloudglass, soft as promise. It appears only when the city remembers love.`,
      features: [
        "HOUND Chrome Heart Logo",
        "HOUND Chain Woven Arm Pattern",
        "HOUND Patch Rivet System",
        "Speckled Gradient Weave",
        "Viscose Nylon Blend",
        "Neck Embroidery",
        "Model is 160cm wearing Size XS",
        "The garment's color may differ slightly when it arrives from the Tailory.",
      ],
      swatches: [
        { color: "#ffe5e7", label: "Maya Pink",    images: ["six.png", "pinkback.png", "pinkfrontcloseup.png", "pinkbackcloseup.png"] },
        { color: "#232325", label: "Onyx Black",   images: ["knitblkfront.png", "knitblkback.png", "knitblkfrontclose.png", "knitblkbackclose.png"] },
        { color: "#ffffff", label: "Quartz White", images: ["knitfront.png", "knitback.png", "knitfrontclose.png", "knitbackclose.png"] },
      ],
      sizes: ["XS", "S", "M", "L"],
      images: ["six.png", "pinkback.png", "pinkfrontcloseup.png", "pinkbackcloseup.png"],
    }
  },

  {
    id: 4,
    name: "HOUND ULTIMA",
    price: 140,
    currency: "AUD",
    color: "#5a4a3a",
    img: "two.png",
    detail: {
      badge: "PRE-ORDER",
      title: "HOUND ULTIMA",
      desc: `The final form. A garment that carries the weight of the archive's entire history in every stitch.`,
      features: [
        "HOUND Embroidered Chest Logo",
        "Heavyweight Brushed Fleece",
        "Dropped Shoulder Fit",
        "Model is 179cm wearing Size S",
        "The garment's color may differ slightly when it arrives from the Tailory.",
      ],
      swatches: [
        { color: "#5a4a3a", label: "Brown",      images: ["two.png", "brownback.png", "brownfrontclose.png", "brownbackclose.png"] },
        { color: "#232325", label: "Onyx Black", images: ["hoodiefront.png", "hoodieback.png", "hoodiefrontclose.png", "hoodiebackclose.png"] },
      ],
      sizes: ["XS", "S", "M", "L"],
      images: ["two.png", "brownback.png", "brownfrontclose.png", "brownbackclose.png"],
    }
  },

  {
    id: 5,
    name: "HOUND NECKLACE",
    price: 150,
    currency: "AUD",
    color: "#888",
    img: "necklacefront.png",
    detail: {
      badge: "PRE-ORDER",
      title: "HOUND NECKLACE",
      desc: `Cast in the image of the archive's sigil. Worn close to the chest, known only to those who carry the mark.`,
      features: [
        "Sterling Silver Chain",
        "HOUND Sigil Pendant",
        "Adjustable Length",
        "Comes in archive-sealed pouch",
      ],
      swatches: [
        { color: "#888", label: "Silver", images: ["necklacefront.png", "necklaceback.png", "necklacefrontclose.png", "necklacebackclose.png"] },
      ],
      sizes: ["ONE SIZE"],
      images: ["necklacefront.png", "necklaceback.png", "necklacefrontclose.png", "necklacebackclose.png"],
    }
  },

  {
    id: 6,
    name: "HOUND REFLECTIVE TANK",
    price: 45,
    currency: "AUD",
    color: "#232325",
    img: "four.png",
    detail: {
      badge: "PRE-ORDER",
      title: "HOUND REFLECTIVE TANK",
      desc: `Stripped back to the core. The tank is the archive's most direct statement — nothing hidden, nothing wasted.`,
      features: [
        "HOUND 3M Reflective Logo",
        "Ribbed Neckline",
        "180GSM Cotton Blend",
        "Model is 179cm wearing Size S",
        "The garment's color may differ slightly when it arrives from the Tailory.",
      ],
      swatches: [
        { color: "#232325", label: "Onyx Black", images: ["four.png", "technoback.png", "technoclose.png", "technobackclose.png"] },
      ],
      sizes: ["XS", "S", "M", "L"],
      images: ["four.png", "technoback.png", "technoclose.png", "technobackclose.png"],
    }
  },

  {
    id: 7,
    name: "HOUND COMPRESSION V2",
    price: 80,
    currency: "AUD",
    color: "#4a7a8a",
    img: "duagreenfront.png",
    detail: {
      badge: "PRE-ORDER",
      title: "HOUND COMPRESSION V2",
      desc: `The second chapter of the archive's most requested piece. Refined fit, elevated materials, same relentless energy.`,
      features: [
        "HOUND 3M Reflective Heart Logo",
        "HOUND ContourFit Seam Pattern V2",
        "200GSM NylonSpandex Blend",
        "Model is 179cm wearing Size S",
        "The garment's color may differ slightly when it arrives from the Tailory.",
      ],
      swatches: [
        { color: "#343526", label: "Moss", images: ["duagreenfront.png", "duagreenback.png", "duagreenfrontclose.png", "duagreenbackclose.png"] },
        { color: "#232325", label: "Onyx Black", images: ["duablkfront.png", "duablkback.png", "duablkfrontclose.png", "duablkbackclose.png"] },
      ],
      sizes: ["XS", "S", "M", "L"],
      images: ["duagreenfront.png", "duagreenback.png", "duagreenfrontclose.png", "duagreenbackclose.png"],
    }
  },
];

/*grid*/
function renderProductGrid() {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = PRODUCTS.map(p => {
    let imgHtml = "";
    if (p.img) {
    imgHtml = `<img class="product-card__img" src="${p.img}">`;
    }else {
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


























  

/*product details*/
let selectedSize = "XS";
let selectedSwatch = 0;
let currentProduct = null;

function openProduct(id) {
let product = null;

for(let i = 0; i < PRODUCTS.length; i++) {
if (PRODUCTS[i].id === id) {
    product = PRODUCTS[i];
    }
}
  if(product === null || product.detail === undefined) {
  product = PRODUCTS[0];
  }

  populateDetail(product);
  goto("detail");
}

function populateDetail(product) {
  currentProduct = product; /*store product global*/
  let d = product.detail;

  if (d === undefined) {
    d = {};
  }

  /* images */
  const imgWrap = document.getElementById("detail-images");
  if (imgWrap && d.images) {
    let html = "";
    for (let i = 0; i < d.images.length; i++) {
      const src = d.images[i];
      html = html + "<div class='detail__img-wrap'>";
      html = html + "<img src='" + src + "' class='detail__img' alt='" + product.name + "'>";
      if (i === 1) {
        html = html + "<div class='tryon-label'>TRY ON</div>";
      }
      html = html + "</div>";
    }
    imgWrap.innerHTML = html;
  }

  updateText("detail-badge", "PRE-ORDER");
  if (d.title) {
    updateText("detail-title", d.title);
  } else {
    updateText("detail-title", product.name);
  }

  updateText("detail-price", "$" + product.price.toFixed(2) + " " + product.currency);

  /* descriptionn features */
  const descElement = document.getElementById("detail-desc");
  if (descElement) {
    let featureList = "";
    if (d.features) {
      featureList = "<ul>";
      for (let i = 0; i < d.features.length; i++) {
        featureList = featureList + "<li>" + d.features[i] + "</li>";
      }
      featureList = featureList + "</ul>";
    }
    descElement.innerHTML = (d.desc || "") + "<br><br>Features " + featureList;
  }

  /* swatches */
  const swatchWrap = document.getElementById("detail-swatches");
  if (swatchWrap && d.swatches) {
    let html = "";
    for (let i = 0; i < d.swatches.length; i++) {
      const swatch = d.swatches[i];
      let activeClass = "";
      if (i === 0) {
        activeClass = " active";
      }
      html = html + "<div class='swatch" + activeClass + "' style='background:" + swatch.color + "' onclick='selectSwatch(" + i + ", this)'></div>";
    }
    swatchWrap.innerHTML = html;
    selectedSwatch = 0;
    updateText("swatch-label-text", d.swatches[0].label);
  }

  /* sizes */
  const sizeWrap = document.getElementById("detail-sizes");
  if (sizeWrap && d.sizes) {
    let html = "";
    for (let i = 0; i < d.sizes.length; i++) {
      const size = d.sizes[i];
      let activeClass = "";
      if (i === 0) {
        activeClass = " active";
      }
      html = html + "<button class='size-btn" + activeClass + "' onclick='selectSize(\"" + size + "\", this)'>" + size + "</button>";
    }
    sizeWrap.innerHTML = html;
    selectedSize = d.sizes[0];
  }
}

function selectSwatch(index, element) {
  const allSwatches = document.querySelectorAll(".swatch");
  for (let i=0; i < allSwatches.length; i++) {
    allSwatches[i].classList.remove("active");
  }
  element.classList.add("active");
  selectedSwatch = index;
  updateText("swatch-label-text", currentProduct.detail.swatches[index].label);


const swatch = currentProduct.detail.swatches[index];
  if (swatch.images) {
  const imgWrap = document.getElementById("detail-images");
  let html = "";
  for (let i = 0; i < swatch.images.length; i++) {
    html = html + "<div class='detail__img-wrap'>";
    html = html + "<img src='" + swatch.images[i] + "' class='detail__img' alt='" + currentProduct.name + "'>";
    if (i === 1) {
    html = html + "<div class='tryon-label'>TRY ON</div>";
  }
    html = html + "</div>";
  }
  imgWrap.innerHTML = html;
  }
}

function selectSize(size, element) {
  const allBtns = document.querySelectorAll(".size-btn");
  for (let i = 0; i < allBtns.length; i++) {
    allBtns[i].classList.remove("active");
  }
  element.classList.add("active");
  selectedSize = size;
}

function addToCartFromDetail() {
  if (!currentProduct) return;

  let swatchColor = "#ccc";
  if (currentProduct.detail && currentProduct.detail.swatches) {
    swatchColor = currentProduct.detail.swatches[selectedSwatch].color;
  }

  /* check if same product + size already in cart */
  let existing = null;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === currentProduct.id && cart[i].size === selectedSize) {
      existing = cart[i];
    }
  }

  if (existing) {
    existing.quantity = existing.quantity + 1;
  } else {
    cart.push({
      id:       currentProduct.id,
      name:     currentProduct.name,
      price:    currentProduct.price,
      quantity: 1,
      size:     selectedSize,
      color:    swatchColor
    });
  }

  updateCartBadge();
  renderCartItems();
  openCartDrawer();
}

/* checkout */
function renderCheckoutSummary() {
  const container = document.getElementById("checkout-summary-items");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = "<p>No items in cart.</p>";
    setEl("summary-subtotal", "$0.00 AUD");
    setEl("summary-total", "$0.00 AUD");
    return;
  }

  let html = "";
  let subtotal = 0;

  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    const itemTotal = item.price * item.quantity;
    subtotal = subtotal + itemTotal;

    html = html +
      "<div class='summary-item'>" +
      "<div class='summary-item__img' style='background:" + item.color + ";'>" +
        "<span class='summary-item__qty-badge'>" + item.quantity + "</span>" +
        "</div>" +
        "<div class='summary-item__details'>" +
        "<p class='summary-item__name'>" + item.name + "</p>" +
        "<p class='summary-item__sub'>$" + item.price.toFixed(2) + " AUD · " + item.size + " · Pre-order</p>" +
      "</div>" +
      "<p class='summary-item__price'>$" + itemTotal.toFixed(2) + "</p>" +
      "</div>";
  }

  container.innerHTML = html;
  setElement("summary-subtotal", "$" + subtotal.toFixed(2) + " AUD");
  setElement("summary-total", "$" + subtotal.toFixed(2) + " AUD");
}

function placeOrder() {
  cart = [];
  updateCartBadge();
  goto("confirm");
}









/* helpers */
function updateText(id, value) {
const element = document.getElementById(id);
  if(element) {
    element.innerHTML = value;
  }
}

function setEl(id, value) {
const element= document.getElementById(id);
  if(element) {
    element.textContent = value;
  }
}