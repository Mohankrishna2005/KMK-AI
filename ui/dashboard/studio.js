document.addEventListener('DOMContentLoaded', () => {
    // Tab Switching Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
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

    // Studio Generation Logic
    const executeBtn = document.querySelector('.execute-btn');
    const studioInput = document.querySelector('.studio-input');
    const assetGrid = document.getElementById('assetGrid');

    executeBtn.addEventListener('click', () => {
        const directive = studioInput.value.trim();
        if (!directive) return;

        // Add to Logic Feed (Simulated)
        const logicFeed = document.querySelector('.logic-feed');
        const newLine = document.createElement('div');
        newLine.className = 'logic-line';
        newLine.innerHTML = `<span>[DIR]</span> EXECUTING: ${directive}`;
        logicFeed.insertBefore(newLine, logicFeed.lastElementChild);

        // Simulated Generation
        executeBtn.innerText = 'PROCESSING...';
        executeBtn.disabled = true;

        setTimeout(() => {
            const assetCard = document.createElement('div');
            assetCard.className = 'asset-card';
            assetCard.innerHTML = `
                <div class="asset-preview" style="background: radial-gradient(circle, #222 0%, #000 100%);">
                    <div class="pulse-icon" style="color: var(--kmk-gold); font-weight: 800;">8K RENDERING...</div>
                </div>
                <div class="asset-info">
                    <h4 class="asset-title">${directive.toUpperCase()}</h4>
                    <span class="asset-meta">Type: Arri Alexa 8K Visual | Status: Initializing</span>
                </div>
            `;
            assetGrid.prepend(assetCard);

            executeBtn.innerText = 'EXECUTE DIRECTIVE';
            executeBtn.disabled = false;
            studioInput.value = '';

            // Notification for the user in the logic feed
            const completionLine = document.createElement('div');
            completionLine.className = 'logic-line';
            completionLine.innerHTML = `<span>[OUT]</span> Blueprint Locked. Awaiting final render.`;
            logicFeed.insertBefore(completionLine, logicFeed.lastElementChild);
        }, 2000);
    });
});
