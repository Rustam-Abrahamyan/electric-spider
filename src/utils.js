export const requestAnimationFrame = (callback) => {
    const fps = 60;
    const requestAnimationFrameFn =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (f) {
            return setTimeout(f, 1000 / fps);
        };

    return requestAnimationFrameFn(callback);
};

export const dist = (p1x, p1y, p2x, p2y) => {
    return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
};