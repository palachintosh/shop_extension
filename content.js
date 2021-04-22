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





var interval;
var getBodyBlock = document.getElementsByTagName('body')[0];
var alert_div = document.createElement('div');

alert_div.innerHTML = '<div class="alert-message"><div class="message-container">\
<span><h1></h1></span>\
<div class="inner-buttons">\
<button id="btnYes" class="ant-btn ant-btn-danger">Potwierdzam!</button>\
<button id="btnReserve" class="ant-btn ant-btn-danger">Zdjąć rezerwację</button>\
<button id="btnNo" class="ant-btn ant-btn-success">Nie teraz</button>\
</div></div></div>';
loader = document.createElement('div');
loader.setAttribute("class", "loader");

getBodyBlock.appendChild(alert_div);
getBodyBlock.prepend(loader);

var loader_block = document.querySelector('.loader');




function main_interval() {
    clearInterval(interval);

    interval = setInterval(function () {
        href = window.location.href
        
        if (href.indexOf('https://24.kross.pl/warranty/new') >= 0 ||
            href.indexOf('id_product=') >= 0) {

            if (href.indexOf('id_product=') >= 0) {
                prestaCheck();
                clearInterval(interval);
            }

            if (href.indexOf('https://24.kross.pl/warranty/new') >= 0) {
                location.reload();
                get_buttons();
            }
        }

        if (href.indexOf('https://24.kross.pl/bike-overview/new') >= 0) {
            clearInterval(interval);
            check_all();
        }

    }, 1000);
}


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


function get_buttons() {
    get_bottom_btn = document.querySelector(
        "#app > div > div > div > div > section > div > main > div > section");

    // get top btn
    get_top_btn =
        document.querySelector("#app > div > div > div > div > section > div > main > div > form > div.stickyTop > .page-list-actions");
    
    if (get_bottom_btn != null && get_top_btn != null) {
        clearInterval(interval);
    }
}


// onclick or enter events
$(getBodyBlock).on('keypress', 'input', function (e) {
    if (e.which == 13) {
        href = window.location.href;
        if (href.indexOf('https://24.kross.pl/warranty/new') >= 0) {
            font_change(); 
            getFormData();

            $(get_top_btn).on('click', 'button', function () {
                getFormData();
            });
            
            $(get_bottom_btn).on('click', 'button', function () {
                getFormData();
            });
        }
    }
});



// onclick or enter events
 function getFormData() {
    var getForm = document.forms[0];

    if (getForm != null) {
        if (getForm.hasChildNodes("sku") && getForm.sku != null){
            var code = String(getForm.sku.value);
        }

        if (getForm.hasChildNodes("bike_model") && getForm.bike_model != null) {
            edit_msg = document.querySelector(".message-container > span > h1");
            edit_msg.innerText = "Rower " + String(getForm.bike_model.value) + " zostanie usunięty ze stanów!";
        }

        if (code != null && getForm.serial_number != null) {
            sendRequest(code);
        }
    }
}


function response_validator (resp_txt) {
    if (resp_txt != null) {
        if (resp_txt.typeError != null) {
            alert(resp_txt.typeError);
        }

        if (resp_txt.success != null) {
            alert("Bike with reference " + resp_txt.success + " was delete from stock!");
        }

        if (resp_txt.error != null) {
            alert("Product with this reference does not exist: " + resp_txt.error);
        }
    }

    else {
        alert("Unable to delete product!");
    }

    loader_block.style.display = "block";

    //Launch main interval
    main_interval();
}


function sendRequest(code) {
    function sendGET() {  
        var request_url = "https://palachintosh.com/bikes_monitoring/kross_api/" + "?code=" + code;
        let xhttp = new XMLHttpRequest();
        
        xhttp.onload = function () {
            if (xhttp.status == 200) {
                var resp_txt = xhttp.response;
                xhhtp = null;
                response_validator(resp_txt);

                return xhttp.response;
            }
        }

        xhttp.responseType = "json";
        xhttp.open("GET", request_url, true);
        xhttp.setRequestHeader('Access-Control-Allow-Origin', "https://24.kross.pl");
        xhttp.send();
    }


    if (code != null) {
        loader_block.style.display = "block";

        get_alert_div = document.getElementsByClassName('alert-message')[0];
        $(get_alert_div).css('display', 'block');
    
        $('#btnNo').on('click', function () {
            $(get_alert_div).css('display', 'none');
            main_interval();
        });

        $('#btnYes').on('click', function () {
            sendGET();
            $(get_alert_div).css('display', 'none');
        });
    }
}



/* 
    // PrestaShop extension > 
*/



