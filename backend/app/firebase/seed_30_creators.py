"""Script to generate 30 additional realistic diverse global creators and enrich marketplace dataset."""

import json
import os

CREATOR_TEMPLATES = [
    {
        "id": "creator-017",
        "name": "Kenji Takahashi (高橋 健二)",
        "handle": "@kenji_shibuya",
        "roleTitle": "Tokyo Cyberpunk & Unreal Engine Director",
        "bio": "渋谷と新宿のネオン雨にインスパイアされたサイバーパンクAI映像作家。Midjourney v6とComfyUIノードグラフで緻密な近未来都市を構築。",
        "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
        "coverImage": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
        "location": "Tokyo, Japan",
        "rate": "$3,800",
        "genres": ["Cyberpunk", "AI Films", "Tech", "Automotive"],
        "tools": ["ComfyUI", "Midjourney", "Runway", "Blender"],
        "trustTier": "proof-backed",
        "trustScore": 94,
        "totalFollowers": 340000,
        "monthlyViews": 6800000,
        "engagementRate": 8.4,
        "contentTypes": ["AI Films", "Product Ads", "Reels"],
        "workflow": {
            "tools": [{"name": "ComfyUI", "kind": "app", "version": "v0.2"}, {"name": "Midjourney", "kind": "model", "version": "v6"}, {"name": "Runway", "kind": "model", "version": "Gen-3"}],
            "steps": [
                {"order": 1, "title": "Volumetric Lighting Prompt", "tool": "Midjourney v6", "description": "Shinjuku rain alleyway in anamorphic 35mm lens with volumetric cyan & amber haze.", "minutes": 45},
                {"order": 2, "title": "Node ControlNet Composition", "tool": "ComfyUI", "description": "ControlNet openpose and depth pass to ground cyberpunk vehicle reflections.", "minutes": 120},
                {"order": 3, "title": "Temporal Motion Synthesis", "tool": "Runway Gen-3", "description": "Camera dolly-in with coherent wet pavement reflections.", "minutes": 60}
            ],
            "totalHours": 3.75,
            "promptText": "/imagine shinjuku rainy alleyway, 2088 cyberpunk hypercar, neon holograms, anamorphic 35mm --ar 16:9 --v 6.0",
            "promptVisibility": "public",
            "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
        }
    },
    {
        "id": "creator-018",
        "name": "Min-jun Park (박민준)",
        "handle": "@minjun_seoul",
        "roleTitle": "K-Fashion & Generative Runway Visualist",
        "bio": "성수동 하이패션과 생성형 비주얼 아트를 결합한 디지털 디렉터. Midjourney와 FLUX.1을 활용한 룩북 및 초현실 패션 필름 제작.",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        "coverImage": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
        "location": "Seoul, South Korea",
        "rate": "$3,100",
        "genres": ["Fashion", "Lifestyle", "AI Films", "Beauty"],
        "tools": ["FLUX.1", "Midjourney", "Runway", "Photoshop"],
        "trustTier": "proof-backed",
        "trustScore": 92,
        "totalFollowers": 290000,
        "monthlyViews": 4900000,
        "engagementRate": 7.9,
        "contentTypes": ["Reels", "Shorts", "Product Ads"],
        "workflow": {
            "tools": [{"name": "FLUX.1", "kind": "model", "version": "dev"}, {"name": "Runway", "kind": "model", "version": "Gen-3"}],
            "steps": [
                {"order": 1, "title": "Fabric Texture Synthesis", "tool": "FLUX.1", "description": "Silk organza and iridescent metallic puff sleeves in studio rim lighting.", "minutes": 40},
                {"order": 2, "title": "Runway Dynamic Walk Cycle", "tool": "Runway Gen-3", "description": "High fashion runway pacing with slow-motion garment flutter.", "minutes": 75}
            ],
            "totalHours": 2.0,
            "promptText": "Avant-garde haute couture organza gown, slow runway walk, editorial studio flash --ar 9:16",
            "promptVisibility": "public",
            "referenceImageUrl": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"
        }
    },
    {
        "id": "creator-019",
        "name": "Camille Laurent",
        "handle": "@camille_paris_ai",
        "roleTitle": "Haute Parfumerie & Botanical Surrealist",
        "bio": "Direction artistique générative pour maisons de luxe et parfumerie de niche. Fusion poétique entre botanique vintage et 3D photoréaliste.",
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
        "coverImage": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
        "location": "Paris, France",
        "rate": "$2,900",
        "genres": ["Beauty", "Luxury", "Lifestyle", "Art"],
        "tools": ["Midjourney", "Magnific AI", "Photoshop", "DaVinci Resolve"],
        "trustTier": "proof-backed",
        "trustScore": 96,
        "totalFollowers": 240000,
        "monthlyViews": 4100000,
        "engagementRate": 8.1,
        "contentTypes": ["Reels", "Product Ads", "AI Films"],
        "workflow": {
            "tools": [{"name": "Midjourney", "kind": "model", "version": "v6"}, {"name": "Magnific AI", "kind": "model", "version": "v2"}],
            "steps": [
                {"order": 1, "title": "Botanical Glass Synthesis", "tool": "Midjourney v6", "description": "Amber perfume flacon surrounded by frosted glass petals and morning dew.", "minutes": 30},
                {"order": 2, "title": "8K Microtexture Upscale", "tool": "Magnific AI", "description": "Fractal floral veins and ultra-sharp crystal reflections.", "minutes": 45}
            ],
            "totalHours": 1.25,
            "promptText": "Luxury crystal perfume bottle emerging from blooming night jasmines, morning mist, macro 100mm lens",
            "promptVisibility": "public",
            "referenceImageUrl": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
        }
    },
    {
        "id": "creator-020",
        "name": "Mateo Morales",
        "handle": "@mateo_bogota",
        "roleTitle": "Latin Tropical Futurism & Brand Animator",
        "bio": "Explorando el realismo mágico latinoamericano a través de síntesis neuronal. Texturas vibrantes de la selva combinadas con diseño automotriz futurista.",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        "coverImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
        "location": "Bogotá, Colombia",
        "rate": "$2,400",
        "genres": ["Art", "Lifestyle", "Fashion", "Automotive"],
        "tools": ["Runway", "Midjourney", "Blender", "Adobe"],
        "trustTier": "link-checked",
        "trustScore": 84,
        "totalFollowers": 210000,
        "monthlyViews": 3600000,
        "engagementRate": 7.3,
        "contentTypes": ["Reels", "Shorts", "Product Ads"],
        "workflow": {
            "tools": [{"name": "Runway", "kind": "model", "version": "Gen-3"}, {"name": "Midjourney", "kind": "model", "version": "v6"}],
            "steps": [
                {"order": 1, "title": "Tropical Color Palette Design", "tool": "Midjourney v6", "description": "Emerald canopy meets matte titanium solar buggy.", "minutes": 35},
                {"order": 2, "title": "Dynamic Camera Tracking", "tool": "Runway Gen-3", "description": "Flythrough jungle canopy with volumetric sunlight rays.", "minutes": 65}
            ],
            "totalHours": 1.7,
            "promptText": "Solar futuristic rover driving through Colombian cloud forest, hyperrealistic 4K",
            "promptVisibility": "private",
            "referenceImageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"
        }
    },
    {
        "id": "creator-021",
        "name": "Tariq Al-Mansoor (طارق المنصور)",
        "handle": "@tariq_dubai",
        "roleTitle": "Desert Architectural Synthesis & Luxury VFX",
        "bio": "إخراج سينمائي وتصميم بيئات بصرية رقمية متقدمة. دمج العمارة الصحراوية المستقبلية مع تصاميم اليخوت والسيارات الفاخرة.",
        "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
        "coverImage": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
        "location": "Dubai, UAE",
        "rate": "$4,500",
        "genres": ["Architecture", "Luxury", "Tech", "AI Films"],
        "tools": ["Blender", "Midjourney", "Runway", "Magnific AI"],
        "trustTier": "proof-backed",
        "trustScore": 95,
        "totalFollowers": 410000,
        "monthlyViews": 8200000,
        "engagementRate": 8.7,
        "contentTypes": ["AI Films", "Product Ads", "YouTube"],
        "workflow": {
            "tools": [{"name": "Blender", "kind": "app", "version": "4.2 LTS"}, {"name": "Midjourney", "kind": "model", "version": "v6"}, {"name": "Magnific AI", "kind": "model", "version": "v2"}],
            "steps": [
                {"order": 1, "title": "Biophilic Sandstone CAD Blockout", "tool": "Blender", "description": "Parametric curves for undulating desert villa.", "minutes": 90},
                {"order": 2, "title": "Photorealistic AI Reskin", "tool": "Midjourney v6", "description": "Sunset golden hour illumination with sand particulate haze.", "minutes": 40},
                {"order": 3, "title": "Ultra-Res Texture Mastering", "tool": "Magnific AI", "description": "Sharp travertine stone grains and travertine water ripples.", "minutes": 40}
            ],
            "totalHours": 2.8,
            "promptText": "Desert modernist villa carved into golden dunes, sunset ambient glow, architectural digest 8K",
            "promptVisibility": "public",
            "referenceImageUrl": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
        }
    },
    {
        "id": "creator-022",
        "name": "Chioma Eze",
        "handle": "@chioma_afrofuturism",
        "roleTitle": "Afrofuturistic Fashion & Narrative Worldbuilder",
        "bio": "Celebrating African royal textile heritage through neural worldbuilding and high-concept generative cinema. Featured in Lagos Creative Week.",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        "coverImage": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
        "location": "Lagos, Nigeria",
        "rate": "$2,700",
        "genres": ["Fashion", "Art", "AI Films", "Lifestyle"],
        "tools": ["Midjourney", "Runway", "ElevenLabs", "Photoshop"],
        "trustTier": "proof-backed",
        "trustScore": 91,
        "totalFollowers": 265000,
        "monthlyViews": 4500000,
        "engagementRate": 8.6,
        "contentTypes": ["Reels", "Shorts", "AI Films"],
        "workflow": {
            "tools": [{"name": "Midjourney", "kind": "model", "version": "v6"}, {"name": "ElevenLabs", "kind": "model", "version": "v2"}],
            "steps": [
                {"order": 1, "title": "Ankara Textile Luster Synthesis", "tool": "Midjourney v6", "description": "Geometric gold threading woven with luminous optical fibers.", "minutes": 50},
                {"order": 2, "title": "Spoken Word Soundscape Scoring", "tool": "ElevenLabs", "description": "Yoruba folklore narration with ambient atmospheric bass.", "minutes": 35}
            ],
            "totalHours": 1.4,
            "promptText": "Lagos queen in futuristic ankara gown with fiber-optic embroidery, regal cinematic lighting",
            "promptVisibility": "public",
            "referenceImageUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
        }
    },
    {
        "id": "creator-023",
        "name": "Lukas Weber",
        "handle": "@lukas_berlin_vfx",
        "roleTitle": "Industrial Techno & Generative 3D Kinetic Artist",
        "bio": "Brutalist architecture, dark techno pacing, and mechanical generative motion. Creating festival visuals, hardware drops, and club identities.",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
        "coverImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
        "location": "Berlin, Germany",
        "rate": "$3,400",
        "genres": ["Tech", "Gaming", "AI Films", "Music"],
        "tools": ["TouchDesigner", "ComfyUI", "Blender", "Topaz Video AI"],
        "trustTier": "proof-backed",
        "trustScore": 93,
        "totalFollowers": 310000,
        "monthlyViews": 6100000,
        "engagementRate": 8.0,
        "contentTypes": ["AI Films", "Reels", "Shorts"],
        "workflow": {
            "tools": [{"name": "TouchDesigner", "kind": "app", "version": "2023"}, {"name": "ComfyUI", "kind": "app", "version": "v0.2"}],
            "steps": [
                {"order": 1, "title": "Audio-Reactive Signal Processing", "tool": "TouchDesigner", "description": "138 BPM kick drum drives point cloud density.", "minutes": 80},
                {"order": 2, "title": "Neural Mesh Diffusion", "tool": "ComfyUI", "description": "Concrete and steel texture mapping in real-time.", "minutes": 90}
            ],
            "totalHours": 2.8,
            "promptText": "Brutalist concrete monolith pulsing to techno strobe, monochrome 35mm film grain",
            "promptVisibility": "public",
            "referenceImageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"
        }
    },
    {
        "id": "creator-024",
        "name": "Camila Santos",
        "handle": "@camilasantos_rio",
        "roleTitle": "Hyper-Color Brazilian Pop & Product Animator",
        "bio": "Vibrant colors, carnival energy, and tropical brand advertising. Turning beverage and fashion campaigns into viral dance rhythms with AI.",
        "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
        "coverImage": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
        "location": "Rio de Janeiro, Brazil",
        "rate": "$2,300",
        "genres": ["Lifestyle", "Food", "Fashion", "Beauty"],
        "tools": ["Midjourney", "Runway", "Kling AI", "CapCut"],
        "trustTier": "link-checked",
        "trustScore": 82,
        "totalFollowers": 220000,
        "monthlyViews": 3800000,
        "engagementRate": 7.5,
        "contentTypes": ["Reels", "Shorts", "Product Ads"],
        "workflow": {
            "tools": [{"name": "Midjourney", "kind": "model", "version": "v6"}, {"name": "Kling AI", "kind": "model", "version": "v1.5"}],
            "steps": [
                {"order": 1, "title": "Tropical Palette Explosion", "tool": "Midjourney v6", "description": "Papaya, passionfruit splash with neon water droplets.", "minutes": 30},
                {"order": 2, "title": "Liquid Dynamic Simulation", "tool": "Kling AI", "description": "Rotating can with 360-degree fruit splash burst.", "minutes": 45}
            ],
            "totalHours": 1.25,
            "promptText": "Sparkling tropical soda can splashing through ripe mango slices, sunny Ipanema beach 4K",
            "promptVisibility": "public",
            "referenceImageUrl": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
        }
    },
    {
        "id": "creator-025",
        "name": "Oliver Vance",
        "handle": "@olivervance_ldn",
        "roleTitle": "British Heritage & High-End Automotive Cinematic",
        "bio": "Crafting bespoke AI films for luxury British automotive and heritage tailoring. Anamorphic optics, moody English drizzle, and timeless luxury.",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        "coverImage": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
        "location": "London, UK",
        "rate": "$4,200",
        "genres": ["Automotive", "Luxury", "AI Films", "Fashion"],
        "tools": ["Midjourney", "Runway", "DaVinci Resolve", "Topaz Video AI"],
        "trustTier": "proof-backed",
        "trustScore": 97,
        "totalFollowers": 380000,
        "monthlyViews": 7200000,
        "engagementRate": 8.5,
        "contentTypes": ["AI Films", "Product Ads", "YouTube"],
        "workflow": {
            "tools": [{"name": "Midjourney", "kind": "model", "version": "v6"}, {"name": "Runway", "kind": "model", "version": "Gen-3"}, {"name": "DaVinci Resolve", "kind": "app", "version": "19"}],
            "steps": [
                {"order": 1, "title": "Scottish Highlands Car Rig", "tool": "Midjourney v6", "description": "Vintage dark green GT coupe traversing mist-drenched asphalt curves.", "minutes": 40},
                {"order": 2, "title": "Tracking Camera Motion", "tool": "Runway Gen-3", "description": "Low-angle wheel chase with realistic road reflection spray.", "minutes": 60},
                {"order": 3, "title": "Kodak 5219 Film Emulation", "tool": "DaVinci Resolve", "description": "ACEScct print-film lut with authentic halation.", "minutes": 45}
            ],
            "totalHours": 2.4,
            "promptText": "Classic British luxury grand tourer driving through Isle of Skye rain, anamorphic filmic 8K",
            "promptVisibility": "public",
            "referenceImageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"
        }
    },
    {
        "id": "creator-026",
        "name": "Zuri Mwangi",
        "handle": "@zuri_savanna_ai",
        "roleTitle": "Wildlife Conservation & Safari Documentary AI",
        "bio": "Bringing endangered African wildlife and conservation stories to life using hyperrealistic neural simulation and immersive nature acoustics.",
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
        "coverImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
        "location": "Nairobi, Kenya",
        "rate": "$2,500",
        "genres": ["Travel", "Lifestyle", "AI Films", "Art"],
        "tools": ["Midjourney", "Runway", "ElevenLabs", "Adobe"],
        "trustTier": "link-checked",
        "trustScore": 86,
        "totalFollowers": 180000,
        "monthlyViews": 2900000,
        "engagementRate": 7.4,
        "contentTypes": ["YouTube", "Reels", "Shorts"],
        "workflow": {
            "tools": [{"name": "Midjourney", "kind": "model", "version": "v6"}, {"name": "Runway", "kind": "model", "version": "Gen-3"}],
            "steps": [
                {"order": 1, "title": "Savanna Sunset Golden Hour", "tool": "Midjourney v6", "description": "Acacia tree silhouetted with dust kicked up by lion pride.", "minutes": 35},
                {"order": 2, "title": "Prowling Gait Synthesis", "tool": "Runway Gen-3", "description": "Muscular predator shoulder movement with atmospheric heat shimmer.", "minutes": 55}
            ],
            "totalHours": 1.5,
            "promptText": "Masai Mara golden hour wildlife documentary, slow motion 4K telephoto 600mm",
            "promptVisibility": "public",
            "referenceImageUrl": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"
        }
    }
]

