
var add_right_msg = function(msg){
    var new_msg = document.createElement("div");
    new_msg.className = "container darker";
    var img = document.createElement("img");
    img.className = "right";
    img.alt = "Avatar";
    img.style.width = "100%";
    var p = document.createElement("p");
    var t = document.createTextNode(msg);
    
    p.appendChild(t);
    new_msg.appendChild(img);
    new_msg.appendChild(p);
    document.getElementById("messages").appendChild(new_msg);
}

var add_left_msg = function(msg){
    var new_msg = document.createElement("div");
    new_msg.className = "container";
    var img = document.createElement("img");
    img.alt = "Avatar";
    var p = document.createElement("p");
    var t = document.createTextNode(msg);
    
    p.appendChild(t);
    new_msg.appendChild(img);
    new_msg.appendChild(p);
    document.getElementById("messages").appendChild(new_msg);
}

window.onload = function() {
    var chat_div = document.createElement("div");
    var btn = document.createElement("BUTTON");
    var t = document.createTextNode("پشتیبانی آنلاین");
    btn.appendChild(t);
    // #################################################### 
    var chat_box = document.createElement("div");
    chat_box.style.display = "none";
    
    // --------------------- chat_box childs
    var supporter_info = document.createElement("div");
    var messenger = document.createElement("div");
    supporter_info.className = "flex";
    messenger.id = "messenger";
    // --------------------- supporter_info childs
    var supporter_div = document.createElement("div");
    var s_text1 = document.createTextNode("پشتیبان بخش فروش");
    var s_br = document.createElement("br");
    var s_text2 = document.createTextNode("علی گواهی");
    var minus_btn = document.createElement("BUTTON");
    var supporter_img = document.createElement("img");
    
    minus_btn.id = "minus_btn";
    supporter_div.appendChild(s_text1);
    supporter_div.appendChild(s_br);
    supporter_div.appendChild(s_text2);
    supporter_info.appendChild(minus_btn);
    supporter_info.appendChild(supporter_div);
    supporter_info.appendChild(supporter_img);
    
    // --------------------- messenger childs
    var messages = document.createElement("div");
    var sender = document.createElement("div");
    
    var form = document.createElement("form");
    var input = document.createElement("input");
    var send_btn = document.createElement("BUTTON");
    
    input.type = "text";
    input.name = "string";
    input.placeholder = "متن پیام به پشتیبانی";
    messages.id = "messages";
    
    form.appendChild(send_btn);
    form.appendChild(input);
    sender.className = "sender";
    sender.appendChild(form);
    // -----------------------------------
    messenger.appendChild(messages);
    messenger.appendChild(sender);
    
    chat_box.appendChild(supporter_info);
    chat_box.appendChild(messenger);
    // -----------------------------------
    chat_div.className = "support";
    chat_div.appendChild(btn);
    chat_div.append(chat_box);
    // -----------------------------------
    document.body.appendChild(chat_div);   
    
    btn.onclick = function(){
        btn.style.display = "none";
        chat_box.style.display = "block";
        chat_box.style.height = "100%";
        messages.style.height = "80%";
        supporter_info.style.height = "15%";
        chat_div.style.height = "60%";
        chat_div.style.width = "25%";
        chat_div.style.backgroundColor="aqua";
    };
    
    minus_btn.onclick = function(){
        btn.style.display = "block";
        chat_box.style.display = "none";
        chat_div.style.height = "10%";
        chat_div.style.width = "15%";
        chat_div.style.backgroundColor="inherit"; 
    };
    
    add_left_msg("سلام");
    add_right_msg("سلام");
    add_left_msg("سلام");
    add_left_msg("ام");
    add_right_msg("سلام");
    add_right_msg("سلام");
};