const Color = net.brehaut.Color;

class BarTimer {

    constructor(timer, canvas, colorScheme) {
        this.timer = timer;
        this.canvas = canvas;
        this.canvas.context.font = "100px sans-serif";
        this.timer.onDoneCallback = () => {
            this.onDone();
        };
        this.colorScheme = colorScheme;
        this.flashColorChange = {
            currentValue: 0,
            stride: 0.1
        };
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



        let leftMargin = width * 0.04;

        let timeLeft = this.timer.timeLeft;

        context.clearRect(0, 0, width, height);
        let percentage = this.timer.completedPercentage;
        context.fillStyle = this.colorScheme.text;
        if(this.done) {
            context.fillText("Time's up!", leftMargin, height / 2 - 100);
        } else {

            let precision = timeLeft.minutes == 0 ? 1 : 0;
            let seconds = BarTimer.zeroPad(parseFloat(timeLeft.seconds).toFixed(precision), 2);
            context.fillText(timeLeft.minutes + ":" + seconds, leftMargin, height / 2 - 100);
        }

        this.drawBar(context, leftMargin, height / 2, width - 2 * leftMargin, 250, percentage);
    }



    onDone() {
        this.done = true;
    }

    drawBar(context, x, y, width, height, percentage) {
        context.strokeStyle = this.colorScheme.barBorder;
        context.strokeRect(x - 4, y - 4, width + 8, height + 8);
        if(percentage > 0.8 && !this.done) {
            this.flashColorChange.currentValue += this.flashColorChange.stride;
            if(this.flashColorChange.currentValue >= 1 || this.flashColorChange.currentValue <= 0) {
                this.flashColorChange.stride = -this.flashColorChange.stride;
            }
        }
        const barMainColor = Color(this.colorScheme.barMain);
        const barFlashColor = Color(this.colorScheme.barMainFlash);
        let blend = barMainColor.blend(barFlashColor, this.flashColorChange.currentValue);
        context.fillStyle = blend.toCSS();
        context.fillRect(x, y, width * percentage, height);
        
    }
}