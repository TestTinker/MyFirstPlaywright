import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { UserApi } from '../pages/user.api.js';
import { UserModel } from '../models/user.model.js';

// Shared model instance for storing created user data
let globalUserModel = new UserModel();

//
// set token
//
Given('I have a valid access token {string}', function (token) {
    this.userApi = new UserApi(token); // attach to World
    if (!this.userApi) throw new Error('User API instance not initialized');
});

//
//create user
//
When('I send a request to create a new user with unique name and unique email, and following details:', async function (dataTable) {
  const data = dataTable.hashes()[0];
  const { url, gender, status } = data;

  // Generate unique name and email
  const uniqueSuffix = Date.now();
  const name = `Qwiik${uniqueSuffix}`;
  const email = `qwiik${uniqueSuffix}@gorest.co.in`;

  const userData = { name, email, gender, status };

  const { response, responseBody } = await this.userApi.createUser(url, userData);

  console.log('Create Response:', responseBody);

  expect(response.status()).toBe(201);

  // Save in global model
  globalUserModel.id = responseBody.id;
  globalUserModel.name = responseBody.name;
  globalUserModel.email = responseBody.email;
  globalUserModel.gender = responseBody.gender;
  globalUserModel.status = responseBody.status;

  this.fetchedUser = responseBody;
});

// When('I send a request to create a new user with details:', async function (dataTable) {
//     const data = dataTable.hashes()[0];
//     const { url, name, gender, email, status } = data;

//     const userData = { name, gender, email, status };
//     const { response, responseBody } = await this.userApi.createUser(url, userData);

//     console.log('Create Response:', responseBody);

//     expect(response.status()).toBe(201);
//     expect(responseBody).toHaveProperty('id');

//     // Store in global model
//     globalUserModel.id = responseBody.id;
//     globalUserModel.name = responseBody.name;
//     globalUserModel.gender = responseBody.gender;
//     globalUserModel.email = responseBody.email;
//     globalUserModel.status = responseBody.status;

//     globalUserModel.printSummary();
// });

Then('the user should be created successfully', async function () {
    expect(globalUserModel.id).not.toBeNull();
    console.log(`✅ User created successfully with ID: ${globalUserModel.id}`);
});

Then('I save the id', async function () {
    if (!globalUserModel?.id) {
        throw new Error('No user ID found to save. Make sure the user was created first.');
    }

    // Save the ID in the World object so it can be used in other steps
    this.savedUserId = globalUserModel.id;

    console.log(`✅ Stored user ID: ${this.savedUserId}`);
});

//
// get user details
//
When(
    'I send a request to get the user by ID from the previous creation using base URL {string}',
    async function (baseUrl) {
        if (!this.userApi) throw new Error('userApi not found in current scenario');
        if (!globalUserModel.id) throw new Error('No user ID found from previous scenario');

        const { response, responseBody } = await this.userApi.getUser(baseUrl, globalUserModel.id);

        console.log('Get User Response:', responseBody);

        expect(response.status()).toBe(200);

        this.fetchedUser = responseBody;
    }
);

Then('the user details should match the data from the create user step', async function () {
    const fetched = this.fetchedUser;
    expect(fetched.id).toBe(globalUserModel.id);
    expect(fetched.name).toBe(globalUserModel.name);
    expect(fetched.gender).toBe(globalUserModel.gender);
    expect(fetched.email).toBe(globalUserModel.email);
    expect(fetched.status).toBe(globalUserModel.status);

    console.log('✅ User details match successfully.');
});

//
//update user
//
When('I send a request to update the user with unique name and unique email, and following details:', async function (dataTable) {
  const data = dataTable.hashes()[0];
  const { baseUrl, gender, status } = data;

  if (!globalUserModel?.id) throw new Error('No valid user ID available for update');

  // Generate unique name and email
  const uniqueSuffix = Date.now();
  const name = `QwiikUpdated${uniqueSuffix}`;
  const email = `qwiikupdated${uniqueSuffix}@gorest.co.in`;

  const updatedData = { name, email, gender, status };

  const { response, responseBody } = await this.userApi.updateUser(baseUrl, globalUserModel.id, updatedData);

  console.log('Update Response Status:', response.status());
  console.log('Update Response Body:', responseBody);

  expect(response.status()).toBe(200);

  // Update global model
  globalUserModel.name = responseBody.name;
  globalUserModel.email = responseBody.email;
  globalUserModel.gender = responseBody.gender;
  globalUserModel.status = responseBody.status;

  this.fetchedUser = responseBody;
});

// When('I send a request to update the user with the following details:', async function (dataTable) {
//   const data = dataTable.hashes()[0];
//   const { baseUrl, name, gender, email, status } = data;

//   // Use globalUserModel.id to ensure correct user ID
//   const userId = globalUserModel.id;
//   if (!userId) throw new Error('No valid user ID available for update');

//   const updatedData = { name, gender, email, status };
//   const { response, responseBody } = await this.userApi.updateUser(baseUrl, userId, updatedData);

//   console.log('Update Response Status:', response.status());
//   console.log('Update Response Body:', responseBody);

//   expect(response.status()).toBe(200);

//   // Update globalUserModel to reflect new data
//   globalUserModel.name = responseBody.name;
//   globalUserModel.gender = responseBody.gender;
//   globalUserModel.email = responseBody.email;
//   globalUserModel.status = responseBody.status;

//   this.fetchedUser = responseBody;
// });

Then('the user should be updated successfully', async function () {
  const userId = globalUserModel.id; // fetch from model
  expect(this.fetchedUser).toHaveProperty('id', userId);
  console.log(`✅ User updated successfully with ID: ${userId}`);
});

Then('the updated user details should match the data', async function () {
    const fetched = this.fetchedUser;

    expect(fetched.id).toBe(globalUserModel.id);
    expect(fetched.name).toBe(globalUserModel.name);
    expect(fetched.gender).toBe(globalUserModel.gender);
    expect(fetched.email).toBe(globalUserModel.email);
    expect(fetched.status).toBe(globalUserModel.status);

    console.log('✅ Updated user details match successfully.');
});
