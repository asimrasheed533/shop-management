import { AnimatePresence, motion } from "framer-motion";

import { ReactNode } from "react";

export default function ListingActionBar({
  selectedItems,
  children
}: {
  selectedItems: number;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {selectedItems > 0 && (
        <motion.div
          // @ts-ignore
          className="listing__page__table__actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
