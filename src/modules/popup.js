import tIcon from '../assets/images/T.png';

let flag = false;
let active = -1;

const popupOptions = [
  {
    type: 'h1',
    title: 'Heading 1',
    description: 'Shortcut: type 1',
  },
]

export const filterOptions = (searchInput) => {
  searchInput = searchInput.slice(1);
  const options = [...document.querySelectorAll('.popup-options')];
  options.forEach((option) => {
    const title = option.querySelector('h4').textContent;
    option.style.display = title
      .toLowerCase()
      .includes(searchInput.toLowerCase())
      ? 'flex'
      : 'none';
  });
};

export const createInput = (currentInput, currentId) => {
  const newInput = document.createElement('div');
  newInput.classList.add('input');
  newInput.setAttribute('contenteditable', true);
  newInput.setAttribute('spellcheck', true);
  newInput.setAttribute('placeholder', "Type '/' for blocks");
  newInput.setAttribute('id', `${Number(currentId) + 1}`);

  currentInput.insertAdjacentElement('afterend', newInput);
  newInput.focus();

  return newInput;
};

export const removePopup = () => {
  const popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
    flag = false;
  }
};

document.addEventListener('keydown', (e) => {
  const popOptions = [...document.querySelectorAll('.popup-options')];
  if (e.key === 'ArrowDown' && active < popOptions.length - 1) {
    active += 1;
    popOptions[active].focus();
  }
  if (e.key === 'ArrowUp' && active > 0) {
    active -= 1;
    popOptions[active].focus();
  }
  if (e.key === 'Escape') removePopup();
});

// remove popup when clicking outside
document.addEventListener('click', (e) => {
  if (e.target.closest('.popup')) return;
  removePopup();
});

const createTag = (input, tagType) => {
  input.className = 'input';
  input.classList.add(tagType);
  input.textContent = input.textContent.slice(2).trim();
  tagType === 'p'
    ? input.setAttribute('placeholder', 'Paragraph')
    : input.setAttribute('placeholder', `Heading ${tagType}`);
  input.focus();
  removePopup();
};

export const dropDown = (option) => {
  const { title, description } = option;
  return `
    <button class="popup-options" data-type="${option.type}">
    <div class="popup-options-content">
      <img id="t-icon" src="${tIcon}" alt="heading icon">
      <div class="heading">
        <h4>${title}</h4>
        <p>${description}</p>
      </div>
    </div>
    </button>`;
};

export const createPopupMenu = (currentInput) => {
  if (flag) return;
  const popupHtml = `
    <div class="popup">
      <div class="popup-heading">
        <h4 class="block-title">Add blocks</h4>
        <p class="block-desc">Keep typing to filter or esc to exit</p>
      </div>
      <div class="popup-list" role="listitem">
        ${popupOptions.map((option) => dropDown(option)).join('')}
      </div>
    </div>
    `;

  currentInput.insertAdjacentHTML('afterend', popupHtml);
  flag = true;
}

export const selectOption = (input) => {
  const options = document.querySelectorAll('.popup-options');
  options.forEach((option) => {
    option.addEventListener('click', () => {
      const tagType = option.getAttribute('data-type');
      createTag(input, tagType);
    });
  });
};
