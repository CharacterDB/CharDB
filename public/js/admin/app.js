
// new character
let character = {
    id: null,
    symbol: null,
    transcription: null,
    tone: 0,
    keyword: null,
    meanings: [],
    primitives: []
}

// inputs
const compositionInput = document.querySelector("#composition");
const id = document.querySelector("#id");
const symbol = document.querySelector("#symbol");
const transcription = document.querySelector("#transcription");
const keyword = document.querySelector("#keyword");
const tone = document.querySelector("#tone");

// forms and buttons
const meaningsForm = document.querySelector("#meanings-form");
const saveButton = document.querySelector("#save");

// showcase lists
const primitiveShowcase = document.querySelector("#primitive-showcase");
const primitives = document.querySelector("#primitives");
const meaningsList = document.querySelector("#meanings-list");


function parseInputs() {
    character.id = id.value || null;
    character.symbol = symbol.value;
    character.transcription = transcription.value;
    character.tone = parseInt(tone.value);
    character.keyword = keyword.value;
}

function resetInputs() {
    // reset character
    character = {
        id: null,
        symbol: null,
        transcription: null,
        tone: 0,
        keyword: null,
        meanings: [],
        primitives: []
    }
    // reset showcases
    primitives.innerHTML = '';
    meaningsList.innerHTML = '';

    // reset fields
    id.value = '';
    symbol.value = '';
    transcription.value = '';
    tone.value = 0;
    keyword.value = '';
}

function removePrimitive(button, id) {
    character.primitives.splice(character.primitives.indexOf(id), 1);
    button.remove();
}

function addPrimitive(char) {
    if (character.primitives.includes(char.id)) return;
    character.primitives.push(char.id);
    const button = document.createElement('BUTTON');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.innerText = char.symbol;
    button.addEventListener('click', (e) => { removePrimitive(button, char.id) });
    primitives.append(button);
    compositionInput.value = '';
}

async function showCasePrimitives(transcription) {
    const search = await fetch("/api/characters?pronunciation=" + transcription);
    const data = await search.json();
    for (let id in data) {
        const char = data[id];
        const button = document.createElement('BUTTON');
        button.classList.add('btn');
        button.classList.add('btn-secondary');
        button.innerText = char.symbol;
        button.addEventListener('click', (e) => { addPrimitive(char); });
        primitiveShowcase.append(button);
    }
}

function removeMeaning(meaning, button) {
    character.meanings.splice(character.meanings.indexOf(meaning), 1);
    button.remove();
}

function addMeaning(meaning) {
    meaning = meaning.trim().toLowerCase();
    if (character.meanings.includes(meaning)) return;
    character.meanings.push(meaning);
    const button = document.createElement('BUTTON');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.innerText = meaning;
    button.addEventListener('click', (r) => { removeMeaning(meaning, button) });
    meaningsList.append(button);
}

compositionInput.addEventListener('keyup', async (e) => {
    primitiveShowcase.innerHTML = '';
    const transcription = compositionInput.value;
    showCasePrimitives(transcription);
});


meaningsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const meaning = meaningsForm.elements.meanings.value;
    addMeaning(meaning);
    meaningsForm.elements.meanings.value = '';
});


saveButton.addEventListener('click', (e) => {
    parseInputs();
    console.log(character);
    resetInputs();
});

showCasePrimitives('');