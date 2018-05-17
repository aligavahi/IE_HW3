var add_right_msg = function(msg,myimg,time){
    var new_msg = document.createElement("div");
    new_msg.className = "container darker";
    var img = document.createElement("img");
    img.className = "right";
    img.src = myimg;
    img.alt = "Avatar";
    img.style.width = "100%";
    var p = document.createElement("p");
    var t = document.createTextNode(msg);
    
    var p2 = document.createElement("p");
    var t2 = document.createTextNode(Date(time).split(" ")[4]);
    p2.className = "time";
    
    p.appendChild(t);
    p2.appendChild(t2);
    new_msg.appendChild(img);
    new_msg.appendChild(p);
    new_msg.appendChild(p2);
    
    document.getElementById("messages").appendChild(new_msg);
    messages.scrollTop = messages.scrollHeight;
}

var add_left_msg = function(msg){
    var new_msg = document.createElement("div");
    new_msg.className = "container";
    var img = document.createElement("img");
    img.src = "resources/avatar.png";
    img.alt = "Avatar";
    var p = document.createElement("p");
    var t = document.createTextNode(msg);
    var msg_date = new Date();
    var p2 = document.createElement("p");
    var t2 = document.createTextNode(msg_date.getHours() + ":" + msg_date.getMinutes()+":"+ msg_date.getSeconds());
    p2.className = "time";
    
    p.appendChild(t);
    p2.appendChild(t2);
    
    new_msg.appendChild(img);
    new_msg.appendChild(p);
    new_msg.appendChild(p2);
    
    document.getElementById("messages").appendChild(new_msg);
    messages.scrollTop = messages.scrollHeight;
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
    var s_text2 = document.createTextNode("");
    var minus_btn = document.createElement("BUTTON");
    var supporter_img = document.createElement("img");
    supporter_div.className = "supporterInfo";
    supporter_img.className = "supporterInfo";
    
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
        startChat();
    };
    
    minus_btn.onclick = function(){
        btn.style.display = "block";
        chat_box.style.display = "none";
        chat_div.style.height = "10%";
        chat_div.style.width = "15%";
        chat_div.style.backgroundColor="inherit"; 
    };
    
    startChat = function(){    
        var startReq = new XMLHttpRequest();
        startReq.open("GET", "http://51.15.59.130:46260/start");
        startReq.onreadystatechange = function reqListener () {
            if (this.readyState == 4 && this.status == 200) {
                getChatInfo();
            }
        }
        startReq.send();

    }
    startget = false;
    getChatInfo = function( ){
    var startReq = new XMLHttpRequest();
        startReq.open("GET", "http://51.15.59.130:46260/support");
        startReq.onreadystatechange = function reqListener () {
            if (this.readyState == 4 && this.status == 200) {
                supportObj = JSON.parse(this.responseText);
                s_text2.textContent = supportObj.support.first + " " + supportObj.support.last; 
                supporter_img.src = supportObj.support.picture;
                startget = true;
            }
        }
        startReq.send();
    }
    
    form.onsubmit = function(){
    var data = {};
    data.message = input.value;
    var jsondata = JSON.stringify(data);
    var sendReq = new XMLHttpRequest();
    sendReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            add_left_msg(data.message);
        }
    }
    sendReq.open("POST", "http://51.15.59.130:46260/send");
    sendReq.setRequestHeader('Content-Type','application/json; charset=utf-8');
    sendReq.send(jsondata);
    input.value = "";
    return false;
    }
    
    setInterval(function(){ 
        var fetchReq = new XMLHttpRequest();
        fetchReq.open("GET", "http://51.15.59.130:46260/fetch");
        fetchReq.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resObj = JSON.parse(this.responseText);
                add_right_msg(resObj.responses[0].message,supporter_img.src,resObj.responses[0].date);
            }
        }   
        if(startget)
            fetchReq.send();
    }, 3000);
   
};