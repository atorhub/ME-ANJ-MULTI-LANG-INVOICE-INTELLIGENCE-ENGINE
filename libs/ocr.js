// ocr.js  (Tesseract wrapper)

export async function recognizeWithTesseract(imageBlob) {
  const { createWorker } = Tesseract;
  const worker = await createWorker({
    logger: m => console.log('[OCR]', m)
  });

  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  const { data } = await worker.recognize(imageBlob);
  await worker.terminate();

  return data.text || '';
}

export async function recognizeEnhanced(imageBlob) {
  const { createWorker } = Tesseract;
  const worker = await createWorker({
    logger: m => console.log('[OCR-ENHANCED]', m)
  });

  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  const { data } = await worker.recognize(imageBlob, {
    tessedit_pageseg_mode: 3,
    preserve_interword_spaces: 1
  });

  await worker.terminate();

  return data.text || '';
    }
