class Timer {
    constructor(minutes, seconds) {
        this.startTimestamp = Date.now();
        this.durationInMillis = ((minutes * 60) + seconds) * 1000;
        this.endTimeStamp = this.startTimestamp + this.durationInMillis;

    }
    
    set onDoneCallback(callback) {
        window.setTimeout(callback, this.millisLeft);
    }

    get completedPercentage() {
        const now = Date.now();
        return Math.min((now - this.startTimestamp) / this.durationInMillis, 1.0);
    }

    get timeLeft() {

        let secondsLeft = this.millisLeft / 1000;
        let minLeft = Math.floor(secondsLeft / 60);
        secondsLeft = secondsLeft - (minLeft * 60);
        return {
            done : this.millisLeft == 0,
            minutes: minLeft,
            seconds: secondsLeft
        };
    }

    get millisLeft() {
        const now = Date.now();
        let millisLeft = Math.max(this.endTimeStamp - now, 0);
        return millisLeft;
    }
}