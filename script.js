class EventTarget {
  constructor() {
    this.listeners = new Map();
  }

  addEventListener(eventName, callback) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }

    const eventListeners = this.listeners.get(eventName);
    if (!eventListeners.includes(callback)) {
      eventListeners.push(callback);
    }
  }

  removeEventListener(eventName, callback) {
    if (this.listeners.has(eventName)) {
      const eventListeners = this.listeners.get(eventName);
      const index = eventListeners.indexOf(callback);
      if (index !== -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  dispatchEvent(eventName) {
    if (this.listeners.has(eventName)) {
      const eventListeners = this.listeners.get(eventName);
      eventListeners.forEach(callback => callback());
    }
  }
}

// Sample Usage
const target = new EventTarget();
const logHello = () => console.log('hello');
const logWorld = () => console.log('world');

target.addEventListener('hello', logHello);
target.addEventListener('world', logWorld);

target.dispatchEvent('hello'); // Output: hello
target.dispatchEvent('world'); // Output: world

target.removeEventListener('hello', logHello);
target.dispatchEvent('hello'); // No output, listener removed
target.dispatchEvent('world'); // Output: world
