// t = current time
// b = start value
// c = change in value
// d = duration
function easeInOutQuad(
    currentTime: number,
    startVal: number,
    changeVal: number,
    duration: number
): number {
    let time = currentTime;
    time /= duration / 2;
    if (time < 1) return (changeVal / 2) * time * time + startVal;
    time -= 1;
    return (-changeVal / 2) * (time * (time - 2) - 1) + startVal;
}

function scrollTo(
    el: HTMLElement,
    to: number, // 1000
    duration: number // 3000
): void {
    const start = el.scrollTop;
    const change = to - start;
    let currentTime = 0;
    const increment = 20;
    const element = el;
    function animateScroll() {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        element.scrollTop = val;
        if (currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    }
    animateScroll();
}

/**
 * javascript scroll mover
 * @param el - 要滾動的目標 HTMLElement
 * @param to - 要滾動到的目標 offsetTop
 * @param duration - 滾動動畫時間長度，單位 ms
 * @example scrollMover(el, offsetTop, duration);
 */
const scrollMover = (
    el: HTMLElement,
    to: number,
    duration: number
): void => {
    // el 需具有 scrollTop 屬性
    scrollTo(el, to, duration);
};

export { scrollMover as default };
export { scrollMover };
