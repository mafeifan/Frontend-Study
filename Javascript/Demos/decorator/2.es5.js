var _dec, _class;

function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list);
  };
}

const Foo = {
  foo() {
    console.log('foo');
  }
};

let MyClass = (_dec = mixins(Foo), _dec(_class = class MyClass {}) || _class);


let obj = new MyClass();
obj.foo(); // "foo"

