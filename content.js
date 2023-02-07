/*
    ⠀⠀⠀⠀⠀⠀⠀⡀ ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠿⢿⣦
   ⠀⠀⠀⠀⠀⠀⠀⢸⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⡁⢀⣼⠟
   ⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⠿⠋⠁
   ⠀⠀⠀⠀⠀⠀⣸⣿⣿⡏⣿⣷⣦⣤⣤⣀⡀⠀⠀⠀⢀⣠⣾⡿⠛⠁
   ⠀⠀⠀⠀⣠⣴⣿⣿⡿⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏
   ⠀⠀⣠⣾⣿⣿⣿⠟⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
   ⠀⣰⣿⣿⡿⠟⠃⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡀
   ⢰⣿⣿⡟⠁⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣧
   ⣿⣿⡟⠀⠀⠀⠀⠀⠸⠿⠿⠿⠟⠋⠁⠈⢿⣿⣿⣿⣿⣿⣿⡆
   ⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⡇⣿
   ⢻⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⠏
   ⠀⢻⣷⡀⠀⠀⠀⠀⣰⣾⡀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⠏
   ⢠⣾⠿⢿⣆⡀⠀⢠⣿⣿⣷⡄⠀⠀⠀⢀⣼⣿⣿⣿⡿⠋
   ⠈⠻⣦⡀⢹⣿⣦⣼⣿⣿⣿⣿⣶⣤⣴⣿⣿⣿⡿⠟⠁
   ⠀⠀⠈⠻⠿⠋⠉⠛⠿⢿⣿⣿⣿⣿⡿⠟⠛⠉
*/
  
//   palachintosh.com and 3gravity.com


// Create token var, for setup API token in storage
// Then token is stored in storage and get it when script works
var token = null;

function readToken() {
    chrome.storage.local.get(['token'], function (items) {
        token = items.token;
    });
}

// Read token from storage
readToken();



var interval;
var getBodyBlock = document.getElementsByTagName('body')[0];
var alert_div = document.createElement('div');
var glob_code = null;

alert_div.innerHTML = '<div class="alert-message"><div class="message-container">\
<span><h1></h1></span>\
<div class="inner-buttons">\
<button id="btnYes" class="ant-btn ant-btn-danger">Potwierdzam!</button>\
<button id="btnReserve" class="ant-btn ant-btn-danger">Usuń z rezerwacji</button>\
<button id="btnNo" class="ant-btn ant-btn-success">Zamknij</button>\
</div></div></div>';
loader = document.createElement('div');
loader.setAttribute("class", "loader");

getBodyBlock.appendChild(alert_div);
getBodyBlock.prepend(loader);

var loader_block = document.querySelector('.loader');



// Main interval
// It is possible to define needed pages with interval help.
// If href string contains one of const values do something. 
// Action depends on founded values
function main_interval() {
    clearInterval(interval);
    
    // Start interval
    interval = setInterval(function () {
        href = window.location.href
        

        // Check if href parameter contains one of parts "https://24.kross.pl/warranty/new" or "id_product="
        // If true - user just has opened the needed page inside kross.pl or 3gravity.pl
        if (href.indexOf('https://24.kross.pl/warranty/new') >= 0 ||
            href.indexOf('id_product=') >= 0) {
            
            // Start prestaCheck() function if href contains id_product.
            // It means that the function prestaCheck() will be called only when user
            // will open products page in prestashop admin-panel
            if (href.indexOf('id_product=') >= 0) {
                prestaCheck();
                clearInterval(interval);
            }
        }

        // Start select_orders() function if href contains AdminOrders
        if (href.indexOf('AdminOrders') >= 0) {
            select_orders();
            clearInterval(interval);
        }

        // Start check_all() function if href contains "https://24.kross.pl/bike-overview/new" part
        // Function to automatically check all checkboxes in the list
        if (href.indexOf('https://24.kross.pl/bike-overview/new') >= 0) {
            clearInterval(interval);
            check_all();
        }

        // Start get_buttons() and all other functions if href contanins "https://24.kross.pl/warranties"
        if (href.indexOf('https://24.kross.pl/warranties') >= 0) {
            clearInterval(interval);
            // Try to get "Send buttons"
            new_warranty_btn = document.querySelector("#app > div > div.ant-spin-nested-loading > div > div > section > div > main > div > div.page-header.stickyTop > div");
            
            // Try to add our own handlers on existing buttons
            $(new_warranty_btn).on('click', 'button', function() {
                get_buttons();
            });
        }

    }, 1000);
}

