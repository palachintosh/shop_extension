function setTokenInStorage() {
    var token = document.getElementById("mainToken").value;
    // var get_btn = document.getElementById("setTokenBtn");


    chrome.storage.local.set({
        token: token,
    });

    chrome.storage.local.get(['token'], function (items) {
        var msg = items.token;
        document.querySelector("h3").innerText = "Token has been added successfully!";
    }
    );
}

var get_btn = document.getElementById("setTokenBtn");
get_btn.addEventListener('click', setTokenInStorage);