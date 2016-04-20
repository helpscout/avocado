# Avocado
A simple JS powered promo system

---

## Features
- dynamic targeting
- analytics event tracking (e.g. Google Analytics)
- bypasses adblocker
- light weight

---

Concept of how it will work:

```
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

<div data-avocado-unit-id="something"></div>
```
