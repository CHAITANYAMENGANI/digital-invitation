
"use strict";

/* ==========================================
   WEDDING CONFIGURATION
========================================== */

const WEDDING = {
    couple: "Anvi & Vallabh",

    weddingStart: "2026-11-22T12:26:00+05:30",

    deadline: "November 15, 2026",

    events: [
        {
    key: "haldi",
    name: "Pellikuthuru / Haldi",
    date: "2026-11-18",
    time: "9:30 AM Onwards followed by lunch",
    venue: "Gooty Farms",
    description: "The wedding week begins with turmeric, music, and the warmth of loved ones gathering to bless the journey ahead 💛",
    moodBoard: "Maharashtrian Muse 🌞",
    icon: "♨"
},
        {
            key: "mehendi",
            name: "Mehendi / Sangeet",
            date: "2026-11-19",
            time: "7:00 PM onwards",
            venue: "Hyderabad",
            description:
                "An evening of henna, music, laughter and dance."
        },
        {
            key: "rest",
            name: "Rest & Refresh",
            date: "2026-11-20",
            time: "All day",
            venue: "Hyderabad",
            description:
                "A day to relax and prepare for the celebrations."
        },
        {
            key: "sreemanthpooja",
            name: "Sreemanth Pooja / Edurukolu",
            date: "2026-11-21",
            time: "7:00 PM onwards",
            venue: "Hyderabad",
            description:
                "A sacred ceremony of blessings and traditions."
        },
        {
            key: "wedding",
            name: "Wedding",
            date: "2026-11-22",
            time: "12:26 PM · Muhurtham",
            venue: "Hyderabad",
            description:
                "Witness the vows, sacred rituals and the beginning of forever."
        },
        {
            key: "reception",
            name: "Reception",
            date: "2026-11-25",
            time: "7:00 PM onwards",
            venue: "Hyderabad",
            description:
                "An elegant evening of celebration, music and togetherness."
        }
    ]
};


/* ==========================================
   INVITATION EXPERIENCE PRESETS
========================================== */

const EXPERIENCE_PRESETS = {

    "full": {
        title: "The Full Wedding Week",
        eyebrow: "Together with our families",
        heroCopy:
            "Invite you to be part of every cherished moment — haldi, sangeet, the wedding ceremony and everything in between.",
        eventHeading: "The Celebrations",
        eventCopy:
            "Each moment is a celebration, woven together by love, tradition and family.",
        events: WEDDING.events.map(e => e.key)
    },

    "haldi": {
        title: "Pellikuthuru / Haldi Invitation",
        eyebrow: "With blessings and warmth",
        heroCopy:
            "Invite you to share in the Pellikuthuru morning of blessings, turmeric and family love.",
        eventHeading: "The Pellikuthuru",
        eventCopy:
            "A joyful morning of turmeric, blessings and family rituals.",
        events: ["haldi"]
    },

    "mehendi": {
        title: "Mehendi & Sangeet Invitation",
        eyebrow: "An evening of celebration",
        heroCopy:
            "Invite you to an evening of henna, music, laughter and dance.",
        eventHeading: "The Mehendi & Sangeet",
        eventCopy:
            "An evening of colour, music and celebration.",
        events: ["mehendi"]
    },

    "sreemanthpooja": {
        title: "Sreemanthpooja Invitation",
        eyebrow: "With reverence and love",
        heroCopy:
            "Invite you to witness the sacred ceremony of blessings that welcomes the bride with love.",
        eventHeading: "The Sreemanthpooja",
        eventCopy:
            "A sacred and intimate blessing ceremony.",
        events: ["sreemanthpooja"]
    },

    "wedding": {
        title: "Wedding Ceremony Invitation",
        eyebrow: "With blessings and joy",
        heroCopy:
            "Invite you to witness the vows, sacred rituals and the moment it all begins.",
        eventHeading: "The Wedding Day",
        eventCopy:
            "The most sacred day of the celebration — come witness the vows.",
        events: ["wedding"]
    },

    "reception": {
        title: "Reception Invitation",
        eyebrow: "Join us for an evening of celebration",
        heroCopy:
            "Invite you to a joyful evening reception filled with warmth, music and great company.",
        eventHeading: "The Reception",
        eventCopy:
            "An elegant evening to celebrate together.",
        events: ["reception"]
    }
};