// Just for scale font on the b2b.kross
// Function lanching main_interval() at once
font_change();


function font_change() {
    //html font size
    var DOCHtml = document.querySelector('html');
    $(DOCHtml).css("font-size", ".69vw");

    // styles for all inputs
    var all_par = DOCHtml.querySelectorAll('input');
    for (elem of all_par) {
        $(elem).css("font-size", "1.4rem");
    }

    main_interval();
    get_buttons();
}

// If buttons exists - stop interval and wait for clicks and other actions
function get_buttons() {
        get_bottom_btn = 
        document.querySelector("#app > div > div.ant-spin-nested-loading > div > div > section > div > main > div > section");

        // get top btn
        get_top_btn =
            document.querySelector("#app > div > div.ant-spin-nested-loading > div > div > section > div > main > div > form > div.page-header.stickyTop > div.page-list-actions");


    if (get_bottom_btn != null && get_top_btn != null) {
        clearInterval(interval);
    }

    else {
        setTimeout(function() {
            get_buttons();
        }, 400);
    }
}


// onclick or enter events
// Launch form data collector after pressing enter (b2b.kross law)
$(getBodyBlock).on('keypress', 'input', function (e) {
    if (e.which == 13) {
        href = window.location.href;
        // Check where we are and put handlers on send buttons
        if (href.indexOf('https://24.kross.pl/warranty/new') >= 0) {
            font_change();
            getFormData();

            // Try to add new warranty card with standard button, but new handler will launch getFormData() too
            $(get_top_btn).on('click', 'button', function () {
                getFormData();
            });
            
            // The same handler
            $(get_bottom_btn).on('click', 'button', function () {
                getFormData();
            });
        }
    }
});



// onclick or enter events
// Data collector. If "sku" field exists and contains value than create code var and send data 
 function getFormData() {
    var getForm = document.forms[0];

    if (getForm != null) {
        if (getForm.hasChildNodes("sku") && getForm.sku != null){
            var code = String(getForm.sku.value);
        }

        // Create alert msg
        if (getForm.hasChildNodes("bike_model") && getForm.bike_model != null) {
            edit_msg = document.querySelector(".message-container > span > h1");
            edit_msg.innerText = "Rower " + String(getForm.bike_model.value) + " zostanie usunięty ze stanów!";
        }

        // If code and form exists - send data
        if (code != null && getForm.serial_number != null) {
            glob_code = code;
            sendRequest(code);
        }
    }
}

// Handling returned data
function response_validator (resp_txt) {
    if (resp_txt != null) {
        if (resp_txt.typeError != null) {
            alert(resp_txt.typeError);
        }

        // If product was deleted with success
        if (resp_txt.success != null) {
            alert(resp_txt.success + "! Rower został usunięty z magazynu SHOP!");
        }

        // If some errors or warnings returned
        if (resp_txt.error != null) {
            // If it was last product on the stocks
            if (resp_txt.error.indexOf("equal 0") >= 0) {
                alert("UWAGA: od teraz wybranego produktu nie ma na stanach!");
            }
            
            // If product was deleted from stocks but stole on warehouses
            if (resp_txt.error.indexOf("less than") >= 0) {
                alert("BŁĄD: Produkt został zdjęty ze stanów ale wciąż istnieje na magazynie!");
            }
        }

        // Other warnings, like products doesn't exists, quantity less then zero etc.
        if (resp_txt.Warning != null) {
            alert(resp_txt.Warning);
        }
    }

    // If code is undefined on stocks or connection between 3gravity-palachintosh.com lost
    else {
        alert("BŁĄD: musisz zaktualizować stany produktu ręcznie!" +
        "Wygląda na to, że wybrany product nie istnieje w sklepie!");
    }

    // Hide custom dialog
    loader_block.style.display = "none";

    //Launch main interval again. For example, need to add new warranty card without close b2b.kross.pl
    main_interval();
}


