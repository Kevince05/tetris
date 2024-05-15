var color = document.getElementById('loginCol').style.backgroundColor;
colors = color.split(',');
r = parseFloat(colors[0].substring(color.indexOf('(') + 1));
g = parseFloat(colors[1])
b = parseFloat(colors[2])
scene.clearColor = new BABYLON.Color3(r / 255, g / 255, b / 255);

startDemo();

