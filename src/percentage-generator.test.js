/** 
 * TODO - A couple of items to do here.. 
 * The auto mock api call needs to be hoisted however I have not implemented it in the patch at this time.
 * 
 * The current file uses the dependencies of the unit under test to get at the mocks. Therefore the unit under test needs to be imported first.
 * There are a couple ways we can get around this
 * 1 - When calling autoMock crawl deps in the file and register them with mock cache.
 * 2 - After hoisting the autoMock call return the module from the api. This would change the usage to be like so..
 *     const PercentageGenerator = jest.autoMock("./percentage-generator.js");
**/

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