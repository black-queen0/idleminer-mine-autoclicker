// ==UserScript==
// @name         IdleMiner Auto-Clicker (F7, Own /mine Only, Dismiss Fix)
// @namespace    http://tampermonkey.net/
// @version      7.5
// @description  Clicks only your green "Mine ⛏️" button in IdleMiner, dismisses cooldown alerts. Press F7 to toggle.
// @author       Black Queen
// @match        https://discord.com/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/black-queen0/IdleMiner-autoclicker/main/IdleMiner-AutoClicker.user.js
// @downloadURL  https://raw.githubusercontent.com/black-queen0/IdleMiner-autoclicker/main/IdleMiner-AutoClicker.user.js
// ==/UserScript==

(function () {
  'use strict';

  /* ---------- CONFIG ---------- */
  const USERNAME = 'blackqueen0.'; // Your exact Discord username
  const COOLDOWN = 1700; // Delay between clicks (ms)
  const SCAN_MS = 500; // Scan frequency (ms)
  /* ---------------------------- */

  let enabled = false;
  let lastClick = 0;

  console.log('[AutoMiner] Loaded. Press F7 to toggle.');

  // Toggle with F7
  document.addEventListener('keydown', e => {
    if (e.key === 'F7' && !e.repeat) {
      enabled = !enabled;
      console.log(`[AutoMiner] ${enabled ? '🟢 Enabled' : '🔴 Disabled'}`);
    }
  });

  // Simulate human-like click
  function clickLikeUser(btn) {
    btn.scrollIntoView({ behavior: 'instant', block: 'center' });
    btn.focus();
    ['pointerdown', 'mousedown', 'mouseup', 'click'].forEach(type => {
      btn.dispatchEvent(new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        view: window,
        button: 0
      }));
    });
    console.log('[AutoMiner] ⛏️ Clicked!');
  }

  // Green "Mine ⛏️" button checker
  function isGreenMine(btn) {
    return (
      btn &&
      !btn.disabled &&
      btn.getAttribute('aria-disabled') !== 'true' &&
      btn.textContent.trim() === 'Mine ⛏️' &&
      btn.className.toLowerCase().includes('colorgreen')
    );
  }

  // Find latest green mine from your own message
  function findOwnGreenMine() {
    const allButtons = Array.from(document.querySelectorAll('button')).filter(isGreenMine);
    for (let i = allButtons.length - 1; i >= 0; i--) {
      const btn = allButtons[i];
      const msg = btn.closest('[role="listitem"],[data-list-item-id]');
      if (msg && msg.innerText.includes(USERNAME)) return btn;
    }
    return null;
  }

  // Find and click "Dismiss message" from cooldowns
  function dismissCooldownWarnings() {
    const ephemeralDivs = document.querySelectorAll('div.ephemeralMessage__124d2');
    ephemeralDivs.forEach(div => {
      const dismissBtn = div.querySelector('a[role="button"]');
      if (dismissBtn && dismissBtn.textContent.trim() === 'Dismiss message') {
        try {
          dismissBtn.click();
          console.log('[AutoMiner] ❌ Dismissed cooldown warning.');
        } catch (err) {
          console.warn('[AutoMiner] ⚠️ Could not dismiss:', err);
        }
      }
    });
  }

  // Main loop
  setInterval(() => {
    if (!enabled) return;

    dismissCooldownWarnings();

    if (Date.now() - lastClick < COOLDOWN) return;

    const button = findOwnGreenMine();
    if (button) {
      clickLikeUser(button);
      lastClick = Date.now();
    }
  }, SCAN_MS);
})();
