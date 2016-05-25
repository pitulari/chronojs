(function (global) {
    function ChronoJs() {
        var ChronoJs = {
            options: {
                timeInterval: 1000,
                seconds: true,
                forward: true,
                timeStart: 0, //Seconds to 0.
                elementDom: '',
                dateToStart: null,
                callback: null
            },
            idChrono: 0,
            start: null,
            diff: '',
            miliseconds: 0,
            countSeconds: 0,
            countDownId: null,
            initValueInDom: '',

            initialize: function (attrs) {
                this.loadOptions(attrs);
                this.loadDataInDom();
            },

            startChrono: function () {
                if (null == this.start) {
                    this.start = new Date();
                }
                if (this.chronoIsNotStarted()) {
                    if (this.options.forward) {
                        this.idChrono = window.setInterval(this.chrono, this.options.timeInterval, this);
                    } else {
                        this.idChrono = window.setInterval(this.countdown, this.options.timeInterval, this);
                    }

                    return this.idChrono;
                }
            },

            pauseChrono: function () {
                if (this.isCountDown()) {
                    this.countSeconds = 0;
                }
                clearTimeout(this.idChrono);
                this.idChrono = 0;
            },

            stopChrono: function (firesCallback) {
                this.pauseChrono();
                if (firesCallback) {
                    this.fireCallback();
                }
                this.start = null;
            },

            chronoIsNotStarted: function () {
                return (this.idChrono == 0) ? true : false;
            },

            chrono: function (self) {
                var end = new Date(),
                    diff,
                    sec,
                    min,
                    hr,
                    cronoValue;

                diff = end - self.start;
                self.diff = new Date(diff);
                sec = self.diff.getSeconds();
                min = self.diff.getMinutes();
                hr = self.diff.getHours() - 1;

                if (hr < 10) {
                    hr = "0" + hr;
                }
                if (min < 10) {
                    min = "0" + min;
                }
                if (sec < 10) {
                    sec = "0" + sec;
                }

                if (self.options.seconds) {
                    cronoValue = (hr + ":" + min + ":" + sec);
                } else {
                    cronoValue = (hr + ":" + min);
                }
                self.miliseconds = (hr * 360000) + (min * 60000) + (sec * 1000);

                if (self.options.elementDom) {
                    $(self.options.elementDom).html(cronoValue);
                }

                return self.miliseconds;
            },

            countdown: function (self) {
                var diff;

                diff = self.options.timeStart - self.countSeconds;

                if (0 === diff) {
                    self.stopChrono(true);
                } else {
                    self.countSeconds++;
                }

                if (self.options.seconds) {
                    $(self.options.elementDom).html(diff);
                } else {
                    $(self.options.elementDom).html(self.secondsToHms(diff));
                }

                return diff;
            },

            secondsToHms: function (d) {
                var h, m, s;

                d = Number(d);
                h = Math.floor(d / 3600);
                m = Math.floor(d % 3600 / 60);
                s = Math.floor(d % 3600 % 60);

                return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
            },

            loadOptions: function (attrs) {
                var options = attrs.options;

                if (options) {
                    if (options.timeInterva) {
                        this.options.timeInterval = options.timeInterval;
                    }
                    if (!options.seconds) {
                        this.options.seconds = options.seconds;
                    }
                    if (!options.forward) {
                        this.options.forward = options.forward;
                    }
                    if (options.timeStart) {
                        this.options.timeStart = options.timeStart;
                    }
                    if (options.elementDom) {
                        this.options.elementDom = options.elementDom;
                    }
                    if (options.dateToStrat) {
                        this.start = options.dateToStart;
                    }
                    if (options.callback) {
                        this.options.callback = options.callback;
                    }
                }
            },

            isCountDown: function () {
                return !this.options.forward;
            },

            loadDataInDom: function () {
                if (!this.options.forward && this.options.elementDom) {
                    if (this.options.seconds) {
                        $(this.options.elementDom).html(this.options.timeStart);
                    } else {
                        $(this.options.elementDom).html(this.secondsToHms(this.options.timeStart));
                    }
                }
            },

            fireCallback: function () {
                if (this.options.callback) {
                    this.options.callback();
                }
            }
        };

        return ChronoJs;
    };

    return global.ChronoJs = ChronoJs;
}(this));