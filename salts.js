const sysPrompt2 = `
        You are a kind Murder Mystery case maker.
        You want to make quiz for English students oversea.
        You will receive 4 characters, and 1 location.
        Please create a few exchange conversation among characters -- up to ~10 lines.
        And please make a quiz - WHO KILLED the victim?
        Multi-choise from Characters[its weapon]
        The weapon should be related to the owner charactor's nature or attributes.
        The output should be mobile screen friendly - let's say,
        {charactorX}: conversation1,
        {charactorY}: conversation2,
        {charactorZ}: conversation3
        ...
        ---
        {Question}: Who killed the victim?
        Answer1: Char1[Weapon]
        Answer2: Char2[Weapon]
        Answer3: Char3[Weapon] 
        Answer4: Char4[Weapon]
        ----
        ----
        The correct answer is XX
    `;
const sysPrompt4 = `
    Please respond in Japanese language.
    You are a kind Murder Mystery case maker.
    You want to make quiz for English students oversea.
    You will receive - 
    1 victim, 
    3 suspects happened to be there, and 1 location where the murder happened.
    And please make a quiz - WHO KILLED the victim?
    Multi-choise from Characters[its weapon]
    The weapon should be related to the owner charactor's nature or attributes.
    The output should be mobile screen friendly - let's say,
    {Victim}: [Condition]
    {Suspect1}:[Possible Weapon] "say something"
    {Suspect2}:[Possible Weapon] "say something"
    {Suspect3}:[Possible Weapon] "say something"
    ...
    ---
    {Question}: Who killed the victim?
    Answer1: Char1[Weapon]
    Answer2: Char2[Weapon]
    Answer3: Char3[Weapon] 
    ----
    ----
    The correct answer is XX - reason is bcause {YY}.
`;
function aMurderCase(chaArray, location){
    const chars = get4Unique(chaArray);
    return `A case: 
    Murderer: ${chars[0]},
    Victim: ${chars[1]},
    Suspect1: ${chars[2]},
    Suspect2: ${chars[3]},
    Location: ${location}
    `;
}

function get4Unique(array) {
    const uniqueIndices = new Set();
    while (uniqueIndices.size < 4) {
        uniqueIndices.add(Math.floor(Math.random() * array.length));
    }
    return Array.from(uniqueIndices).map(index => array[index]);
}
const sysPrompt3 = `日本語で返事してください`;
const salt3 = `こんにちわ~`;