/* ==========================================
   APPLICATION STATE
========================================== */

let rsvpParty = 1;
let currentPreset = "full";

let guestName = "";
let guestPhone = "";

let eventSelections = {};

let journeyJoined = false;
let journeyNight = false;


/* ==========================================
   HELPERS
========================================== */

const $ = id => document.getElementById(id);

function showMessage(message) {
    let old = document.querySelector(".app-toast");

    if (old) old.remove();

    const toast = document.createElement("div");

    toast.className = "app-toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}

function formatDate(dateString) {

    return new Date(dateString + "T12:00:00")
        .toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
}

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}


/* ==========================================
   INVITATION PRESET SELECTOR
========================================== */

function createPresetSelector() {

    const intro = document.querySelector(".rsvp-intro");

    const wrapper = document.createElement("div");

    wrapper.className = "preset-selector";

    wrapper.innerHTML = `
        <label for="presetSelect">Invitation experience</label>

        <select id="presetSelect">
            <option value="full">Full Wedding Week</option>
            <option value="haldi">Pellikuthuru / Haldi</option>
            <option value="mehendi">Mehendi / Sangeet</option>
            <option value="sreemanthpooja">
                Sreemanth Pooja / Edurukolu
            </option>
            <option value="wedding">Wedding</option>
            <option value="reception">Reception</option>
        </select>
    `;

    intro.appendChild(wrapper);

    $("presetSelect").addEventListener("change", e => {
        applyPreset(e.target.value);
    });
}

function applyPreset(key) {

    const preset = EXPERIENCE_PRESETS[key];

    if (!preset) return;

    currentPreset = key;

    $("presetSelect").value = key;

    $("eventsKicker").textContent = preset.eventHeading;

    $("eventsCopy").textContent = preset.eventCopy;

    $("hero-kicker") &&
        ($("hero-kicker").textContent = preset.eyebrow);

    document.querySelector(".hero-kicker").textContent =
        preset.eyebrow;

    document.querySelector(".hero-copy").textContent =
        preset.heroCopy;

    renderEvents();

    eventSelections = {};

    updateEventSelections();

    showMessage(preset.title);
}




/* ==========================================
   PREMIUM WEDDING EVENT CARDS
========================================== */

