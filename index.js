(function() {
  const imageInput = document.querySelector('#imageInput');
  const targetImg = document.querySelector('#targetImg');
  const fileReader = new FileReader();

  if (typeof detectFace === 'undefined')
    throw new Error('Unable to load face-detection.js');

  fileReader.addEventListener('load', e => {
    targetImg.setAttribute('src', e.target.result);
    setTimeout(() => detectFace(), 0);
  });

  imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) fileReader.readAsDataURL(file);
  });

  targetImg.addEventListener('click', () => imageInput.click(), { once: true });

  window.onload = () => {
    detectFace();
  };
  window.onresize = () => {
    detectFace();
  };
})();
