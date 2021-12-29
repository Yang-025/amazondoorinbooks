// const setIcon = await new chrome.declarativeContent.SetIcon({
//   path: {
//     32: "images/disabled.png",
//   },
// });

chrome.runtime.onInstalled.addListener(() => {
  // Page actions are disabled by default and enabled on select tabs
  chrome.action.disable();
  // chrome.action.setBadgeBackgroundColor({ color: [218, 64, 22, 255] });

  // Clear all rules to ensure only our expected rules are set
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    // Declare a rule to enable the action on example.com pages
    let exampleRule = {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostSuffix: "books.com.tw" },
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostSuffix: "kobo.com" },
        }),
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostSuffix: "readmoo.com" },
        }),
      ],
      actions: [new chrome.declarativeContent.ShowAction()],
    };

    // Finally, apply our new array of rules
    let rules = [exampleRule];
    chrome.declarativeContent.onPageChanged.addRules(rules);
  });
});

// 訪問博客來
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab, error) => {
  if (
    changeInfo.status == "complete" &&
    tab.status == "complete" &&
    /^http.*\.books\.com.*/.test(tab.url)
  ) {
    await chrome.scripting.insertCSS({
      target: {
        tabId: tab.id,
      },
      files: ["main.css"],
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["scripts/main.js"],
    });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["scripts/books.js"],
    });
  }
});

// 訪問kobo
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab, error) => {
  if (
    changeInfo.status == "complete" &&
    tab.status == "complete" &&
    /^http.*\.kobo\.com.*/.test(tab.url)
  ) {
    await chrome.scripting.insertCSS({
      target: {
        tabId: tab.id,
      },
      files: ["main.css"],
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["scripts/main.js"],
    });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["scripts/kobo.js"],
    });
  }
});

// 訪問readmoo
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab, error) => {
  if (
    changeInfo.status == "complete" &&
    tab.status == "complete" &&
    /^http.*readmoo\.com.*/.test(tab.url)
  ) {
    await chrome.scripting.insertCSS({
      target: {
        tabId: tab.id,
      },
      files: ["main.css"],
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["scripts/main.js"],
    });

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["scripts/readmoo.js"],
    });
  }
});

// chrome.tabs.onActivated.addListener(function (activeInfo) {
//   // how to fetch tab url using activeInfo.tabid
//   chrome.tabs.get(activeInfo.tabId, async function (tab) {
//     console.log("0005", activeInfo);
//     console.log("0006", tab);
//   });
// });
