<template>
  <router-view />
</template>

<style>
/* RESETS */
html {
  font-size: 10px;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

*[class*="click"] {
  cursor: pointer;
}

h1,
h2,
ul,
p {
  margin: 0;
}

ul {
  list-style: none;
  padding: 0;
}

button {
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  color: inherit;
  font: inherit;
  line-height: normal;
}

input {
  background: transparent;
  border: none;
  font: inherit;
  padding: 0;
  margin: 0;
}

input:focus {
  outline: none;
}

body {
  margin: 0;
  background-color: #f5f5f5;
}

@media screen and (min-width: 768px) {
  html {
    font-size: 12px;
  }
}
@media screen and (min-width: 1024px) {
  html {
    font-size: 15px;
  }
}

/*END RESETS*/
</style>
