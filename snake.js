class Snake {
    constructor() {
        this.row = document.querySelector('.row');
        this.count = 0;
        this.direction = 'Right';
        this.food = [{ x: 13, y: 13 }, { x: 1, y: 11 }, { x: 9, y: 2 }, { x: 6, y: 5 }]
        this.snakeArr = [{ x: 2, y: 2 }]
        this.lastRenderTime = 0;
    }

    changeDurection = () => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                this.direction = 'Down';
            }
            else if (e.key === 'ArrowUp') {
                this.direction = 'Up'
            }
            else if (e.key === 'ArrowLeft') {
                this.direction = 'Left'
            }
            else if (e.key === 'ArrowRight') {
                this.direction = 'Right'
            }
        })
    }
    collideBoundry = (head) => {
        if (head.x === 0 || head.x === 19 || head.y === 0 || head.y === 19) {
            alert("Game over");
            window.location.reload();
        }
    }
    handleFoodPosition = () => {
        this.count = this.count + 1;
        if (this.count === 3) {
            this.count = 0
        }
    }
    moveSnake = () => {
        this.changeDurection();
        switch (this.direction) {
            case "Left":
                for (let i = this.snakeArr.length - 1; i >= 0; i--) {
                    if (i === 0) {
                        this.snakeArr[i].y = this.snakeArr[i].y
                        this.snakeArr[i].x = this.snakeArr[i].x - 1;
                        if (this.snakeArr[i].x === this.food[this.count].x && this.snakeArr[i].y === this.food[this.count].y) {
                            this.snakeArr.push({ x: this.snakeArr[this.snakeArr.length - 1].x + 1, y: this.snakeArr[this.snakeArr.length - 1].y });
                            this.handleFoodPosition()
                        }
                        this.collideBoundry(this.snakeArr[i])
                    }
                    else {
                        this.snakeArr[i].y = this.snakeArr[i - 1].y
                        this.snakeArr[i].x = this.snakeArr[i - 1].x
                    }
                }
                break;
            case "Right":
                for (let i = this.snakeArr.length - 1; i >= 0; i--) {
                    if (i === 0) {
                        this.snakeArr[i].y = this.snakeArr[i].y
                        this.snakeArr[i].x = this.snakeArr[i].x + 1;
                        if (this.snakeArr[i].x === this.food[this.count].x && this.snakeArr[i].y === this.food[this.count].y) {
                            this.snakeArr.push({ x: this.snakeArr[this.snakeArr.length - 1].x - 1, y: this.snakeArr[this.snakeArr.length - 1].y });
                            this.handleFoodPosition()
                        }
                        this.collideBoundry(this.snakeArr[i])
                    }
                    else {
                        this.snakeArr[i].y = this.snakeArr[i - 1].y
                        this.snakeArr[i].x = this.snakeArr[i - 1].x
                    }
                }
                break;
            case "Up":
                for (let i = this.snakeArr.length - 1; i >= 0; i--) {
                    if (i === 0) {
                        this.snakeArr[i].y = this.snakeArr[i].y - 1
                        this.snakeArr[i].x = this.snakeArr[i].x;
                        if (this.snakeArr[i].x === this.food[this.count].x && this.snakeArr[i].y === this.food[this.count].y) {
                            this.snakeArr.push({ x: this.snakeArr[this.snakeArr.length - 1].x, y: this.snakeArr[this.snakeArr.length - 1].y + 1 })
                            this.handleFoodPosition()
                        }
                        this.collideBoundry(this.snakeArr[i])
                    }
                    else {
                        this.snakeArr[i].y = this.snakeArr[i - 1].y
                        this.snakeArr[i].x = this.snakeArr[i - 1].x
                    }
                }
                break;
            case "Down":
                for (let i = this.snakeArr.length - 1; i >= 0; i--) {
                    if (i === 0) {
                        this.snakeArr[i].y = this.snakeArr[i].y + 1
                        this.snakeArr[i].x = this.snakeArr[i].x;
                        if (this.snakeArr[i].x === this.food[this.count].x && this.snakeArr[i].y === this.food[this.count].y) {
                            this.snakeArr.push({ x: this.snakeArr[this.snakeArr.length - 1].x, y: this.snakeArr[this.snakeArr.length - 1].y - 1 })
                            this.handleFoodPosition()
                        }
                        this.collideBoundry(this.snakeArr[i])
                    }
                    else {
                        this.snakeArr[i].y = this.snakeArr[i - 1].y
                        this.snakeArr[i].x = this.snakeArr[i - 1].x
                    }
                }
                break;
        }
    }
    gameEngine = () => {
        this.moveSnake();
        this.row.innerHTML = ""
        this.snakeArr.forEach((snakeElement, index) => {
            let node = document.createElement('div');
            node.style.gridRowStart = snakeElement.y;
            node.style.gridColumnStart = snakeElement.x;
            if (index === 0) {
                node.classList.add('head');
            }
            else {
                node.classList.add('body');
            }
            this.row.appendChild(node);
        })

        let node = document.createElement('div');
        node.style.gridRowStart = this.food[this.count].y;
        node.style.gridColumnStart = this.food[this.count].x;
        node.classList.add('food');
        this.row.appendChild(node);
    }
}

const snake = new Snake();

let main = (currentTime) => {
    window.requestAnimationFrame(main);
    if ((currentTime - snake.lastRenderTime) / 1000 < 1 / 4) {
        return;
    }
    snake.lastRenderTime = currentTime;
    snake.gameEngine();
}

window.requestAnimationFrame(main)