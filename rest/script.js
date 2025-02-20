var stringa = ""; 

function getPosts() {
    var urlSito = document.getElementById("url").value; 
    
    stringa = ""; 
    document.getElementById("tabella").innerHTML = "";
    document.getElementById("errore").innerHTML = ""; 

    if (!urlSito) {
        alert("Per favore inserisci un URL.");
        return;
    }

    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var obj = JSON.parse(this.responseText);
                
                stringa += "<thead><tr><th>ID</th><th>Titolo</th></tr></thead><tbody>";
                
                for (var x in obj) {
                    stringa += "<tr><td>" + obj[x].id + "</td><td>" + obj[x].title.rendered + "</td></tr>";
                }
                
                stringa += "</tbody>";
                
                document.getElementById("tabella").innerHTML = stringa;
            } else {
                document.getElementById("errore").innerHTML = `<p class="alert alert-danger">Errore durante il recupero dei dati: ${this.statusText}</p>`;
            }
        }
    };

    var apiUrl = `https://${urlSito}/wp-json/wp/v2/posts`; 
    xmlhttp.open("GET", apiUrl, true);
    xmlhttp.send();
}
