function openCartDrawer() {
    document.getElementById("cart-overlay").classList.add("open");

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


}

/*data*/

const PRODUCTS= [
{
    id: 2, 
    name: "HOUND COMPRESSION",
    price: 64,
    currency: "AUD",
    color: "#232325",
    img: "two.pg"
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
        {color: "#232325", label: "Onyx Black"},
        {color: "#232325", label: "Onyx Black"},
        {color: "#232325", label: "Onyx Black"}

        ];

        
    


    },











},






];
