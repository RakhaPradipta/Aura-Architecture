const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Mode frontend-only (deploy Vercel tanpa backend C#):
// set NEXT_PUBLIC_STANDALONE=1 → semua data pakai fallback lokal,
// tanpa mencoba fetch backend sama sekali (build cepat, tanpa warning).
const STANDALONE = process.env.NEXT_PUBLIC_STANDALONE === "1";

// ─── Generic fetcher (ISR-friendly + timeout) ─────────────────────
async function fetchApi<T>(endpoint: string, fallback: T, revalidate = 3600): Promise<T> {
  if (STANDALONE) return fallback;
  const controller = new AbortController();
  // Timeout 6 detik: jangan gantung build / TTFB saat backend cold-start
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      signal: controller.signal,
      // ISR: cache 1 jam, bukan no-store setiap request
      next: { revalidate },
    });

    if (!res.ok) {
      console.warn(`API ${endpoint} returned ${res.status}, using fallback data`);
      return fallback;
    }

    const json = await res.json();
    return json.data as T;
  } catch {
    console.warn(`API ${endpoint} unreachable, using fallback data`);
    return fallback;
  } finally {
    clearTimeout(timer);
  }
}

// ─── Project types ────────────────────────────────────────────────
export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  location: string;
  client: string;
  area: string;
  description: string;
  beforeDescription: string;
  afterDescription: string;
  designChallenge: string;
  designSolution: string;
  materials: string[];
  features: string[];
  tags: string[];
  stats: ProjectStat[];
  teamMembers: string[];
  testimonial: ProjectTestimonial | null;
  image: string;
  images: string[];
}

// ─── Team types ───────────────────────────────────────────────────
export interface SocialLinks {
  linkedin?: string | null;
  instagram?: string | null;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  bias: string;
  biasDescription: string;
  bio: string;
  education: string;
  experience: string;
  notableProjects: string[];
  image: string;
  social: SocialLinks;
}

