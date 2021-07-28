// TODO Should return the unit from the next line and hoist the next line to ensure that the deps are registered prior to import.
jest.autoMock("./percentage-generator.js");
const PercentageGenerator = require('./percentage-generator');

// Same mocks the unit under test receives unless specified  
const round = require("./round");
const random = require("./random");

test('with dependencies mocked no percentage returned', done => {
  // Arrange
  const num = 5;
  random.mockReturnValue(num);
  round.mockImplementation(num => num);

  const generator = new PercentageGenerator();

  // Assert
  generator.observe().subscribe(percentage => {
    expect(percentage).toBe(num);
    done();
  });

  // Act
  generator.next();
});