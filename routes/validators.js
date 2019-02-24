const Validator = function() {

};

Validator.rollValidator = [
  check('rollValue').isInt({min: 0, max: 10}),
];
