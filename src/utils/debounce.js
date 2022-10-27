//手写一个防抖
function debounce(fn, wait, immediate) {
    let timer;
    return function(...arg) {
        timer && clearTimeout(timer);
        if (immediate) {
            if (!timer) {
                fn.call(this, ...arg);
            }
            timer = setTimeout(() => {
                timer = null;
            }, wait);
        } else {
            timer = setTimeout(() => {
                fn.call(this, ...arg);
            }, wait);
        }
    };
}
export default debounce;