function prestaCheck() {
    var quantity_loc = null;
    var quantity_txt = null;
    var combinations_values = '';

    quantity_loc = document.querySelectorAll(".available_quantity");
    $(quantity_loc).on('click', '#reserveBtn', function () { 
        comb_name = this.name;
        reserve(comb_name);
    });


    function getStocks(combination) {
        request_link = "https://palachintosh.com/bikes_monitoring/presta_extension/?" + combination;
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


    const q_interval = setInterval(function() {
        quantity_loc = document.querySelectorAll(".available_quantity");

        if (quantity_loc != null) {
            counter = 0;
            for (tr_val of quantity_loc) {
                quantity_txt = tr_val.lastElementChild;
                combination_id = tr_val.id.slice(4);

                warehouses_raw = getStocks(combination_id);

                var q_div = document.createElement('div');
                var q_reserv = document.createElement('a'); //create button reserv
                // add attributes
                q_reserv.innerText = 'Rezerwacja';
                q_reserv.setAttribute('class', 'btn btn-success');
                q_reserv.setAttribute('id', "reserveBtn");
                q_reserv.setAttribute('name', combination_id);
                q_reserv.setAttribute('value', combination_id);
                
                q_div.innerHTML = '<span class="wh-X">X: -</span><span class="wh-Y">Y: -</span><span class="wh-SHOP">SHOP: -</span>';
                    
                tr_val.appendChild(q_reserv);
                tr_val.appendChild(q_div);

                $(this).css('display', 'inline-block');
                counter += 1;
            }

            clearInterval(q_interval);
        }
    }, 800)


    function setValue(success_response) {
        if (success_response != null && success_response.x != null) {
            warehouse_tags = ['x', 'y', 'shop'];

            warehouse_tags.forEach(war_tag => {
                warehouses_raw = success_response[war_tag]["combination"];
                war_class_name = "wh-" + war_tag.toUpperCase();

                quantity_block = document.getElementById("qty_" + success_response[war_tag]["combination"]).lastElementChild;
                get_span = quantity_block.getElementsByClassName(war_class_name)[0];

                if (success_response[war_tag]["quantity"] == null) {
                    get_span.innerText = war_tag.toUpperCase() + ": 0";
                    $(get_span).css("color", "red");
                }
                else {
                    get_span.innerText = war_tag.toUpperCase() + ": " + success_response[war_tag]["quantity"];
                }
            });

        }

    }

// Reservation handler >
    function reserve(comb_name) {

        function addReservation(comb_name, phone_number) {
            // request_link = "https://palachintosh.com/bikes_monitoring/" + combination;
            // var warehouses_real;
            
            // var xhttp = new XMLHttpRequest();

            // xhttp.onreadystatechange = function () {
            //     if (xhttp.readyState == 4 && xhttp.status == 200) {
            //         var resp_txt = xhttp.response;

            //         if (resp_txt.success != null) {
            //             success_response = resp_txt.success;
    
            //             if (success_response[combination] != null ) {
            //                 warehouses_real = success_response[combination];
            //                 setValue(warehouses_real);

            //                 return warehouses_real;
            //             }
            //         }
            //     }
            // }
            
            // xhttp.responseType = "json";
            // xhttp.open("GET", request_link, true);
            // xhttp.setRequestHeader('Access-Control-Allow-Origin', "https://3gravity.pl");
            // xhttp.send();
            
            return null;
        }

        reserv_form = prompt("Numer telefonu klienta:");
        console.log(comb_name, reserv_form);

        if(comb_name.length == 4 && reserv_form.length < 13 && reserv_form.length > 5) {
            add_res = addReservation(comb_name.toString(), reserv_form.toString);

            if(add_res != null) {
                alert("Rezerwacja została zapisana! Możesz cofnąć ją przyciskiem.");
            }
            else {
                alert("Dodanie rezerwacji nie powiodło się!")
            }
        }

        else {
            alert("Numer telefonu klienta został błędnie wpisany! Sprawdź to gówno jeszcze raz albo skontaktuj się z administratorem.");
        }


    }
}


// Check box on "kross overviews"

function check_all() {
    clearInterval(interval);

    //Create parametrs
    clickbox_div = document.createElement('div');
    clickbox_div.innerHTML = '<span class="button ant-btn-danger cstm-check-btn">Zaznacz wszystko ></span>';
    form_listener = document.querySelector("#app > div > div > div > div > section > div > main > div > form > section:nth-child(3) > div");
    
    $(form_listener).on('click', 'div', function() {
        get_section_param = document.querySelector("#app > div > div > div > div > section > div > main > div > form > section:nth-child(5) > div");
        get_section_param.prepend(clickbox_div);
    });

    back = document.querySelector('.main-menu');

    $(back).on('click', 'ul', function() {
        main_interval();
    })


    $(clickbox_div).on('click', 'span', function() {
        //get form container by selector 
        checked = false;
        get_checkboxes = document.querySelector("#app > div > div > div > div > section > div > main > div > form > section:nth-child(5) > div > div:nth-child(2) > div > div > div > div.ant-checkbox-group");

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