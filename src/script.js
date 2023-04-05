import './style.css';
import popup from './modules/popup';


const input = document.querySelector('#input');

const handleInput = () => {
  // When someone types ' / ', show the optionsPopup, else don't show anything
  input.addEventListener('input', () => {
    if (input.textContent[0] === '/') {
      popup(input);
    } else {
      console.log("Nothing Happened")
    }
  });
}

handleInput();