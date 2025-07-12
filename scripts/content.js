const selectors = [
  /* Common */
  "textarea",
  ".user-content-block",
  ".ak-editor-content-area",
  ".ak-renderer-wrapper",
  ".ak-renderer-document",

  /* Jira */
  // Issue - title/summary
  '[data-read-view-fit-container-width="true"]',

  // issue list - summary column
  '[data-testid="business-list.ui.list-view.text-cell.text-cell-wrapper"]',

  // issue creation modal - summary field
  '[data-testid="issue-create-commons.common.ui.fields.base-fields.input-field.textfield-container"]',

  // Issue - Linked issues
  '[data-testid="issue-field-summary.ui.inline-read.link-item"]',
  '[data-testid="issue-field-summary.ui.inline-read.link-item--primitive--container"]>div>span',
  // Backlog - items
  '[data-testid="software-backlog.card-list.card.card-contents.card-container"]>div:nth-of-type(5)',
  // Issues - navigation sidebar
  '[data-testid="issue-navigator.ui.issue-results.detail-view.card-list.card.summary"]',

  /* Confluence */
  // Page - Title
  '[data-testid="title-text"]',
  // Page - Cards in the bottom
  '[data-testid="page-card-end-of-page-view"]>div:nth-of-type(1)',

  /* Product Discovery */
  // table cell
  '[data-testid="polaris-ideas.ui.view-content.idea-list.cell.cells.link-field.editable-summary-field"]',
  '[data-testid="polaris-ideas.ui.view-content.idea-list.cell.cells.link-field.read-only.container"]',

  // issue title
  '[data-testid="polaris-ideas.ui.idea-view.summary.container"]',
].join(", ");

function containsRTLTextRobust(element) {
  const text = element.textContent.trim(); // Trim whitespace

  if (!text) {
    return false;
  }

  const rtlRegex = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;

  // Check for RTL characters, ignoring punctuation and whitespace
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (rtlRegex.test(char)) {
      return true; // Found an RTL character
    }
  }

  return false; // No RTL characters found
}

function handleElements() {
  const matchingElements = document.querySelectorAll(selectors);
  matchingElements.forEach((el) => {
    if (containsRTLTextRobust(el)) {
      el.setAttribute("dir", "rtl")
      el.style.textAlign = 'right';
    }
  });
}

let tId;

const o = new MutationObserver((_, __) => {
  clearTimeout(tId);
  tId = setTimeout(() => handleElements(), 100);
});

o.observe(document.body, {childList: true, subtree: true});
