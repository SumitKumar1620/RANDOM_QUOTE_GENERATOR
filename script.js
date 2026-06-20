const quote = document.getElementById("quote");
const authorName = document.getElementById("author");
const api_url = "https://dummyjson.com/quotes/random";
const speakerBtn = document.querySelector(".speak");
const copyBtn = document.querySelector(".clipboard");

const staticQuotes = [
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
    { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { quote: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" }
];

function displayQuote(quoteText, author) {
    quote.innerHTML = quoteText;
    authorName.innerHTML = author;
}

function getRandomStaticQuote() {
    return staticQuotes[Math.floor(Math.random() * staticQuotes.length)];
}

async function quoteGen(url){
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch quote");
        const data = await response.json();

        displayQuote(data.quote, data.author);
    } catch (error) {
        const fallback = getRandomStaticQuote();
        displayQuote(fallback.quote, fallback.author);
    }
}

quoteGen(api_url);


//Adding event listener to speech the quote and author name
speakerBtn.addEventListener("click", ()=>{
    //the SpeechSynthesisUtterance is a Web Speech api that represents a speech request
    let utter = new SpeechSynthesisUtterance(`${quote.innerHTML} by ${authorName.innerHTML}`);
    //speak is a method of SpeechSynthesis
    speechSynthesis.speak(utter);
});

//Adding event listener to copy the contents to the system clipboard
copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quote.innerHTML);
    alert("Text Copied to Clipboard");
})

//Redirect to twitter along with the contents
function tweet(){
    window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML, "Tweet Window", "height=300, wdith=400")
}





// async function searchByAuthor(name){
//     const authorUrl = `https://dummyjson.com/quotes?limit=0`;


// }
// searchByAuthor(authorName);
