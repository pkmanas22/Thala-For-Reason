const textInp = document.getElementById('text')
const numberInp = document.getElementById('number')
const submitBtn = document.getElementById('submitBtn')
const output = document.getElementById('output')
const nameSpan = document.getElementById('name')
const downloadIcon = document.getElementById('downloadIcon')
const twitterShare = document.getElementById('twitterShare')
const whatsappShare = document.getElementById('whatsappShare')

let sharedText = "";

function missionCompleted(inputString) {
    output.style.visibility = "visible";
    downloadIcon.style.visibility = "visible";
    twitterShare.style.visibility = "visible";
    whatsappShare.style.visibility = "visible";

    sharedText = `I achieved #ThalaForAReason with ${inputString} on this cool website! Check it out: ${window.location.href}`;
    // console.log(sharedText);
}

submitBtn.addEventListener("click", () => {
    const text = textInp.value.replace(/\s/g, "");
    const number = numberInp.value;

    // console.log(text);
    // console.log(number);

    if (text !== "" && number === "") {
        if (text.length < 7) {
            alert(`Please add another ${7 - text.length} digits to achieve #ThalaForAReason`)
        } else if (text.length == 7) {
            nameSpan.innerText = textInp.value + " = 7 letters";
            missionCompleted(textInp.value + " having 7 letters ");
            textInp.value = "";
        } else {
            alert(`Please remove ${text.length - 7} digits to achieve #ThalaForAReason`)
        }
    } else if (text === "" && number !== "") {
        const numPlusString = number.split('').join('+')
        // console.log(numPlusString);

        try {
            var result = eval(numPlusString);
        } catch (error) {
            alert("Please enter valid number")
        }

        if (result == 7) {
            nameSpan.innerText = `${numPlusString} = ${result}`;
            missionCompleted(numPlusString + " = 7");
            numberInp.value = "";
        } else {
            alert("Oops!!! Sum is not 7. Try another one...")
        }
    } else {
        alert("Please fill only one field.");
    }
})

downloadIcon.addEventListener("click", () => {
    const container = document.getElementById('container');
    
    // Temporarily remove margin auto
    container.style.margin = '0';

    domtoimage.toBlob(container)
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'ThalaForAReason.png';
            a.click();

            // Restore margin auto after capturing
            container.style.margin = 'auto';
        });
});





twitterShare.addEventListener('click', () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(sharedText)}`;
    window.open(twitterUrl, '_blank')
})

whatsappShare.addEventListener('click', () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(sharedText)}`;
    window.open(whatsappUrl, '_blank')
})
