class Canvas {


    constructor(canvas) {
        this.canvas = canvas;
        window.addEventListener('resize', this.resize, false);
    }

    get context() {
        return this.canvas.getContext('2d');
    }

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }


    goFullScreen() {

        if (this.canvas.requestFullScreen) {
            this.canvas.requestFullScreen();
        } else if (this.canvas.webkitRequestFullScreen) {
            this.canvas.webkitRequestFullScreen();
        } else if (this.canvas.mozRequestFullScreen) {
            this.canvas.mozRequestFullScreen();
        }
    }


    resize() {
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
    }
}