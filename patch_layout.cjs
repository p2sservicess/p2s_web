const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Layout.tsx', 'utf-8');

code = code.replace("import { AnimatePresence, motion } from 'framer-motion';", "");
code = code.replace(`            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>`, `            <Outlet />`);

fs.writeFileSync('src/components/layout/Layout.tsx', code);
