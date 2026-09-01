import fs from 'fs';
import path from 'path';

import { chromium, firefox, webkit } from 'playwright-core';

const BASE = 'http://localhost:5174';
const EVIDENCE = path.dirname(
  new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'),
);
const SCREENSHOT_DIR = path.join(EVIDENCE, 'screenshots');
const MS_PLAYWRIGHT = path.join(process.env.LOCALAPPDATA, 'ms-playwright');

const CHROMIUM_EXE = path.join(
  MS_PLAYWRIGHT,
  'chromium-1234',
  'chrome-win64',
  'chrome.exe',
);
const FIREFOX_EXE = path.join(
  MS_PLAYWRIGHT,
  'firefox-1538',
  'firefox',
  'firefox.exe',
);
const WEBKIT_EXE = path.join(MS_PLAYWRIGHT, 'webkit-2336', 'Playwright.exe');

const NEW_ROUTES = [
  'segmented',
  'toolbar',
  'toggle-group',
  'chip',
  'slider',
  'checkbox',
  'select',
  'spinner',
  'tabs',
  'accordion',
  'color',
  'link',
  'numbers',
  'otp',
  'collapsible',
  'list',
  'radio',
  'search-field',
  'section-title',
  'shortcut',
  'switch',
  'textarea',
  'toast',
];

const FIREFOX_ROUTES = ['dialog', 'calendar', 'input', 'button', 'toast'];
const WEBKIT_ROUTES = ['dialog', 'button', 'toast'];

function slug(route) {
  return `/components/${route}`;
}
function fileSlug(route) {
  return `_components_${route}`;
}

function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3)
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];
}

function luminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastFromHex(hex1, hex2) {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const l1 = luminance(r1, g1, b1);
  const l2 = luminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return +((lighter + 0.05) / (darker + 0.05)).toFixed(2);
}

function rgbToHex(value) {
  const match = value.match(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/u,
  );
  if (!match) return null;
  return `#${[match[1], match[2], match[3]]
    .map((channel) => Number(channel).toString(16).padStart(2, '0'))
    .join('')}`;
}

async function extractTokens(page) {
  return page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    const cs = getComputedStyle(body);
    const rootCs = getComputedStyle(html);
    const getRootVar = (name) => rootCs.getPropertyValue(name).trim();
    return {
      bg: getRootVar('--cladd-bg'),
      fg: getRootVar('--cladd-fg'),
      surface: getRootVar('--cladd-surface'),
      primary: getRootVar('--cladd-primary'),
      htmlClass: html.className,
      bodyBg: cs.backgroundColor,
      bodyColor: cs.color,
    };
  });
}

async function toggleThemeViaButton(page) {
  const before = await extractTokens(page);
  const btn = page
    .locator('button')
    .filter({ hasText: /☼|◐/ })
    .first();
  if ((await btn.count()) > 0) {
    await btn.click();
    await page.waitForTimeout(500);
  }
  const after = await extractTokens(page);
  return { before, after, changed: before.bg !== after.bg };
}

async function checkKeyboardFocus(page) {
  const focusableCount = await page
    .locator(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )
    .count();
  if (focusableCount === 0) return { focusableCount, tabWorked: false };
  await page.evaluate(() => document.body.focus());
  await page.keyboard.press('Tab');
  const first = await page.evaluate(() => ({
    id: document.activeElement?.id,
    tag: document.activeElement?.tagName,
  }));
  await page.keyboard.press('Tab');
  const second = await page.evaluate(() => ({
    id: document.activeElement?.id,
    tag: document.activeElement?.tagName,
  }));
  return {
    first,
    focusableCount,
    second,
    tabWorked: first.tag !== 'BODY' && first.tag !== undefined,
  };
}

