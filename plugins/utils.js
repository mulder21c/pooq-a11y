export const requiredNoOpener = target => {
  if (!target) return false;
  const inContext = [`_self`, `_parent`, `_self`, `_top`];
  return !inContext.includes(target);
};