function renderEvents() {

    const preset = EXPERIENCE_PRESETS[currentPreset];

    const selectedEvents = WEDDING.events.filter(event =>
        preset.events.includes(event.key)
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventHTML = selectedEvents.map((event, index) => {

        // Parse event date without UTC date shifting
        const dateText = String(event.date || "");
const isoDate = /^\d{4}-\d{2}-\d{2}$/.test(dateText)
    ? dateText
    : "";

const parts = isoDate
    ? isoDate.split("-").map(Number)
    : [];

        const eventDate = parts.length === 3 &&
            parts.every(Number.isFinite)
            ? new Date(parts[0], parts[1] - 1, parts[2])
            : new Date(event.date);

        const validDate = !Number.isNaN(eventDate.getTime());

        const month = validDate
            ? eventDate.toLocaleDateString("en-US", { month: "short" })
            : "";

        const day = validDate
            ? eventDate.getDate()
            : "";

        const daysRemaining = validDate
            ? Math.ceil((eventDate - today) / 86400000)
            : null;

        const countdownText = daysRemaining === null
            ? ""
            : daysRemaining < 0
                ? "Completed"
                : daysRemaining === 0
                    ? "Today"
                    : `${daysRemaining} days`;

        const description = event.description || "";
        const venue = event.venue || "Venue to be announced";
        const mood = event.moodBoard || "";
        const icon = event.icon || "✧";

        const accentColors = [
            "#dcae36",
            "#b95c6a",
            "#9b79b7",
            "#6f9b89",
            "#c58b43"
        ];

        return `
            <article
                class="event-card reveal"
                style="
                    --event-index:${index};
                    --event-accent:${accentColors[index % accentColors.length]};
                "
            >

                <div class="event-top">

                    <div class="event-date-badge">

                        <span class="month">
                            ${escapeHTML(month)}
                        </span>

                        <span class="day">
                            ${escapeHTML(String(day))}
                        </span>

                    </div>

                    <div class="event-heading">

                        <h3>
                            ${escapeHTML(event.name)}
                        </h3>

                        <p class="event-time">
                            ◷ ${escapeHTML(event.time || "")}
                        </p>

                    </div>

                    <div class="event-icon" aria-hidden="true">
                        ${escapeHTML(icon)}
                    </div>

                </div>

                <p class="event-venue">
                    ${escapeHTML(venue)} 📍
                </p>

                <p class="event-description">
                    ${escapeHTML(description)}
                </p>

                ${mood ? `
                    <p class="event-mood">
                        <strong>Mood Board:</strong>
                        ${escapeHTML(mood)}
                    </p>
                ` : ""}

                ${countdownText ? `
                    <div class="event-countdown">
                        ◷ ${escapeHTML(countdownText)}
                    </div>
                ` : ""}

                <div class="event-actions">

                    <button
                        class="btn"
                        type="button"
                        data-map="${escapeHTML(event.key)}"
                    >
                        Map
                    </button>

                    <button
                        class="btn"
                        type="button"
                        data-calendar="${escapeHTML(event.key)}"
                    >
                        Add to Calendar
                    </button>

                </div>

            </article>
        `;

    }).join("");

    $("eventCards").innerHTML = eventHTML;

    observeReveals();
}



/* ==========================================
   COUNTDOWN
========================================== */

function updateCountdown() {

    const target = new Date(WEDDING.weddingStart).getTime();

    let difference = target - Date.now();

    if (difference < 0) difference = 0;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    $("days").textContent = String(days).padStart(2, "0");

    $("hours").textContent = String(hours).padStart(2, "0");

    $("minutes").textContent = String(minutes).padStart(2, "0");

    $("seconds").textContent = String(seconds).padStart(2, "0");
}


/* ==========================================
   GOOGLE MAPS
========================================== */

function openMap(eventKey) {

    const event = WEDDING.events.find(e => e.key === eventKey);

    if (!event) return;

    const query = encodeURIComponent(event.venue);

    window.open(
        `https://www.google.com/maps/search/?api=1&query=${query}`,
        "_blank",
        "noopener"
    );
}


/* ==========================================
   CALENDAR GENERATION
========================================== */

function getCalendarDate(date, time) {

    const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);

    let hour = 10;
    let minute = 0;

    if (match) {

        hour = Number(match[1]);
        minute = Number(match[2]);

        const meridian = match[3].toUpperCase();

        if (meridian === "PM" && hour !== 12) hour += 12;

        if (meridian === "AM" && hour === 12) hour = 0;
    }

    const [year, month, day] = date.split("-").map(Number);

    return new Date(year, month - 1, day, hour, minute);
}

function toICSDate(date) {

    return date.toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
}

function escapeICS(value) {

    return String(value)
        .replace(/\\/g, "\\\\")
        .replace(/,/g, "\\,")
        .replace(/;/g, "\\;")
        .replace(/\n/g, "\\n");
}

function createCalendarEvent(event) {

    const start = getCalendarDate(event.date, event.time);

    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

    return `
BEGIN:VEVENT
UID:${event.key}-${event.date}@anvi-vallabh
DTSTAMP:${toICSDate(new Date())}
DTSTART:${toICSDate(start)}
DTEND:${toICSDate(end)}
SUMMARY:${escapeICS(WEDDING.couple + " - " + event.name)}
LOCATION:${escapeICS(event.venue)}
DESCRIPTION:${escapeICS(event.description)}
END:VEVENT
`.trim();
}

