webpackHotUpdate("main",{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log(\"xd\");\n\nclass Todo {\n  constructor(name) {\n    this.name = name;\n    this.done = false;\n  }\n\n  toggle() {\n    this.done = !this.name;\n  }\n}\n\nclass TodoTimed extends Todo {\n  constructor(name, date) {\n    super(name);\n    this.date = date;\n  }\n}\n\nconst todo = new Todo('hello');\nconst todoDate = new TodoTimed('xd', 1000);\nconsole.log(todo, todoDate);\nconsole.log('ayy');\nconsole.log('x d');\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

})