async function checkOverlayLifecycle(page, route) {
  const trigger = await page.evaluate((overlayRoute) => {
    const triggers = document.querySelectorAll(
      'button, [data-trigger], [aria-haspopup]',
    );
    for (const element of triggers) {
      const t = element;
      const text = t.textContent.toLowerCase();
      if (
        (overlayRoute === 'toast' &&
          (text.includes('toast') || text.includes('show'))) ||
        text.includes('open') ||
        text.includes('show') ||
        text.includes('toggle') ||
        t.hasAttribute('aria-haspopup')
      ) {
        t.setAttribute('data-parity-trigger', 'true');
        return t.textContent?.trim() ?? '';
      }
    }
    return null;
  }, route);
  if (trigger === null) return { triggerFound: false };

  const content = page.locator('[data-part="content"]');
  const before = await content.count();
  await page.locator('[data-parity-trigger="true"]').click();
  await page.waitForTimeout(100);
  const after = await content.count();
  const opened = await content.evaluateAll((elements) =>
    elements.some((element) => element.getAttribute('data-open') === 'true'),
  );

  return {
    contentCountAfter: after,
    contentCountBefore: before,
    opened: after > before || opened,
    triggerFound: true,
    triggerText: trigger,
  };
}

async function captureRoute(browserType, route, page) {
  const url = `${BASE}${slug(route)}`;
  const result = {
    route: slug(route),
    url,
    browserType,
    status: 200,
    title: '',
    htmlClass: '',
    bodyHTMLLen: 0,
    darkScreenshot: '',
    lightScreenshot: '',
    narrowScreenshot: '',
    domDump: '',
    tokens: {},
    lightTokens: {},
    contrastDark: null,
    contrastLight: null,
    themeToggle: null,
    keyboardFocus: null,
    overlayLifecycle: null,
    narrowViewport: null,
  };

  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    result.title = await page.title();
    result.bodyHTMLLen = (await page.content()).length;

    const fsDir = path.join(
      SCREENSHOT_DIR,
      `${fileSlug(route)}-${browserType}`,
    );
    fs.mkdirSync(fsDir, { recursive: true });

    const darkSS = path.join(fsDir, `${fileSlug(route)}-dark.png`);
    await page.screenshot({ path: darkSS, fullPage: true });
    result.darkScreenshot = `screenshots/${fileSlug(route)}-${browserType}/${fileSlug(route)}-dark.png`;

    result.tokens = await extractTokens(page);
    result.htmlClass = result.tokens.htmlClass;

    result.themeToggle = await toggleThemeViaButton(page);

    const lightSS = path.join(fsDir, `${fileSlug(route)}-light.png`);
    await page.screenshot({ path: lightSS, fullPage: true });
    result.lightScreenshot = `screenshots/${fileSlug(route)}-${browserType}/${fileSlug(route)}-light.png`;
    result.lightTokens = await extractTokens(page);

    const bgDark = result.tokens.bg;
    const fgDark = result.tokens.fg;
    const bgLight = result.lightTokens.bg;
    const fgLight = result.lightTokens.fg;

    const darkBackground = bgDark.startsWith('#')
      ? bgDark
      : rgbToHex(result.tokens.bodyBg);
    const darkForeground = fgDark.startsWith('#')
      ? fgDark
      : rgbToHex(result.tokens.bodyColor);
    const lightBackground = bgLight.startsWith('#')
      ? bgLight
      : rgbToHex(result.lightTokens.bodyBg);
    const lightForeground = fgLight.startsWith('#')
      ? fgLight
      : rgbToHex(result.lightTokens.bodyColor);

    result.contrastDark =
      darkBackground && darkForeground
        ? contrastFromHex(darkBackground, darkForeground)
        : null;
    result.contrastLight =
      lightBackground && lightForeground
        ? contrastFromHex(lightBackground, lightForeground)
        : null;

    result.keyboardFocus = await checkKeyboardFocus(page);

    const overlayRoutes = ['dialog', 'popover', 'tooltip', 'popup', 'toast'];
    if (overlayRoutes.includes(route)) {
      result.overlayLifecycle = await checkOverlayLifecycle(page, route);
    }

    await page.setViewportSize({ width: 320, height: 568 });
    await page.waitForTimeout(200);
    const narrowSS = path.join(fsDir, `${fileSlug(route)}-320.png`);
    await page.screenshot({ path: narrowSS, fullPage: true });
    result.narrowScreenshot = `screenshots/${fileSlug(route)}-${browserType}/${fileSlug(route)}-320.png`;

    result.narrowViewport = await page.evaluate(() => ({
      hasHScroll:
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));

    const domDump = path.join(
      EVIDENCE,
      `${fileSlug(route)}-${browserType}.html`,
    );
    const html = await page.content();
    fs.writeFileSync(domDump, html.substring(0, 200000));
    result.domDump = `${fileSlug(route)}-${browserType}.html`;

    await page.setViewportSize({ width: 1280, height: 720 });
  } catch (err) {
    result.error = err.message;
  }
  return result;
}

