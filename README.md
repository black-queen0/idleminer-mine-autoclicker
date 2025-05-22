# IdleMiner Auto-Clicker (Tampermonkey Script)

Automatically clicks your own green "Mine ⛏️" button in IdleMiner and dismisses cooldown alerts.

### ✅ Features
- Only clicks **your own** mine buttons (based on your Discord username)
- Ignores other players’ messages
- Auto-dismisses cooldown popups
- Toggle on/off with **F7**

---

### 📥 Installation

1. Make sure you have **[Tampermonkey](https://www.tampermonkey.net/)** installed.
2. Open this link in your browser:  
   👉 [`Install Script`](https://raw.githubusercontent.com/black-queen0/idleminer-mine-autoclicker/main/IdleMiner-AutoClicker.user.js)
3. Tampermonkey will prompt you to install the script.
4. Press **F7** to toggle the auto-clicker on/off.

---

### 🔄 Auto-Updates

This script auto-updates from this GitHub repository.

To update manually:
- Open the Tampermonkey dashboard
- Click the ▼ next to this script
- Choose **Check for updates**

---

### 🛠 Configuration

Inside the script:

```js
const USERNAME = 'blackqueen0.'; // <- Set your exact Discord username
const COOLDOWN = 1700; // Delay between clicks (ms)
