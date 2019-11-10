size4.onclick = function () {
    const square = [
    ["00BCD4", "FFEB3B","FFEB3B","00BCD4"],
    ["FFEB3B", "FFC107","FFC107","FFEB3B"],
    ["FFEB3B", "FFC107","FFC107","FFEB3B"],
    ["00BCD4", "FFEB3B","FFEB3B","00BCD4"]
    ];

    width = square[0].length;
    height = square.length;
    let canvas = document.querySelector("canvas");

    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                ctx.fillStyle = '#' + square[row][col];
                ctx.fillRect(col * 128, row * 128, 128, 128);
            }
        }
    }
};



size32.onclick = function() {
    width = logo[0].length;
    height = logo.length;

    let canvas = document.querySelector("canvas");
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                let pixel = logo[row][col];
                ctx.fillStyle = `rgba(
                    ${pixel[0]},
                    ${pixel[1]},
                    ${pixel[2]},
                    ${pixel[3]})`;;
                ctx.fillRect(col * 16, row * 16, 16, 16);
            }
        }
    }
};

size256.onclick = function() {
    let canvas = document.querySelector("canvas");
    let ctx = canvas.getContext('2d');
    let img = new Image(512,512);

    img.onload = draw;
    img.src = 'assets/img/rsschool.png';

    function draw(){
    ctx.drawImage(img, 0, 0, 512, 512);
    }
};