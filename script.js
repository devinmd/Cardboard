var cards = [];
var tags = {};

function init() {
  tags = {};
  container = document.querySelector("#card-container");
  container.innerHTML = "";

  let newcardcontainer = createElement("div", { id: "newcardcontainer" });
  let d = new Date();

  // image
  let newcardimage = createElement("input", { type: "file" });

  newcardimage.addEventListener("change", function (event) {
    if (event.target.files.length > 0) {
      var src = URL.createObjectURL(event.target.files[0]);
      newcardimagedisplay.src = src;
    }
  });

  // image display
  let newcardimagedisplay = createElement("img", { id: "newcardimagedisplay" });

  // add new card
  let addnewcard = createElement("button", { innerhtml: "Add Card" });
  addnewcard.onclick = function () {
    if (newcardimagedisplay.src != "") {
      cards.unshift({
        text: newcardtext.value,
        description: newcarddescription.value,
        image: newcardimagedisplay.src,
        datecreated: d.getTime(),
        starred: false,
        url: "",
        tags: newcardtags.value.split(" "),
      });
      init();
      handleTags()
    }
  };

  // tags
  let newcardtags = createElement("input", { type: "text", placeholder: "Tags" });
  newcardtags.onkeydown = function (e) {
    if (e.code == "Enter") {
      addnewcard.click();
    }
  };

  // description
  let newcarddescription = createElement("input", { type: "text", placeholder: "Description" });
  newcarddescription.onkeydown = function (e) {
    if (e.code == "Enter") {
      newcardtags.focus();
    }
  };

  // text
  let newcardtext = createElement("input", { type: "text", placeholder: "Text" });
  newcardtext.onkeydown = function (e) {
    if (e.code == "Enter") {
      newcarddescription.focus();
    }
  };

  newcardcontainer.append(newcardimage);
  newcardcontainer.append(newcardimagedisplay);
  newcardcontainer.append(newcardtext);
  newcardcontainer.append(newcarddescription);
  newcardcontainer.append(newcardtags);
  newcardcontainer.append(addnewcard);
  container.append(newcardcontainer);

  for (let c = 0; c < cards.length; c++) {
    // card
    let card = createElement("div", { class: "card" });

    // image
    let card_image = createElement("img", { class: "image", src: cards[c].image });

    // text
    let card_text = createElement("div", { class: "text", innerhtml: cards[c].text });
    card_text.oninput = function () {
      cards[c].description = this.innerHTML;
    };

    // description
    let card_description = createElement("div", { class: "description", innerhtml: cards[c].description });
    card_description.oninput = function () {
      cards[c].description = this.innerHTML;
    };

    // tags
    let card_tags = createElement("div", { class: "tags" });
    for (let t = 0; t < cards[c].tags.length; t++) {
      // for each tag
      let tag = createElement("div", { class: "tag", innerhtml: cards[c].tags[t] });
      // append element
      card_tags.append(tag);

      if (tags[cards[c].tags[t]] == null) {
        // tag is not already tags list
        tags[cards[c].tags[t]] = 1;
      } else {
        tags[cards[c].tags[t]] += 1;
      }
    }

    card.append(card_image);
    card.append(card_text);
    card.append(card_description);
    card.append(card_tags);

    container.append(card);
  }
}

init();

// get pasted image
document.onpaste = function (pasteEvent) {
  // consider the first item (can be easily extended for multiple items)
  var item = pasteEvent.clipboardData.items[0];

  if (item.type.indexOf("image") === 0) {
    var blob = item.getAsFile();

    var reader = new FileReader();
    reader.onload = function (event) {
      document.getElementById("newcardimagedisplay").src = event.target.result;
    };

    reader.readAsDataURL(blob);
  }
};



function handleTags(){
  document.querySelector('#tags-list').innerHTML = ''
  for(let t = 0; t < Object.keys(tags).length; t++){
    // for each tag
    console.log("'"+ Object.keys(tags)[t] + "': " +tags[Object.keys(tags)[t]])
    let tagbtn = createElement('button', {class: 'tag'})
    let tagtext = createElement('p', {class: 'text',innerhtml: `${Object.keys(tags)[t]} `})
    let tagcount = createElement('p', {class: 'count',innerhtml: `${tags[Object.keys(tags)[t]]}`})
    tagbtn.append(tagtext)
    tagbtn.append(tagcount)

    document.querySelector('#tags-list').append(tagbtn)
  }
}

// create element
function createElement(type, params) {
  let elem = document.createElement(type);

  if (params.innerhtml) {
    elem.innerHTML = params.innerhtml;
  }
  if (params.value) {
    elem.value = params.value;
  }
  if (params.placeholder) {
    elem.placeholder = params.placeholder;
  }
  if (params.src) {
    elem.src = params.src;
  }
  if (params.class) {
    elem.className = params.class;
  }
  if (params.contenteditable) {
    elem.contentEditable = params.contenteditable;
    elem.spellcheck = false;
  }
  if (params.type) {
    elem.type = params.type;
  }
  if (params.href) {
    elem.href = params.href;
    elem.target = "_blank";
  }
  if (params.disabled) {
    elem.disabled = params.disabled;
  }
  if (params.title) {
    elem.title = params.title;
  }
  if (params.backgroundimage) {
    elem.style.backgroundImage = params.backgroundimage;
  }

  if (params.id) {
    elem.id = params.id;
  }

  return elem;
}
