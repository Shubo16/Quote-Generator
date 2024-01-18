# Quote-Generator
## What I have created

---

- A site that allows you to generate a quote whenever the new quote button is clicked.
- The quote can be read out loud by an ai male voice, the default text to speak speech using an api and javascript
- The quote can also be copied to any device and be sent to the clipboard and pasted
- The quote can also be shared amongst twitter, pressing the quote takes the user to twitter (if already logged in) and copies the quote to the tweet section allowing the user to have the final say whether it wants to be tweeted or sent to drafts or cancelled completely.
- Quote button is given a hover effect and changes to blue when the cursor pointer appears over it, when clicked, there is a period where the quote must load, in this time the text is changed from new quote to loading quote and then changed back once the new quote is loaded again

- ## HERE ARE ALL THE EXTRA NOTES I HAD TAKEN WHEN CREATING THIS PROJECT


- ## Javascript section

---

- 5 different functions that are running on the page (voice reader, clipboard copy, twitter share, finding a random quote and then adding a new quote to show instead of that)

```jsx

  Mermaid --> Diagram
```

---

## ***Clipboard quote function using API***

- Purpose of this function is to copy the text to the clipboard using the **‘navigator.clipboard’ API**
    - `addEventListener(”click”, () ⇒ { ); });` when button is clicked function between brackets is performed

```jsx
/* VARIABLES DECLARED */
copyBtn = document.querySelector(".copy"),

/*Function for copy clipboard */
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText);
});
```

---

## ***Twitter share function using API***

- Purpose of the this function is that when clicked, quote will be shared to their profile as a tweet via twitter
- it does this by using the API, accessed within the
1. Event listener setup⇒ `twitterBtn.addEventListener("click", () => {..})``
    - adds a click listener event, (when clicked something will happen)
2. Add the twitter share function `let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;`
    - constructs a tweet url using a temperate literal `${quoteText.innerText}`=>
    - gets the text connect of the HTML element with the class “quote”
3. Opening in a new window :
    - `window.open(tweetUrl, "_blank");`
    - Opens the constructed tweet url in a new browser window
    - Second argument `_'blank'` specifies that the link should open in a new tab or window

```jsx
/* VARIABLES DECLARED */
const quoteText = document.querySelector(".quote"),
const twitterBtn = document.querySelector(".twitter")

/* Twitter Share Function */
twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});
```

- **`quoteText`:** Represents the element with the class "quote" where the quote text is displayed.
- **`twitterBtn:`** Represents the Twitter share button with the class "twitter."

---

## ***Random Quote API***

Purpose of the this function is that when clicked, quote will be shared to their profile as a tweet via twitter

- `quoteText, quoteBtn, authorName`: these variables store references to HTML elements where the content will be displayed.
1. To show that the quote is being generated we should show this by displaying some sort of loading screen⇒ can be done by:
    - `quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";`
    - Adds the “loading” class to the new quote to visually indicate that a quote is being loaded
    - changes the text of the “new quote” button to inform the user that a quote is being loaded
2. API request using ‘fetch’: 
    - `fetch("http://api.quotable.io/random")
    .then(response => response.json())
    .then(result => {...});`
    - `'fetch'` is a built in JS function used for making network requests, in this case, it initiates a GET request to the specified URL
    - this initiates a Get request specifically to the "http://api.quotable.io/random" URL, which is the endpoint of the “quotable” API
    - `'.then(response => response.json())';` converts the response from the API to json format
    - `'.then(result => {..});` handles the json result
    
3. Updating the HTML elements:
    - `quoteText.innerText = result.content;
     authorName.innerText = result.author;`
    - Updates HTML elements, these properties are used to obtain the content and author information from the parsed JSON data from the API
    - HTML elements displaying the quote and author information are then updated with this new information
    - `"loading"` class is removed from the “new quote” button, indicating the the loading process is complete.
    - Text of “new quote” button is set back to its original state, signalling that another quote can be fetched
4. Reset New “quote” Button:
    - `quoteBtn.classList.remove("loading");
    quoteBtn.innerText = "New Quote";`
    - First line removes the loading class from the quote button, its used to apply visual indication for the user to show that the quote has now loaded
    - second line indicates that a new quote can now be selected again

```jsx
/* VARIABLES DECLARED */
const quoteText = document.getElementByQuerySelector(".quote")
const quoteBtn = document.getElementByQuerySelector("button")
const authorName = document.getElementByQuerySelector(".name")

/*Random Quote function*/
function randomQuote() {
/* STEP 1 */
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";
/* STEP 2 */

    fetch("http://api.quotable.io/random")
        .then(response => response.json())
        .then(result => {
/* STEP 3 */

            quoteText.innerText = result.content;
            authorName.innerText = result.author;
/* STEP 4 */

            quoteBtn.classList.remove("loading");
            quoteBtn.innerText = "New Quote";
        });
}
```

---

## ***New Quote Button Functionality***

- Purpose of this is to enable the user to request a new quote by clicking the new quote button
- The function ties the button click event the random quote function ensuring that a fresh quote from the api and is displayed on the webpage each time the user clicks the button

```jsx
/* variables declared */
const quoteBtn = document.querySelector("button");
/* function */
quoteBtn.addEventListener("click", randomQuote);
```

---

## ***Speech synthesis function***

- Purpose of this function is to trigger a voice narration of the current quote when the button is clicked
1. event listener setup 
    - `speechBtn.addEventListener("click", () => {...});`
    - Add an event listener, “click”, when clicked function will run
2. check for loading state
    - `if (!quoteBtn.classList.contains("loading")) {...}`
    - ensures that speech synthesis is only triggered if the new quote button is NOT in a loading state
3. Creating utterance 
    - let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
    - Creates a new **`SpeechSynthesisUtterance`** object. This object is a built-in javascript constructor for creating speech synthesis objects
    - **`quoteText.innerText`**
        - variable representing the HTML element where the quote text is displayed
        - inner.text retrieves the text content of HTML element
    - Combining the text `${quoteText.innerText} by ${authorName.innerText}` is used to combine the text and authors name into a single string
    - **Creating the Utterance Object `new SpeechSynthesisUtterance(...)`** creates a new instance of the **`SpeechSynthesisUtterance`** object, where the combined string becomes the content of the utterance.
        - This **`utterance`** object is then ready to be spoken using the Web Speech API's synthesis capabilities.
4. **Initiating speech synthesis** `synth.speak(utterance);`
    - `‘synth'` is a variable that represents the `'speechsynthesis'` object
    - speech-synthesis is a built in javascript API that provides speech synthesis capabilities, allowing the conversion of text into spoken words
    - `synth.speak(utterance)` is a method call on the ‘speechSynthesis’ object and it initiates the process of speaking the specified `(‘utterance’)`
    - `(‘utterance’)` is the object from the code above, contains the text content that is to be spoken out (quote and authors name)

5.  Continuous check for speaking state

- 

```jsx
/* variables declared */
const quoteText = document.querySelector(".quote"),
      speechBtn = document.querySelector(".speech"),
      synth = speechSynthesis;

/* speech synthesis function */

/*step 1 */ 
speechBtn.addEventListener("click", () => {
/*step 2 */
if (!quoteBtn.classList.contains("loading")) {
/*step 3 */
let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
/*step 4 */
synth.speak(utterance);
/*step 5 */
```
