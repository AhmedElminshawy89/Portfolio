// 1. نظام تبديل اللغة (Language System)
function toggleLang() {
    const html = document.documentElement;
    const btn = document.getElementById('langBtn');
    // الحالة الحالية قبل التبديل
    const currentLang = html.getAttribute('lang'); 
    const isEn = currentLang === 'en';
    
    // التبديل للغة الجديدة
    const newLang = isEn ? 'ar' : 'en';
    const newDir = isEn ? 'rtl' : 'ltr';

    html.setAttribute('lang', newLang);
    html.setAttribute('dir', newDir);
    btn.innerText = isEn ? 'AR' : 'EN';

    // تحديث النصوص (Data Attributes)
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(el => {
        const text = el.getAttribute(`data-${newLang}`);
        if (text) el.innerHTML = text;
    });

    // تحديث الخطوط في حالة العربي
    document.body.style.fontFamily = (newLang === 'ar') ? "'Cairo', sans-serif" : "'Inter', sans-serif";
}

// 2. أنيميشن الظهور (Reveal on Scroll)
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px" // بيبدأ الأنيميشن قبل ما العنصر يوصل تماماً
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .hero-content, .section-header, .skill-category').forEach(el => {
    // يفضل تستخدم CSS Classes بدل الـ Inline Styles للأداء
    el.classList.add('reveal-hidden');
    observer.observe(el);
});

// 3. تأثير Three.js المطور (Interactive Particles)
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // دقة أعلى للشاشات القوية
    container.appendChild(renderer.domElement);

    // جزيئات أكثر نعومة
    const geometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 2000;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0x64ffda, // لون البراند بتاعك
        size: 2,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 1000;

    // حركة مع الماوس
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX - window.innerWidth / 2;
        mouseY = e.clientY - window.innerHeight / 2;
    });

    function animate() {
        requestAnimationFrame(animate);
        
        // دوران تلقائي خفيف
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0005;

        // استجابة ناعمة لحركة الماوس
        camera.position.x += (mouseX - camera.position.x) * 0.02;
        camera.position.y += (-mouseY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // التعامل مع تغيير حجم النافذة
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// تشغيل الـ Three.js
initThreeJS();

// 4. نظام المنيو (Mobile Menu)
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // إغلاق المنيو عند اختيار قسم
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}
