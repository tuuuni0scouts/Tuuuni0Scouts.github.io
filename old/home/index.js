/* Cookie functions */

function setCookie(name, value, exp_days) {
    var d = new Date();
    d.setTime(d.getTime() + (exp_days*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    var cname = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++){
        var c = ca[i];
        while(c.charAt(0) == ' '){
            c = c.substring(1);
        }
        if(c.indexOf(cname) == 0){
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

/* Engine selection */

const englist = [
    "DuckDuckGoGoogle", 
    "Google", 
    "Ecosia", 
    "Brave",
    "Bing",
    "Yahoo" 
];
const queryurl = [
    "https://duckduckgo.com/?q=",
    "https://www.google.com/search?q=",
    "https://www.ecosia.org/search?q=",
    "https://search.brave.com/search?q=",
    "https://www.bing.com/search?q=",
    "https://search.yahoo.com/search?p="
];

function setSearchEngine(search)
{
    if (englist.includes(search))
    {
        setCookie("engine", search, 20000);
        return true;
    }
    return false;
}


function setSelectDefault()
{
    document.getElementById('settings_engine').value = getCookie("engine");
}

function getSearchEngine()
{
    let engine = getCookie("engine");
    
    let baseurl = null;
    for(let k = 0; k < englist.length; k++)
    {
        if(engine == englist[k])
        {
            baseurl = queryurl[k];
        }
    }
    if(!baseurl)
    {
        console.log("Invalid default search engine (got " + engine + ")");
        engine = "DuckDuckGo";
    }

    setSearchEngine(engine);
    setPlaceholder(engine);
    setSelectDefault();
    return baseurl;
}

const searchBox = document.getElementById('searchbar')

searchBox.addEventListener('keydown', (e) => {
    if (e.code == 'Enter')
    {
        let textfield = document.getElementById('searchbar').value;
        if(textfield)
        {
            var regex = new RegExp('^(http://|https://)');
            let url;
            if(regex.test(textfield))
            {
                url = textfield;
            } else {
                url = getSearchEngine() + encodeURIComponent(textfield);
            }
            window.location.href = url;
        }
     
  }
})

function choose(val)
{
    if(val) return "block";
    else    return "none";
}

function showSettings()
{
    if (typeof showSettings.openc == 'undefined')
        showSettings.openc = 0;
    showSettings.openc++;

    showSettings.openc %= 2;

    let showMenu = `
        visibility: visible;
        transition: all 0.3s ease;
        transform: translateX(0px);
    `;
    let hideMenu = `
        visibility: hidden;
        transition: all 0.3s ease;
        transform: 
    `;
    let vw = window.innerWidth;
    if(vw >= 1536)
    {
        hideMenu += "translateX(-230.4px);"
    } else if(vw < 1536 && vw > 992)
    {
        hideMenu += "translateX(-15vw);"
    } else {
        hideMenu += "translateX(-148.8px);"
    }

    let settings_height = document.documentElement.getBoundingClientRect().height;
    document.querySelector('.settings_menu').style.cssText = "min-height: " + settings_height + "px";

    const settings = document.querySelector('.settings_menu');

    showSettings.openc ? (settings.style.cssText = showMenu) : (settings.style.cssText = hideMenu);
    

    document.getElementById("settings_open").setAttribute("style", "display: " + choose(showSettings.openc));
    document.getElementById("settings").setAttribute("style", "display: " + choose(!showSettings.openc));

    // Hide "Settings applied"
    document.getElementById("settings_applied").setAttribute("style", "display: none"); 
}

function setPlaceholder(eng)
{
    let searchbar = document.getElementById("searchbar");
    searchbar.placeholder = 'Search with ' + eng;
}


function applySettings()
{
    let engine = document.getElementById("settings_engine").value;
    if(setSearchEngine(engine))
      document.getElementById("settings_applied").setAttribute("style", "display: block");

    setPlaceholder(engine);
    setSelectDefault();
}

window.onload = getSearchEngine();