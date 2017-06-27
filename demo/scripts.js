const sounds = {
  70: 'notification_1',
  71: 'notification_2',
  72: 'notification_3',
  74: 'notification_4'
};

let keycontainer = document.querySelector('.keys');

Object.keys(sounds).forEach(function(key) {
  audings.load(sounds[key], `demo/${sounds[key]}.wav`);

  html = `
    <div data-instrument="${sounds[key]}" data-key="${key}" class="-key">
      <span class="-hotkey">Hotkey</span>
      <div class="-value">${String.fromCharCode(key)}</div>
    </div>`;

  keycontainer.insertAdjacentHTML('beforeend', html);
});

function removeTransition(event) {
  if (event.propertyName !== 'transform') return;

  event.target.classList.remove('_playing');
}

function playSound(event) {
  let audio,
    code,
    sound,
    key;

  if(event.type == 'keydown') {
    code = event.keyCode;
    audio = document.querySelector(`div[data-key="${event.keyCode}"]`);
    key = document.querySelector(`div[data-key="${event.keyCode}"]`);
  } else {
    code = (event.toElement.getAttribute("data-key") === null ? event.toElement.parentElement.getAttribute("data-key") : event.toElement.getAttribute("data-key"));
    audio = document.querySelector(`div[data-key="${code}"]`);
    key = document.querySelector(`div[data-key="${code}"]`);
  }

  if (!audio) return;

  sound = audio.getAttribute('data-instrument');

  audings.start(sound);

  key.classList.add('_playing');
}

const keys = Array.from(document.querySelectorAll('.-key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
keys.forEach(key => key.addEventListener('click', playSound));

window.addEventListener('keydown', playSound);
