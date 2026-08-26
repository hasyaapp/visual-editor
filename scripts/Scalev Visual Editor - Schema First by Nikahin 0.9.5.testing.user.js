// ==UserScript==
// @name         Scalev Visual Editor - Schema First [Testing]
// @namespace    wedding-scalev-testing
// @version      0.23.7
// @updateURL    https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/Scalev%20Visual%20Editor%20-%20Schema%20First%20by%20Nikahin%200.9.5.testing.user.js
// @downloadURL  https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/Scalev%20Visual%20Editor%20-%20Schema%20First%20by%20Nikahin%200.9.5.testing.user.js
// @description  Strict schema-first Scalev wedding visual editor for HTML Mode, with Template Library import, paint-first instant-open lifecycle, first-frame tab-shell visibility above the native editor toolbar, idle prewarm, dirty-aware parse/render reuse, cached native Scalev layout nodes, instant 21-section accordion, section HTML prewarm/cache, LRU DOM retention, delegated realtime Content input, fast CONFIG range commits without parse-all, section-local invalidation, content-visibility repeater virtualization, cached schema/search indexes, and unified Scalev-native geometry across Content, Images, Colors, Style, Audio, and Status panels; Media-style Image cards; Lucide clipboard-paste URL replacement; native Status alerts; Universal Master validation; safe CONFIG paths/parser; CSP manifest; fail-closed compatibility gate; fresh-import defaults; realtime preview sync; section ordering; image settings; guestbook slug sync; Google Fonts; and audio controls.
// @match        https://app.scalev.com/pages/*
// @grant        GM_xmlhttpRequest
// @connect      ozdonprvactdvpiirnrq.supabase.co
// @connect      api.github.com
// @run-at       document-idle
// ==/UserScript==

(function () {
  "use strict";

  const ID = "sve77";
  const VERSION = "0.23.7";
  const SVE_LITE_MODE = false;

  /*
   * Provider template library. The endpoint is intentionally public-facing,
   * while the template bucket remains private. The Edge Function owns the
   * service-role key and returns short-lived signed source URLs.
   */
  const TEMPLATE_LIBRARY_CONFIG = Object.freeze({
    endpoint: "https://ozdonprvactdvpiirnrq.supabase.co/functions/v1/template-library",
    timeoutMs: 9000
  });

  const SUPPORT_WHATSAPP_NUMBER =
    "6282175274118";

  const SUPPORT_WHATSAPP_TEXT =
    "~halooo mas Hasya, aku kreator undangan Nikahin dari Scalev panel...";

  const UPDATE_URL =
    "https://raw.githubusercontent.com/hasyaapp/visual-editor/main/scripts/Scalev%20Visual%20Editor%20-%20Schema%20First%20by%20Nikahin%200.9.5.testing.user.js";

  const CHECK_URL =
    "https://api.github.com/repos/hasyaapp/visual-editor/contents/scripts/Scalev%20Visual%20Editor%20-%20Schema%20First%20by%20Nikahin%200.9.5.testing.user.js?ref=main";

  function isScalevEditModeUrl() {
    if (location.hostname !== "app.scalev.com") {
      return false;
    }

    const pathname = location.pathname.replace(/\/+$/, "") || "/";

    /*
     * Fresh HTML Mode builder MUST be supported explicitly:
     * https://app.scalev.com/pages/new?mode=html_mode
     *
     * Do not activate on /pages/new for other builder modes.
     */
    if (pathname === "/pages/new") {
      return new URLSearchParams(location.search).get("mode") === "html_mode";
    }

    /* Existing HTML Mode editor pages remain supported, including
     * optional query params such as ?display={displayId}. */
    return /^\/pages\/[^/]+$/.test(pathname);
  }

  /*
   * Visual Editor hidup pada:
   * - /pages/{id}
   * - /pages/new?mode=html_mode
   */
  if (!isScalevEditModeUrl()) return;

  if (document.getElementById(ID)) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const state = {
    open: false,
    tab: "content",
    search: "",
    dirty: false,
    exitPromptOpen: false,

    editors: {
      html: null,
      css: null,
      js: null,
      head: null
    },

    allEditors: [],
    doc: null,
    rootSelector: ":root",

    config: null,
    configRange: null,
    schema: null,

    defaults: null,
    defaultConfig: null,

    scalevSlug: "",
    pendingWeddingIdSlug: "",

    templateLibrary: {
      status: "idle",
      templates: [],
      error: "",
      search: "",
      importedId: "",
      importedName: "",
      previousSource: null,
      loadedAt: 0
    },

    reorderEffect: null,

    internalEditorWrite: 0,
    editorChangeBound: new WeakSet(),
    freshBaselineTimer: null,
    baselineFingerprint: "",
    lastManagedFingerprint: "",

    /* Content performance engine — v0.9.1 */
    contentOpenSections: new Set(),
    contentCommitTimer: null,
    contentCommitMessage: "",
    contentStateDirty: false,
    contentSearchIndex: null,
    contentFieldCache: new WeakMap(),
    repeaterContentFieldCache: new WeakMap(),
    fallbackSchemaCache: null,
    fallbackSchemaReady: false,

    /* Content realtime / accordion engine — v0.9.5 */
    contentSectionHtmlCache: new Map(),
    contentSectionUseTick: 0,
    contentMaxMountedSections: 6,
    contentPrewarmScheduled: false,
    contentPrewarmHandle: null,
    contentPrewarmCursor: 0,

    /* Instant Open / Paint-First engine — v0.9.2 */
    sourceDirty: true,
    uiPrepared: false,
    renderedTab: "",
    renderedSearch: "",
    performance: {
      renderCount: 0,
      skippedTabRenders: 0,
      lastRenderMs: 0,
      lastRenderTab: "",
      slowRenders: 0
    },
    previewRefreshTimer: null,
    previewRefreshImages: false,
    prewarmScheduled: false,
    prewarmHandle: null,
    nativeCache: {
      save: null,
      publish: null,
      toolbarHost: null,
      globalHeader: null,
      workspaceRoot: null,
      topToolbar: null
    }
  };

  /* Read-only diagnostics for bounded before/after performance checks. */
  window.__SVE77_PERF = state.performance;

  const COLOR_FIELDS = [
    ["Background", "Primary", "--sve-background-primary", "#f7f0e8"],
    ["Background", "Secondary", "--sve-background-secondary", "#ffffff"],
    ["Background", "Tertiary", "--sve-background-tertiary", "#e8ddd0"],

    ["Body Teks", "Primary", "--sve-text-primary", "#332a24"],
    ["Body Teks", "Secondary", "--sve-text-secondary", "#74675f"],
    ["Body Teks", "Tertiary", "--sve-text-tertiary", "#a09185"],

    ["Button Primary", "Background", "--sve-button-primary-bg", "#332a24"],
    ["Button Primary", "Text", "--sve-button-primary-text", "#ffffff"],

    ["Button Secondary", "Background", "--sve-button-secondary-bg", "#ffffff"],
    ["Button Secondary", "Text", "--sve-button-secondary-text", "#332a24"]
  ];

  const SCALEV_FONT_SIZES = Array.from(
    { length: 31 },
    (_, index) => (12 + index * 2) + "px"
  );

  const SCALEV_LINE_HEIGHTS = [
    "1.0",
    "1.2",
    "1.5",
    "1.6",
    "1.8",
    "2.0",
    "2.4",
    "2.8",
    "3.0",
    "4.0",
    "5.0"
  ];

  const SCALEV_FONT_WEIGHTS = [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ];

  const TYPOGRAPHY_ROLES = [
    { key: "display", label: "Display / Hero", size: "56px", weight: "400", lineheight: "1.0" },
    { key: "heading", label: "Heading", size: "40px", weight: "400", lineheight: "1.2" },
    { key: "subheading", label: "Subheading / Card Title", size: "26px", weight: "500", lineheight: "1.3" },
    { key: "body", label: "Body", size: "16px", weight: "400", lineheight: "1.5" },
    { key: "small", label: "Small / Meta / Label", size: "12px", weight: "500", lineheight: "1.4" },
    { key: "button", label: "Button / CTA", size: "14px", weight: "700", lineheight: "1.2" }
  ];

  const STYLE_FIELDS = TYPOGRAPHY_ROLES.flatMap(role => [
    {
      role: role.key,
      roleLabel: role.label,
      label: "Size",
      variable: "--sve-" + role.key + "-size",
      fallback: role.size,
      type: "size"
    },
    {
      role: role.key,
      roleLabel: role.label,
      label: "Weight",
      variable: "--sve-" + role.key + "-weight",
      fallback: role.weight,
      type: "weight"
    },
    {
      role: role.key,
      roleLabel: role.label,
      label: "Line Height",
      variable: "--sve-" + role.key + "-line-height",
      fallback: role.lineheight,
      type: "lineheight"
    }
  ]);

  const CANONICAL_SECTION_IDS = [
    "cover",
    "opening",
    "quote",
    "couple",
    "stories",
    "savedate",
    "countdown",
    "gallery",
    "videos",
    "events",
    "dress",
    "rundown",
    "rsvp",
    "live",
    "filter",
    "gifts",
    "prokes",
    "guestbook",
    "families",
    "closing",
    "footer"
  ];

  const CANONICAL_FIELD_TYPES = new Set([
    "text",
    "textarea",
    "url",
    "email",
    "tel",
    "number",
    "date",
    "time",
    "datetime",
    "select",
    "boolean",
    "image",
    "repeater",
    "repeater-image"
  ]);

  const FORBIDDEN_OBJECT_KEYS = new Set([
    "__proto__",
    "prototype",
    "constructor"
  ]);

  const MAX_PATH_DEPTH = 12;
  const MAX_PATH_LENGTH = 240;
  const MAX_ARRAY_INDEX = 10000;

  function safePathParts(path) {
    const raw = String(path || "").trim();

    if (
      !raw ||
      raw.length > MAX_PATH_LENGTH ||
      raw.includes("..") ||
      raw.startsWith(".") ||
      raw.endsWith(".")
    ) {
      return null;
    }

    const parts = raw.split(".");

    if (!parts.length || parts.length > MAX_PATH_DEPTH) {
      return null;
    }

    for (const part of parts) {
      if (!part || FORBIDDEN_OBJECT_KEYS.has(part)) {
        return null;
      }

      if (/^\d+$/.test(part)) {
        const index = Number(part);
        if (!Number.isSafeInteger(index) || index < 0 || index > MAX_ARRAY_INDEX) {
          return null;
        }
        continue;
      }

      if (!/^[A-Za-z_$][A-Za-z0-9_$-]*$/.test(part)) {
        return null;
      }
    }

    return parts;
  }

  const RATIOS = {
    "16:9": "16 / 9",
    "4:3": "4 / 3",
    "1:1": "1 / 1",
    "4:5": "4 / 5",
    "9:16": "9 / 16"
  };

  const RATIO_OPTIONS = [
    "16:9",
    "4:3",
    "1:1",
    "4:5",
    "9:16"
  ];

  const ALIGN_POSITIONS = [
    "default",
    "center center",
    "center left",
    "center right",
    "top center",
    "top left",
    "top right",
    "bottom center",
    "bottom left",
    "bottom right"
  ];

  const ALIGN_POSITION_CSS = {
    "default": "",
    "center center": "center center",
    "center left": "left center",
    "center right": "right center",
    "top center": "center top",
    "top left": "left top",
    "top right": "right top",
    "bottom center": "center bottom",
    "bottom left": "left bottom",
    "bottom right": "right bottom"
  };

  const FIT_MODES = [
    "auto",
    "cover",
    "contain"
  ];

  function normalizeFit(value) {
    if (value === "fill") {
      return "cover";
    }

    if (value === "fit") {
      return "contain";
    }

    return FIT_MODES.includes(value)
      ? value
      : "auto";
  }

  function scalevChevronIcon(extraClass = "") {
    return `
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="${esc(extraClass)}"
      >
        <path
          d="M7 10L12 15L17 10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    `;
  }

  function scalevMoveArrowIcon(direction) {
    const rotateClass =
      direction === "up"
        ? "section-arrow-up"
        : "section-arrow-down";

    return `
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="section-arrow-icon ${rotateClass}"
      >
        <path
          d="M10 16L6 12M6 12L10 8M6 12H19"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    `;
  }

  function scalevDragIcon() {
    return `
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="section-drag-icon"
      >
        <circle cx="7" cy="5" r="1.35" fill="currentColor"></circle>
        <circle cx="13" cy="5" r="1.35" fill="currentColor"></circle>
        <circle cx="7" cy="10" r="1.35" fill="currentColor"></circle>
        <circle cx="13" cy="10" r="1.35" fill="currentColor"></circle>
        <circle cx="7" cy="15" r="1.35" fill="currentColor"></circle>
        <circle cx="13" cy="15" r="1.35" fill="currentColor"></circle>
      </svg>
    `;
  }

  /* =========================================================
     UTILS
     ========================================================= */

  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function cssAttrEscape(value) {
    return String(value ?? "")
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"');
  }

  function debounce(fn, ms = 180) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), ms);
    };
  }

  function runWhenIdle(callback, timeout = 900) {
    if (typeof window.requestIdleCallback === "function") {
      return window.requestIdleCallback(callback, { timeout });
    }

    return window.setTimeout(
      () => callback({ didTimeout: true, timeRemaining: () => 0 }),
      120
    );
  }

  function cancelIdle(handle) {
    if (handle === null || handle === undefined) return;

    if (typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(handle);
    } else {
      clearTimeout(handle);
    }
  }

  function connected(node) {
    return !!(node && node.isConnected);
  }

  function pruneNativeCache() {
    const cache = state.nativeCache;
    Object.keys(cache).forEach(key => {
      if (cache[key] && !connected(cache[key])) {
        cache[key] = null;
      }
    });
  }

  function clone(value) {
    if (value === null || value === undefined) return value;
    return JSON.parse(JSON.stringify(value));
  }

  function prettify(value) {
    return String(value || "")
      .replace(/[._-]+/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, char => char.toUpperCase())
      .trim();
  }

  function markDirty() {
    state.dirty = true;

    const status = $("#" + ID + "-save-status");

    if (status) {
      status.textContent = "Ada perubahan";
    }
  }

  /* =========================================================
     OBJECT PATH
     ========================================================= */

  function getPath(object, path) {
    if (object === null || object === undefined || !path) {
      return undefined;
    }

    const parts = safePathParts(path);
    if (!parts) return undefined;

    let current = object;

    for (const raw of parts) {
      if (current === null || current === undefined) {
        return undefined;
      }

      const key = /^\d+$/.test(raw) ? Number(raw) : raw;

      if (!Object.prototype.hasOwnProperty.call(current, key)) {
        return undefined;
      }

      current = current[key];
    }

    return current;
  }

  function setPath(object, path, value) {
    const parts = safePathParts(path);

    if (!object || !parts) return false;

    let current = object;

    for (let index = 0; index < parts.length - 1; index++) {
      const raw = parts[index];
      const key = /^\d+$/.test(raw) ? Number(raw) : raw;

      if (
        !Object.prototype.hasOwnProperty.call(current, key) ||
        current[key] === null ||
        current[key] === undefined
      ) {
        current[key] = /^\d+$/.test(parts[index + 1])
          ? []
          : Object.create(null);
      }

      if (typeof current[key] !== "object") {
        return false;
      }

      current = current[key];
    }

    const lastRaw = parts.at(-1);
    const last = /^\d+$/.test(lastRaw) ? Number(lastRaw) : lastRaw;

    current[last] = value;
    return true;
  }

  /* =========================================================
     SCALEV SLUG -> GUESTBOOK WEDDING ID
     ========================================================= */

  function normalizeScalevSlug(
    value
  ) {
    let raw =
      String(
        value || ""
      ).trim();

    if (!raw) {
      return "";
    }

    /*
     * Accept either a raw slug or a full public URL.
     */
    try {
      if (
        /^https?:\/\//i.test(
          raw
        )
      ) {
        const url =
          new URL(raw);

        const parts =
          url.pathname
            .split("/")
            .filter(Boolean);

        raw =
          parts.at(-1) ||
          "";
      }
    } catch (_) {}

    try {
      raw =
        decodeURIComponent(
          raw
        );
    } catch (_) {}

    return raw
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /-+/g,
        "-"
      )
      .replace(
        /^-+|-+$/g,
        ""
      )
      .slice(
        0,
        64
      );
  }

  function isScalevSlugInput(
    input
  ) {
    if (
      !input ||
      !(input instanceof HTMLInputElement) ||
      input.closest(
        "#" + ID
      )
    ) {
      return false;
    }

    const placeholder =
      String(
        input.getAttribute(
          "placeholder"
        ) ||
        ""
      )
        .trim()
        .toLowerCase();

    if (
      placeholder ===
      "nama-halaman"
    ) {
      return true;
    }

    let node =
      input;

    for (
      let depth = 0;
      depth < 5 &&
      node;
      depth += 1
    ) {
      const text =
        String(
          node.textContent ||
          ""
        )
          .replace(
            /\s+/g,
            " "
          )
          .trim()
          .toLowerCase();

      if (
        text.includes(
          "slug url"
        )
      ) {
        return true;
      }

      node =
        node.parentElement;
    }

    return false;
  }

  function findScalevSlugInput() {
    const inputs =
      $$(
        'input[type="text"], input:not([type])'
      )
        .filter(
          input =>
            isScalevSlugInput(
              input
            )
        );

    if (!inputs.length) {
      return null;
    }

    /*
     * Scalev currently uses placeholder="nama-halaman".
     * Prefer this exact native field when available.
     */
    return (
      inputs.find(
        input =>
          String(
            input.getAttribute(
              "placeholder"
            ) ||
            ""
          )
            .trim()
            .toLowerCase() ===
          "nama-halaman"
      ) ||
      inputs[0]
    );
  }

  function slugFromScalevCurrentUrl() {
    const links =
      $$("a[href]")
        .filter(
          link =>
            !link.closest(
              "#" + ID
            )
        );

    for (const link of links) {
      let node =
        link;

      let context =
        "";

      for (
        let depth = 0;
        depth < 4 &&
        node;
        depth += 1
      ) {
        context +=
          " " +
          String(
            node.textContent ||
            ""
          );

        node =
          node.parentElement;
      }

      if (
        !/saat\s*ini/i.test(
          context
        )
      ) {
        continue;
      }

      try {
        const url =
          new URL(
            link.href,
            location.href
          );

        if (
          !/\.scalev\.(?:com|id)$/i.test(
            url.hostname
          ) &&
          !/scalev\.(?:com|id)$/i.test(
            url.hostname
          )
        ) {
          continue;
        }

        const parts =
          url.pathname
            .split("/")
            .filter(Boolean);

        const slug =
          normalizeScalevSlug(
            parts.at(-1) ||
            ""
          );

        if (slug) {
          return slug;
        }
      } catch (_) {}
    }

    return "";
  }

  function readScalevSlug() {
    const input =
      findScalevSlugInput();

    const fromInput =
      normalizeScalevSlug(
        input?.value
      );

    if (fromInput) {
      state.scalevSlug =
        fromInput;

      return fromInput;
    }

    const fromUrl =
      slugFromScalevCurrentUrl();

    if (fromUrl) {
      state.scalevSlug =
        fromUrl;

      return fromUrl;
    }

    return (
      state.scalevSlug ||
      ""
    );
  }

  function isWeddingIdField(
    field,
    pathOverride
  ) {
    const path =
      String(
        pathOverride ||
        field?.path ||
        ""
      )
        .trim()
        .toLowerCase();

    const label =
      String(
        field?.label ||
        ""
      )
        .trim()
        .toLowerCase();

    const compactPath =
      path.replace(
        /[^a-z0-9]/g,
        ""
      );

    return (
      (
        path.includes(
          "guestbook"
        ) &&
        compactPath.endsWith(
          "weddingid"
        )
      ) ||
      /wedding\s*id/.test(
        label
      )
    );
  }

  function weddingIdPaths() {
    const paths =
      new Set();

    try {
      schemaSections()
        .forEach(
          section => {
            (
              section.fields ||
              []
            ).forEach(
              field => {
                if (
                  field.type ===
                  "repeater"
                ) {
                  return;
                }

                if (
                  isWeddingIdField(
                    field,
                    field.path
                  ) &&
                  field.path
                ) {
                  paths.add(
                    field.path
                  );
                }
              }
            );
          }
        );
    } catch (_) {}

    /*
     * Canonical strict-sync fallback.
     */
    if (
      state.config &&
      getPath(
        state.config,
        "guestbook.weddingId"
      ) !== undefined
    ) {
      paths.add(
        "guestbook.weddingId"
      );
    }

    return Array.from(
      paths
    );
  }

  function updateWeddingIdFieldUI(
    slug
  ) {
    $$(
      '[data-auto-wedding-id="1"]'
    ).forEach(
      input => {
        if (
          input.value !==
          slug
        ) {
          input.value =
            slug;
        }

        input.setAttribute(
          "readonly",
          ""
        );
      }
    );
  }

  function syncWeddingIdToSlug(
    slugOverride,
    options = {}
  ) {
    const slug =
      normalizeScalevSlug(
        slugOverride ||
        readScalevSlug()
      );

    if (!slug) {
      return false;
    }

    state.scalevSlug =
      slug;

    const paths =
      weddingIdPaths();

    if (
      !state.config ||
      !paths.length
    ) {
      state.pendingWeddingIdSlug =
        slug;

      updateWeddingIdFieldUI(
        slug
      );

      return false;
    }

    let changed =
      false;

    paths.forEach(
      path => {
        if (
          getPath(
            state.config,
            path
          ) !== slug
        ) {
          setPath(
            state.config,
            path,
            slug
          );

          changed =
            true;
        }
      }
    );

    updateWeddingIdFieldUI(
      slug
    );

    if (!changed) {
      state.pendingWeddingIdSlug =
        "";

      return false;
    }

    /*
     * If CodeMirror is temporarily unmounted because the user
     * is on Scalev "Pengaturan", keep the slug pending. It will
     * be committed as soon as Kode/CodeMirror is available again.
     */
    const hasLiveEditors =
      findCodeMirrors()
        .length > 0;

    if (
      options.commit !== false &&
      hasLiveEditors &&
      state.configRange?.editor
    ) {
      state.pendingWeddingIdSlug =
        "";

      commitConfig(
        options.silent
          ? undefined
          : "Wedding ID mengikuti Slug URL"
      );

      updateWeddingIdFieldUI(
        slug
      );

      return true;
    }

    state.pendingWeddingIdSlug =
      slug;

    return true;
  }

  function flushPendingWeddingIdSlug() {
    const slug =
      normalizeScalevSlug(
        state.pendingWeddingIdSlug ||
        state.scalevSlug ||
        readScalevSlug()
      );

    if (!slug) {
      return false;
    }

    return syncWeddingIdToSlug(
      slug,
      {
        commit: true,
        silent: true
      }
    );
  }

  const syncScalevSlugDebounced =
    debounce(
      () => {
        const slug =
          readScalevSlug();

        if (!slug) {
          return;
        }

        syncWeddingIdToSlug(
          slug,
          {
            commit: true
          }
        );
      },
      450
    );

  /* =========================================================
     SCALEV TOOLBAR TOGGLE + PUSH DOCK
     ========================================================= */

  function findSaveButtons() {
    pruneNativeCache();

    if (connected(state.nativeCache.save) || connected(state.nativeCache.publish)) {
      return {
        save: connected(state.nativeCache.save) ? state.nativeCache.save : null,
        publish: connected(state.nativeCache.publish) ? state.nativeCache.publish : null
      };
    }

    const buttons = $$('button').filter(button => !button.closest('#' + ID));

    const normalized = button =>
      (button.textContent || '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

    const save = buttons.find(button => {
      const text = normalized(button);
      return text === 'simpan' || text === 'save';
    }) || null;

    const publish = buttons.find(button => {
      const text = normalized(button);
      return (
        text.includes('simpan & terbitkan') ||
        text.includes('simpan dan terbitkan') ||
        text === 'publish'
      );
    }) || null;

    state.nativeCache.save = save;
    state.nativeCache.publish = publish;

    return { save, publish };
  }

  function lowestCommonAncestor(a, b) {
    if (!a) return b?.parentElement || null;
    if (!b) return a?.parentElement || null;

    const ancestors = new Set();
    let node = a;

    while (node) {
      ancestors.add(node);
      node = node.parentElement;
    }

    node = b;

    while (node) {
      if (ancestors.has(node)) return node;
      node = node.parentElement;
    }

    return null;
  }

  function findToolbarHost(save, publish) {
    pruneNativeCache();

    if (connected(state.nativeCache.toolbarHost)) {
      return state.nativeCache.toolbarHost;
    }

    if (save && publish && save.parentElement === publish.parentElement) {
      state.nativeCache.toolbarHost = save.parentElement;
      return save.parentElement;
    }

    const common = lowestCommonAncestor(save, publish);

    if (!common) {
      return save?.parentElement || publish?.parentElement || null;
    }

    /*
     * Jangan naik terlalu jauh sampai root aplikasi.
     * Cari container kecil yang memang memuat kedua tombol.
     */
    let node = common;

    for (let i = 0; i < 4 && node; i++, node = node.parentElement) {
      const rect = node.getBoundingClientRect?.();

      if (
        rect &&
        rect.top >= 0 &&
        rect.top < 180 &&
        rect.height < 110
      ) {
        state.nativeCache.toolbarHost = node;
        return node;
      }
    }

    state.nativeCache.toolbarHost = common;
    return common;
  }

  function syncToolbarToggleVisibility() {
    const toggle =
      document.getElementById(
        ID +
        "-toolbar-toggle"
      );

    if (!toggle) {
      return;
    }

    const hidden =
      !!state.open;

    toggle.style.setProperty(
      "display",
      hidden
        ? "none"
        : "",
      hidden
        ? "important"
        : ""
    );

    toggle.setAttribute(
      "aria-hidden",
      hidden
        ? "true"
        : "false"
    );

    toggle.tabIndex =
      hidden
        ? -1
        : 0;
  }

  function mountToolbarToggle() {
    const { save, publish } = findSaveButtons();
    const reference = publish || save;

    if (!reference) return false;

    const host = findToolbarHost(save, publish);

    if (!host) return false;

    /*
     * Tandai host tombol native Scalev.
     * Gap dipaksa konsisten supaya Simpan, Simpan & Terbitkan,
     * dan Visual Editor tidak saling menempel.
     */
    host.setAttribute('data-sve77-toolbar-host', '1');
    host.style.columnGap = '8px';
    host.style.rowGap = '8px';

    let toggle = document.getElementById(ID + '-toolbar-toggle');

    if (!toggle) {
      /*
       * Clone kelas visual tombol Scalev agar ukuran/typography native.
       * Event Vue tidak ikut karena cloneNode(false).
       */
      toggle = reference.cloneNode(false);
      toggle.id = ID + '-toolbar-toggle';
      toggle.type = 'button';
      toggle.disabled = false;
      toggle.removeAttribute('disabled');
      toggle.setAttribute('aria-controls', ID + '-dock');
      toggle.setAttribute('aria-label', 'Tampilkan atau sembunyikan Visual Editor');
      toggle.setAttribute('aria-pressed', 'false');
      toggle.textContent = 'Visual Editor';

      toggle.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        if (state.open) {
          requestPanelClose();
        } else {
          setPanelOpen(true);
        }
      });
    }

    if (toggle.parentElement !== host) {
      if (publish && publish.parentElement === host) {
        publish.insertAdjacentElement('afterend', toggle);
      } else if (save && save.parentElement === host) {
        save.insertAdjacentElement('afterend', toggle);
      } else {
        host.appendChild(toggle);
      }
    }

    toggle.classList.toggle('sve-toolbar-active', state.open);
    toggle.setAttribute('aria-pressed', state.open ? 'true' : 'false');

    /*
     * UX:
     * Tombol "Visual Editor" hanya berfungsi sebagai launcher.
     * Saat panel sudah terbuka, launcher disembunyikan.
     * Untuk menutup panel gunakan double-chevron di panel kanan.
     */
    syncToolbarToggleVisibility();

    /*
     * Kalau Vue rebuild toolbar saat panel sedang ON,
     * koreksi posisi toolbar lagi tanpa menunggu reload.
     */
    if (state.open) {
      requestAnimationFrame(() => applyToolbarPush(true));
    }

    return true;
  }

  function findScalevPageRoot() {
    const candidates = [
      document.querySelector('#app'),
      document.querySelector('#__nuxt'),
      document.querySelector('[data-v-app]')
    ].filter(Boolean);

    const direct = candidates.find(node => !node.closest('#' + ID));

    if (direct) return direct;

    return Array.from(document.body.children).find(node => {
      if (!(node instanceof HTMLElement)) return false;
      if (node.id === ID) return false;
      if (node.id === ID + '-font-portal') return false;
      if (['SCRIPT', 'STYLE', 'LINK'].includes(node.tagName)) return false;
      return true;
    }) || null;
  }

  function findScalevGlobalHeader() {
    pruneNativeCache();

    if (connected(state.nativeCache.globalHeader)) {
      return state.nativeCache.globalHeader;
    }

    const candidates = $$('div').filter(node => {
      if (!(node instanceof HTMLElement)) return false;
      if (node.closest('#' + ID)) return false;

      const style = getComputedStyle(node);
      const rect = node.getBoundingClientRect();
      const text = (node.textContent || '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

      return (
        style.position === 'fixed' &&
        rect.top >= -2 &&
        rect.top <= 4 &&
        rect.height >= 36 &&
        rect.height <= 64 &&
        rect.width >= window.innerWidth * 0.7 &&
        text.includes('landing page studio')
      );
    });

    if (!candidates.length) return null;

    /*
     * Ambil fixed header paling tipis / paling dekat top.
     * Ini cocok dengan header global Scalev z-50 tinggi ±44px.
     */
    const header = candidates.sort((a, b) => {
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      return ar.height - br.height || ar.top - br.top;
    })[0];

    state.nativeCache.globalHeader = header || null;
    return header || null;
  }

  function updateGlobalHeaderMetrics() {
    const header = findScalevGlobalHeader();
    const rect = header?.getBoundingClientRect?.();

    let bottom = rect?.bottom || 44;

    if (!Number.isFinite(bottom) || bottom < 36 || bottom > 72) {
      bottom = 44;
    }

    document.documentElement.style.setProperty(
      '--sve77-global-header-height',
      Math.round(bottom) + 'px'
    );

    if (header) {
      header.setAttribute('data-sve77-global-header', '1');
    }
  }

  function findScalevWorkspaceRoot() {
    pruneNativeCache();

    if (connected(state.nativeCache.workspaceRoot)) {
      return state.nativeCache.workspaceRoot;
    }

    const { save, publish } = findSaveButtons();
    const reference = publish || save;

    if (!reference) {
      return findScalevPageRoot();
    }

    let node = reference;
    let best = null;

    /*
     * Cari shell editor yang dimulai setelah global blue header.
     * Ini sengaja menghindari navbar biru paling atas supaya navbar
     * tetap full-width, sedangkan toolbar editor + canvas ikut mengecil.
     */
    while (node && node !== document.body) {
      if (node instanceof HTMLElement) {
        const rect = node.getBoundingClientRect();

        if (
          rect.top >= 36 &&
          rect.top <= 130 &&
          rect.width >= window.innerWidth * 0.68 &&
          rect.height >= window.innerHeight * 0.62
        ) {
          best = node;
        }
      }

      node = node.parentElement;
    }

    const root = best || findScalevPageRoot();
    state.nativeCache.workspaceRoot = root || null;
    return root;
  }

  function getPanelWidthPx() {
    const dock = document.getElementById(ID + '-dock');
    const measured = dock?.getBoundingClientRect?.().width || 0;

    if (measured > 0) return measured;

    return Math.min(400, window.innerWidth * 0.32);
  }

  function clearPreviousPushRoot(root) {
    if (!root) return;

    root.removeAttribute('data-sve77-page-root');
    root.removeAttribute('data-sve77-layout');
  }

  function applyPushLayout(active) {
    const previous = document.querySelector('[data-sve77-page-root="1"]');
    const root = findScalevWorkspaceRoot();

    if (previous && previous !== root) {
      clearPreviousPushRoot(previous);
    }

    if (root) {
      if (active) {
        const style = getComputedStyle(root);
        const positioned =
          (style.position === 'fixed' || style.position === 'absolute') &&
          style.left !== 'auto';

        root.setAttribute('data-sve77-page-root', '1');
        root.setAttribute(
          'data-sve77-layout',
          positioned ? 'positioned' : 'flow'
        );
      } else {
        clearPreviousPushRoot(root);
      }
    }

    document.documentElement.classList.toggle('sve77-panel-open', !!active);

    requestAnimationFrame(() => applyToolbarPush(active));
  }

  function findScalevTopToolbar() {
    pruneNativeCache();

    if (connected(state.nativeCache.topToolbar)) {
      return state.nativeCache.topToolbar;
    }

    const { save, publish } = findSaveButtons();
    const reference = publish || save;

    if (!reference) return null;

    let node = reference;
    let best = null;

    /*
     * Toolbar native Scalev pada HTML Mode adalah fixed bar:
     * top sekitar 44px, tinggi sekitar 64px, left mengikuti sidebar kiri,
     * dan right default 0.
     *
     * Kita cari ancestor fixed tersebut, bukan hanya host tombol.
     */
    while (node && node !== document.body) {
      if (node instanceof HTMLElement) {
        const style = getComputedStyle(node);
        const rect = node.getBoundingClientRect();

        if (
          style.position === 'fixed' &&
          rect.top >= 36 &&
          rect.top <= 70 &&
          rect.height >= 48 &&
          rect.height <= 92 &&
          rect.width >= Math.min(520, window.innerWidth * 0.42)
        ) {
          best = node;
          break;
        }
      }

      node = node.parentElement;
    }

    state.nativeCache.topToolbar = best || null;
    return best;
  }

  function clearTopToolbarPush(toolbar) {
    if (!toolbar) return;

    toolbar.removeAttribute('data-sve77-top-toolbar');
    toolbar.style.removeProperty('right');
    toolbar.style.removeProperty('transition');
    toolbar.style.removeProperty('box-sizing');
  }

  function applyToolbarPush(active) {
    const { save, publish } = findSaveButtons();
    const host =
      document.querySelector('[data-sve77-toolbar-host="1"]') ||
      findToolbarHost(save, publish);

    if (host) {
      host.setAttribute('data-sve77-toolbar-host', '1');
      host.style.columnGap = '8px';
      host.style.rowGap = '8px';

      /*
       * V0.3.7 menggeser host tombol pakai transform.
       * Itu hanya memindahkan tombol, bukan window toolbar.
       * V0.3.8 sengaja mematikan transform tersebut.
       */
      host.style.removeProperty('transform');
      host.style.removeProperty('transition');
    }

    const previousToolbar =
      document.querySelector('[data-sve77-top-toolbar="1"]');

    const toolbar =
      findScalevTopToolbar();

    if (
      previousToolbar &&
      previousToolbar !== toolbar
    ) {
      clearTopToolbarPush(previousToolbar);
    }

    if (!toolbar) return;

    if (!active) {
      clearTopToolbarPush(toolbar);
      return;
    }

    const panelWidth =
      Math.ceil(getPanelWidthPx());

    toolbar.setAttribute(
      'data-sve77-top-toolbar',
      '1'
    );

    /*
     * Ini inti fix:
     * toolbar fixed Scalev tetap punya left native (mis. 400px),
     * tapi right sekarang sebesar panel Visual Editor.
     *
     * Hasilnya toolbar benar-benar mengecil dan berhenti di batas
     * panel kanan. Simpan + Simpan & Terbitkan tetap berada di area
     * kerja kiri tanpa overlap. Launcher Visual Editor disembunyikan
     * selama panel aktif.
     */
    toolbar.style.setProperty(
      'right',
      panelWidth + 'px',
      'important'
    );

    toolbar.style.setProperty(
      'box-sizing',
      'border-box',
      'important'
    );

    toolbar.style.setProperty(
      'transition',
      'right .16s ease',
      'important'
    );
  }

  function scheduleSlugSyncAfterPaint() {
    runWhenIdle(() => {
      /* Slug sync is never part of hidden prewarm or first paint. */
      if (!state.open) return;

      try {
        const slug = readScalevSlug();

        if (slug) {
          syncWeddingIdToSlug(
            slug,
            {
              commit: true,
              silent: true
            }
          );
        }

        flushPendingWeddingIdSlug();
      } catch (_) {}
    }, 1200);
  }

  function ensurePanelReady() {
    let parsed = false;

    try {
      if (state.sourceDirty || !state.doc) {
        parsed = parseAll();
      }
    } catch (_) {}

    const sameView =
      state.uiPrepared &&
      state.renderedTab === (state.tab || "content") &&
      state.renderedSearch === (state.search || "");

    if (!sameView || parsed) {
      try {
        render();
      } catch (_) {}
    }

    scheduleSlugSyncAfterPaint();
  }

  function schedulePanelWorkAfterPaint() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!state.open) return;

        /* First visible paint is already allowed to happen. */
        try {
          updateGlobalHeaderMetrics();
          applyPushLayout(true);
        } catch (_) {}

        ensurePanelReady();
      });
    });
  }

  function prewarmVisualEditor() {
    state.prewarmScheduled = false;
    state.prewarmHandle = null;

    if (state.open) {
      ensurePanelReady();
      return;
    }

    try {
      if (state.sourceDirty || !state.doc) {
        parseAll();
      }

      const sameView =
        state.uiPrepared &&
        state.renderedTab === (state.tab || "content") &&
        state.renderedSearch === (state.search || "");

      if (!sameView && state.doc) {
        render();
      }
    } catch (_) {}

    scheduleSlugSyncAfterPaint();
  }

  function scheduleVisualEditorPrewarm() {
    if (state.prewarmScheduled) return;

    state.prewarmScheduled = true;
    state.prewarmHandle = runWhenIdle(
      prewarmVisualEditor,
      1200
    );
  }

  function setPanelOpen(active) {
    state.open = !!active;

    const app = document.getElementById(ID);
    const toggle = document.getElementById(ID + '-toolbar-toggle');

    /*
     * Paint-first: synchronous click work is intentionally tiny.
     * Browser gets the open class before parse, render, slug sync,
     * geometry scans, or workspace push.
     */
    app?.classList.toggle('open', state.open);
    toggle?.classList.toggle('sve-toolbar-active', state.open);
    toggle?.setAttribute('aria-pressed', state.open ? 'true' : 'false');

    syncToolbarToggleVisibility();
    closeFontPortal();

    if (state.open) {
      if (state.prewarmScheduled) {
        cancelIdle(state.prewarmHandle);
        state.prewarmScheduled = false;
        state.prewarmHandle = null;
      }

      schedulePanelWorkAfterPaint();
      return;
    }

    requestAnimationFrame(() => {
      try {
        applyPushLayout(false);
      } catch (_) {}
    });

    scheduleVisualEditorPrewarm();
  }

  function updateExitPrompt() {
    const prompt = document.getElementById(ID + "-exit-prompt");

    if (!prompt) return;

    const visible = state.exitPromptOpen === true;
    prompt.hidden = !visible;
    prompt.setAttribute("aria-hidden", visible ? "false" : "true");
  }

  function requestPanelClose() {
    if (!state.dirty) {
      setPanelOpen(false);
      return;
    }

    state.exitPromptOpen = true;
    updateExitPrompt();
    document.getElementById(ID + "-exit-keep")?.focus();
  }

  function closeExitPrompt() {
    state.exitPromptOpen = false;
    updateExitPrompt();
  }

  function closePanelAnyway() {
    state.exitPromptOpen = false;
    setPanelOpen(false);
    updateExitPrompt();
  }

  /* =========================================================
     CODEMIRROR
     ========================================================= */

  function findCodeMirrors() {
    return [
      ...new Set(
        $$(".CodeMirror")
          .map(element => element.CodeMirror)
          .filter(Boolean)
      )
    ];
  }

  function detectEditors() {
    const editors = findCodeMirrors();

    state.allEditors = editors;

    if (!editors.length) {
      return false;
    }

    const found = {
      html: null,
      css: null,
      js: null,
      head: null
    };

    $$("label").forEach(label => {
      const cm = label.querySelector(".CodeMirror")?.CodeMirror;

      if (!cm) return;

      const title = (
        label.querySelector(":scope > span")?.textContent ||
        label.querySelector("span")?.textContent ||
        ""
      )
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

      if (title === "body html") {
        found.html = cm;
      } else if (title === "css") {
        found.css = cm;
      } else if (title === "javascript") {
        found.js = cm;
      } else if (title.includes("additional head")) {
        found.head = cm;
      }
    });

    editors.forEach(cm => {
      const value = cm.getValue?.() || "";

      if (
        !found.js &&
        (
          value.includes("SVE_SCHEMA") ||
          /\b(?:var|let|const)\s+CONFIG\s*=/.test(value)
        )
      ) {
        found.js = cm;
      }

      if (
        !found.html &&
        (
          value.includes("data-sve-section") ||
          /<section[\s>]/i.test(value)
        )
      ) {
        found.html = cm;
      }

      if (
        !found.css &&
        (
          value.includes("--sve-background-primary") ||
          value.includes("--sve-font-heading")
        )
      ) {
        found.css = cm;
      }
    });

    found.html = found.html || editors[0] || null;
    found.css = found.css || editors[1] || null;
    found.js = found.js || editors[2] || null;
    found.head = found.head || editors[3] || null;

    state.editors = found;

    bindFreshSourceDetection();

    return true;
  }

  function getValue(kind) {
    return state.editors[kind]?.getValue?.() || "";
  }

  function syncEditorToScalev(
    editor,
    dispatchChange = false
  ) {
    if (!editor) return;

    try {
      editor.save?.();

      const textarea =
        editor.getTextArea?.();

      if (!textarea) return;

      textarea.dispatchEvent(
        new Event(
          "input",
          {
            bubbles: true
          }
        )
      );

      if (dispatchChange) {
        textarea.dispatchEvent(
          new Event(
            "change",
            {
              bubbles: true
            }
          )
        );
      }
    } catch (_) {}
  }

  function setEditorValue(
    editor,
    value,
    dispatchChange = false
  ) {
    if (!editor) return;

    state.internalEditorWrite += 1;

    try {
      editor.operation(() => {
        editor.setValue(value);
        editor.save?.();
      });

      syncEditorToScalev(
        editor,
        dispatchChange
      );

      editor.refresh?.();
    } finally {
      state.internalEditorWrite = Math.max(0, state.internalEditorWrite - 1);
    }

    markDirty();
    persistManagedFingerprint();
  }

  function setValue(kind, value) {
    setEditorValue(state.editors[kind], value);
  }

  /* =========================================================
     TEMPLATE LIBRARY
     ========================================================= */

  function templateLibraryEndpoint() {
    return new URL(TEMPLATE_LIBRARY_CONFIG.endpoint);
  }

  function safeLibraryUrl(value, allowAnyHttps = false) {
    try {
      const url = new URL(String(value || ""));

      if (url.protocol !== "https:") {
        return "";
      }

      if (!allowAnyHttps && url.origin !== templateLibraryEndpoint().origin) {
        return "";
      }

      return url.href;
    } catch (_) {
      return "";
    }
  }

  function normalizeTemplateRecord(record) {
    if (!record || typeof record !== "object") return null;

    const id = String(record.id || "").trim();
    const name = String(record.name || "").trim();

    if (!/^[a-z0-9][a-z0-9-]{1,63}$/.test(id) || !name) {
      return null;
    }

    return {
      id,
      name: name.slice(0, 120),
      version: String(record.version || "").trim().slice(0, 32),
      priceIdr: Number.isFinite(Number(record.price_idr))
        ? Number(record.price_idr)
        : 100000,
      commissionRate: Number.isFinite(Number(record.commission_rate))
        ? Number(record.commission_rate)
        : 60,
      sourceUrl: safeLibraryUrl(record.source_url || record.sourceUrl)
    };
  }

  function templateLibraryRows(payload) {
    const rows = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.templates)
        ? payload.templates
        : [];

    return rows.map(normalizeTemplateRecord).filter(Boolean);
  }

  function formatTemplatePrice(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(Number(value) || 0).replace(/^Rp\s*/i, "Rp");
  }

  function templateCommission(template) {
    const price = Number(template.priceIdr) || 0;
    const rate = Number(template.commissionRate) || 0;
    return Math.round(price * rate / 100);
  }

  async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeout = window.setTimeout(
      () => controller.abort(),
      TEMPLATE_LIBRARY_CONFIG.timeoutMs
    );

    try {
      return await fetch(url, {
        ...options,
        signal: controller.signal,
        credentials: "omit",
        cache: "no-store"
      });
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function userscriptRequest(url, options = {}) {
    if (typeof GM_xmlhttpRequest !== "function") return null;

    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: options.method || "GET",
        url,
        headers: options.headers || {},
        timeout: TEMPLATE_LIBRARY_CONFIG.timeoutMs,
        onload: response => resolve(new Response(response.responseText || "", {
          status: response.status,
          statusText: response.statusText,
          headers: { "Content-Type": response.responseHeaders?.match(/content-type:\s*([^\\r\\n]+)/i)?.[1]?.trim() || "text/plain" }
        })),
        ontimeout: () => reject(new DOMException("The operation timed out", "AbortError")),
        onerror: () => reject(new TypeError("Userscript request failed"))
      });
    });
  }

  async function fetchLibraryResource(url, options = {}) {
    try {
      return await fetchWithTimeout(url, options);
    } catch (error) {
      const fallback = userscriptRequest(url, options);
      if (!fallback) throw error;
      return await fallback;
    }
  }

  async function loadTemplateLibrary(force = false) {
    const library = state.templateLibrary;

    if (
      !force &&
      library.status === "ready" &&
      library.loadedAt &&
      Date.now() - library.loadedAt < 300000
    ) {
      return library.templates;
    }

    library.status = "loading";
    library.error = "";

    try {
      const response = await fetchLibraryResource(
        TEMPLATE_LIBRARY_CONFIG.endpoint,
        { headers: { Accept: "application/json" } }
      );

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(payload?.error || "HTTP " + response.status);
      }

      const templates = templateLibraryRows(payload);

      if (!templates.length) {
        throw new Error("Library belum memiliki template aktif");
      }

      library.templates = templates;
      library.loadedAt = Date.now();
      library.status = "ready";
      return templates;
    } catch (error) {
      library.templates = [];
      library.status = "error";
      library.error = error?.name === "AbortError"
        ? "Library timeout"
        : String(error?.message || "Library belum bisa dimuat");
      return library.templates;
    }
  }

  function nativeCodeTabButton() {
    return $$('button, [role="tab"]').find(button => {
      if (button.closest("#" + ID)) return false;

      const text = String(button.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();

      return text === "kode" || text === "code" || text.includes("kode html");
    }) || null;
  }

  async function ensureNativeEditors() {
    if (detectEditors() && state.editors.html) {
      return true;
    }

    nativeCodeTabButton()?.click();

    const started = Date.now();

    while (Date.now() - started < 2200) {
      await new Promise(resolve => window.setTimeout(resolve, 120));

      if (detectEditors() && state.editors.html) {
        return true;
      }
    }

    return false;
  }

  function validateCompleteTemplateDocument(source) {
    const blockers = [];
    const html = String(source || "").replace(/^\uFEFF/, "");
    const doc = new DOMParser().parseFromString(html, "text/html");
    const root = doc.querySelector("[data-sve-template]") || doc.querySelector("main[id]");
    const styles = Array.from(doc.querySelectorAll("style"));
    const scripts = Array.from(doc.querySelectorAll("script"));
    const body = doc.body;
    const scriptSource = scripts[0]?.textContent || "";
    const config = extractStaticObjectFromSource(scriptSource, "CONFIG");
    const schema = extractStaticObjectFromSource(scriptSource, "SVE_SCHEMA");

    if (!/^\s*<!doctype\s+html\b/i.test(html)) blockers.push("DOCTYPE HTML wajib ada");
    if (!doc.documentElement || doc.documentElement.tagName !== "HTML") blockers.push("Elemen html wajib ada");
    if (doc.documentElement?.getAttribute("lang") !== "id") blockers.push('html lang wajib "id"');
    if (!doc.head) blockers.push("Elemen head wajib ada");
    if (!body) blockers.push("Elemen body wajib ada");
    if (!doc.querySelector("title")) blockers.push("Title wajib ada di head");
    if (!root) blockers.push("Root template dengan data-sve-template tidak ditemukan");
    if (!config) blockers.push("CONFIG static tidak terbaca");
    if (!schema) blockers.push("SVE_SCHEMA static tidak terbaca");
    if (styles.length !== 1 || !doc.head?.contains(styles[0])) blockers.push("Wajib tepat satu style di head");
    if (body?.querySelector("style")) blockers.push("Style tidak boleh berada di body");
    if (scripts.length !== 1 || !body?.contains(scripts[0])) blockers.push("Wajib tepat satu script di body");
    if (scripts[0] && scripts[0] !== body?.lastElementChild) blockers.push("Script wajib menjadi elemen terakhir di body");
    if (scripts[0]?.src) blockers.push("Script template harus inline");
    if (/\beval\s*\(|\bnew\s+Function\s*\(|javascript\s*:/i.test(html)) {
      blockers.push("Kode berbahaya terdeteksi");
    }
    if (/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(html)) {
      blockers.push("Kemungkinan credential rahasia terdeteksi");
    }

    const ids = Array.isArray(schema?.sections)
      ? schema.sections.map(sectionId).filter(Boolean)
      : [];
    const uniqueIds = new Set(ids);

    if (ids.length !== uniqueIds.size) {
      blockers.push("SVE_SCHEMA memiliki duplicate section id");
    }

    CANONICAL_SECTION_IDS.forEach(id => {
      if (!uniqueIds.has(id)) blockers.push("Canonical section hilang: " + id);
    });

    const order = Array.isArray(config?.sectionOrder) ? config.sectionOrder : [];
    if (order.length !== CANONICAL_SECTION_IDS.length || !CANONICAL_SECTION_IDS.every(id => order.includes(id))) {
      blockers.push("CONFIG.sectionOrder belum lengkap");
    }

    return {
      blockers,
      html
    };
  }

  function extractStaticObjectFromSource(source, name) {
    const safeName = String(name || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = new RegExp("(?:var|let|const)\\s+" + safeName + "\\s*=\\s*\\{").exec(source);

    if (!match) return null;

    const block = extractBalancedObject(source, source.indexOf("{", match.index));

    if (!block) return null;

    try {
      return parseLooseObjectLiteral(block.text);
    } catch (_) {
      return null;
    }
  }

  function findNativeTemplateFileInput() {
    const htmlInputs = $$('input[type="file"]').filter(input => {
      if (input.closest("#" + ID)) return false;

      const accept = String(input.getAttribute("accept") || "").toLowerCase();
      if (!accept.includes("html") && !accept.includes("text/html")) return false;

      return true;
    });

    const candidates = htmlInputs.filter(input => {

      let node = input;
      let context = "";

      for (let depth = 0; depth < 5 && node; depth += 1, node = node.parentElement) {
        context += " " + String(node.textContent || "");
      }

      return /upload\s+file|import\s+html|unggah\s+file/i.test(context);
    });

    return candidates[0] || htmlInputs[0] || null;
  }

  function assignNativeTemplateFile(file) {
    const input = findNativeTemplateFileInput();

    if (!input) {
      throw new Error("Input native Upload File belum terlihat");
    }

    if (typeof DataTransfer !== "function") {
      throw new Error("Browser tidak mendukung file handoff native");
    }

    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function selectPanelTab(tab) {
    const hiddenLiteTabs = ["style", "audio", "compatibility"];
    const nextTab =
      SVE_LITE_MODE && hiddenLiteTabs.includes(tab)
        ? "content"
        : (tab || "content");
    const samePreparedView =
      state.uiPrepared &&
      state.tab === nextTab &&
      state.renderedSearch === (state.search || "");

    state.tab = nextTab;
    state.uiPrepared = false;

    const app = document.getElementById(ID);
    $$(".tab", app).forEach(button => {
      button.classList.toggle("active", button.dataset.tab === tab);
    });

    if (samePreparedView) {
      state.uiPrepared = true;
      state.performance.skippedTabRenders += 1;
      return;
    }

    render();
  }

  async function importCompleteHtmlFile(file, templateId, templateName) {
    const library = state.templateLibrary;
    const validation = validateCompleteTemplateDocument(await file.text());

    if (validation.blockers.length) {
      console.error("[SVE] Template library validation failed", validation.blockers);
      throw new Error(validation.blockers[0]);
    }

    if (!(await ensureNativeEditors())) {
      throw new Error("Buka tab Kode terlebih dahulu");
    }

    const previousSource = {
      html: getValue("html"),
      css: getValue("css"),
      js: getValue("js"),
      head: getValue("head")
    };

    assignNativeTemplateFile(file);

    const started = Date.now();
    let imported = false;

    while (Date.now() - started < 4500) {
      await new Promise(resolve => window.setTimeout(resolve, 140));
      detectEditors();

      const currentHtml = getValue("html");
      const currentJs = getValue("js");

      if (
        currentHtml !== previousSource.html ||
        currentJs !== previousSource.js
      ) {
        imported = true;
        break;
      }
    }

    if (!imported) {
      throw new Error("Scalev belum menyelesaikan import file");
    }

    library.previousSource = previousSource;
    library.importedId = templateId || "local-import";
    library.importedName = templateName || file.name || "Template lokal";
    parseAll();
    notifyPreview();
    selectPanelTab("content");
  }

  async function importLibraryTemplate(id) {
    const library = state.templateLibrary;
    const template = library.templates.find(item => item.id === id);

    if (!template) {
      library.error = "Template tidak ditemukan";
      library.status = "error";
      selectPanelTab("library");
      return;
    }

    if (!template.sourceUrl) {
      library.error = "Source template belum tersedia";
      library.status = "error";
      selectPanelTab("library");
      return;
    }

    if (
      template.id === library.importedId &&
      !window.confirm(
        "Reset ke default?\nPerubahan pada template aktif akan diganti dengan source asli."
      )
    ) {
      return;
    }

    try {
      const response = await fetchLibraryResource(template.sourceUrl, {
        headers: { Accept: "text/html" }
      });

      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }

      const source = await response.text();
      const filename = template.id.replace(/[^a-z0-9-]+/gi, "-") + ".html";
      const file = new File([source], filename, { type: "text/html" });
      await importCompleteHtmlFile(file, template.id, template.name);
      library.error = "";
      library.status = "ready";
      selectPanelTab("library");
    } catch (error) {
      library.previousSource = null;
      library.importedId = "";
      library.importedName = "";
      library.status = "error";
      library.error = "Import gagal: " + String(error?.message || "source tidak terbaca");
      selectPanelTab("library");
    }
  }

  function undoLibraryImport() {
    const previous = state.templateLibrary.previousSource;

    if (!previous) return;

    setValue("html", previous.html);
    setValue("css", previous.css);
    setValue("js", previous.js);
    setValue("head", previous.head);

    state.templateLibrary.previousSource = null;
    state.templateLibrary.importedId = "";
    state.templateLibrary.importedName = "";
    parseAll();
    notifyPreview();
    selectPanelTab("library");
  }

  function clearImportedTemplate() {
    const library = state.templateLibrary;

    if (!library.importedId) return;

    const confirmed = window.confirm(
      "Kosongkan editor?\nTemplate yang sedang dipakai akan dihapus dari editor."
    );

    if (!confirmed) return;

    ["html", "css", "js", "head"].forEach(kind => {
      setValue(kind, "");
    });

    library.previousSource = null;
    library.importedId = "";
    library.importedName = "";
    state.dirty = true;
    state.sourceDirty = true;
    parseAll();
    notifyPreview();
    state.uiPrepared = false;
    render();
  }

  /* =========================================================
     BALANCED OBJECT
     ========================================================= */

  function extractBalancedObject(source, start) {
    let depth = 0;
    let quote = null;
    let escaped = false;
    let lineComment = false;
    let blockComment = false;

    for (let index = start; index < source.length; index++) {
      const char = source[index];
      const next = source[index + 1];

      if (lineComment) {
        if (char === "\n") lineComment = false;
        continue;
      }

      if (blockComment) {
        if (char === "*" && next === "/") {
          blockComment = false;
          index++;
        }

        continue;
      }

      if (quote) {
        if (escaped) {
          escaped = false;
          continue;
        }

        if (char === "\\") {
          escaped = true;
          continue;
        }

        if (char === quote) {
          quote = null;
        }

        continue;
      }

      if (char === "/" && next === "/") {
        lineComment = true;
        index++;
        continue;
      }

      if (char === "/" && next === "*") {
        blockComment = true;
        index++;
        continue;
      }

      if (char === '"' || char === "'" || char === "`") {
        quote = char;
        continue;
      }

      if (char === "{") {
        depth++;
      } else if (char === "}") {
        depth--;

        if (depth === 0) {
          return {
            start,
            end: index + 1,
            text: source.slice(start, index + 1)
          };
        }
      }
    }

    return null;
  }

  /* =========================================================
     SAFE STATIC OBJECT PARSER
     ========================================================= */

  function parseLooseObjectLiteral(input) {
    let index = 0;

    const fail = message => {
      throw new Error(message + " @" + index);
    };

    function skip() {
      while (index < input.length) {
        const char = input[index];
        const next = input[index + 1];

        if (/\s/.test(char)) {
          index++;
          continue;
        }

        if (char === "/" && next === "/") {
          index += 2;

          while (index < input.length && input[index] !== "\n") {
            index++;
          }

          continue;
        }

        if (char === "/" && next === "*") {
          index += 2;

          while (
            index < input.length &&
            !(input[index] === "*" && input[index + 1] === "/")
          ) {
            index++;
          }

          index += 2;
          continue;
        }

        break;
      }
    }

    function readString() {
      const quote = input[index++];
      let output = "";

      while (index < input.length) {
        const char = input[index++];

        if (char === quote) {
          return output;
        }

        if (char !== "\\") {
          output += char;
          continue;
        }

        const escaped = input[index++];

        const map = {
          n: "\n",
          r: "\r",
          t: "\t",
          "\\": "\\",
          "'": "'",
          '"': '"',
          "`": "`"
        };

        output += Object.prototype.hasOwnProperty.call(map, escaped)
          ? map[escaped]
          : escaped;
      }

      fail("String belum ditutup");
    }

    function readIdentifier() {
      skip();

      const start = index;

      if (!/[A-Za-z_$]/.test(input[index] || "")) {
        fail("Identifier invalid");
      }

      index++;

      while (
        index < input.length &&
        /[A-Za-z0-9_$]/.test(input[index])
      ) {
        index++;
      }

      return input.slice(start, index);
    }

    function readNumber() {
      const match = input
        .slice(index)
        .match(
          /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/
        );

      if (!match) {
        fail("Number invalid");
      }

      index += match[0].length;

      return Number(match[0]);
    }

    function parseArray() {
      const output = [];

      index++;
      skip();

      if (input[index] === "]") {
        index++;
        return output;
      }

      while (index < input.length) {
        output.push(parseValue());

        skip();

        if (input[index] === "]") {
          index++;
          return output;
        }

        if (input[index] !== ",") {
          fail("Koma array hilang");
        }

        index++;
        skip();

        if (input[index] === "]") {
          index++;
          return output;
        }
      }

      fail("Array belum selesai");
    }

    function parseObject() {
      const output = Object.create(null);

      index++;
      skip();

      if (input[index] === "}") {
        index++;
        return output;
      }

      while (index < input.length) {
        skip();

        const key = ['"', "'", "`"].includes(input[index])
          ? readString()
          : readIdentifier();

        skip();

        if (FORBIDDEN_OBJECT_KEYS.has(key)) {
          fail("Object key terlarang: " + key);
        }

        if (Object.prototype.hasOwnProperty.call(output, key)) {
          fail("Duplicate object key: " + key);
        }

        if (input[index] !== ":") {
          fail("Titik dua hilang");
        }

        index++;

        output[key] = parseValue();

        skip();

        if (input[index] === "}") {
          index++;
          return output;
        }

        if (input[index] !== ",") {
          fail("Koma object hilang");
        }

        index++;
        skip();

        if (input[index] === "}") {
          index++;
          return output;
        }
      }

      fail("Object belum selesai");
    }

    function parseValue() {
      skip();

      const char = input[index];

      if (char === "{") return parseObject();
      if (char === "[") return parseArray();

      if (['"', "'", "`"].includes(char)) {
        return readString();
      }

      if (char === "-" || /\d/.test(char || "")) {
        return readNumber();
      }

      const word = readIdentifier();

      if (word === "true") return true;
      if (word === "false") return false;
      if (word === "null") return null;
      if (word === "undefined") fail("undefined tidak diizinkan pada strict object");

      fail("Value non-static: " + word);
    }

    const result = parseValue();

    skip();

    return result;
  }

  function parseAssignedObject(name) {
    const safeName = name.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

    const regex = new RegExp(
      "(?:" +
        "(?:var|let|const)\\s+" +
        safeName +
        "|" +
        "(?:window|globalThis)\\." +
        safeName +
      ")" +
      "\\s*=\\s*\\{"
    );

    const candidates = [];

    function add(editor, kind) {
      if (
        !editor ||
        candidates.some(item => item.editor === editor)
      ) {
        return;
      }

      candidates.push({
        editor,
        kind
      });
    }

    add(state.editors.js, "js");
    add(state.editors.html, "html");
    add(state.editors.head, "head");

    state.allEditors.forEach(editor =>
      add(editor, "unknown")
    );

    for (const candidate of candidates) {
      const source =
        candidate.editor.getValue?.() ||
        "";

      const match = regex.exec(source);

      if (!match) continue;

      const brace = source.indexOf(
        "{",
        match.index
      );

      const block = extractBalancedObject(
        source,
        brace
      );

      if (!block) continue;

      try {
        return {
          kind: candidate.kind,
          editor: candidate.editor,
          obj: parseLooseObjectLiteral(block.text),
          start: block.start,
          end: block.end
        };
      } catch (error) {
        console.error(
          "[SVE] parse " +
            name +
            " gagal",
          error
        );
      }
    }

    return null;
  }

  /* =========================================================
     HTML FALLBACK SCHEMA
     ========================================================= */

  function buildSchemaFromHTML() {
    if (!state.doc) return null;

    const sections = [];

    $$(
      "[data-sve-section]",
      state.doc
    ).forEach((section, sectionIndex) => {
      const fields = [];
      const seen = new Set();

      $$(
        "[data-sve-field]",
        section
      ).forEach(element => {
        const path =
          element.getAttribute(
            "data-sve-field"
          );

        if (!path || seen.has(path)) {
          return;
        }

        seen.add(path);

        fields.push({
          type:
            element.getAttribute(
              "data-sve-type"
            ) || "text",

          label:
            element.getAttribute(
              "data-sve-label"
            ) || prettify(path),

          path
        });
      });

      const countdown =
        section.getAttribute(
          "data-sve-countdown-path"
        );

      if (
        countdown &&
        !seen.has(countdown)
      ) {
        fields.push({
          type: "datetime",
          label: "Waktu Tujuan",
          path: countdown
        });
      }

      sections.push({
        id:
          section.id ||
          "section-" +
            sectionIndex,

        label:
          section.getAttribute(
            "data-sve-section"
          ) ||
          prettify(section.id) ||
          "Section " +
            (sectionIndex + 1),

        visiblePath:
          section.getAttribute(
            "data-sve-visible-path"
          ) ||
          null,

        canHide:
          !!section.getAttribute(
            "data-sve-visible-path"
          ),

        reorderable:
          (
            section.getAttribute(
              "data-section-id"
            ) ||
            section.id ||
            ""
          ) !== "cover",

        locked:
          false,

        fields
      });
    });

    if (!sections.length) {
      return null;
    }

    return {
      template: {
        name: "HTML Schema Fallback"
      },

      sections,

      music: {
        label: "Background Music",
        path: "assets.music"
      }
    };
  }

  function effectiveSchema() {
    if (state.schema) {
      return state.schema;
    }

    if (!state.fallbackSchemaReady) {
      state.fallbackSchemaCache =
        buildSchemaFromHTML();
      state.fallbackSchemaReady = true;
    }

    return state.fallbackSchemaCache;
  }

  function schemaSections() {
    const schema = effectiveSchema();

    return Array.isArray(
      schema?.sections
    )
      ? schema.sections
      : [];
  }

  function sectionId(section) {
    return String(
      section?.id ||
      ""
    ).trim();
  }

  function isSectionReorderable(section) {
    const id = sectionId(section);

    if (!id) return false;

    /*
     * STRICT RULE:
     * Cover selalu pinned di posisi pertama.
     * Future locked sections juga tidak bisa dipindah.
     */
    if (id === "cover") return false;
    if (section?.locked === true) return false;
    if (section?.reorderable === false) return false;

    return true;
  }

  function normalizedSectionOrder() {
    const sections = schemaSections();
    const ids = sections
      .map(sectionId)
      .filter(Boolean);

    if (!ids.length) return [];

    const valid = new Set(ids);

    const configured = Array.isArray(
      state.config?.sectionOrder
    )
      ? state.config.sectionOrder
          .map(value => String(value || "").trim())
          .filter(id => id && valid.has(id))
      : [];

    const result = [];

    /* Cover harus selalu pertama jika tersedia. */
    if (valid.has("cover")) {
      result.push("cover");
    }

    configured.forEach(id => {
      if (
        id !== "cover" &&
        !result.includes(id)
      ) {
        result.push(id);
      }
    });

    ids.forEach(id => {
      if (!result.includes(id)) {
        result.push(id);
      }
    });

    return result;
  }

  function orderedSchemaSections() {
    const sections = schemaSections();
    const byId = new Map(
      sections.map(section => [
        sectionId(section),
        section
      ])
    );

    return normalizedSectionOrder()
      .map(id => byId.get(id))
      .filter(Boolean);
  }


  function canMoveSection(sectionIdValue, direction) {
    const id = String(sectionIdValue || "").trim();

    const section = schemaSections().find(
      item => sectionId(item) === id
    );

    if (!section || !isSectionReorderable(section)) {
      return false;
    }

    const order = normalizedSectionOrder();
    const index = order.indexOf(id);

    if (index < 0) return false;

    let targetIndex = index + direction;

    while (
      targetIndex >= 0 &&
      targetIndex < order.length
    ) {
      const targetId = order[targetIndex];
      const targetSection = schemaSections().find(
        item => sectionId(item) === targetId
      );

      if (
        targetId !== "cover" &&
        !targetSection?.locked
      ) {
        return true;
      }

      targetIndex += direction;
    }

    return false;
  }

  function writeSectionOrder(order) {
    if (!state.config) return false;

    const sections = schemaSections();
    const valid = new Set(
      sections
        .map(sectionId)
        .filter(Boolean)
    );

    const cleaned = [];

    if (valid.has("cover")) {
      cleaned.push("cover");
    }

    (Array.isArray(order) ? order : [])
      .map(value => String(value || "").trim())
      .filter(id => id && valid.has(id) && id !== "cover")
      .forEach(id => {
        if (!cleaned.includes(id)) {
          cleaned.push(id);
        }
      });

    sections
      .map(sectionId)
      .filter(Boolean)
      .forEach(id => {
        if (!cleaned.includes(id)) {
          cleaned.push(id);
        }
      });

    state.config.sectionOrder = cleaned;

    return true;
  }

  function refreshSectionMoveControls(root = document) {
    $$(
      "[data-section-card]",
      root
    ).forEach(card => {
      const id =
        card.dataset.sectionCard;

      const up =
        $(
          "[data-section-up]",
          card
        );

      const down =
        $(
          "[data-section-down]",
          card
        );

      if (up) {
        up.disabled =
          !canMoveSection(
            id,
            -1
          );
      }

      if (down) {
        down.disabled =
          !canMoveSection(
            id,
            1
          );
      }
    });
  }

  function animateSectionCard(
    card,
    direction
  ) {
    if (!card) return;

    card.classList.remove(
      "section-reordered",
      "section-reordered-up",
      "section-reordered-down"
    );

    /*
     * Force animation restart without rebuilding the editor DOM.
     */
    void card.offsetWidth;

    card.classList.add(
      "section-reordered",
      direction === "up"
        ? "section-reordered-up"
        : "section-reordered-down"
    );

    const clear = () => {
      card.classList.remove(
        "section-reordered",
        "section-reordered-up",
        "section-reordered-down"
      );
    };

    card.addEventListener(
      "animationend",
      clear,
      {
        once: true
      }
    );

    setTimeout(
      clear,
      420
    );
  }

  function applySectionOrderToEditorDOM(
    order,
    movedId,
    direction
  ) {
    const body =
      $("#" + ID + "-body");

    if (!body) return;

    const resetZone =
      $(".reset-zone", body);

    const cards =
      new Map(
        $$(
          "[data-section-card]",
          body
        ).map(
          card => [
            card.dataset.sectionCard,
            card
          ]
        )
      );

    order.forEach(id => {
      const card =
        cards.get(id);

      if (!card) return;

      if (resetZone) {
        body.insertBefore(
          card,
          resetZone
        );
      } else {
        body.appendChild(card);
      }
    });

    refreshSectionMoveControls(
      body
    );

    animateSectionCard(
      cards.get(movedId),
      direction
    );
  }

  function moveSection(sectionIdValue, direction) {
    const id = String(sectionIdValue || "").trim();

    const section = schemaSections().find(
      item => sectionId(item) === id
    );

    if (!section || !isSectionReorderable(section)) {
      return;
    }

    const order = normalizedSectionOrder();
    const index = order.indexOf(id);

    if (index < 0) return;

    let targetIndex = index + direction;

    while (
      targetIndex >= 0 &&
      targetIndex < order.length
    ) {
      const targetId = order[targetIndex];
      const targetSection = schemaSections().find(
        item => sectionId(item) === targetId
      );

      if (
        targetId !== "cover" &&
        !targetSection?.locked
      ) {
        break;
      }

      targetIndex += direction;
    }

    if (
      targetIndex < 0 ||
      targetIndex >= order.length ||
      order[targetIndex] === "cover"
    ) {
      return;
    }

    const [moved] = order.splice(index, 1);
    order.splice(targetIndex, 0, moved);

    writeSectionOrder(order);
    commitConfig("Urutan section diperbarui");

    applySectionOrderToEditorDOM(
      order,
      id,
      direction < 0
        ? "up"
        : "down"
    );
  }

  function moveSectionByDrop(
    dragIdValue,
    targetIdValue,
    placementValue
  ) {
    const dragId = String(dragIdValue || "").trim();
    const targetId = String(targetIdValue || "").trim();

    if (
      !dragId ||
      !targetId ||
      dragId === targetId
    ) {
      return;
    }

    const sections = schemaSections();

    const dragSection = sections.find(
      item => sectionId(item) === dragId
    );

    const targetSection = sections.find(
      item => sectionId(item) === targetId
    );

    if (
      !dragSection ||
      !targetSection ||
      !isSectionReorderable(dragSection)
    ) {
      return;
    }

    let placement =
      placementValue === "after"
        ? "after"
        : "before";

    if (targetId === "cover") {
      placement = "after";
    } else if (!isSectionReorderable(targetSection)) {
      return;
    }

    const order = normalizedSectionOrder();
    const from = order.indexOf(dragId);

    if (from < 0) return;

    order.splice(from, 1);

    const freshTargetIndex = order.indexOf(targetId);

    if (freshTargetIndex < 0) return;

    let insertIndex =
      freshTargetIndex +
      (placement === "after" ? 1 : 0);

    if (order[0] === "cover") {
      insertIndex = Math.max(1, insertIndex);
    }

    insertIndex = Math.min(
      order.length,
      insertIndex
    );

    order.splice(
      insertIndex,
      0,
      dragId
    );

    const finalIndex =
      order.indexOf(dragId);

    writeSectionOrder(order);
    commitConfig("Urutan section diperbarui");

    applySectionOrderToEditorDOM(
      order,
      dragId,
      finalIndex < from
        ? "up"
        : "down"
    );
  }

  function resetSectionOrderToSchema() {
    const order = schemaSections()
      .map(sectionId)
      .filter(Boolean);

    writeSectionOrder(order);
    commitConfig("Urutan section direset");

    applySectionOrderToEditorDOM(
      order,
      order.find(
        id =>
          id !== "cover"
      ) || "",
      "up"
    );
  }

  function schemaAudio() {
    const schema =
      effectiveSchema();

    if (schema?.audio) {
      return schema.audio;
    }

    /*
     * Legacy compatibility only:
     * old templates that explicitly define `music`
     * can still be read, but new templates use `audio`.
     */
    if (schema?.music) {
      return schema.music;
    }

    return {
      label: "Audio Undangan",
      path: "assets.audio"
    };
  }

  /* =========================================================
     PARSE ALL + COMMIT CONFIG
     ========================================================= */

  function parseAll() {
    if (!detectEditors()) {
      state.sourceDirty = true;
      return false;
    }

    cleanupLegacyImageDesignCSS();

    state.doc =
      new DOMParser().parseFromString(
        getValue("html"),
        "text/html"
      );

    const templateRoot =
      state.doc.querySelector(
        "[data-sve-template]"
      ) ||
      state.doc.querySelector(
        "main[id]"
      ) ||
      state.doc.body
        .firstElementChild;

    state.rootSelector =
      templateRoot?.id
        ? "#" + templateRoot.id
        : ":root";

    const config =
      parseAssignedObject(
        "CONFIG"
      );

    state.config =
      config?.obj ||
      null;

    state.configRange =
      config ||
      null;

    const schema =
      parseAssignedObject(
        "SVE_SCHEMA"
      );

    state.schema =
      schema?.obj ||
      null;

    /* Source/schema changed: invalidate only derived Content caches. */
    state.contentSearchIndex = null;
    state.contentFieldCache = new WeakMap();
    state.repeaterContentFieldCache = new WeakMap();
    state.fallbackSchemaCache = null;
    state.fallbackSchemaReady = false;
    state.contentSectionHtmlCache.clear();
    state.contentPrewarmCursor = 0;
    if (state.contentPrewarmScheduled) {
      cancelIdle(state.contentPrewarmHandle);
      state.contentPrewarmScheduled = false;
      state.contentPrewarmHandle = null;
    }

    captureDefaults();

    state.sourceDirty = false;
    state.uiPrepared = false;

    return true;
  }

  function commitConfig(message) {
    if (
      !state.config ||
      !state.configRange?.editor
    ) {
      return;
    }

    const commitErrors =
      validateConfigForCommit(
        state.config
      );

    if (commitErrors.length) {
      /*
       * Two-phase rollback: source CodeMirror belum disentuh.
       * Parse ulang source canonical agar mutation invalid tidak
       * tertinggal di state memory.
       */
      parseAll();
      return false;
    }

    const range =
      state.configRange;

    const source =
      range.editor.getValue?.() ||
      "";

    const next =
      source.slice(
        0,
        range.start
      ) +
      JSON.stringify(
        state.config,
        null,
        2
      ) +
      source.slice(
        range.end
      );

    setEditorValue(
      range.editor,
      next
    );

    parseAll();

    notifyPreview();

  }

  /* =========================================================
     CONTENT FAST CONFIG COMMIT — v0.9.5
     - replace only CONFIG object range in CodeMirror
     - no parseAll() on the hot typing path
     - canonical state/range stays synchronized
     - falls back to full commitConfig() on any incompatibility
     ========================================================= */

  function commitConfigFast(message, options = {}) {
    if (!state.config || !state.configRange?.editor) {
      return commitConfig(message);
    }

    if (options.validate !== false) {
      const errors = validateConfigForCommit(state.config);
      if (errors.length) {
        parseAll();
        return false;
      }
    }

    const range = state.configRange;
    const editor = range.editor;
    const serialized = JSON.stringify(state.config, null, 2);

    let fastError = null;

    try {
      state.internalEditorWrite += 1;

      editor.operation(() => {
        if (
          typeof editor.replaceRange === "function" &&
          typeof editor.posFromIndex === "function"
        ) {
          editor.replaceRange(
            serialized,
            editor.posFromIndex(range.start),
            editor.posFromIndex(range.end)
          );
        } else {
          const source = editor.getValue?.() || "";
          const next =
            source.slice(0, range.start) +
            serialized +
            source.slice(range.end);
          editor.setValue(next);
        }

        editor.save?.();
      });

      syncEditorToScalev(editor, false);
    } catch (error) {
      fastError = error;
    } finally {
      state.internalEditorWrite = Math.max(0, state.internalEditorWrite - 1);
    }

    if (fastError) {
      console.warn("[SVE] fast CONFIG commit fallback", fastError);
      const result = commitConfig(message);
      if (result !== false) state.contentStateDirty = false;
      return result;
    }

    range.end = range.start + serialized.length;
    range.obj = state.config;
    state.sourceDirty = false;
    state.contentStateDirty = false;

    markDirty();
    queueContentFingerprintPersist();
    if (options.deferPreview) {
      schedulePreviewRefresh({ syncImages: false });
    } else {
      notifyPreview();
    }

    return true;
  }

  /* =========================================================
     DEFAULT / RESET
     ========================================================= */

  function defaultKey() {
    return (
      "sve77:fresh-default:" +
      location.origin +
      location.pathname
    );
  }

  function sourceFingerprint() {
    const source = [
      "html", getValue("html"),
      "css", getValue("css"),
      "js", getValue("js"),
      "head", getValue("head")
    ].join("\u241e");

    let hash = 2166136261;

    for (let index = 0; index < source.length; index++) {
      hash ^= source.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  function managedDefaultsSnapshot() {
    const cssTokens = {};

    COLOR_FIELDS.forEach(([, , variable]) => {
      const value = cssVarValue(variable);

      if (value) {
        cssTokens[variable] = value;
      }
    });

    STYLE_FIELDS.forEach(field => {
      cssTokens[field.variable] = cssVarValue(field.variable) || field.fallback;
    });

    return {
      version: VERSION,
      config: state.config ? clone(state.config) : null,
      cssTokens,
      googleFonts: clone(getPath(state.config, "editorStyle.googleFonts") || {})
    };
  }

  function readDefaultRecord() {
    try {
      const value = JSON.parse(localStorage.getItem(defaultKey()) || "null");
      return value && typeof value === "object" ? value : null;
    } catch (_) {
      return null;
    }
  }

  function writeDefaultRecord(record) {
    try {
      localStorage.setItem(defaultKey(), JSON.stringify(record));
    } catch (_) {}
  }

  function adoptFreshBaseline() {
    if (!state.config) return false;

    const fingerprint = sourceFingerprint();
    const snapshot = managedDefaultsSnapshot();

    state.defaults = snapshot;
    state.defaultConfig = clone(snapshot.config || state.config);
    state.baselineFingerprint = fingerprint;
    state.lastManagedFingerprint = fingerprint;

    writeDefaultRecord({
      version: VERSION,
      defaults: snapshot,
      baselineFingerprint: fingerprint,
      lastManagedFingerprint: fingerprint
    });

    return true;
  }

  function captureDefaults() {
    if (!state.config) return;

    const fingerprint = sourceFingerprint();
    const record = readDefaultRecord();

    /*
     * Persisted baseline hanya sah bila source saat ini sama dengan
     * fingerprint terakhir yang ditulis oleh Visual Editor. Jika source
     * berbeda, anggap user melakukan fresh import/paste/manual source edit
     * dan jadikan kondisi itu baseline reset terbaru.
     */
    if (
      record?.defaults &&
      record.lastManagedFingerprint === fingerprint
    ) {
      state.defaults = record.defaults;
      state.defaultConfig = clone(record.defaults.config || state.config);
      state.baselineFingerprint = record.baselineFingerprint || fingerprint;
      state.lastManagedFingerprint = fingerprint;
      return;
    }

    adoptFreshBaseline();
  }

  function persistManagedFingerprint() {
    if (!state.defaults) return;

    const fingerprint = sourceFingerprint();
    const record = readDefaultRecord() || {};

    state.lastManagedFingerprint = fingerprint;

    writeDefaultRecord({
      version: VERSION,
      defaults: record.defaults || state.defaults,
      baselineFingerprint: record.baselineFingerprint || state.baselineFingerprint || fingerprint,
      lastManagedFingerprint: fingerprint
    });
  }

  const queueManagedFingerprintPersist = debounce(
    persistManagedFingerprint,
    80
  );

  /* Typing path may commit several times; full-source fingerprinting is background work. */
  const queueContentFingerprintPersist = debounce(
    persistManagedFingerprint,
    700
  );

  function scheduleFreshBaselineFromExternalChange() {
    clearTimeout(state.freshBaselineTimer);

    state.freshBaselineTimer = setTimeout(() => {
      if (state.internalEditorWrite) return;

      try {
        parseAll();
        adoptFreshBaseline();
        if (state.open) {
          render();
        } else {
          scheduleVisualEditorPrewarm();
        }
      } catch (_) {}
    }, 420);
  }

  function bindFreshSourceDetection() {
    state.allEditors.forEach(editor => {
      if (!editor || state.editorChangeBound.has(editor) || typeof editor.on !== "function") {
        return;
      }

      state.editorChangeBound.add(editor);

      editor.on("change", () => {
        if (state.internalEditorWrite) return;
        state.sourceDirty = true;
        state.uiPrepared = false;
        scheduleFreshBaselineFromExternalChange();
      });
    });
  }

  function resetConfigPath(path) {
    if (!state.defaultConfig) return;

    setPath(
      state.config,
      path,
      clone(
        getPath(
          state.defaultConfig,
          path
        )
      )
    );

    commitConfig(
      "Berhasil direset"
    );

    render();
  }

  function resetAll() {
    if (
      !state.defaults ||
      !confirm("Reset pengaturan?")
    ) {
      return;
    }

    if (state.defaults.config) {
      state.config = clone(state.defaults.config);
      commitConfig();
    }

    Object.entries(state.defaults.cssTokens || {}).forEach(([variable, value]) => {
      if (value) setCssVar(variable, value);
    });

    const fonts = state.defaults.googleFonts || {};
    if (state.config && getPath(state.config, "editorStyle.googleFonts") !== undefined) {
      setPath(state.config, "editorStyle.googleFonts", clone(fonts));
      commitConfig();
      updateGoogleFontsHead();
    }

    state.dirty = false;
    parseAll();
    render();
    notifyPreview();
  }

  /* =========================================================
     PREVIEW
     ========================================================= */

  function schedulePreviewRefresh({ syncImages = false, delay = 160 } = {}) {
    state.previewRefreshImages ||= syncImages;

    if (state.previewRefreshTimer) return;

    state.previewRefreshTimer = window.setTimeout(() => {
      const shouldSyncImages = state.previewRefreshImages;
      state.previewRefreshTimer = null;
      state.previewRefreshImages = false;
      notifyPreview({ syncImages: shouldSyncImages });
    }, delay);
  }

  function notifyPreview({ syncImages = true, force = false } = {}) {
    if (SVE_LITE_MODE && !force) return;

    try {
      window
        .SVE_REFRESH
        ?.();
    } catch (_) {}

    $$("iframe").forEach(
      iframe => {
        try {
          iframe
            .contentWindow
            ?.SVE_REFRESH
            ?.();
        } catch (_) {}
      }
    );

    if (syncImages) {
      syncImageDesignPreview();

      requestAnimationFrame(
        syncImageDesignPreview
      );
    }
  }

  /* =========================================================
     DATETIME
     ========================================================= */

  function toDatetimeLocal(value) {
    if (!value) return "";

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "";
    }

    const pad =
      number =>
        String(number)
          .padStart(
            2,
            "0"
          );

    return (
      date.getFullYear() +
      "-" +
      pad(
        date.getMonth() + 1
      ) +
      "-" +
      pad(
        date.getDate()
      ) +
      "T" +
      pad(
        date.getHours()
      ) +
      ":" +
      pad(
        date.getMinutes()
      )
    );
  }

  function localDateTimeToOffset(value) {
    if (!value) return "";

    const date =
      new Date(value);

    const pad =
      number =>
        String(number)
          .padStart(
            2,
            "0"
          );

    const offset =
      -date.getTimezoneOffset();

    const sign =
      offset >= 0
        ? "+"
        : "-";

    return (
      value +
      ":00" +
      sign +
      pad(
        Math.floor(
          Math.abs(offset) /
            60
        )
      ) +
      ":" +
      pad(
        Math.abs(offset) %
          60
      )
    );
  }

  /* =========================================================
     CSS VAR
     ========================================================= */

  function cssVarValue(
    variable,
    override
  ) {
    const sources =
      override
        ? [override]
        : [
            compatibilityCssSource()
          ];

    const safe =
      variable.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

    const regex =
      new RegExp(
        safe +
          "\\s*:\\s*" +
          "([^;{}]+);"
      );

    for (const source of sources) {
      const match =
        regex.exec(
          source ||
          ""
        );

      if (match) {
        return match[1].trim();
      }
    }

    return "";
  }

  function sourceHasCssVar(
    source,
    variable
  ) {
    const safe =
      variable.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

    return new RegExp(
      safe +
      "\\s*:\\s*" +
      "[^;{}]+;"
    ).test(
      source ||
      ""
    );
  }


  function compatibilityCssSource() {
    const chunks = [];
    const rawCss = getValue("css");
    if (rawCss) chunks.push(rawCss);

    [getValue("html"), getValue("head")].forEach(source => {
      const input = String(source || "");
      const stylePattern = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
      let match;

      while ((match = stylePattern.exec(input))) {
        if (match[1]) chunks.push(match[1]);
      }
    });

    return chunks.join("\n");
  }

  function replaceCssVarInSource(
    source,
    variable,
    value
  ) {
    const safe =
      variable.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

    const regex =
      new RegExp(
        "(" +
        safe +
        "\\s*:\\s*)" +
        "([^;{}]+)" +
        "(;)",
        "g"
      );

    return String(
      source ||
      ""
    ).replace(
      regex,
      "$1" +
      value +
      "$3"
    );
  }

  function applyCssVarToPreview(
    variable,
    value
  ) {
    /*
     * Realtime bridge.
     * Persistensi tetap melalui CodeMirror Scalev.
     * Bridge ini membuat preview langsung berubah walaupun
     * Scalev belum rebuild iframe pada frame yang sama.
     */
    const applyToDocument =
      doc => {
        if (!doc) return;

        try {
          doc.documentElement
            ?.style
            ?.setProperty(
              variable,
              value
            );

          doc.body
            ?.style
            ?.setProperty(
              variable,
              value
            );

          doc
            .querySelector(
              "[data-sve-template]"
            )
            ?.style
            ?.setProperty(
              variable,
              value
            );
        } catch (_) {}
      };

    /*
     * Jangan menulis variable ke UI Visual Editor sendiri.
     * Hanya preview iframe / nested preview documents.
     */
    $$("iframe").forEach(
      iframe => {
        try {
          applyToDocument(
            iframe.contentDocument
          );
        } catch (_) {}
      }
    );
  }

  function setCssVar(
    variable,
    value
  ) {
    const sources = [
      "css",
      "head",
      "html"
    ];

    let owner =
      null;

    for (
      const kind
      of sources
    ) {
      if (
        sourceHasCssVar(
          getValue(kind),
          variable
        )
      ) {
        owner =
          kind;

        break;
      }
    }

    /*
     * STRICT RULE:
     * Visual Editor tidak membuat block token baru.
     * Template wajib sudah membawa semua token warna.
     */
    if (!owner) {
      return false;
    }

    const source =
      getValue(owner);

    const next =
      replaceCssVarInSource(
        source,
        variable,
        value
      );

    if (next === source) {
      return false;
    }

    setValue(
      owner,
      next
    );

    applyCssVarToPreview(
      variable,
      value
    );

    notifyPreview();

    return true;
  }

  function defaultCssVar(variable) {
    return String(
      state.defaults?.cssTokens?.[variable] ||
      ""
    ).trim();
  }

  /* =========================================================
     SIMPLE CONTENT FIELDS
     ========================================================= */

  function canonicalFieldType(
    field
  ) {
    const raw =
      String(
        field?.type ||
        "text"
      )
        .trim()
        .toLowerCase();

    if (
      raw ===
      "datetime-local"
    ) {
      return "datetime";
    }

    if (
      raw ===
      "checkbox"
    ) {
      return "boolean";
    }

    return raw;
  }

  function fieldIsReadOnly(
    field,
    path
  ) {
    return (
      field?.readOnly === true ||
      field?.readonly === true ||
      field?.locked === true ||
      isWeddingIdField(
        field,
        path
      )
    );
  }

  function fieldDefaultValue(
    field
  ) {
    if (
      field &&
      Object.prototype
        .hasOwnProperty
        .call(
          field,
          "default"
        )
    ) {
      return clone(
        field.default
      );
    }

    const type =
      canonicalFieldType(
        field
      );

    if (
      type ===
      "boolean"
    ) {
      return false;
    }

    if (
      type ===
      "number"
    ) {
      return "";
    }

    return "";
  }

  function fieldOptions(
    field
  ) {
    const options =
      Array.isArray(
        field?.options
      )
        ? field.options
        : [];

    return options
      .map(option => {
        if (
          option &&
          typeof option ===
            "object" &&
          !Array.isArray(option)
        ) {
          const value =
            option.value ??
            option.id ??
            option.key ??
            "";

          return {
            value:
              String(value),

            label:
              String(
                option.label ??
                option.name ??
                value
              )
          };
        }

        return {
          value:
            String(
              option ?? ""
            ),

          label:
            String(
              option ?? ""
            )
        };
      });
  }

  function htmlInputConstraintAttributes(
    field
  ) {
    const attrs = [];

    [
      "min",
      "max",
      "step",
      "maxlength",
      "minlength",
      "pattern"
    ].forEach(key => {
      if (
        field?.[key] !==
          undefined &&
        field?.[key] !==
          null &&
        String(
          field[key]
        ) !==
          ""
      ) {
        attrs.push(
          `${key}="${esc(
            field[key]
          )}"`
        );
      }
    });

    if (
      field?.placeholder
    ) {
      attrs.push(
        `placeholder="${esc(
          field.placeholder
        )}"`
      );
    }

    return attrs.join(
      " "
    );
  }

  function fieldHelpHTML(
    field
  ) {
    const help =
      String(
        field?.help ||
        field?.description ||
        ""
      ).trim();

    return help
      ? `
        <small class="field-help">
          ${esc(help)}
        </small>
      `
      : "";
  }

  function fieldInput(
    field,
    path
  ) {
    const value =
      getPath(
        state.config,
        path
      );

    const type =
      canonicalFieldType(
        field
      );

    const autoWeddingId =
      isWeddingIdField(
        field,
        path
      );

    const readOnly =
      fieldIsReadOnly(
        field,
        path
      );

    const displayValue =
      autoWeddingId
        ? (
            readScalevSlug() ||
            value ||
            ""
          )
        : (
            value ??
            ""
          );

    const attributes =
      `data-field-path="${esc(path)}" ` +
      `data-field-type="${esc(type)}" ` +
      `aria-label="${esc(field?.label || path)}" ` +
      (
        readOnly
          ? 'data-field-readonly="1" '
          : ""
      );

    const constraints =
      htmlInputConstraintAttributes(
        field
      );

    if (
      type ===
      "textarea"
    ) {
      return `
        <textarea
          class="content-control content-control-textarea"
          ${attributes}
          ${constraints}
          ${
            readOnly
              ? "readonly aria-readonly=\"true\""
              : ""
          }
        >${esc(displayValue)}</textarea>
        ${
          autoWeddingId
            ? `
              <small class="auto-wedding-id-note">
                Terkunci · otomatis mengikuti Pengaturan → Slug URL
              </small>
            `
            : ""
        }
      `;
    }

    if (
      type ===
      "select"
    ) {
      const options =
        fieldOptions(
          field
        );

      return `
        <select
          class="content-control content-control-select"
          ${attributes}
          ${
            readOnly
              ? "disabled aria-disabled=\"true\""
              : ""
          }
        >
          ${
            field?.placeholder
              ? `
                <option
                  value=""
                  ${
                    String(
                      displayValue ??
                      ""
                    ) === ""
                      ? "selected"
                      : ""
                  }
                >
                  ${esc(field.placeholder)}
                </option>
              `
              : ""
          }

          ${options
            .map(option => `
              <option
                value="${esc(
                  option.value
                )}"
                ${
                  String(
                    displayValue ??
                    ""
                  ) ===
                  option.value
                    ? "selected"
                    : ""
                }
              >
                ${esc(
                  option.label
                )}
              </option>
            `)
            .join("")
          }
        </select>
      `;
    }

    if (
      type ===
      "boolean"
    ) {
      return `
        <label class="boolean-field">
          <input
            type="checkbox"
            ${attributes}
            ${
              displayValue === true
                ? "checked"
                : ""
            }
            ${
              readOnly
                ? "disabled aria-disabled=\"true\""
                : ""
            }
          >

          <span>
            ${
              esc(
                field?.trueLabel ||
                field?.toggleLabel ||
                "Aktif"
              )
            }
          </span>
        </label>
      `;
    }

    if (
      type ===
      "datetime"
    ) {
      return `
        <input
          class="content-control content-control-datetime"
          type="datetime-local"
          ${attributes}
          ${constraints}
          value="${esc(
            toDatetimeLocal(
              displayValue
            )
          )}"
          ${
            readOnly
              ? "readonly aria-readonly=\"true\""
              : ""
          }
        >
      `;
    }

    if (type === "url") {
      return `
        <div class="content-url-shell">
          <span class="content-url-badge" aria-hidden="true">LINK</span>
          <input
            class="content-control content-control-url"
            type="url"
            ${attributes}
            ${constraints}
            value="${esc(displayValue)}"
            ${
              readOnly
                ? "readonly aria-readonly=\"true\""
                : ""
            }
          >
        </div>
      `;
    }

    const nativeType =
      (
        [
          "email",
          "tel",
          "number",
          "date",
          "time",
          "color"
        ].includes(type)
      )
        ? type
        : "text";

    return `
      <input
        class="content-control content-control-${nativeType}"
        type="${nativeType}"
        ${attributes}
        ${constraints}
        ${
          autoWeddingId
            ? 'data-auto-wedding-id="1"'
            : ""
        }
        value="${esc(displayValue)}"
        ${
          readOnly
            ? "readonly aria-readonly=\"true\""
            : ""
        }
      >
      ${
        autoWeddingId
          ? `
            <small class="auto-wedding-id-note">
              Terkunci · otomatis mengikuti Pengaturan → Slug URL
            </small>
          `
          : ""
      }
    `;
  }

  function simpleField(
    field,
    pathOverride
  ) {
    const path =
      pathOverride ||
      field.path;

    const label =
      esc(
        field.label ||
        path
      );

    return `
      <div class="field">
        ${
          field.hideVisibleLabel
            ? `<span class="content-field-label-sr">${label}</span>`
            : `<label>${label}</label>`
        }

        ${fieldInput(
          field,
          path
        )}

        ${fieldHelpHTML(
          field
        )}
      </div>
    `;
  }

  function isImageFieldDefinition(
    field
  ) {
    if (!field) {
      return false;
    }

    if (
      field.type === "image" ||
      field.type === "repeater-image" ||
      field.media === "image" ||
      field.kind === "image"
    ) {
      return true;
    }

    /*
     * Backward compatibility:
     * older SVE_SCHEMA examples sometimes declared image URL
     * fields as type:"text", e.g. stories[].image.
     * Detect only clear image semantics so ordinary URL/text
     * fields (Maps, YouTube, Live URL, etc.) stay in Konten.
     */
    const rawKey =
      String(
        field.key ||
        (
          field.path
            ? field.path
                .split(".")
                .pop()
            : ""
        )
      )
        .trim()
        .toLowerCase();

    const imageKeys =
      new Set([
        "image",
        "img",
        "photo",
        "foto",
        "picture",
        "gambar",
        "art",
        "avatar",
        "logo",
        "thumbnail",
        "thumb",
        "poster",
        "coverphoto",
        "covercard",
        "qr",
        "qris",
        "src"
      ]);

    if (
      imageKeys.has(
        rawKey
      )
    ) {
      return true;
    }

    const label =
      String(
        field.label ||
        ""
      )
        .trim()
        .toLowerCase();

    return (
      /(?:^|\s)(?:foto|photo|image|gambar|logo|thumbnail|poster|qr|qris|ilustrasi)(?:\s|$)/i
        .test(label)
    );
  }

  function repeaterContentFields(
    field
  ) {
    if (!field || typeof field !== "object") {
      return [];
    }

    const cached =
      state.repeaterContentFieldCache.get(
        field
      );

    if (cached) {
      return cached;
    }

    const fields = (
      field?.fields ||
      []
    ).filter(
      subField =>
        !isImageFieldDefinition(
          subField
        ) &&
        canonicalFieldType(
          subField
        ) !==
          "repeater" &&
        canonicalFieldType(
          subField
        ) !==
          "repeater-image"
    );

    state.repeaterContentFieldCache.set(
      field,
      fields
    );

    return fields;
  }

  /* =========================================================
     REPEATER
     ========================================================= */

  function repeaterDefault(field) {
    const item = {};

    (
      field.fields ||
      []
    ).forEach(
      subField => {
        if (
          !subField?.key
        ) {
          return;
        }

        item[
          subField.key
        ] =
          fieldDefaultValue(
            subField
          );
      }
    );

    return item;
  }

  function repeaterItemTitle(
    field,
    item,
    index
  ) {
    const preferredKey =
      String(
        field?.itemLabelKey ||
        ""
      ).trim();

    const candidates = [
      preferredKey
        ? item?.[
            preferredKey
          ]
        : "",
      item?.title,
      item?.name,
      item?.label,
      item?.event,
      item?.provider
    ];

    const found =
      candidates.find(
        value =>
          String(
            value ?? ""
          ).trim()
      );

    return (
      String(
        found ?? ""
      ).trim() ||
      (
        field.label ||
        "Item"
      ) +
      " " +
      (
        index + 1
      )
    );
  }

  function repeaterNestedWarning(
    field
  ) {
    const nested =
      (
        field?.fields ||
        []
      ).some(
        subField =>
          canonicalFieldType(
            subField
          ) ===
            "repeater" ||
          canonicalFieldType(
            subField
          ) ===
            "repeater-image"
      );

    if (!nested) {
      return "";
    }

    return `
      <div class="notice repeater-warning">
        Nested repeater tidak didukung.
        Flat-kan data menjadi repeater satu level.
      </div>
    `;
  }

  function renderRepeater(field) {
    const array =
      getPath(
        state.config,
        field.path
      );

    const items =
      Array.isArray(array)
        ? array
        : [];

    const max =
      Number.isFinite(
        field.max
      )
        ? field.max
        : 999;

    return (
      repeaterNestedWarning(
        field
      )

      +

      items
        .map((item, index) => `
          <div class="repeat-item">
            <div class="repeat-head">
              <strong>
                ${esc(
                  repeaterItemTitle(
                    field,
                    item,
                    index
                  )
                )}
              </strong>

              ${
                field.canDelete !== false
                  ? `
                    <button
                      type="button"
                      data-repeat-delete="${esc(
                        field.path
                      )}"
                      data-repeat-index="${index}"
                    >
                      Hapus
                    </button>
                  `
                  : ""
              }
            </div>

            ${
              repeaterContentFields(
                field
              )
                .map(
                  subField =>
                    simpleField(
                      {
                        ...subField,
                        type:
                          subField.type ||
                          "text"
                      },
                      field.path +
                        "." +
                        index +
                        "." +
                        subField.key
                    )
                )
                .join("")
            }
          </div>
        `)
        .join("")

      +

      (
        field.canAdd !== false &&
        items.length < max
          ? `
            <button
              type="button"
              class="button full"
              data-repeat-add="${esc(
                field.path
              )}"
            >
              + Tambah
              ${esc(
                field.label ||
                "Item"
              )}
            </button>
          `
          : ""
      )
    );
  }

  /* =========================================================
     DEBUG
     ========================================================= */

  function debugHTML() {
    return `
      <div class="notice sve-empty-template" role="status">
        <strong>Belum ada template</strong>
        <span>Import template dulu</span>
      </div>
    `;
  }

  function templateIssueHTML() {
    return `
      <div class="notice sve-empty-template" role="status">
        <strong>Template belum siap</strong>
        <span>Cek menu Status</span>
      </div>
    `;
  }

  /* =========================================================
     CONTENT TAB
     ========================================================= */

  function contentFieldsForSection(section) {
    if (!section || typeof section !== "object") {
      return [];
    }

    const cached =
      state.contentFieldCache.get(
        section
      );

    if (cached) {
      return cached;
    }

    const fields =
      (
        section.fields ||
        []
      ).filter(
        field => {
          if (
            isImageFieldDefinition(
              field
            )
          ) {
            return false;
          }

          if (
            field.type ===
              "repeater" &&
            repeaterContentFields(
              field
            ).length === 0
          ) {
            return false;
          }

          return true;
        }
      );

    state.contentFieldCache.set(
      section,
      fields
    );

    return fields;
  }

  function contentSearchIndex() {
    if (state.contentSearchIndex) {
      return state.contentSearchIndex;
    }

    const index = new Map();

    orderedSchemaSections()
      .forEach(section => {
        const id = sectionId(section);

        let searchable = "";

        try {
          searchable =
            JSON.stringify(section)
              .toLowerCase();
        } catch (_) {
          searchable = [
            id,
            section?.label || "",
            ...contentFieldsForSection(section)
              .flatMap(field => [
                field?.label || "",
                field?.path || "",
                ...(field?.fields || [])
                  .flatMap(subField => [
                    subField?.label || "",
                    subField?.key || ""
                  ])
              ])
          ]
            .join(" ")
            .toLowerCase();
        }

        index.set(id, searchable);
      });

    state.contentSearchIndex = index;
    return index;
  }

  function invalidateContentSectionCache(id) {
    if (!id) return;
    state.contentSectionHtmlCache.delete(String(id));
  }

  function renderContentSectionBodyCached(section) {
    const id = sectionId(section);
    if (!id) return renderContentSectionBody(section);

    if (state.contentSectionHtmlCache.has(id)) {
      return state.contentSectionHtmlCache.get(id);
    }

    const html = renderContentSectionBody(section);
    state.contentSectionHtmlCache.set(id, html);
    return html;
  }

  function touchContentSection(card) {
    if (!card) return;
    state.contentSectionUseTick += 1;
    card.dataset.contentUse = String(state.contentSectionUseTick);
  }

  function pruneClosedContentSections(root) {
    if (!root) return;

    const loaded = $$('[data-section-card]', root)
      .filter(card => $("[data-section-body]", card)?.dataset.loaded === "1");

    const overflow = loaded.length - state.contentMaxMountedSections;
    if (overflow <= 0) return;

    loaded
      .filter(card => !card.classList.contains('open'))
      .sort((a, b) =>
        Number(a.dataset.contentUse || 0) -
        Number(b.dataset.contentUse || 0)
      )
      .slice(0, overflow)
      .forEach(card => {
        const body = $("[data-section-body]", card);
        if (!body) return;
        body.replaceChildren();
        body.dataset.loaded = "0";
      });
  }

  function scheduleContentSectionPrewarm() {
    if (
      state.contentPrewarmScheduled ||
      !state.config ||
      !effectiveSchema()
    ) {
      return;
    }

    const sections = orderedSchemaSections();
    if (!sections.length) return;

    state.contentPrewarmScheduled = true;

    const warm = deadline => {
      state.contentPrewarmScheduled = false;
      state.contentPrewarmHandle = null;

      let budget = 2;
      while (state.contentPrewarmCursor < sections.length && budget > 0) {
        const section = sections[state.contentPrewarmCursor++];
        const id = sectionId(section);

        if (id && !state.contentSectionHtmlCache.has(id)) {
          renderContentSectionBodyCached(section);
        }

        budget -= 1;

        if (
          deadline &&
          !deadline.didTimeout &&
          typeof deadline.timeRemaining === "function" &&
          deadline.timeRemaining() < 5
        ) {
          break;
        }
      }

      if (state.contentPrewarmCursor < sections.length) {
        state.contentPrewarmScheduled = true;
        state.contentPrewarmHandle = runWhenIdle(warm, 1200);
      }
    };

    state.contentPrewarmHandle = runWhenIdle(warm, 1200);
  }

  function renderContentSectionBody(section) {
    const fields =
      contentFieldsForSection(
        section
      );

    return fields
      .map(field => {
        if (
          field.type ===
          "repeater"
        ) {
          return `
            <div class="group">
              <div class="group-title">
                ${esc(
                  field.label ||
                  "Daftar"
                )}
              </div>

              <div class="group-body">
                ${renderRepeater(field)}
              </div>
            </div>
          `;
        }

        return `
          <div class="group">
            <div class="group-title">
              ${esc(
                field.label ||
                field.path
              )}
            </div>

            <div class="group-body">
              ${simpleField({
                ...field,
                hideVisibleLabel: true
              })}
            </div>
          </div>
        `;
      })
      .join("");
  }

  function contentSectionById(id) {
    return orderedSchemaSections()
      .find(
        section =>
          sectionId(section) === id
      ) || null;
  }

  function ensureContentSectionLoaded(card) {
    if (!card) return;

    const body =
      $(
        "[data-section-body]",
        card
      );

    if (
      !body ||
      body.dataset.loaded === "1"
    ) {
      return;
    }

    const section =
      contentSectionById(
        card.dataset.sectionCard
      );

    if (!section) return;

    body.innerHTML =
      renderContentSectionBodyCached(
        section
      );

    body.dataset.loaded = "1";
    touchContentSection(card);
    pruneClosedContentSections(
      card.closest("#" + ID + "-body")
    );
  }

  function refreshContentSectionBody(card) {
    if (!card) return;

    const body =
      $(
        "[data-section-body]",
        card
      );

    const section =
      contentSectionById(
        card.dataset.sectionCard
      );

    if (!body || !section) return;

    invalidateContentSectionCache(
      card.dataset.sectionCard
    );

    body.innerHTML =
      renderContentSectionBodyCached(
        section
      );

    body.dataset.loaded = "1";
    touchContentSection(card);
  }

  function queueContentCommit(message = "") {
    state.contentStateDirty = true;

    if (message) {
      state.contentCommitMessage = message;
    }

    clearTimeout(
      state.contentCommitTimer
    );

    state.contentCommitTimer =
      setTimeout(() => {
        state.contentCommitTimer = null;

        const nextMessage =
          state.contentCommitMessage;

        state.contentCommitMessage = "";

        commitConfigFast(
          nextMessage || undefined,
          {
            validate: false,
            deferPreview: true
          }
        );
      }, 140);
  }

  function flushContentCommit(message = "") {
    const hadPending =
      !!state.contentCommitTimer ||
      !!state.contentCommitMessage ||
      state.contentStateDirty;

    clearTimeout(
      state.contentCommitTimer
    );

    state.contentCommitTimer = null;

    const nextMessage =
      message ||
      state.contentCommitMessage;

    state.contentCommitMessage = "";

    if (!hadPending && !message) {
      return true;
    }

    return commitConfigFast(
      nextMessage || undefined,
      {
        validate: true,
        deferPreview: true
      }
    );
  }

  function renderContent() {
    if (!state.config) {
      return debugHTML();
    }

    if (!effectiveSchema()) {
      return templateIssueHTML();
    }

    const allSections =
      orderedSchemaSections();

    const index =
      contentSearchIndex();

    const sections =
      allSections.filter(
        section => {
          if (!state.search) {
            return true;
          }

          return (
            index.get(
              sectionId(section)
            ) || ""
          ).includes(
            state.search
          );
        }
      );

    return `
      ${sections
        .map(section => {
          const id =
            sectionId(section);

          const label =
            section.label ||
            id;

          const reorderable =
            isSectionReorderable(
              section
            );

          const visible =
            !section.visiblePath ||
            getPath(
              state.config,
              section.visiblePath
            ) !== false;

          const fields =
            contentFieldsForSection(
              section
            );

          const isOpen =
            !state.search &&
            state.contentOpenSections
              .has(id);

          return `
            <article
              class="section ${
                reorderable
                  ? "section-sortable"
                  : "section-pinned"
              }${isOpen ? " open" : ""}"
              data-section-card="${esc(id)}"
            >
              <div
                class="section-head"
                title="${
                  reorderable
                    ? "Drag untuk mengurutkan section"
                    : "Section terkunci"
                }"
              >
                <div
                  class="section-move-controls"
                  aria-label="Atur urutan ${esc(label)}"
                >
                  <button
                    type="button"
                    class="section-drag-btn"
                    data-section-drag="${esc(id)}"
                    draggable="${
                      reorderable
                        ? "true"
                        : "false"
                    }"
                    ${
                      reorderable
                        ? ""
                        : "disabled"
                    }
                    aria-label="Drag ${esc(label)}"
                    title="${
                      reorderable
                        ? "Drag untuk mengurutkan"
                        : "Section terkunci"
                    }"
                  >
                    ${scalevDragIcon()}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-up"
                    data-section-up="${esc(id)}"
                    ${
                      canMoveSection(
                        id,
                        -1
                      )
                        ? ""
                        : "disabled"
                    }
                    aria-label="Naikkan ${esc(label)}"
                    title="Naik"
                  >
                    ${scalevMoveArrowIcon("up")}
                  </button>

                  <button
                    type="button"
                    class="section-move-btn section-move-down"
                    data-section-down="${esc(id)}"
                    ${
                      canMoveSection(
                        id,
                        1
                      )
                        ? ""
                        : "disabled"
                    }
                    aria-label="Turunkan ${esc(label)}"
                    title="Turun"
                  >
                    ${scalevMoveArrowIcon("down")}
                  </button>
                </div>

                <div class="section-title">
                  <strong>
                    ${esc(label)}
                  </strong>

                  <small>
                    ${
                      reorderable
                        ? "Drag / ↑↓ · "
                        : "Pinned · "
                    }
                    ${fields.length}
                    pengaturan
                  </small>
                </div>

                <div class="section-actions">
                  ${
                    section.canHide &&
                    section.visiblePath
                      ? `
                        <label class="switch-wrap">
                          <input
                            type="checkbox"
                            data-visible-path="${esc(
                              section.visiblePath
                            )}"
                            ${
                              visible
                                ? "checked"
                                : ""
                            }
                          >
                          <span class="switch"></span>
                        </label>
                      `
                      : ""
                  }
                </div>

                <button
                  type="button"
                  class="chev"
                  aria-label="Buka pengaturan ${esc(label)}"
                >
                  ${scalevChevronIcon("section-chevron")}
                </button>
              </div>

              <div
                class="section-body"
                data-section-body="${esc(id)}"
                data-loaded="${isOpen ? "1" : "0"}"
              >
                ${
                  isOpen
                    ? renderContentSectionBodyCached(section)
                    : ""
                }
              </div>
            </article>
          `;
        })
        .join("")
      }

      <div class="reset-zone">
        <button
          type="button"
          class="button danger full"
          id="${ID}-reset-all"
        >
          Reset ke Default
        </button>
      </div>
    `;
  }

  /* =========================================================
     IMAGE DISCOVERY
     ========================================================= */

  function repeaterImageFields() {
    return schemaSections()
      .flatMap(
        section =>
          section.fields ||
          []
      )
      .filter(
        field =>
          canonicalFieldType(
            field
          ) ===
            "repeater-image" &&
          field?.path
      );
  }

  /*
   * Nama helper ini dipertahankan agar internal UI lama tetap stabil.
   * Isinya sekarang 100% schema-first: tidak mengasumsikan root "gallery".
   */
  function galleryField() {
    return (
      repeaterImageFields()[0] ||
      null
    );
  }

  function repeaterImageFieldByRootPath(
    rootPath
  ) {
    const normalized =
      String(
        rootPath ||
        ""
      ).trim();

    if (!normalized) {
      return null;
    }

    return (
      repeaterImageFields()
        .find(
          field =>
            String(
              field.path ||
              ""
            ).trim() ===
              normalized
        ) ||
      null
    );
  }

  function repeaterImageSubField(
    field
  ) {
    const fields =
      Array.isArray(
        field?.fields
      )
        ? field.fields
        : [];

    return (
      fields.find(
        subField =>
          subField?.key &&
          isImageFieldDefinition(
            subField
          )
      ) ||
      fields.find(
        subField =>
          subField?.key &&
          String(
            subField.key
          ).toLowerCase() ===
            "src"
      ) ||
      {
        key: "src",
        label: "Foto",
        type: "image"
      }
    );
  }

  function repeaterImageMetaForPath(
    path
  ) {
    const normalizedPath =
      String(
        path ||
        ""
      ).trim();

    if (!normalizedPath) {
      return null;
    }

    for (
      const field of
      repeaterImageFields()
    ) {
      const rootPath =
        String(
          field.path ||
          ""
        ).trim();

      const prefix =
        rootPath + ".";

      if (
        !rootPath ||
        !normalizedPath
          .startsWith(prefix)
      ) {
        continue;
      }

      const rest =
        normalizedPath
          .slice(
            prefix.length
          )
          .split(".");

      if (
        rest.length !== 2
      ) {
        continue;
      }

      const index =
        Number(
          rest[0]
        );

      if (
        !Number.isInteger(
          index
        ) ||
        index < 0
      ) {
        continue;
      }

      const imageField =
        repeaterImageSubField(
          field
        );

      const imageKey =
        String(
          imageField?.key ||
          "src"
        );

      if (
        rest[1] !==
        imageKey
      ) {
        continue;
      }

      return {
        field,
        imageField,
        imageKey,
        rootPath,
        index
      };
    }

    return null;
  }

  function htmlImageIsWrapped(path) {
    if (!state.doc) return false;

    const image =
      $$(
        '[data-sve-type="image"][data-sve-field]',
        state.doc
      ).find(
        node =>
          node.getAttribute(
            "data-sve-field"
          ) === path
      );

    return !!image?.closest(
      "[data-sve-image-wrapper]"
    );
  }

  function collectImageFields() {
    const result = [];
    const seen = new Set();

    schemaSections().forEach(
      section => {
        (
          section.fields ||
          []
        ).forEach(
          field => {
            if (
              isImageFieldDefinition(
                field
              ) &&
              field.type !==
                "repeater-image" &&
              field.path &&
              !seen.has(
                field.path
              )
            ) {
              result.push({
                label:
                  field.label ||
                  prettify(
                    field.path
                  ),

                path:
                  field.path,

                gallery:
                  false,

                wrapped:
                  htmlImageIsWrapped(
                    field.path
                  )
              });

              seen.add(
                field.path
              );
            }

            if (
              field.type ===
                "repeater" &&
              field.path
            ) {
              const array =
                getPath(
                  state.config,
                  field.path
                );

              const imageSubFields =
                (
                  field.fields ||
                  []
                ).filter(
                  subField =>
                    isImageFieldDefinition(
                      subField
                    ) &&
                    subField.key
                );

              if (
                Array.isArray(
                  array
                ) &&
                imageSubFields.length
              ) {
                array.forEach(
                  (
                    item,
                    index
                  ) => {
                    imageSubFields
                      .forEach(
                        subField => {
                          const path =
                            field.path +
                            "." +
                            index +
                            "." +
                            subField.key;

                          if (
                            seen.has(path)
                          ) {
                            return;
                          }

                          result.push({
                            label:
                              (
                                section.label ||
                                field.label ||
                                prettify(
                                  field.path
                                )
                              ) +
                              " " +
                              (
                                index + 1
                              ) +
                              " · " +
                              (
                                subField.label ||
                                prettify(
                                  subField.key
                                )
                              ),

                            path,

                            gallery:
                              false,

                            wrapped:
                              htmlImageIsWrapped(
                                path
                              )
                          });

                          seen.add(
                            path
                          );
                        }
                      );
                  }
                );
              }
            }

            if (
              canonicalFieldType(
                field
              ) ===
                "repeater-image" &&
              field.path
            ) {
              const array =
                getPath(
                  state.config,
                  field.path
                );

              const imageSubField =
                repeaterImageSubField(
                  field
                );

              const imageKey =
                String(
                  imageSubField?.key ||
                  "src"
                );

              if (
                Array.isArray(
                  array
                )
              ) {
                array.forEach(
                  (
                    item,
                    index
                  ) => {
                    const path =
                      field.path +
                      "." +
                      index +
                      "." +
                      imageKey;

                    if (
                      seen.has(path)
                    ) {
                      return;
                    }

                    result.push({
                      label:
                        (
                          field.label ||
                          "Foto Gallery"
                        ) +
                        " " +
                        (
                          index + 1
                        ),

                      path,

                      gallery:
                        true,

                      index,

                      rootPath:
                        field.path,

                      imageKey,

                      wrapped:
                        true
                    });

                    seen.add(path);
                  }
                );
              }
            }
          }
        );
      }
    );

    if (state.doc) {
      $$(
        '[data-sve-type="image"][data-sve-field]',
        state.doc
      ).forEach(
        image => {
          const path =
            image.getAttribute(
              "data-sve-field"
            );

          if (
            !path ||
            seen.has(path)
          ) {
            return;
          }

          const repeaterImageMeta =
            repeaterImageMetaForPath(
              path
            );

          const gallery =
            !!repeaterImageMeta;

          result.push({
            label:
              image.getAttribute(
                "data-sve-label"
              ) ||
              prettify(path),

            path,

            gallery,

            index:
              repeaterImageMeta
                ? repeaterImageMeta.index
                : null,

            rootPath:
              repeaterImageMeta
                ? repeaterImageMeta.rootPath
                : null,

            imageKey:
              repeaterImageMeta
                ? repeaterImageMeta.imageKey
                : null,

            wrapped:
              !!image.closest(
                "[data-sve-image-wrapper]"
              )
          });

          seen.add(path);
        }
      );
    }

    return result;
  }

  /* =========================================================
     IMAGE SETTINGS
     ========================================================= */

  function ensureImageSettingsObject() {
    if (
      !state.config.imageSettings ||
      typeof state.config
        .imageSettings !==
        "object" ||
      Array.isArray(
        state.config.imageSettings
      )
    ) {
      state.config.imageSettings = {};
    }

    return state.config.imageSettings;
  }

  function imageSetting(path) {
    const map =
      state.config?.imageSettings;

    const current =
      map &&
      typeof map === "object"
        ? map[path]
        : null;

    const repeaterImageMeta =
      repeaterImageMetaForPath(
        path
      );

    const defaultRatio =
      repeaterImageMeta
        ? "1:1"
        : "16:9";

    return {
      width:
        Math.max(
          0,
          Math.min(
            100,
            Number(
              current?.width ??
              100
            ) ||
            0
          )
        ),

      align:
        ["left", "center", "right"]
          .includes(
            current?.align
          )
          ? current.align
          : "center",

      fit:
        normalizeFit(
          current?.fit
        ),

      alignPos:
        ALIGN_POSITIONS.includes(
          current?.alignPos
        )
          ? current.alignPos
          : "default",

      ratio:
        RATIO_OPTIONS.includes(
          current?.ratio
        )
          ? current.ratio
          : defaultRatio,

      hidden:
        current?.hidden ===
        true
    };
  }

  function setImageSetting(
    path,
    patch
  ) {
    const map =
      ensureImageSettingsObject();

    map[path] = {
      ...imageSetting(path),
      ...patch
    };

  }

  function cleanupImageSettings() {
    const map =
      state.config?.imageSettings;

    if (
      !map ||
      typeof map !==
        "object"
    ) {
      return;
    }

    const valid =
      new Set(
        collectImageFields()
          .map(
            item =>
              item.path
          )
      );

    Object.keys(map).forEach(
      path => {
        if (!valid.has(path)) {
          delete map[path];
        }
      }
    );
  }

  /* =========================================================
     IMAGE PREVIEW SYNC
     ========================================================= */

  function cleanupLegacyImageDesignCSS() {
    const css =
      getValue("css");

    if (!css) {
      return;
    }

    /*
     * v0.5.7 and earlier could append generated image design
     * rules into Scalev's CSS editor. Remove ONLY those
     * Visual Editor-owned blocks. User/template CSS is kept.
     */
    const cleaned =
      css
        .replace(
          /(?:\r?\n)*\/\*\s*SVE\d+\s+IMAGE DESIGN START\s*\*\/[\s\S]*?\/\*\s*SVE\d+\s+IMAGE DESIGN END\s*\*\/(?:\r?\n)*/g,
          "\n"
        )
        .replace(
          /\n{3,}/g,
          "\n\n"
        )
        .trim();

    if (cleaned !== css.trim()) {
      setValue(
        "css",
        cleaned
      );
    }
  }

  function applyImageSettingsToDocument(
    doc
  ) {
    if (
      !doc ||
      !state.config
    ) {
      return;
    }

    const images =
      Array.from(
        doc.querySelectorAll(
          '[data-sve-type="image"][data-sve-field]'
        )
      );

    images.forEach(image => {
      const path =
        image.getAttribute(
          "data-sve-field"
        );

      if (!path) return;

      const setting =
        imageSetting(path);

      const wrapper =
        image.closest(
          "[data-sve-image-wrapper]"
        );

      const widthTarget =
        wrapper || image;

      const ratio =
        RATIOS[
          setting.ratio
        ] ||
        RATIOS["16:9"];

      const marginLeft =
        setting.align === "left"
          ? "0"
          : "auto";

      const marginRight =
        setting.align === "right"
          ? "0"
          : "auto";

      /*
       * Delete/hide affects the visual image container when the
       * template provides data-sve-image-wrapper. No CSS editor
       * mutation is required.
       */
      if (wrapper) {
        wrapper.style.display =
          setting.hidden
            ? "none"
            : "";

        wrapper.style.width =
          setting.width + "%";

        wrapper.style.maxWidth =
          "100%";

        wrapper.style.marginLeft =
          marginLeft;

        wrapper.style.marginRight =
          marginRight;

        wrapper.style.aspectRatio =
          ratio;

        image.style.width =
          "100%";
      } else {
        image.style.display =
          setting.hidden
            ? "none"
            : "";

        image.style.width =
          setting.width + "%";

        image.style.maxWidth =
          "100%";

        image.style.marginLeft =
          marginLeft;

        image.style.marginRight =
          marginRight;

        image.style.aspectRatio =
          ratio;
      }

      if (setting.fit === "auto") {
        image.style.removeProperty("object-fit");
      } else {
        image.style.objectFit =
          setting.fit;
      }

      const position =
        ALIGN_POSITION_CSS[
          setting.alignPos
        ] || "";

      if (position) {
        image.style.objectPosition =
          position;
      } else {
        image.style.removeProperty(
          "object-position"
        );
      }

      image.style.height = "100%";
    });
  }

  function syncImageDesignPreview() {
    /*
     * The Scalev editor page itself normally does not contain
     * the invitation DOM, but supporting it costs nothing.
     */
    try {
      applyImageSettingsToDocument(
        document
      );
    } catch (_) {}

    $$("iframe").forEach(
      iframe => {
        try {
          applyImageSettingsToDocument(
            iframe.contentDocument
          );
        } catch (_) {}
      }
    );
  }

  /* =========================================================
     IMAGE DESIGN UI
     ========================================================= */

  function scalevAlignmentIcon(position) {
    /* Lucide inline icons — https://lucide.dev/icons/?focus=&search=align */
    const paths = {
      "top left": `
        <path d="M5 11V5H11"></path>
        <path d="M5 5L19 19"></path>
      `,
      "top center": `
        <path d="M8 6L12 2L16 6"></path>
        <path d="M12 2V22"></path>
      `,
      "top right": `
        <path d="M13 5H19V11"></path>
        <path d="M19 5L5 19"></path>
      `,
      "center left": `
        <path d="M6 8L2 12L6 16"></path>
        <path d="M2 12H22"></path>
      `,
      "center center": `
        <path d="M12 2V22"></path>
        <path d="m15 19-3 3-3-3"></path>
        <path d="m19 9 3 3-3 3"></path>
        <path d="M2 12H22"></path>
        <path d="m5 9-3 3 3 3"></path>
        <path d="m9 5 3-3 3 3"></path>
      `,
      "center right": `
        <path d="M18 8L22 12L18 16"></path>
        <path d="M2 12H22"></path>
      `,
      "bottom left": `
        <path d="M11 19H5V13"></path>
        <path d="M19 5L5 19"></path>
      `,
      "bottom center": `
        <path d="M8 18L12 22L16 18"></path>
        <path d="M12 2V22"></path>
      `,
      "bottom right": `
        <path d="M19 13V19H13"></path>
        <path d="M5 5L19 19"></path>
      `,
      "default": `
        <path d="m2 2 20 20"></path>
        <path d="M8.35 2.69A10 10 0 0 1 21.3 15.65"></path>
        <path d="M19.08 19.08A10 10 0 1 1 4.92 4.92"></path>
      `
    };

    return `
      <svg
        class="advance-pos-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        ${paths[position] || paths.default}
      </svg>
    `;
  }

  function renderImageDesign(item) {
    const setting =
      imageSetting(item.path);

    const alignIcon = position => {
      if (position === "left") {
        return `
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.83203 2.49935C1.83203 2.03911 2.20513 1.66602 2.66536 1.66602H17.6654C18.1256 1.66602 18.4987 2.03911 18.4987 2.49935C18.4987 2.95959 18.1256 3.33268 17.6654 3.33268H2.66536C2.20513 3.33268 1.83203 2.95959 1.83203 2.49935ZM8.4987 6.66602H5.16536C4.70513 6.66602 4.33203 7.03911 4.33203 7.49935V12.4993C4.33203 12.9596 4.70513 13.3327 5.16536 13.3327H8.4987C8.95893 13.3327 9.33203 12.9596 9.33203 12.4993V7.49935C9.33203 7.03911 8.95893 6.66602 8.4987 6.66602ZM5.16536 4.99935C3.78465 4.99935 2.66536 6.11864 2.66536 7.49935V12.4993C2.66536 13.8801 3.78465 14.9993 5.16536 14.9993H8.4987C9.87941 14.9993 10.9987 13.8801 10.9987 12.4993V7.49935C10.9987 6.11864 9.87941 4.99935 8.4987 4.99935H5.16536ZM2.66536 16.666C2.20513 16.666 1.83203 17.0391 1.83203 17.4993C1.83203 17.9596 2.20513 18.3327 2.66536 18.3327H17.6654C18.1256 18.3327 18.4987 17.9596 18.4987 17.4993C18.4987 17.0391 18.1256 16.666 17.6654 16.666H2.66536Z"
              fill="currentColor"
            ></path>
          </svg>
        `;
      }

      if (position === "right") {
        return `
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.99805 2.49935C1.99805 2.03911 2.37114 1.66602 2.83138 1.66602H17.8314C18.2916 1.66602 18.6647 2.03911 18.6647 2.49935C18.6647 2.95959 18.2916 3.33268 17.8314 3.33268H2.83138C2.37114 3.33268 1.99805 2.95959 1.99805 2.49935ZM15.3314 6.66602H11.998C11.5378 6.66602 11.1647 7.03911 11.1647 7.49935V12.4993C11.1647 12.9596 11.5378 13.3327 11.998 13.3327H15.3314C15.7916 13.3327 16.1647 12.9596 16.1647 12.4993V7.49935C16.1647 7.03911 15.7916 6.66602 15.3314 6.66602ZM11.998 4.99935C10.6173 4.99935 9.49805 6.11864 9.49805 7.49935V12.4993C9.49805 13.8801 10.6173 14.9993 11.998 14.9993H15.3314C16.7121 14.9993 17.8314 13.8801 17.8314 12.4993V7.49935C17.8314 6.11864 16.7121 4.99935 15.3314 4.99935H11.998ZM2.83138 16.666C2.37114 16.666 1.99805 17.0391 1.99805 17.4993C1.99805 17.9596 2.37114 18.3327 2.83138 18.3327H17.8314C18.2916 18.3327 18.6647 17.9596 18.6647 17.4993C18.6647 17.0391 18.2916 16.666 17.8314 16.666H2.83138Z"
              fill="currentColor"
            ></path>
          </svg>
        `;
      }

      return `
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.16602 2.49935C2.16602 2.03911 2.53911 1.66602 2.99935 1.66602H17.9993C18.4596 1.66602 18.8327 2.03911 18.8327 2.49935C18.8327 2.95959 18.4596 3.33268 17.9993 3.33268H2.99935C2.53911 3.33268 2.16602 2.95959 2.16602 2.49935ZM12.166 6.66602H8.83268C8.37245 6.66602 7.99935 7.03911 7.99935 7.49935V12.4993C7.99935 12.9596 8.37245 13.3327 8.83268 13.3327H12.166C12.6263 13.3327 12.9993 12.9596 12.9993 12.4993V7.49935C12.9993 7.03911 12.6263 6.66602 12.166 6.66602ZM8.83268 4.99935C7.45197 4.99935 6.33268 6.11864 6.33268 7.49935V12.4993C6.33268 13.8801 7.45197 14.9993 8.83268 14.9993H12.166C13.5467 14.9993 14.666 13.8801 14.666 12.4993V7.49935C14.666 6.11864 13.5467 4.99935 12.166 4.99935H8.83268ZM2.99935 16.666C2.53911 16.666 2.16602 17.0391 2.16602 17.4993C2.16602 17.9596 2.53911 18.3327 2.99935 18.3327H17.9993C18.4596 18.3327 18.8327 17.9596 18.8327 17.4993C18.8327 17.0391 18.4596 16.666 17.9993 16.666H2.99935Z"
            fill="currentColor"
          ></path>
        </svg>
      `;
    };

    const positionButtons =
      ALIGN_POSITIONS
        .filter(
          position =>
            position !== "default"
        )
        .map(
          position => `
            <button
              type="button"
              class="advance-pos-btn ${
                setting.alignPos === position
                  ? "active"
                  : ""
              }"
              data-image-alignpos-path="${esc(
                item.path
              )}"
              data-image-alignpos="${esc(
                position
              )}"
              title="${esc(position)}"
              aria-label="${esc(
                "Posisi " + position
              )}"
            >
              ${scalevAlignmentIcon(position)}
            </button>
          `
        )
        .join("");

    const ratioButtons =
      RATIO_OPTIONS
        .map(
          ratio => `
            <button
              type="button"
              class="advance-ratio-btn ${
                setting.ratio === ratio
                  ? "active"
                  : ""
              }"
              data-image-ratio-path="${esc(
                item.path
              )}"
              data-image-ratio="${ratio}"
            >
              ${ratio}
            </button>
          `
        )
        .join("");

    return `
      <details class="image-advance">
        <summary class="advance-summary">
          <span>
            Advance
          </span>

          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            class="advance-chevron"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.29289 15.7071C6.68342 16.0976 7.31658 16.0976 7.70711 15.7071L12 11.4142L16.2929 15.7071C16.6834 16.0976 17.3166 16.0976 17.7071 15.7071C18.0976 15.3166 18.0976 14.6834 17.7071 14.2929L12.7071 9.29289C12.3166 8.90237 11.6834 8.90237 11.2929 9.29289L6.29289 14.2929C5.90237 14.6834 5.90237 15.3166 6.29289 15.7071Z"
              fill="currentColor"
            ></path>
          </svg>
        </summary>

        <div class="advance-body">
          <p class="advance-design-title">
            Desain
          </p>

          <div class="advance-group">
            <p class="advance-label">
              Posisi Gambar
            </p>

            <div class="advance-pos-grid">
              ${positionButtons}
            </div>

            <button
              type="button"
              class="advance-pos-default ${
                setting.alignPos === "default"
                  ? "active"
                  : ""
              }"
              data-image-alignpos-path="${esc(
                item.path
              )}"
              data-image-alignpos="default"
              title="Alignment OFF — gunakan posisi dari CSS theme"
              aria-label="Alignment OFF"
            >
              ${scalevAlignmentIcon("default")}
              OFF
            </button>
          </div>

          <div class="advance-group">
            <label class="advance-label">
              Lebar Gambar
            </label>

            <div class="range-row">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value="${setting.width}"
                data-image-width-path="${esc(
                  item.path
                )}"
              >

              <div class="range-number">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value="${setting.width}"
                  data-image-width-number="${esc(
                    item.path
                  )}"
                >

                <span>%</span>
              </div>
            </div>
          </div>

          <div class="advance-group">
            <p class="advance-label">
              Penyesuaian Gambar
            </p>

            <div class="advance-fit-grid">
              <button
                type="button"
                class="advance-fit-btn ${
                  setting.fit === "auto"
                    ? "active"
                    : ""
                }"
                data-image-fit-path="${esc(
                  item.path
                )}"
                data-image-fit="auto"
              >
                <span class="advance-fit-preview auto"></span>
                <span class="advance-fit-label">
                  Auto
                </span>
              </button>

              <button
                type="button"
                class="advance-fit-btn ${
                  setting.fit === "cover"
                    ? "active"
                    : ""
                }"
                data-image-fit-path="${esc(
                  item.path
                )}"
                data-image-fit="cover"
              >
                <span class="advance-fit-preview cover"></span>
                <span class="advance-fit-label">
                  Cover
                </span>
              </button>

              <button
                type="button"
                class="advance-fit-btn ${
                  setting.fit === "contain"
                    ? "active"
                    : ""
                }"
                data-image-fit-path="${esc(
                  item.path
                )}"
                data-image-fit="contain"
              >
                <span class="advance-fit-preview contain"></span>
                <span class="advance-fit-label">
                  Contain
                </span>
              </button>
            </div>
          </div>

          <div class="advance-group advance-group-last">
            <p class="advance-label">
              Aspect Ratio
            </p>

            <div class="advance-ratio-grid">
              ${ratioButtons}
            </div>
          </div>

        </div>
      </details>
    `;
  }

  /* =========================================================
     GAMBAR TAB
     ========================================================= */


  function scalevPasteIcon() {
    /* Lucide: clipboard-paste — https://lucide.dev/icons/clipboard-paste */
    return `
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M11 14h10"></path>
        <path d="M16 4h2a2 2 0 0 1 2 2v1.344"></path>
        <path d="m17 18 4-4-4-4"></path>
        <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"></path>
        <rect x="8" y="2" width="8" height="4" rx="1"></rect>
      </svg>
    `;
  }

  function scalevTrashIcon() {
    return `
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 4C8 2.89544 8.89544 2 10 2H14C15.1046 2 16 2.89545 16 4V6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H19.9311L19.1302 19.2137C19.018 20.7836 17.7117 22 16.1378 22H7.86224C6.28832 22 4.982 20.7837 4.86986 19.2137L4.06888 8H4C3.44772 8 3 7.55228 3 7C3 6.44772 3.44772 6 4 6H8V4ZM10 6H14V4H10V6ZM6.07398 8L6.86478 19.0713C6.90216 19.5945 7.3376 20 7.86224 20H16.1378C16.6623 20 17.0978 19.5946 17.1352 19.0713L17.926 8H6.07398ZM10 10C10.5523 10 11 10.4477 11 11V17C11 17.5523 10.5523 18 10 18C9.44772 18 9 17.5523 9 17V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V17C15 17.5523 14.5523 18 14 18C13.4477 18 13 17.5523 13 17V11C13 10.4477 13.4477 10 14 10Z"
          fill="currentColor"
        ></path>
      </svg>
    `;
  }

  function scalevUploadImageIcon() {
    return `
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1 13L5.58579 8.4142C6.36683 7.6332 7.6332 7.6332 8.4142 8.4142L13 13M11 11L12.5858 9.4142C13.3668 8.6332 14.6332 8.6332 15.4142 9.4142L17 11M11 5H11.01M3 17H15C16.1046 17 17 16.1046 17 15V3C17 1.89543 16.1046 1 15 1H3C1.89543 1 1 1.89543 1 3V15C1 16.1046 1.89543 17 3 17Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
    `;
  }

  function imageEmptyPlaceholderHTML(
    path
  ) {
    return `
      <div
        class="preview empty image-upload-placeholder"
        aria-hidden="true"
      >
        <span class="image-upload-icon">
          ${scalevUploadImageIcon()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      </div>
    `;
  }

  function scalevGearIcon() {
    return `
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.2036 4.55322C13.0246 3.81559 11.9754 3.81559 11.7964 4.55322C11.3612 6.34603 9.30724 7.1967 7.73186 6.23681C7.08363 5.84184 6.34186 6.58365 6.73681 7.23185C7.6967 8.80723 6.846 10.8612 5.05318 11.2964C4.31557 11.4755 4.31559 12.5245 5.05318 12.7036C6.84598 13.1388 7.69671 15.1927 6.73682 16.7681C6.34187 17.4163 7.08358 18.1581 7.73181 17.7633C9.30725 16.8032 11.3612 17.6541 11.7964 19.4468C11.9755 20.1844 13.0246 20.1844 13.2036 19.4468C13.6412 17.6531 15.6937 16.8038 17.2682 17.7633C17.9164 18.1581 18.6581 17.4163 18.2632 16.7681C17.3033 15.1927 18.154 13.1388 19.9468 12.7036C20.6844 12.5245 20.6844 11.4754 19.9468 11.2964C18.154 10.8612 17.3033 8.80723 18.2632 7.23185C18.6581 6.58365 17.9164 5.84184 17.2681 6.23681C15.6938 7.19607 13.6414 6.3471 13.2045 4.55668L13.2036 4.55322ZM10.5 12C10.5 10.8954 11.3954 10 12.5 10C13.6046 10 14.5 10.8954 14.5 12C14.5 13.1046 13.6046 14 12.5 14C11.3954 14 10.5 13.1046 10.5 12ZM12.5 8C10.2908 8 8.5 9.79082 8.5 12C8.5 14.2092 10.2908 16 12.5 16C14.7092 16 16.5 14.2092 16.5 12C16.5 9.79082 14.7092 8 12.5 8Z"
          fill="currentColor"
        ></path>
      </svg>
    `;
  }

  function galleryAddButtonHTML(
    gallerySchema
  ) {
    if (!gallerySchema) {
      return "";
    }

    return `
      <div class="gallery-add-wrap">
        <button
          type="button"
          class="gallery-add-button"
          data-gallery-add="${esc(
            gallerySchema.path
          )}"
        >
          + Tambah Foto
        </button>
      </div>
    `;
  }

  function deleteGalleryItem(
    path,
    index
  ) {
    const array =
      getPath(
        state.config,
        path
      );

    if (
      !Array.isArray(array) ||
      index < 0 ||
      index >= array.length
    ) {
      return;
    }

    const schema =
      repeaterImageFieldByRootPath(
        path
      );

    const imageField =
      repeaterImageSubField(
        schema
      );

    const imageKey =
      String(
        imageField?.key ||
        "src"
      );

    const settings =
      ensureImageSettingsObject();

    const preserved =
      {};

    for (
      let currentIndex = 0;
      currentIndex < array.length;
      currentIndex++
    ) {
      const key =
        path +
        "." +
        currentIndex +
        "." +
        imageKey;

      if (
        Object.prototype
          .hasOwnProperty
          .call(
            settings,
            key
          )
      ) {
        preserved[
          currentIndex
        ] =
          clone(
            settings[key]
          );
      }
    }

    array.splice(
      index,
      1
    );

    Object.keys(
      settings
    ).forEach(key => {
      if (
        key.startsWith(
          path + "."
        ) &&
        key.endsWith(
          "." +
          imageKey
        )
      ) {
        delete settings[key];
      }
    });

    for (
      let newIndex = 0;
      newIndex < array.length;
      newIndex++
    ) {
      const oldIndex =
        newIndex < index
          ? newIndex
          : newIndex + 1;

      const oldSetting =
        preserved[
          oldIndex
        ];

      if (oldSetting) {
        settings[
          path +
          "." +
          newIndex +
          "." +
          imageKey
        ] =
          oldSetting;
      }
    }

    cleanupImageSettings();

    commitConfig(
      "Foto gallery dihapus"
    );

    render();
  }

  function deleteStaticImageFrame(
    path
  ) {
    if (!state.config) return;

    setPath(
      state.config,
      path,
      ""
    );

    setImageSetting(
      path,
      {
        hidden: true
      }
    );

    commitConfig(
      "Gambar dihapus"
    );

    render();
  }

  function resetAllImages() {
    if (
      !state.config ||
      !state.defaultConfig
    ) {
      return;
    }

    const gallerySchema =
      galleryField();

    if (gallerySchema) {
      setPath(
        state.config,
        gallerySchema.path,
        clone(
          getPath(
            state.defaultConfig,
            gallerySchema.path
          ) ||
          []
        )
      );
    }

    collectImageFields()
      .filter(
        item =>
          !item.gallery
      )
      .forEach(item => {
        setPath(
          state.config,
          item.path,
          clone(
            getPath(
              state.defaultConfig,
              item.path
            )
          ) ?? ""
        );
      });

    state.config.imageSettings =
      clone(
        state.defaultConfig
          .imageSettings ||
        {}
      );

    commitConfig();

    render();
  }

  function renderImages() {
    if (!state.config) {
      return debugHTML();
    }

    const fields =
      collectImageFields()
        .filter(item => {
          if (!state.search) {
            return true;
          }

          return (
            item.label +
            " " +
            item.path
          )
            .toLowerCase()
            .includes(
              state.search
            );
        });

    const gallerySchema =
      galleryField();

    const galleryFields =
      gallerySchema
        ? fields.filter(
            item =>
              item.gallery &&
              item.rootPath ===
                gallerySchema.path
          )
        : [];

    const lastGalleryPath =
      galleryFields.length
        ? galleryFields[
            galleryFields.length -
            1
          ].path
        : "";

    const cards =
      fields
        .map(item => {
          const value =
            getPath(
              state.config,
              item.path
            ) ||
            "";

          const setting =
            imageSetting(
              item.path
            );

          const isGallery =
            !!item.gallery;

          const imageActions = `
            <div class="image-card-actions" aria-label="Aksi gambar">
              <button
                type="button"
                class="image-card-action image-action-delete"
                ${
                  isGallery
                    ? (
                        `data-gallery-delete-index="${esc(
                          item.rootPath
                        )}" ` +
                        `data-gallery-index="${Number(
                          item.index
                        )}"`
                      )
                    : (
                        `data-image-delete-path="${esc(
                          item.path
                        )}"`
                      )
                }
                title="Hapus gambar"
                aria-label="Hapus gambar"
              >
                ${scalevTrashIcon()}
              </button>

              <button
                type="button"
                class="image-card-action image-action-setting"
                data-image-open-advance="${esc(
                  item.path
                )}"
                title="Pengaturan gambar"
                aria-label="Buka pengaturan gambar"
                aria-expanded="false"
              >
                ${scalevGearIcon()}
              </button>
            </div>
          `;

          const card = `
            <div
              class="group image-card ${
                setting.hidden
                  ? "image-card-hidden"
                  : ""
              }"
              data-image-card-path="${esc(
                item.path
              )}"
            >
              <div class="image-card-main">
                <div class="image-preview-shell">
                  ${
                    value
                      ? `
                        <img
                          class="preview"
                          src="${esc(value)}"
                          alt=""
                        >
                      `
                      : imageEmptyPlaceholderHTML(
                          item.path
                        )
                  }
                </div>

                <div class="image-card-meta">
                  <p class="image-card-name" title="${esc(item.label)}">
                    ${esc(item.label)}
                  </p>
                  <p class="image-card-path" title="CONFIG.${esc(item.path)}">
                    CONFIG.${esc(item.path)}
                  </p>
                </div>

                ${imageActions}
              </div>

              <div class="image-url-row">
                <input
                  type="text"
                  data-image-path="${esc(
                    item.path
                  )}"
                  value="${esc(value)}"
                  placeholder="Paste URL gambar..."
                  aria-label="URL ${esc(item.label)}"
                >
                <button
                  type="button"
                  class="image-paste-button"
                  data-image-paste-path="${esc(
                    item.path
                  )}"
                  title="Paste URL"
                  aria-label="Paste URL ${esc(item.label)} dari clipboard"
                >
                  ${scalevPasteIcon()}
                  <span>Paste URL</span>
                </button>
              </div>

              ${renderImageDesign(item)}
            </div>
          `;

          if (
            gallerySchema &&
            item.path ===
              lastGalleryPath
          ) {
            return (
              card +
              galleryAddButtonHTML(
                gallerySchema
              )
            );
          }

          return card;
        })
        .join("");

    /*
     * Gallery kosong tetap harus bisa menambah foto.
     */
    const emptyGalleryAdd =
      gallerySchema &&
      !galleryFields.length &&
      !state.search
        ? galleryAddButtonHTML(
            gallerySchema
          )
        : "";

    return (
      cards +
      emptyGalleryAdd +
      `
        <div class="image-global-reset">
          <button
            type="button"
            class="button danger full"
            id="${ID}-reset-images"
          >
            Reset Semua Gambar
          </button>
        </div>
      `
    );
  }

  function imagePreviewMargins(
    align
  ) {
    if (align === "left") {
      return {
        left: "0",
        right: "auto"
      };
    }

    if (align === "right") {
      return {
        left: "auto",
        right: "0"
      };
    }

    return {
      left: "auto",
      right: "auto"
    };
  }

  function syncImageCardPreview(
    input,
    path
  ) {
    const card =
      input?.closest(
        ".image-card"
      );

    if (!card) return;

    const shell =
      $(
        ".image-preview-shell",
        card
      );

    if (!shell) return;

    const value =
      input.value.trim();

    const setting =
      imageSetting(path);

    let preview =
      $(".preview", shell);

    if (value) {
      if (
        !preview ||
        preview.tagName !== "IMG"
      ) {
        const image =
          document.createElement(
            "img"
          );

        image.className =
          "preview";

        image.alt = "";

        if (preview) {
          preview.replaceWith(
            image
          );
        } else {
          shell.prepend(
            image
          );
        }

        preview = image;
      }

      preview.src =
        value;
    } else {
      if (
        !preview ||
        preview.tagName !== "BUTTON" ||
        !preview.classList.contains(
          "image-upload-placeholder"
        )
      ) {
        const empty =
          document.createElement(
            "button"
          );

        empty.type =
          "button";

        empty.className =
          "preview empty image-upload-placeholder";

        empty.dataset.imageFocus =
          path;

        empty.setAttribute(
          "aria-label",
          "Masukkan URL gambar"
        );

        if (preview) {
          preview.replaceWith(
            empty
          );
        } else {
          shell.prepend(
            empty
          );
        }

        preview = empty;
      }

      preview.innerHTML = `
        <span class="image-upload-icon">
          ${scalevUploadImageIcon()}
        </span>

        <span class="image-upload-title">
          Upload Gambar
          <b>*</b>
        </span>

        <span class="image-upload-note">
          Gunakan Paste URL di bawah
        </span>
      `;

      preview.onclick = () => {
        input.focus();
        input.select?.();
      };
    }

    /*
     * Thumbnail panel selalu landscape 16:9 dan fill/crop.
     * Advance hanya mengatur preview undangan/iframe.
     */
    preview.style.width =
      "100%";

    preview.style.height =
      "100%";

    preview.style.maxWidth =
      "none";

    preview.style.aspectRatio =
      "auto";

    preview.style.objectFit =
      "cover";

    preview.style.marginLeft =
      "0";

    preview.style.marginRight =
      "0";

    card.classList.toggle(
      "image-card-hidden",
      setting.hidden
    );
  }

  function syncImageAdvanceControls(
    root,
    path
  ) {
    const setting =
      imageSetting(path);

    $$(
      `[data-image-align-path="${CSS.escape(
        path
      )}"]`,
      root
    ).forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.imageAlign ===
          setting.align
      );
    });

    $$(
      `[data-image-fit-path="${CSS.escape(
        path
      )}"]`,
      root
    ).forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.imageFit ===
          setting.fit
      );
    });

    $$(
      `[data-image-alignpos-path="${CSS.escape(
        path
      )}"]`,
      root
    ).forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.imageAlignpos ===
          setting.alignPos
      );
    });

    $$(
      `[data-image-ratio-path="${CSS.escape(
        path
      )}"]`,
      root
    ).forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.imageRatio ===
          setting.ratio
      );
    });

    const range =
      $(
        `[data-image-width-path="${CSS.escape(
          path
        )}"]`,
        root
      );

    const number =
      $(
        `[data-image-width-number="${CSS.escape(
          path
        )}"]`,
        root
      );

    if (range) {
      range.value =
        setting.width;
    }

    if (number) {
      number.value =
        setting.width;
    }

  }

  /* =========================================================
     COLORS
     STRICT DREAMBOARD GROUPS ONLY
     ========================================================= */

  function isCssColorValue(value) {
    const raw =
      String(value || "")
        .trim();

    if (!raw) return false;

    if (
      /^var\(/i.test(raw)
    ) {
      return false;
    }

    try {
      return CSS.supports(
        "color",
        raw
      );
    } catch (_) {
      return /^#[0-9a-f]{3,8}$/i.test(
        raw
      );
    }
  }

  function cssColorToHex(
    value,
    fallback = "#000000"
  ) {
    const raw =
      String(value || "")
        .trim();

    const hexMatch =
      raw.match(
        /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i
      );

    if (hexMatch) {
      let hex =
        hexMatch[1];

      if (hex.length === 3) {
        hex =
          hex
            .split("")
            .map(char => char + char)
            .join("");
      }

      return (
        "#" +
        hex
          .slice(0, 6)
          .toLowerCase()
      );
    }

    try {
      const node =
        document.createElement(
          "span"
        );

      node.style.color =
        raw;

      if (!node.style.color) {
        return fallback;
      }

      node.style.position =
        "fixed";

      node.style.left =
        "-9999px";

      document.body.appendChild(
        node
      );

      const computed =
        getComputedStyle(
          node
        ).color;

      node.remove();

      const match =
        computed.match(
          /rgba?\(\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)\s*,?\s*(\d+(?:\.\d+)?)/i
        );

      if (!match) {
        return fallback;
      }

      const toHex =
        number =>
          Math.max(
            0,
            Math.min(
              255,
              Math.round(
                Number(number)
              )
            )
          )
            .toString(16)
            .padStart(
              2,
              "0"
            );

      return (
        "#" +
        toHex(match[1]) +
        toHex(match[2]) +
        toHex(match[3])
      );
    } catch (_) {
      return fallback;
    }
  }

  function hasAnyColorToken() {
    return COLOR_FIELDS.some(
      ([, , variable]) =>
        Boolean(
          cssVarValue(variable)
        )
    );
  }

  function colorTokenRow(
    label,
    variable
  ) {
    const value =
      cssVarValue(
        variable
      );

    /*
     * v0.8.8:
     * Missing token is NOT replaced by an internal demo/fallback color.
     * The Colors panel must reflect only what actually exists in the
     * imported/pasted HTML/CSS source.
     */
    if (!value) {
      return `
        <div class="field color-row color-row-unset">
          <div
            class="color-unset-swatch"
            aria-hidden="true"
          ></div>

          <div>
            <label>
              ${esc(label)}
            </label>

            <input
              type="text"
              value=""
              placeholder="Belum diset"
              disabled
              aria-label="${esc(label)} belum tersedia"
            >

            <small>
              ${esc(variable)}
            </small>
          </div>
        </div>
      `;
    }

    const picker =
      cssColorToHex(
        value,
        "#ffffff"
      );

    return `
      <div class="field color-row">
        <input
          type="color"
          data-color-var="${esc(
            variable
          )}"
          value="${esc(
            picker
          )}"
          aria-label="${esc(
            label
          )}"
        >

        <div>
          <label>
            ${esc(label)}
          </label>

          <input
            type="text"
            data-color-token-var="${esc(
              variable
            )}"
            value="${esc(
              value
            )}"
            placeholder="#000000"
            spellcheck="false"
            autocomplete="off"
          >

          <small>
            ${esc(variable)}
          </small>
        </div>
      </div>
    `;
  }

  function renderColors() {
    /*
     * Fresh /pages/new?mode=html_mode is allowed to be genuinely empty.
     * Never paint demo wedding colors into the editor chrome in that state.
     */
    if (!state.config) {
      return debugHTML();
    }

    if (!hasAnyColorToken()) {
      return `
        <div class="colors-empty" role="status">
          <strong>Belum ada warna</strong>
          <span>Cek menu Status</span>
        </div>
      `;
    }

    const groups = [
      "Background",
      "Body Teks",
      "Button Primary",
      "Button Secondary"
    ];

    return (
      groups
        .map(
          group => `
            <div class="group">
              <div class="group-title">
                ${group}
              </div>

              ${COLOR_FIELDS
                .filter(
                  item =>
                    item[0] ===
                    group
                )
                .map(
                  (
                    [
                      ,
                      label,
                      variable
                    ]
                  ) =>
                    colorTokenRow(
                      label,
                      variable
                    )
                )
                .join("")
              }
            </div>
          `
        )
        .join("")

      +

      `
        <button
          type="button"
          class="button full"
          id="${ID}-reset-colors"
        >
          Reset Warna
        </button>
      `
    );
  }

  /* =========================================================
     GOOGLE FONTS - MANUAL NAME / LINK
     No catalog, no Developer API, no dropdown.
     ========================================================= */

  const MANUAL_GOOGLE_FONT_ALIASES = {
    "playwrite brasil guides":
      "Playwrite BR Guides"
  };

  function normalizeManualFontName(
    value
  ) {
    return String(
      value || ""
    )
      .replace(
        /^["']+|["']+$/g,
        ""
      )
      .replace(
        /\s+/g,
        " "
      )
      .trim();
  }

  function decodeGoogleFontFamily(
    value
  ) {
    let decoded = "";

    try {
      decoded =
        decodeURIComponent(
          String(
            value || ""
          ).replace(
            /\+/g,
            " "
          )
        );
    } catch (_) {
      decoded =
        String(
          value || ""
        ).replace(
          /\+/g,
          " "
        );
    }

    return normalizeManualFontName(
      decoded
        .split(":")[0]
        .replace(
          /\s+/g,
          " "
        )
    );
  }

  function canonicalManualFontAlias(
    family
  ) {
    const clean =
      normalizeManualFontName(
        family
      );

    if (!clean) {
      return "";
    }

    return (
      MANUAL_GOOGLE_FONT_ALIASES[
        clean.toLowerCase()
      ] ||
      clean
    );
  }

  function parseGoogleFontInput(
    value
  ) {
    const raw =
      String(
        value || ""
      ).trim();

    if (!raw) {
      return {
        family: "",
        isUrl: false,
        valid: false
      };
    }

    if (
      /^https?:\/\//i.test(
        raw
      )
    ) {
      try {
        const url =
          new URL(raw);

        const host =
          url.hostname
            .toLowerCase();

        if (
          host ===
            "fonts.google.com" ||
          host ===
            "www.fonts.google.com"
        ) {
          const specimenMatch =
            url.pathname.match(
              /^\/specimen\/([^/?#]+)/
            );

          if (
            specimenMatch?.[1]
          ) {
            return {
              family:
                canonicalManualFontAlias(
                  decodeGoogleFontFamily(
                    specimenMatch[1]
                  )
                ),
              isUrl: true,
              valid: true
            };
          }

          const familyParam =
            url.searchParams.get(
              "family"
            );

          if (familyParam) {
            return {
              family:
                canonicalManualFontAlias(
                  decodeGoogleFontFamily(
                    familyParam
                  )
                ),
              isUrl: true,
              valid: true
            };
          }

          return {
            family: "",
            isUrl: true,
            valid: false
          };
        }

        if (
          host ===
            "fonts.googleapis.com"
        ) {
          const families =
            url.searchParams.getAll(
              "family"
            );

          const first =
            families[0] ||
            "";

          if (first) {
            return {
              family:
                canonicalManualFontAlias(
                  decodeGoogleFontFamily(
                    first
                  )
                ),
              isUrl: true,
              valid: true
            };
          }

          return {
            family: "",
            isUrl: true,
            valid: false
          };
        }

        return {
          family: "",
          isUrl: true,
          valid: false
        };
      } catch (_) {
        return {
          family: "",
          isUrl: true,
          valid: false
        };
      }
    }

    const firstFamily =
      raw.split(",")[0];

    return {
      family:
        canonicalManualFontAlias(
          normalizeManualFontName(
            firstFamily
          )
        ),
      isUrl: false,
      valid: true
    };
  }

  function googleFontCssURLForSingleFamily(
    family,
    weight = ""
  ) {
    const cleanFamily =
      canonicalManualFontAlias(
        family
      );

    if (!cleanFamily) {
      return "";
    }

    const familyName =
      encodeURIComponent(
        cleanFamily
      ).replace(
        /%20/g,
        "+"
      );

    const cleanWeight =
      String(
        weight || ""
      ).trim();

    return (
      "https://fonts.googleapis.com/css2?family=" +
      familyName +
      (
        cleanWeight
          ? (
              ":wght@" +
              encodeURIComponent(
                cleanWeight
              )
            )
          : ""
      ) +
      "&display=swap"
    );
  }

  function validateGoogleFontLink(
    family,
    weight = ""
  ) {
    const url =
      googleFontCssURLForSingleFamily(
        family,
        weight
      );

    if (!url) {
      return Promise.resolve({
        ok: false,
        reason: "invalid"
      });
    }

    return new Promise(
      resolve => {
        const id =
          ID +
          "-font-validation-link";

        document
          .getElementById(id)
          ?.remove();

        const link =
          document.createElement(
            "link"
          );

        let finished =
          false;

        const finish =
          result => {
            if (finished) {
              return;
            }

            finished = true;

            clearTimeout(
              timer
            );

            link.onload =
              null;

            link.onerror =
              null;

            resolve(result);
          };

        const timer =
          setTimeout(
            () => {
              finish({
                ok: false,
                reason: "timeout"
              });
            },
            7000
          );

        link.id = id;
        link.rel =
          "stylesheet";

        link.href = url;

        link.onload =
          async () => {
            /*
             * link.onload membuktikan stylesheet Google
             * bisa diakses. FontFaceSet berikutnya menguji
             * bahwa file font (fonts.gstatic.com) juga bisa
             * dipakai oleh browser.
             */
            try {
              if (
                document.fonts &&
                typeof document.fonts
                  .load ===
                  "function"
              ) {
                const faces =
                  await document.fonts
                    .load(
                      `16px "${String(
                        family
                      ).replace(
                        /"/g,
                        '\\"'
                      )}"`,
                      "Scalev Wedding 123"
                    );

                if (
                  !faces ||
                  faces.length === 0
                ) {
                  finish({
                    ok: false,
                    reason:
                      "font-file"
                  });

                  return;
                }
              }

              finish({
                ok: true,
                reason: "ok",
                url
              });
            } catch (_) {
              finish({
                ok: false,
                reason:
                  "font-file"
              });
            }
          };

        link.onerror =
          () => {
            finish({
              ok: false,
              reason:
                "stylesheet"
            });
          };

        document.head
          .appendChild(
            link
          );
      }
    );
  }

  async function validateGoogleFontFamily(
    family,
    target
  ) {
    const variable =
      target === "heading"
        ? "--sve-heading-weight"
        : "--sve-body-weight";

    const currentWeight =
      preferredFontWeight(
        target,
        cssVarValue(
          variable
        ) ||
        "400"
      );

    /*
     * Pertama tes weight yang sedang dipilih.
     * Jika family valid tetapi weight itu tidak tersedia,
     * fallback ke 400. Jika masih gagal, tes family tanpa
     * axis weight supaya font regular-only tetap valid.
     */
    let result =
      await validateGoogleFontLink(
        family,
        currentWeight
      );

    if (result.ok) {
      return {
        ...result,
        weight:
          currentWeight
      };
    }

    if (
      currentWeight !==
      "400"
    ) {
      result =
        await validateGoogleFontLink(
          family,
          "400"
        );

      if (result.ok) {
        return {
          ...result,
          weight: "400",
          normalizedWeight:
            true
        };
      }
    }

    result =
      await validateGoogleFontLink(
        family,
        ""
      );

    if (result.ok) {
      return {
        ...result,
        weight: "400",
        normalizedWeight:
          currentWeight !==
          "400"
      };
    }

    return {
      ...result,
      weight:
        currentWeight
    };
  }

  function applyGoogleFontsLinkToDocument(
    doc,
    url
  ) {
    if (!doc) {
      return;
    }

    try {
      const id =
        ID +
        "-preview-font-link";

      let link =
        doc.getElementById(
          id
        );

      if (!url) {
        link?.remove();
        return;
      }

      if (!link) {
        link =
          doc.createElement(
            "link"
          );

        link.id = id;
        link.rel =
          "stylesheet";

        (
          doc.head ||
          doc.documentElement
        )?.appendChild(
          link
        );
      }

      if (
        link.getAttribute(
          "href"
        ) !==
        url
      ) {
        link.setAttribute(
          "href",
          url
        );
      }
    } catch (_) {}
  }

  function syncGoogleFontsPreviewLinks() {
    const url =
      googleFontsURL();

    $$("iframe").forEach(
      iframe => {
        try {
          applyGoogleFontsLinkToDocument(
            iframe.contentDocument,
            url
          );
        } catch (_) {}
      }
    );

    /*
     * Scalev dapat rebuild iframe beberapa frame setelah
     * CodeMirror berubah. Ulangi sekali pada frame berikut.
     */
    requestAnimationFrame(
      () => {
        $$("iframe").forEach(
          iframe => {
            try {
              applyGoogleFontsLinkToDocument(
                iframe.contentDocument,
                url
              );
            } catch (_) {}
          }
        );
      }
    );
  }

  function configuredGoogleFont(
    target
  ) {
    return String(
      getPath(
        state.config,
        "editorStyle.googleFonts." +
          target
      ) ||
      ""
    ).trim();
  }

  function currentFont(target) {
    const saved =
      configuredGoogleFont(
        target
      );

    if (saved) {
      return saved;
    }

    const variable =
      target === "heading"
        ? "--sve-font-heading"
        : "--sve-font-body";

    const raw =
      cssVarValue(
        variable
      );

    return raw
      ? raw
          .split(",")[0]
          .replace(
            /["']/g,
            ""
          )
          .trim()
      : "";
  }

  function fontFallback(
    family,
    target
  ) {
    return target === "heading"
      ? "serif"
      : "sans-serif";
  }

  function weightTargetFromVariable(
    variable
  ) {
    if (
      variable ===
      "--sve-heading-weight"
    ) {
      return "heading";
    }

    if (
      variable ===
      "--sve-body-weight"
    ) {
      return "body";
    }

    return "";
  }

  function fontSupportsWeight(
    target,
    weight
  ) {
    return SCALEV_FONT_WEIGHTS
      .includes(
        String(weight)
      );
  }

  function fontWeightOptions(
    target
  ) {
    return SCALEV_FONT_WEIGHTS;
  }

  function preferredFontWeight(
    target,
    currentValue
  ) {
    const current =
      String(
        currentValue ||
        ""
      ).trim();

    return SCALEV_FONT_WEIGHTS
      .includes(current)
        ? current
        : "400";
  }

  function updateFontWeightSelect(
    target,
    normalize = false
  ) {
    const root =
      $(
        "#" +
        ID +
        "-body"
      );

    if (!root) {
      return;
    }

    const variable =
      target === "heading"
        ? "--sve-heading-weight"
        : "--sve-body-weight";

    const select =
      $(
        `[data-style-var="${CSS.escape(
          variable
        )}"]`,
        root
      );

    if (!select) {
      return;
    }

    const current =
      cssVarValue(
        variable
      ) ||
      "400";

    const next =
      preferredFontWeight(
        target,
        current
      );

    if (
      normalize &&
      next !== current
    ) {
      setCssVar(
        variable,
        next
      );
    }

    select.innerHTML =
      styleSelectOptions(
        next,
        SCALEV_FONT_WEIGHTS,
        false
      );

    select.value =
      next;
  }

  function googleFontsURL() {
    const requested =
      new Map();

    [
      "heading",
      "body"
    ].forEach(target => {
      const family =
        configuredGoogleFont(
          target
        );

      if (!family) {
        return;
      }

      const key =
        family
          .trim()
          .toLowerCase();

      if (!key) {
        return;
      }

      if (!requested.has(key)) {
        requested.set(
          key,
          {
            family,
            weights:
              new Set()
          }
        );
      }

      const variable =
        target === "heading"
          ? "--sve-heading-weight"
          : "--sve-body-weight";

      const currentWeight =
        preferredFontWeight(
          target,
          cssVarValue(
            variable
          ) ||
          "400"
        );

      requested
        .get(key)
        .weights
        .add(
          currentWeight
        );
    });

    const specs =
      Array.from(
        requested.values()
      ).map(entry => {
        const familyName =
          encodeURIComponent(
            entry.family
          ).replace(
            /%20/g,
            "+"
          );

        const weights =
          Array.from(
            entry.weights
          ).sort(
            (a, b) =>
              Number(a) -
              Number(b)
          );

        return (
          "family=" +
          familyName +
          ":wght@" +
          weights.join(";")
        );
      });

    if (!specs.length) {
      return "";
    }

    return (
      "https://fonts.googleapis.com/css2?" +
      specs.join("&") +
      "&display=swap"
    );
  }

  function updateGoogleFontsHead() {
    const url =
      googleFontsURL();

    const start =
      "<!-- SVE GOOGLE FONTS START -->";

    const end =
      "<!-- SVE GOOGLE FONTS END -->";

    const regex =
      /<!-- SVE GOOGLE FONTS START -->[\s\S]*?<!-- SVE GOOGLE FONTS END -->/;

    if (!url) {
      if (state.editors.head) {
        const head =
          getValue("head");

        if (regex.test(head)) {
          setValue(
            "head",
            head
              .replace(
                regex,
                ""
              )
              .replace(
                /\n{3,}/g,
                "\n\n"
              )
          );
        }
      }

      document
        .getElementById(
          ID +
          "-font-link"
        )
        ?.remove();

      $$("iframe").forEach(
        iframe => {
          try {
            applyGoogleFontsLinkToDocument(
              iframe.contentDocument,
              ""
            );
          } catch (_) {}
        }
      );

      return;
    }

    const block =
`${start}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${url}">
${end}`;

    if (state.editors.head) {
      let head =
        getValue("head");

      head =
        regex.test(head)
          ? head.replace(
              regex,
              block
            )
          : (
              head.trimEnd() +
              "\n\n" +
              block +
              "\n"
            );

      setValue(
        "head",
        head
      );
    }

    let link =
      document.getElementById(
        ID +
        "-font-link"
      );

    if (!link) {
      link =
        document.createElement(
          "link"
        );

      link.id =
        ID +
        "-font-link";

      link.rel =
        "stylesheet";

      document.head.appendChild(
        link
      );
    }

    link.href =
      url;

    syncGoogleFontsPreviewLinks();
  }

  async function applyGoogleFont(
    target
  ) {
    const input =
      $(
        "#" +
        ID +
        "-" +
        target +
        "-font"
      );

    if (!input) {
      return;
    }

    const parsed =
      parseGoogleFontInput(
        input.value
      );

    if (
      !parsed.valid ||
      !parsed.family
    ) {
      return;
    }

    const family =
      parsed.family;

    input.value =
      family;

    const validation =
      await validateGoogleFontFamily(
        family,
        target
      );

    if (!validation.ok) {
      if (
        validation.reason ===
        "stylesheet"
      ) {
      } else if (
        validation.reason ===
        "font-file"
      ) {
      } else if (
        validation.reason ===
        "timeout"
      ) {
      } else {
      }

      return;
    }

    const variable =
      target === "heading"
        ? "--sve-font-heading"
        : "--sve-font-body";

    const weightVariable =
      target === "heading"
        ? "--sve-heading-weight"
        : "--sve-body-weight";

    if (
      validation.normalizedWeight &&
      validation.weight
    ) {
      setCssVar(
        weightVariable,
        validation.weight
      );
    }

    setPath(
      state.config,
      "editorStyle.googleFonts." +
        target,
      family
    );

    commitConfig();

    setCssVar(
      variable,
      `"${family}", ${fontFallback(
        family,
        target
      )}`
    );

    updateFontWeightSelect(
      target,
      false
    );

    updateGoogleFontsHead();

    /*
     * Pastikan iframe yang sedang tampil mendapat stylesheet
     * sekarang juga, tanpa menunggu save/reload Scalev.
     */
    syncGoogleFontsPreviewLinks();

    notifyPreview();

  }

  function closeFontPortal() {}

  function positionFontPortal() {}

  /* =========================================================
     STYLE TAB
     ========================================================= */

  function styleSelectOptions(
    currentValue,
    options,
    allowCurrent = true,
    numericSort = false
  ) {
    const current =
      String(
        currentValue || ""
      ).trim();

    let values =
      (
        allowCurrent &&
        current &&
        !options.includes(
          current
        )
      )
        ? [
            current,
            ...options
          ]
        : [
            ...options
          ];

    if (numericSort) {
      values = [
        ...new Set(values)
      ].sort((a, b) => {
        const an = Number.parseFloat(a);
        const bn = Number.parseFloat(b);
        if (Number.isFinite(an) && Number.isFinite(bn)) return an - bn;
        return String(a).localeCompare(String(b));
      });
    }

    return values
      .map(
        (
          value,
          index
        ) => {
          const selected =
            options.includes(
              current
            )
              ? value === current
              : (
                  allowCurrent
                    ? value === current
                    : index === 0
                );

          return `
            <option
              value="${esc(value)}"
              ${
                selected
                  ? "selected"
                  : ""
              }
            >
              ${esc(value)}
            </option>
          `;
        }
      )
      .join("");
  }

  function renderTypographyControl(
    field
  ) {
    const value =
      cssVarValue(
        field.variable
      ) ||
      field.fallback;

    if (
      field.type === "size"
    ) {
      return `
        <select
          class="style-select"
          data-style-var="${esc(
            field.variable
          )}"
        >
          ${styleSelectOptions(
            value,
            SCALEV_FONT_SIZES,
            true,
            true
          )}
        </select>
      `;
    }

    if (
      field.type === "lineheight"
    ) {
      return `
        <select
          class="style-select"
          data-style-var="${esc(
            field.variable
          )}"
        >
          ${styleSelectOptions(
            value,
            SCALEV_LINE_HEIGHTS,
            false
          )}
        </select>
      `;
    }

    if (
      field.type === "weight"
    ) {
      const target =
        weightTargetFromVariable(
          field.variable
        );

      const options =
        target
          ? fontWeightOptions(
              target
            )
          : SCALEV_FONT_WEIGHTS;

      const selectedValue =
        target
          ? preferredFontWeight(
              target,
              value
            )
          : value;

      return `
        <select
          class="style-select"
          data-style-var="${esc(
            field.variable
          )}"
        >
          ${styleSelectOptions(
            selectedValue,
            options,
            false
          )}
        </select>
      `;
    }

    return "";
  }

  function resetStylePanel() {
    if (!state.config) {
      return;
    }

    const defaultConfig =
      state.defaultConfig ||
      {};

    const defaultHeadingFont =
      getPath(
        defaultConfig,
        "editorStyle.googleFonts.heading"
      );

    const defaultBodyFont =
      getPath(
        defaultConfig,
        "editorStyle.googleFonts.body"
      );

    if (
      typeof defaultHeadingFont ===
      "string"
    ) {
      setPath(
        state.config,
        "editorStyle.googleFonts.heading",
        defaultHeadingFont
      );
    }

    if (
      typeof defaultBodyFont ===
      "string"
    ) {
      setPath(
        state.config,
        "editorStyle.googleFonts.body",
        defaultBodyFont
      );
    }

    STYLE_FIELDS.forEach(
      field => {
        const value =
          defaultCssVar(
            field.variable
          ) ||
          field.fallback;

        setCssVar(
          field.variable,
          value
        );
      }
    );

    commitConfig();

    updateGoogleFontsHead();

    /*
     * Style panel memang boleh dirender ulang saat user
     * menekan Reset Style karena ini aksi reset penuh.
     */
    render();
  }

  function renderStyle() {
    if (!state.config) {
      return debugHTML();
    }

    return `
      <div class="group">
        <div class="group-title">
          Font Heading
        </div>

        <div class="field">
          <label>
            Google Font
          </label>

          <input
            id="${ID}-heading-font"
            type="text"
            value="${esc(
              currentFont("heading")
            )}"
            placeholder="Nama font atau link specimen"
            autocomplete="off"
          >

          <div class="font-manual-help">
            Paste nama font atau link dari Google Fonts.
            Link specimen paling akurat.
          </div>

          <a
            class="font-google-link"
            href="https://fonts.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cari di Google Fonts ↗
          </a>

          <button
            type="button"
            class="button primary full font-apply"
            id="${ID}-heading-font-apply"
          >
            Terapkan Heading Font
          </button>
        </div>
      </div>

      <div class="group">
        <div class="group-title">
          Font Body
        </div>

        <div class="field">
          <label>
            Google Font
          </label>

          <input
            id="${ID}-body-font"
            type="text"
            value="${esc(
              currentFont("body")
            )}"
            placeholder="Nama font atau link specimen"
            autocomplete="off"
          >

          <div class="font-manual-help">
            Paste nama font atau link dari Google Fonts.
            Link specimen paling akurat.
          </div>

          <a
            class="font-google-link"
            href="https://fonts.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cari di Google Fonts ↗
          </a>

          <button
            type="button"
            class="button primary full font-apply"
            id="${ID}-body-font-apply"
          >
            Terapkan Body Font
          </button>
        </div>
      </div>

      <details class="group typography-dropdown">
        <summary class="group-title typography-summary">
          <span>
            Typography
          </span>

          ${scalevChevronIcon(
            "typography-chevron"
          )}
        </summary>

        <div class="typography-body">
          ${TYPOGRAPHY_ROLES
            .map(role => {
              const fields = STYLE_FIELDS.filter(field => field.role === role.key);

              return `
                <div class="typography-role">
                  <div class="typography-role-title">${esc(role.label)}</div>
                  <div class="typography-control-grid">
                    ${fields.map(field => `
                      <div class="typography-control">
                        <label>${esc(field.label)}</label>
                        ${renderTypographyControl(field)}
                      </div>
                    `).join("")}
                  </div>
                </div>
              `;
            })
            .join("")
          }
        </div>
      </details>

      <div class="style-reset-zone">
        <button
          type="button"
          class="button full"
          id="${ID}-reset-style"
        >
          Reset Style
        </button>
      </div>
    `;
  }

  function parseTimeValueToSeconds(
    value
  ) {
    const raw =
      String(value || "")
        .trim()
        .toLowerCase();

    if (!raw) return 0;

    if (
      /^\d+$/.test(raw)
    ) {
      return Math.max(
        0,
        Number(raw)
      );
    }

    const colon =
      raw
        .split(":")
        .map(
          part =>
            Number(part)
        );

    if (
      colon.length >= 2 &&
      colon.length <= 3 &&
      colon.every(
        Number.isFinite
      )
    ) {
      if (colon.length === 2) {
        return Math.max(
          0,
          Math.floor(
            colon[0] * 60 +
            colon[1]
          )
        );
      }

      return Math.max(
        0,
        Math.floor(
          colon[0] * 3600 +
          colon[1] * 60 +
          colon[2]
        )
      );
    }

    const h =
      Number(
        raw.match(
          /(\d+)h/
        )?.[1] ||
        0
      );

    const m =
      Number(
        raw.match(
          /(\d+)m/
        )?.[1] ||
        0
      );

    const s =
      Number(
        raw.match(
          /(\d+)s/
        )?.[1] ||
        0
      );

    if (
      h ||
      m ||
      s
    ) {
      return Math.max(
        0,
        h * 3600 +
        m * 60 +
        s
      );
    }

    return 0;
  }

  function youtubeStartSeconds(
    value
  ) {
    const raw =
      String(value || "")
        .trim();

    if (!raw) return 0;

    try {
      const url =
        new URL(
          raw,
          location.href
        );

      const candidates = [
        url.searchParams.get("t"),
        url.searchParams.get("start"),
        (
          url.hash.match(
            /(?:^#|[&#])t=([^&]+)/i
          )?.[1] ||
          ""
        )
      ];

      for (
        const candidate
        of candidates
      ) {
        const seconds =
          parseTimeValueToSeconds(
            candidate
          );

        if (seconds > 0) {
          return seconds;
        }
      }
    } catch (_) {
      const match =
        raw.match(
          /(?:[?&#](?:t|start)=)([^&#]+)/i
        );

      return parseTimeValueToSeconds(
        match?.[1] ||
        ""
      );
    }

    return 0;
  }

  function formatAudioStartTime(
    secondsValue
  ) {
    const total =
      Math.max(
        0,
        Math.floor(
          Number(
            secondsValue
          ) ||
          0
        )
      );

    const hours =
      Math.floor(
        total /
        3600
      );

    const minutes =
      Math.floor(
        (
          total %
          3600
        ) /
        60
      );

    const seconds =
      total %
      60;

    const pad =
      value =>
        String(value)
          .padStart(
            2,
            "0"
          );

    if (hours > 0) {
      return (
        hours +
        ":" +
        pad(minutes) +
        ":" +
        pad(seconds)
      );
    }

    return (
      minutes +
      ":" +
      pad(seconds)
    );
  }

  function withYoutubeStartTime(
    value,
    secondsValue
  ) {
    const raw =
      String(value || "")
        .trim();

    const seconds =
      Math.max(
        0,
        Math.floor(
          Number(
            secondsValue
          ) ||
          0
        )
      );

    if (!raw) {
      return raw;
    }

    try {
      const url =
        new URL(
          raw,
          location.href
        );

      url.searchParams.delete(
        "start"
      );

      if (seconds > 0) {
        url.searchParams.set(
          "t",
          String(seconds)
        );
      } else {
        url.searchParams.delete(
          "t"
        );
      }

      if (
        url.hash &&
        /(?:^#|[&#])t=/i.test(
          url.hash
        )
      ) {
        url.hash = "";
      }

      return url.toString();
    } catch (_) {
      const cleaned =
        raw
          .replace(
            /([?&])(?:t|start)=[^&#]*&?/gi,
            "$1"
          )
          .replace(
            /[?&]$/,
            ""
          )
          .replace(
            /#t=[^&]*/i,
            ""
          );

      if (seconds <= 0) {
        return cleaned;
      }

      return (
        cleaned +
        (
          cleaned.includes("?")
            ? "&"
            : "?"
        ) +
        "t=" +
        seconds
      );
    }
  }

  function syncAudioStartUi(
    root,
    urlValue
  ) {
    const seconds =
      youtubeStartSeconds(
        urlValue
      );

    const toggle =
      $(
        "#" +
        ID +
        "-audio-start-enabled",
        root
      );

    const input =
      $(
        "#" +
        ID +
        "-audio-start-time",
        root
      );

    if (toggle) {
      toggle.checked =
        seconds > 0;
    }

    if (input) {
      input.disabled =
        seconds <= 0;

      input.value =
        formatAudioStartTime(
          seconds
        );
    }
  }

  /* =========================================================
     AUDIO
     ========================================================= */

  function renderAudio() {
    if (!state.config) {
      return debugHTML();
    }

    const field =
      schemaAudio();

    const path =
      field.path ||
      "assets.audio";

    const rawValue =
      getPath(
        state.config,
        path
      );

    const value =
      typeof rawValue === "string"
        ? rawValue
        : "";

    const startSeconds =
      youtubeStartSeconds(
        value
      );

    return `
      <div class="group">
        <div class="group-title">
          ${esc(
            field.label ||
            "Audio Undangan"
          )}
        </div>

        <div class="field audio-field">
          <label>
            URL Audio / YouTube
          </label>

          <input
            type="text"
            id="${ID}-audio-url"
            value="${esc(value)}"
            placeholder="https://youtu.be/VIDEO_ID"
            autocomplete="off"
          >

          <div class="audio-start-row">
            <input
              type="checkbox"
              id="${ID}-audio-start-enabled"
              class="audio-start-check"
              ${
                startSeconds > 0
                  ? "checked"
                  : ""
              }
              aria-label="Aktifkan waktu mulai"
            >

            <label
              class="audio-start-label"
              for="${ID}-audio-start-enabled"
            >
              Mulai pada
            </label>

            <input
              type="text"
              inputmode="numeric"
              id="${ID}-audio-start-time"
              class="audio-start-time"
              value="${esc(
                formatAudioStartTime(
                  startSeconds
                )
              )}"
              placeholder="0:00"
              ${
                startSeconds > 0
                  ? ""
                  : "disabled"
              }
              aria-label="Waktu mulai audio"
            >
          </div>
        </div>


      </div>
    `;
  }

  /* =========================================================
     STRICT HTML MODE COMPATIBILITY
     ========================================================= */

  function walkSchemaFields(fields, visit) {
    (Array.isArray(fields) ? fields : []).forEach(field => {
      visit(field);
      if (canonicalFieldType(field) === "repeater") {
        walkSchemaFields(field.fields, visit);
      }
      if (canonicalFieldType(field) === "repeater-image") {
        walkSchemaFields(field.fields, visit);
      }
    });
  }

  function collectExternalOrigins() {
    const buckets = {
      connect_src: new Set(),
      img_src: new Set(),
      media_src: new Set(),
      font_src: new Set(),
      script_src: new Set(),
      style_src: new Set(),
      frame_src: new Set(),
      worker_src: new Set(),
      manifest_src: new Set()
    };

    const sources = {
      html: getValue("html"),
      css: getValue("css"),
      js: getValue("js"),
      head: getValue("head")
    };

    const add = (bucket, rawUrl) => {
      try {
        const url = new URL(rawUrl, location.origin);
        if (url.protocol !== "https:" && url.protocol !== "http:") return;
        const origin = url.origin;
        if (origin === location.origin) return;
        buckets[bucket]?.add(origin);
      } catch (_) {}
    };

    const scanUrls = (text, bucket) => {
      const regex = /https?:\/\/[^\s"'<>`)\\]+/g;
      (String(text || "").match(regex) || []).forEach(url => add(bucket, url));
    };

    try {
      const doc = new DOMParser().parseFromString(sources.html || "", "text/html");
      doc.querySelectorAll("img[src], source[src], source[srcset]").forEach(node => {
        add("img_src", node.getAttribute("src") || node.getAttribute("srcset") || "");
      });
      doc.querySelectorAll("audio[src], video[src]").forEach(node => add("media_src", node.getAttribute("src") || ""));
      doc.querySelectorAll("iframe[src]").forEach(node => add("frame_src", node.getAttribute("src") || ""));
      doc.querySelectorAll("script[src]").forEach(node => add("script_src", node.getAttribute("src") || ""));
      doc.querySelectorAll('link[rel="stylesheet"][href]').forEach(node => add("style_src", node.getAttribute("href") || ""));
      doc.querySelectorAll('link[rel="manifest"][href]').forEach(node => add("manifest_src", node.getAttribute("href") || ""));
    } catch (_) {}

    const cssUrlRegex = /url\(\s*["']?(https?:\/\/[^)"']+)["']?\s*\)/g;
    let match;
    while ((match = cssUrlRegex.exec((sources.css || "") + "\n" + (sources.head || "")))) {
      const raw = match[1];
      if (/fonts\.gstatic\.com/i.test(raw)) add("font_src", raw);
      else add("img_src", raw);
    }

    scanUrls(sources.head, "style_src");

    const configText = JSON.stringify(state.config || {});
    const endpoint = getPath(state.config, "guestbook.endpoint");
    if (endpoint) add("connect_src", endpoint);

    ["rsvp.endpoint", "extensions.rsvpBackend.endpoint"].forEach(path => {
      const url = getPath(state.config, path);
      if (url) add("connect_src", url);
    });

    (configText.match(/https?:\/\/[^"\\]+/g) || []).forEach(url => {
      if (/youtube\.com|youtu\.be/i.test(url)) add("frame_src", url);
      else if (/\.(?:mp3|m4a|wav|ogg|mp4|webm)(?:\?|$)/i.test(url)) add("media_src", url);
      else if (/\.(?:woff2?|ttf|otf)(?:\?|$)/i.test(url)) add("font_src", url);
      else if (/\.(?:png|jpe?g|webp|gif|svg|avif)(?:\?|$)/i.test(url)) add("img_src", url);
    });

    if (/fonts\.googleapis\.com/i.test(sources.head || "")) {
      buckets.style_src.add("https://fonts.googleapis.com");
      buckets.font_src.add("https://fonts.gstatic.com");
    }

    return Object.fromEntries(
      Object.entries(buckets).map(([key, set]) => [key, Array.from(set).sort()])
    );
  }

  function customPageCompatibilityReport() {
    const blockers = [];
    const warnings = [];
    const passes = [];

    const addBlocker = text => blockers.push(text);
    const addWarning = text => warnings.push(text);
    const addPass = text => passes.push(text);

    if (!state.config) addBlocker("CONFIG tidak terbaca");
    else addPass("CONFIG terbaca sebagai static object");

    if (!state.schema) addBlocker("SVE_SCHEMA wajib eksplisit");
    else addPass("SVE_SCHEMA custom page tersedia");

    if (state.config) {
      try {
        JSON.stringify(state.config);
        addPass("CONFIG JSON-compatible");
      } catch (_) {
        addBlocker("CONFIG tidak dapat diserialisasi dengan aman");
      }
    }

    const sections = Array.isArray(state.schema?.sections) ? state.schema.sections : [];
    const ids = sections.map(sectionId).filter(Boolean);
    const uniqueIds = new Set(ids);
    if (!sections.length) addBlocker("SVE_SCHEMA custom page belum memiliki section");
    if (ids.length !== uniqueIds.size) addBlocker("SVE_SCHEMA memiliki duplicate section id");

    const order = Array.isArray(state.config?.sectionOrder) ? state.config.sectionOrder : [];
    const orderSet = new Set(order);
    if (order.length !== orderSet.size) addBlocker("CONFIG.sectionOrder memiliki duplicate id");
    ids.forEach(id => {
      if (!orderSet.has(id)) addBlocker("sectionOrder belum memuat: " + id);
    });

    sections.forEach(section => {
      const id = sectionId(section);
      if (section.visiblePath) {
        if (!safePathParts(section.visiblePath)) addBlocker("Unsafe visiblePath pada section " + id);
        if (state.config && typeof getPath(state.config, section.visiblePath) !== "boolean") {
          addBlocker("Visibility path harus boolean pada section " + id);
        }
      }

      walkSchemaFields(section.fields, field => {
        const type = canonicalFieldType(field);
        if (!CANONICAL_FIELD_TYPES.has(type)) {
          addBlocker("Field type tidak didukung: " + type + " (" + (field.path || field.key || id) + ")");
        }
        if (field.path && !safePathParts(field.path)) {
          addBlocker("Unsafe field path: " + field.path);
        }
        if ((type === "repeater" || type === "repeater-image") && !Array.isArray(field.fields)) {
          addBlocker("Repeater tanpa fields[]: " + (field.path || id));
        }
        if (type === "repeater") {
          (field.fields || []).forEach(subField => {
            const subType = canonicalFieldType(subField);
            if (subType === "repeater" || subType === "repeater-image") {
              addBlocker("Nested repeater tidak diizinkan: " + (field.path || id));
            }
            if (!subField.key) addBlocker("Repeater subfield tanpa stable key: " + (field.path || id));
          });
        }
      });
    });

    const allSource = ["html", "css", "js", "head"].map(getValue).join("\n");
    if (/\beval\s*\(/.test(allSource)) addBlocker("eval() terdeteksi");
    if (/\bnew\s+Function\s*\(/.test(allSource)) addBlocker("new Function() terdeteksi");
    if (/javascript\s*:/i.test(allSource)) addBlocker("javascript: URL terdeteksi");
    if (/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(allSource)) addBlocker("Private Scalev API URL terdeteksi");
    if (/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(allSource)) {
      addBlocker("Kemungkinan secret/private credential terdeteksi");
    }

    const cssSource = compatibilityCssSource();
    const missingTypographyTokens = STYLE_FIELDS
      .map(field => field.variable)
      .filter(variable => !sourceHasCssVar(cssSource, variable));

    if (missingTypographyTokens.length) {
      addBlocker("Typography role tokens belum lengkap: " + missingTypographyTokens.join(", "));
    } else {
      addPass("Semua typography role tokens tersedia");
    }

    const csp = collectExternalOrigins();
    const externalCount = Object.values(csp).reduce((sum, list) => sum + list.length, 0);
    if (externalCount) addWarning("External origin terdeteksi; salin CSP manifest ke Scalev Security");
    addPass("Custom page aktif; validasi 21 section wedding dilewati");

    return {
      status: blockers.length ? "BLOCKER" : warnings.length ? "WARNING" : "PASS",
      blockers,
      warnings,
      passes,
      csp
    };
  }

  function strictCompatibilityReport() {
    if (state.schema?.template?.type === "custom-page") {
      return customPageCompatibilityReport();
    }

    const blockers = [];
    const warnings = [];
    const passes = [];

    const addBlocker = text => blockers.push(text);
    const addWarning = text => warnings.push(text);
    const addPass = text => passes.push(text);

    if (!state.config) addBlocker("CONFIG tidak terbaca");
    else addPass("CONFIG terbaca sebagai static object");

    if (!state.schema) addBlocker("SVE_SCHEMA wajib eksplisit; HTML fallback bukan Strict PASS");
    else addPass("SVE_SCHEMA eksplisit tersedia");

    if (state.config) {
      try {
        JSON.stringify(state.config);
        addPass("CONFIG JSON-compatible");
      } catch (_) {
        addBlocker("CONFIG tidak dapat diserialisasi dengan aman");
      }
    }

    const sections = Array.isArray(state.schema?.sections) ? state.schema.sections : [];
    const ids = sections.map(sectionId).filter(Boolean);
    const uniqueIds = new Set(ids);

    if (ids.length !== uniqueIds.size) addBlocker("SVE_SCHEMA memiliki duplicate section id");

    CANONICAL_SECTION_IDS.forEach(id => {
      if (!uniqueIds.has(id)) addBlocker("Canonical section hilang: " + id);
    });

    if (CANONICAL_SECTION_IDS.every(id => uniqueIds.has(id))) {
      addPass("21 canonical sections tersedia");
    }

    const order = Array.isArray(state.config?.sectionOrder) ? state.config.sectionOrder : [];
    const orderSet = new Set(order);
    if (order.length !== orderSet.size) addBlocker("CONFIG.sectionOrder memiliki duplicate id");
    CANONICAL_SECTION_IDS.forEach(id => {
      if (!orderSet.has(id)) addBlocker("sectionOrder belum memuat: " + id);
    });
    if (order[0] && order[0] !== "cover") addBlocker("Cover wajib menjadi section pertama");

    CANONICAL_SECTION_IDS.filter(id => id !== "cover").forEach(id => {
      const value = getPath(state.config, "sections." + id);
      if (typeof value !== "boolean") addBlocker("Boolean visibility tidak valid: sections." + id);
    });

    sections.forEach(section => {
      const id = sectionId(section);
      if (id === "cover") {
        if (section.locked !== true || section.canHide !== false) {
          addBlocker("Cover harus locked dan canHide:false");
        }
      } else if (section.visiblePath && !safePathParts(section.visiblePath)) {
        addBlocker("Unsafe visiblePath pada section " + id);
      }

      walkSchemaFields(section.fields, field => {
        const type = canonicalFieldType(field);
        if (!CANONICAL_FIELD_TYPES.has(type)) {
          addBlocker("Field type tidak didukung: " + type + " (" + (field.path || field.key || id) + ")");
        }
        if (field.path && !safePathParts(field.path)) {
          addBlocker("Unsafe field path: " + field.path);
        }
        if ((type === "repeater" || type === "repeater-image") && !Array.isArray(field.fields)) {
          addBlocker("Repeater tanpa fields[]: " + (field.path || id));
        }
        if (type === "repeater") {
          (field.fields || []).forEach(subField => {
            const subType = canonicalFieldType(subField);
            if (subType === "repeater" || subType === "repeater-image") {
              addBlocker("Nested repeater tidak diizinkan: " + (field.path || id));
            }
            if (!subField.key) addBlocker("Repeater subfield tanpa stable key: " + (field.path || id));
          });
        }
      });
    });

    const allSource = ["html", "css", "js", "head"].map(getValue).join("\n");
    if (/\beval\s*\(/.test(allSource)) addBlocker("eval() terdeteksi");
    if (/\bnew\s+Function\s*\(/.test(allSource)) addBlocker("new Function() terdeteksi");
    if (/javascript\s*:/i.test(allSource)) addBlocker("javascript: URL terdeteksi");
    if (/https?:\/\/[^\s"']*scalev\.(?:com|id)\/api\//i.test(allSource)) addBlocker("Private Scalev API URL terdeteksi");
    if (/(service[_-]?role|database[_-]?password|private[_-]?api[_-]?key|secret[_-]?token)\s*[:=]/i.test(allSource)) {
      addBlocker("Kemungkinan secret/private credential terdeteksi");
    }

    const jsSource = getValue("js");
    if (!/\bconst\s+CONFIG\s*=/.test(jsSource)) warnings.push("CONFIG strict canonical sebaiknya memakai const");
    if (!/\bconst\s+SVE_SCHEMA\s*=/.test(jsSource)) warnings.push("SVE_SCHEMA strict canonical sebaiknya memakai const");

    if (getPath(state.config, "sections.guestbook") === true) {
      const enabled = getPath(state.config, "guestbook.enabled");
      const endpoint = String(getPath(state.config, "guestbook.endpoint") || "");
      if (enabled !== true) addBlocker("Guestbook visible tetapi guestbook.enabled bukan true");
      if (!/^https:\/\//i.test(endpoint)) addBlocker("Guestbook visible tetapi endpoint HTTPS belum valid");
    }

    if (getPath(state.config, "sections.rsvp") === true) {
      const mode = String(getPath(state.config, "extensions.rsvpBackend.mode") || "none");
      if (mode !== "none" && mode !== "external") addBlocker("RSVP backend mode harus none atau external");
      if (mode === "external") {
        const endpoint = String(getPath(state.config, "extensions.rsvpBackend.endpoint") || "");
        if (!/^https:\/\//i.test(endpoint)) addBlocker("RSVP external membutuhkan endpoint HTTPS");
      } else {
        warnings.push("RSVP backend belum dikonfigurasi; public runtime wajib fail-closed");
      }
    }

    const cssSource = compatibilityCssSource();
    const missingTypographyTokens = STYLE_FIELDS
      .map(field => field.variable)
      .filter(variable => !sourceHasCssVar(cssSource, variable));

    if (missingTypographyTokens.length) {
      addBlocker(
        "Typography role tokens belum lengkap: " +
        missingTypographyTokens.join(", ")
      );
    } else {
      addPass("Semua typography role tokens tersedia");
    }

    const hardcodedEditorialFontSize = /(?:\.svw-(?:cover-names|heading|quote-text|person-name|item-title|date-display|count\s+strong|gallery-caption|event-meta|field\s+label|footer-brand|footer-creator|footer-note|btn|kicker))[^\{]*\{[^\}]*font-size\s*:\s*(?!var\()/is.test(cssSource);

    if (hardcodedEditorialFontSize) {
      addWarning("Terdeteksi typography editorial hardcoded; map seluruh teks ke role token --sve-*.");
    }

    const csp = collectExternalOrigins();
    const externalCount = Object.values(csp).reduce((sum, list) => sum + list.length, 0);
    if (externalCount) warnings.push("External origin terdeteksi; salin CSP manifest ke Scalev Security");
    else addPass("Tidak ada external origin wajib dari scanner");

    return {
      status: blockers.length ? "BLOCKER" : warnings.length ? "WARNING" : "PASS",
      blockers,
      warnings,
      passes,
      csp
    };
  }

  function compatibilityStatusIcon(status) {
    if (status === "PASS") {
      return `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      `;
    }

    if (status === "WARNING") {
      return `
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.536 4.66667C14.0756 2.00001 17.9246 2.00001 19.4642 4.66667L28.7018 20.6667C30.2414 23.3333 28.3167 26.6667 25.2376 26.6667H6.76244C3.68324 26.6667 1.75873 23.3333 3.29834 20.6667L12.536 4.66667ZM17.1548 6C16.6416 5.11112 15.3586 5.11112 14.8454 6L5.60774 22C5.09455 22.8889 5.73604 24 6.76244 24H25.2376C26.264 24 26.9055 22.8888 26.3924 22L17.1548 6ZM16 10.6667C16.7364 10.6667 17.3333 11.2636 17.3333 12V14.6667C17.3333 15.403 16.7364 16 16 16C15.2636 16 14.6667 15.403 14.6667 14.6667V12C14.6667 11.2636 15.2636 10.6667 16 10.6667ZM14.6667 20C14.6667 19.2636 15.2636 18.6667 16 18.6667H16.0133C16.7497 18.6667 17.3467 19.2636 17.3467 20C17.3467 20.7364 16.7497 21.3333 16.0133 21.3333H16C15.2636 21.3333 14.6667 20.7364 14.6667 20Z" fill="currentColor"></path>
        </svg>
      `;
    }

    return `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"></path>
      </svg>
    `;
  }

  function renderCompatibility() {
    if (!state.config) {
      return debugHTML();
    }

    const report = strictCompatibilityReport();
    const list = (items, empty) => items.length
      ? `<ul>${items.map(item => `<li>${esc(item)}</li>`).join("")}</ul>`
      : `<p class="compat-empty">${esc(empty)}</p>`;

    const statusLabel = report.status === "PASS"
      ? "Siap"
      : report.status === "WARNING"
        ? "Perlu dicek"
        : "Masalah";

    const statusMessage = report.status === "PASS"
      ? "Semua siap"
      : report.status === "WARNING"
        ? "Perlu diperiksa"
        : "Perlu diperbaiki";

    return `
      <div class="compatibility-panel">
        <div class="compat-status compat-${report.status.toLowerCase()}">
          <div class="compat-status-icon" aria-hidden="true">
            ${compatibilityStatusIcon(report.status)}
          </div>
          <div class="compat-status-copy">
            <div class="compat-status-row">
              <strong>${esc(statusLabel)}</strong>
            </div>
            <small>${esc(statusMessage)}</small>
          </div>
        </div>

        <div class="compat-metrics">
          <span class="metric blocker">Masalah <b>${report.blockers.length}</b></span>
          <span class="metric warning">Perlu dicek <b>${report.warnings.length}</b></span>
          <span class="metric pass">Siap <b>${report.passes.length}</b></span>
        </div>

        <details class="compat-detail">
          <summary>
            <span>Detail</span>
            <b>${report.blockers.length + report.warnings.length + report.passes.length}</b>
          </summary>
          <div class="compat-detail-body">
            <div class="compat-detail-group compat-list">
              <strong>Masalah</strong>
              ${list(report.blockers, "Tidak ada masalah.")}
            </div>
            <div class="compat-detail-group compat-list">
              <strong>Perlu dicek</strong>
              ${list(report.warnings, "Tidak ada yang perlu dicek.")}
            </div>
            <div class="compat-detail-group compat-list">
              <strong>Siap</strong>
              ${list(report.passes, "Belum ada hasil.")}
            </div>
            <div class="compat-detail-group">
              <strong>Keamanan</strong>
              <pre class="compat-code">${esc(JSON.stringify(report.csp, null, 2))}</pre>
            </div>
            <small class="compat-version">v3.25.4 · VE v${VERSION}</small>
          </div>
        </details>
      </div>
    `;
  }

  function validateConfigForCommit(config) {
    const errors = [];

    const walk = (value, path = "CONFIG") => {
      if (value === null) return;
      if (Array.isArray(value)) {
        value.forEach((item, index) => walk(item, path + "." + index));
        return;
      }
      if (typeof value === "object") {
        Object.keys(value).forEach(key => {
          if (FORBIDDEN_OBJECT_KEYS.has(key)) errors.push("Forbidden key: " + path + "." + key);
          walk(value[key], path + "." + key);
        });
        return;
      }
      if (!["string", "number", "boolean"].includes(typeof value)) {
        errors.push("Non-static value: " + path);
      }
      if (typeof value === "number" && !Number.isFinite(value)) {
        errors.push("Non-finite number: " + path);
      }
    };

    walk(config);

    try {
      JSON.parse(JSON.stringify(config));
    } catch (_) {
      errors.push("CONFIG gagal round-trip JSON");
    }

    return errors;
  }

  /* =========================================================
     RENDER
     ========================================================= */

  function renderTemplateLibrary() {
    const library = state.templateLibrary;
    const query = String(state.search || "").trim().toLowerCase();
    const templates = library.templates.filter(template => {
      if (!query) return true;

      return [template.name]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });

    if (library.status === "idle") {
      loadTemplateLibrary().then(() => {
        if (state.tab === "library") {
          state.uiPrepared = false;
          render();
        }
      });
    }

    const error = library.error
      ? `
        <div class="library-alert library-alert-warning" role="alert">
          <strong>Library belum bisa dimuat</strong>
          <span>${esc(library.error)}</span>
          <button type="button" class="button secondary library-alert-action" data-library-refresh>Coba lagi</button>
        </div>
      `
      : "";

    const cards = templates.map(template => {
      const available = Boolean(template.sourceUrl);
      const active = template.id === library.importedId;

      return `
        <article class="library-card${active ? " is-active" : ""}" role="listitem"${active ? ' aria-current="true"' : ""}>
          <div class="library-card-row">
            <div class="library-card-copy">
            <div class="library-card-heading">
              <h3>${esc(template.name)}</h3>
            </div>
            <div class="library-commission">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 7C2 5.34315 3.34315 4 5 4H15C16.6569 4 18 5.34315 18 7V8H19C20.6569 8 22 9.34315 22 11V17C22 18.6569 20.6569 20 19 20H9C7.34315 20 6 18.6569 6 17V16H5C3.34315 16 2 14.6569 2 13V7ZM8 17C8 17.5523 8.4477 18 9 18H19C19.5523 18 20 17.5523 20 17V11C20 10.4477 19.5523 10 19 10H9C8.4477 10 8 10.4477 8 11V17ZM16 8H9C7.34315 8 6 9.34315 6 11V14H5C4.44771 14 4 13.5523 4 13V7C4 6.44771 4.44771 6 5 6H15C15.5523 6 16 6.44771 16 7V8ZM14 13C13.4477 13 13 13.5523 14 15C14.5523 15 15 15 15 14C15 13.4477 14.5523 13 14 13ZM11 14C11 12.3431 12.3431 11 14 11C15.6569 11 17 12.3431 17 14C17 15.6569 15.6569 17 14 17C12.3431 17 11 15.6569 11 14Z" fill="currentColor"></path>
              </svg>
              <svg width="17" height="17" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" focusable="false"><path d="M320 96L192 96 144.6 24.9C137.5 14.2 145.1 0 157.9 0L354.1 0c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128l128 0c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96L96 512c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20l0 14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1c8.3 2.9 17.9 6.2 28.2 8.4l0 14.6c0 11 9 20 20 20s20-9 20-20l0-13.8c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7l0-13.9z"></path></svg>
              <span>${esc(formatTemplatePrice(template.priceIdr))}</span>
              <span aria-hidden="true">→</span>
              <span>${esc(formatTemplatePrice(templateCommission(template)))}</span>
            </div>
            </div>
            <div class="library-card-actions">
              <button
                type="button"
                class="button ${active ? "danger" : "primary"} library-import-button"
                data-library-import="${esc(template.id)}"
                ${available ? "" : "disabled"}
              >${available ? (active ? "Reset" : "Gunakan") : "Belum siap"}</button>
            </div>
          </div>
        </article>
      `;
    }).join("");

    return `
      <div class="template-library-panel">
        <header class="library-header">
          <div class="library-heading">
            <h2>Template</h2>
            <div class="library-summary" role="status" aria-live="polite">
              <strong>${templates.length}</strong>
              <span>template</span>
            </div>
          </div>
          <div class="library-header-actions">
            <button type="button" class="button secondary library-refresh-button" data-library-refresh aria-label="Muat ulang template">
                ${library.status === "loading" ? "Memuat..." : "Muat ulang"}
            </button>
            <button
              type="button"
              class="button danger library-clear-button"
              data-library-clear
              aria-label="Kosongkan editor"
              title="Kosongkan editor"
              ${library.importedId ? "" : "disabled"}
            >
              Kosongkan
            </button>
          </div>
        </header>

        ${error}

        ${library.status === "loading" && !library.templates.length
          ? `
            <div class="library-loading" aria-live="polite" aria-label="Memuat template">
              <div class="library-skeleton-card"></div>
              <div class="library-skeleton-card"></div>
              <div class="library-skeleton-card"></div>
            </div>
          `
          : cards
            ? `<div class="library-grid" role="list">${cards}</div>`
            : `
              <div class="library-empty" role="status">
                <strong>Belum ada template yang cocok.</strong>
                <span>${query ? "Coba kata pencarian lain." : "Template akan muncul di sini."}</span>
              </div>
            `}

      </div>
    `;
  }

  function syncSearchChrome() {
    const input = $("#" + ID + "-search");
    if (!input) return;

    const isLibrary = state.tab === "library";
    input.placeholder = isLibrary ? "Cari template..." : "Cari section / field...";
    input.setAttribute("aria-label", isLibrary ? "Cari template" : "Cari section atau field");
  }

  function render() {
    const renderStarted = performance.now();
    const root =
      $("#" + ID + "-body");

    if (!root) return;

    /*
     * v0.8.4: expose active panel to CSS so each Visual Editor
     * surface can mirror the native Scalev density without
     * leaking theme typography into editor chrome.
     */
    root.dataset.sveTab = state.tab || "content";

    if (
      state.tab === "library"
    ) {
      root.innerHTML =
        renderTemplateLibrary();
    } else if (
      state.tab === "content"
    ) {
      root.innerHTML =
        renderContent();
    } else if (
      state.tab === "images"
    ) {
      root.innerHTML =
        renderImages();
    } else if (
      state.tab === "colors"
    ) {
      root.innerHTML =
        renderColors();
    } else if (
      state.tab === "style"
    ) {
      root.innerHTML =
        renderStyle();
    } else if (
      state.tab === "audio"
    ) {
      root.innerHTML =
        renderAudio();
    } else if (
      state.tab === "compatibility"
    ) {
      root.innerHTML =
        renderCompatibility();
    } else {
      root.innerHTML =
        renderContent();
    }

    bindBody(root);
    syncSearchChrome();

    if (state.tab === "content") {
      scheduleContentSectionPrewarm();
    }

    state.uiPrepared = true;
    state.renderedTab = state.tab || "content";
    state.renderedSearch = state.search || "";

    const renderMs = performance.now() - renderStarted;
    state.performance.renderCount += 1;
    state.performance.lastRenderMs = Math.round(renderMs * 100) / 100;
    state.performance.lastRenderTab = state.renderedTab;
    if (renderMs > 50) state.performance.slowRenders += 1;
  }

  /* =========================================================
     EVENTS
     ========================================================= */

  /* =========================================================
     IMAGE URL PASTE FLOW — v0.8.8
     ========================================================= */

  function imageUrlInput(root, path) {
    return $(
      '[data-image-path="' + CSS.escape(path) + '"]',
      root
    );
  }


  async function pasteImageUrlFromClipboard(root, path) {
    const input = imageUrlInput(root, path);
    if (!input) return false;

    try {
      if (
        !navigator.clipboard ||
        typeof navigator.clipboard.readText !== "function"
      ) {
        throw new Error("clipboard-unavailable");
      }

      const clipboardText = String(
        await navigator.clipboard.readText()
      ).trim();

      if (!clipboardText) {
        return false;
      }

      if (clipboardText === input.value.trim()) {
        input.focus({ preventScroll: true });
        return true;
      }

      /*
       * Atomic replace: clipboard always replaces the complete old value.
       * The existing change handler owns CONFIG commit + preview sync.
       */
      input.value = clipboardText;
      input.dispatchEvent(
        new Event("change", { bubbles: true })
      );
      input.focus({ preventScroll: true });
      return true;
    } catch (_) {
      input.focus({ preventScroll: true });
      return false;
    }
  }

  function contentFieldValueFromInput(input) {
    const type = String(input.dataset.fieldType || "text");
    let value = input.value;

    if (type === "boolean") {
      value = !!input.checked;
    } else if (type === "number") {
      value = input.value === "" ? "" : Number(input.value);
      if (value !== "" && !Number.isFinite(value)) value = "";
    } else if (type === "datetime") {
      value = localDateTimeToOffset(input.value);
    }

    return value;
  }

  function updateContentFieldState(input) {
    if (
      !input?.matches?.("[data-field-path]") ||
      input.dataset.autoWeddingId === "1" ||
      input.dataset.fieldReadonly === "1" ||
      input.disabled
    ) {
      return false;
    }

    setPath(
      state.config,
      input.dataset.fieldPath,
      contentFieldValueFromInput(input)
    );

    const card = input.closest("[data-section-card]");
    invalidateContentSectionCache(card?.dataset.sectionCard);
    touchContentSection(card);
    state.contentStateDirty = true;
    return true;
  }

  function bindContentBody(root) {
    /*
     * v0.9.1 Content hot path:
     * one delegated listener per event type instead of listeners per field.
     */
    if (root.dataset.contentDelegated === "1") {
      return;
    }

    root.dataset.contentDelegated = "1";

    const clearSectionDragState = () => {
      $$(
        ".section.dragging, .section.drag-before, .section.drag-after",
        root
      ).forEach(card => {
        card.classList.remove(
          "dragging",
          "drag-before",
          "drag-after"
        );

        delete card.dataset.dropPlacement;
      });
    };

    root.addEventListener(
      "click",
      event => {
        const up =
          event.target.closest(
            "[data-section-up]"
          );

        if (up) {
          event.preventDefault();
          event.stopPropagation();
          if (up.disabled) return;
          flushContentCommit();
          moveSection(
            up.dataset.sectionUp,
            -1
          );
          return;
        }

        const down =
          event.target.closest(
            "[data-section-down]"
          );

        if (down) {
          event.preventDefault();
          event.stopPropagation();
          if (down.disabled) return;
          flushContentCommit();
          moveSection(
            down.dataset.sectionDown,
            1
          );
          return;
        }

        if (
          event.target.closest(
            "[data-section-drag]"
          )
        ) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        const add =
          event.target.closest(
            "[data-repeat-add]"
          );

        if (add) {
          const path =
            add.dataset.repeatAdd;

          const schemaField =
            schemaSections()
              .flatMap(
                section =>
                  section.fields ||
                  []
              )
              .find(
                field =>
                  field.type ===
                    "repeater" &&
                  field.path === path
              );

          let array =
            getPath(
              state.config,
              path
            );

          if (!Array.isArray(array)) {
            setPath(
              state.config,
              path,
              []
            );

            array =
              getPath(
                state.config,
                path
              );
          }

          array.push(
            repeaterDefault(
              schemaField ||
              {}
            )
          );

          state.contentStateDirty = true;
          invalidateContentSectionCache(
            add.closest("[data-section-card]")?.dataset.sectionCard
          );

          flushContentCommit(
            "Item ditambahkan"
          );

          refreshContentSectionBody(
            add.closest(
              "[data-section-card]"
            )
          );
          return;
        }

        const remove =
          event.target.closest(
            "[data-repeat-delete]"
          );

        if (remove) {
          const array =
            getPath(
              state.config,
              remove.dataset.repeatDelete
            );

          if (!Array.isArray(array)) {
            return;
          }

          array.splice(
            Number(
              remove.dataset.repeatIndex
            ),
            1
          );

          state.contentStateDirty = true;
          invalidateContentSectionCache(
            remove.closest("[data-section-card]")?.dataset.sectionCard
          );

          flushContentCommit(
            "Item dihapus"
          );

          refreshContentSectionBody(
            remove.closest(
              "[data-section-card]"
            )
          );
          return;
        }

        const reset =
          event.target.closest(
            "#" + ID + "-reset-all"
          );

        if (reset) {
          clearTimeout(
            state.contentCommitTimer
          );
          state.contentCommitTimer = null;
          state.contentCommitMessage = "";
          state.contentStateDirty = false;
          resetAll();
          return;
        }

        const head =
          event.target.closest(
            ".section-head"
          );

        if (
          head &&
          !event.target.closest(
            ".switch-wrap, .section-actions, .section-move-controls, .section-drag-btn"
          )
        ) {
          const card =
            head.closest(
              "[data-section-card]"
            );

          if (!card) return;

          const willOpen =
            !card.classList.contains(
              "open"
            );

          card.classList.toggle(
            "open",
            willOpen
          );

          const id =
            card.dataset.sectionCard;

          if (willOpen) {
            state.contentOpenSections.add(id);
            ensureContentSectionLoaded(card);
          } else {
            state.contentOpenSections.delete(id);
            touchContentSection(card);
            pruneClosedContentSections(root);
          }
        }
      }
    );

    root.addEventListener(
      "input",
      event => {
        const input = event.target;
        if (!(input instanceof HTMLElement)) return;
        if (!input.matches("[data-field-path]")) return;

        /* Select/checkbox are discrete controls; change owns them. */
        if (
          input.tagName === "SELECT" ||
          input.matches('input[type="checkbox"], input[type="radio"]')
        ) {
          return;
        }

        if (!updateContentFieldState(input)) return;

        /*
         * Realtime path: mutate memory immediately, persist canonical CONFIG
         * shortly after without parseAll()/global rerender.
         */
        queueContentCommit();
      }
    );

    root.addEventListener(
      "change",
      event => {
        const input = event.target;

        if (!(input instanceof HTMLElement)) {
          return;
        }

        if (input.matches("[data-visible-path]")) {
          setPath(
            state.config,
            input.dataset.visiblePath,
            input.checked
          );

          queueContentCommit(
            input.checked
              ? "Section ditampilkan"
              : "Section disembunyikan"
          );
          return;
        }

        if (!updateContentFieldState(input)) {
          return;
        }

        /* Blur/discrete change flushes immediately; typing remains batched. */
        flushContentCommit(
          "Konten diperbarui"
        );
      }
    );

    root.addEventListener(
      "dragstart",
      event => {
        const handle =
          event.target.closest(
            "[data-section-drag]"
          );

        if (!handle) return;

        if (
          handle.disabled ||
          handle.getAttribute(
            "draggable"
          ) !== "true"
        ) {
          event.preventDefault();
          return;
        }

        flushContentCommit();

        const card =
          handle.closest(
            "[data-section-card]"
          );

        if (!card) return;

        card.classList.add(
          "dragging"
        );

        event.dataTransfer.effectAllowed =
          "move";

        event.dataTransfer.setData(
          "text/plain",
          card.dataset.sectionCard
        );

        if (
          typeof event.dataTransfer.setDragImage ===
          "function"
        ) {
          event.dataTransfer.setDragImage(
            card,
            24,
            24
          );
        }
      }
    );

    root.addEventListener(
      "dragend",
      clearSectionDragState
    );

    root.addEventListener(
      "dragover",
      event => {
        const card =
          event.target.closest(
            "[data-section-card]"
          );

        if (!card) return;

        const dragId =
          event.dataTransfer
            ?.getData(
              "text/plain"
            ) ||
          $(
            ".section.dragging",
            root
          )?.dataset?.sectionCard ||
          "";

        const targetId =
          card.dataset.sectionCard;

        if (
          !dragId ||
          dragId === targetId
        ) {
          return;
        }

        const targetSection =
          schemaSections().find(
            section =>
              sectionId(section) ===
              targetId
          );

        if (
          targetId !== "cover" &&
          !isSectionReorderable(
            targetSection
          )
        ) {
          return;
        }

        event.preventDefault();
        event.dataTransfer.dropEffect =
          "move";

        const rect =
          card.getBoundingClientRect();

        let placement =
          event.clientY <
          rect.top + rect.height / 2
            ? "before"
            : "after";

        if (targetId === "cover") {
          placement = "after";
        }

        $$(
          ".section.drag-before, .section.drag-after",
          root
        ).forEach(other => {
          if (other === card) return;
          other.classList.remove(
            "drag-before",
            "drag-after"
          );
          delete other.dataset.dropPlacement;
        });

        card.dataset.dropPlacement =
          placement;

        card.classList.toggle(
          "drag-before",
          placement === "before"
        );

        card.classList.toggle(
          "drag-after",
          placement === "after"
        );
      }
    );

    root.addEventListener(
      "dragleave",
      event => {
        const card =
          event.target.closest(
            "[data-section-card]"
          );

        if (!card) return;

        if (
          event.relatedTarget &&
          card.contains(
            event.relatedTarget
          )
        ) {
          return;
        }

        card.classList.remove(
          "drag-before",
          "drag-after"
        );
        delete card.dataset.dropPlacement;
      }
    );

    root.addEventListener(
      "drop",
      event => {
        const card =
          event.target.closest(
            "[data-section-card]"
          );

        if (!card) return;

        const dragId =
          event.dataTransfer.getData(
            "text/plain"
          );

        const targetId =
          card.dataset.sectionCard;

        const placement =
          card.dataset.dropPlacement ||
          (
            targetId === "cover"
              ? "after"
              : "before"
          );

        event.preventDefault();
        clearSectionDragState();

        moveSectionByDrop(
          dragId,
          targetId,
          placement
        );
      }
    );
  }

  function bindTemplateLibraryBody(root) {
    $$("[data-library-import]", root).forEach(button => {
      button.onclick = () => {
        importLibraryTemplate(button.dataset.libraryImport);
      };
    });

    $("[data-library-clear]", root)?.addEventListener("click", clearImportedTemplate);

    $("[data-library-refresh]", root)?.addEventListener("click", async () => {
      await loadTemplateLibrary(true);
      state.uiPrepared = false;
      render();
    });
  }

  function bindBody(root) {
    if (state.tab === "library") {
      bindTemplateLibraryBody(root);
      return;
    }

    if (state.tab === "content") {
      bindContentBody(root);
      return;
    }

    /* =====================================================
       INLINE SECTION ORDERING
       - tidak ada menu ordering terpisah
       - ↑ / ↓ ada pada header section
       - drag/drop memakai header section sebagai drag handle
       ===================================================== */

    $$(
      "[data-section-up]",
      root
    ).forEach(button => {
      button.onclick = event => {
        event.preventDefault();
        event.stopPropagation();

        if (button.disabled) {
          return;
        }

        moveSection(
          button.dataset.sectionUp,
          -1
        );
      };
    });

    $$(
      "[data-section-down]",
      root
    ).forEach(button => {
      button.onclick = event => {
        event.preventDefault();
        event.stopPropagation();

        if (button.disabled) {
          return;
        }

        moveSection(
          button.dataset.sectionDown,
          1
        );
      };
    });

    const clearSectionDragState = () => {
      $$(
        ".section.dragging, .section.drag-before, .section.drag-after",
        root
      ).forEach(card => {
        card.classList.remove(
          "dragging",
          "drag-before",
          "drag-after"
        );

        delete card.dataset.dropPlacement;
      });
    };

    $$(
      "[data-section-drag]",
      root
    ).forEach(handle => {
      const card =
        handle.closest(
          "[data-section-card]"
        );

      if (!card) return;

      handle.addEventListener(
        "click",
        event => {
          event.preventDefault();
          event.stopPropagation();
        }
      );

      handle.addEventListener(
        "dragstart",
        event => {
          if (
            handle.disabled ||
            handle.getAttribute(
              "draggable"
            ) !== "true"
          ) {
            event.preventDefault();
            return;
          }

          const id =
            card.dataset.sectionCard;

          card.classList.add(
            "dragging"
          );

          event.dataTransfer.effectAllowed =
            "move";

          event.dataTransfer.setData(
            "text/plain",
            id
          );

          /*
           * Chrome/Safari lebih stabil jika drag image
           * berasal dari card, bukan tombol kecil.
           */
          if (
            typeof event.dataTransfer.setDragImage ===
            "function"
          ) {
            event.dataTransfer.setDragImage(
              card,
              24,
              24
            );
          }
        }
      );

      handle.addEventListener(
        "dragend",
        clearSectionDragState
      );
    });

    $$(
      "[data-section-card]",
      root
    ).forEach(card => {
      card.addEventListener(
        "dragover",
        event => {
          const dragId =
            event.dataTransfer
              ?.getData(
                "text/plain"
              ) ||
            $(
              ".section.dragging",
              root
            )
              ?.dataset
              ?.sectionCard ||
            "";

          const targetId =
            card.dataset.sectionCard;

          if (
            !dragId ||
            dragId === targetId
          ) {
            return;
          }

          const targetSection =
            schemaSections().find(
              section =>
                sectionId(
                  section
                ) ===
                targetId
            );

          if (
            targetId !== "cover" &&
            !isSectionReorderable(
              targetSection
            )
          ) {
            return;
          }

          event.preventDefault();

          event.dataTransfer.dropEffect =
            "move";

          const rect =
            card.getBoundingClientRect();

          let placement =
            event.clientY <
            (
              rect.top +
              rect.height / 2
            )
              ? "before"
              : "after";

          if (
            targetId === "cover"
          ) {
            placement =
              "after";
          }

          $$(
            ".section.drag-before, .section.drag-after",
            root
          ).forEach(other => {
            if (other === card) return;

            other.classList.remove(
              "drag-before",
              "drag-after"
            );

            delete other.dataset.dropPlacement;
          });

          card.dataset.dropPlacement =
            placement;

          card.classList.toggle(
            "drag-before",
            placement === "before"
          );

          card.classList.toggle(
            "drag-after",
            placement === "after"
          );
        }
      );

      card.addEventListener(
        "dragleave",
        event => {
          if (
            event.relatedTarget &&
            card.contains(
              event.relatedTarget
            )
          ) {
            return;
          }

          card.classList.remove(
            "drag-before",
            "drag-after"
          );

          delete card.dataset.dropPlacement;
        }
      );

      card.addEventListener(
        "drop",
        event => {
          const dragId =
            event.dataTransfer.getData(
              "text/plain"
            );

          const targetId =
            card.dataset.sectionCard;

          const placement =
            card.dataset.dropPlacement ||
            (
              targetId === "cover"
                ? "after"
                : "before"
            );

          event.preventDefault();

          clearSectionDragState();

          moveSectionByDrop(
            dragId,
            targetId,
            placement
          );
        }
      );
    });

    $$(".section-head", root).forEach(
      head => {
        head.onclick =
          event => {
            if (
              !event.target.closest(
                ".switch-wrap, .section-actions, .section-move-controls, .section-drag-btn"
              )
            ) {
              head.parentElement
                .classList
                .toggle(
                  "open"
                );
            }
          };
      }
    );

    $$(
      "[data-visible-path]",
      root
    ).forEach(input => {
      input.onchange = () => {
        setPath(
          state.config,
          input.dataset.visiblePath,
          input.checked
        );

        commitConfig(
          input.checked
            ? "Section ditampilkan"
            : "Section disembunyikan"
        );
      };
    });

    $$(
      "[data-field-path]",
      root
    ).forEach(input => {
      if (
        input.dataset
          .autoWeddingId ===
          "1" ||
        input.dataset
          .fieldReadonly ===
          "1" ||
        input.disabled
      ) {
        return;
      }

      input.onchange = () => {
        const type =
          String(
            input.dataset
              .fieldType ||
            "text"
          );

        let value =
          input.value;

        if (
          type ===
          "boolean"
        ) {
          value =
            !!input.checked;
        }

        if (
          type ===
          "number"
        ) {
          value =
            input.value === ""
              ? ""
              : Number(
                  input.value
                );

          if (
            value !== "" &&
            !Number.isFinite(
              value
            )
          ) {
            value = "";
          }
        }

        if (
          type ===
          "datetime"
        ) {
          value =
            localDateTimeToOffset(
              input.value
            );
        }

        setPath(
          state.config,
          input.dataset.fieldPath,
          value
        );

        commitConfig(
          "Konten diperbarui"
        );
      };
    });

    $$(
      "[data-repeat-add]",
      root
    ).forEach(button => {
      button.onclick = () => {
        const path =
          button.dataset.repeatAdd;

        const schemaField =
          schemaSections()
            .flatMap(
              section =>
                section.fields ||
                []
            )
            .find(
              field =>
                field.type ===
                  "repeater" &&
                field.path === path
            );

        let array =
          getPath(
            state.config,
            path
          );

        if (
          !Array.isArray(array)
        ) {
          setPath(
            state.config,
            path,
            []
          );

          array =
            getPath(
              state.config,
              path
            );
        }

        array.push(
          repeaterDefault(
            schemaField ||
            {}
          )
        );

        commitConfig(
          "Item ditambahkan"
        );

        render();
      };
    });

    $$(
      "[data-repeat-delete]",
      root
    ).forEach(button => {
      button.onclick = () => {
        const array =
          getPath(
            state.config,
            button.dataset.repeatDelete
          );

        if (
          !Array.isArray(array)
        ) {
          return;
        }

        array.splice(
          Number(
            button.dataset.repeatIndex
          ),
          1
        );

        commitConfig(
          "Item dihapus"
        );

        render();
      };
    });

    $$(
      "[data-image-path]",
      root
    ).forEach(input => {
      const path =
        input.dataset.imagePath;

      const saveImageUrl = () => {
        const next =
          input.value.trim();

        const current =
          String(
            getPath(
              state.config,
              path
            ) ||
            ""
          );

        if (next === current) {
          return;
        }

        setPath(
          state.config,
          path,
          next
        );

        if (next) {
          setImageSetting(
            path,
            {
              hidden: false
            }
          );
        }

        commitConfig(
          "Gambar diperbarui"
        );

        syncImageCardPreview(
          input,
          path
        );
      };

      input.addEventListener(
        "paste",
        () => {
          setTimeout(
            saveImageUrl,
            0
          );
        }
      );

      input.addEventListener(
        "change",
        saveImageUrl
      );
    });

    $$(
      "[data-image-width-path]",
      root
    ).forEach(range => {
      const path =
        range.dataset.imageWidthPath;

      const number =
        $(
          `[data-image-width-number="${CSS.escape(
            path
          )}"]`,
          root
        );

      range.oninput = () => {
        if (number) {
          number.value =
            range.value;
        }

      };

      range.onchange = () => {
        const width =
          Math.max(
            0,
            Math.min(
              100,
              Number(
                range.value
              ) ||
              0
            )
          );

        setImageSetting(
          path,
          {
            width
          }
        );

        commitConfig();

        const input =
          $(
            `[data-image-path="${CSS.escape(
              path
            )}"]`,
            root
          );

        if (input) {
          syncImageCardPreview(
            input,
            path
          );
        }

        syncImageAdvanceControls(
          root,
          path
        );
      };
    });

    $$(
      "[data-image-width-number]",
      root
    ).forEach(number => {
      const path =
        number.dataset.imageWidthNumber;

      number.oninput = () => {
        const value =
          Math.max(
            0,
            Math.min(
              100,
              Number(
                number.value
              ) ||
              0
            )
          );

        const range =
          $(
            `[data-image-width-path="${CSS.escape(
              path
            )}"]`,
            root
          );

        if (range) {
          range.value =
            value;
        }

      };

      number.onchange = () => {

        const width =
          Math.max(
            0,
            Math.min(
              100,
              Number(
                number.value
              ) ||
              0
            )
          );

        setImageSetting(
          path,
          {
            width
          }
        );

        commitConfig();

        const input =
          $(
            `[data-image-path="${CSS.escape(
              path
            )}"]`,
            root
          );

        if (input) {
          syncImageCardPreview(
            input,
            path
          );
        }

        syncImageAdvanceControls(
          root,
          path
        );
      };
    });

    $$(
      "[data-image-align-path]",
      root
    ).forEach(button => {
      button.onclick = () => {
        const path =
          button.dataset.imageAlignPath;

        const align =
          ["left", "center", "right"]
            .includes(
              button.dataset.imageAlign
            )
            ? button.dataset.imageAlign
            : "center";

        setImageSetting(
          path,
          {
            align
          }
        );

        commitConfig();

        syncImageAdvanceControls(
          root,
          path
        );

        const input =
          $(
            `[data-image-path="${CSS.escape(
              path
            )}"]`,
            root
          );

        if (input) {
          syncImageCardPreview(
            input,
            path
          );
        }
      };
    });

    $$(
      "[data-image-fit-path]",
      root
    ).forEach(button => {
      button.onclick = () => {
        const path =
          button.dataset.imageFitPath;

        const fit =
          FIT_MODES.includes(
            button.dataset.imageFit
          )
            ? button.dataset.imageFit
            : "auto";

        setImageSetting(
          path,
          {
            fit
          }
        );

        commitConfig();

        syncImageAdvanceControls(
          root,
          path
        );

        const input =
          $(
            `[data-image-path="${CSS.escape(
              path
            )}"]`,
            root
          );

        if (input) {
          syncImageCardPreview(
            input,
            path
          );
        }
      };
    });

    $$(
      "[data-image-alignpos-path]",
      root
    ).forEach(button => {
      button.onclick = () => {
        const path =
          button.dataset.imageAlignposPath;

        const alignPos =
          ALIGN_POSITIONS.includes(
            button.dataset.imageAlignpos
          )
            ? button.dataset.imageAlignpos
            : "default";

        setImageSetting(
          path,
          {
            alignPos
          }
        );

        commitConfig();

        syncImageAdvanceControls(
          root,
          path
        );

        const input =
          $(
            `[data-image-path="${CSS.escape(
              path
            )}"]`,
            root
          );

        if (input) {
          syncImageCardPreview(
            input,
            path
          );
        }
      };
    });

    $$(
      "[data-image-ratio-path]",
      root
    ).forEach(button => {
      button.onclick = () => {
        const path =
          button.dataset.imageRatioPath;

        const ratio =
          RATIO_OPTIONS.includes(
            button.dataset.imageRatio
          )
            ? button.dataset.imageRatio
            : "16:9";

        setImageSetting(
          path,
          {
            ratio
          }
        );

        commitConfig();

        syncImageAdvanceControls(
          root,
          path
        );

        const input =
          $(
            `[data-image-path="${CSS.escape(
              path
            )}"]`,
            root
          );

        if (input) {
          syncImageCardPreview(
            input,
            path
          );
        }
      };
    });

    const resetImagesButton =
      $(
        "#" +
        ID +
        "-reset-images",
        root
      );

    if (resetImagesButton) {
      resetImagesButton.onclick = () => {
        resetAllImages();
      };
    }

    $$(
      "[data-image-delete-path]",
      root
    ).forEach(button => {
      button.onclick = () => {
        deleteStaticImageFrame(
          button.dataset
            .imageDeletePath
        );
      };
    });

    $$(
      "[data-image-paste-path]",
      root
    ).forEach(button => {
      button.onclick = async event => {
        event.preventDefault();
        event.stopPropagation();

        await pasteImageUrlFromClipboard(
          root,
          button.dataset.imagePastePath
        );
      };
    });

    $$(
      "[data-image-open-advance]",
      root
    ).forEach(button => {
      button.onclick = () => {
        const path =
          button.dataset
            .imageOpenAdvance;

        const card =
          $(
            `[data-image-card-path="${CSS.escape(
              path
            )}"]`,
            root
          );

        const details =
          card
            ? $(
                ".image-advance",
                card
              )
            : null;

        if (details) {
          const nextOpen = !details.open;
          details.open = nextOpen;

          button.setAttribute(
            "aria-expanded",
            String(nextOpen)
          );

          button.setAttribute(
            "aria-label",
            nextOpen
              ? "Tutup pengaturan gambar"
              : "Buka pengaturan gambar"
          );

          button.title = nextOpen
            ? "Tutup pengaturan gambar"
            : "Pengaturan gambar";

          button.classList.toggle(
            "active",
            nextOpen
          );

          if (nextOpen) {
            details.scrollIntoView({
              block: "nearest",
              behavior: "smooth"
            });
          } else {
            const card = button.closest(
              ".image-card"
            );

            card?.scrollIntoView({
              block: "nearest",
              behavior: "smooth"
            });
          }
        }
      };
    });

    $$(
      "[data-gallery-delete-index]",
      root
    ).forEach(button => {
      button.onclick = () => {
        const path =
          button.dataset
            .galleryDeleteIndex;

        const index =
          Number(
            button.dataset
              .galleryIndex
          );

        deleteGalleryItem(
          path,
          index
        );
      };
    });

    $$(
      "[data-gallery-add]",
      root
    ).forEach(button => {
      button.onclick = () => {
        const path =
          button.dataset.galleryAdd;

        let array =
          getPath(
            state.config,
            path
          );

        if (
          !Array.isArray(array)
        ) {
          setPath(
            state.config,
            path,
            []
          );

          array =
            getPath(
              state.config,
              path
            );
        }

        const index =
          array.length;

        const schema =
          repeaterImageFieldByRootPath(
            path
          );

        const imageField =
          repeaterImageSubField(
            schema
          );

        const imageKey =
          String(
            imageField?.key ||
            "src"
          );

        const nextItem =
          schema
            ? repeaterDefault(
                schema
              )
            : {};

        if (
          !Object.prototype
            .hasOwnProperty
            .call(
              nextItem,
              imageKey
            )
        ) {
          nextItem[
            imageKey
          ] = "";
        }

        array.push(
          nextItem
        );

        ensureImageSettingsObject()[
          path +
          "." +
          index +
          "." +
          imageKey
        ] = {
          width: 100,
          align: "center",
          alignPos: "default",
          fit: "auto",
          ratio: "1:1"
        };

        commitConfig(
          "Foto gallery ditambah"
        );

        render();
      };
    });

    $$(
      "[data-color-token-var]",
      root
    ).forEach(input => {
      const variable =
        input.dataset.colorTokenVar;

      const picker =
        $(
          `[data-color-var="${CSS.escape(
            variable
          )}"]`,
          root
        );

      const syncFromText = (
        restoreInvalid = false
      ) => {
        const next =
          input.value.trim();

        if (
          !next ||
          !isCssColorValue(
            next
          )
        ) {
          if (restoreInvalid) {
            const current =
              cssVarValue(
                variable
              );

            if (current) {
              input.value =
                current;
            }
          }

          return;
        }

        setCssVar(
          variable,
          next
        );

        if (picker) {
          picker.value =
            cssColorToHex(
              next,
              picker.value ||
              "#000000"
            );
        }
      };

      /*
       * Realtime jika kode sudah valid, misalnya #ff0059.
       * Saat user masih mengetik "#ff", editor tidak memaksa reset.
       */
      input.oninput = () => {
        syncFromText(false);
      };

      input.onchange = () => {
        const next =
          input.value.trim();

        if (
          next &&
          isCssColorValue(
            next
          )
        ) {
          syncFromText(true);
        } else {
          syncFromText(true);
        }
      };
    });

    $$(
      "[data-color-var]",
      root
    ).forEach(input => {
      input.oninput = () => {
        const variable =
          input.dataset.colorVar;

        setCssVar(
          variable,
          input.value
        );

        const textInput =
          $(
            `[data-color-token-var="${CSS.escape(
              variable
            )}"]`,
            root
          );

        if (textInput) {
          textInput.value =
            input.value;
        }
      };
    });

    const resetStyleButton =
      $(
        "#" +
        ID +
        "-reset-style",
        root
      );

    if (resetStyleButton) {
      resetStyleButton.onclick = () => {
        resetStylePanel();
      };
    }

    $$(
      "[data-style-var]",
      root
    ).forEach(input => {
      const variable =
        input.dataset.styleVar;

      const applyStyleValue = () => {
        const next =
          String(
            input.value || ""
          ).trim();

        if (!next) return;

        if (
          variable ===
            "--sve-heading-weight" ||
          variable ===
            "--sve-body-weight"
        ) {
          const target =
            variable ===
              "--sve-heading-weight"
              ? "heading"
              : "body";

          if (
            !fontSupportsWeight(
              target,
              next
            )
          ) {
            const current =
              cssVarValue(
                variable
              );

            if (current) {
              input.value =
                current;
            }

            return;
          }
        }

        setCssVar(
          variable,
          next
        );

        if (
          variable ===
            "--sve-heading-weight" ||
          variable ===
            "--sve-body-weight"
        ) {
          updateGoogleFontsHead();
        }
      };

      input.onchange =
        applyStyleValue;

      if (
        input.tagName === "SELECT"
      ) {
        input.oninput =
          applyStyleValue;
      }
    });

    $$(
      "[data-reset-token]",
      root
    ).forEach(button => {
      button.onclick = () => {
        const variable =
          button.dataset.resetToken;

        const value =
          defaultCssVar(
            variable
          );

        if (!value) return;

        setCssVar(
          variable,
          value
        );

        const textInput =
          $(
            `[data-color-token-var="${CSS.escape(
              variable
            )}"], [data-style-var="${CSS.escape(
              variable
            )}"]`,
            root
          );

        const picker =
          $(
            `[data-color-var="${CSS.escape(
              variable
            )}"]`,
            root
          );

        if (textInput) {
          const options =
            textInput.tagName === "SELECT"
              ? Array.from(
                  textInput.options
                ).map(
                  option =>
                    option.value
                )
              : [];

          if (
            !options.length ||
            options.includes(
              value
            )
          ) {
            textInput.value =
              value;
          }
        }

        if (picker) {
          picker.value =
            cssColorToHex(
              value,
              picker.value
            );
        }
      };
    });

    $(
      "#" +
      ID +
      "-reset-colors",
      root
    )
      ?.addEventListener(
        "click",
        () => {
          COLOR_FIELDS.forEach(
            (
              [
                ,
                ,
                variable
              ]
            ) => {
              const current =
                cssVarValue(
                  variable
                );

              if (!current) return;

              setCssVar(
                variable,
                defaultCssVar(
                  variable
                ) ||
                current
              );
            }
          );

          $$(
            "[data-color-token-var]",
            root
          ).forEach(input => {
            const variable =
              input.dataset.colorTokenVar;

            const value =
              cssVarValue(
                variable
              );

            if (value) {
              input.value =
                value;
            }
          });

          $$(
            "[data-color-var]",
            root
          ).forEach(input => {
            const variable =
              input.dataset.colorVar;

            input.value =
              cssColorToHex(
                cssVarValue(
                  variable
                ),
                input.value
              );
          });
        }
      );

    $(
      "#" +
      ID +
      "-reset-all",
      root
    )
      ?.addEventListener(
        "click",
        resetAll
      );

    const headingInput =
      $(
        "#" +
        ID +
        "-heading-font",
        root
      );

    const bodyInput =
      $(
        "#" +
        ID +
        "-body-font",
        root
      );

    [
      [
        "heading",
        headingInput
      ],
      [
        "body",
        bodyInput
      ]
    ].forEach(
      ([
        target,
        input
      ]) => {
        input?.addEventListener(
          "keydown",
          event => {
            if (
              event.key !==
              "Enter"
            ) {
              return;
            }

            event.preventDefault();

            applyGoogleFont(
              target
            );
          }
        );
      }
    );

    $(
      "#" +
      ID +
      "-heading-font-apply",
      root
    )
      ?.addEventListener(
        "click",
        () =>
          applyGoogleFont(
            "heading"
          )
      );

    $(
      "#" +
      ID +
      "-body-font-apply",
      root
    )
      ?.addEventListener(
        "click",
        () =>
          applyGoogleFont(
            "body"
          )
      );

    const audioInput =
      $(
        "#" +
        ID +
        "-audio-url",
        root
      );

    if (audioInput) {
      const audioField =
        schemaAudio();

      const audioPath =
        audioField.path ||
        "assets.audio";

      const saveAudioUrl = () => {
        const next =
          audioInput.value.trim();

        const current =
          getPath(
            state.config,
            audioPath
          );

        if (
          typeof current === "string" &&
          current === next
        ) {
          syncAudioStartUi(
            root,
            next
          );

          return;
        }

        setPath(
          state.config,
          audioPath,
          next
        );

        commitConfig(
          "Audio diperbarui"
        );

        syncAudioStartUi(
          root,
          next
        );
      };

      audioInput.addEventListener(
        "paste",
        () => {
          setTimeout(
            saveAudioUrl,
            0
          );
        }
      );

      audioInput.addEventListener(
        "change",
        saveAudioUrl
      );

      const startEnabled =
        $(
          "#" +
          ID +
          "-audio-start-enabled",
          root
        );

      const startInput =
        $(
          "#" +
          ID +
          "-audio-start-time",
          root
        );

      const saveStartTime = () => {
        if (
          !startEnabled ||
          !startInput
        ) {
          return;
        }

        const currentUrl =
          audioInput.value.trim();

        const seconds =
          startEnabled.checked
            ? parseTimeValueToSeconds(
                startInput.value
              )
            : 0;

        const nextUrl =
          withYoutubeStartTime(
            currentUrl,
            seconds
          );

        audioInput.value =
          nextUrl;

        startInput.disabled =
          !startEnabled.checked;

        if (
          startEnabled.checked
        ) {
          startInput.value =
            formatAudioStartTime(
              seconds
            );
        }

        setPath(
          state.config,
          audioPath,
          nextUrl
        );

        commitConfig(
          seconds > 0
            ? "Waktu mulai audio diperbarui"
            : "Waktu mulai audio dimatikan"
        );
      };

      startEnabled
        ?.addEventListener(
          "change",
          () => {
            startInput.disabled =
              !startEnabled.checked;

            if (
              startEnabled.checked &&
              parseTimeValueToSeconds(
                startInput.value
              ) <= 0
            ) {
              startInput.value =
                "0:00";

              startInput.focus();
            }

            saveStartTime();
          }
        );

      startInput
        ?.addEventListener(
          "change",
          saveStartTime
        );
    }
  }

  /* =========================================================
     SCALEV SAVE
     ========================================================= */

  function flushEditors() {
    Object
      .values(
        state.editors
      )
      .forEach(
        editor => {
          if (!editor) return;

          try {
            editor.save?.();

            const textarea =
              editor.getTextArea?.();

            textarea?.dispatchEvent(
              new Event(
                "input",
                {
                  bubbles: true
                }
              )
            );

            textarea?.dispatchEvent(
              new Event(
                "change",
                {
                  bubbles: true
                }
              )
            );
          } catch (_) {}
        }
      );
  }

  function nativeSaveButton() {
    return (
      $$("button").find(
        button => {
          if (
            button.closest(
              "#" + ID
            )
          ) {
            return false;
          }

          const text =
            (
              button.textContent ||
              ""
            )
              .replace(
                /\s+/g,
                " "
              )
              .trim()
              .toLowerCase();

          return (
            text === "simpan" ||
            text === "save"
          );
        }
      ) ||
      null
    );
  }

  function openSupportWhatsApp() {
    const url =
      "https://wa.me/" +
      SUPPORT_WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(
        SUPPORT_WHATSAPP_TEXT
      );

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  }

  function saveScalev() {
    flushEditors();
    parseAll();

    const report =
      strictCompatibilityReport();

    if (report.blockers.length) {
      state.tab = "compatibility";

      const app =
        document.getElementById(ID);

      $$(".tab", app).forEach(tab => {
        tab.classList.toggle(
          "active",
          tab.dataset.tab === "compatibility"
        );
      });

      render();
      return;
    }

    const status =
      $(
        "#" +
        ID +
        "-save-status"
      );

    const button =
      nativeSaveButton();

    if (!button) {
      if (status) {
        status.textContent =
          "Simpan belum tersedia";
      }

      return;
    }

    if (status) {
      status.textContent =
        "Menyimpan...";
    }

    button.click();

    state.dirty = false;

    setTimeout(
      () => {
        if (status) {
          status.textContent =
            "Tersimpan";
        }
      },
      900
    );
  }

  /* =========================================================
     UI CSS
     ========================================================= */

  function injectStyles() {
    const style =
      document.createElement(
        "style"
      );

    style.id =
      ID +
      "-style";

    style.textContent = `
      #${ID},
      #${ID} * {
        box-sizing: border-box;
      }

      #${ID}.sve-lite .tab[data-tab="style"],
      #${ID}.sve-lite .tab[data-tab="audio"],
      #${ID}.sve-lite .tab[data-tab="compatibility"] {
        display: none !important;
      }

      :root {
        --sve77-panel-width: min(400px, 32vw);
        --sve77-global-header-height: 47px;
      }

      html.sve77-panel-open {
        overflow-x: hidden !important;
      }

      /*
       * Flow workspace: benar-benar reserve lebar panel baru.
       */
      html.sve77-panel-open
      [data-sve77-page-root="1"]
      [data-sve77-never] {
        display: none;
      }

      html.sve77-panel-open
      [data-sve77-page-root="1"][data-sve77-layout="flow"] {
        width: calc(100% - var(--sve77-panel-width)) !important;
        max-width: calc(100% - var(--sve77-panel-width)) !important;
        margin-right: var(--sve77-panel-width) !important;
        box-sizing: border-box !important;
        transition:
          width .16s ease,
          max-width .16s ease,
          margin-right .16s ease !important;
      }

      /*
       * Fixed/absolute workspace: gunakan right offset seperti
       * benar-benar ada sidebar kanan baru.
       */
      html.sve77-panel-open
      [data-sve77-page-root="1"][data-sve77-layout="positioned"] {
        right: var(--sve77-panel-width) !important;
        width: auto !important;
        max-width: none !important;
        box-sizing: border-box !important;
        transition: right .16s ease !important;
      }

      [data-sve77-top-toolbar="1"] {
        right: var(--sve77-panel-width) !important;
        box-sizing: border-box !important;
      }

      [data-sve77-toolbar-host="1"] {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        transform: none !important;
      }

      [data-sve77-toolbar-host="1"] > button {
        margin-left: 0 !important;
        margin-right: 0 !important;
      }

      #${ID}-toolbar-toggle {
        flex: 0 0 auto !important;
        white-space: nowrap;
        margin: 0 !important;
        background: #fff !important;
        border-color: #0899cf !important;
        color: #0899cf !important;
      }

      #${ID}-toolbar-toggle.sve-toolbar-active {
        background: #0899cf !important;
        border-color: #0899cf !important;
        color: #fff !important;
      }

      #${ID} {
        --p: #0899cf;
        --line: #dbdfe5;
        --soft: #f3f6f9;
        --txt: #202c3b;
        --muted: #738092;

        font-feature-settings: normal;
        font-variation-settings: normal;
        tab-size: 4;
        -webkit-tap-highlight-color: transparent;
        font-size: 16px;
        word-spacing: 1px;
        text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;

        --color-primary: #0899cf;
        --container-max-width: 1186px;
        --system-font-quill: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

        font-family: "Roboto", var(--system-font-quill);
        line-height: inherit;
        color: var(--txt);
      }

      #${ID}-dock {
        position: fixed;

        top:
          var(
            --sve77-global-header-height,
            44px
          );

        right: 0;
        bottom: auto;

        width:
          var(--sve77-panel-width);

        height:
          calc(
            100vh -
            var(
              --sve77-global-header-height,
              44px
            )
          );

        min-height:
          calc(
            100% -
            var(
              --sve77-global-header-height,
              44px
            )
          );

        /*
         * Paint-first layering contract:
         * - global header Scalev stays above SVE (z-50)
         * - SVE shell must be above the native editor toolbar (z-40)
         *   from the very first frame, before deferred push-layout runs.
         * This keeps Konten/Gambar/Warna/Style/Audio/Status visible
         * immediately without putting geometry scans back on the click path.
         */
        z-index: 41;

        display: none;
        flex-direction: column;
        overflow: hidden;

        background-color: rgba(255,255,255,1);

        border-top: 0;
        border-right: 0;
        border-bottom: 0;
        border-left:
          2px solid
          #dbdfe5;

        border-radius: 0;
        box-shadow: none;
      }

      #${ID}.open
      #${ID}-dock {
        display: flex;
      }

      #${ID}-exit-prompt {
        position: absolute;
        top: 12px;
        right: 12px;
        z-index: 5;
        display: flex;
        width: min(360px, calc(100% - 24px));
        flex-direction: row;
        overflow: hidden;
        border: 2px solid #d99a14;
        border-radius: 4px;
        background: #fff8e7;
        box-shadow: 0 4px 12px rgba(32, 44, 59, .14);
        color: var(--txt);
        text-align: left;
      }

      #${ID}-exit-prompt[hidden] {
        display: none;
      }

      #${ID}-exit-prompt .exit-prompt-close {
        flex: 0 0 auto;
        order: 3;
        align-self: flex-start;
        margin: 8px 8px 0 0;
        z-index: 1;
        display: inline-flex;
        width: 24px;
        height: 24px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 0;
        padding: 0;
        background: transparent;
        color: #5b6675;
      }

      #${ID}-exit-prompt .exit-prompt-close svg {
        width: 12px;
        height: 12px;
      }

      #${ID}-exit-prompt .exit-prompt-content {
        order: 2;
        min-width: 0;
        overflow-y: auto;
        padding: 10px 0 10px 12px;
        line-height: 18px;
      }

      #${ID}-exit-prompt::before {
        content: "!";
        order: 1;
        flex: 0 0 auto;
        align-self: flex-start;
        width: 32px;
        height: 32px;
        margin: 10px 0 0 10px;
        border-radius: 4px;
        background: #d99a14;
        color: #fff;
        font-size: 22px;
        line-height: 32px;
        font-weight: 700;
        text-align: center;
      }

      #${ID}-exit-prompt h2 {
        margin: 0;
        color: #5b3b00;
        font-size: 13px;
        line-height: 16px;
        font-weight: 700;
      }

      #${ID}-exit-prompt p {
        margin: 2px 0 0;
        color: #202c3b;
        font-size: 12px;
        line-height: 16px;
        font-weight: 500;
      }

      #${ID}-exit-prompt .exit-prompt-actions {
        display: flex;
        justify-content: flex-start;
        gap: 8px;
        margin-top: 8px;
      }

      #${ID}-exit-prompt .exit-prompt-actions button {
        display: inline-flex;
        min-width: 72px;
        min-height: 32px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 2px solid var(--p);
        border-radius: 4px;
        padding: 6px 10px;
        font: inherit;
        font-size: 12px;
        line-height: 16px;
        font-weight: 500;
        text-align: center;
        transition: background-color .1s ease, color .1s ease;
      }

      #${ID}-exit-prompt .exit-prompt-actions button:focus {
        outline: 2px solid var(--p);
        outline-offset: 2px;
      }

      #${ID}-exit-prompt .exit-prompt-keep {
        background: #fff;
        color: var(--p);
      }

      #${ID}-exit-prompt .exit-prompt-exit {
        background: var(--p);
        color: #fff;
      }


      /*
       * Menu utama Visual Editor meniru tab native Scalev:
       * relative flex, border bottom 2px, font 12px,
       * active 700 dan indicator 5px.
       */
      #${ID} .tabs-shell {
        position: relative;
        flex: 0 0 auto;
        display: flex;
        width: 100%;
        align-items: stretch;
        border-top: 0;
        border-bottom: 2px solid var(--line);
        background: #fff;
      }

      #${ID} .tabs {
        position: relative;
        margin-top: 1px;
        display: flex;
        flex: 1 1 auto;
        min-width: 0;
        list-style: none;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-x: auto;
        padding: 0 8px;
        border: 0;
        scrollbar-width: none;
      }

      #${ID} .tabs::-webkit-scrollbar {
        display: none;
      }

      #${ID} .tab {
        position: relative;
        display: flex;
        flex: 0 0 auto;
        cursor: pointer;
        justify-content: center;
        padding: 16px 8px;
        border: 0;
        background: #fff;
        color: #5b6675;
        font-size: 12px;
        line-height: normal;
        font-weight: 500;
        white-space: nowrap;
      }

      #${ID} .tab.active {
        color: #171717;
        font-weight: 700;
      }

      #${ID} .tab.active::after {
        content: "";
        position: absolute;
        left: 8px;
        right: 8px;
        bottom: 0;
        height: 5px;
        border-radius: 5px 5px 0 0;
        background: #0899cf;
        pointer-events: none;
      }

      #${ID} .panel-tools {
        display: flex;
        flex: 0 0 auto;
        align-items: stretch;
        background: #fff;
      }

      #${ID} .panel-tool {
        display: inline-flex;
        width: 40px;
        min-width: 40px;
        align-items: center;
        justify-content: center;
        padding: 0 8px;
        border: 0;
        background: #fff;
        color: #5b6675;
        font-size: 20px;
        line-height: 1;
        cursor: pointer;
      }

      #${ID} .panel-tool:hover {
        background: #f3f6f9;
        color: #202c3b;
      }

      #${ID} .panel-collapse {
        width: 44px;
        min-width: 44px;
        padding: 0 8px;
        font-size: 24px;
        color: #7a8798;
      }

      #${ID} .panel-collapse-icon {
        width: 24px;
        height: 24px;
        display: inline-flex;
        overflow: visible;

        /*
         * Icon native Scalev menghadap kiri untuk sidebar kiri.
         * Karena Visual Editor berada di kanan, icon yang sama
         * dicerminkan agar arah collapse menuju sisi kanan.
         */
        transform: rotate(180deg);
      }

      #${ID} .toolbar {
        padding:
          10px 14px;

        border-bottom:
          1px solid
          var(--line);
      }

      #${ID} .search {
        width: 100%;
        height: 38px;

        padding:
          0 10px;

        border:
          2px solid
          var(--line);

        border-radius: 5px;

        outline: 0;
      }

      #${ID} .search:focus {
        border-color:
          var(--p);
      }

      #${ID} .body {
        flex: 1;

        min-height: 0;

        overflow-y: auto;

        padding:
          12px 14px
          80px;
      }

      #${ID} .notice {
        margin-bottom: 11px;

        padding: 10px;

        border-radius: 5px;

        background:
          var(--soft);

        color:
          var(--muted);

        font-size: 10px;

        line-height: 1.5;
      }

      #${ID} .sve-empty-template {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      #${ID} .sve-empty-template strong {
        color: var(--text);
        font-size: 12px;
        font-weight: 600;
        line-height: 1.35;
      }

      #${ID} .sve-empty-template span {
        color: var(--muted);
        font-size: 11px;
        line-height: 1.4;
      }

      #${ID} code {
        font-family:
          ui-monospace,
          SFMono-Regular,
          Menlo,
          monospace;

        font-size: 9px;
      }

      #${ID} .section,
      #${ID} .group {
        margin-bottom: 10px;

        border:
          2px solid
          var(--line);

        border-radius: 6px;

        overflow: hidden;

        background: #fff;
      }

      #${ID} .section.open {
        border-color:
          var(--p);
      }

      #${ID} .section-head {
        min-height: 50px;

        display: flex;

        align-items: center;

        background:
          var(--soft);

        cursor: pointer;
      }

      #${ID} .section-title {
        flex: 1;

        min-width: 0;

        padding:
          9px 11px;
      }

      #${ID} .section-title strong {
        display: block;

        font-size: 13px;
      }

      #${ID} .section-title small {
        display: block;

        margin-top: 2px;

        color:
          var(--muted);

        font-size: 9px;
      }

      #${ID} .section-actions {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-left: 6px;
      }

      #${ID} .section.dragging {
        opacity: .44;

        transform:
          scale(.985);
      }

      #${ID} .section.drag-before {
        box-shadow:
          0 -4px 0
          var(--p),
          0 -8px 18px
          rgba(
            9,
            175,
            237,
            .18
          );
      }

      #${ID} .section.drag-after {
        box-shadow:
          0 4px 0
          var(--p),
          0 8px 18px
          rgba(
            9,
            175,
            237,
            .18
          );
      }

      #${ID} .section-reordered-up {
        animation:
          sve77-section-up
          .30s ease-out;
      }

      #${ID} .section-reordered-down {
        animation:
          sve77-section-down
          .30s ease-out;
      }

      @keyframes sve77-section-up {
        0% {
          transform:
            translateY(12px);

          box-shadow:
            0 0 0 2px
            rgba(
              9,
              175,
              237,
              .18
            );
        }

        100% {
          transform:
            translateY(0);

          box-shadow:
            0 0 0 0
            rgba(
              9,
              175,
              237,
              0
            );
        }
      }

      @keyframes sve77-section-down {
        0% {
          transform:
            translateY(-12px);

          box-shadow:
            0 0 0 2px
            rgba(
              9,
              175,
              237,
              .18
            );
        }

        100% {
          transform:
            translateY(0);

          box-shadow:
            0 0 0 0
            rgba(
              9,
              175,
              237,
              0
            );
        }
      }

      #${ID} .section-move-controls {
        display: flex;
        flex: 0 0 auto;
        align-items: center;

        padding:
          8px 0
          8px 5px;
      }

      #${ID} .section-drag-btn,
      #${ID} .section-move-btn {
        width: 29px;
        height: 29px;

        display: inline-flex;
        align-items: center;
        justify-content: center;

        padding: 0;

        border:
          1px solid
          #c9d0d9;

        background:
          #cbd2dc;

        color:
          #566476;

        line-height: 1;

        cursor: pointer;
      }

      #${ID} .section-drag-btn {
        margin-right: 5px;

        border-radius:
          6px;

        cursor: grab;
      }

      #${ID} .section-drag-btn:active {
        cursor: grabbing;
      }

      #${ID} .section-drag-icon {
        width: 18px;
        height: 18px;

        pointer-events: none;
      }

      #${ID} .section-move-btn {
        font-size: 16px;
      }

      #${ID} .section-move-up {
        border-radius:
          6px 0 0 6px;
      }

      #${ID} .section-move-down {
        margin-left: -1px;

        border-radius:
          0 6px 6px 0;
      }

      #${ID} .section-arrow-icon {
        width: 16px;
        height: 16px;

        pointer-events: none;
      }

      #${ID} .section-arrow-up {
        transform:
          rotate(90deg);
      }

      #${ID} .section-arrow-down {
        transform:
          rotate(270deg);
      }

      #${ID}
      .section-drag-btn:hover:not(:disabled),

      #${ID}
      .section-move-btn:hover:not(:disabled) {
        position: relative;
        z-index: 1;

        border-color:
          var(--p);

        background:
          #eefaff;

        color:
          var(--p);
      }

      #${ID}
      .section-drag-btn:disabled,

      #${ID}
      .section-move-btn:disabled {
        background:
          transparent;

        border-color:
          transparent;

        color:
          #758294;

        opacity: .52;

        cursor:
          default;
      }

      #${ID} .section-pinned
      .section-move-controls {
        opacity: .72;
      }

      #${ID} .chev {
        width: 38px;
        height: 38px;

        display: inline-flex;
        align-items: center;
        justify-content: center;

        padding: 0;

        border: 0;

        background:
          transparent;

        color:
          #697689;

        cursor: pointer;
      }

      #${ID} .section-chevron {
        width: 18px;
        height: 18px;

        pointer-events: none;

        transition:
          transform .15s ease;
      }

      #${ID} .section.open
      .section-chevron {
        transform:
          rotate(180deg);
      }

      #${ID} .section-body {
        display: none;

        padding: 10px;

        border-top:
          1px solid
          var(--line);
      }

      #${ID} .section.open
      .section-body {
        display: block;
      }

      #${ID} .group-title {
        padding:
          9px 10px;

        background:
          var(--soft);

        font-size: 11px;

        font-weight: 700;
      }

      #${ID} .typography-summary {
        min-height: 42px;

        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;

        cursor: pointer;

        list-style: none;
        user-select: none;
      }

      #${ID}
      .typography-summary::-webkit-details-marker {
        display: none;
      }

      #${ID} .typography-chevron {
        width: 18px;
        height: 18px;

        flex: 0 0 18px;

        color: #697689;

        pointer-events: none;

        transition:
          transform .15s ease;
      }

      #${ID}
      .typography-dropdown[open]
      .typography-chevron {
        transform:
          rotate(180deg);
      }

      #${ID} .typography-body {
        background: #fff;
      }

      #${ID}
      .typography-body
      .field:first-child {
        border-top:
          1px solid
          #edf0f3;
      }

      #${ID} .field {
        padding: 10px;

        border-top:
          1px solid
          #edf0f3;
      }

      #${ID} .group-body
      .field:first-child {
        border-top: 0;
      }

      #${ID} label {
        display: block;

        margin-bottom: 6px;

        color:
          #586679;

        font-size: 10px;
        font-weight: 650;
      }

      #${ID} .style-select {
        width: 100%;
        height: 38px;

        padding:
          0 30px
          0 9px;

        border:
          2px solid
          var(--line);

        border-radius: 5px;

        outline: 0;

        background: #fff;

        color:
          var(--txt);

        font: inherit;

        font-size: 11px;

        cursor: pointer;
      }

      #${ID} .style-select:focus {
        border-color:
          var(--p);
      }

      #${ID}
      input[type="text"],

      #${ID}
      input[type="number"],

      #${ID}
      input[type="datetime-local"],

      #${ID}
      textarea {
        width: 100%;

        border:
          2px solid
          var(--line);

        border-radius: 5px;

        outline: 0;

        font: inherit;

        font-size: 12px;

        background: #fff;
      }

      #${ID}
      input[type="text"],

      #${ID}
      input[type="number"],

      #${ID}
      input[type="datetime-local"] {
        height: 39px;

        padding:
          0 9px;
      }

      #${ID} textarea {
        min-height: 74px;

        padding: 9px;

        resize: vertical;
      }

      #${ID} input:focus,
      #${ID} textarea:focus {
        border-color:
          var(--p);
      }

      #${ID}
      input[data-auto-wedding-id="1"] {
        border-color:
          #cfd7e1;

        background:
          #f1f4f7;

        color:
          #536174;

        cursor:
          not-allowed;

        user-select:
          all;
      }

      #${ID}
      input[data-auto-wedding-id="1"]:focus {
        border-color:
          #cfd7e1;

        box-shadow:
          none;
      }

      #${ID}
      .auto-wedding-id-note {
        display:
          block;

        margin-top:
          6px;

        color:
          #7a8798;

        font-size:
          9px;

        line-height:
          1.35;
      }

      #${ID} select {
        width: 100%;
        min-height: 38px;

        border:
          1px solid
          var(--line);

        border-radius:
          8px;

        background:
          #fff;

        padding:
          8px 10px;

        color:
          #263243;

        font:
          inherit;
      }

      #${ID} select:focus {
        border-color:
          var(--p);

        outline:
          none;
      }

      #${ID}
      [data-field-readonly="1"] {
        background:
          #f1f4f7;

        color:
          #536174;

        cursor:
          not-allowed;
      }

      #${ID}
      .boolean-field {
        min-height:
          38px;

        display:
          flex;

        align-items:
          center;

        gap:
          9px;

        padding:
          8px 10px;

        border:
          1px solid
          var(--line);

        border-radius:
          8px;

        background:
          #fff;
      }

      #${ID}
      .boolean-field input {
        width:
          16px;

        height:
          16px;

        min-height:
          0;

        margin:
          0;

        flex:
          0 0 auto;
      }

      #${ID}
      .field-help {
        display:
          block;

        margin-top:
          6px;

        color:
          #7a8798;

        font-size:
          9px;

        line-height:
          1.4;
      }

      #${ID}
      .repeater-warning {
        margin-bottom:
          8px;
      }

      #${ID} .compatibility-panel {
        display: grid;
        gap: 10px;
      }

      #${ID} .compat-detail-group + .compat-detail-group {
        margin-top: 12px;
      }

      #${ID} .compat-detail-group > strong {
        display: block;
        margin-bottom: 5px;
        font-size: 11px;
        font-weight: 600;
        color: var(--text);
      }

      #${ID} .compat-version {
        display: block;
        margin-top: 12px;
        color: var(--muted);
        font-size: 9px;
      }

      #${ID} .compat-status {
        display: flex;
        flex-direction: column;
        gap: 3px;
        padding: 12px;
        border: 1px solid var(--line);
        border-radius: 7px;
        background: var(--soft);
      }

      #${ID} .compat-status strong {
        font-size: 12px;
      }

      #${ID} .compat-status span {
        font-size: 10px;
        opacity: .72;
      }

      #${ID} .compat-pass {
        border-color: #52a36b;
        background: #edf9f0;
      }

      #${ID} .compat-warning {
        border-color: #c89734;
        background: #fff8e7;
      }

      #${ID} .compat-blocker {
        border-color: #df4d5b;
        background: #fff0f2;
      }

      #${ID} .compat-list ul {
        margin: 0;
        padding-left: 18px;
      }

      #${ID} .compat-list li,
      #${ID} .compat-empty {
        margin: 0 0 6px;
        font-size: 10px;
        line-height: 1.45;
      }

      #${ID} .compat-code {
        max-height: 250px;
        overflow: auto;
        margin: 0;
        padding: 9px;
        border-radius: 5px;
        background: #111827;
        color: #f9fafb;
        font-size: 9px;
        line-height: 1.45;
        white-space: pre-wrap;
        word-break: break-word;
      }


      #${ID} .style-reset-zone {
        padding-top: 10px;
      }

      #${ID} .button {
        min-height: 39px;

        padding:
          0 10px;

        border:
          2px solid
          var(--p);

        border-radius: 5px;

        background: #fff;

        color:
          var(--p);

        font-size: 11px;
        font-weight: 700;

        cursor: pointer;
      }

      #${ID} .button.primary {
        background:
          var(--p);

        color: #fff;
      }

      #${ID} .button.secondary {
        border-color: var(--line);
        background: #fff;
        color: var(--txt);
      }

      #${ID} .button.secondary:hover:not(:disabled) {
        border-color: var(--p);
        color: var(--p);
      }

      #${ID} .save-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        flex: 0 0 auto;
      }

      #${ID} .button.support {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;

        border-color:
          #25D366;

        background:
          #25D366;

        color:
          #fff;
      }

      #${ID} .button.support:hover {
        border-color:
          #1ebe5d;

        background:
          #1ebe5d;
      }

      #${ID} .button.editor-update {
        border-color: var(--p);
        background: #fff;
        color: var(--p);
      }

      #${ID} .button.editor-update:hover {
        border-color: var(--p);
        background: #f2f5f8;
      }

      #${ID} .update-status {
        display: block;
        margin-top: 3px;
        color: var(--muted);
        font-size: 9px;
        line-height: 1.25;
      }

      #${ID} .support-icon {
        width: 15px;
        height: 15px;
        flex: 0 0 15px;
        fill: currentColor;
        pointer-events: none;
      }

      #${ID} .button.danger {
        border-color:
          #e7515e;

        color:
          #e7515e;
      }

      #${ID} .button.full {
        width: 100%;
      }

      #${ID} .button:disabled {
        opacity: .45;

        cursor:
          not-allowed;
      }

      #${ID} .template-library-panel {
        display: grid;
        gap: 12px;
      }

      #${ID} .library-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
      }

      #${ID} .library-header-actions {
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        gap: 6px;
      }

      #${ID} .library-heading {
        min-width: 0;
        display: grid;
        gap: 4px;
      }

      #${ID} .library-heading h2 {
        margin: 0;
        color: var(--txt);
        font-size: 16px;
        font-weight: 700;
        line-height: 21px;
      }

      #${ID} .library-header strong {
        display: block;
        color: var(--txt);
        font-size: 13px;
        line-height: 18px;
      }

      #${ID} .library-header small {
        color: var(--muted);
        font-size: 10px;
        line-height: 14px;
      }

      #${ID} .library-header .button {
        min-height: 32px;
        flex: 0 0 auto;
        padding: 0 9px;
        font-size: 10px;
      }

      #${ID} .library-alert,
      #${ID} .library-empty {
        padding: 10px;
        border: 1px solid var(--line);
        border-radius: 5px;
        background: var(--soft);
        color: var(--muted);
        font-size: 10px;
        line-height: 15px;
      }

      #${ID} .library-summary {
        display: flex;
        align-items: baseline;
        gap: 5px;
        color: var(--muted);
        font-size: 10px;
        line-height: 14px;
      }

      #${ID} .library-summary strong {
        color: var(--txt);
        font-size: 12px;
      }

      #${ID} .library-alert-warning {
        border-color: #c89734;
        background: #fff8e7;
        color: #765b16;
      }

      #${ID} .library-alert {
        display: grid;
        gap: 3px;
      }

      #${ID} .library-alert strong {
        color: #5f4811;
        font-size: 11px;
      }

      #${ID} .library-alert-action {
        justify-self: start;
        margin-top: 4px;
        min-height: 30px !important;
      }

      #${ID} .library-card {
        display: block;
        margin-bottom: 16px;
        padding: 12px;
        border: 2px solid var(--line);
        border-radius: 4px;
        background: #fff;
        transition: border-color .16s ease, background-color .16s ease;
      }

      #${ID} .library-card:last-child {
        margin-bottom: 0;
      }

      #${ID} .library-card:hover {
        border-color: var(--p);
        background: #fff;
      }

      #${ID} .library-card.is-active {
        border-color: var(--p);
        background: rgba(8, 153, 207, .05);
      }

      #${ID} .library-card-copy {
        min-width: 0;
        flex: 1 1 auto;
      }

      #${ID} .library-card-row {
        display: flex;
        min-width: 0;
        align-items: flex-start;
        gap: 12px;
      }

      #${ID} .library-card-heading {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 8px;
      }

      #${ID} .library-card-heading h3 {
        min-width: 0;
        margin: 0;
        overflow: hidden;
        color: var(--txt);
        font-size: 13px;
        font-weight: 600;
        line-height: 16px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      #${ID} .library-card-description {
        margin: 4px 0 0;
        color: var(--muted);
        font-size: 11px;
        line-height: 16px;
      }

      #${ID} .library-commission {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-top: 4px;
        color: var(--muted);
        font-size: 11px;
        line-height: 16px;
      }

      #${ID} .library-commission svg {
        width: 17px;
        height: 17px;
        flex: 0 0 17px;
        color: var(--muted);
        vertical-align: middle;
      }

      #${ID} .library-card.is-active .library-commission > svg {
        color: var(--p);
      }

      #${ID} .library-commission > svg:nth-of-type(2) {
        display: none;
      }

      #${ID} .library-commission > svg:nth-of-type(1) {
        order: 1;
      }

      #${ID} .library-commission > span:nth-of-type(1) {
        order: 2;
      }

      #${ID} .library-commission > span:nth-of-type(2) {
        order: 3;
      }

      #${ID} .library-commission > span:nth-of-type(3) {
        order: 4;
      }

      #${ID} .library-import-button {
        min-width: 80px;
        min-height: 36px;
        padding: 10px 12px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
      }

      #${ID} .library-card-actions {
        flex: 0 0 auto;
      }

      #${ID} .library-loading {
        display: grid;
        gap: 16px;
      }

      #${ID} .library-skeleton-card {
        height: 64px;
        border: 2px solid var(--line);
        border-radius: 4px;
        background: linear-gradient(90deg, #f3f6f9 25%, #e9eef3 50%, #f3f6f9 75%);
        background-size: 200% 100%;
        animation: sve77-library-loading 1.3s ease-in-out infinite;
      }

      @keyframes sve77-library-loading {
        from { background-position: 100% 0; }
        to { background-position: -100% 0; }
      }

      #${ID} .library-empty {
        display: grid;
        gap: 3px;
      }

      #${ID} .library-empty strong {
        color: var(--txt);
        font-size: 11px;
        line-height: 15px;
      }

      #${ID} .library-empty span {
        color: var(--muted);
        font-size: 10px;
        line-height: 14px;
      }

      #${ID} .library-refresh-button {
        white-space: nowrap;
      }

      #${ID} .library-clear-button {
        min-width: 0;
        min-height: 32px;
        padding: 0 9px;
        font-size: 10px;
        font-weight: 600;
        white-space: nowrap;
      }

      @media (prefers-reduced-motion: reduce) {
        #${ID} .library-card,
        #${ID} .library-skeleton-card {
          transition: none;
          animation: none;
        }
      }

      @media (max-width: 980px) {
        #${ID} .library-header {
          align-items: stretch;
        }
      }

      #${ID} .mini {
        margin-top: 6px;

        padding: 0;

        border: 0;

        background:
          transparent;

        color:
          #677486;

        font-size: 9px;

        text-decoration:
          underline;

        cursor: pointer;
      }

      #${ID} .font-apply {
        margin-top: 10px !important;
      }

      #${ID} .two {
        display: grid;

        grid-template-columns:
          1fr 1fr;

        gap: 8px;

        margin-top: 9px;
      }

      /* =====================================================
         v0.8.2 — SCALEV NATIVE MEDIA DENSITY + RIGHT ACTION RAIL
         Thumbnail is clean. Edit/Delete/Setting live in a dedicated
         action rail on the right side of the card main row.
         ===================================================== */

      #${ID} .image-card {
        display: block;
        margin-bottom: 12px;
        padding: 10px;
        overflow: hidden;
        border: 2px solid #dbdfe5;
        border-radius: 4px;
        background: #fff;
      }

      #${ID} .image-card .image-card-main {
        display: flex;
        min-width: 0;
        align-items: flex-start;
        gap: 10px;
      }

      #${ID} .image-card .image-card-meta {
        min-width: 0;
        flex: 1 1 auto;
        padding-top: 1px;
      }

      #${ID} .image-card .image-card-name,
      #${ID} .image-card .image-card-path {
        margin: 0;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      #${ID} .image-card .image-card-name {
        color: #243244;
        font-family: "Roboto", var(--system-font-quill);
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
      }

      #${ID} .image-card .image-card-path {
        margin-top: 4px;
        color: #697689;
        font-family: "Roboto", var(--system-font-quill);
        font-size: 10px;
        font-weight: 400;
        line-height: 14px;
      }

      #${ID} .image-card .image-preview-shell {
        position: relative;
        width: 68px;
        height: 68px;
        flex: 0 0 68px;
        aspect-ratio: auto;
        margin: 0;
        overflow: hidden;
        border-radius: 4px;
        background: #eef1f4;
      }

      #${ID} .image-card .image-preview-shell .preview {
        width: 100%;
        height: 100%;
        max-width: none;
        min-height: 0;
        max-height: none;
        margin: 0;
        object-fit: cover;
      }

      #${ID} .image-card .image-card-actions {
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: flex-end;
        gap: 4px;
        margin-left: auto;
        padding-top: 0;
      }

      #${ID} .image-card .image-card-action {
        display: inline-flex;
        width: 28px;
        height: 28px;
        flex: 0 0 28px;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 1px solid #dbdfe5;
        border-radius: 4px;
        background: #fff;
        color: #697689;
        cursor: pointer;
      }

      #${ID} .image-card .image-card-action svg {
        width: 14px;
        height: 14px;
      }

      #${ID} .image-card .image-action-delete {
        color: #ef4d5d;
      }

      #${ID} .image-card .image-action-setting {
        color: #697689;
      }

      #${ID} .image-card .image-action-setting.active,
      #${ID} .image-card .image-action-setting[aria-expanded="true"] {
        border-color: var(--p);
        background: rgba(9,175,237,.08);
        color: var(--p);
      }

      #${ID} .image-card .image-card-action:hover,
      #${ID} .image-card .image-card-action:focus-visible {
        border-color: currentColor;
        background: #f8fafb;
        outline: 0;
      }

      #${ID} .image-card .image-url-row {
        display: flex;
        min-width: 0;
        width: 100%;
        margin-top: 10px;
        overflow: hidden;
        border: 1px solid #dbdfe5;
        border-radius: 4px;
        background: #f8fafb;
      }

      #${ID} .image-card .image-url-row:focus-within {
        border-color: var(--p);
      }

      #${ID} .image-card .image-url-row input[type="text"] {
        min-width: 0;
        width: 1px;
        flex: 1 1 auto;
        padding: 7px 8px;
        border: 0;
        border-radius: 0;
        background: transparent;
        color: #243244;
        font-family: "Roboto", var(--system-font-quill);
        font-size: 10px;
        font-weight: 400;
        line-height: 14px;
      }

      #${ID} .image-card .image-url-row input[type="text"]:focus {
        outline: 0;
      }

      #${ID} .image-card .image-paste-button {
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 7px 8px;
        border: 0;
        border-left: 1px solid #dbdfe5;
        background: #fff;
        color: var(--p);
        font-family: "Roboto", var(--system-font-quill);
        font-size: 11px;
        font-weight: 600;
        line-height: 14px;
        white-space: nowrap;
        cursor: pointer;
      }

      #${ID} .image-card .image-paste-button svg {
        width: 14px;
        height: 14px;
        flex: 0 0 14px;
      }

      #${ID} .image-card .image-paste-button:hover,
      #${ID} .image-card .image-paste-button:focus-visible {
        background: rgba(9,175,237,.06);
        outline: 0;
      }

      #${ID} .image-card .image-upload-placeholder {
        min-height: 0;
        padding: 0;
      }

      #${ID} .image-card .image-upload-title,
      #${ID} .image-card .image-upload-note {
        display: none;
      }

      #${ID} .image-card .image-upload-icon {
        margin: 0;
      }

      #${ID} .image-card .image-upload-icon svg {
        width: 20px;
        height: 20px;
      }

      /* Closed Advance must not add vertical bulk to every media row. */
      #${ID} .image-card .image-advance:not([open]) {
        display: none;
      }

      #${ID} .image-card .image-advance[open] {
        margin-top: 10px;
        border-top: 1px solid #edf0f3;
      }

      #${ID} .image-card .advance-summary {
        min-height: 36px;
        padding: 0 2px;
        background: #fff;
        font-size: 11px;
        font-weight: 600;
      }

      @media (max-width: 345px) {
        #${ID} .image-card .image-card-main {
          gap: 8px;
        }

        #${ID} .image-card .image-card-actions {
          flex-direction: column;
          gap: 3px;
        }

        #${ID} .image-card .image-card-action {
          width: 26px;
          height: 26px;
          flex-basis: 26px;
        }
      }

      #${ID} .image-card-hidden {
        opacity: 1;
      }

      #${ID} .image-global-reset {
        margin:
          4px 0 16px;
      }

      #${ID} .gallery-add-wrap {
        margin:
          0 0 16px;
      }

      #${ID} .gallery-add-button {
        width: 100%;

        min-height: 46px;

        display: inline-flex;

        align-items: center;
        justify-content: center;

        padding:
          12px 14px;

        border:
          2px solid
          var(--p);

        border-radius: 4px;

        background: #fff;

        color:
          var(--p);

        font: inherit;

        font-size: 12px;
        font-weight: 500;

        line-height: 19.6px;

        cursor: pointer;
      }

      #${ID} .gallery-add-button:hover {
        background:
          #f7fcfe;
      }

      #${ID} .preview {
        display: block;

        width: 100%;
        height: 100%;

        max-width: none;
        min-height: 0;
        max-height: none;

        margin: 0;

        object-fit: cover;

        border:
          1px solid
          var(--line);

        border-radius: 5px;

        background:
          var(--soft);
      }

      #${ID} .preview.empty {
        border:
          2px dashed
          #b8c0ca;

        color:
          #8b97a6;

        background:
          #f6f9fc;
      }

      #${ID} .image-upload-placeholder {
        display: flex;

        flex-direction: column;

        align-items: center;
        justify-content: center;

        gap: 10px;

        padding: 18px;

        font: inherit;

        text-align: center;

        cursor: pointer;
      }

      #${ID}
      .image-upload-placeholder:hover {
        border-color:
          var(--p);

        background:
          #f7fcfe;
      }

      #${ID} .image-upload-icon {
        display: inline-flex;

        color:
          var(--p);

        font-size: 20px;

        line-height: 1;
      }

      #${ID}
      .image-upload-icon svg {
        width: 20px;
        height: 20px;
      }

      #${ID} .image-upload-title {
        color:
          var(--p);

        font-size: 12px;

        font-weight: 500;

        line-height: 20px;
      }

      #${ID}
      .image-upload-title b {
        color:
          #ef4d5d;

        font-weight: 600;
      }

      #${ID} .image-upload-note {
        color:
          #6f7c8d;

        font-size: 10px;

        font-weight: 400;

        line-height: 16px;
      }

      #${ID} .image-advance {
        width: 100%;

        margin-top: 10px;

        border: 0;

        border-radius: 4px;

        overflow: hidden;

        background: #fff;
      }

      #${ID} .advance-summary {
        width: 100%;
        min-height: 42px;

        display: flex;

        align-items: center;

        justify-content:
          space-between;

        gap: 8px;

        padding:
          0 10px
          0 11px;

        background:
          var(--soft);

        color:
          #1f2b3a;

        font-size: 11px;
        font-weight: 700;

        cursor: pointer;

        list-style: none;

        user-select: none;
      }

      #${ID}
      .advance-summary::-webkit-details-marker {
        display: none;
      }

      #${ID} .advance-chevron {
        flex:
          0 0 auto;

        width: 18px;
        height: 18px;

        color:
          #5b6675;

        transition:
          transform .15s ease;
      }

      #${ID}
      .image-advance:not([open])
      .advance-chevron {
        transform:
          rotate(180deg);
      }

      #${ID} .advance-body {
        width: 100%;

        height: auto;

        padding: 10px;

        background: #fff;
      }

      #${ID} .advance-design-title {
        margin:
          0 0 6px;

        color:
          #243244;

        font-size: 11px;
        font-weight: 700;

        line-height: 16px;
      }

      #${ID} .advance-group {
        padding:
          10px 0 12px;

        border-bottom:
          2px solid
          var(--line);
      }

      #${ID} .advance-group-last {
        padding-bottom: 11px;
      }

      #${ID} .advance-label {
        display: block;

        margin:
          0 0 10px;

        color:
          #5b6675;

        font-size: 10px;
        font-weight: 650;

        line-height: 15px;
      }

      #${ID} .advance-pos-grid {
        display: grid;

        grid-template-columns:
          repeat(
            3,
            minmax(
              0,
              1fr
            )
          );

        gap: 8px;
      }

      #${ID} .advance-pos-btn {
        min-width: 0;
        min-height: 42px;

        display: inline-flex;

        align-items: center;

        justify-content: center;

        padding:
          0 4px;

        border:
          2px solid
          #d7dbe0;

        border-radius: 4px;

        background: #fff;

        color:
          #5b6675;

        cursor: pointer;
      }

      #${ID} .advance-pos-btn.active {
        border-color:
          var(--p);
      }

      #${ID} .advance-pos-btn:hover {
        border-color:
          var(--p);
      }

      #${ID} .advance-pos-icon {
        display: block;

        width: 20px;
        height: 20px;

        opacity: .72;
      }

      #${ID}
      .advance-pos-btn.active
      .advance-pos-icon,
      #${ID}
      .advance-pos-btn:hover
      .advance-pos-icon,
      #${ID}
      .advance-pos-default.active
      .advance-pos-icon,
      #${ID}
      .advance-pos-default:hover
      .advance-pos-icon {
        opacity: 1;
      }

      #${ID} .advance-pos-default {
        width: 100%;
        min-height: 40px;

        display: inline-flex;

        align-items: center;

        justify-content: center;

        gap: 8px;

        margin-top: 8px;

        padding:
          0 8px;

        border:
          2px solid
          #d7dbe0;

        border-radius: 4px;

        background: #fff;

        color:
          #414b59;

        font-size: 11px;
        font-weight: 650;

        cursor: pointer;
      }

      #${ID} .advance-pos-default.active,
      #${ID} .advance-pos-default:hover {
        border-color:
          var(--p);
      }

      #${ID} .range-row {
        display: grid;

        grid-template-columns:
          minmax(
            0,
            1fr
          )
          72px;

        gap: 10px;

        align-items: center;
      }

      #${ID} input[type="range"] {
        width: 100%;

        accent-color:
          var(--p);

        cursor: pointer;
      }

      #${ID} .range-number {
        display: grid;

        grid-template-columns:
          1fr 20px;

        align-items: center;

        border:
          2px solid
          var(--line);

        border-radius: 4px;

        overflow: hidden;

        background:
          var(--soft);
      }

      #${ID} .range-number input {
        height:
          40px !important;

        border:
          0 !important;

        text-align: right;

        padding:
          0 4px !important;

        background:
          transparent !important;
      }

      #${ID} .range-number span {
        font-size: 12px;

        color:
          #1f2b3a;
      }

      #${ID} .advance-fit-grid {
        display: grid;

        grid-template-columns:
          repeat(
            3,
            minmax(
              0,
              1fr
            )
          );

        gap: 10px;
      }

      #${ID} .advance-fit-btn {
        min-width: 0;

        display: flex;
        flex-wrap: wrap;

        justify-content: center;

        padding: 10px;

        border:
          2px solid
          #d7dbe0;

        border-radius: 4px;

        background: #fff;

        color:
          #5b6675;

        cursor: pointer;
      }

      #${ID} .advance-fit-btn.active {
        border-color:
          var(--p);
      }

      #${ID} .advance-fit-preview {
        position: relative;

        width: 100%;
        height: 68px;

        display: block;

        overflow: hidden;

        border-radius: 4px;

        background:
          #dfe4ea;
      }

      #${ID} .advance-fit-preview::after {
        content: "";

        position: absolute;

        top: 0;
        bottom: 0;

        background:
          #aeb8c5;
      }

      #${ID}
      .advance-fit-preview.auto::after {
        left: 6px;
        right: 6px;
      }

      #${ID}
      .advance-fit-preview.cover::after {
        left: 0;
        right: 0;
      }

      #${ID}
      .advance-fit-preview.contain::after {
        left: 15px;
        right: 15px;
      }

      #${ID} .advance-fit-label {
        width: 100%;

        margin-top: 10px;

        color:
          #414b59;

        font-size: 11px;
        font-weight: 650;
      }

      #${ID} .advance-ratio-grid {
        display: grid;

        grid-template-columns:
          repeat(
            4,
            minmax(
              0,
              1fr
            )
          );

        gap: 10px 8px;
      }

      #${ID} .advance-ratio-btn {
        min-width: 0;
        min-height: 42px;

        display: inline-flex;

        align-items: center;

        justify-content: center;

        padding:
          0 4px;

        border:
          2px solid
          #d7dbe0;

        border-radius: 4px;

        background: #fff;

        color:
          #414b59;

        font-size: 10px;
        font-weight: 650;

        cursor: pointer;
      }

      #${ID} .advance-ratio-btn.active,
      #${ID} .advance-ratio-btn:hover {
        border-color:
          var(--p);
      }

      #${ID} .audio-field {
        padding:
          12px 10px 10px;
      }

      #${ID} .audio-start-row {
        display: grid;

        grid-template-columns:
          18px
          minmax(0, 1fr)
          72px;

        gap: 8px;

        align-items: center;

        margin-top: 12px;

        padding:
          12px 0 0;

        border-top:
          1px solid
          #edf0f3;
      }

      #${ID} .audio-start-check {
        width: 18px !important;
        height: 18px !important;

        margin: 0 !important;
        padding: 0 !important;

        accent-color:
          var(--p);

        cursor: pointer;
      }

      #${ID} .audio-start-label {
        margin: 0 !important;

        color:
          var(--txt);

        font-size: 11px;
        font-weight: 650;

        cursor: pointer;
      }

      #${ID} .audio-start-time {
        width: 72px !important;
        height: 34px !important;

        padding:
          0 6px !important;

        text-align: center;

        font-size: 11px;

        font-variant-numeric:
          tabular-nums;
      }

      #${ID} .audio-start-time:disabled {
        opacity: .55;

        background:
          var(--soft);
      }

      #${ID} .color-row {
        display: grid;

        grid-template-columns:
          44px 1fr;

        gap: 9px;

        align-items: center;
      }


      #${ID} .colors-empty {
        margin: 0;
        padding: 12px;

        display: flex;
        flex-direction: column;
        gap: 3px;

        border:
          1px solid
          #dbdfe5;

        border-radius: 4px;

        background:
          #f6f9fc;

        color:
          #202c3b;
      }

      #${ID} .colors-empty strong {
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
      }

      #${ID} .colors-empty span {
        color: #697689;
        font-size: 11px;
        font-weight: 400;
        line-height: 16px;
      }

      #${ID} .color-unset-swatch {
        width: 44px;
        height: 44px;

        border:
          2px dashed
          #dbdfe5;

        border-radius: 5px;

        background:
          #f6f9fc;
      }

      #${ID} .color-row-unset input:disabled {
        color: #8a95a3;
        background: #f6f9fc;
        cursor: not-allowed;
      }

      #${ID}
      input[type="color"] {
        width: 44px;
        height: 44px;

        padding: 2px;

        border:
          2px solid
          var(--line);

        border-radius: 5px;
      }

      #${ID} .color-row small {
        display: block;

        margin-top: 4px;

        color:
          var(--muted);

        font-size: 8px;
      }

      #${ID} .repeat-item {
        margin: 8px;

        border:
          1px solid
          var(--line);

        border-radius: 5px;
      }

      #${ID} .repeat-head {
        display: flex;

        align-items: center;

        padding:
          8px 9px;

        background:
          var(--soft);
      }

      #${ID} .repeat-head strong {
        flex: 1;

        font-size: 10px;
      }

      #${ID} .repeat-head button {
        border: 0;

        background:
          transparent;

        color:
          #df4d5b;

        font-size: 9px;

        cursor: pointer;
      }

      #${ID} .switch-wrap {
        margin-right: 8px;
      }

      #${ID} .switch-wrap input {
        display: none;
      }

      #${ID} .switch {
        display: block;

        position: relative;

        width: 34px;
        height: 19px;

        border-radius: 12px;

        background:
          #bdc6d0;

        cursor: pointer;
      }

      #${ID} .switch::after {
        content: "";

        position: absolute;

        top: 3px;
        left: 3px;

        width: 13px;
        height: 13px;

        border-radius: 50%;

        background: #fff;

        transition: .15s;
      }

      #${ID}
      .switch-wrap
      input:checked
      + .switch {
        background:
          var(--p);
      }

      #${ID}
      .switch-wrap
      input:checked
      + .switch::after {
        transform:
          translateX(
            15px
          );
      }

      #${ID} .helper {
        margin:
          7px 0 0;

        color:
          var(--muted);

        font-size: 9px;

        line-height: 1.45;
      }

      #${ID} .reset-zone {
        display: grid;

        gap: 8px;

        margin-top: 20px;
      }

      #${ID} .savebar {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        min-height: 72px;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 12px;
        align-items: center;
        padding: 9px 12px;
        border-top: 2px solid var(--line);
        background: #fff;
      }

      #${ID} .footer-meta {
        min-width: 0;
      }

      #${ID} .footer-meta strong {
        display: block;
        overflow: hidden;
        color: #202c3b;
        font-size: 11px;
        line-height: 1.25;
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      #${ID} .footer-meta small {
        display: block;
        margin-top: 2px;
        overflow: hidden;
        color: #738092;
        font-size: 9px;
        line-height: 1.25;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      #${ID} .save-status {
        display: block;
        margin-top: 3px;
        color: var(--muted);
        font-size: 9px;
        line-height: 1.2;
      }

      #${ID} .font-manual-help {
        margin-top: 6px;

        color: #738092;

        font-size: 10px;
        line-height: 1.4;
      }

      #${ID} .font-google-link {
        display: inline-flex;

        margin-top: 7px;

        align-items: center;

        color: #0798cf;

        font-size: 11px;
        line-height: 1.3;
        font-weight: 600;

        text-decoration: none;
      }

      #${ID} .font-google-link:hover,
      #${ID} .font-google-link:focus {
        color: #087da8;

        text-decoration: underline;
      }



      /* =====================================================
         v0.7.7 — UNIFIED CONTENT CONTROL SYSTEM
         ===================================================== */

      #${ID} .section-head {
        min-height: 44px;
      }

      #${ID} .section-title {
        padding: 7px 9px;
      }

      #${ID} .section-title strong {
        font-size: 11px;
        line-height: 1.25;
        font-weight: 700;
      }

      #${ID} .section-title small {
        margin-top: 1px;
        font-size: 8.5px;
        line-height: 1.25;
      }

      #${ID} .section-body {
        padding: 8px;
      }

      #${ID} .group-title {
        padding: 7px 9px;
        font-size: 10px;
        line-height: 1.3;
      }

      #${ID} .field {
        padding: 8px 9px;
      }

      #${ID} label {
        margin-bottom: 5px;
        font-size: 9.5px;
        line-height: 1.3;
        font-weight: 650;
      }

      #${ID} .content-field-label-sr {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
      }

      #${ID} input.content-control,
      #${ID} textarea.content-control,
      #${ID} select.content-control,
      #${ID} .style-select,
      #${ID} select[data-field-path] {
        width: 100%;
        height: 38px;
        min-height: 38px;
        padding: 0 10px;
        border: 1px solid var(--line);
        border-radius: 8px;
        outline: 0;
        background: #fff;
        color: var(--txt);
        font: inherit;
        font-size: 11px;
        line-height: 1.3;
        box-shadow: none;
      }

      #${ID} textarea.content-control {
        min-height: 78px;
        height: auto;
        padding: 9px 10px;
        line-height: 1.45;
      }

      #${ID} input.content-control:focus,
      #${ID} textarea.content-control:focus,
      #${ID} select.content-control:focus,
      #${ID} .style-select:focus,
      #${ID} select[data-field-path]:focus,
      #${ID} .content-url-shell:focus-within {
        border-color: var(--p);
        box-shadow: 0 0 0 2px rgba(9,175,237,.1);
      }

      #${ID} .content-control[type="date"],
      #${ID} .content-control[type="time"],
      #${ID} .content-control[type="datetime-local"] {
        appearance: none;
        -webkit-appearance: none;
        color-scheme: light;
        font-size: 11px;
      }

      #${ID} .content-control::-webkit-calendar-picker-indicator {
        width: 15px;
        height: 15px;
        margin: 0;
        padding: 2px;
        opacity: .62;
        cursor: pointer;
      }

      #${ID} .content-url-shell {
        display: grid;
        grid-template-columns: auto minmax(0,1fr);
        align-items: center;
        min-height: 38px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #fff;
        overflow: hidden;
      }

      #${ID} .content-url-badge {
        height: 100%;
        min-width: 43px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 8px;
        border-right: 1px solid #e5e9ef;
        background: var(--soft);
        color: #66758a;
        font-size: 8px;
        font-weight: 800;
        letter-spacing: .08em;
      }

      #${ID} .content-url-shell .content-control-url {
        height: 36px;
        min-height: 36px;
        border: 0;
        border-radius: 0;
        box-shadow: none;
      }

      #${ID} .repeat-item {
        margin: 7px;
        border-radius: 7px;
      }

      #${ID} .repeat-head {
        min-height: 34px;
        padding: 6px 8px;
      }

      #${ID} .repeat-head strong {
        font-size: 9.5px;
        line-height: 1.25;
      }

      #${ID} .repeat-head button {
        font-size: 8.5px;
      }

      #${ID} .typography-summary {
        min-height: 38px;
      }

      #${ID} .typography-role {
        padding: 8px 9px 9px;
        border-top: 1px solid #edf0f3;
      }

      #${ID} .typography-role:first-child {
        border-top: 0;
      }

      #${ID} .typography-role-title {
        margin-bottom: 6px;
        color: #435168;
        font-size: 9.5px;
        font-weight: 750;
      }

      #${ID} .typography-control-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 6px;
      }

      #${ID} .typography-control label {
        margin-bottom: 4px;
        font-size: 8px;
      }

      #${ID} .typography-control .style-select {
        height: 34px;
        min-height: 34px;
        padding: 0 22px 0 7px;
        border-radius: 7px;
        font-size: 9.5px;
      }

      #${ID} .compatibility-panel {
        display: grid;
        gap: 7px;
      }

      #${ID} .compat-status {
        gap: 4px;
        padding: 9px 10px;
        border-radius: 8px;
      }

      #${ID} .compat-status-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      #${ID} .compat-status-row strong {
        font-size: 11px;
      }

      #${ID} .compat-status-row span,
      #${ID} .compat-status small {
        font-size: 8.5px;
        line-height: 1.35;
      }

      #${ID} .compat-status small {
        display: block;
        opacity: .75;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      #${ID} .compat-metrics {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 5px;
      }

      #${ID} .compat-metrics .metric {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4px;
        min-width: 0;
        padding: 6px 7px;
        border: 1px solid var(--line);
        border-radius: 7px;
        background: #fff;
        font-size: 8.5px;
      }

      #${ID} .compat-detail {
        margin: 0;
        border: 1px solid var(--line);
        border-radius: 7px;
        background: #fff;
        overflow: hidden;
      }

      #${ID} .compat-detail summary {
        min-height: 34px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 6px 9px;
        list-style: none;
        cursor: pointer;
        font-size: 9.5px;
        font-weight: 650;
      }

      #${ID} .compat-detail summary::-webkit-details-marker {
        display: none;
      }

      #${ID} .compat-detail summary b {
        min-width: 23px;
        padding: 2px 5px;
        border-radius: 999px;
        background: var(--soft);
        text-align: center;
        font-size: 8px;
      }

      #${ID} .compat-detail-body {
        padding: 7px 9px;
        border-top: 1px solid #edf0f3;
      }

      #${ID} .compat-list li,
      #${ID} .compat-empty {
        margin-bottom: 4px;
        font-size: 9px;
        line-height: 1.35;
      }

      #${ID} .compat-code {
        max-height: 160px;
        padding: 7px;
        font-size: 8px;
      }

      /* v0.7.8: status panel must never overflow the editor width. */
      #${ID} .compatibility-panel,
      #${ID} .compat-status,
      #${ID} .compat-status-row,
      #${ID} .compat-metrics,
      #${ID} .compat-detail,
      #${ID} .compat-detail summary,
      #${ID} .compat-detail-body,
      #${ID} .compat-list,
      #${ID} .compat-list ul,
      #${ID} .compat-list li,
      #${ID} .compat-empty {
        min-width: 0;
        max-width: 100%;
      }

      #${ID} .compatibility-panel,
      #${ID} .compat-status,
      #${ID} .compat-detail {
        width: 100%;
        overflow: hidden;
      }

      #${ID} .compat-status-row > *,
      #${ID} .compat-detail summary > * {
        min-width: 0;
      }

      #${ID} .compat-status small {
        display: -webkit-box;
        max-width: 100%;
        white-space: normal;
        overflow: hidden;
        overflow-wrap: anywhere;
        word-break: break-word;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      #${ID} .compat-list ul {
        padding-right: 2px;
      }

      #${ID} .compat-list li,
      #${ID} .compat-empty,
      #${ID} .compat-code {
        overflow-wrap: anywhere;
        word-break: break-word;
      }

      /* =====================================================
         v0.8.0 — SCALEV-NATIVE STYLE PANEL SYSTEM
         Source target: native HTML Mode / Media / Security forms.
         Editor chrome is intentionally independent from theme fonts.
         ===================================================== */

      #${ID}-body[data-sve-tab="style"] {
        padding: 16px 16px 80px;
        font-family: "Roboto", var(--system-font-quill);
        font-feature-settings: normal;
        font-variation-settings: normal;
        tab-size: 4;
        -webkit-tap-highlight-color: transparent;
        font-size: 16px;
        word-spacing: 1px;
        text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        line-height: inherit;
        color: #202c3b;
      }

      #${ID}-body[data-sve-tab="style"] .group {
        margin-bottom: 16px;
        border: 2px solid #dbdfe5;
        border-radius: 4px;
        background: #fff;
        overflow: hidden;
      }

      #${ID}-body[data-sve-tab="style"] .group-title {
        min-height: 42px;
        display: flex;
        align-items: center;
        padding: 10px 12px;
        background: #fff;
        color: #202c3b;
        font-family: "Roboto", var(--system-font-quill);
        font-size: 13px;
        font-weight: 600;
        line-height: 18px;
        letter-spacing: 0;
        word-spacing: 1px;
      }

      #${ID}-body[data-sve-tab="style"] .field {
        padding: 12px;
        border-top: 1px solid #edf0f3;
      }

      #${ID}-body[data-sve-tab="style"] .field > label,
      #${ID}-body[data-sve-tab="style"] .typography-control > label {
        display: block;
        margin: 0 0 8px;
        color: #4c596a;
        font-family: "Roboto", var(--system-font-quill);
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
        letter-spacing: 0;
        word-spacing: 1px;
      }

      #${ID}-body[data-sve-tab="style"] input[type="text"],
      #${ID}-body[data-sve-tab="style"] input[type="number"],
      #${ID}-body[data-sve-tab="style"] .style-select {
        width: 100%;
        height: 42px;
        min-height: 42px;
        padding: 0 12px;
        border: 2px solid #dbdfe5;
        border-radius: 4px;
        outline: none;
        background: #fff;
        color: #202c3b;
        font-family: "Roboto", var(--system-font-quill);
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0;
        word-spacing: 1px;
        box-shadow: none;
      }

      #${ID}-body[data-sve-tab="style"] input[type="text"]::placeholder,
      #${ID}-body[data-sve-tab="style"] input[type="number"]::placeholder {
        color: #8a95a3;
        opacity: 1;
      }

      #${ID}-body[data-sve-tab="style"] input[type="text"]:focus,
      #${ID}-body[data-sve-tab="style"] input[type="number"]:focus,
      #${ID}-body[data-sve-tab="style"] .style-select:focus {
        border-color: #0899cf;
        box-shadow: none;
      }

      #${ID}-body[data-sve-tab="style"] .font-manual-help {
        margin-top: 6px;
        color: #697689;
        font-family: "Roboto", var(--system-font-quill);
        font-size: 11px;
        font-weight: 400;
        line-height: 16px;
        word-spacing: 1px;
      }

      #${ID}-body[data-sve-tab="style"] .font-google-link {
        margin-top: 8px;
        color: #0899cf;
        font-family: "Roboto", var(--system-font-quill);
        font-size: 11px;
        font-weight: 600;
        line-height: 16px;
      }

      #${ID}-body[data-sve-tab="style"] .button {
        min-height: 40px;
        padding: 0 16px;
        border: 2px solid #0899cf;
        border-radius: 4px;
        background: #fff;
        color: #0899cf;
        font-family: "Roboto", var(--system-font-quill);
        font-size: 13px;
        font-weight: 500;
        line-height: 18px;
        letter-spacing: 0;
        word-spacing: 1px;
      }

      #${ID}-body[data-sve-tab="style"] .button.primary {
        background: #0899cf;
        color: #fff;
      }

      #${ID}-body[data-sve-tab="style"] .font-apply {
        margin-top: 10px !important;
      }

      #${ID}-body[data-sve-tab="style"] .typography-summary {
        min-height: 42px;
        justify-content: space-between;
        cursor: pointer;
      }

      #${ID}-body[data-sve-tab="style"] .typography-role {
        padding: 12px;
        border-top: 1px solid #edf0f3;
      }

      #${ID}-body[data-sve-tab="style"] .typography-role-title {
        margin-bottom: 10px;
        color: #202c3b;
        font-family: "Roboto", var(--system-font-quill);
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
        letter-spacing: 0;
        word-spacing: 1px;
      }

      #${ID}-body[data-sve-tab="style"] .typography-control-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }

      #${ID}-body[data-sve-tab="style"] .typography-control > label {
        margin-bottom: 6px;
        font-size: 11px;
        line-height: 16px;
      }

      #${ID}-body[data-sve-tab="style"] .typography-control .style-select {
        height: 40px;
        min-height: 40px;
        padding: 0 28px 0 10px;
        font-size: 13px;
        line-height: 18px;
      }

      #${ID}-body[data-sve-tab="style"] .style-reset-zone {
        padding-top: 0;
        margin-top: 0;
      }

      @media (max-width: 430px) {
        #${ID}-body[data-sve-tab="style"] {
          padding-left: 12px;
          padding-right: 12px;
        }

        #${ID}-body[data-sve-tab="style"] .typography-control-grid {
          grid-template-columns: 1fr;
        }
      }

      @media(
        max-width:900px
      ) {
        :root {
          --sve77-panel-width: min(360px, 42vw);
        }
      }

      /* =====================================================
         v0.8.7 — Native Scalev image URL row
         Exact density follows HTML Mode > Media URL rows.
         ===================================================== */
      #${ID} .image-card .image-url-row {
        display: flex;
        min-width: 0;
        width: 100%;
        min-height: 30px;
        margin-top: 10px;
        overflow: hidden;
        border: 1px solid #dbdfe5;
        border-radius: 4px;
        background: #f6f9fc;
      }

      #${ID} .image-card .image-url-row input[type="text"] {
        width: auto;
        min-width: 0;
        height: auto;
        min-height: 0;
        flex: 1 1 0%;
        padding: 7px 8px;
        border: 0;
        border-radius: 0;
        background: transparent;
        color: #202c3b;
        font-family: "Roboto", var(--system-font-quill);
        font-size: 10px;
        font-weight: 400;
        line-height: 14px;
        box-shadow: none;
      }

      #${ID} .image-card .image-paste-button {
        min-width: 0;
        min-height: 0;
        height: auto;
        flex: 0 0 auto;
        padding: 7px 8px;
        border: 0;
        border-left: 1px solid #dbdfe5;
        border-radius: 0;
        background: #fff;
        color: #0899cf;
        font-family: "Roboto", var(--system-font-quill);
        font-size: 11px;
        font-weight: 600;
        line-height: 14px;
        white-space: nowrap;
      }

      #${ID} .image-card .image-paste-button svg {
        width: 14px;
        height: 14px;
        flex: 0 0 14px;
        stroke-width: 2;
      }

      /* =====================================================
         v0.8.7 — Status panel adopts native Scalev alert language
         ===================================================== */
      #${ID}-body[data-sve-tab="compatibility"] {
        font-family: "Roboto", var(--system-font-quill);
        color: #202c3b;
      }

      #${ID} .compatibility-panel {
        gap: 12px;
      }

      #${ID} .compat-status {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 0;
        width: 100%;
        padding: 12px;
        border-width: 2px;
        border-style: solid;
        border-radius: 4px;
        box-shadow: 0 4px 10px rgba(32,44,59,.08);
      }

      #${ID} .compat-status-icon {
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        padding: 6px;
        border-radius: 4px;
        color: #fff;
      }

      #${ID} .compat-status-icon svg {
        width: 24px;
        height: 24px;
      }

      #${ID} .compat-status-copy {
        min-width: 0;
        flex: 1 1 auto;
        padding: 0 0 0 16px;
      }

      #${ID} .compat-status-row {
        min-height: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }

      #${ID} .compat-status-row strong {
        color: #202c3b;
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
      }

      #${ID} .compat-status-row span {
        color: #697689;
        font-size: 10px;
        font-weight: 500;
        line-height: 14px;
      }

      #${ID} .compat-status small {
        display: -webkit-box;
        margin-top: 4px;
        color: #202c3b;
        font-size: 11px;
        font-weight: 400;
        line-height: 16px;
        opacity: 1;
        white-space: normal;
        overflow: hidden;
        overflow-wrap: anywhere;
        word-break: break-word;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
      }

      #${ID} .compat-blocker {
        border-color: #e5484d;
        background: #fff1f2;
      }
      #${ID} .compat-blocker .compat-status-icon {
        background: #e5484d;
      }

      #${ID} .compat-warning {
        border-color: #e7a319;
        background: #fff8e7;
      }
      #${ID} .compat-warning .compat-status-icon {
        background: #e7a319;
      }

      #${ID} .compat-pass {
        border-color: #2f9e5b;
        background: #edf9f0;
      }
      #${ID} .compat-pass .compat-status-icon {
        background: #2f9e5b;
      }

      #${ID} .compat-metrics .metric,
      #${ID} .compat-detail {
        border-color: #dbdfe5;
        border-radius: 4px;
      }

      #${ID} .compat-metrics .metric {
        min-height: 34px;
        padding: 8px;
        background: #f6f9fc;
        color: #202c3b;
        font-size: 11px;
        font-weight: 600;
        line-height: 16px;
      }

      #${ID} .compat-detail summary {
        min-height: 38px;
        padding: 8px 10px;
        color: #202c3b;
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
      }

      #${ID} .compat-detail summary b {
        min-width: 24px;
        padding: 3px 6px;
        border-radius: 4px;
        background: #f6f9fc;
        color: #697689;
        font-size: 10px;
        font-weight: 600;
      }

      #${ID} .compat-detail-body {
        padding: 10px;
        border-top: 1px solid #dbdfe5;
      }

      #${ID} .compat-list li,
      #${ID} .compat-empty {
        color: #4c596a;
        font-size: 11px;
        font-weight: 400;
        line-height: 16px;
      }


      /* =====================================================
         v0.9.0 — UNIFIED SCALEV-NATIVE PANEL GEOMETRY
         Applies one native UI system to Content / Images / Colors /
         Style / Audio / Status. Functional behavior is unchanged.
         Native reference: Scalev HTML Mode forms + Media list.
         ===================================================== */
      #${ID} {
        --sve-native-panel-pad: 16px;
        --sve-native-stack-gap: 12px;
        --sve-native-card-pad: 10px;
        --sve-native-field-pad: 12px;
        --sve-native-radius: 4px;
        --sve-native-border: #dbdfe5;
        --sve-native-soft-border: #edf0f3;
        --sve-native-soft-bg: #f6f9fc;
        --sve-native-text: #202c3b;
        --sve-native-muted: #697689;
      }

      /* Every main tab starts on the same native 16px panel inset. */
      #${ID}-body[data-sve-tab="content"],
      #${ID}-body[data-sve-tab="images"],
      #${ID}-body[data-sve-tab="colors"],
      #${ID}-body[data-sve-tab="style"],
      #${ID}-body[data-sve-tab="audio"],
      #${ID}-body[data-sve-tab="compatibility"] {
        padding: 16px 16px 80px;
        font-family: "Roboto", var(--system-font-quill);
        color: var(--sve-native-text);
      }

      /* Top-level native card rhythm. */
      #${ID}-body .section,
      #${ID}-body .group,
      #${ID}-body .image-card {
        margin: 0 0 var(--sve-native-stack-gap);
        border-width: 2px;
        border-style: solid;
        border-color: var(--sve-native-border);
        border-radius: var(--sve-native-radius);
        background: #fff;
        box-shadow: none;
      }

      #${ID}-body .section:last-child,
      #${ID}-body .group:last-child,
      #${ID}-body .image-card:last-child {
        margin-bottom: 0;
      }

      /* Content accordion shell follows native card geometry. */
      #${ID}-body[data-sve-tab="content"] .section-head {
        min-height: 42px;
        background: #fff;
      }

      #${ID}-body[data-sve-tab="content"] .section-title {
        padding: 10px 12px;
      }

      #${ID}-body[data-sve-tab="content"] .section-title strong {
        color: var(--sve-native-text);
        font-size: 13px;
        font-weight: 600;
        line-height: 18px;
      }

      #${ID}-body[data-sve-tab="content"] .section-title small {
        margin-top: 2px;
        color: var(--sve-native-muted);
        font-size: 10px;
        font-weight: 400;
        line-height: 14px;
      }

      #${ID}-body[data-sve-tab="content"] .section-body {
        padding: 0;
        border-top: 1px solid var(--sve-native-soft-border);
        contain: layout style;
      }

      /* v0.9.5 safe repeater virtualization: keep all controls functional,
         but skip layout/paint work for off-screen repeater items. */
      #${ID}-body[data-sve-tab="content"] .repeat-item {
        content-visibility: auto;
        contain-intrinsic-size: 120px;
      }

      #${ID}-body .group-title,
      #${ID}-body[data-sve-tab="style"] .group-title {
        min-height: 42px;
        display: flex;
        align-items: center;
        padding: 10px 12px;
        background: #fff;
        color: var(--sve-native-text);
        font-size: 13px;
        font-weight: 600;
        line-height: 18px;
      }

      #${ID}-body .field,
      #${ID}-body[data-sve-tab="style"] .field {
        padding: var(--sve-native-field-pad);
        border-top: 1px solid var(--sve-native-soft-border);
      }

      #${ID}-body .group-body > .field:first-child {
        border-top: 0;
      }

      /* Native label / helper density across all forms. */
      #${ID}-body .field > label:not(.boolean-field):not(.audio-start-label),
      #${ID}-body .typography-control > label {
        margin: 0 0 8px;
        color: #4c596a;
        font-family: "Roboto", var(--system-font-quill);
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
      }

      #${ID}-body .field-help,
      #${ID}-body .helper,
      #${ID}-body .font-manual-help,
      #${ID}-body .auto-wedding-id-note {
        margin-top: 6px;
        color: var(--sve-native-muted);
        font-size: 11px;
        font-weight: 400;
        line-height: 16px;
      }

      /* Standard form controls mirror native Scalev form controls. */
      #${ID}-body input.content-control,
      #${ID}-body textarea.content-control,
      #${ID}-body select.content-control,
      #${ID}-body input[type="text"]:not(.image-url-row input),
      #${ID}-body input[type="number"],
      #${ID}-body input[type="date"],
      #${ID}-body input[type="time"],
      #${ID}-body input[type="datetime-local"],
      #${ID}-body select,
      #${ID}-body .style-select {
        border: 2px solid var(--sve-native-border);
        border-radius: var(--sve-native-radius);
        background: #fff;
        color: var(--sve-native-text);
        font-family: "Roboto", var(--system-font-quill);
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        box-shadow: none;
      }

      #${ID}-body input.content-control,
      #${ID}-body select.content-control,
      #${ID}-body input[type="text"]:not(.image-url-row input),
      #${ID}-body input[type="number"],
      #${ID}-body input[type="date"],
      #${ID}-body input[type="time"],
      #${ID}-body input[type="datetime-local"],
      #${ID}-body select,
      #${ID}-body .style-select {
        height: 42px;
        min-height: 42px;
        padding: 0 12px;
      }

      #${ID}-body textarea.content-control,
      #${ID}-body textarea {
        min-height: 82px;
        padding: 10px 12px;
        border-radius: var(--sve-native-radius);
      }

      #${ID}-body input:focus,
      #${ID}-body textarea:focus,
      #${ID}-body select:focus,
      #${ID}-body .style-select:focus,
      #${ID}-body .content-url-shell:focus-within {
        border-color: #0899cf;
        box-shadow: none;
        outline: none;
      }

      #${ID}-body .content-url-shell {
        min-height: 42px;
        border: 2px solid var(--sve-native-border);
        border-radius: var(--sve-native-radius);
        background: #fff;
      }

      #${ID}-body .content-url-shell .content-control-url {
        height: 38px;
        min-height: 38px;
        border: 0;
      }

      #${ID}-body .content-url-badge {
        min-width: 48px;
        padding: 0 8px;
        border-right: 1px solid var(--sve-native-soft-border);
        background: var(--sve-native-soft-bg);
        font-size: 10px;
        font-weight: 600;
      }

      #${ID}-body .boolean-field {
        min-height: 42px;
        gap: 8px;
        padding: 10px 12px;
        border: 2px solid var(--sve-native-border);
        border-radius: var(--sve-native-radius);
        background: #fff;
      }

      /* Nested repeaters use a lighter one-pixel native inner border. */
      #${ID}-body .repeat-item {
        margin: 10px;
        border: 1px solid var(--sve-native-border);
        border-radius: var(--sve-native-radius);
        overflow: hidden;
        background: #fff;
      }

      #${ID}-body .repeat-head {
        min-height: 38px;
        padding: 8px 10px;
        background: var(--sve-native-soft-bg);
      }

      #${ID}-body .repeat-head strong {
        font-size: 11px;
        font-weight: 600;
        line-height: 16px;
      }

      /* Buttons use native Scalev radius and typography everywhere. */
      #${ID}-body .button {
        min-height: 40px;
        padding: 0 16px;
        border-width: 2px;
        border-radius: var(--sve-native-radius);
        font-family: "Roboto", var(--system-font-quill);
        font-size: 13px;
        font-weight: 500;
        line-height: 18px;
      }

      #${ID}-body .style-reset-zone,
      #${ID}-body .reset-zone {
        margin-top: 0;
        padding-top: 0;
      }

      /* Images keep exact native Media list geometry. */
      #${ID}-body[data-sve-tab="images"] .image-card {
        padding: 10px;
        border-radius: 4px;
      }

      #${ID}-body[data-sve-tab="images"] .image-card .image-card-action,
      #${ID}-body[data-sve-tab="images"] .advance-pos-btn,
      #${ID}-body[data-sve-tab="images"] .advance-pos-default,
      #${ID}-body[data-sve-tab="images"] .advance-fit-btn,
      #${ID}-body[data-sve-tab="images"] .advance-ratio-btn {
        border-radius: 4px;
      }

      #${ID}-body[data-sve-tab="images"] .image-advance {
        border-radius: 4px;
      }

      /* Color panel follows the same card/control geometry. */
      #${ID}-body[data-sve-tab="colors"] input[type="color"],
      #${ID}-body[data-sve-tab="colors"] .color-unset-swatch {
        border-radius: 4px;
      }

      #${ID}-body[data-sve-tab="colors"] .colors-empty,
      #${ID}-body .sve-empty-template {
        margin: 0;
        padding: 12px;
        border: 1px solid var(--sve-native-border);
        border-radius: 4px;
        background: var(--sve-native-soft-bg);
      }

      /* Audio uses the same field padding / separators as native forms. */
      #${ID}-body[data-sve-tab="audio"] .audio-field {
        padding: 12px;
      }

      #${ID}-body[data-sve-tab="audio"] .audio-start-row {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid var(--sve-native-soft-border);
      }

      #${ID}-body[data-sve-tab="audio"] .audio-start-time {
        height: 38px !important;
        min-height: 38px !important;
        border-radius: 4px !important;
      }

      /* Status keeps native alert semantics and the same geometry rhythm. */
      #${ID}-body[data-sve-tab="compatibility"] .compatibility-panel {
        gap: 12px;
      }

      #${ID}-body[data-sve-tab="compatibility"] .compat-status {
        margin: 0;
        padding: 12px;
        border-width: 2px;
        border-radius: 4px;
        box-shadow: 0 4px 10px rgba(32,44,59,.08);
      }

      #${ID}-body[data-sve-tab="compatibility"] .compat-status-icon,
      #${ID}-body[data-sve-tab="compatibility"] .compat-metrics .metric,
      #${ID}-body[data-sve-tab="compatibility"] .compat-detail,
      #${ID}-body[data-sve-tab="compatibility"] .compat-detail summary b {
        border-radius: 4px;
      }

      #${ID}-body[data-sve-tab="compatibility"] .compat-metrics {
        gap: 8px;
      }

      #${ID}-body[data-sve-tab="compatibility"] .compat-metrics .metric {
        min-height: 34px;
        padding: 8px;
        border: 1px solid var(--sve-native-border);
        background: var(--sve-native-soft-bg);
      }

      #${ID}-body[data-sve-tab="compatibility"] .compat-detail {
        border: 1px solid var(--sve-native-border);
      }

      #${ID}-body[data-sve-tab="compatibility"] .compat-detail summary {
        min-height: 38px;
        padding: 8px 10px;
      }

      #${ID}-body[data-sve-tab="compatibility"] .compat-detail-body {
        padding: 10px;
        border-top: 1px solid var(--sve-native-border);
      }

      /* Preserve the intentionally smaller native Media URL row. */
      #${ID}-body[data-sve-tab="images"] .image-card .image-url-row {
        min-height: 30px;
        margin-top: 10px;
        border-width: 1px;
        border-radius: 4px;
      }

      #${ID}-body[data-sve-tab="images"] .image-card .image-url-row input[type="text"] {
        height: auto;
        min-height: 0;
        padding: 7px 8px;
        border: 0;
        border-radius: 0;
        background: transparent;
        font-size: 10px;
        line-height: 14px;
      }

      #${ID}-body[data-sve-tab="images"] .image-card .image-paste-button {
        min-height: 0;
        height: auto;
        padding: 7px 8px;
        border: 0;
        border-left: 1px solid var(--sve-native-border);
        border-radius: 0;
        font-size: 11px;
        font-weight: 600;
        line-height: 14px;
      }
    `;

    document.head.appendChild(
      style
    );
  }

  /* =========================================================
     CREATE UI
     ========================================================= */

  function createUI() {
    injectStyles();

    const app =
      document.createElement(
        "div"
      );

    app.id =
      ID;

    if (SVE_LITE_MODE) {
      app.classList.add("sve-lite");
    }

    app.innerHTML = `
      <aside id="${ID}-dock">
        <div class="tabs-shell">
          <div class="tabs">
            <button
              class="tab"
              data-tab="library"
              title="Template Library"
            >
              Library
            </button>

            <button
              class="tab active"
              data-tab="content"
            >
              Konten
            </button>

            <button
              class="tab"
              data-tab="images"
            >
              Gambar
            </button>

            <button
              class="tab"
              data-tab="colors"
            >
              Warna
            </button>

            <button
              class="tab"
              data-tab="style"
            >
              Style
            </button>

            <button
              class="tab"
              data-tab="audio"
            >
              Audio
            </button>

            <button
              class="tab"
              data-tab="compatibility"
              title="Compatibility"
              aria-label="Compatibility"
            >
              Status
            </button>
          </div>

          <div class="panel-tools">
            <button
              type="button"
              class="panel-tool"
              id="${ID}-refresh"
              title="Scan ulang"
              aria-label="Scan ulang Visual Editor"
            >
              ↻
            </button>

            <button
              type="button"
              class="panel-tool panel-collapse"
              id="${ID}-close"
              title="Sembunyikan Visual Editor"
              aria-label="Sembunyikan Visual Editor"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                class="panel-collapse-icon"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.2071 6.29289C12.5976 6.68342 12.5976 7.31658 12.2071 7.70711L7.91421 12L12.2071 16.2929C12.5976 16.6834 12.5976 17.3166 12.2071 17.7071C11.8166 18.0976 11.1834 18.0976 10.7929 17.7071L5.79289 12.7071C5.40237 12.3166 5.40237 11.6834 5.79289 11.2929L10.7929 6.29289C11.1834 5.90237 11.8166 5.90237 12.2071 6.29289Z"
                  fill="currentColor"
                ></path>

                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.2071 6.29289C18.5976 6.68342 18.5976 7.31658 18.2071 7.70711L13.9142 12L18.2071 16.2929C18.5976 16.6834 18.5976 17.3166 18.2071 17.7071C17.8166 18.0976 17.1834 18.0976 16.7929 17.7071L11.7929 12.7071C11.4024 12.3166 11.4024 11.6834 11.7929 11.2929L16.7929 6.29289C17.1834 5.90237 17.8166 5.90237 18.2071 6.29289Z"
                  fill="currentColor"
                  opacity=".5"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="toolbar">
          <input
            id="${ID}-search"
            class="search"
            type="search"
            placeholder="Cari section / field..."
          >
        </div>

        <div
          id="${ID}-body"
          class="body"
        ></div>

        <div class="savebar">
          <div class="footer-meta">
            <strong>Visual Editor</strong>
            <small>Native Schema · v${VERSION}</small>
            <span
              id="${ID}-save-status"
              class="save-status"
            >
              Siap diedit
            </span>
            <small
              id="${ID}-update-status"
              class="update-status"
              aria-live="polite"
            >
              Belum mengecek update.
            </small>
          </div>

          <div class="save-actions">
            <button
              id="${ID}-support"
              type="button"
              class="button support"
              title="Hubungi Support via WhatsApp"
              aria-label="Hubungi Support via WhatsApp"
            >
              <svg
                class="support-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M20.52 3.48A11.82 11.82 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.14 1.6 5.94L.08 24l6.3-1.65a11.9 11.9 0 0 0 5.69 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.23-6.17-3.46-8.42ZM12.08 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.64-.24-.37a9.82 9.82 0 0 1-1.52-5.28c0-5.46 4.44-9.9 9.91-9.9 2.64 0 5.12 1.03 6.99 2.9a9.84 9.84 0 0 1 2.9 7c0 5.46-4.44 9.9-9.9 9.9Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.9 8.9 0 0 1-1.65-2.05c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.3 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
                ></path>
              </svg>

              <span>
                Support
              </span>
            </button>

            <button
              id="${ID}-editor-update"
              type="button"
              class="button editor-update"
              title="Cek update Visual Editor"
              aria-label="Cek update Visual Editor"
            >
              Cek Update
            </button>

          </div>
        </div>

        <div
          id="${ID}-exit-prompt"
          role="dialog"
          aria-modal="false"
          aria-labelledby="${ID}-exit-prompt-title"
          aria-hidden="true"
          hidden
        >
          <button
            type="button"
            class="exit-prompt-close"
            id="${ID}-exit-close"
            aria-label="Tutup"
            title="Tutup"
          >
            <svg viewBox="0 1 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.757358 0.757359C1.226 0.288717 1.98579 0.288734 2.45441 0.757359L5 3.30294L7.54558 0.757359C8.01422 0.288717 8.77401 0.288734 9.24264 0.757359C9.71128 1.226 9.71128 1.98577 9.24264 2.45442L6.69705 5L9.24264 7.54558C9.71128 8.01423 9.71128 8.774 9.24264 9.24264C8.77401 9.71127 8.01422 9.71128 7.54558 9.24264L5 6.69706L2.45441 9.24264C1.98579 9.71127 1.226 9.71128 0.757358 9.24264C0.288724 8.77401 0.288733 8.01421 0.757358 7.54558L3.30294 5L0.757358 2.45442C0.288733 1.98579 0.288724 1.22599 0.757358 0.757359Z" fill="currentColor"></path>
            </svg>
          </button>

          <div class="exit-prompt-content">
            <h2 id="${ID}-exit-prompt-title">Yakin keluar?</h2>
            <p>Perubahan belum tersimpan.</p>

            <div class="exit-prompt-actions">
              <button type="button" class="exit-prompt-keep" id="${ID}-exit-keep">Tetap edit</button>
              <button type="button" class="exit-prompt-exit" id="${ID}-exit-confirm">Keluar</button>
            </div>
          </div>
        </div>
      </aside>
    `;

    document.body.appendChild(
      app
    );

    $(
      "#" +
      ID +
      "-close"
    ).onclick = () => {
      requestPanelClose();
    };

    $("#" + ID + "-exit-close").onclick = closeExitPrompt;
    $("#" + ID + "-exit-keep").onclick = closeExitPrompt;
    $("#" + ID + "-exit-confirm").onclick = closePanelAnyway;

    $(
      "#" +
      ID +
      "-refresh"
    ).onclick = () => {
      parseAll();
      render();
      notifyPreview({ force: true });
    };

    $(
      "#" +
      ID +
      "-support"
    ).onclick =
      openSupportWhatsApp;

    const updateButton = $("#" + ID + "-editor-update");
    const updateStatus = $("#" + ID + "-update-status");

    let updateAvailable = false;
    const setUpdateButton = (label, title, disabled = false) => {
      updateButton.textContent = label;
      updateButton.title = title;
      updateButton.setAttribute("aria-label", title);
      updateButton.disabled = disabled;
    };

    updateButton.addEventListener("click", () => {
      if (updateAvailable) {
        window.open(UPDATE_URL, "_blank", "noopener");
        return;
      }

      updateAvailable = false;
      setUpdateButton(
        "Mengecek...",
        "Sedang mengecek update Visual Editor",
        true
      );
      updateStatus.textContent = "Mengecek GitHub...";
      GM_xmlhttpRequest({
        method: "GET",
        url: `${CHECK_URL}&check=${Date.now()}`,
        onload(response) {
          const resetAfterError = message => {
            updateAvailable = false;
            setUpdateButton(
              "Cek Update",
              "Cek update Visual Editor"
            );
            updateStatus.textContent = message;
          };

          if (response.status < 200 || response.status >= 300) {
            resetAfterError("GitHub mengembalikan error.");
            return;
          }

          let source;
          try {
            const payload = JSON.parse(response.responseText);
            source = atob(payload.content.replace(/\s/g, ""));
          } catch (_) {
            resetAfterError("Respons GitHub tidak valid.");
            return;
          }
          const match = source.match(/@version\s+([^\s]+)/);
          const remoteVersion = match && match[1];
          if (!remoteVersion) {
            resetAfterError("Versi GitHub tidak terbaca.");
            return;
          }
          if (remoteVersion === VERSION) {
            updateAvailable = false;
            setUpdateButton("Cek Update", "Cek update Visual Editor");
            updateStatus.textContent = `Sudah versi terbaru (${VERSION}).`;
          } else {
            updateAvailable = true;
            setUpdateButton(
              "Update / Pasang",
              `Update Visual Editor ke versi ${remoteVersion}`
            );
            updateStatus.textContent = `Update tersedia: versi ${remoteVersion}.`;
          }
        },
        onerror() {
          updateAvailable = false;
          setUpdateButton("Cek Update", "Cek update Visual Editor");
          updateStatus.textContent = "Gagal menghubungi GitHub.";
        }
      });
    });

    $(
      "#" +
      ID +
      "-search"
    ).addEventListener(
      "input",
      debounce(
        event => {
          state.search =
            event.target.value
              .toLowerCase()
              .trim();

          state.uiPrepared = false;
          render();
        },
        100
      )
    );

    $$(".tab", app).forEach(
      button => {
        button.onclick = () => {
          closeFontPortal();

          state.tab =
            button.dataset.tab;
          state.uiPrepared = false;

          $$(".tab", app).forEach(
            tab => {
              tab.classList.toggle(
                "active",
                tab === button
              );
            }
          );

          render();
        };
      }
    );
  }

  /* =========================================================
     WATCH SCALEV SPA
     ========================================================= */

  function observeScalev() {
    const observer =
      new MutationObserver(
        debounce(
          mutations => {
            const externalMutation =
              mutations.some(
                mutation => {
                  const target =
                    mutation.target;

                  if (
                    !(
                      target instanceof
                      Element
                    )
                  ) {
                    return true;
                  }

                  return !target.closest(
                    "#" + ID
                  );
                }
              );

            if (!externalMutation) {
              return;
            }

            pruneNativeCache();
            updateGlobalHeaderMetrics();
            mountToolbarToggle();

            /*
             * Opening Scalev Pengaturan mounts the native
             * Domain / URL -> Slug URL field.
             */
            const detectedSlug =
              readScalevSlug();

            if (detectedSlug) {
              syncWeddingIdToSlug(
                detectedSlug,
                {
                  commit: true,
                  silent: true
                }
              );
            }

            if (state.open) {
              applyPushLayout(true);
            }

            const count =
              findCodeMirrors().length;

            if (
              count !==
              state.allEditors.length
            ) {
              state.sourceDirty = true;
              parseAll();

              flushPendingWeddingIdSlug();

              if (state.open) {
                render();
              } else {
                scheduleVisualEditorPrewarm();
              }
            }
          },
          400
        )
      );

    observer.observe(
      document.documentElement,
      {
        childList: true,
        subtree: true
      }
    );

    document.addEventListener(
      "input",
      event => {
        if (
          isScalevSlugInput(
            event.target
          )
        ) {
          state.scalevSlug =
            normalizeScalevSlug(
              event.target.value
            );

          syncScalevSlugDebounced();
        }
      },
      true
    );

    document.addEventListener(
      "change",
      event => {
        if (
          isScalevSlugInput(
            event.target
          )
        ) {
          const slug =
            normalizeScalevSlug(
              event.target.value
            );

          if (slug) {
            state.scalevSlug =
              slug;

            syncWeddingIdToSlug(
              slug,
              {
                commit: true
              }
            );
          }
        }
      },
      true
    );

    window.addEventListener(
      "resize",
      debounce(
        () => {
          updateGlobalHeaderMetrics();

          if (state.open) {
            applyPushLayout(true);
          }

          if (
            state.fontPortalInput
          ) {
            positionFontPortal(
              state.fontPortalInput
            );
          }
        },
        80
      )
    );

    document.addEventListener(
      "scroll",
      debounce(
        () => {
          if (
            state.fontPortalInput
          ) {
            positionFontPortal(
              state.fontPortalInput
            );
          }
        },
        10
      ),
      true
    );

    document.addEventListener(
      "click",
      event => {
        const portal =
          document.getElementById(
            ID +
            "-font-portal"
          );

        const clickedPortal =
          portal?.contains(
            event.target
          );

        const clickedHeading =
          event.target.closest?.(
            "#" +
            ID +
            "-heading-font"
          );

        const clickedBody =
          event.target.closest?.(
            "#" +
            ID +
            "-body-font"
          );

        if (
          !clickedPortal &&
          !clickedHeading &&
          !clickedBody
        ) {
          closeFontPortal();
        }
      }
    );

    document.addEventListener(
      "keydown",
      event => {
        if (
          event.key ===
          "Escape"
        ) {
          if (state.exitPromptOpen) {
            event.preventDefault();
            closeExitPrompt();
            return;
          }

          closeFontPortal();
        }
      }
    );
  }

  /* =========================================================
     INIT
     ========================================================= */

  function init() {
    if (!isScalevEditModeUrl()) {
      return;
    }

    createUI();

    /*
     * Mount only the lightweight launcher synchronously. Heavy template
     * parsing/rendering is prewarmed when the browser is idle.
     */
    mountToolbarToggle();
    observeScalev();
    syncToolbarToggleVisibility();

    requestAnimationFrame(() => {
      updateGlobalHeaderMetrics();
    });

    scheduleVisualEditorPrewarm();

    console.info(
      "[Scalev Visual Editor]",
      VERSION
    );
  }

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      {
        once: true
      }
    );
  } else {
    init();
  }
})();
