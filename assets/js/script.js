// implimentation of mobile_menu//
const mobileMenu = document.getElementById('mobile_menu');
if (mobileMenu) {
  mobileMenu.addEventListener('click', () => {
    const desktopMenu = document.getElementById('desktop_menu');
    mobileMenu.classList.toggle('active');
    desktopMenu.classList.toggle('active');
  });
} else {
  // eslint-disable-next-line no-console
  console.warn('no element with id "mobile_menu" found.mobile menu event lisener not attached.');
}

// speakers data
const speakers = [
  {
    image: '../assets/images/actor2.jpg',
    name: 'Yochai Benkler',
    profession: 'Berkman Professor of Entrepreneurial Legal Studies at Harvard Law School',
    description: 'Benkler studies commons-based peer production, and published his seminal book, The Wealth of Networks in 2006',
  },
  {
    image: '../assets/images/actor6.jpg',
    name: 'SohYeong Noh',
    profession: 'Director of Art Centre Nabi and a board member of CC Korea',
    description: 'As the main venue for new media art production in Korea, Nabi promotes cross-disciplinary collaboration and understanding among science technology, humanities, and the arts.',
  },
  {
    image: '../assets/images/actor9.jpg',
    name: 'Lila Tretikov',
    profession: 'Executive Director of the Wikimedia Foundation',
    description: 'Lila Tretikov is the Executive of the Wikimedia Foundation, the nonprofit organization that operates Wikipedia. Wikipedia is freely available in 290 languages and used by nearly half a billion people around the world every month.',
  },
  {
    image: '../assets/images/actor9.jpg',
    name: 'Kilnam Chon',
    profession: 'Pioneer of the Internet in Asia',
    description: 'Kilnam Chon helped bring the internet to Asia and is an outspoken advocate for the open web and digital commons. In 2012 he was inducted into the Internet Hall of Fame.',
  },
  {
    image: '../assets/images/actor7.jpg',
    name: 'Julia Leda',
    profession: 'President of Young Pirates of Europe',
    description: 'European integration, political democracy and participation of youth online are her major concerns. Reda’s report outlining potential changes to EU copyright law was approved by the Parliament in July.',
  },
  {
    image: '../assets/images/actor8.jpg',
    name: 'Ryan Merkley',
    profession: 'CEO of Creative Commons, ex-COO of the Mozilla Foundation',
    description: 'Ryan has led open-source projects and advocated for open licensing and the open web.',
  },
];

// create a single speaker card element matching the HTML structure
function createSpeakerCard(data) {
  const card = document.createElement('div');
  card.className = 'speaker_card';

  const img = document.createElement('img');
  img.src = data.image;
  img.alt = data.name;
  card.appendChild(img);

  const desc = document.createElement('div');
  desc.className = 'speaker_description';

  const h3 = document.createElement('h3');
  h3.textContent = data.name;
  desc.appendChild(h3);

  const p = document.createElement('p');
  p.textContent = data.profession;
  desc.appendChild(p);

  const lineBreak = document.createElement('div');
  lineBreak.className = 'line_break';
  const innerP = document.createElement('p');
  lineBreak.appendChild(innerP);
  desc.appendChild(lineBreak);

  const h5 = document.createElement('h5');
  h5.textContent = data.description;
  desc.appendChild(h5);

  card.appendChild(desc);
  return card;
}

// helper function to show/hide extra speakers
function showExtras(container, toggle, show) {
  const extras = container.querySelectorAll('.extra-speaker');
  extras.forEach((el) => { el.style.display = show ? '' : 'none'; });
  toggle.textContent = show ? 'Less' : 'More';
}

// insert speaker cards into container #speaker_cards and add More/Less toggle
function insertSpeakerCards(isCompact = true) {
  const container = document.getElementById('speaker_cards');
  if (!container) {
    // eslint-disable-next-line no-console
    console.warn('No element with id "speaker_cards" found. Skipping speaker insertion.');
    return;
  }
  container.innerHTML = '';
  const visibleCount = isCompact ? 2 : speakers.length;

  speakers.forEach((s, idx) => {
    const card = createSpeakerCard(s);
    if (idx >= visibleCount) {
      card.classList.add('extra-speaker');
      card.style.display = 'none';
    } else {
      card.style.display = '';
    }
    container.appendChild(card);
  });

  // manage toggle only for compact (mobile/tablet) view
  let toggle = document.getElementById('toggle_speakers_btn');
  if (isCompact) {
    if (!toggle) {
      toggle = document.createElement('button');
      toggle.id = 'toggle_speakers_btn';
      toggle.className = 'speaker_button';
      toggle.type = 'button';
      toggle.textContent = 'More';
      container.parentNode.insertBefore(toggle, container.nextSibling);
    }

    // ensure we don't attach duplicate listeners
    toggle.replaceWith(toggle.cloneNode(true));
    toggle = document.getElementById('toggle_speakers_btn');
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = toggle.textContent === 'More';
      showExtras(container, toggle, isHidden);
    });

    // close extras when clicking outside
    document.addEventListener('click', (e) => {
      const isOpen = toggle.textContent === 'Less';
      if (!isOpen) return;
      const clickedInside = container.contains(e.target) || toggle.contains(e.target);
      if (!clickedInside) showExtras(container, toggle, false);
    });
  } else {
    // desktop: remove toggle if present
    if (toggle && toggle.parentNode) toggle.parentNode.removeChild(toggle);
    // make sure all extra cards are visible
    const extras = container.querySelectorAll('.extra-speaker');
    extras.forEach((el) => { el.style.display = ''; });
  }
}

// Responsive rendering: mobile/tablet show limited cards with toggle; desktop shows all
function setupResponsiveSpeakers() {
  const mql = window.matchMedia('(max-width: 1023px)');

  function render() {
    insertSpeakerCards(mql.matches);
  }

  // initial render
  render();

  // listen for changes
  if (typeof mql.addEventListener === 'function') {
    mql.addEventListener('change', render);
  } else if (typeof mql.addListener === 'function') {
    mql.addListener(render);
  }
}

setupResponsiveSpeakers();