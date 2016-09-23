class App {

    startTimer(canvasRenderingElement, timeSetup, visualStyle) {
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
        if(visualStyle === "bar") {
            bar = new BarTimer(timer, this.canvas, colorScheme);
        } else if(visualStyle === "pie") {
            bar = new PieTimer(timer, this.canvas, colorScheme);
        }

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