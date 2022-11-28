cards = [];

function init() {
  container = document.querySelector("#card-container");
  container.innerHTML = "";

  let newcardbtn = document.createElement("div");
  newcardbtn.innerHTML = "New Card";
  newcardbtn.className = "card new";
  newcardbtn.onclick = function () {
    cards.push({
      title: "Title",
      description: "description",
      image: "https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    });
    init();
  };

  container.append(newcardbtn);

  for (let c = 0; c < cards.length; c++) {
    let card = document.createElement("div");
    card.className = "card";

    // image
    let card_image = document.createElement("img");
    card_image.src = cards[c].image
    card_image.className = "image";

    let card_details = document.createElement("div");
    card_details.className = 'details'

    // title
    let card_title = document.createElement("div");
    card_title.innerHTML = cards[c].title;
    card_title.className = "title";
    card_title.oninput = function () {
      cards[c].description = this.innerHTML;
    };

    // description
    let card_description = document.createElement("div");
    card_description.innerHTML = cards[c].description;
    card_description.className = "description";
    card_description.oninput = function () {
      cards[c].description = this.innerHTML;
    };

    card.append(card_image);
    card_details.append(card_title);
    card_details.append(card_description);
    card.append(card_details)
    container.append(card);
  }
}

init();
