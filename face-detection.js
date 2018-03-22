window.onload = () => {
  const img = document.querySelector('#targetImg');
  const faceDetector = new FaceDetector();
  const scale = img.width / img.naturalWidth;
  faceDetector
    .detect(img)
    .then(faces => faces.map(face => face.boundingBox))
    .then(faceBoxes => {
      faceBoxes.forEach(({ height, width, top, left, right }) => {
        const div = document.createElement('div');
        div.className = 'face-box';
        div.style.cssText = `
            top: ${top * scale}px;
            left: ${left * scale}px;
            right: ${right * scale}px;
            height: ${height * scale}px;
            width: ${width * scale}px;
          `;
        img.parentElement.appendChild(div);
      });
    })
    .catch(() => console.log('Something Went Wrong'));
};
