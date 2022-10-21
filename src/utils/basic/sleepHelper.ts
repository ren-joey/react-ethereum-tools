const sleepHelper = (delay: number) => new Promise((res) => {
    setTimeout(res, delay);
});

export default sleepHelper;