function nodeSplit (selector) {
  if (!selector || !(typeof selector === 'string' || selector instanceof String)) {
    console.error('You must provide a string to use as a query selector.');
    return null;
  }
  const targets = document.querySelectorAll(selector);
  const total = targets.length;
  if (!(total > 0)) {
    console.warn(`No nodes matching '${selector}' found.`);
    return null
  }
  let replaced = 0;
  targets.forEach(target => {
    let child = target;
    let parent = child.parentElement;

    if (parent === document.body || topLevelTest(parent)) return null;
    const fragment = new DocumentFragment();

    let before = null;
    let after = null;

    while (parent !== document.body && !topLevelTest(parent)) {
      let currentBefore = parent.cloneNode(false);
      let previousAfter = after ? after : null;
      after = parent.cloneNode(false);
      let found = false;

      Array.from(parent.childNodes).forEach(node => {
        if (node.nodeType === 3 && (/^\s*$/.test(node.nodeValue))) return null;
        if (found) after.append(node);
        else if (node === child) found = true
        else currentBefore.append(node);
      })

      if (before) currentBefore.append(before);
      before = currentBefore;

      if (previousAfter) after.prepend(previousAfter);

      child = parent;
      parent = child.parentElement;
    }

    fragment.appendChild(before);
    fragment.appendChild(target);
    fragment.appendChild(after);
    parent.replaceChild(fragment, child);
    replaced++;
  });
  console.log(`${total} nodes matching '${selector}' found — ${replaced} split.`)
}

function topLevelTest (node) {
  return node.tagName.toUpperCase() === "SECTION"
}

function listCorrector () {
  const items = document.querySelectorAll('li');
  items.forEach(item => {
    const textNodes = Array.from(item.childNodes).filter(n => n.nodeType === 3)
    if (!(textNodes.length > 0)) item.classList.add('js-empty-list');
  })
}