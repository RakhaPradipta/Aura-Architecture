using Aura.Api.Models;

namespace Aura.Api.Data;

public static class SeedData
{
    public static List<Project> Projects => new()
    {
        new Project
        {
            Id = "villa-serenity",
            Title = "Villa Serenity",
            Category = "Residential",
            Year = "2024",
            Location = "Ubud, Bali",
            Client = "Private Commission",
            Area = "480 m\u00b2",
            Description = "A cantilevered villa blending into the lush jungle canopy. Floor-to-ceiling glass walls dissolve the boundary between interior and tropical landscape, while exposed teak beams echo traditional Balinese craft.",
            BeforeDescription = "The site was an overgrown hillside plot with no road access and steep terrain at a 35-degree incline.",
            AfterDescription = "A three-level retreat that cascades down the slope, each level offering panoramic views of the Ayung River valley.",
            DesignChallenge = "Building on a 35-degree slope with no road access meant every material \u2014 from structural steel to finishing stone \u2014 had to be helicopter-lifted or carried up by hand. The client wanted a home that felt weightless, yet the terrain demanded deep concrete piling.",
            DesignSolution = "We designed a series of cantilevered concrete platforms anchored into the hillside, each one offset to follow the natural contour. Teak structural frames sit atop these platforms, allowing the house to appear to float above the canopy while remaining rooted in the earth.",
            Materials = new() { "Reclaimed Balinese teak", "Local andesite stone", "Low-iron glass panels", "Board-formed concrete", "Hand-forged iron hardware" },
            Features = new() { "Infinity pool cantilevered over the valley", "Open-air living pavilion with retractable glass walls", "Rainwater harvesting cistern carved from bedrock", "Passive cross-ventilation throughout", "Integrated tropical garden on every level" },
            Tags = new() { "Tropical Modernism", "Cantilever", "Passive Cooling", "Sustainable" },
            Stats = new()
            {
                new() { Label = "Area", Value = "480 m\u00b2" },
                new() { Label = "Levels", Value = "3" },
                new() { Label = "Build Time", Value = "18 months" },
                new() { Label = "Sustainability", Value = "Net-zero water" }
            },
            TeamMembers = new() { "aditya-prasetyo", "maya-kusuma", "dewi-lestari" },
            Testimonial = new()
            {
                Quote = "Aura understood that we didn't just want a house \u2014 we wanted to live inside the jungle. Every morning we wake up to the sound of the river and the sight of mist rolling through the trees. It's exactly the life we imagined.",
                Author = "Private Client",
                Role = "Homeowner"
            },
            Image = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
            Images = new()
            {
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
                "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80"
            }
        },
        new Project
        {
            Id = "nara-office",
            Title = "Nara Office Tower",
            Category = "Commercial",
            Year = "2023",
            Location = "Jakarta, Indonesia",
            Client = "Nara Holdings Group",
            Area = "12,400 m\u00b2",
            Description = "A 22-story headquarters wrapped in a kinetic facade of perforated aluminum panels that shift with sunlight, reducing energy consumption by 40% while creating a constantly evolving visual identity.",
            BeforeDescription = "A vacant lot in Jakarta's central business district surrounded by conventional glass towers.",
            AfterDescription = "An iconic landmark that redefined the skyline, winning the ASEAN Architecture Award.",
            DesignChallenge = "Jakarta's equatorial sun beats down on glass towers for 12 hours a day, driving cooling costs through the roof. The client wanted a building that stood out from the sea of reflective glass boxes while dramatically cutting energy use.",
            DesignSolution = "We developed a kinetic facade system \u2014 2,400 individually angled aluminum panels mounted on motorized pivots that track the sun's path throughout the day. The building literally breathes, adjusting its skin in real time to shade interior spaces while channeling natural light deep into the floor plates.",
            Materials = new() { "Perforated anodized aluminum", "High-performance insulated glazing", "Recycled steel structural frame", "Polished concrete cores", "Living green wall system" },
            Features = new() { "2,400-panel kinetic facade tracking the sun", "Double-skin curtain wall for natural ventilation", "Sky garden on floor 15 open to the public", "Rooftop solar array powering 30% of operations", "Ground-floor public plaza with water feature" },
            Tags = new() { "Kinetic Facade", "Energy Efficiency", "Commercial", "Innovation" },
            Stats = new()
            {
                new() { Label = "Area", Value = "12,400 m\u00b2" },
                new() { Label = "Floors", Value = "22" },
                new() { Label = "Facade Panels", Value = "2,400" },
                new() { Label = "Energy Reduction", Value = "40%" }
            },
            TeamMembers = new() { "aditya-prasetyo", "rizky-pratama" },
            Testimonial = new()
            {
                Quote = "The building has become our brand identity. Clients walk in and immediately understand that we value innovation and sustainability. The energy savings alone justified the investment \u2014 everything else is a bonus.",
                Author = "Hendra Wijaya",
                Role = "CEO, Nara Holdings Group"
            },
            Image = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
            Images = new()
            {
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
                "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
                "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80"
            }
        },
        new Project
        {
            Id = "studio-zen",
            Title = "Studio Zen Renovation",
            Category = "Renovation",
            Year = "2024",
            Location = "Yogyakarta, Indonesia",
            Client = "Zen Creative Collective",
            Area = "860 m\u00b2",
            Description = "Transformation of a colonial-era warehouse into a contemporary co-working space. Original brick walls were preserved and paired with polished concrete floors, steel mezzanines, and a living green wall.",
            BeforeDescription = "A derelict 1920s Dutch colonial warehouse with crumbling walls and a collapsed roof section.",
            AfterDescription = "A vibrant creative hub that honors its heritage while embracing modern functionality.",
            DesignChallenge = "The warehouse's original brick walls were structurally compromised in places, and the colonial-era timber roof trusses had rotted through. The client wanted to preserve every trace of the building's industrial past while creating a workspace that felt warm and inviting \u2014 not like a cold gallery.",
            DesignSolution = "We injected the failing brick walls with structural epoxy and left the patched sections visible as part of the building's story. New steel mezzanines float independently from the historic walls, connected by minimal pin-joints. A new roof of corrugated zinc and operable skylights replaced the collapsed sections while echoing the original industrial profile.",
            Materials = new() { "Original Dutch colonial brick", "Polished concrete", "Blackened steel mezzanines", "Corrugated zinc roofing", "Reclaimed teak from the original trusses" },
            Features = new() { "Preserved original brick walls with visible repair marks", "Double-height central atrium with operable skylights", "Living green wall spanning two floors", "Flexible co-working pods on steel mezzanines", "Rooftop terrace with views of Tugu Yogyakarta" },
            Tags = new() { "Heritage", "Adaptive Reuse", "Co-working", "Sustainable" },
            Stats = new()
            {
                new() { Label = "Area", Value = "860 m\u00b2" },
                new() { Label = "Original Build", Value = "1920s" },
                new() { Label = "Renovation", Value = "14 months" },
                new() { Label = "Waste Diverted", Value = "87%" }
            },
            TeamMembers = new() { "aditya-prasetyo", "dewi-lestari", "sari-permata" },
            Testimonial = new()
            {
                Quote = "Walking into Studio Zen feels like stepping into a living history book \u2014 but one with perfect Wi-Fi and the best coffee in Yogyakarta. Aura turned a ruin into the most inspiring workspace in the city.",
                Author = "Rina Amelia",
                Role = "Founder, Zen Creative Collective"
            },
            Image = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
            Images = new()
            {
                "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80",
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80"
            }
        },
        new Project
        {
            Id = "pavilion-cloud",
            Title = "Cloud Pavilion",
            Category = "Residential",
            Year = "2023",
            Location = "Bandung, Indonesia",
            Client = "Private Commission",
            Area = "220 m\u00b2",
            Description = "A weekend retreat perched at 1,400 meters elevation. The floating roof plane appears to hover above a glass enclosure, framing views of the Tangkuban Perahu volcano while channeling cool highland breezes.",
            BeforeDescription = "A bare mountaintop clearing with panoramic volcanic views but no existing structures.",
            AfterDescription = "An ethereal pavilion that appears to float above the clouds, winning a World Architecture Festival nomination.",
            DesignChallenge = "At 1,400 meters elevation, the site experiences temperature swings of 20\u00b0C in a single day, frequent fog, and intense UV exposure. The client wanted a structure that felt ephemeral \u2014 almost invisible \u2014 while withstanding harsh highland conditions.",
            DesignSolution = "We designed a single continuous roof plane of white fiber-cement that extends 4 meters beyond the glass walls on all sides, creating deep shading and channeling highland breezes through the interior. The roof appears to float because the glass walls are set back from the edge, with no visible columns at the perimeter.",
            Materials = new() { "White fiber-cement roof panels", "Low-iron structural glass", "Exposed aggregate concrete plinth", "Blackened steel columns (interior)", "Local volcanic stone landscaping" },
            Features = new() { "Cantilevered roof with no visible perimeter columns", "360-degree panoramic glazing", "Underfloor heating powered by geothermal spring", "Fog-harvesting roof channels feeding a reflecting pool", "Minimalist tatami-inspired interior" },
            Tags = new() { "Highland", "Minimalism", "Cantilever", "Volcanic" },
            Stats = new()
            {
                new() { Label = "Area", Value = "220 m\u00b2" },
                new() { Label = "Elevation", Value = "1,400 m" },
                new() { Label = "Roof Cantilever", Value = "4 m" },
                new() { Label = "Temp Range", Value = "12\u201332\u00b0C" }
            },
            TeamMembers = new() { "aditya-prasetyo", "rizky-pratama", "sari-permata" },
            Testimonial = new()
            {
                Quote = "We wanted a place where we could watch the clouds roll in and feel like we were floating above the world. Aura delivered exactly that \u2014 and made it withstand conditions we didn't think a glass house could survive.",
                Author = "Private Client",
                Role = "Homeowner"
            },
            Image = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
            Images = new()
            {
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
                "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"
            }
        },
        new Project
        {
            Id = "meridian-hotel",
            Title = "The Meridian Hotel",
            Category = "Commercial",
            Year = "2022",
            Location = "Lombok, Indonesia",
            Client = "Meridian Hospitality Group",
            Area = "8,200 m\u00b2",
            Description = "A 120-room boutique hotel inspired by traditional Sasak architecture. Thatched alang-alang roofs, hand-carved stone screens, and open-air corridors create an immersive cultural experience.",
            BeforeDescription = "A flat coastal plot on Lombok's southern shore with limited infrastructure.",
            AfterDescription = "A world-class hospitality destination that became a benchmark for culturally responsive resort design.",
            DesignChallenge = "The brief was to create a luxury hotel that felt authentically Sasak without becoming a theme park. The challenge was balancing traditional building techniques \u2014 which are labor-intensive and require specialized craftspeople \u2014 with the operational demands of a 120-room international hotel.",
            DesignSolution = "We partnered with a cooperative of Sasak master builders from Sade village, employing traditional alang-alang thatching and hand-carved stone techniques for the public spaces and villa roofs, while using modern construction for the room blocks hidden behind landscaped berms. The result is a hotel where guests experience tradition in every touchpoint, but operations run on modern systems.",
            Materials = new() { "Alang-alang thatch roofing", "Hand-carved limestone screens", "Reclaimed ironwood structural posts", "Rammed earth feature walls", "Coral stone courtyard paving" },
            Features = new() { "120 rooms across 12 traditional-style villas", "Open-air corridors with hand-carved stone screens", "Infinity pool overlooking the Indian Ocean", "On-site Sasak craft workshop for guests", "Zero-single-use-plastic policy" },
            Tags = new() { "Cultural", "Hospitality", "Traditional Craft", "Sustainable" },
            Stats = new()
            {
                new() { Label = "Area", Value = "8,200 m\u00b2" },
                new() { Label = "Rooms", Value = "120" },
                new() { Label = "Artisans Engaged", Value = "45" },
                new() { Label = "Plastic-Free", Value = "100%" }
            },
            TeamMembers = new() { "aditya-prasetyo", "maya-kusuma", "fajar-nugroho" },
            Testimonial = new()
            {
                Quote = "Guests consistently tell us it's the most authentic hotel they've ever stayed in \u2014 and they don't realize that authenticity was designed down to the last detail. Aura gave us a hotel that tells Lombok's story without saying a word.",
                Author = "Budi Santoso",
                Role = "Director, Meridian Hospitality Group"
            },
            Image = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
            Images = new()
            {
                "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80"
            }
        },
        new Project
        {
            Id = "riverside-loft",
            Title = "Riverside Loft",
            Category = "Renovation",
            Year = "2024",
            Location = "Surabaya, Indonesia",
            Client = "Kali Mas Foundation",
            Area = "1,400 m\u00b2",
            Description = "A disused riverside factory converted into a mixed-use creative space. The industrial steel skeleton is celebrated rather than hidden, filled with double-height galleries, a rooftop garden, and artist studios.",
            BeforeDescription = "An abandoned 1950s textile factory along the Kali Mas river, structurally sound but decades neglected.",
            AfterDescription = "A cultural landmark and creative incubator that catalyzed the regeneration of an entire neighborhood.",
            DesignChallenge = "The factory's steel frame was sound but coated in decades of industrial grime and asbestos-containing insulation. The riverside location meant flood risk. The client \u2014 a cultural foundation \u2014 wanted a space that could host everything from art exhibitions to community workshops, requiring radical flexibility.",
            DesignSolution = "We sandblasted every steel member back to raw metal, then sealed it with a clear matte finish that preserves the industrial patina. Asbestos was carefully removed and the insulation replaced with cork-based panels. The ground floor was raised 600mm above the 100-year flood line, with a permeable landscape that absorbs stormwater before it reaches the building.",
            Materials = new() { "Original sandblasted steel frame", "Cork insulation panels", "Polished concrete floors", "Cor-ten steel additions", "Recycled teak loft flooring" },
            Features = new() { "Double-height gallery space with movable partition walls", "Rooftop urban farm and event terrace", "12 artist studios with river views", "Community workshop and maker space", "Flood-resilient ground floor design" },
            Tags = new() { "Adaptive Reuse", "Industrial", "Community", "Flood-Resilient" },
            Stats = new()
            {
                new() { Label = "Area", Value = "1,400 m\u00b2" },
                new() { Label = "Original Build", Value = "1950s" },
                new() { Label = "Steel Recycled", Value = "100%" },
                new() { Label = "Flood Resilience", Value = "1-in-100 year" }
            },
            TeamMembers = new() { "aditya-prasetyo", "rizky-pratama", "fajar-nugroho", "sari-permata" },
            Testimonial = new()
            {
                Quote = "Aura didn't just renovate a building \u2014 they resurrected a neighborhood. The Riverside Loft has become the creative heart of Surabaya, and every detail tells the story of this place's industrial past and cultural future.",
                Author = "Dian Kusumawati",
                Role = "Director, Kali Mas Foundation"
            },
            Image = "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80",
            Images = new()
            {
                "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80",
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
            }
        }
    };

