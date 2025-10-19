import { request } from '@playwright/test';

export class UserApi {
    #token;

    constructor(token) {
        this.#token = token?.trim() || null;
    }

    /**
     * Create a new user
     * @param {string} url - API endpoint (e.g. https://gorest.co.in/public/v2/users)
     * @param {object} userData - JSON payload for user creation
     */
    async createUser(url, userData) {
        if (!this.#token) {
            throw new Error('Missing API token. Please provide a valid Bearer token.');
        }

        const context = await request.newContext({
            extraHTTPHeaders: {
                Authorization: `Bearer ${this.#token}`,
                'Content-Type': 'application/json'
            }
        });

        const response = await context.post(url, { data: userData });
        const responseBody = await response.json();

        return { response, responseBody };
    }

    /**
     * Get user details by ID
     * @param {string} baseUrl - Base URL (e.g. https://gorest.co.in/public/v2/users)
     * @param {number|string} userId - ID of the user to retrieve
     */
    async getUser(baseUrl, userId) {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Authorization: `Bearer ${this.#token}`,
                'Content-Type': 'application/json'
            }
        });

        const response = await context.get(`${baseUrl}/${userId}`);
        const responseBody = await response.json();

        return { response, responseBody };
    }

    /**
     * Update an existing user
     * @param {string} baseUrl - Base URL (e.g. https://gorest.co.in/public/v2/users)
     * @param {number|string} userId - ID of the user to update
     * @param {object} updatedData - JSON payload for update
     */
    async updateUser(baseUrl, userId, updatedData) {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Authorization: `Bearer ${this.#token}`,
                'Content-Type': 'application/json'
            }
        });

        const response = await context.put(`${baseUrl}/${userId}`, { data: updatedData });
        const responseBody = await response.json();

        return { response, responseBody };
    }

    /**
     * Delete a user by ID
     * @param {string} baseUrl - Base URL (e.g. https://gorest.co.in/public/v2/users)
     * @param {number|string} userId - ID of the user to delete
     */
    async deleteUser(baseUrl, userId) {
        const context = await request.newContext({
            extraHTTPHeaders: {
                Authorization: `Bearer ${this.#token}`,
                'Content-Type': 'application/json'
            }
        });

        const response = await context.delete(`${baseUrl}/${userId}`);
        const responseBody = response.status() !== 204 ? await response.json() : {};

        return { response, responseBody };
    }
}
