export const manageLongText = (text: string, maxLength: number) => {
    if (!text) {
        return '';
    }

    if (text.length <= maxLength) {
        return text;
    }

    const splitText = text.split(' ').slice(0, maxLength / 7).join(' ');

    return `${splitText}...`;
};
