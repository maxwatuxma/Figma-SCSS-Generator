const request = require("request");
const config = require('./config');
const Color = require("./colors");
const Typographie = require("./typography");
// const Gradient = require("./gradients")

const start = Date.now();
var options = {
    method: 'GET',
    url: config["projectUrl"],
    headers:
        {'X-Figma-Token': config["X-Figma-Token"]}
};


request(options, function (error, response, body) {
    if (error) throw new Error(error);
    const data = JSON.parse(body).document.children[0].children
    const fonts = data
        .filter(child => child.name === 'fonts')[0].children
        .filter(child => child.type === "TEXT");


    const colors = data
        .filter(child => (child.name === 'colors'))[0].children
        .filter(child => child.type !== "TEXT");
    //
    // const mobileFonts = data
    //   .filter(child => child.name === 'Mobile Fonts')[0].children
    //   .filter(child => child.type === "TEXT");


    // const gradients = data
    //   .filter(child => child.name === 'Gradients')[0].children
    //   .filter(child => child.type !== "TEXT");
    // const gradientObjects = gradients.map(gradient => new Gradient(gradient));

    const typographieObjects = fonts.map(font => new Typographie(font))

    const colorObjects = colors.map(color => new Color(color));


    typographieObjects.forEach(font => {
        console.log(font);
    });

    colorObjects.forEach(color => {
        console.log(color.cssVariables);
    });


    //
    // console.log('\n');
    // gradientObjects.forEach(gradient => {
    //   gradient.colorObjects.forEach(colorObject => console.log(colorObject.cssVariables))
    //   console.log();
    // })

    // console.log('\n');
    //
    // gradientObjects.forEach(gradient => {
    //   console.log(gradient.cssVariables, '\n');
    // })
    const end = Date.now();
    const time = ((end - start) / 1000).toFixed(2)
    console.log('Completed in:', time + 's')
})
