const moonBtn = document.getElementById("moon");
const sunBtn = document.getElementById("sun");
const body = document.getElementById("body");
const menuBtn = document.getElementById("menu");
const footer = document.getElementById("footer");
const loadIcon = document.getElementById("loading");
const loadingDiv = document.getElementById("loadingDiv");
const submitBtn = document.getElementById("submit");
const waitMsg = document.getElementById("waitMsg");
const searchBox = document.getElementById("search");
const colorMode = document.getElementById("colorMode");

document.getElementById("searchDivx").style.display = "none";


const googleBookAPI = "https://www.googleapis.com/books/v1/volumes?q=";

function showError() {
    document.getElementById("errorDiv").style.display = "block";
    document.getElementById("searchDiv").style.display = "none";
    //document.getElementById("errorDiv").style.display = "block";
};

/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
};

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
};

waitMsgs = ["Hold a bit. We're searching for your book everywhere...",
    "Have you followed us on X ?",
    "Do you know that the amount of books present digitaly is about the stars in the night sky ?",
    "Sheeez, Looks like your book is in the deep. But Don't worry we'll dig it up for you",
    "Hold a sec, have you read the Encyclopedia Brittanica ?",
    "I'll find your book soon, don't worry...",
    "Another day to dive into the World of Books just for you!",
    "Creativity is just Genius having fun - Albert Einstein",
    "What new thing have you learnt today ? - My Dad",
    "Consume as much knowledge as you can - Elon Musk",
    "Try and have at least a little knowledge in all fields - Elon Musk",
    "Rich men Invest in Knowledge, Poor men...Well",
    "Books are just dimensionaless portal through which we the readers explore the mind of the authors. - Ebube Akukwe"
]

function handleResponse(response) {
    const books = response.items;
    $("#loadingDiv").show().delay(400).fadeOut();
    let output = `<h2>search results</h2><div>`;
    if (books === undefined) {
        output +=  `<div>No search result <br />
        Are you sure you typed this correctly ?</div>`
    } else {
        //continue
    }
    books.forEach(book => {
        if (book.volumeInfo.averageRating >= 3 & (searchBox.value).toLowerCase() === (book.volumeInfo.title).toLowerCase()) {
            output += `<div style="padding:5px;">${book.volumeInfo.title} by ${book.volumeInfo.authors}
            <a href="${book.volumeInfo.infoLink}">Download</a>
            Rating: ${book.volumeInfo.averageRating} Pages:${book.volumeInfo.pageCount} 
            </div>`;
        }else{
            output += `<div style="padding:5px;">${book.volumeInfo.title} by ${book.volumeInfo.authors}
            <a target="_blank" href="${book.volumeInfo.infoLink}">Download</a>
            Rating: ${book.volumeInfo.averageRating} Pages:${book.volumeInfo.pageCount} 
            </div>`
        }
    });
    output += "</div>";
    document.getElementById('bookResult').innerHTML = output;
};


document.getElementById("submit").onclick = function() {
    
    async function getBookDetails() {
        let bookName = searchBox.value;
        let bookLink = googleBookAPI+(bookName.split(' ').join('+'))+"&callback=handleResponse&startIndex=0&key=AIzaSyB0pZbchE4I2R9dYiT33dwXzXCAaNX39iE"
        console.log(bookLink);

        try {
            // Dynamically create a script tag to request the JSONP data
            const script = document.createElement('script');
            script.src = bookLink;
            document.body.appendChild(script);
        }catch{
            console.error("Errr Something went wrong...");
        };
    }

    loadingDiv.style.display = "block";
    $("#loadingDiv").show();
    getBookDetails()
    document.getElementById("searchDiv").style.display = "none";
    document.getElementById("searchDivx").style.display = "table";
    
    waitMsg.textContent = waitMsgs[Math.floor((Math.random(0,1)*13)+1)]
    waitMsg.style.color = "black";
    if (moonBtn.style.display === "none") {
        waitMsg.style.color = "beige";
    }if(sunBtn.style.display === "none"){
        waitMsg.style.color = "black";
    };
};

document.getElementById("submitx").onclick = function() {
    document.getElementById('bookResult').innerHTML = '';

    async function getBookDetails() {
        let bookName = (document.getElementById("searchx")).value;
        let bookLink = googleBookAPI+(bookName.split(' ').join('+'))+"&callback=handleResponse&startIndex=0&key=AIzaSyB0pZbchE4I2R9dYiT33dwXzXCAaNX39iE"
        console.log(bookLink);

        try {
            // Dynamically create a script tag to request the JSONP data
            const script = document.createElement('script');
            script.src = bookLink;
            document.body.appendChild(script);
        }catch{
            console.error("Errr Something went wrong...");
        };
    }

    loadingDiv.style.display = "block";
    $("#loadingDiv").show();
    getBookDetails()
    
    waitMsg.textContent = waitMsgs[Math.floor((Math.random(0,1)*13)+1)]
    waitMsg.style.color = "black";
    if (moonBtn.style.display === "none") {
        waitMsg.style.color = "beige";
    }if(sunBtn.style.display === "none"){
        waitMsg.style.color = "black";
    };
};



document.getElementById("moon").onclick = function() {
    colorMode.content = "dark";
    waitMsg.style.color = "beige";
    moonBtn.style.display = "none";
    sunBtn.style.display = "block";
    body.style.backgroundColor = "black";
    menuBtn.style.color = "beige";
    footer.style.color = "white";
};

document.getElementById("sun").onclick = function() {
    colorMode.content = "light";
    moonBtn.style.display = "block";
    sunBtn.style.display = "none";
    body.style.backgroundColor = "white";
    menuBtn.style.color = "rgb(60, 60, 108)";
    footer.style.color="black";
    waitMsg.style.color = "black";
};