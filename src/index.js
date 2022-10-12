import Tentacle from "./tentacle";
import { requestAnimationFrame, dist } from "./utils";

window.onload = () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.fillRect(0, 0, canvas.width, canvas.height);

    const mouse = { x: false, y: false };

    const maxTentacleLength = 250;
    const minTentacleLength = 50;
    const pointsCount = 500;
    const n = 50;
    const tentacles = [];
    const target = { x: 0, y: 0 };
    const lastTarget = {};
    const q = 10;

    let t = 0;

    for (let i = 0; i < pointsCount; i++) {
        tentacles.push(
            new Tentacle(
                context,
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                Math.random() * (maxTentacleLength - minTentacleLength) + minTentacleLength,
                n
            )
        );
    }

    const draw = () => {
        const { width, height } = canvas;
        let targetX, targetY;

        if (mouse.x) {
            targetX = mouse.x - target.x;
            targetY = mouse.y - target.y;
        } else {
            targetX = width / 2 + ((height / 2 - q) * Math.sqrt(2) * Math.cos(t)) / (Math.pow(Math.sin(t), 2) + 1) - target.x;
            targetY =
                height / 2 + ((height / 2 - q) * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) / (Math.pow(Math.sin(t), 2) + 1) - target.y;
        }

        target.x += targetX / 10;
        target.y += targetY / 10;

        t += 0.01;

        context.beginPath();
        context.arc(target.x, target.y, dist(lastTarget.x, lastTarget.y, target.x, target.y) + 5, 0, 2 * Math.PI);
        context.fillStyle = "rgb(153, 204, 255)";
        context.fill();

        for (let i = 0; i < pointsCount; i++) {
            tentacles[i].move(lastTarget, target);
            tentacles[i].showPoints(target);
        }

        for (let i = 0; i < pointsCount; i++) {
            tentacles[i].show(target);
        }

        lastTarget.x = target.x;
        lastTarget.y = target.y;
    };

    const animate = () => {
        requestAnimationFrame(animate);

        context.clearRect(0, 0, canvas.width, canvas.height);

        draw();
    };

    canvas.addEventListener(
        "mousemove",
        (e) => {
            mouse.x = e.pageX - canvas.offsetLeft;
            mouse.y = e.pageY - canvas.offsetTop;
        },
        false
    );

    canvas.addEventListener("mouseleave", () => {
        mouse.x = false;
        mouse.y = false;
    });

    window.addEventListener("resize", () => {
        canvas.width - window.innerWidth;
        canvas.height - window.innerHeight;
    });

    animate();
};