function downloadFile(filename, content, type) {

    const blob = new Blob([content], { type });

    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");

    anchor.href = url;

    anchor.download = filename;

    document.body.appendChild(anchor);

    anchor.click();

    anchor.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function downloadCalendar(events) {

    if (!events.length) {
        showMessage("No events available.");
        return;
    }

    const calendar = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Anvi and Vallabh//Wedding//EN",
        "CALSCALE:GREGORIAN",
        ...events.map(createCalendarEvent),
        "END:VCALENDAR"
    ].join("\r\n");

    downloadFile(
        "Anvi-Vallabh-Wedding.ics",
        calendar,
        "text/calendar;charset=utf-8"
    );

    showMessage("Calendar downloaded successfully.");
}

function addPackageCalendar() {

    const preset = EXPERIENCE_PRESETS[currentPreset];

    const events = WEDDING.events.filter(event =>
        preset.events.includes(event.key)
    );

    downloadCalendar(events);
}

function addSingleCalendar(eventKey) {

    const event = WEDDING.events.find(e => e.key === eventKey);

    if (event) downloadCalendar([event]);
}


/* ==========================================
   DOWNLOAD ITINERARY
========================================== */

function downloadItinerary() {

    const preset = EXPERIENCE_PRESETS[currentPreset];

    const events = WEDDING.events.filter(event =>
        preset.events.includes(event.key)
    );

    let content = `
ANVI & VALLABH
WEDDING CELEBRATIONS

November 2026
Hyderabad

`;

    events.forEach(event => {

        content += `
${event.name}

Date: ${formatDate(event.date)}
Time: ${event.time}
Venue: ${event.venue}

${event.description}

--------------------------------
`;

    });

    downloadFile(
        "Anvi-Vallabh-Itinerary.txt",
        content,
        "text/plain;charset=utf-8"
    );
}


/* ==========================================
   RSVP IDENTIFICATION
========================================== */

function submitIdentify() {

    const phone = $("identifyPhone").value.trim();

    const digits = phone.replace(/\D/g, "");

    $("identifyError").textContent = "";

    if (digits.length < 10 || digits.length > 15) {

        $("identifyError").textContent =
            "Please enter a valid phone number.";

        return;
    }

    guestPhone = phone;

    $("rsvpPhone").value = phone;

    $("rsvpIdentify").hidden = true;

    $("rsvpForm").hidden = false;

    $("rsvpNameInput").focus();
}


/* ==========================================
   PARTY SIZE
========================================== */

function updateParty(value) {

    rsvpParty += value;

    rsvpParty = Math.max(1, Math.min(20, rsvpParty));

    $("rsvpParty").textContent = rsvpParty;

    updateSummary();
}


/* ==========================================
   EVENT ATTENDANCE SELECTION
========================================== */

function updateEventSelections() {

    const preset = EXPERIENCE_PRESETS[currentPreset];

    const events = WEDDING.events.filter(event =>
        preset.events.includes(event.key)
    );

    $("eventSelectGrid").innerHTML = events.map(event => {

        const selection = eventSelections[event.key] || "";

        return `
            <div class="event-select-row">

                <div class="event-select-info">

                    <div class="event-select-name">
                        ${escapeHTML(event.name)}
                    </div>

                    <div class="event-select-date">
                        ${formatDate(event.date)}
                    </div>

                </div>

                <div class="event-select-options">

                    <button
                        type="button"
                        class="event-select-btn ${
                            selection === "Yes" ? "active-attending" : ""
                        }"
                        data-choice="Yes"
                        data-event="${event.key}">
                        Yes
                    </button>

                    <button
                        type="button"
                        class="event-select-btn ${
                            selection === "No" ? "active-declining" : ""
                        }"
                        data-choice="No"
                        data-event="${event.key}">
                        No
                    </button>

                    <button
                        type="button"
                        class="event-select-btn ${
                            selection === "Maybe" ? "active-maybe" : ""
                        }"
                        data-choice="Maybe"
                        data-event="${event.key}">
                        Maybe
                    </button>

                </div>

            </div>
        `;

    }).join("");

    updateSummary();
}

