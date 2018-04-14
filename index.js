(function() {
  const imageInput = document.querySelector('#imageInput');
  const targetImg = document.querySelector('#targetImg');
  const fileUploadBtn = document.querySelector('#fileUploadBtn');
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

  fileUploadBtn.addEventListener('click', () => imageInput.click());
  targetImg.addEventListener('dblclick', () => imageInput.click());

  window.onload = () => detectFace();
  window.onresize = () => detectFace();
})();
