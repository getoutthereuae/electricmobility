/* Electric Mobility — interactions */
(function(){
  // Nav background on scroll
  var nav = document.querySelector('.nav');
  function onScroll(){
    if(!nav) return;
    if(window.scrollY > 40){ nav.classList.add('scrolled'); }
    else { nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Mobile menu
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.mobile-menu');
  if(burger && menu){
    burger.addEventListener('click', function(){
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        menu.classList.remove('open');
        document.body.style.overflow='';
      });
    });
  }

  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // Product filter (marine page)
  var filterBtns = document.querySelectorAll('.filter-bar button');
  if(filterBtns.length){
    filterBtns.forEach(function(btn){
      btn.addEventListener('click', function(){
        var f = btn.getAttribute('data-filter');
        filterBtns.forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        document.querySelectorAll('[data-group]').forEach(function(g){
          var show = (f === 'all' || g.getAttribute('data-group') === f);
          g.style.display = show ? '' : 'none';
        });
        document.querySelectorAll('.card[data-type]').forEach(function(c){
          var show = (f === 'all' || c.getAttribute('data-type') === f);
          c.style.display = show ? '' : 'none';
        });
      });
    });
  }

  // Contact form (demo only — no backend)
  var form = document.querySelector('.form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('button[type=submit]');
      if(btn){ btn.textContent = 'Message sent ✓'; btn.classList.add('orange'); }
      form.reset();
    });
  }

  // Current year
  var y = document.querySelector('.year');
  if(y){ y.textContent = new Date().getFullYear(); }
})();
