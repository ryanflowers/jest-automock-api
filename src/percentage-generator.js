// 3rd party dep that we wish not be auto mocked
const { Subject } = require("rxjs");

// Internal abs dep that should ALWAYS be mocked.
const round = require("./round");
const random = require("./random");

class PercentageGenerator {

  constructor() {
    this._subject = new Subject();
  }

  /**
   * Generates a new random number when executed.
   */
  next() {
    this._subject.next(round(random()));
  }

  /**
   * Supplies an observable to receive incoming numbers.
   */
  observe() {
    return this._subject.asObservable();
  }
}

module.exports = PercentageGenerator;