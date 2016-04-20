# Avocado
A simple JS powered promo system

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

<div data-avocado-unit="something"></div>
```
