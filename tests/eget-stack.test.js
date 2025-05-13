const stack = require('../src/stack');

test('pop on stack removes the latest element', () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.pop()).toBe(3);
    expect(stack.peek()).toBe(2);
});