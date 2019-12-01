document.querySelectorAll('.templates__item').forEach(item => {
  item.addEventListener('click', () => {
    const { type, url } = item.dataset;

    switch (type) {
      case 'pixels':
        renderPixels(url);
        break;

      case 'image':
        renderImage(url);
        break;

      default:
        break;
    }
  });
});

function renderPixels(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let canvas = document.querySelector('canvas');
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let width = data.length,
        height = data.length,
        scale = 512 / data.length;
      canvas.width = width * scale;
      canvas.height = height * scale;

      let count = 0;

      for (let x = 0; x < Math.ceil(height / 2); x++) {
        for (let y = 0; y < Math.ceil(width / 2); y++) {
          const x2 = height - x - 1;
          const y2 = width - y - 1;

          ctx.fillStyle = getColor(data[x][y]);
          ctx.fillRect(y * scale, x * scale, scale, scale);

          ctx.fillStyle = getColor(data[x][y2]);
          ctx.fillRect(y2 * scale, x * scale, scale, scale);

          ctx.fillStyle = getColor(data[x2][y]);
          ctx.fillRect(y * scale, x2 * scale, scale, scale);

          ctx.fillStyle = getColor(data[x2][y2]);
          ctx.fillRect(y2 * scale, x2 * scale, scale, scale);

          count += 1;
        }

        // debugger;
      }

      // 1024 -> O(n)
      // 512 -> O(n / 2) -> O(n)

      console.log('count:', count);
    });
}

function renderImage(url) {
  let canvas = document.querySelector('canvas');
  let ctx = canvas.getContext('2d');
  let img = new Image();

  img.onload = draw;
  img.src = url;

  function draw() {
    ctx.drawImage(img, 0, 0, 512, 512);
  }
}

function getColor(item) {
  if (Array.isArray(item)) {
    return `rgba(${item[0]},${item[1]},${item[2]},${item[3]})`;
  }

  return `#${item}`;
}

// size4.onclick = function () {
//     const square = [
//     ["00BCD4", "FFEB3B","FFEB3B","00BCD4"],
//     ["FFEB3B", "FFC107","FFC107","FFEB3B"],
//     ["FFEB3B", "FFC107","FFC107","FFEB3B"],
//     ["00BCD4", "FFEB3B","FFEB3B","00BCD4"]
//     ];

//     width = square[0].length;
//     height = square.length;
//     let canvas = document.querySelector("canvas");

//     if (canvas.getContext) {
//         let ctx = canvas.getContext('2d');
//         for (let row = 0; row < height; row++) {
//             for (let col = 0; col < width; col++) {
//                 ctx.fillStyle = '#' + square[row][col];
//                 ctx.fillRect(col * 128, row * 128, 128, 128);
//             }
//         }
//     }
// };

// size32.onclick = function() {
//     width = logo[0].length;
//     height = logo.length;

//     let canvas = document.querySelector("canvas");
//     if (canvas.getContext) {
//         let ctx = canvas.getContext('2d');
//         for (let row = 0; row < height; row++) {
//             for (let col = 0; col < width; col++) {
//                 let pixel = logo[row][col];
//                 ctx.fillStyle = `rgba(
//                     ${pixel[0]},
//                     ${pixel[1]},
//                     ${pixel[2]},
//                     ${pixel[3]})`;;
//                 ctx.fillRect(col * 16, row * 16, 16, 16);
//             }
//         }
//     }
// };

// size256.onclick = function() {
//     let canvas = document.querySelector("canvas");
//     let ctx = canvas.getContext('2d');
//     let img = new Image(512,512);

//     img.onload = draw;
//     img.src = 'assets/img/rsschool.png';

//     function draw(){
//     ctx.drawImage(img, 0, 0, 512, 512);
//     }
// };