    public static List<TeamMember> TeamMembers => new()
    {
        new TeamMember
        {
            Slug = "aditya-prasetyo",
            Name = "Aditya Prasetyo",
            Role = "Founding Principal & Design Director",
            Bias = "Empathy-Driven Contextualism",
            BiasDescription = "Every site tells a story \u2014 the sun path, the prevailing breeze, the neighbor's roofline, the shadow of a banyan tree. Aditya's practice is rooted in the belief that architecture must emerge from these quiet conversations between place and purpose. He resists signature style in favor of deep listening, letting each project discover its own language.",
            Bio = "Aditya founded Aura Architecture in 2016 after fifteen years at leading firms in Jakarta and Melbourne. His work has been recognized by the World Architecture Festival, ASEAN Architecture Awards, and Indonesia Institute of Architects.",
            Education = "Master of Architecture, University of Melbourne",
            Experience = "15+ years",
            NotableProjects = new() { "Villa Suniasa, Bali", "Gedung Harmoni, Jakarta", "Rumah Cahaya, Yogyakarta" },
            Image = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
            Social = new() { LinkedIn = "#", Instagram = "#" }
        },
        new TeamMember
        {
            Slug = "maya-kusuma",
            Name = "Maya Kusuma",
            Role = "Senior Architect & Residential Lead",
            Bias = "Tropical Bioclimatic Design",
            BiasDescription = "Maya believes the tropics are not a climate to conquer but a collaborator to embrace. Her designs use passive cooling, cross-ventilation, deep overhangs, and lush planting as structural elements rather than afterthoughts. Every villa she designs breathes \u2014 walls move air, roofs harvest rain, and gardens mediate temperature.",
            Bio = "Maya leads our residential portfolio, specializing in tropical modernism and sustainable design. With over a decade of experience designing villas and private homes across Bali, Lombok, and Java, she has an intuitive understanding of how light, breeze, and landscape can be woven into everyday living.",
            Education = "Bachelor of Architecture, Universitas Indonesia",
            Experience = "12+ years",
            NotableProjects = new() { "Villa Suniasa, Bali", "Rumah Karang, Lombok", "Bamboo Pavilion, Ubud" },
            Image = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
            Social = new() { LinkedIn = "#", Instagram = "#" }
        },
        new TeamMember
        {
            Slug = "rizky-pratama",
            Name = "Rizky Pratama",
            Role = "Senior Architect & Commercial Lead",
            Bias = "Material Honesty & Structural Expression",
            BiasDescription = "For Rizky, materials are never just finishes \u2014 they are the soul of a building. He insists that concrete be left raw where it is raw, that steel celebrate its joints, that timber show its grain. His commercial projects reject the polished veneer of corporate architecture in favor of a brutal elegance that age gracefully.",
            Bio = "Rizky directs our commercial and institutional projects, bringing deep expertise in facade engineering, material innovation, and large-scale project coordination. His portfolio includes award-winning office towers, hotels, and mixed-use developments across Indonesia.",
            Education = "Master of Architecture, Bandung Institute of Technology",
            Experience = "14+ years",
            NotableProjects = new() { "Gedung Harmoni, Jakarta", "Hotel Pantai Selatan, Yogyakarta", "Menara Asa, Surabaya" },
            Image = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
            Social = new() { LinkedIn = "#" }
        },
        new TeamMember
        {
            Slug = "dewi-lestari",
            Name = "Dewi Lestari",
            Role = "Interior Design Director",
            Bias = "Craft Heritage & Material Culture",
            BiasDescription = "Dewi sees every interior as a dialogue between tradition and modernity. She sources hand-woven textiles from Javanese villages, pairs them with Italian marble, and lets the tension between them create something entirely new. Her bias is toward authenticity \u2014 no faux finishes, no shortcuts, only materials that carry a story.",
            Bio = "Dewi brings warmth and refinement to every interior she touches. Trained in Milan and based in Yogyakarta, she bridges European craft traditions with Indonesian material culture \u2014 from hand-woven textiles to locally quarried stone.",
            Education = "Master of Interior Design, Politecnico di Milano",
            Experience = "10+ years",
            NotableProjects = new() { "Rumah Cahaya, Yogyakarta", "Hotel Pantai Selatan, Yogyakarta", "Aura Studio HQ" },
            Image = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
            Social = new() { LinkedIn = "#", Instagram = "#" }
        },
        new TeamMember
        {
            Slug = "fajar-nugroho",
            Name = "Fajar Nugroho",
            Role = "Landscape & Urban Design Lead",
            Bias = "Regenerative Urban Ecology",
            BiasDescription = "Fajar's conviction is that landscapes are not decorative \u2014 they are infrastructure. He designs stormwater systems that double as public parks, rooftop farms that feed neighborhoods, and street trees selected for their carbon-sequestration capacity. His work insists that every square meter of planted surface must earn its place ecologically.",
            Bio = "Fajar shapes the outdoor spaces and public realms that connect our buildings to their surroundings. His background in landscape architecture and urban planning brings a systems-level perspective to every project, ensuring that green infrastructure and pedestrian experience are integral, not afterthoughts.",
            Education = "Master of Landscape Architecture, University of Melbourne",
            Experience = "11+ years",
            NotableProjects = new() { "Kawasan Hijau Park, Yogyakarta", "Villa Suniasa Gardens, Bali", "Sungai Code Revitalization" },
            Image = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
            Social = new() { LinkedIn = "#" }
        },
        new TeamMember
        {
            Slug = "sari-permata",
            Name = "Sari Permata",
            Role = "Project Manager & Sustainability Coordinator",
            Bias = "Lifecycle Thinking & Passive Systems",
            BiasDescription = "Sari refuses to treat sustainability as a checkbox. Her bias is toward passive, low-tech solutions that work for fifty years without maintenance \u2014 rainwater cisterns carved from local stone, ventilation stacks tuned to prevailing winds, material palettes chosen for their embodied carbon, not their Instagram appeal. She asks: will this still be sustainable in 2040?",
            Bio = "Sari ensures our projects are delivered on time, on budget, and to the highest standard. She also leads our sustainability initiatives, integrating passive cooling, rainwater harvesting, and locally sourced materials into every project lifecycle.",
            Education = "Bachelor of Civil Engineering, Gadjah Mada University",
            Experience = "9+ years",
            NotableProjects = new() { "Rumah Karang, Lombok", "Bamboo Pavilion, Ubud", "Sungai Code Revitalization" },
            Image = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
            Social = new() { LinkedIn = "#" }
        }
    };
}