function selectAttendance(eventKey, choice) {

    eventSelections[eventKey] = choice;

    updateEventSelections();
}

function declineAllEvents() {

    const preset = EXPERIENCE_PRESETS[currentPreset];

    preset.events.forEach(key => {
        eventSelections[key] = "No";
    });

    updateEventSelections();
}


/* ==========================================
   RSVP SUMMARY
========================================== */

function updateSummary() {

    const preset = EXPERIENCE_PRESETS[currentPreset];

    const events = WEDDING.events.filter(event =>
        preset.events.includes(event.key)
    );

    const attending = events.filter(event =>
        eventSelections[event.key] === "Yes"
    ).length;

    const maybe = events.filter(event =>
        eventSelections[event.key] === "Maybe"
    ).length;

    $("responseSummary").innerHTML = `
        <strong>${attending}</strong> events attending ·
        <strong>${maybe}</strong> tentative ·
        Party size: <strong>${rsvpParty}</strong>
    `;
}


/* ==========================================
   RSVP SUBMISSION
========================================== */

function submitRSVP() {

    const name = $("rsvpNameInput").value.trim();

    const phone = $("rsvpPhone").value.trim();

    const email = $("rsvpEmail").value.trim();

    const notes = $("rsvpNotes").value.trim();

    $("rsvpError").textContent = "";

    if (name.length < 2) {

        $("rsvpError").textContent =
            "Please enter your name.";

        return;
    }

    if (!phone || phone.replace(/\D/g, "").length < 10) {

        $("rsvpError").textContent =
            "Please enter a valid phone number.";

        return;
    }

    const preset = EXPERIENCE_PRESETS[currentPreset];

    const events = WEDDING.events.filter(event =>
        preset.events.includes(event.key)
    );

    const unanswered = events.filter(event =>
        !eventSelections[event.key]
    );

    if (unanswered.length) {

        $("rsvpError").textContent =
            "Please select Yes, No or Maybe for every event.";

        return;
    }

    const response = {

        name,
        phone,
        email,

        partySize: rsvpParty,

        attendanceType: currentPreset,

        events: { ...eventSelections },

        notes,

        submittedAt: new Date().toISOString()

    };

    guestName = name;
    guestPhone = phone;

    /*
       FRONTEND DEMO STORAGE

       This saves on the current browser only.

       For real guest management, connect a Django,
       Flask or Node.js backend.
    */

    try {

        const saved = JSON.parse(
            localStorage.getItem("weddingRSVPs") || "[]"
        );

        saved.push(response);

        localStorage.setItem(
            "weddingRSVPs",
            JSON.stringify(saved)
        );

        localStorage.setItem(
            "latestWeddingRSVP",
            JSON.stringify(response)
        );

    } catch (error) {

        console.error("Local RSVP storage failed:", error);

    }

    $("rsvpForm").hidden = true;

    $("rsvpIdentify").hidden = true;

    $("rsvpSuccess").hidden = false;

    $("rsvpSuccessTitle").textContent =
        `Thank you, ${name}!`;

    $("rsvpSuccessBody").textContent =
        "We've received your response locally. We can't wait to celebrate with you.";

    createConfetti();
}


/* ==========================================
   UPDATE RSVP
========================================== */

function editRSVP() {

    $("rsvpSuccess").hidden = true;

    $("rsvpForm").hidden = false;

    $("rsvpNameInput").value = guestName;

    $("rsvpPhone").value = guestPhone;

}


/* ==========================================
   CONFETTI ANIMATION
========================================== */

function createConfetti() {

    const container = $("confettiContainer");

    container.innerHTML = "";

    for (let i = 0; i < 35; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti-piece";

        piece.style.left = Math.random() * 100 + "%";

        piece.style.animationDelay = Math.random() * 1.5 + "s";

        piece.style.background = [
            "#b18a50",
            "#c78b83",
            "#73856d",
            "#e6c98d"
        ][Math.floor(Math.random() * 4)];

        container.appendChild(piece);
    }
}



