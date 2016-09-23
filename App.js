class App {

    goFullScreen() {
        this.canvas.goFullScreen();
    }

    startTimer(canvasRenderingElement, timeSetup, visualSetup) {
        this.canvas = new Canvas(canvasRenderingElement);
        this.canvas.resize();
        let timer = new Timer(timeSetup.minutes, timeSetup.seconds);
        const colorScheme = {
            barMain: "#ff6a00",
            barMainFlash: "#FA4092",
            barBorder: "#464646",
            text: "#00b67d"
        };
        let bar = null;
        if(visualSetup.style === "bar") {
            bar = new BarTimer(timer, this.canvas, colorScheme);
        } else if(visualSetup.style === "pie") {
            bar = new PieTimer(timer, this.canvas, colorScheme);
        }
        if(visualSetup.fullscreen) {
            this.goFullScreen();
        }

        let callback = function () {
            bar.render();
            window.requestAnimationFrame(callback);
        };
        window.requestAnimationFrame(callback);
    }
}