function createRandomExtensions()
{
    const characters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    var extension = "";

    for(var i=0;i<5;i++)
    {
        extension += characters[Math.floor(Math.random()*characters.length)];
    }

    return extension;
}

module.exports = createRandomExtensions;