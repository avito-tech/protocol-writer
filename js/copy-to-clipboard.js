'use strict';

export const copyToClipboard = text => {
  const textArea = document.createElement('textArea');
  textArea.textContent = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};
