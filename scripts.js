// Quran verses (static array)
const verses = [
  { verse: "Indeed, with hardship comes ease (94:6)", meaning: "Allah promises relief after every difficulty." },
  { verse: "So remember Me; I will remember you (2:152)", meaning: "Remembrance of Allah brings His mercy and closeness." },
  { verse: "And whoever fears Allah - He will make for him a way out (65:2)", meaning: "Taqwa opens doors to solutions." },
  { verse: "Allah does not burden a soul beyond that it can bear (2:286)", meaning: "You are stronger than you think with Allah’s decree." },
  { verse: "The life of this world is but a fleeting enjoyment (3:185)", meaning: "Focus on the eternal, not the temporary." },
  { verse: "Call upon Me; I will respond to you (40:60)", meaning: "Allah is always near, ready to answer your du’a." },
  { verse: "And We have certainly made the Quran easy for remembrance (54:17)", meaning: "The Quran is accessible to all who seek it." },
  { verse: "And He found you lost and guided you (93:7)", meaning: "Allah’s guidance is a gift to the seeking heart." },
  { verse: "Indeed, the mercy of Allah is near to the doers of good (7:56)", meaning: "Good deeds draw you closer to Allah’s rahmah." },
  { verse: "So be patient. Indeed, the promise of Allah is truth (30:60)", meaning: "Trust in Allah’s timing and promises." },
  { verse: "And whoever puts his trust in Allah, He will suffice him (65:3)", meaning: "Reliance on Allah is enough for all needs." },
  { verse: "Indeed, in the remembrance of Allah do hearts find rest (13:28)", meaning: "Peace comes through dhikr." },
  { verse: "And your Lord is the Forgiving, Full of Mercy (18:58)", meaning: "Allah’s forgiveness is vast and ever-present." },
  { verse: "Say, ‘My prayer, my sacrifice, my living, and my dying are for Allah’ (6:162)", meaning: "Dedicate your life to Allah alone." },
  { verse: "And the Hereafter is better for you than the first life (93:4)", meaning: "The eternal reward surpasses this world." },
  { verse: "Indeed, Allah is with the patient (2:153)", meaning: "Patience brings Allah’s companionship." },
  { verse: "And We send down of the Quran that which is healing and mercy (17:82)", meaning: "The Quran heals the heart and soul." },
  { verse: "Whoever does righteousness, it is for his own soul (41:46)", meaning: "Good deeds benefit you first." },
  { verse: "And seek help through patience and prayer (2:45)", meaning: "Strength lies in sabr and salah." },
  { verse: "Indeed, those who have believed and done righteous deeds - the Most Merciful will appoint for them affection (19:96)", meaning: "Faith and good deeds earn Allah’s love." },
  { verse: "My mercy encompasses all things (7:156)", meaning: "Allah’s rahmah is limitless." },
  { verse: "And do good; indeed, Allah loves the doers of good (2:195)", meaning: "Kindness is beloved to Allah." },
  { verse: "Indeed, the decree of Allah is always destined (15:21)", meaning: "Everything happens by Allah’s perfect plan." },
  { verse: "And whoever turns away from My remembrance - indeed, he will have a depressed life (20:124)", meaning: "Nearness to Allah brings happiness." },
  { verse: "Indeed, Allah is the best of providers (62:11)", meaning: "Trust Allah for your sustenance." },
  { verse: "And We have not sent you except as a mercy to the worlds (21:107)", meaning: "The Prophet (PBUH) is a blessing for all." },
  { verse: "So whoever does an atom’s weight of good will see it (99:7)", meaning: "No good deed is too small for reward." },
  { verse: "And whoever is grateful - his gratitude is only for his own good (27:40)", meaning: "Shukr benefits the thankful." },
  { verse: "Indeed, the righteous will be in pleasure (83:22)", meaning: "Righteousness leads to eternal joy." },
  { verse: "And Allah is the best of planners (3:54)", meaning: "Allah’s plans always prevail." }
];

// Date and time display with corrected Hijri (Bangladesh time)
function updateDateTime() {
  const now = new Date();
  const bangladeshTime = new Date(now.getTime() + (6 * 60 * 60 * 1000));
  document.getElementById('gregorian').textContent = bangladeshTime.toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true,
    timeZone: 'UTC'
  });

  // Hijri date aligned to Ramadan start (March 1, 2025, 18:00 UTC = March 2, 00:00 BDT = 1 Ramadan 1446 AH)
  const ramadanStart = new Date('2025-03-01T18:00:00Z');
  const ramadanStartBangladesh = new Date(ramadanStart.getTime() + (6 * 60 * 60 * 1000));
  const timeDiff = bangladeshTime - ramadanStartBangladesh;
  const daysSinceRamadanStart = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
  document.getElementById('hijri').textContent = `${daysSinceRamadanStart} Ramadan 1446 AH`;
}

// Display daily verse
function updateVerse() {
  const now = new Date();
  const bangladeshTime = new Date(now.getTime() + (6 * 60 * 60 * 1000));
  const ramadanDay = (bangladeshTime.getDate() - 2) % 30; // Adjust for 0-based index starting March 2
  const verse = verses[ramadanDay];
  document.getElementById('verse').textContent = verse.verse;
  document.getElementById('meaning').textContent = verse.meaning;
}

// Check submission window (Bangladesh time)
function isSubmissionWindowOpen() {
  const now = new Date();
  const bangladeshTime = new Date(now.getTime() + (6 * 60 * 60 * 1000));
  const hours = bangladeshTime.getUTCHours();
  const isOpen = (hours >= 18 || hours < 4);
  document.getElementById('alert').textContent = isOpen ? '' : 'Form submissions are only accepted between 6 PM and 4 AM daily.';
  document.getElementById('alert').style.display = isOpen ? 'none' : 'block';
  return isOpen;
}

// Fetch leaderboard from Apps Script proxy
async function refreshLeaderboard() {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxE87kjsMtTz510VNgAs0SnwbvWzOxQ9-cKTyLh6Xx10t9UK8sYJkc-1qaXKQ9O9R8P/exec'); // Replace with your Apps Script URL
    if (!response.ok) throw new Error('Fetch failed: ' + response.status);
    const data = await response.json();
    console.log('Leaderboard data:', data); // Debug log
    const table = document.getElementById('leaderboard');
    while (table.rows.length > 1) table.deleteRow(1);
    data.forEach((entry, index) => {
      const row = table.insertRow();
      row.innerHTML = `<td>${entry.twitter}</td><td>${entry.score}</td>`;
      if (index === 0) {
        row.style.background = 'rgba(212, 160, 23, 0.2)';
        row.style.fontWeight = 'bold';
        row.style.color = '#d4a017';
      }
    });
  } catch (error) {
    console.error('Leaderboard error:', error);
    document.getElementById('leaderboard').innerHTML = '<tr><td colspan="2">Error loading leaderboard</td></tr>';
  }
}

// Redirect to form
function beginPlanning() {
  window.location.href = 'https://forms.gle/MFrhkGw7qPFYp6uv8';
}

// Initialize
updateDateTime();
updateVerse();
isSubmissionWindowOpen();
refreshLeaderboard();
setInterval(updateDateTime, 1000);
