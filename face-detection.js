const detectFace = () => {
  if(!window.FaceDetector) return console.log('Unsupported Version or Feature is not enabled')
  const img = document.querySelector('#targetImg');
  const faceDetector = new FaceDetector();
  const scale = img.width / img.naturalWidth;
  clearFaceBox();
  faceDetector
    .detect(img)
    .then(faces => 
      faces.map(face => face.boundingBox)
    )
    .then(faceBoxes => {
      faceBoxes.forEach(faceBox => {
        const { 
          height, width, top, left 
        } = faceBox;
        const div = drawFaceBox(
          height, width, top, left, scale
        );
        img.parentElement.appendChild(div);
      });
    })
    .catch(err => console.log(err));
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
  detectFace();
};
window.onresize = () => {
  detectFace();
};