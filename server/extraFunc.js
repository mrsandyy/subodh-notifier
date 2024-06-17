export let getThresholdDate = (days) => {
    const today = new Date();
    return new Date(today.getTime() - (days * 24 * 60 * 60 * 1000));  // 3 days in milliseconds
};

export let getRandomDelay = (min, max) => {

    min *= 1000;
    max *= 1000;

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export let getElementDate = (element) => {
    return new Date(element.date.split('/').reverse().join('-'));
};