// Information is structured here
// Will be created URL with params such as token, sku code, phone number if was gave and r_token == sku token


// Change it to POST in future
function sendGET(phone_number=null) {
    // Need to remove reservation on product if it exists
    if (phone_number != null) {
        var request_url = "https://palachintosh.com/bikes_monitoring/kross_api/" + "?code=" + glob_code +
        "&phone_number=" + phone_number +
        "&r_check=1" +
        "&token=" + token +
        "&r_token=" + Math.random().toString();
    }

    // If phone number wasn't given 
    else {
        var request_url = "https://palachintosh.com/bikes_monitoring/kross_api/" + "?code=" + glob_code +
    "&token=" + token +
    "&r_token=" + Math.random().toString();
    }
    
    // Create XMLHttRequest object
    let xhttp = new XMLHttpRequest();
    xhttp.responseType = "json";
    xhttp.open("GET", request_url, true);
    xhttp.onload = function() {
        var resp_txt = this.response;
        response_validator(resp_txt);

        return null;
    };

    // Send it with CORS
    xhttp.setRequestHeader('Access-Control-Allow-Origin', "https://24.kross.pl");
    xhttp.send();

}

// reset xhttp var
xhttp = null;

// If code is not eq. null hide dialog
function sendRequest(code) {
    if (code != null) {
        loader_block.style.display = "block";

        get_alert_div = document.getElementsByClassName('alert-message')[0];
        $(get_alert_div).css('display', 'block');
        loader_block.style.display = "block";
    }
}

// Custom handlers for dialog buttons
$('#btnNo').on('click', function () {
    $(get_alert_div).css('display', 'none');
    loader_block.style.display = "none";
    main_interval();
});

$('#btnYes').on('click', function () {
    sendGET();
    $(get_alert_div).css('display', 'none');
});

$('#btnReserve').on('click', function () {
    phone_number = prompt("Numer telefonu klienta: ");
    sendGET(phone_number);
    $(get_alert_div).css('display', 'none');
});


/* 
    // PrestaShop extension > 
*/

// Init stocks with extension help
function initStocks(combs) {
    // Add button "Init all" in on "Ilości" tab
    footer_selector = document.querySelector("#product-quantities > div.panel-footer")
    init_button_iner = document.createElement('div');
    init_button_iner.innerHTML = 'Init All';
    init_button_iner.className = "btn btn-default pull-right update-ico";
    init_button_iner.id = "initButton";

    if (footer_selector != null) {
        footer_selector.appendChild(init_button_iner);
        get_init_button = document.querySelector("#initButton");
        
        // And set the custom handler
        $(get_init_button).on('click', '', function() {
            comb_list = null;
            initStockRequest();
        });
    }
    else {
        // Page loading time
        setTimeout(function() {initStocks()}, 800);
    }


    // Forming and send request. Just showing alert msg with success or error
    function initStockRequest() {
        product_id_input = document.querySelector('input[name=id_product]');
        id_product = product_id_input.value
        comb_list = `[${String(combs)}]`
        
        init_data = new FormData();
        init_data.append('token', token);
        init_data.append('product_id', id_product);
        // Comb list is just string like [1,2,3,4] that will be parsed with json loads in backend and represent list of combinations
        init_data.append('comb_list', comb_list); 

        // End point
        request_init_url = "https://palachintosh.com/bikes_monitoring/presta_extension/stock_init/"


        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var resp_text = xhttp.response;

                if (resp_text.success != null) {
                    success_response = resp_text.success;
                    alert(success_response.success);
                }

                if (resp_text.error != null ) {
                    error_response = resp_text.erorr
                    alert(error_response);
                }
            }
        }

        xhttp.responseType = "json";
        xhttp.open("POST", request_init_url, true);
        // CORS
        xhttp.setRequestHeader('Access-Control-Allow-Origin', "https://3gravity.pl");
        xhttp.send(init_data);
    }
}


