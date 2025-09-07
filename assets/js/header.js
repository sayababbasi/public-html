
(() => {
   const menuToggle = document.getElementById('menuToggle');
   const mobileMenu = document.getElementById('mobileMenu');
   const closeMenuBtn = document.getElementById('closeMenu');
   const overlay = document.getElementById('overlay');
   const navLinks = mobileMenu?.querySelectorAll('a');

   function openMenu() {
      mobileMenu?.classList.add('active');
      overlay?.classList.add('active');
   }

   function closeMenu() {
      mobileMenu?.classList.remove('active');
      overlay?.classList.remove('active');
   }

   menuToggle?.addEventListener('click', () => {
      if (mobileMenu?.classList.contains('active')) {
         closeMenu();
      } else {
         openMenu();
      }
   });

   closeMenuBtn?.addEventListener('click', closeMenu);
   overlay?.addEventListener('click', closeMenu);

   navLinks?.forEach(link => {
      link.addEventListener('click', closeMenu);
   });

   document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
   });
})();

