document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("whats Your Name ?");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
};

let duration = 1000;

let matchedBlocks = 0;

let blocksContainer = document.querySelector(".game-container");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", () => {
    flipBlock(block);
  });
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allFlippedBlocks.length === 2) {
    stopClicking();

    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    matchedBlocks += 2;

    document.getElementById("correct").play();

    if (matchedBlocks === blocks.length) {
      document.getElementById("win").play();
      setTimeout(() => {
        alert(`        Congratulations!
        You Win!!!`);
        location.reload();
      }, duration);
    }
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);

    if (parseInt(triesElement.innerHTML) === 10) {
      setTimeout(() => {
        document.getElementById("fail").play();
        alert(`        R.I.P Your IQ 
        game over!!!`);
        location.reload();
      }, duration);
    }
  }
}

function shuffle(Array) {
  let current = Array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);

    current--;

    temp = Array[current];
    Array[current] = Array[random];
    Array[random] = temp;
  }
  return Array;
}