function prestaCheck() {
    var quantity_loc = null;
    var quantity_txt = null;
    var combinations_values = '';
    var combs = [];

    quantity_loc = document.querySelectorAll(".available_quantity");
    $(quantity_loc).on('click', '#reserveBtn', function () {
        comb_name = this.name;
        // Set comb_id value in form
        reserve_form = document.querySelector('#reserveForm');
        reserve_form.elements.reserve_comb_id.value = comb_name;

        get_reserve_block = document.querySelector("#reserveBlock");
        $(get_reserve_block).css("display", "block");
    });


    // Get stocks for product
    function getStocks(combination) {
        request_link = "https://palachintosh.com/bikes_monitoring/presta_extension/?" + combination +
        "&token=" + token;
        var warehouses_real;
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var resp_txt = xhttp.response;

                if (resp_txt.success != null) {
                    success_response = resp_txt.success;
 
                    if (success_response[combination] != null ) {
                        warehouses_real = success_response[combination];
                        setValue(warehouses_real);

                        return warehouses_real;
                    }
                }
            }
        }
        
        xhttp.responseType = "json";
        xhttp.open("GET", request_link, true);
        xhttp.setRequestHeader('Access-Control-Allow-Origin', "https://3gravity.pl");
        xhttp.send();
    }


    // Send reservation and checking response
    function make_reservation(form_data) {
        request_reserve_url = "https://palachintosh.com/bikes_monitoring/presta_extension/reserve/";

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var resp_text = xhttp.response;

                if (resp_text.success != null) {
                    success_response = resp_text.success;
                    alert(success_response.success);
                }

                if (resp_text.error != null ) {
                    error_response = resp_text.erorr
                    alert(error_response);
                }

                if (resp_text.Warning != null ) {
                    error_response = resp_text.Warning
                    alert(error_response);
                }
                
                location.reload(); // Updating page
            }
        }

        xhttp.responseType = "json";
        xhttp.open("POST", request_reserve_url, true);
        // CORS
        xhttp.setRequestHeader('Access-Control-Allow-Origin', "https://3gravity.pl");
        xhttp.send(form_data);
        
        return true;
    }

    // If we need to cancle reservation
    function cancel_reserve(comb_name_and_phone) {
        comb_id = comb_name_and_phone.split("+")[0];
        phone_number = comb_name_and_phone.split("+")[1];
        
        alert("Canceled! " + comb_id + phone_number);
        form_data = new FormData();
        form_data.append("comb_id", comb_id);
        form_data.append("phone_number", phone_number);
        form_data.append("active_stamp", "0");
        form_data.append("off_time", '');
        form_data.append("reference", '');
        form_data.append("token", token);

        make_reservation(form_data);
    }



    // Set values in combinations
    // After getting values with reservations set in in their places
    function set_all_reserved(reserve_response) {
        //reservations handnler
        if (reserve_response != undefined) {
            actives_dict = reserve_response.actives

            if (actives_dict == "null") {
                return null;
            }
            
            quantity_loc = document.querySelectorAll(".available_quantity");

            for (quantity_block of quantity_loc) {
                presta_comb_id = quantity_block.id.slice(4);

                if (presta_comb_id in actives_dict) {
                    get_reserve_button = quantity_block.querySelector(`a[name="${presta_comb_id}"]`);
                    get_reserve_ul = document.querySelector("#discardReserveUl");
                    $(get_reserve_button).css("background-color", "deeppink");
                    
                    for (actives_reserve of actives_dict[presta_comb_id]) {
                        create_li = document.createElement("li");
                        create_li.setAttribute("name", presta_comb_id.toString());
                        create_li.innerHTML = `<span>${actives_reserve[0]}</span> \ 
                        <span>${actives_reserve[1]}</span> \
                        <span>${actives_reserve[2]}</span> \
                        <span>${actives_reserve[5]}</span> \
                        <a id="cancelReserveBtn" name="${presta_comb_id}+${actives_reserve[2]}">Cofnij</a>`;

                        get_reserve_ul.append(create_li);
                    }

                }
            }

            discard_btn = document.querySelectorAll("#discardReserveUl > li");

            $(discard_btn).on('click', '#cancelReserveBtn', function() {
                comb_name_and_phone = this.name;
                cancel_r = cancel_reserve(comb_name_and_phone);
            });

        }
    }

    // Getting all reservations for one product
    function get_all_reserved() {
        reserve_get_all_url = "https://palachintosh.com/bikes_monitoring/presta_extension/reserve/get_all/?" +
        "comb_list=[" + combs + "]" +
        "&token=" + token;

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var resp_text = xhttp.response;
                set_all_reserved(resp_text);
            }
        }

        xhttp.responseType = "json";
        xhttp.open("GET", reserve_get_all_url, true);
        xhttp.setRequestHeader('Access-Control-Allow-Origin', "https://3gravity.pl");
        xhttp.send();
    }


    // Getting data from filled form
    function get_form_data() {
        reserve_form = document.querySelector('#reserveForm');
        reserve_block = document.querySelector('#reserveBlock');
        reserve_form.elements.reserve_comb_id.value = comb_name;
        phone_number = reserve_form.elements.phone_number.value


        form_data = new FormData();
        form_data.append("comb_id", reserve_form.elements.reserve_comb_id.value);
        form_data.append("phone_number", phone_number);
        form_data.append("active_stamp", "1");
        form_data.append("off_time", reserve_form.elements.off_time.value);
        form_data.append("reference", reserve_form.elements.reference.value);
        form_data.append("token", token);

        if(phone_number.toString().length < 13 && phone_number.toString().length > 5) {
            add_res = make_reservation(form_data);

            if(add_res === true) {
                $(reserve_block).css("display", "none");
                reserve_form.elements.phone_number.value = '';
                reserve_form.elements.reserve_comb_id.value = '';
                reserve_form.elements.off_time.value = '';
                reserve_form.elements.reference.value = '';
            }
        }
        else {
            alert("Telefon został błedbnie wpisany! Sprawdź i spróbuj jeszcze raz.");
        }
    }


    function set_equal(reserve_ul, reserve_form) {
        $(get_reserve_ul).css("display", "block");
        form_comb_name = reserve_form.elements.reserve_comb_id.value;
        counter = 0
        
        for(let reserve_ul_li of reserve_ul.childNodes) {

            if (form_comb_name != reserve_ul_li.attributes.name.nodeValue) {
                $(reserve_ul_li).css("display", "none");
                counter = 0;
            }
            else {
                counter += 1;
                $(reserve_ul_li).css("display", "block");
            }

            if (counter == 0) {
                create_h2 = document.createElement("h2");
                create_h2.setAttribute("name", presta_comb_id.toString());
                create_h2.innerHTML = "Brak rezerwacji dla wybranego produktu!";
                get_reserve_ul.append(create_h2);
                counter += 1;
            }
        }
        
    }


    // Create reservation form
    function create_reserve_form() {
        get_main_block = document.querySelector("#main");

        var reserve_block = document.createElement('div');
        reserve_block.setAttribute("id", "reserveBlock");
        reserve_block.innerHTML = '\
        <h2 class="res_form_header">Rezerwacja</h2> \
        <hr> \
        <form id="reserveForm" class="reserve_form" name="reserveform"> \
        <input name="reserve_comb_id" type="hidden" value=""> \
        <input type="text" placeholder="Telefon" class="res_input" name="phone_number"> \
        <input type="text" placeholder="Imię i Nazwisko" class="res_input" name="reference"> \
        <label>Zarezerwować na: </label> \
        <input type="text" placeholder="Np. 24" class="res_input" name="off_time"></form> \
        \
        <ul id="discardReserveUl"></ul> \
        <a id="checkAndDiscard" class="btn-check-and-d">Sprawdź dostępne</a> \
        <a id="makeReserve" class="btn-make-res">Zarezerwować!</a> \
        <a id="discardReserve" class="btn-disc-res">Zamknij</a>';
        
        get_main_block.prepend(reserve_block);

        // Geting all buttons from form and set click event for each
        discard_button = document.querySelector("#discardReserve");
        make_reserve_button = document.querySelector("#makeReserve");
        check_and_discard = document.querySelector("#checkAndDiscard");

        get_reserve_ul = document.querySelector("#discardReserveUl");
        get_res_form = document.querySelector("#reserveForm");
        

        $(check_and_discard).on('click', function() {
            $(get_res_form).css("display", "none");
            set_equal_reserves = set_equal(get_reserve_ul, get_res_form);

        });

        $(discard_button).on('click', function() {
            get_reserve_form = document.querySelector("#reserveBlock");
            $(get_res_form).css("display", "block");
            $(get_reserve_ul).css("display", "none");
            $(get_reserve_form).css("display", "none");
            
        });

        $(make_reserve_button).on('click', function() {
            get_fd = get_form_data();
            
        });

    }



    const q_interval = setInterval(function() {
        quantity_loc = document.querySelectorAll(".available_quantity");

        if (quantity_loc != null) {
            counter = 0;
            for (tr_val of quantity_loc) {
                quantity_txt = tr_val.lastElementChild;
                combination_id = tr_val.id.slice(4);
                combs.push(combination_id);

                warehouses_raw = getStocks(combination_id);

                var q_div = document.createElement('div');
                var q_reserv = document.createElement('a'); //create button reserv
                // add attributes
                q_reserv.innerText = 'Rezerwacja';
                q_reserv.setAttribute('class', 'btn btn-success');
                q_reserv.setAttribute('id', "reserveBtn");
                q_reserv.setAttribute('name', combination_id);
                q_reserv.setAttribute('value', combination_id);
                
                q_div.innerHTML = '<span class="wh-X">Józefów: -</span><span class="wh-Y">Wola: -</span><span class="wh-SHOP">Sklep: -</span>';

                tr_val.appendChild(q_reserv);
                tr_val.appendChild(q_div);

                $(this).css('display', 'inline-block');
                counter += 1;
            }

            // Create reserve form
            create_reserve_form();
            // After values were setted - get all reservations for all combs
            get_all_reserved();

            clearInterval(q_interval);
        }
    }, 800)


    // Set warehouse quantities
    function setValue(success_response) {
        if (success_response != null && success_response.x != null) {
            warehouse_tags = {"x": "Józefów", "y": "Wola", "shop": "Sklep"}
            
            for (let war_tag in warehouse_tags) {
                warehouses_raw = success_response[war_tag]["combination"];
                war_class_name = "wh-" + war_tag.toUpperCase();

                quantity_block = document.getElementById("qty_" + success_response[war_tag]["combination"]).lastElementChild;
                get_span = quantity_block.getElementsByClassName(war_class_name)[0];

                if (success_response[war_tag]["quantity"] == null) {
                    get_span.innerText = warehouse_tags[war_tag].toUpperCase() + ": 0";
                    $(get_span).css("color", "red");
                }
                else {
                    get_span.innerText = warehouse_tags[war_tag].toUpperCase() + ": " + success_response[war_tag]["quantity"];
                }
            }

        }
    }

    // If settings are complete calling
    initStocks(combs);
}


