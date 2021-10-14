function amazonSearchButton(enTitle) {
  if (!enTitle) {
    return false;
  }
  const baseAmazonUrl = `https://www.amazon.com/s?k=${enTitle}&i=stripbooks-intl-ship`;
  const amazonSearchSection = document.createElement("div");
  amazonSearchSection.classList.add("looklook-btn-search");
  amazonSearchSection.id = "amazon-search";
  amazonSearchSection.innerHTML = "Amazon";
  amazonSearchSection.onclick = function () {
    const win = window.open(baseAmazonUrl, "_blank");
    if (win) {
      win.focus();
    } else {
      alert("Please allow popups for this website");
    }
  };
  return amazonSearchSection;
}

function booksSearchButton(title) {
  if (!title) {
    return false;
  }
  const baseBooksUrl = `https://search.books.com.tw/search/query/key/${title}/cat/all`;
  const booksSearchSection = document.createElement("div");
  booksSearchSection.classList.add("looklook-btn-search");
  booksSearchSection.id = "books-search";
  booksSearchSection.innerHTML = "博客來";
  booksSearchSection.onclick = function () {
    const win = window.open(baseBooksUrl, "_blank");
    if (win) {
      win.focus();
    } else {
      alert("Please allow popups for this website");
    }
  };
  return booksSearchSection;
}

function koboSearchButton(title) {
  const basekoboUrl = `https://www.kobo.com/tw/zh/search?query=${title}`;
  const koboSearchSection = document.createElement("div");
  koboSearchSection.classList.add("looklook-btn-search");
  koboSearchSection.id = "kobo-search";
  koboSearchSection.innerHTML = "kobo";
  koboSearchSection.onclick = function () {
    const win = window.open(basekoboUrl, "_blank");
    if (win) {
      win.focus();
    } else {
      alert("Please allow popups for this website");
    }
  };
  return koboSearchSection;
}

function addButton(wrapper, tagType, title) {
  if (!title || !wrapper) {
    return;
  }
  if (tagType === "amazon") {
    const amazonBtnElement = amazonSearchButton(title);
    wrapper.appendChild(amazonBtnElement);
  }
  if (tagType === "books") {
    const booksBtnElement = booksSearchButton(title);
    wrapper.appendChild(booksBtnElement);
  }
  if (tagType === "kobo") {
    const koboBtnElement = koboSearchButton(title);
    wrapper.appendChild(koboBtnElement);
  }
}

/**
 * 如果有英文書名，就在下方加上一個連結，連結點下去可以搜尋amazon的資訊
 */
function addAmazonSearch(bookstore) {
  let bookTitleSection;
  let title;
  let enTitle;
  let tagList = ["amazon", "books", "kobo"];
  if (bookstore === "books") {
    tagList = tagList.filter((x) => x !== "books");
    bookTitleSection = document.querySelector(".type02_p002");
    if (!bookTitleSection) {
      return false;
    }
    let titleElement = bookTitleSection.querySelector("h1");
    if (titleElement) {
      title = titleElement.textContent;
    }
    let enTitleElement = bookTitleSection.querySelector("h2 > a");
    if (enTitleElement) {
      enTitle = enTitleElement.textContent;
    }
  }

  if (bookstore === "kobo") {
    tagList = tagList.filter((x) => x !== "kobo");
    bookTitleSection = document.querySelector(".item-info");
    if (!bookTitleSection) {
      return false;
    }
    let titleElement = bookTitleSection.querySelector(".title.product-field");
    if (titleElement) {
      title = titleElement.textContent;
    }
    let enTitleElement = bookTitleSection.querySelector(
      ".subtitle.product-field"
    );
    if (enTitleElement) {
      enTitle = enTitleElement.textContent;
    }
  }

  const wrapper = document.createElement("div");
  wrapper.className = "looklook-wrapper";
  tagList.forEach((tagType) => {
    console.log('tagType, enTitle', tagType, enTitle)
    if (tagType === "amazon") {
      addButton(wrapper, tagType, enTitle);
    } else {
      addButton(wrapper, tagType, title);
    }
  });
  if (bookTitleSection) {
    bookTitleSection.appendChild(wrapper);
  }
}


