const detectFace = () => {
  const img = document.querySelector('#targetImg');
  const faceDetector = new FaceDetector();
  const scale = img.width / img.naturalWidth;
  faceDetector
    .detect(img)
    .then(faces => faces.map(face => face.boundingBox))
    .then(faceBoxes => {
      faceBoxes.forEach(faceBox => {
        const { height, width, top, left } = faceBox;
        const div = drawFaceBox(height, width, top, left, scale);
        img.parentElement.appendChild(div);
      });
    })
    .catch(w => console.log('Something Went Wrong', w));
};

const drawFaceBox = (height, width, top, left, scale) => {
  const div = document.createElement('div');
  div.className = 'face-box';
  div.style.cssText = `
    top: ${top * scale}px;
    left: ${left * scale}px;
    height: ${height * scale}px;
    width: ${width * scale}px;
  `;
  return div;
};

const clearFaceBox = () => {
  [...document.getElementsByClassName('face-box')].forEach(e => e.remove());
};

window.onload = () => {
  clearFaceBox();
  detectFace();
};
window.onresize = () => {
  clearFaceBox();
  detectFace();
};
