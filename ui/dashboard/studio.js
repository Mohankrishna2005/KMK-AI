document.addEventListener('DOMContentLoaded', () => {
    // --- Tab System ---
    const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(target + 'Tab').classList.add('active');
        });
    });

    // --- Settings Logic ---
    const settingsModal = document.getElementById('settingsModal');
    const openSettings = document.getElementById('openSettings');
    const closeSettings = settingsModal.querySelector('.modal-close');
    const saveSettings = document.getElementById('saveSettings');
    const openaiKeyInput = document.getElementById('openaiKey');

    // Load existing key
    openaiKeyInput.value = localStorage.getItem('kmk_openai_key') || '';

    openSettings.addEventListener('click', () => {
        settingsModal.style.display = 'flex';
        setTimeout(() => settingsModal.style.opacity = '1', 10);
    });

    closeSettings.addEventListener('click', () => {
        settingsModal.style.opacity = '0';
        setTimeout(() => settingsModal.style.display = 'none', 500);
    });

    saveSettings.addEventListener('click', () => {
        localStorage.setItem('kmk_openai_key', openaiKeyInput.value.trim());
        saveSettings.innerText = 'SAVED';
        setTimeout(() => {
            saveSettings.innerText = 'SYNC SOVEREIGN KEYS';
            closeSettings.click();
        }, 1000);
    });

    // --- Generative Logic (Zero Lag Bridge) ---
    const executeBtn = document.querySelector('.execute-btn');
    const studioInput = document.querySelector('.studio-input');
    const assetGrid = document.getElementById('assetGrid');
    const logicFeed = document.querySelector('.logic-feed');

    executeBtn.addEventListener('click', async () => {
        const directive = studioInput.value.trim();
        const apiKey = localStorage.getItem('kmk_openai_key');

        if (!directive) return;
        if (!apiKey) {
            alert('Sovereign Protocol Error: No API Key detected. Open Settings to configure.');
            return;
        }

        // 1. Add Directive to Logic Feed
        logToFeed('DIR', `EXECUTING: ${directive}`);

        // 2. Clear Input & Show Loading
        executeBtn.innerText = 'COMMUNING...';
        executeBtn.disabled = true;
        studioInput.value = '';

        // 3. Create Placeholder Card
        const assetCard = document.createElement('div');
        assetCard.className = 'asset-card generating';
        assetCard.innerHTML = `
            <div class="asset-preview">
                <div class="pulse-icon" style="color: var(--kmk-gold); font-weight: 800;">8K MANIFESTING...</div>
            </div>
            <div class="asset-info">
                <h4 class="asset-title">${directive.toUpperCase()}</h4>
                <span class="asset-meta">Type: Sovereign Vision | Status: Fetching from Neural Bridge</span>
            </div>
        `;
        assetGrid.prepend(assetCard);

        try {
            logToFeed('LTC', 'Communing with Neural Node (OpenAI)...');

            const response = await fetch('https://api.openai.com/v1/images/generations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "dall-e-3",
                    prompt: `8K cinematic masterpiece, hyper-realistic, Arri Alexa lighting, KMK Gold and Onyx color palette, premium aesthetic, focal theme: ${directive}`,
                    n: 1,
                    size: "1024x1024",
                    quality: "hd"
                })
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error.message);

            const imageUrl = data.data[0].url;

            // 4. Update Card with Real Result
            assetCard.classList.remove('generating');
            assetCard.querySelector('.asset-preview').innerHTML = `<img src="${imageUrl}" style="width: 100%; height: 100%; object-fit: cover;">`;
            assetCard.querySelector('.asset-meta').innerText = 'Type: Arri Alexa 8K Visual | RENDER COMPLETE';

            logToFeed('OUT', 'Sovereign Vision Manifested Successfully.');

        } catch (err) {
            logToFeed('ERR', `Neural Bridge Failure: ${err.message}`);
            assetCard.querySelector('.asset-preview').innerHTML = `<div style="color: #ff4136; font-size: 0.7rem; padding: 20px;">FAILED: ${err.message}</div>`;
        } finally {
            executeBtn.innerText = 'EXECUTE DIRECTIVE';
            executeBtn.disabled = false;
        }
    });

    function logToFeed(tag, msg) {
        const newLine = document.createElement('div');
        newLine.className = 'logic-line';
        newLine.innerHTML = `<span>[${tag}]</span> ${msg}`;
        logicFeed.insertBefore(newLine, logicFeed.lastElementChild);
    }
});
