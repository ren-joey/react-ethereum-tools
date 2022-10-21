const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        return true;
    } catch (err) {
        return false;
    }
};

const copyTextToClipboard = (text: string) => {
    let res;
    if (!navigator.clipboard) {
        res = fallbackCopyTextToClipboard(text);
        if (!res) return false;
    }

    navigator.clipboard.writeText(text).then(() => {
    }, () => false);

    return true;
};

export { copyTextToClipboard };
