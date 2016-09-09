class App {

    startTimer(canvasRenderingElement) {
        this.canvas = new Canvas(canvasRenderingElement);
        this.canvas.resize();
        let timer = new Timer(0, 10);
        let bar = new BarTimer(timer);
        let that = this;
        let callback = function () {
            console.log(timer.completedPercentage);
            bar.render(that.canvas);
            window.requestAnimationFrame(callback);
        };
        window.requestAnimationFrame(callback);
    }

    goFullScreen() {
        this.canvas.goFullScreen();
    }


}