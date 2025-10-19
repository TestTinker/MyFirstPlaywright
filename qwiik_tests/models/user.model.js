export class UserModel {
    #id;
    #name;
    #email;
    #gender;
    #status;

    constructor() {}

    // --- ID ---
    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value ?? null;
    }

    // --- Name ---
    get name() {
        return this.#name;
    }
    set name(value) {
        this.#name = value?.trim() || null;
    }

    // --- Email ---
    get email() {
        return this.#email;
    }
    set email(value) {
        this.#email = value?.trim() || null;
    }

    // --- Gender ---
    get gender() {
        return this.#gender;
    }
    set gender(value) {
        this.#gender = value?.trim() || null;
    }

    // --- Status ---
    get status() {
        return this.#status;
    }
    set status(value) {
        this.#status = value?.trim() || null;
    }

    // --- Utility methods ---
    printSummary() {
        console.log(`
        User Info:
        ID: ${this.#id || '-'}
        Name: ${this.#name || '-'}
        Email: ${this.#email || '-'}
        Gender: ${this.#gender || '-'}
        Status: ${this.#status || '-'}
        `);
    }
}
