define('./a', ['./b'], function(b) {
  return JSON.stringify({ a: 1, b: b.b });
});
