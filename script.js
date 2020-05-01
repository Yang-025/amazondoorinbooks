/**
 * 如果有英文書名，就在下方加上一個連結，連結點下去可以搜尋amazon的資訊
 */
function addAmazonSearch() {
  const bookTitleSection = document.querySelector('.type02_p002')
  if (!bookTitleSection) {
    return false;
  }
  const enTitle = bookTitleSection.querySelector('h2 > a').textContent
  console.log('bookTitleSection', bookTitleSection);
  console.log('enTitle', enTitle);

  if (!enTitle) {
    return false;
  }

  const baseAmazonUrl = `https://www.amazon.com/s?k=${enTitle}&i=stripbooks-intl-ship`

  const amazonSearchSection = document.createElement("h2");
  amazonSearchSection.classList.add("amazon-search");
  amazonSearchSection.id = "amazon-search"
  const amazonSearch = document.createElement("a");
  amazonSearch.innerHTML = "Amazon任意門";
  amazonSearch.setAttribute("href", baseAmazonUrl);
  amazonSearch.setAttribute("target", "_blank");

  amazonSearchSection.appendChild(amazonSearch)
  bookTitleSection.appendChild(amazonSearchSection)

}


addAmazonSearch()