// Check box on "kross overviews"

function check_all() {
    clearInterval(interval);

    //Create parametrs
    clickbox_div = document.createElement('div');
    clickbox_div.innerHTML = '<span class="button ant-btn-danger cstm-check-btn">Zaznacz wszystko ></span>';
    form_listener = document.querySelector("#app > div > div > div > div > section > div > main > div > form > section:nth-child(3) > div");
    
    $(form_listener).on('click', 'div', function() {
        get_section_param = document.querySelector("#app > div > div.ant-spin-nested-loading > div > div > section > div > main > div > form > div.block-with-confirm > div.block-disabled-body > section.form-section.section-checkboxs > div");
        get_section_param.prepend(clickbox_div);
    });

    back = document.querySelector('.main-menu');

    $(back).on('click', 'ul', function() {
        main_interval();
    })


    $(clickbox_div).on('click', 'span', function() {
        //get form container by selector 
        checked = false;
        get_checkboxes = document.querySelector("#app > div > div.ant-spin-nested-loading > div > div > section > div > main > div > form > div.block-with-confirm > div.block-disabled-body > section.form-section.section-checkboxs > div > div:nth-child(2) > div > div > div > div.ant-checkbox-group");
        //Get child node collection from form
        checkbox_child = get_checkboxes.childNodes;
        
        if(checkbox_child != null){
            //add "check" classes for each element in the list
            var i = 0;
            const checkbox_interval = setInterval(function(){
                if(i < checkbox_child.length){
                    $(checkbox_child[i]).click();
                    i++;
                }
                else {
                    i=0;
                    clearInterval(checkbox_interval);
                }
            }, 250);
        }
        
    });
}




