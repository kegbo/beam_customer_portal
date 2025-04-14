export const copyToClipboard = (text: string): void => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Text copied to clipboard!");
    })
    .catch((err: unknown) => {
      alert(
        "Failed to copy text: " + (err instanceof Error ? err.message : err)
      );
    });
};
