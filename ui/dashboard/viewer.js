document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('sovereignModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.modal-close');

    // Intercept clicks on "VIEW REASONING" links
    document.querySelectorAll('.view-reasoning').forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const filePath = link.getAttribute('data-path');
            
            // Show loading state
            modal.style.display = 'flex';
            setTimeout(() => modal.style.opacity = '1', 10);
            modalBody.innerHTML = '<h2 style="text-align:center; margin-top: 100px;">Accessing Sovereign Archive...</h2>';

            try {
                const response = await fetch(filePath);
                if (!response.ok) throw new Error('Dossier Not Found');
                const text = await response.text();
                
                // Simple Sovereign Parser (Regex)
                modalBody.innerHTML = formatMarkdown(text);
            } catch (err) {
                modalBody.innerHTML = `<h2 style="color: #ff4136;">Error: ${err.message}</h2><p>Path trace: ${filePath}</p>`;
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.style.display = 'none', 500);
    });

    function formatMarkdown(text) {
        return text
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/```([\s\S]*?)```/gim, '<pre>$1</pre>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/^- (.*$)/gim, '<li>$1</li>');
    }
});
