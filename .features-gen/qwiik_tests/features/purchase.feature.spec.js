// Generated from: qwiik_tests\features\purchase.feature
import { test } from "../../../qwiik_tests/fixtures/fixtures.js";

test.describe('Purchase Products from Swag Labs', () => {

  test.describe('Successfully purchase products with valid user credentials', () => {

    test('Example #1', { tag: ['@smoke'] }, async ({ Given, When, And, loginPage }) => { 
      await When('I navigate to "https://www.saucedemo.com/"', null, { loginPage }); 
      await Given('I enter username "standard_user"', null, { loginPage }); 
      await And('I enter password "secret_sauce"', null, { loginPage }); 
      await And('I click on "Login"', null, { loginPage }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('qwiik_tests\\features\\purchase.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":47,"tags":["@smoke"],"steps":[{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"When I navigate to \"https://www.saucedemo.com/\"","stepMatchArguments":[{"group":{"start":14,"value":"\"https://www.saucedemo.com/\"","children":[{"start":15,"value":"https://www.saucedemo.com/","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given I enter username \"standard_user\"","stepMatchArguments":[{"group":{"start":17,"value":"\"standard_user\"","children":[{"start":18,"value":"standard_user","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"And I enter password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":17,"value":"\"secret_sauce\"","children":[{"start":18,"value":"secret_sauce","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":10,"keywordType":"Context","textWithKeyword":"And I click on \"Login\"","stepMatchArguments":[{"group":{"start":11,"value":"\"Login\"","children":[{"start":12,"value":"Login","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end