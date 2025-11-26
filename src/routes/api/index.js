"use strict";

const pdf = require('./pdf');

module.exports.register = async server => {
    await pdf.register( server );
};