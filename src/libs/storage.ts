/**
 * eases up to use the session and the local storage in code.
 * abstracts away the JSON usage
 */

export class Storage<T> {
    public name: string;
    public storage = window.localStorage;

    public constructor(name: string, type: string = 'local') {
        this.name = name;
        this.storage = type === 'local' ? window.localStorage : window.sessionStorage;
    }

    public has() {
        return !!this.storage.getItem(this.name);
    }

    public set(value: T) {
        this.storage.setItem(this.name, JSON.stringify(value, null));
    }

    public get(): T {
        const val = this.storage.getItem(this.name);

        return !!val ? JSON.parse(val) : null;
    }

    public clear() {
        this.storage.removeItem(this.name);
    }
}