/* =========================================
   DRAG TO UNITE ANIMATION
========================================= */

function initDragToUnite() {

    const card = document.getElementById("uniteCard");
    const slider = document.getElementById("uniteSlider");

    if (!card || !slider) return;

    const $u = id => document.getElementById(id);

    const mix = (a, b, t) => a + (b - a) * t;

    function hexBlend(start, end, amount) {

        return "#" + [1, 3, 5].map(index => {

            const a = parseInt(start.substring(index, index + 2), 16);

            const b = parseInt(end.substring(index, index + 2), 16);

            return Math.round(mix(a, b, amount))
                .toString(16)
                .padStart(2, "0");

        }).join("");

    }

    function updateUnite() {

        let progress = Number(slider.value) / 1000;

        if (progress > 0.96) {
            progress = 1;
            slider.value = 1000;
        }

        const skierX = mix(60, 372, progress);

        const skierY = 130 + skierX * (75 / 400);

        const kayakerX = mix(740, 440, progress);

        const bob = Math.sin(progress * 30) * 2;

        // Move skier
        $u("uniteSkier").setAttribute(
            "transform",
            `translate(${skierX},${skierY})`
        );

        // Move kayaker
        $u("uniteKayaker").setAttribute(
            "transform",
            `translate(${kayakerX},${208 + bob})`
        );

        // Hide travellers when united
        const opacity = progress === 1 ? 0 : 1;

        $u("uniteSkier").style.opacity = opacity;

        $u("uniteKayaker").style.opacity = opacity;

        // Sunset transformation
        $u("uniteSkyTop").setAttribute(
            "stop-color",
            hexBlend("#fbd9c0", "#6b5b7b", progress)
        );

        $u("uniteSkyBottom").setAttribute(
            "stop-color",
            hexBlend("#fdeede", "#e0a07a", progress)
        );

        // Sun movement
        $u("uniteSun").setAttribute(
            "cy",
            mix(170, 215, progress)
        );

        // Reveal couple
        card.classList.toggle("done", progress === 1);

        // Text change
        $u("uniteTitle").textContent =
            progress === 1
                ? "Together at last ♥"
                : "Drag to bring them together";

        $u("uniteHint").style.visibility =
            progress === 1 ? "hidden" : "visible";

    }

    slider.addEventListener("input", updateUnite);

    // Reset if the user moves the slider backwards
    slider.addEventListener("change", updateUnite);

    // Final button navigates to existing RSVP section
    $u("uniteRsvpButton").addEventListener("click", () => {

        const rsvp = document.getElementById("rsvpSection");

        if (rsvp) {

            rsvp.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

    updateUnite();
}

// Initialize after page loads
document.addEventListener("DOMContentLoaded", initDragToUnite);



/* ==========================================
   SCROLL ANIMATIONS
========================================== */

function observeReveals() {

    const elements = document.querySelectorAll(
        ".reveal:not(.is-visible)"
    );

    if (!("IntersectionObserver" in window)) {

        elements.forEach(element =>
            element.classList.add("is-visible")
        );

        return;
    }

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.08
    });

    elements.forEach(element => observer.observe(element));
}


/* ==========================================
   SCROLL PROGRESS
========================================== */

function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const totalHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = totalHeight > 0
        ? (scrollTop / totalHeight) * 100
        : 0;

    $("scrollProgressBar").style.width =
        Math.min(progress, 100) + "%";

}


/* ==========================================
   STICKY BAR
========================================== */

function updateStickyBar() {

    const bar = $("stickyBar");

    if (window.scrollY > 350) {

        bar.style.display = "flex";

    } else {

        bar.style.display = "none";

    }
}

function jumpToRSVP() {

    $("rsvpSection").scrollIntoView({
        behavior: "smooth"
    });

}


/* ==========================================
   PETAL ANIMATION
========================================== */

