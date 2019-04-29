export default function fileExtension(filename, opts = {}) {
  if (!filename) return '';
  const ext = (/[^./\\]*$/.exec(filename) || [''])[0];
  return opts.preserveCase ? ext : ext.toLowerCase();
}
