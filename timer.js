class Timer {
    constructor(minutes, seconds) {
        this.startTimestamp = Date.now();
        this.durationInMillis = ((minutes * 60) + seconds) * 1000;
        this.endTimeStamp = this.startTimestamp + this.durationInMillis;
    }

    get completedPercentage() {
        const now = Date.now();
        return Math.min((now - this.startTimestamp) / this.durationInMillis, 1.0);
    }
}