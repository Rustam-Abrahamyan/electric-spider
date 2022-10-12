class Segment {
    constructor(context, parent, l, a, first) {
        this.context = context;
        this.first = first;

        if (first) {
            this.pos = {
                x: parent.x,
                y: parent.y,
            };
        } else {
            this.pos = {
                x: parent.nextPos.x,
                y: parent.nextPos.y,
            };
        }

        this.l = l;
        this.ang = a;

        this.nextPos = {
            x: this.pos.x + this.l * Math.cos(this.ang),
            y: this.pos.y + this.l * Math.sin(this.ang),
        };
    }

    show() {
        this.context.lineTo(this.nextPos.x, this.nextPos.y);
    }

    update(t) {
        this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
        this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
        this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
    }

    fallback(t) {
        this.pos.x = t.x;
        this.pos.y = t.y;
        this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
        this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
    }
}

export default Segment;