order_id_start = null;
order_id_end = null;
card_p_form = null;

// Select range of orders in the manual mode
function select_range_manual(off=false) {
    if (off === true) {
        orders = document.querySelectorAll('.order-cover');
        $('.order-cover').css('display', 'none');
    }

    else {
        orders = document.querySelectorAll('.order-cover');
        $('.order-cover').css('display', 'block');
    }
}

// If we choose first and last orders their color will be changed to rgba(245, 73, 245, .5)
function add_select_classes(node){
    var cover_div = document.createElement('div');
    cover_div.setAttribute("class", "order-cover");
    cover_div.addEventListener('click', function() {
        parent_row = this.parentElement;
        order_id = parent_row.querySelectorAll('td')[1].innerText;
        
        if (order_id_start == null) {
            this.style.backgroundColor = 'rgba(245, 73, 245, .5)';
            order_id_start = order_id;
        }

        else if (order_id_start == order_id) {
            this.style.backgroundColor = 'rgba(136, 219, 80, .4)';
            order_id_start = null;
        }

        else if (order_id_start != null && order_id_end == null) {
            this.style.backgroundColor = 'rgba(245, 73, 245, .5)';
            order_id_end = order_id;
        }

        else if (order_id_end == order_id) {
            this.style.backgroundColor = 'rgba(136, 219, 80, .4)';
            order_id_end = null;
        }

        card_p_form.querySelectorAll('input');
        card_p_form[0].value = ''
        card_p_form[1].calue = ''
    });

    node.appendChild(cover_div);

    return node
}


