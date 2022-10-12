import Segment from "./segment";
import { dist } from "./utils";

class Tentacle {
    constructor(context, x, y, l, n) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.l = l;
        this.n = n;
        this.t = {};
        this.rand = Math.random();
        this.segments = [new Segment(context, this, this.l / this.n, 0, true)];

        for (let i = 1; i < this.n; i++) {
            this.segments.push(new Segment(context, this.segments[i - 1], this.l / this.n, 0, false));
        }
    }

    move(last_target, target) {
        this.angle = Math.atan2(target.y - this.y, target.x - this.x);
        this.dt = dist(last_target.x, last_target.y, target.x, target.y) + 5;
        this.t = {
            x: target.x - 0.8 * this.dt * Math.cos(this.angle),
            y: target.y - 0.8 * this.dt * Math.sin(this.angle),
        };

        if (this.t.x) {
            this.segments[this.n - 1].update(this.t);
        } else {
            this.segments[this.n - 1].update(target);
        }

        for (let i = this.n - 2; i >= 0; i--) {
            this.segments[i].update(this.segments[i + 1].pos);
        }

        if (dist(this.x, this.y, target.x, target.y) <= this.l + dist(last_target.x, last_target.y, target.x, target.y)) {
            this.segments[0].fallback({ x: this.x, y: this.y });

            for (let i = 1; i < this.n; i++) {
                this.segments[i].fallback(this.segments[i - 1].nextPos);
            }
        }
    }

    show(target) {
        const color = "hsl(" + (this.rand * 60 + 180) + ",100%," + (this.rand * 60 + 25) + "%)";

        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
            this.context.globalCompositeOperation = "lighter";
            this.context.beginPath();
            this.context.lineTo(this.x, this.y);

            for (let i = 0; i < this.n; i++) {
                this.segments[i].show();
            }

            this.context.strokeStyle = color;
            this.context.lineWidth = this.rand * 2;
            this.context.lineCap = "round";
            this.context.lineJoin = "round";
            this.context.stroke();
            this.context.globalCompositeOperation = "source-over";
        }
    }

    showPoints(target) {
        this.context.beginPath();

        if (dist(this.x, this.y, target.x, target.y) <= this.l) {
            this.context.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI);
            this.context.fillStyle = "rgb(255, 255, 255)";
        } else {
            this.context.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI);
            this.context.fillStyle = "rgb(100, 100, 100)";
        }

        this.context.fill();
    }
}

export default Tentacle;
