const background_generator = (map) => {
  let container = document.getElementById("container");
  container.style = "grid-template-columns:repeat(" + map[0].length + ", 1fr)";

  map.forEach((row) => {
    row.forEach((col) => {
      switch (col) {
        case 0:
          create_block("./Free/Background/Brown.png", 50);
          break;
        case 1:
          create_block("./Free/Background/Blue.png", 50);
          break;
        case 2:
          create_block("./Free/Background/Green.png", 50);
          break;
        case 3:
          create_block("./Free/Items/Checkpoints/Start/Start (Idle).png", 50);
        default:
          break;
      }
    });
  });
};

const create_block = (src, width) => {
  let container = document.getElementById("container");
  let block = document.createElement("div");
  block.setAttribute("class", "block");

  let img = document.createElement("img");
  img.setAttribute("src", src);
  img.width = width;

  block.appendChild(img);
  container.append(block);
};

background_generator(map);