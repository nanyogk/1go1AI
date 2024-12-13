async function callAiGen(cha1, cha2, location) {
    document.getElementById("conversation").innerHTML = `Talking.. ${cha1}, ${cha2}, at ${location}`;
    console.log(`aiGen called - ${cha1}, ${cha2}, ${location},`);
    const sysPrompt1 = `
        You are a kind Junior-high English teacher.
        You need to make quiz for students oversea.
        You will receive 2 characters, and 1 location.
        Please create 1-3 exchanges conversation between the two.
        And please create 1 question about the conversation.
        Multi-choise out of 4, 1good:3bad. 
        The answer should be clearly stated inside the conversatoin, 
        which means - no guessing.
        The output should be mobile screen friendly - let's say,
        {charactor1}: conversation1,
        {charactor2}: conversation2,
        {charactor1}: conversation3
        ---
        {Question}: Question1,
        Answer1: {answer1}
        Answer2: {answer2}     
        Answer3: {answer3}     
        Answer4: {answer4}
        ----
        ----
        ----
        The correct answer is 1
        `;
    const gemini = await ai.languageModel.create({
        systemPrompt: sysPrompt4
    });
    const salt = `${cha1},${cha2},${location}`;
    const salt2 = aMurderCase(characters, location);
    console.log(salt2);
    try {
        const stream = await gemini.promptStreaming(salt2);
        let conv = '';
        let previousChunk = '';

        for await (const chunk of stream) {
            const newChunk = chunk.startsWith(previousChunk)
                ? chunk.slice(previousChunk.length) : chunk;
            //console.log(newChunk);
            conv += newChunk;
            document.getElementById("conversation").innerHTML = micromark(conv);
            previousChunk = chunk;
        }
        // console.log(conv); // Final
        document.getElementById("conversation").innerHTML = micromark(conv);
        const translator = await self.translation.createTranslator({
            sourceLanguage: 'en',
            targetLanguage: 'ja'
        });
        const translated = await translator.translate(conv);
        document.getElementById("conversation").innerHTML += micromark(translated);

    } catch (error) {
        console.error("Error generating conversation:", error);
        // Display an error message to the user
        document.getElementById("conversation").innerHTML = "Oops! There was an error generating the conversation.";
    }

}

function shuffle() {
    // 1. Select random characters and location
    // 2. Generate conversation
    // 3. Display conversation in the 'conversation' div
    // 4. Generate question and answers
    // 5. Display answers on the buttons
    // 1. Select random characters and location
    let char1Index = Math.floor(Math.random() * characters.length);
    let char2Index = Math.floor(Math.random() * characters.length);
    let locationIndex = Math.floor(Math.random() * locations.length);

    let char1 = characters[char1Index];
    let char2 = characters[char2Index];
    let location = locations[locationIndex];
    callAiGen(char1, char2, location);
}

function checkAnswer(answerNumber) {
    // 1. Check if the selected answer is correct
    // 2. Provide feedback to the user
}
// Initial shuffle on page load
shuffle();