# Generate remaining creators 27 to 46 algorithmically to reach exactly 30 new global creators
REGIONS = [
    ("Stockholm, Sweden", "Nordic Minimalist & Glassware Artist", ["Beauty", "Art", "Tech"], ["Midjourney", "Magnific AI", "Blender"]),
    ("Seoul, South Korea", "K-Pop Visualizer & Holo-Stage Designer", ["Music", "Gaming", "AI Films"], ["ComfyUI", "Runway", "TouchDesigner"]),
    ("Toronto, Canada", "Winter Outerwear & Extreme Cold Cinematographer", ["Fashion", "Travel", "Automotive"], ["Midjourney", "Runway", "DaVinci Resolve"]),
    ("Melbourne, Australia", "Coastal Surf & Eco-Beverage Creative", ["Lifestyle", "Food", "Travel"], ["Runway", "Midjourney", "Adobe"]),
    ("Singapore", "Smart City & Cyber Flora Architect", ["Architecture", "Tech", "AI Films"], ["Blender", "ComfyUI", "Magnific AI"]),
    ("Madrid, Spain", "Flamenco Motion & Neo-Classical Surrealist", ["Art", "Fashion", "Lifestyle"], ["Midjourney", "Stable Diffusion", "Photoshop"]),
    ("Amsterdam, Netherlands", "Bicycle Tech & Urban Sustainable Design", ["Tech", "Lifestyle", "Automotive"], ["Runway", "Midjourney", "Adobe"]),
    ("Kyoto, Japan", "Zen Garden & Wabi-Sabi Tea Visualist", ["Lifestyle", "Art", "Beauty"], ["Midjourney", "Photoshop", "Topaz Video AI"]),
    ("Mexico City, Mexico", "Dia de los Muertos Holographic Animator", ["Art", "AI Films", "Music"], ["ComfyUI", "Runway", "Blender"]),
    ("San Francisco, CA", "Silicon Valley Hardware & AI Agent Showcase", ["Tech", "Product Ads", "AI Films"], ["Midjourney", "Runway", "DaVinci Resolve"]),
    ("Mumbai, India", "Bollywood Sci-Fi & High-VFX Dance Director", ["AI Films", "Music", "Fashion"], ["Runway", "Midjourney", "ElevenLabs"]),
    ("Cairo, Egypt", "Nile Drone Photogrammetry & Ancient Myth VFX", ["Travel", "AI Films", "Art"], ["Midjourney", "Blender", "Photoshop"]),
    ("Munich, Germany", "Precision Automotive CAD & Hypercar Renders", ["Automotive", "Tech", "Luxury"], ["Blender", "Midjourney", "Magnific AI"]),
    ("Cape Town, South Africa", "Atlantic Coastline & Adventure Travel Films", ["Travel", "Lifestyle", "AI Films"], ["Runway", "Midjourney", "DaVinci Resolve"]),
    ("Montreal, Canada", "Indie Game Cutscenes & Cyberpunk Shaders", ["Gaming", "Tech", "AI Films"], ["Unreal Engine", "ComfyUI", "Midjourney"]),
    ("Milan, Italy", "Milano Fashion Week & Leather Goods Animator", ["Fashion", "Luxury", "Beauty"], ["Midjourney", "Magnific AI", "Runway"]),
    ("Bangkok, Thailand", "Neon Night Market & Street Food Macro AI", ["Food", "Travel", "Lifestyle"], ["Midjourney", "Runway", "CapCut"]),
    ("Oslo, Norway", "Fjord Aurora & Arctic Expedition Filmmaker", ["Travel", "AI Films", "Automotive"], ["Midjourney", "Runway", "Topaz Video AI"]),
    ("Buenos Aires, Argentina", "Tango Cinematic & High-Drama Storyteller", ["AI Films", "Music", "Art"], ["Midjourney", "Runway", "DaVinci Resolve"]),
    ("Dublin, Ireland", "Celtic Folklore & Emerald Fantasy Worldbuilder", ["Art", "AI Films", "Gaming"], ["Midjourney", "ComfyUI", "ElevenLabs"])
]

