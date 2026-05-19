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