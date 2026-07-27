const isValidGamePin = (pin) => {

    return /^\d{6}$/.test(pin);

};

module.exports = {
    isValidGamePin
};