NAMES = [
    ("Astrid Lindqvist", "@astrid_nordic", "https://images.unsplash.com/photo-1544005313-94ddf0286df2"),
    ("Ji-woo Kim", "@jiwoo_kpop", "https://images.unsplash.com/photo-1517841905240-472988babdf9"),
    ("Liam O'Connor", "@liam_arctic", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"),
    ("Maya Henderson", "@maya_byronbay", "https://images.unsplash.com/photo-1534528741775-53994a69daeb"),
    ("Zhen Wei Tan", "@zhenwei_sg", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"),
    ("Lucia Fernandez", "@lucia_madrid", "https://images.unsplash.com/photo-1517841905240-472988babdf9"),
    ("Bram van Dijk", "@bram_amsterdam", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"),
    ("Yuna Mori", "@yuna_kyoto", "https://images.unsplash.com/photo-1534528741775-53994a69daeb"),
    ("Diego Ramirez", "@diego_cdmx", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"),
    ("Ethan Cole", "@ethan_sf_ai", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"),
    ("Ananya Roy", "@ananya_vfx", "https://images.unsplash.com/photo-1517841905240-472988babdf9"),
    ("Nour El-Din", "@nour_cairo", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"),
    ("Maximilian Bauer", "@max_bavaria", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"),
    ("Sipho Dlamini", "@sipho_safari", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"),
    ("Alexandre Tremblay", "@alex_mtl_3d", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d"),
    ("Chiara Rossi", "@chiara_milano", "https://images.unsplash.com/photo-1544005313-94ddf0286df2"),
    ("Somchai Prasert", "@somchai_bkk", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"),
    ("Sigrid Haugen", "@sigrid_fjord", "https://images.unsplash.com/photo-1517841905240-472988babdf9"),
    ("Facundo Gomez", "@facundo_tango", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"),
    ("Ciaran Murphy", "@ciaran_myth", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d")
]

for idx in range(len(REGIONS)):
    cid_num = 27 + idx
    cid = f"creator-0{cid_num}"
    name, handle, avatar_base = NAMES[idx]
    loc, role, genres, tools = REGIONS[idx]
    tier = "proof-backed" if idx % 2 == 0 else ("link-checked" if idx % 3 == 0 else "self-reported")
    score = 80 + (idx % 18)

    CREATOR_TEMPLATES.append({
        "id": cid,
        "name": name,
        "handle": handle,
        "roleTitle": role,
        "bio": f"Award-winning generative creator based in {loc}. Specializing in {genres[0]} and {genres[1]} with advanced mastery of {tools[0]} and {tools[1]}.",
        "avatar": f"{avatar_base}?auto=format&fit=crop&w=400&q=80",
        "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
        "location": loc,
        "rate": f"${1800 + (idx * 110)}",
        "genres": genres,
        "tools": tools,
        "trustTier": tier,
        "trustScore": score,
        "totalFollowers": 150000 + (idx * 12000),
        "monthlyViews": 2500000 + (idx * 210000),
        "engagementRate": 6.8 + (idx % 30) * 0.1,
        "contentTypes": ["Reels", "Shorts", "Product Ads", "AI Films"],
        "workflow": {
            "tools": [{"name": tools[0], "kind": "model" if "Midjourney" in tools[0] or "Runway" in tools[0] else "app", "version": "v1"}, {"name": tools[1], "kind": "model", "version": "v2"}],
            "steps": [
                {"order": 1, "title": f"Initial {genres[0]} Synthesis", "tool": tools[0], "description": f"High coherence styling tuned for {loc} visual culture.", "minutes": 40},
                {"order": 2, "title": "Detail & Motion Polish", "tool": tools[1], "description": "Color grading and dynamic lighting adjustments.", "minutes": 50}
            ],
            "totalHours": 1.5,
            "promptText": f"Cinematic {genres[0]} showcase in {loc}, atmospheric lighting, 8K ultra-detailed",
            "promptVisibility": "public",
            "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
        }
    })

print(f"Generated {len(CREATOR_TEMPLATES)} creators templates (Expected: 30)")

# Read existing marketplaceData.json
json_path = "c:/Users/SUMIT/Downloads/ai-creator-marketplace/frontend/lib/server/marketplaceData.json"
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

existing_creators = data.get("creators", [])
existing_portfolios = data.get("portfolios", [])
existing_ids = set(c["creatorId"] for c in existing_creators)

new_creators_added = []
new_portfolios_added = []

for c in CREATOR_TEMPLATES:
    if c["id"] in existing_ids:
        continue

    creator_obj = {
        "creatorId": c["id"],
        "uid": f"user-{c['id']}",
        "name": c["name"],
        "handle": c["handle"],
        "email": f"{c['id']}@ember.ai",
        "roleTitle": c["roleTitle"],
        "bio": c["bio"],
        "avatar": c["avatar"],
        "coverImage": c["coverImage"],
        "location": c["location"],
        "verified": c["trustTier"] in ("proof-backed", "link-checked"),
        "rate": c["rate"],
        "commercialAvailability": "Immediate",
        "genres": c["genres"],
        "specializations": [f"{c['genres'][0]} AI", f"{c['tools'][0]} Workflow", "Prompt Design"],
        "skills": ["Prompt Engineering", "VFX", "Art Direction", "Color Grading"],
        "contentTypes": c["contentTypes"],
        "tools": c["tools"],
        "platforms": ["Instagram", "YouTube", "TikTok"],
        "totalFollowers": c["totalFollowers"],
        "monthlyViews": c["monthlyViews"],
        "engagementRate": round(c["engagementRate"], 1),
        "postsCount": 180,
        "isSelfReported": c["trustTier"] == "self-reported",
        "trustTier": c["trustTier"],
        "trustScore": c["trustScore"],
        "aiSummary": f"High-tier generative visualist from {c['location']} with specialized command over {', '.join(c['tools'][:2])}.",
        "strengths": ["Rapid pipeline turnaround", "Photorealistic material coherence", "Distinctive cultural aesthetics"],
        "bestForCategories": [f"{c['genres'][0]} Launches", "Global Brand Ad Spots"],
        "isDemo": True
    }
    new_creators_added.append(creator_obj)

    # Add a portfolio item for each creator
    port_obj = {
        "id": f"port-{c['id']}",
        "creatorId": c["id"],
        "uid": f"user-{c['id']}",
        "title": f"{c['name']} Signature {c['genres'][0]} Showcase",
        "description": f"Commercial creative synthesis showcasing {', '.join(c['tools'])} workflow.",
        "mediaUrl": c["coverImage"],
        "thumbnailUrl": c["coverImage"],
        "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        "mediaType": "video",
        "contentType": c["contentTypes"][0],
        "genre": c["genres"][0],
        "toolsUsed": c["tools"],
        "views": "180K",
        "likes": "14.2K",
        "aiTags": c["genres"] + c["tools"],
        "workflow": c["workflow"],
        "styleDescription": f"Cinematic {c['genres'][0]} aesthetic with dynamic volumetric illumination.",
        "styleTags": c["genres"],
        "trustTier": c["trustTier"],
        "isDemo": True
    }
    new_portfolios_added.append(port_obj)

# Append to marketplaceData
data["creators"].extend(new_creators_added)
data["portfolios"].extend(new_portfolios_added)

with open(json_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully added {len(new_creators_added)} creators to marketplaceData.json! Total now: {len(data['creators'])}")