// ─── Contact types ────────────────────────────────────────────────
export interface ContactRequest {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

// ─── Fallback data (used when C# backend is unavailable) ──────────
const fallbackProjects: Project[] = [
  {
    id: "villa-serenity", title: "Villa Serenity", category: "Residential", year: "2024",
    location: "Ubud, Bali", client: "Private Commission", area: "480 m\u00b2",
    description: "A cantilevered villa blending into the lush jungle canopy. Floor-to-ceiling glass walls dissolve the boundary between interior and tropical landscape, while exposed teak beams echo traditional Balinese craft.",
    beforeDescription: "The site was an overgrown hillside plot with no road access and steep terrain at a 35-degree incline.",
    afterDescription: "A three-level retreat that cascades down the slope, each level offering panoramic views of the Ayung River valley.",
    designChallenge: "Building on a 35-degree slope with no road access meant every material had to be helicopter-lifted or carried up by hand.",
    designSolution: "We designed a series of cantilevered concrete platforms anchored into the hillside, each one offset to follow the natural contour.",
    materials: ["Reclaimed Balinese teak", "Local andesite stone", "Low-iron glass panels", "Board-formed concrete", "Hand-forged iron hardware"],
    features: ["Infinity pool cantilevered over the valley", "Open-air living pavilion with retractable glass walls", "Rainwater harvesting cistern carved from bedrock", "Passive cross-ventilation throughout", "Integrated tropical garden on every level"],
    tags: ["Tropical Modernism", "Cantilever", "Passive Cooling", "Sustainable"],
    stats: [{ label: "Area", value: "480 m\u00b2" }, { label: "Levels", value: "3" }, { label: "Build Time", value: "18 months" }, { label: "Sustainability", value: "Net-zero water" }],
    teamMembers: ["aditya-prasetyo", "maya-kusuma", "dewi-lestari"],
    testimonial: { quote: "Aura understood that we didn't just want a house \u2014 we wanted to live inside the jungle.", author: "Private Client", role: "Homeowner" },
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80"]
  },
  {
    id: "nara-office", title: "Nara Office Tower", category: "Commercial", year: "2023",
    location: "Jakarta, Indonesia", client: "Nara Holdings Group", area: "12,400 m\u00b2",
    description: "A 22-story headquarters wrapped in a kinetic facade of perforated aluminum panels that shift with sunlight, reducing energy consumption by 40%.",
    beforeDescription: "A vacant lot in Jakarta's central business district surrounded by conventional glass towers.",
    afterDescription: "An iconic landmark that redefined the skyline, winning the ASEAN Architecture Award.",
    designChallenge: "Jakarta's equatorial sun beats down on glass towers for 12 hours a day, driving cooling costs through the roof.",
    designSolution: "We developed a kinetic facade system \u2014 2,400 individually angled aluminum panels mounted on motorized pivots that track the sun's path.",
    materials: ["Perforated anodized aluminum", "High-performance insulated glazing", "Recycled steel structural frame", "Polished concrete cores", "Living green wall system"],
    features: ["2,400-panel kinetic facade tracking the sun", "Double-skin curtain wall for natural ventilation", "Sky garden on floor 15 open to the public", "Rooftop solar array powering 30% of operations", "Ground-floor public plaza with water feature"],
    tags: ["Kinetic Facade", "Energy Efficiency", "Commercial", "Innovation"],
    stats: [{ label: "Area", value: "12,400 m\u00b2" }, { label: "Floors", value: "22" }, { label: "Facade Panels", value: "2,400" }, { label: "Energy Reduction", value: "40%" }],
    teamMembers: ["aditya-prasetyo", "rizky-pratama"],
    testimonial: { quote: "The building has become our brand identity.", author: "Hendra Wijaya", role: "CEO, Nara Holdings Group" },
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80", "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80", "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80", "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80"]
  },
  {
    id: "studio-zen", title: "Studio Zen Renovation", category: "Renovation", year: "2024",
    location: "Yogyakarta, Indonesia", client: "Zen Creative Collective", area: "860 m\u00b2",
    description: "Transformation of a colonial-era warehouse into a contemporary co-working space. Original brick walls were preserved and paired with polished concrete floors, steel mezzanines, and a living green wall.",
    beforeDescription: "A derelict 1920s Dutch colonial warehouse with crumbling walls and a collapsed roof section.",
    afterDescription: "A vibrant creative hub that honors its heritage while embracing modern functionality.",
    designChallenge: "The warehouse's original brick walls were structurally compromised in places, and the colonial-era timber roof trusses had rotted through.",
    designSolution: "We injected the failing brick walls with structural epoxy and left the patched sections visible as part of the building's story.",
    materials: ["Original Dutch colonial brick", "Polished concrete", "Blackened steel mezzanines", "Corrugated zinc roofing", "Reclaimed teak from the original trusses"],
    features: ["Preserved original brick walls with visible repair marks", "Double-height central atrium with operable skylights", "Living green wall spanning two floors", "Flexible co-working pods on steel mezzanines", "Rooftop terrace with views of Tugu Yogyakarta"],
    tags: ["Heritage", "Adaptive Reuse", "Co-working", "Sustainable"],
    stats: [{ label: "Area", value: "860 m\u00b2" }, { label: "Original Build", value: "1920s" }, { label: "Renovation", value: "14 months" }, { label: "Waste Diverted", value: "87%" }],
    teamMembers: ["aditya-prasetyo", "dewi-lestari", "sari-permata"],
    testimonial: { quote: "Walking into Studio Zen feels like stepping into a living history book.", author: "Rina Amelia", role: "Founder, Zen Creative Collective" },
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80", "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80", "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80"]
  },
  {
    id: "pavilion-cloud", title: "Cloud Pavilion", category: "Residential", year: "2023",
    location: "Bandung, Indonesia", client: "Private Commission", area: "220 m\u00b2",
    description: "A weekend retreat perched at 1,400 meters elevation. The floating roof plane appears to hover above a glass enclosure.",
    beforeDescription: "A bare mountaintop clearing with panoramic volcanic views but no existing structures.",
    afterDescription: "An ethereal pavilion that appears to float above the clouds, winning a World Architecture Festival nomination.",
    designChallenge: "At 1,400 meters elevation, the site experiences temperature swings of 20\u00b0C in a single day, frequent fog, and intense UV exposure.",
    designSolution: "We designed a single continuous roof plane of white fiber-cement that extends 4 meters beyond the glass walls on all sides.",
    materials: ["White fiber-cement roof panels", "Low-iron structural glass", "Exposed aggregate concrete plinth", "Blackened steel columns (interior)", "Local volcanic stone landscaping"],
    features: ["Cantilevered roof with no visible perimeter columns", "360-degree panoramic glazing", "Underfloor heating powered by geothermal spring", "Fog-harvesting roof channels feeding a reflecting pool", "Minimalist tatami-inspired interior"],
    tags: ["Highland", "Minimalism", "Cantilever", "Volcanic"],
    stats: [{ label: "Area", value: "220 m\u00b2" }, { label: "Elevation", value: "1,400 m" }, { label: "Roof Cantilever", value: "4 m" }, { label: "Temp Range", value: "12\u201332\u00b0C" }],
    teamMembers: ["aditya-prasetyo", "rizky-pratama", "sari-permata"],
    testimonial: { quote: "We wanted a place where we could watch the clouds roll in and feel like we were floating above the world.", author: "Private Client", role: "Homeowner" },
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80", "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"]
  },
  {
    id: "meridian-hotel", title: "The Meridian Hotel", category: "Commercial", year: "2022",
    location: "Lombok, Indonesia", client: "Meridian Hospitality Group", area: "8,200 m\u00b2",
    description: "A 120-room boutique hotel inspired by traditional Sasak architecture. Thatched alang-alang roofs, hand-carved stone screens, and open-air corridors create an immersive cultural experience.",
    beforeDescription: "A flat coastal plot on Lombok's southern shore with limited infrastructure.",
    afterDescription: "A world-class hospitality destination that became a benchmark for culturally responsive resort design.",
    designChallenge: "The brief was to create a luxury hotel that felt authentically Sasak without becoming a theme park.",
    designSolution: "We partnered with a cooperative of Sasak master builders from Sade village.",
    materials: ["Alang-alang thatch roofing", "Hand-carved limestone screens", "Reclaimed ironwood structural posts", "Rammed earth feature walls", "Coral stone courtyard paving"],
    features: ["120 rooms across 12 traditional-style villas", "Open-air corridors with hand-carved stone screens", "Infinity pool overlooking the Indian Ocean", "On-site Sasak craft workshop for guests", "Zero-single-use-plastic policy"],
    tags: ["Cultural", "Hospitality", "Traditional Craft", "Sustainable"],
    stats: [{ label: "Area", value: "8,200 m\u00b2" }, { label: "Rooms", value: "120" }, { label: "Artisans Engaged", value: "45" }, { label: "Plastic-Free", value: "100%" }],
    teamMembers: ["aditya-prasetyo", "maya-kusuma", "fajar-nugroho"],
    testimonial: { quote: "Guests consistently tell us it's the most authentic hotel they've ever stayed in.", author: "Budi Santoso", role: "Director, Meridian Hospitality Group" },
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80", "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80", "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80", "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80"]
  },
  {
    id: "riverside-loft", title: "Riverside Loft", category: "Renovation", year: "2024",
    location: "Surabaya, Indonesia", client: "Kali Mas Foundation", area: "1,400 m\u00b2",
    description: "A disused riverside factory converted into a mixed-use creative space. The industrial steel skeleton is celebrated rather than hidden.",
    beforeDescription: "An abandoned 1950s textile factory along the Kali Mas river, structurally sound but decades neglected.",
    afterDescription: "A cultural landmark and creative incubator that catalyzed the regeneration of an entire neighborhood.",
    designChallenge: "The factory's steel frame was sound but coated in decades of industrial grime and asbestos-containing insulation.",
    designSolution: "We sandblasted every steel member back to raw metal, then sealed it with a clear matte finish that preserves the industrial patina.",
    materials: ["Original sandblasted steel frame", "Cork insulation panels", "Polished concrete floors", "Cor-ten steel additions", "Recycled teak loft flooring"],
    features: ["Double-height gallery space with movable partition walls", "Rooftop urban farm and event terrace", "12 artist studios with river views", "Community workshop and maker space", "Flood-resilient ground floor design"],
    tags: ["Adaptive Reuse", "Industrial", "Community", "Flood-Resilient"],
    stats: [{ label: "Area", value: "1,400 m\u00b2" }, { label: "Original Build", value: "1950s" }, { label: "Steel Recycled", value: "100%" }, { label: "Flood Resilience", value: "1-in-100 year" }],
    teamMembers: ["aditya-prasetyo", "rizky-pratama", "fajar-nugroho", "sari-permata"],
    testimonial: { quote: "Aura didn't just renovate a building \u2014 they resurrected a neighborhood.", author: "Dian Kusumawati", role: "Director, Kali Mas Foundation" },
    image: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"]
  }
];

const fallbackTeam: TeamMember[] = [
  { slug: "aditya-prasetyo", name: "Aditya Prasetyo", role: "Founding Principal & Design Director", bias: "Empathy-Driven Contextualism", biasDescription: "Every site tells a story \u2014 the sun path, the prevailing breeze, the neighbor's roofline, the shadow of a banyan tree.", bio: "Aditya founded Aura Architecture in 2016 after fifteen years at leading firms in Jakarta and Melbourne.", education: "Master of Architecture, University of Melbourne", experience: "15+ years", notableProjects: ["Villa Suniasa, Bali", "Gedung Harmoni, Jakarta", "Rumah Cahaya, Yogyakarta"], image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80", social: { linkedin: "#", instagram: "#" } },
  { slug: "maya-kusuma", name: "Maya Kusuma", role: "Senior Architect & Residential Lead", bias: "Tropical Bioclimatic Design", biasDescription: "Maya believes the tropics are not a climate to conquer but a collaborator to embrace.", bio: "Maya leads our residential portfolio, specializing in tropical modernism and sustainable design.", education: "Bachelor of Architecture, Universitas Indonesia", experience: "12+ years", notableProjects: ["Villa Suniasa, Bali", "Rumah Karang, Lombok", "Bamboo Pavilion, Ubud"], image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80", social: { linkedin: "#", instagram: "#" } },
  { slug: "rizky-pratama", name: "Rizky Pratama", role: "Senior Architect & Commercial Lead", bias: "Material Honesty & Structural Expression", biasDescription: "For Rizky, materials are never just finishes \u2014 they are the soul of a building.", bio: "Rizky directs our commercial and institutional projects, bringing deep expertise in facade engineering.", education: "Master of Architecture, Bandung Institute of Technology", experience: "14+ years", notableProjects: ["Gedung Harmoni, Jakarta", "Hotel Pantai Selatan, Yogyakarta", "Menara Asa, Surabaya"], image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80", social: { linkedin: "#" } },
  { slug: "dewi-lestari", name: "Dewi Lestari", role: "Interior Design Director", bias: "Craft Heritage & Material Culture", biasDescription: "Dewi sees every interior as a dialogue between tradition and modernity.", bio: "Dewi brings warmth and refinement to every interior she touches.", education: "Master of Interior Design, Politecnico di Milano", experience: "10+ years", notableProjects: ["Rumah Cahaya, Yogyakarta", "Hotel Pantai Selatan, Yogyakarta", "Aura Studio HQ"], image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80", social: { linkedin: "#", instagram: "#" } },
  { slug: "fajar-nugroho", name: "Fajar Nugroho", role: "Landscape & Urban Design Lead", bias: "Regenerative Urban Ecology", biasDescription: "Fajar's conviction is that landscapes are not decorative \u2014 they are infrastructure.", bio: "Fajar shapes the outdoor spaces and public realms that connect our buildings to their surroundings.", education: "Master of Landscape Architecture, University of Melbourne", experience: "11+ years", notableProjects: ["Kawasan Hijau Park, Yogyakarta", "Villa Suniasa Gardens, Bali", "Sungai Code Revitalization"], image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80", social: { linkedin: "#" } },
  { slug: "sari-permata", name: "Sari Permata", role: "Project Manager & Sustainability Coordinator", bias: "Lifecycle Thinking & Passive Systems", biasDescription: "Sari refuses to treat sustainability as a checkbox.", bio: "Sari ensures our projects are delivered on time, on budget, and to the highest standard.", education: "Bachelor of Civil Engineering, Gadjah Mada University", experience: "9+ years", notableProjects: ["Rumah Karang, Lombok", "Bamboo Pavilion, Ubud", "Sungai Code Revitalization"], image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80", social: { linkedin: "#" } }
];

// ─── API functions ────────────────────────────────────────────────
export async function getProjects(): Promise<Project[]> {
  return fetchApi<Project[]>("/api/projects", fallbackProjects);
}

export async function getProjectById(id: string): Promise<Project> {
  const fallback = fallbackProjects.find((p) => p.id === id);
  return fetchApi<Project>(`/api/projects/${id}`, fallback!);
}

export async function getTeam(): Promise<TeamMember[]> {
  return fetchApi<TeamMember[]>("/api/team", fallbackTeam);
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember> {
  const fallback = fallbackTeam.find((m) => m.slug === slug);
  return fetchApi<TeamMember>(`/api/team/${slug}`, fallback!);
}

export async function submitContact(data: ContactRequest): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to submit contact form");
  }
}
