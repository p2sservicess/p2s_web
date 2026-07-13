const fs = require('fs');
let code = fs.readFileSync('src/components/ui/CustomCursor.tsx', 'utf-8');

const replacement = `
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    
    document.body.classList.add('hide-cursor');

    let magneticTarget: HTMLElement | null = null;
`;

const teardown = `
    return () => {
      document.body.classList.remove('hide-cursor');
      document.removeEventListener('mousemove', onMouseMove);
`;

code = code.replace(`  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let magneticTarget: HTMLElement | null = null;`, replacement);

code = code.replace(`    return () => {
      document.removeEventListener('mousemove', onMouseMove);`, teardown);

fs.writeFileSync('src/components/ui/CustomCursor.tsx', code);
