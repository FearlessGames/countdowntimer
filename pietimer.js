
class PieTimer {

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

        let d = Math.min(height, width);
        this.drawPie(context, 2* width / 3, height / 2, d/4, 250, percentage);
    }



    onDone() {
        this.done = true;
    }

    drawPie(context, x, y, width, height, percentage) {
        context.fillStyle = this.colorScheme.barBorder;
        context.beginPath();
        context.arc(x, y, width, 0, 2 * Math.PI);
        context.fill();


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
        let degreesLeft = 2* Math.PI * (1 -percentage);
        context.beginPath();
        context.arc(x, y, width, -Math.PI / 2, degreesLeft - Math.PI / 2);
        context.lineTo(x, y);
        context.fill();


    }
}