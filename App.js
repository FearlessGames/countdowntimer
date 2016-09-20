class App {

    startTimer(canvasRenderingElement, timeSetup) {
        this.canvas = new Canvas(canvasRenderingElement);
        this.canvas.resize();
        let timer = new Timer(timeSetup.minutes, timeSetup.seconds);
        const colorScheme = {
            barMain: "#ff6a00",
            barMainFlash: "#FA4092",
            barBorder: "#464646",
            text: "#00b67d"
        };
        //let bar = new BarTimer(timer, this.canvas, colorScheme);
        let bar = new PieTimer(timer, this.canvas, colorScheme);

        let callback = function () {
            bar.render();
            window.requestAnimationFrame(callback);
        };
        window.requestAnimationFrame(callback);
    }

    goFullScreen() {
        this.canvas.goFullScreen();
    }


}