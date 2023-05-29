/* eslint-disable */

// @ts-nocheck

const Backbone = require('backbone');

class A extends Backbone.Collection {
  firstName = 'Carlos';
  lastName = 'Marcos';

  getFullName() {
    return this.firstName.concat(' ', this.lastName);
  }
}

class B extends A {
  b() {
    return 'b';
  }
}

class C extends B {
  c() {
    return 'c';
  }
}

const c = new C();

Object.getPrototypeOf(c);
//=> B {}

Object.getPrototypeOf(Object.getPrototypeOf(c));
//=> A {}

Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(c)));
//=> {}

Object.getPrototypeOf(
  Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(c))),
);
//=> [Object: null prototype] {}

Object.getPrototypeOf(
  Object.getPrototypeOf(
    Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(c))),
  ),
);
//=> null

/** @typedef {(this: any, ...args: any[]) => any} Method */

/** @type {Record<string, Method>} */
const methods = Object.create(null);

const ASYNC_BACKBONE_METHODS = ['save', 'sync', 'fetch', 'destroy'];

const UNSAFE_METHOD_NAMES = [
  '__proto__',
  'constructor',

  ...Object.getOwnPropertyNames(Backbone.Collection.prototype).filter(
    (name) => !ASYNC_BACKBONE_METHODS.includes(name),
  ),
];

function get_method_names(x, y = x) {
  const descriptors = Object.getOwnPropertyDescriptors(y);

  for (const name in descriptors) {
    if (name in methods) continue;

    if (UNSAFE_METHOD_NAMES.includes(name)) continue;

    const descriptor = descriptors[name];

    if (typeof descriptor.value !== 'function') continue;

    methods[name] = descriptor.value.bind(x);
  }

  const prototype = Object.getPrototypeOf(y);

  if (prototype === null || prototype === Object.prototype) return;

  get_method_names(x, prototype);
}

get_method_names(c);

console.log(methods);

console.log(methods.getFullName());
