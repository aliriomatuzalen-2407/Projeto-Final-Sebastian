/* ==========================================================================
   SCRIPT.JS // MATRIX, THEMES & TERMINAL LOGIC
   ========================================================================== */

let activeColor = '#00ff66';

// 1. Relógio do Sistema
function updateTime() {
  const now = new Date();
  const timeElem = document.getElementById('system-time');
  const yearElem = document.getElementById('year');
  
  if (timeElem) timeElem.innerText = now.toLocaleTimeString('pt-BR');
  if (yearElem) yearElem.innerText = now.getFullYear();
}
setInterval(updateTime, 1000);
updateTime();

// 2. Troca de Temas
function changeTheme(color, glow) {
  activeColor = color;
  document.documentElement.style.setProperty('--primary-color', color);
  document.documentElement.style.setProperty('--glow-color', glow);
}

// 3. Chuva Matrix em Canvas
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*§µ01';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = activeColor;
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 33);
}

// 4. Lógica do Terminal
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');

  const commands = {
    'help': 'Comandos disponíveis:<br>- <span class="text-yellow-400">about</span>: Sobre mim<br>- <span class="text-yellow-400">skills</span>: Minhas tecnologias<br>- <span class="text-yellow-400">projects</span>: Ver meus projetos<br>- <span class="text-yellow-400">contact</span>: Informações de contato<br>- <span class="text-yellow-400">clear</span>: Limpar terminal<br>- <span class="text-yellow-400">sudo</span>: Acesso privilegiado',
    'about': 'Desenvolvedor focado na construção de sistemas performáticos, APIs seguras e interfaces modernas.',
    'skills': 'STACK TÉCNICA:<br>• Linguagens: JavaScript, TypeScript, Python, HTML5, CSS3<br>• Frameworks: React, Node.js, Next.js, Tailwind CSS<br>• Ferramentas: Git, Docker, Linux, Bash',
    'projects': 'PROJETOS RECENTES:<br>1. <span class="font-bold">CyberDeck OS</span> - Interface estilo terminal em WebGL.<br>2. <span class="font-bold">Sentinel Security Bot</span> - Bot para análise de vulnerabilidades em APIs.<br>3. <span class="font-bold">DevMetrics Dashboard</span> - Monitoramento em tempo real.',
    'contact': 'CONTATO:<br>• Email: seuemail@exemplo.com<br>• GitHub: github.com/seu_usuario<br>• LinkedIn: linkedin.com/in/seu_perfil',
    'sudo': '<span class="text-red-500 font-bold">ACESSO NEGADO:</span> Tentativa de invasão registrada no log do sistema.'
  };

  if (input && output) {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const cmd = this.value.trim().toLowerCase();
        this.value = '';

        if (!cmd) return;

        if (cmd === 'clear') {
          output.innerHTML = '';
          return;
        }

        const cmdLine = document.createElement('div');
        cmdLine.innerHTML = `<span class="opacity-70">guest@hacker-os:~$</span> <span class="font-bold">${cmd}</span>`;
        output.appendChild(cmdLine);

        const responseLine = document.createElement('div');
        if (commands[cmd]) {
          responseLine.innerHTML = commands[cmd];
        } else {
          responseLine.innerHTML = `<span class="text-red-400">Comando não reconhecido: '${cmd}'. Digite 'help' para comandos.</span>`;
        }

        output.appendChild(responseLine);
        output.scrollTop = output.scrollHeight;
      }
    });
  }
});