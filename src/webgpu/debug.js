//debug.js

export const DEBUG_FOLDERS = {
  MSDF_TEXT: 'MSDFText',
};

class Debug {
  static instance = null;
  static ENABLED = false;

  #pane = null;
  #baseFolder = null;
  #folders = new Map();

  static getInstance() {
    if (Debug.instance === null) {
      Debug.instance = new Debug();
    }
    return Debug.instance;
  }
  constructor() {
    if (Debug.ENABLED) {
      // tweakpane is not loaded unless enabled to save size
    }
  }
  createNoOpProxy() {
    const handler = {
      get:
        () =>
        (..._args) =>
          this.createNoOpProxy(),
    };
    return new Proxy({}, handler);
  }

  getFolder(name) {
    if (!Debug.ENABLED) {
      return this.createNoOpProxy();
    }
    const existing = this.#folders.get(name);
    if (existing) {
      return existing;
    }
    const folder = this.#baseFolder.addFolder({ title: name });
    this.#folders.set(name, folder);
    return folder;
  }
}

export default Debug;