function create_drop_down_menu(node) {
    menu = document.createElement('div');
    menu.setAttribute("class", "dd-menu");
    node.appendChild(menu)

    select_form = document.createElement('form');
    select_form.setAttribute("class", "select-form");
    select_form.innerHTML = 'Data: <input type="date"> \
    <p></p> \
    Pobierz zamówienia za <input class="number-inline" type="number" min="0"> dni. \
    <div class="select-manually"><p>Wybierz ręcznie</p></div> \
    <div id="cardGenSubmit">Wygeneruj kartkę</div>';

    menu.appendChild(select_form);
    card_p_form = select_form;

    set_gen_listeners(menu);

    return menu

}


function display_download_url(file_name) {
    url = "https://palachintosh.com/bikes_monitoring/presta_extension/print_orders/?" +
    "token=" + token +
    "&download_file=" + file_name;

    document.querySelector("#cardGenSubmit").remove();
    print_form = document.querySelector('.select-form');

    create_url_block = document.createElement('a');
    create_url_block.href = url;
    create_url_block.target = "_blank";
    create_url_block.innerText = "Pobierz kartkę ->";
    create_url_block.setAttribute('class', 'download-card');

    print_form.appendChild(create_url_block);
}


function reset_all() {
    order_id_start = null;
    order_id_end = null;
    select_range_manual(off=true);

    p_form = document.querySelector('.select-form');
    inputs = p_form.querySelectorAll('input');

    inputs.forEach(elem => {
        elem.value = '';
    });

}

