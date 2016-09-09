class BarTimer {

    constructor(timer) {
        this.timer = timer;
    }

    render(canvas) {
        let context = canvas.context;
        let width = canvas.width;
        let height = canvas.height;

        let leftMargin = width * 0.04;
        this.drawBar(context, leftMargin, height / 2, width - 2 * leftMargin, 50, this.timer.completedPercentage);
    }

    drawBar(context, x, y, width, height, percentage) {
        context.fillRect(x, y, width * percentage, height);
    }
}