# jest-automock-api

This repo is a demonstration of support of an auto mock api in jest. 

Currently jest has no idea what the unit under test is for a given test file. Jest treats all imports as equal. The only way to leverage jests auto mock infra is by opt in api at the module level or globally via config. However there is an in between that would be used more often.

## Issues with current options

### autoMock:true Configuration
Mocks everything. So you are forced to unmock to opt out.
 - All dependencies of the test itself including the unit under test.
 - All 3rd party packages such as rxjs for example in unit under test.  

### doMock/mock API's
Opt in at the module level. 
- Causes bleed when modules are missed resulting in unit tests becoming integration tests.
- Adding and removing dependencies requires the same for mocks in the test.

## Proposal

1 - Surface the auto mocking capabilities as an api allowing developers to mock all first level dependencies of a module. This api can then be used on the unit under test. 
    This removes the need to doMock every dependency of the unit and ass dependencies are added or removed no mocking code changes are required in the test. This will 
    also allow for easy linting or jest can even prompt a warning as each test file really should have call this api one time on the unit under test.  
2 - Supply config capabilities for developers to provide glob filtering on auto mocking. This allows developers to opt out of auto mocking for low level 3rd party packages when necessary.
    For example rxjs may be something used widely in a repo that a developer may not wish to be auto mocked.