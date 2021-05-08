'use stcict';

const SettingType = {
  ATTRIBUTE: 'attribute',
  CLASS: 'class',
}

const containers = document.querySelectorAll('.js-buttons-container');
const settingButtons = document.querySelectorAll('[data-setting-name]')

const setDataAttribute = ({settingTarget}, params) => {
  const element = document.querySelector(settingTarget);
  for(const [key, value] of Object.entries(params)) {
    element.dataset[key] = value;
  }
}

const setClass = ({settingTarget}, params) => {
  const element = document.querySelector(settingTarget);
  for(const [key, value] of Object.entries(params)) {
    const elements = Array.from(settingButtons).filter((element) => element.dataset['settingName'] === key);

    elements.forEach((item) => element.classList.remove(item.dataset.settingValue));

    element.classList.add(value);
  }
}

const setButtonActive = (params) => {
  for (const [key, value] of Object.entries(params)) {
    const activeButton = Array.from(settingButtons)
      .find((element) => element.dataset['settingName'] === key && element.classList.contains('active'));

    activeButton.classList.remove('active');

    const setButton = Array.from(settingButtons)
      .find((element) => element.dataset['settingName'] === key && element.dataset['settingValue'] === value);

    setButton.classList.add('active');
  }
}

const applaySetting = (setting, params) => {
  if (setting.settingType === SettingType.CLASS) {
    setClass(setting, params);
  } else if (setting.settingType === SettingType.ATTRIBUTE) {
    setDataAttribute(setting, params);
  }
  
  setButtonActive(params);
}

const settingButtonClickHandler = (evt, setting) => {
  const button = evt.target.closest('button');

  if (!button) {
    return;
  }

  const params = {};
  const {settingName, settingValue} = button.dataset;
  params[settingName] = settingValue;

  applaySetting(setting, params);
}

const init = () => {
  containers.forEach((container) => {
    const setting = container.dataset;

    container.addEventListener('click', (evt) => {
      settingButtonClickHandler(evt, setting);
    });
  });
}

init();

// const buttonThemeLight = document.querySelector('.theme-button-light');
// const buttonThemeDark = document.querySelector('.theme-button-dark');
// const buttonThemeTexture = document.querySelector('.theme-button-texture');

// const buttonCardViewTile = document.querySelector('.card-view-button-tile');
// const buttonCardViewStandard = document.querySelector('.card-view-button-standard');
// const buttonCardViewCompact = document.querySelector('.card-view-button-compact');

// const courses = document.querySelector('.cards');

// const buttonThemeLightHandler = () => {
//   document.documentElement.dataset['themeName'] = 'light';
// }

// const buttonThemeDarkHandler = () => {
//   document.documentElement.dataset['themeName'] = 'dark';
// }

// const buttonThemeTextureHandler = () => {
//   document.documentElement.dataset['themeName'] = 'texture'
// }

// const buttonCardViewTileHandler = () => {
//   courses.classList.remove('standard');
//   courses.classList.remove('compact');
//   courses.classList.add('tile');
// }

// const buttonCardViewStandardHandler = () => {
//   courses.classList.remove('tile');
//   courses.classList.remove('compact');
//   courses.classList.add('standard');
// }

// const buttonCardViewCompactHandler = () => {
//   courses.classList.remove('tile');
//   courses.classList.remove('standard');
//   courses.classList.add('compact');
// }

// const init = () => {
//   buttonThemeLight.addEventListener('click', buttonThemeLightHandler);
//   buttonThemeDark.addEventListener('click', buttonThemeDarkHandler);
//   buttonThemeTexture.addEventListener('click', buttonThemeTextureHandler);

//   buttonCardViewTile.addEventListener('click', buttonCardViewTileHandler);
//   buttonCardViewStandard.addEventListener('click', buttonCardViewStandardHandler);
//   buttonCardViewCompact.addEventListener('click', buttonCardViewCompactHandler);
// }

// init()