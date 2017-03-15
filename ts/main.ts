import "../style/style.styl";
import "../style/header.styl";
import "../style/right.styl";
import "../style/left.styl";
import "../style/center.styl";
let $ = require ("jquery");

function resize_search() {
    let width_user_name, width_search, width_body, width_logo;
    width_logo = $("#logo").width();
    width_user_name = $(".header_info").width();
    width_body = $("body").width();
    width_search = $(".header_search");
    width_search.width(width_body - width_user_name - width_logo - 118);
}

resize_search();
window.addEventListener("resize", resize_search);

try {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://504080.com/api/v1/services/categories', false);
    xhr.setRequestHeader('Authorization', 'ba9f7faf3ccfdafadb21166a9ea1481078fa304c');
    xhr.send();
    let obj_directory = JSON.parse(xhr.responseText);
    if (xhr.readyState === 4 && xhr.status != 200) {
        // обработать ошибку
        alert(obj_directory.error.description);
    } else {
        let wrap = document.createElement("ul");
        wrap.setAttribute("id", "wrap");
        document.getElementById("center").appendChild(wrap);

        for (let i = 0; i < obj_directory.data.length; i++) {

            let node_li = document.createElement("li");
            node_li.setAttribute("class", "directory_wrap");
            let node_div1 = document.createElement("div");
            node_div1.setAttribute("class", "directory_text");
            node_div1.innerHTML = obj_directory.data[i].title;
            let node_img = document.createElement("img");
            node_img.setAttribute("class", "directory_img");
            node_img.setAttribute("src", obj_directory.data[i].icon);
            let node_div = document.createElement("div");
            node_div.setAttribute("class", "directory");
            let node_a = document.createElement("a");
            node_a.setAttribute("href", "#");

            node_div.appendChild(node_img);
            node_a.appendChild(node_div);
            node_a.appendChild(node_div1);
            node_li.appendChild(node_a);
            wrap.appendChild(node_li);
        }
    }
} catch(e) {
    alert('Ошибка ' + e.name + ":" + e.message)
}