async function run() {
  const report = {
    timestamp: new Date().toISOString(),
    browsers: {},
    supportedBrowserBoundary: '',
  };

  const captureBrowser = async (browserName, launchFn, routesToCapture) => {
    console.log(`\n=== ${browserName} ===`);
    const browser = await launchFn({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    const page = await context.newPage();
    const results = [];

    for (const route of routesToCapture) {
      console.log(`  ${route}...`);
      const result = await captureRoute(browserName, route, page);
      results.push(result);
      console.log(
        `    status=${result.status} dark_bg=${result.tokens.bg} light_bg=${result.lightTokens.bg} contrast_d=${result.contrastDark} contrast_l=${result.contrastLight} toggle=${result.themeToggle?.changed}`,
      );
    }

    await browser.close();
    return results;
  };

  const chromiumResults = await captureBrowser(
    'chromium',
    async (opts) => chromium.launch({ ...opts, executablePath: CHROMIUM_EXE }),
    NEW_ROUTES,
  );
  const firefoxResults = await captureBrowser(
    'firefox',
    async (opts) => firefox.launch({ ...opts, executablePath: FIREFOX_EXE }),
    FIREFOX_ROUTES,
  );
  const webkitResults = await captureBrowser(
    'webkit',
    async (opts) => webkit.launch({ ...opts, executablePath: WEBKIT_EXE }),
    WEBKIT_ROUTES,
  );

  report.browsers = {
    chromium: { version: '151.0.7922.174', routes: chromiumResults.length },
    firefox: { version: '153.0', routes: firefoxResults.length },
    webkit: { version: '26.5', routes: webkitResults.length },
  };
  report.supportedBrowserBoundary =
    'Cross-browser smoke capture only. It records the listed routes and checks; it does not compare against upstream visuals or prove full parity.';

  const existingReport = JSON.parse(
    fs.readFileSync(path.join(EVIDENCE, 'browser-parity-report.json'), 'utf8'),
  );
  const existingRoutes = existingReport.routes.map((r) => r.route);
  for (const cr of chromiumResults) {
    if (!existingRoutes.includes(cr.route)) {
      existingReport.routes.push(cr);
    }
  }
  existingReport.browsers = report.browsers;
  existingReport.supportedBrowserBoundary = report.supportedBrowserBoundary;
  existingReport.crossBrowserResults = {
    firefox: firefoxResults.map((r) => ({
      route: r.route,
      status: r.status,
      tokens: r.tokens,
      lightTokens: r.lightTokens,
      contrastDark: r.contrastDark,
      contrastLight: r.contrastLight,
      themeToggle: r.themeToggle?.changed,
    })),
    webkit: webkitResults.map((r) => ({
      route: r.route,
      status: r.status,
      tokens: r.tokens,
      lightTokens: r.lightTokens,
      contrastDark: r.contrastDark,
      contrastLight: r.contrastLight,
      themeToggle: r.themeToggle?.changed,
    })),
  };

  fs.writeFileSync(
    path.join(EVIDENCE, 'browser-parity-report.json'),
    JSON.stringify(existingReport, null, 2),
  );

  console.log(
    `\nDone. ${chromiumResults.length} chromium, ${firefoxResults.length} firefox, ${webkitResults.length} webkit.`,
  );
}

run().catch(console.error);
