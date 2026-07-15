1. objectives
create a plan to create a rich, yet in minimalistic style, web app that translates a datetime string into a binary string which in turn will be converted into a barcode using selected symbols to represent zero and one.

2. more specifically
- step 1: translate a datetime string into a string composed of binary numbers, 
  - e.g. the date time "2026-07-14_23:12:00" will be translated to the binary number "011111101010-0111-01110_010111-010111-0" 
- step 2: use selected block elements (see ref below) to represent zero and one. 
- step 3: generate a new string by replacing the zeros and ones in the binary string with the selected symbols 

3. structure of the app
- a dropdown menu to select different sets of block elements retrived from internets search, such as wikipedia, 
- a grid like panel to display the block elements in the set selected,
- a selector to assign selected block element symbols to represent zero and one, respectively,
- an input field to enter the datetime string to be translated,
- a display area to show the translated binary string,
- a button to trigger the translation from the binary string to a barcode composed of the block element symbols selected. 

4. tooling
- javascript
- three.js
- react-three/fiber
- react-three/drei
- react

5. references

- [block elements](https://en.wikipedia.org/wiki/Block_Elements)

6. requirements
- the block elements selected should work in windows, macos, and linux,
- no need to install external fonts, except for nerd fonts,
- there should be a dark/light mode toggle,
