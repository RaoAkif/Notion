import './style.css';
import { createPopupMenu, selectOption, createInput, filterOptions, removePopup } from './modules/popup';

const handleInput = (input = document.getElementById('input')) => {
  // When someone types ' / ', show the optionsPopup, else don't show anything
  input.addEventListener('input', () => {
    if (input.textContent[0] === '/') {
      createPopupMenu(input);
      selectOption(input);
      // filter options
      filterOptions(input.textContent);
    } else {
      removePopup();
    }
  });

  input.addEventListener('keydown', (e) => {
    /* If the user presses 'Enter':
          1. check if the content start with /1, if true, create H1
          2. check if the content start with /2, if true, create H2
          3. if the user presses 'Enter' and the input is empty, remove the placeholder
    */

    if (e.key === 'Enter') {
      e.preventDefault();
      const text = input.textContent;

      if (text[0] === '/' && text[1] === '1') createTag(input, 'h1');
      if (text === '') input.removeAttribute('placeholder');

      const newInput = createInput(input, input.id);
      handleInput(newInput);
    }

    /* If the user presses 'Backspace' && the input is empty && the input is not the first one:
        - Remove the input and focus the previous input
        - Add the placeholder to the previous <input type="text" />
        - Put the cursor at the end of the previous input content (used the range object to do that)
    */
    if (
      e.key === 'Backspace' &&
      input.textContent.length === 0 &&
      input.id !== '1'
    ) {
      const previousInput = input.previousElementSibling;
      input.remove();
      previousInput.setAttribute('placeholder', "Type '/' for blocks");

      // Add space to the previous input to make sure the cursor is at the end of the content
      previousInput.textContent += ' ';
      previousInput.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(
        previousInput.childNodes[0] || previousInput,
        previousInput.textContent.length
      );
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });
}

handleInput();
