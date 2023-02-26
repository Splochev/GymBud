
export default class CountDownTimer {
    constructor(duration, granularity) {
        this.duration = duration;
        this.granularity = granularity || 1000;
        this.tickFtns = [];
        this.running = false;
    }

    start() {
        if (this.running) {
            return;
        }
        this.running = true;
        var start = Date.now(),
            that = this,
            diff, obj;

        (function timer() {
            diff = that.duration - (((Date.now() - start) / 1000) | 0);

            if (diff > 0) {
                setTimeout(timer, that.granularity);
            } else {
                diff = 0;
                that.running = false;
            }

            obj = CountDownTimer.parseTime(diff);
            that.tickFtns.forEach(function (ftn) {
                ftn.call(this, obj.minutes, obj.seconds);
            }, that);
        }());
    };

    onTick(ftn) {
        if (typeof ftn === 'function') {
            this.tickFtns.push(ftn);
        }
        return this;
    };

    expired() {
        return !this.running;
    };

    static parseTime(seconds) {
        return {
            'minutes': (seconds / 60) | 0,
            'seconds': (seconds % 60) | 0
        };
    }
}