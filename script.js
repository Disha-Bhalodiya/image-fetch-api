const accesskey = "your key"; //->api key

const searchform = document.getElementById("search-form"); //->search form id
const searchbox = document.getElementById("search-box"); //->search box id
const searchresult = document.getElementById("search-result"); //->search result id
const showbtn = document.getElementById("show-btn"); //->show btn id

let page = 1; //->default initialization

async function searchimgs() {
    let keyword = searchbox.value; //->create variable for store inputbox value for search

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=15`; //->unsplash web url for search photos using keyword



    const response = await fetch(url); //->using response var fetch url from server
    const data = await response.json(); //->get data using request and store inside data var

    // console.log(data) //->print in log 


    //->create for when browser search new result at that time remove previous result from browser
    if (page === 1) {
        searchresult.innerHTML = "";
    }

    const results = data.results; //->fetch results array from the object ,which is fetched by url
    results.map((result) => { //->create loop for print imgs 
        const image = document.createElement("img"); //->create img tag dynamically for display img on browser
        image.src = result.urls.small; //->get img urls and from urls small imgs 
        const imagelink = document.createElement("a"); //->create ancjor tag dynamically for click on img 
        imagelink.href = result.links.html; //->give link to anchor tag using links.html
        imagelink.target = "_blank"; //->open in new tab

        imagelink.appendChild(image); //->append in html
        searchresult.appendChild(imagelink); //append in html
    })
    showbtn.style.visibility = "visible"; //->show btn after imges loading on browser

}


//->when form submited using eventlistener ,without page refreshing and show data
searchform.addEventListener("submit", (e) => {

    e.preventDefault();
    page = 1; //->this will show you new searching results and remove previous search from the browser
    searchimgs();

})

//->when click on show more result btn it will be increse pages and show more results on browser
showbtn.addEventListener("click", () => {
    page++; //->increse page numbers
    searchimgs(); //save changes and display data

})
