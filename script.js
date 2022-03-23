const map = L.map('map')
const sendButton = document.querySelector("button")
let param = ""

map.locate({setView: true, maxZoom: 16});

var myIcon = L.icon({
    iconUrl: './assets/icon-location.svg',
    iconSize: [38, 48],
    iconAnchor: [22, 22],
    
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
   
    
}).addTo(map);

function htmlElement(elem){ 
    let ip = document.querySelector('.ip p');
    let location = document.querySelector('.location p')
    let timezone = document.querySelector('.timezone p')
    let isp = document.querySelector('.isp p')
    ip.innerHTML=(elem.query)
    location.innerHTML=`${elem.city}, ${elem.region}`
    timezone.innerHTML= `${elem.timezone.split('/')}` 
    isp.innerHTML=(elem.isp)       
           
}



 async function getLocation (geo){
    try {
        const resp = await fetch(`http://ip-api.com/json/${geo}`);
        const data = await resp.json();
        console.log(data)
        
        const details = {
            "query":data.query,
            "isp": data.isp,
            "timezone":data.timezone,
            "region":data.region,
            "city":data.city,
            "lat": data.lat,
            "lon": data.lon
        }

        htmlElement(details);
        
        map.setView(new L.LatLng(details.lat, details.lon), 14)
        L.marker([details.lat,details.lon],{icon: myIcon}).addTo(map);


        
    } catch (error) {
        console.log(error)
    }
}


function inputValue(){
    const input = document.querySelector('input');
    return input.value;
}


sendButton.addEventListener("click",()=>{
    param = inputValue();
    getLocation(param)
   
}
    
)









