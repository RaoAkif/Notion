import tIcon from '../assets/images/T.png';

const popupOptions = [
  {
    type: 'h1',
    title: 'Heading 1',
    description: 'Shortcut: type 1',
  },
  {
    type: 'h1',
    title: 'Heading 1',
    description: 'Shortcut: type 1',
  },
]

const dropDown = (option) => {
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

const popup = (currentInput) => {
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
}

export default popup;