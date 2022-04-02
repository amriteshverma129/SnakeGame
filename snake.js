let row = document.querySelector('.row');
let count = 0;
let direction = 'Right';
let food = [{ x: 13, y: 13 }, { x: 1, y: 11 }, { x: 9, y: 2 }, { x: 6, y: 5 }]
let snakeArr = [{ x: 2, y: 2 }]
let lastRenderTime = 0;
let main = (currentTime) => {
    window.requestAnimationFrame(main);
    if ((currentTime - lastRenderTime) / 1000 < 1 / 4) {
        return;
    }
    lastRenderTime = currentTime;
    gameEngine();
}
let changeDurection = () => {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            direction = 'Down';
        }
        else if (e.key === 'ArrowUp') {
            direction = 'Up'
        }
        else if (e.key === 'ArrowLeft') {
            direction = 'Left'
        }
        else if (e.key === 'ArrowRight') {
            direction = 'Right'
        }
    })
}
let collideBoundry = (head) => {
    if (head.x === 0 || head.x === 19 || head.y === 0 || head.y === 19) {
        alert("Game over");
        window.location.reload();
    }
}
let handleFoodPosition = () => {
    count = count + 1;
    if (count === 3) {
        count = 0
    }
}
let moveSnake = () => {
    changeDurection();
    switch (direction) {
        case "Left":
            for (let i = snakeArr.length - 1; i >= 0; i--) {
                if (i === 0) {
                    snakeArr[i].y = snakeArr[i].y
                    snakeArr[i].x = snakeArr[i].x - 1;
                    if (snakeArr[i].x === food[count].x && snakeArr[i].y === food[count].y) {
                        snakeArr.push({ x: snakeArr[snakeArr.length - 1].x + 1, y: snakeArr[snakeArr.length - 1].y });
                        handleFoodPosition()
                    }
                    collideBoundry(snakeArr[i])
                }
                else {
                    snakeArr[i].y = snakeArr[i - 1].y
                    snakeArr[i].x = snakeArr[i - 1].x
                }
            }
            break;
        case "Right":
            for (let i = snakeArr.length - 1; i >= 0; i--) {
                if (i === 0) {
                    snakeArr[i].y = snakeArr[i].y
                    snakeArr[i].x = snakeArr[i].x + 1;
                    if (snakeArr[i].x === food[count].x && snakeArr[i].y === food[count].y) {
                        snakeArr.push({ x: snakeArr[snakeArr.length - 1].x - 1, y: snakeArr[snakeArr.length - 1].y });
                        handleFoodPosition()
                    }
                    collideBoundry(snakeArr[i])
                }
                else {
                    snakeArr[i].y = snakeArr[i - 1].y
                    snakeArr[i].x = snakeArr[i - 1].x
                }
            }
            break;
        case "Up":
            for (let i = snakeArr.length - 1; i >= 0; i--) {
                if (i === 0) {
                    snakeArr[i].y = snakeArr[i].y - 1;
                    snakeArr[i].x = snakeArr[i].x;
                    if (snakeArr[i].x === food[count].x && snakeArr[i].y === food[count].y) {
                        snakeArr.push({ x: snakeArr[snakeArr.length - 1].x, y: snakeArr[snakeArr.length - 1].y + 1 })
                        handleFoodPosition()
                    }
                    collideBoundry(snakeArr[i])
                }
                else {
                    snakeArr[i].y = snakeArr[i - 1].y
                    snakeArr[i].x = snakeArr[i - 1].x
                }
            }
            break;
        case "Down":
            for (let i = snakeArr.length - 1; i >= 0; i--) {
                if (i === 0) {
                    snakeArr[i].x = snakeArr[i].x;
                    snakeArr[i].y = snakeArr[i].y + 1;
                    if (snakeArr[i].x === food[count].x && snakeArr[i].y === food[count].y) {
                        snakeArr.push({ x: snakeArr[snakeArr.length - 1].x, y: snakeArr[snakeArr.length - 1].y - 1 })
                        handleFoodPosition()
                    }
                    collideBoundry(snakeArr[i])
                }
                else {
                    snakeArr[i].y = snakeArr[i - 1].y
                    snakeArr[i].x = snakeArr[i - 1].x
                }
            }
            break;
    }
}
let gameEngine = () => {
    moveSnake();
    row.innerHTML = ""
    snakeArr.forEach((snakeElement, index) => {
        let node = document.createElement('div');
        node.style.gridRowStart = snakeElement.y;
        node.style.gridColumnStart = snakeElement.x;
        if (index === 0) {
            node.classList.add('head');
        }
        else {
            node.classList.add('body');
        }
        row.appendChild(node);
    })


    let node = document.createElement('div');
    node.style.gridRowStart = food[count].y;
    node.style.gridColumnStart = food[count].x;
    node.classList.add('food');
    row.appendChild(node)

}
window.requestAnimationFrame(main)
