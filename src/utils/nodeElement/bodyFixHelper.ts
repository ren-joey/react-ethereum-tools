const fixBody = () => {
    if (document.body.style.overflow === 'hidden') {
        const count = Number(document.body.getAttribute('count'));
        document.body.setAttribute('count', (count + 1).toString());
    } else {
        document.body.style.overflow = 'hidden';
    }
};

const releaseBody = () => {
    const count = Number(document.body.getAttribute('count'));
    if (count === 0) {
        document.body.style.overflow = 'visible';
    } else {
        document.body.setAttribute('count', (count - 1).toString());
    }
};

export {
    fixBody,
    releaseBody
};