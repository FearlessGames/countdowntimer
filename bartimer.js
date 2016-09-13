class BarTimer {

    constructor(timer, canvas) {
        this.timer = timer;
        this.canvas = canvas;
        this.canvas.context.font = "50px sans-serif";
        this.timer.onDoneCallback = () => {
            this.onDone();
        };
        
        this.color = 0;
        this.done = false;
    }

    static zeroPad(num, places) {
        let integerPart = num.toString().match(/\d+/)[0];
        let zero = places - integerPart.length + 1;
        return new Array(+(zero > 0 && zero)).join("0") + num;
    }

    render() {
        let context = this.canvas.context;
        let width = this.canvas.width;
        let height = this.canvas.height;

        context.fillStyle = "#000000";

        let leftMargin = width * 0.04;

        let timeLeft = this.timer.timeLeft;

        context.clearRect(0, 0, width, height);
        let percentage = this.timer.completedPercentage;
        if(this.done) {
            context.fillText("Time's up!", leftMargin, height / 2 - 100);
        } else {

            let precision = timeLeft.minutes == 0 ? 1 : 0;
            let seconds = BarTimer.zeroPad(parseFloat(timeLeft.seconds).toFixed(precision), 2);
            context.fillText(timeLeft.minutes + ":" + seconds, leftMargin, height / 2 - 100);
        }
        
        this.drawBar(context, leftMargin, height / 2, width - 2 * leftMargin, 50, percentage);
    }



    onDone() {
        this.done = true;
    }

    drawBar(context, x, y, width, height, percentage) {
        context.strokeStyle = "#000000";
        context.strokeRect(x - 4, y - 4, width + 8, height + 8);
        if(percentage > 0.8 && !this.done) {
            this.color += 10;
            if(this.color >= 99) {
                this.color = 0;
            }
            context.fillStyle = "#" + this.color + "0000";
        }
        
        context.fillRect(x, y, width * percentage, height);
        
    }
}