function startPetals() {

    const canvas = $("petalCanvas");

    const ctx = canvas.getContext("2d");

    let width;
    let height;

    const petals = [];

    function resize() {

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    }

    resize();

    window.addEventListener("resize", resize);

    function createPetal() {

        return {

            x: Math.random() * width,

            y: Math.random() * height,

            size: Math.random() * 5 + 3,

            speed: Math.random() * 0.7 + 0.3,

            drift: Math.random() * 0.8 - 0.4,

            rotation: Math.random() * Math.PI,

            rotationSpeed: Math.random() * 0.02 - 0.01

        };

    }

    for (let i = 0; i < 16; i++) {

        petals.push(createPetal());

    }

    function animate() {

        ctx.clearRect(0, 0, width, height);

        petals.forEach(petal => {

            petal.y += petal.speed;

            petal.x += petal.drift;

            petal.rotation += petal.rotationSpeed;

            if (petal.y > height + 20) {

                petal.y = -20;

                petal.x = Math.random() * width;

            }

            ctx.save();

            ctx.translate(petal.x, petal.y);

            ctx.rotate(petal.rotation);

            ctx.fillStyle = "rgba(194, 136, 125, 0.38)";

            ctx.beginPath();

            ctx.ellipse(
                0,
                0,
                petal.size,
                petal.size * 0.55,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.restore();

        });

        requestAnimationFrame(animate);

    }

    animate();

}


/* ==========================================
   PHOTO LIGHTBOX
========================================== */

function openPhotoLightbox(src) {

    $("lightboxImg").src = src;

    $("photoLightbox").hidden = false;

}

function closePhotoLightbox() {

    $("photoLightbox").hidden = true;

    $("lightboxImg").src = "";

}


/* ==========================================
   EVENT LISTENERS
========================================== */

$("eventCards").addEventListener("click", event => {

    const mapButton = event.target.closest("[data-map]");

    const calendarButton = event.target.closest("[data-calendar]");

    if (mapButton) {

        openMap(mapButton.dataset.map);

    }

    if (calendarButton) {

        addSingleCalendar(calendarButton.dataset.calendar);

    }

});


$("eventSelectGrid").addEventListener("click", event => {

    const button = event.target.closest("[data-choice]");

    if (!button) return;

    selectAttendance(
        button.dataset.event,
        button.dataset.choice
    );

});


$("identifyBtn").addEventListener("click", submitIdentify);

$("partyMinus").addEventListener("click", () => updateParty(-1));

$("partyPlus").addEventListener("click", () => updateParty(1));

$("declineAllBtn").addEventListener("click", declineAllEvents);

$("rsvpBtn").addEventListener("click", submitRSVP);

$("updateRsvpBtn").addEventListener("click", editRSVP);

$("packageCalendarBtn").addEventListener("click", addPackageCalendar);

$("stickyCalendarBtn").addEventListener("click", addPackageCalendar);

$("rsvpCalendarBtn").addEventListener("click", addPackageCalendar);

$("itineraryDownloadBtn").addEventListener("click", downloadItinerary);

$("stickyRsvpBtn").addEventListener("click", jumpToRSVP);

$("lightboxClose").addEventListener("click", closePhotoLightbox);

$("photoLightbox").addEventListener("click", event => {

    if (event.target === $("photoLightbox")) {
        closePhotoLightbox();
    }

});


/* ==========================================
   INITIALIZATION
========================================== */

function init() {

    $("rsvpDeadline").textContent =
        `Kindly respond by ${WEDDING.deadline}.`;

    createPresetSelector();

    applyPreset("full");

    updateCountdown();

    setInterval(updateCountdown, 1000);

    observeReveals();

    startPetals();

    window.addEventListener("scroll", () => {

        updateScrollProgress();

        updateStickyBar();

    }, { passive: true });

    const portraitImage = document.querySelector(
        ".portrait-arch img"
    );

    portraitImage.addEventListener("click", () => {

        if (portraitImage.complete && portraitImage.naturalWidth > 0) {
            openPhotoLightbox(portraitImage.src);
        }

    });

    updateScrollProgress();

    updateStickyBar();

}

document.addEventListener("DOMContentLoaded", init);
