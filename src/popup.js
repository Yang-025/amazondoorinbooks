document.getElementById("looklook_turnon").addEventListener("click", turnOn);
document.getElementById("looklook_turnoff").addEventListener("click", turnOff);

function handleToggle(toggle) {
  let wrapper = document.querySelectorAll(".looklook-wrapper");
  // console.log("turn toggle", toggle);
  if (toggle) {
    wrapper.forEach(i => i.style.display ='flex')
  } else {
    wrapper.forEach((i) => (i.style.display = "none"));

  }
}

function turnOn() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: handleToggle,
      args: [true],
    });
  });
}

function turnOff() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: handleToggle,
      args: [false],
    });
  });
}
