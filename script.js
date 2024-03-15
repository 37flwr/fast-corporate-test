window.onload = function () {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", "https://veryfast.io/t/front_test_api.php", true);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.state === "ok") {
        displayData(response.result);
      } else {
        displayError();
      }
    }
  };

  xhr.send();
};

function displayData(data) {
  var container = document.getElementById("content_cards");
  container.innerHTML = "";

  data.elements.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "content__card";

    const bg = document.createElement("div");
    bg.classList = "content__card_bg";
    productCard.appendChild(bg);

    const body = document.createElement("div");
    body.className = "content__card_body";

    const priceDiv = document.createElement("div");
    priceDiv.className = "content__card__price";

    const priceTextEl = document.createElement("div");
    priceTextEl.className = "content__card__price__text";

    if (product["amount_html"]) {
      const prices = product["amount_html"]
        .split("</strong>")[0]
        .split("</strike>");
      const previousPrice = prices[0];
      const discountPrice = prices[1];

      priceTextEl.innerHTML = `${discountPrice}${
        product["license_name"].includes("Monthly")
          ? `<span class="content__card__price__text_sm">/MO</span>`
          : `<span class="content__card__price__text_sm">/PER YEAR</span>`
      }<strike class="content__card__price__text__discount">${previousPrice}</strike>`;
    } else {
      priceTextEl.innerHTML = `$${product.amount}${
        product["license_name"].includes("Monthly")
          ? `<span class="content__card__price__text_sm">/MO</span>`
          : `<span class="content__card__price__text_sm">/PER YEAR</span>`
      }`;
    }
    priceDiv.appendChild(priceTextEl);

    if (product["is_best"]) {
      const isBestEl = document.createElement("div");
      isBestEl.className = "content__card__price__is-best";
      isBestEl.textContent = "Best value";
      priceDiv.appendChild(isBestEl);
    }

    if (product["price_key"] === "50%") {
      const discountEl = document.createElement("div");
      discountEl.className = "content__card__price__discount";
      discountEl.innerHTML = `<img src="public/50OFF.svg" alt="" />`;
      priceDiv.appendChild(discountEl);
    }

    body.appendChild(priceDiv);

    const textGroupEl = document.createElement("div");
    textGroupEl.className = "content__card__text";

    const textTitle = document.createElement("span");
    textTitle.className = "content__card__text__title";
    textTitle.textContent = product["name_prod"];
    textGroupEl.appendChild(textTitle);

    const textTime = document.createElement("span");
    textTime.className = "content__card__text__time";
    textTime.textContent = product["license_name"];
    textGroupEl.appendChild(textTime);

    body.appendChild(textGroupEl);

    const button = document.createElement("button");
    button.className = "content__card__button";

    const buttonText = document.createElement("span");
    buttonText.className = "content__card__button__text";
    buttonText.textContent = "Download";

    button.appendChild(buttonText);

    const buttonIcon = document.createElement("img");
    buttonIcon.src = "public/button_icon.svg";
    buttonIcon.className = "content__card__button__icon";

    button.appendChild(buttonIcon);

    button.onclick = () => downloadFile(product.link);

    body.appendChild(button);

    productCard.appendChild(body);

    container.appendChild(productCard);
  });
}

function displayError() {
  var contentDiv = document.getElementById("content");
  contentDiv.innerHTML = `<span>Error</span>`;
}

function downloadFile(link) {
  var linkElement = document.createElement("a");

  linkElement.href = link;

  linkElement.click();

  setTimeout(() => {
    displayArrowBasedOnBrowser();
  }, 1500);
}

function displayArrowBasedOnBrowser() {
  const rootElement = document.getElementById("root");
  if (navigator.userAgent.indexOf("Firefox") != -1) {
    const arrow = document.createElement("img");
    arrow.src = "public/icon_download_firefox.svg";
    arrow.className = "download-arrow_firefox";
    rootElement.appendChild(arrow);
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    const arrow = document.createElement("img");
    arrow.src = "public/icon_download_chrome.svg";
    arrow.className = "download-arrow_chrome";
    rootElement.appendChild(arrow);
  } else {
    console.warn("This browser is neither Firefox nor Chrome.");
    const arrow = document.createElement("img");
    arrow.src = "public/icon_download_firefox.svg";
    arrow.className = "download-arrow_firefox";
    rootElement.appendChild(arrow);
  }
}
