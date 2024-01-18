const quoteText = document.querySelector(".quote"),
quoteBtn = document.querySelector("button"),
authorName = document.querySelector(".name"),
speechBtn = document.querySelector(".speech"),
copyBtn = document.querySelector(".copy"),
twitterBtn = document.querySelector(".twitter"),
synth = speechSynthesis;

function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
    fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
        quoteText.innerText = result.content;
        authorName.innerText = result.author;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "New Quote";
    });
}


copyBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

quoteBtn.addEventListener("click", randomQuote);