// Function gets values from form and initiate the post request to the palachintosh.com with params,
// like 
function send_card_form(make_card_by, value) {
    if (make_card_by != null && value != null && value != '') {
        param = make_card_by + "=" + value;
        make_card_url = "https://palachintosh.com/bikes_monitoring/presta_extension/print_orders/?" +
        "token=" + token +
        "&" + param;
        send_btn = document.querySelector("#cardGenSubmit");
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var resp_text = xhttp.response;
                if (resp_text.Success) {
                    display_download_url(resp_text.Success);
                    reset_all();
                }

                if (resp_text.error) {
                    alert(resp_text.error);
                    reset_all();
                }

                send_btn.style.backgroundColor = 'rgba(71, 189, 55, 0.98)';
            }

            else {
                if (send_btn.style.backgroundColor == '#04d7cd') {
                    send_btn.style.backgroundColor = '#f3607b';
                }

                else {
                    send_btn.style.backgroundColor = '#04d7cd'
                }
            }
        }

        xhttp.responseType = "json";
        xhttp.open("GET", make_card_url, true);
        xhttp.setRequestHeader('Access-Control-Allow-Origin', "https://3gravity.pl");
        xhttp.send();
    }
}


function form_validator(form) {
    if (form == "undefined") {
        return null;
    }

    inputs = form.querySelectorAll("input");

    if (inputs[0].value != '') {
        return send_card_form('days_date', inputs[0].value);
    }

    if (inputs[1].value != '') {
        return send_card_form('days_ago', inputs[1].value);
    }

    if (order_id_start != null && order_id_end != null) {
        return send_card_form('orders_range', order_id_start + ',' + order_id_end);
    }

}


function set_gen_listeners(menu) {
    gen_submit = menu.querySelector('#cardGenSubmit');
    select_range = menu.querySelector('.select-manually');

    select_range.addEventListener('click', function() {
        select_range_manual();
    })

    gen_submit.addEventListener('click', function(){
        form_validator(this.parentElement);
    })
}


function add_select_button() {
    panel_head = document.querySelector('.panel-heading');
    order_card_a = document.createElement('a');
    order_card_a.innerText = 'Przygotuj kartkę na magazyn';
    order_card_a.setAttribute("class", "print-card-btn");
    panel_head.appendChild(order_card_a);

    create_drop_down_menu(panel_head);

    order_card_a.addEventListener("click", function() {
        menu = document.querySelector('.dd-menu'); 

        if (menu.style.display == 'block') {
            menu.style.display = "none";
            reset_all();
        }
        else {
            menu.style.display = "block";
        }
    })
}

function select_orders() {
    get_orders_table = document.querySelectorAll("#form-order > div > div.table-responsive-row.clearfix > table > tbody > tr");
    add_select_button();

    for (order of get_orders_table) {
        add_select_classes(order)
    }
}