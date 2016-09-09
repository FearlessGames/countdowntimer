class BarTimer {

    constructor(timer, canvas) {
        this.timer = timer;
        this.canvas = canvas;
        this.canvas.context.font = "50px sans-serif";
        this.timer.onDoneCallback = this.onDone;
    }

    render() {
        let context = this.canvas.context;
        let width = this.canvas.width;
        let height = this.canvas.height;

        let leftMargin = width * 0.04;

        let timeLeft = this.timer.timeLeft;


        context.clearRect(0, 0, width, height);
        let percentage = this.timer.completedPercentage;
        context.fillText(timeLeft.minutes + ":" + timeLeft.seconds, leftMargin, height / 2 - 100);
        this.drawBar(context, leftMargin, height / 2, width - 2 * leftMargin, 50, percentage);
        
    }

    onDone() {
        console.log("Done");
    }

    drawBar(context, x, y, width, height, percentage) {
        context.fillRect(x, y, width * percentage, height);
        
    }
}