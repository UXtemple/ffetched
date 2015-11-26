# ffetched

A wrapper on farfetched to make you tests more succinct.

```js
import mockFetch from 'ffetched';
import test from 'tape';

test('#fetch', t => {
  const unmockFetch = mockFetch('/some-uri', {
    data: 'back'
  });

  fetch('/some-uri').then(data => {
    t.deepEquals(data, {
      data: 'back'
    });

    unmockFetch();
    t.end();
  });
});
```

License MIT

With <3 by [UXtemple](https://uxtemple.com).
