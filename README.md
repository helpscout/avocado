# Avocado
A simple JS powered promo system

---

![AW YEA. AVOCADOS!](http://i.giphy.com/l2JHRhAtnJSDNJ2py.gif)

---

## Features
- dynamic targeting
- analytics event tracking (e.g. Google Analytics) (COMING SOON!)
- bypasses adblocker
- light weight

---

Concept of how it will work:

```
<div data-avocado-unit-id="something"></div>

<script>
  if(window.Avocado) {
    Avocado.setTargeting('category', 'support');

    Avocado.defineUnit({
      id: 'something',
      targeting: {
        category: 'support'
      },
      content: 'Click me'
    });
  }
</script>
```
