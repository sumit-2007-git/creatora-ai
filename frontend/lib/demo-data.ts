import { Creator } from '@/types/creator';
import { Brief } from '@/types/brief';
import { PortfolioItem } from '@/types/portfolio';

export const demoCreators: Creator[] = [
  {
    "creatorId": "creator-001",
    "uid": "user-creator-001",
    "name": "Aarav Sharma",
    "handle": "@aaravcreates",
    "email": "aarav@ember.ai",
    "roleTitle": "AI Filmmaker & Commercial Director",
    "bio": "Specializing in cinematic brand commercials and fashion films blending Runway Gen-2, Midjourney v6, and high-dynamic color grading.",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Mumbai, India",
    "verified": true,
    "rate": "$3,200",
    "commercialAvailability": "Immediate",
    "genres": [
      "Fashion",
      "Sneakers",
      "Tech",
      "AI Video"
    ],
    "specializations": [
      "Cinematic AI Video",
      "Sneaker Commercials",
      "Virtual Sets"
    ],
    "skills": [
      "Prompt Engineering",
      "Storyboarding",
      "DaVinci Color Grading",
      "VFX"
    ],
    "contentTypes": [
      "Reels",
      "AI Films",
      "Product Ads",
      "Shorts"
    ],
    "tools": [
      "Runway",
      "Midjourney",
      "DaVinci Resolve",
      "Adobe"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 280000,
    "monthlyViews": 5200000,
    "engagementRate": 7.8,
    "postsCount": 320,
    "isSelfReported": true,
    "aiSummary": "Premier AI director known for striking sneaker reveals and high-energy luxury commercials. Outstanding audience engagement and fast pipeline execution.",
    "strengths": [
      "High-energy cinematic pacing",
      "Photorealistic material textures",
      "Flawless brand integration"
    ],
    "bestForCategories": [
      "Sneaker Launches",
      "Fashion Lookbooks",
      "Tech Hardware Ads"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-002",
    "uid": "user-creator-002",
    "name": "Mizuki Tanaka",
    "handle": "@mizuki_ai",
    "email": "mizuki@ember.ai",
    "roleTitle": "AI Lifestyle & Watercolor Artist",
    "bio": "Exploring digital surrealism and delicate Japanese watercolor sensibilities through neural synthesis. Soft, calming aesthetics for wellness and beauty.",
    "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    "location": "Tokyo, Japan",
    "verified": true,
    "rate": "$2,200",
    "commercialAvailability": "Immediate",
    "genres": [
      "Beauty",
      "Lifestyle",
      "Art",
      "Skincare"
    ],
    "specializations": [
      "Watercolor AI",
      "Botanical Animation",
      "Skincare Visuals"
    ],
    "skills": [
      "Illustration",
      "LoRA Fine-tuning",
      "Art Direction",
      "Texture Mapping"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads"
    ],
    "tools": [
      "Midjourney",
      "Stable Diffusion",
      "Photoshop",
      "Runway"
    ],
    "platforms": [
      "Instagram",
      "Pinterest"
    ],
    "totalFollowers": 195000,
    "monthlyViews": 3400000,
    "engagementRate": 6.9,
    "postsCount": 190,
    "isSelfReported": true,
    "aiSummary": "Renowned for soft, ethereal anime and watercolor aesthetics. Outstanding fit for clean beauty, luxury skincare, and mindfulness storytelling.",
    "strengths": [
      "Delicate pastel color harmony",
      "Atmospheric natural lighting",
      "High aesthetic trust"
    ],
    "bestForCategories": [
      "Clean Skincare",
      "Artisanal Fragrance",
      "Self-Care Brands"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-003",
    "uid": "user-creator-003",
    "name": "Kenji Watanabe",
    "handle": "@kenji_future",
    "email": "kenji@ember.ai",
    "roleTitle": "AI Tech & Hardware Storyteller",
    "bio": "Deep dives into cutting-edge AI hardware, developer tooling, and futuristic workstation aesthetics. High-voltage pacing.",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    "location": "Kyoto, Japan",
    "verified": true,
    "rate": "$3,500",
    "commercialAvailability": "Selective",
    "genres": [
      "Tech",
      "Gaming",
      "Hardware",
      "Product Ads"
    ],
    "specializations": [
      "Hardware Benchmarks",
      "3D Motion Design",
      "Tech Unboxings"
    ],
    "skills": [
      "3D Modeling",
      "Motion Graphics",
      "Tech Reviews",
      "Sound Design"
    ],
    "contentTypes": [
      "YouTube",
      "Product Ads",
      "Reels",
      "Shorts"
    ],
    "tools": [
      "Runway",
      "Premiere",
      "After Effects",
      "Blender"
    ],
    "platforms": [
      "YouTube",
      "Twitter/X",
      "Instagram"
    ],
    "totalFollowers": 340000,
    "monthlyViews": 8500000,
    "engagementRate": 8.4,
    "postsCount": 420,
    "isSelfReported": true,
    "aiSummary": "High authority technical creator with phenomenal audience engagement in developer and gaming hardware circles.",
    "strengths": [
      "Deep technical credibility",
      "Complex 3D hardware explosions",
      "Viral short-form hooks"
    ],
    "bestForCategories": [
      "PC & GPU Brands",
      "Developer Tooling",
      "AI Hardware Rigs"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-004",
    "uid": "user-creator-004",
    "name": "Elena Rostova",
    "handle": "@elena_automotive",
    "email": "elena@ember.ai",
    "roleTitle": "Luxury Automotive & CGI Director",
    "bio": "Crafting photorealistic AI hypercar visuals, cinematic night races, and luxury automotive commercial films using Unreal Engine & ComfyUI.",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    "location": "Berlin, Germany",
    "verified": true,
    "rate": "$5,200",
    "commercialAvailability": "Immediate",
    "genres": [
      "Automotive",
      "Luxury",
      "Tech",
      "3D Motion"
    ],
    "specializations": [
      "Hypercar Commercials",
      "Rain & Night Reflections",
      "CGI Compositing"
    ],
    "skills": [
      "Unreal Engine 5",
      "ComfyUI Workflow",
      "Automotive Lighting",
      "Color Grading"
    ],
    "contentTypes": [
      "AI Films",
      "Product Ads",
      "Reels"
    ],
    "tools": [
      "Unreal Engine",
      "ComfyUI",
      "Runway",
      "DaVinci Resolve"
    ],
    "platforms": [
      "Instagram",
      "YouTube"
    ],
    "totalFollowers": 210000,
    "monthlyViews": 4600000,
    "engagementRate": 7.3,
    "postsCount": 175,
    "isSelfReported": true,
    "aiSummary": "Elite automotive CGI director blending synthetic physics with photorealistic studio lighting for luxury car brands.",
    "strengths": [
      "Extreme photorealism in vehicle reflections",
      "Dynamic camera chase shots",
      "Commercial automotive pedigree"
    ],
    "bestForCategories": [
      "Luxury Automotive Ads",
      "Performance Vehicles",
      "High-End Watches"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-005",
    "uid": "user-creator-005",
    "name": "Marcus Vance",
    "handle": "@vance_kicks",
    "email": "marcus@ember.ai",
    "roleTitle": "Streetwear & Sneaker AI Designer",
    "bio": "Merging futuristic sneaker silhouettes, cyberpunk streetwear, and AI dynamic animation for viral hype culture drops.",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80",
    "location": "New York, USA",
    "verified": true,
    "rate": "$2,800",
    "commercialAvailability": "Immediate",
    "genres": [
      "Sneakers",
      "Fashion",
      "Streetwear",
      "AI Video"
    ],
    "specializations": [
      "Sneaker Unboxings",
      "Futuristic Streetwear",
      "3D Footwear Rotation"
    ],
    "skills": [
      "Midjourney Sneaker Prompts",
      "Kling AI Motion",
      "Graphic Typography",
      "Beat Syncing"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads"
    ],
    "tools": [
      "Midjourney",
      "Kling AI",
      "Photoshop",
      "After Effects"
    ],
    "platforms": [
      "Instagram",
      "TikTok"
    ],
    "totalFollowers": 430000,
    "monthlyViews": 9800000,
    "engagementRate": 9.2,
    "postsCount": 380,
    "isSelfReported": true,
    "aiSummary": "Cult-favorite sneaker innovator commanding immense Gen-Z streetwear attention with hyper-detailed footwear concepts.",
    "strengths": [
      "Unmatched sneaker community authority",
      "Kinetic motion sync",
      "Hype drop pacing"
    ],
    "bestForCategories": [
      "Sneaker Collabs",
      "Streetwear Drops",
      "Youth Culture Apparel"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-006",
    "uid": "user-creator-006",
    "name": "Chloe Dubois",
    "handle": "@chloe_virtual",
    "email": "chloe@ember.ai",
    "roleTitle": "Editorial Fashion & Virtual Models",
    "bio": "Parisian high-fashion sensibilities rendered via neural avatars, virtual runway models, and avant-garde couture lookbooks.",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
    "location": "Paris, France",
    "verified": true,
    "rate": "$3,800",
    "commercialAvailability": "Immediate",
    "genres": [
      "Fashion",
      "Beauty",
      "Luxury",
      "Art"
    ],
    "specializations": [
      "Virtual Runway",
      "Editorial Lookbooks",
      "Virtual Influencer Avatars"
    ],
    "skills": [
      "Stable Diffusion XL",
      "Magnific AI Upscaling",
      "Fashion Styling",
      "Lighting Direction"
    ],
    "contentTypes": [
      "Reels",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Stable Diffusion",
      "Midjourney",
      "Magnific",
      "Photoshop"
    ],
    "platforms": [
      "Instagram",
      "Vogue Runway"
    ],
    "totalFollowers": 290000,
    "monthlyViews": 4800000,
    "engagementRate": 6.7,
    "postsCount": 210,
    "isSelfReported": true,
    "aiSummary": "Pinnacle digital couture creator sought after by luxury fashion houses for avant-garde virtual runway films.",
    "strengths": [
      "Luxury haute couture lighting",
      "Hyper-refined fabric drape and texture",
      "Prestige editorial mood"
    ],
    "bestForCategories": [
      "Luxury Fashion",
      "Designer Accessories",
      "Virtual Model Campaigns"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-007",
    "uid": "user-creator-007",
    "name": "Liam Thorne",
    "handle": "@thorne_gaming",
    "email": "liam@ember.ai",
    "roleTitle": "Cyberpunk & Indie Gaming Animator",
    "bio": "Crafting procedural sci-fi characters, dystopian mecha battles, and high-octane indie game trailers using Blender, Unreal and Cascadeur.",
    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    "location": "Toronto, Canada",
    "verified": true,
    "rate": "$3,100",
    "commercialAvailability": "Immediate",
    "genres": [
      "Gaming",
      "Anime",
      "VFX",
      "Tech"
    ],
    "specializations": [
      "Game Character Trailers",
      "Mecha & Cyberpunk VFX",
      "Combat Choreography"
    ],
    "skills": [
      "Blender Animation",
      "Cascadeur Physics",
      "Unreal Engine",
      "Sound Mixing"
    ],
    "contentTypes": [
      "YouTube",
      "AI Films",
      "Reels",
      "Shorts"
    ],
    "tools": [
      "Blender",
      "Runway",
      "Cascadeur",
      "DaVinci Resolve"
    ],
    "platforms": [
      "YouTube",
      "Twitch",
      "TikTok"
    ],
    "totalFollowers": 185000,
    "monthlyViews": 4200000,
    "engagementRate": 9.4,
    "postsCount": 230,
    "isSelfReported": true,
    "aiSummary": "Dynamic 3D animator and game cinematic specialist producing viral boss battle sequences and mecha teasers.",
    "strengths": [
      "Complex combat physics",
      "Immersive cyberpunk neon lighting",
      "Hardcore gamer audience loyalty"
    ],
    "bestForCategories": [
      "Indie Game Launches",
      "Gaming Peripherals",
      "Esports Teasers"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-008",
    "uid": "user-creator-008",
    "name": "Sofia Al-Mansoor",
    "handle": "@sofia_wanderer",
    "email": "sofia@ember.ai",
    "roleTitle": "Global Travel & Cultural Storyteller",
    "bio": "Weaving authentic local cultural narratives with mesmerizing aerial landscapes and generative memory collages.",
    "avatar": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    "location": "Dubai, UAE",
    "verified": true,
    "rate": "$2,100",
    "commercialAvailability": "Immediate",
    "genres": [
      "Travel",
      "Culture",
      "Lifestyle",
      "Documentary"
    ],
    "specializations": [
      "Cultural Heritage Films",
      "Drone & AI Hybrids",
      "Destination Guides"
    ],
    "skills": [
      "Travel Cinematography",
      "Voiceover Storytelling",
      "Topaz AI Enhancing",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "YouTube",
      "AI Films"
    ],
    "tools": [
      "Premiere",
      "Midjourney",
      "Topaz Video AI",
      "Runway"
    ],
    "platforms": [
      "Instagram",
      "YouTube"
    ],
    "totalFollowers": 260000,
    "monthlyViews": 4900000,
    "engagementRate": 6.2,
    "postsCount": 290,
    "isSelfReported": true,
    "aiSummary": "Celebrated travel filmmaker connecting international tourism boards and lifestyle brands to diverse cultural hubs.",
    "strengths": [
      "Soulful voiceover narration",
      "Lush cultural landscapes",
      "Broad aspirational demographic"
    ],
    "bestForCategories": [
      "Tourism Boards",
      "Luxury Hospitality",
      "Travel Expedition Gear"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-009",
    "uid": "user-creator-009",
    "name": "Dev Patel",
    "handle": "@dev_culinary_ai",
    "email": "dev@ember.ai",
    "roleTitle": "AI Culinary & Food Stylist",
    "bio": "Hyper-sensory macro food cinematography, steam dynamics, and gourmet coffee extraction visuals created with neural synthesis.",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80",
    "location": "London, UK",
    "verified": true,
    "rate": "$1,800",
    "commercialAvailability": "Immediate",
    "genres": [
      "Food",
      "Beverage",
      "Lifestyle",
      "Product Ads"
    ],
    "specializations": [
      "Macro Liquid Dynamics",
      "Artisanal Coffee Ads",
      "Gourmet Plating"
    ],
    "skills": [
      "Food Lighting",
      "Fluid Simulation AI",
      "ASMR Audio Design",
      "Color Timing"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads"
    ],
    "tools": [
      "Midjourney",
      "Luma Dream Machine",
      "Photoshop",
      "Premiere"
    ],
    "platforms": [
      "Instagram",
      "TikTok"
    ],
    "totalFollowers": 160000,
    "monthlyViews": 3800000,
    "engagementRate": 7.9,
    "postsCount": 215,
    "isSelfReported": true,
    "aiSummary": "Master of mouthwatering sensory food aesthetics with huge appeal for specialty food, coffee, and kitchenware brands.",
    "strengths": [
      "ASMR audio integration",
      "Appetizing macro details",
      "Viral recipe format pacing"
    ],
    "bestForCategories": [
      "Specialty Coffee",
      "Gourmet Packaged Food",
      "Kitchen Appliances"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-010",
    "uid": "user-creator-010",
    "name": "Yuto Takahashi",
    "handle": "@yuto_manga",
    "email": "yuto@ember.ai",
    "roleTitle": "Manga Screentone & Anime Animator",
    "bio": "Bringing traditional black-ink manga pages to life with screentone transitions, dynamic speedlines, and AI voice synchronization.",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    "location": "Osaka, Japan",
    "verified": true,
    "rate": "$2,400",
    "commercialAvailability": "Immediate",
    "genres": [
      "Anime",
      "Illustration",
      "Comics",
      "Gaming"
    ],
    "specializations": [
      "Manga Animation",
      "Ink Line Art",
      "Action Sequence Speedlines"
    ],
    "skills": [
      "Clip Studio Paint",
      "After Effects",
      "LoRA Stylization",
      "Manga Composition"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "AI Films"
    ],
    "tools": [
      "Clip Studio",
      "After Effects",
      "Stable Diffusion",
      "Runway"
    ],
    "platforms": [
      "TikTok",
      "Instagram",
      "YouTube"
    ],
    "totalFollowers": 240000,
    "monthlyViews": 6100000,
    "engagementRate": 8.9,
    "postsCount": 310,
    "isSelfReported": true,
    "aiSummary": "Authentic Japanese manga illustrator transforming classic manga aesthetics into fluid vertical animations.",
    "strengths": [
      "Mastery of ink line weight and screentones",
      "Viral shonen manga pacing",
      "Anime fan resonance"
    ],
    "bestForCategories": [
      "Anime Collabs",
      "Manga Publishers",
      "Japanese Streetwear"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-011",
    "uid": "user-creator-011",
    "name": "Maya Lin",
    "handle": "@maya_generative",
    "email": "maya@ember.ai",
    "roleTitle": "Minimalist Brand Identity & Generative Type",
    "bio": "Exploring the intersection of Swiss typography, brutalist architecture, and algorithmic design systems for modern brands.",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    "location": "Stockholm, Sweden",
    "verified": true,
    "rate": "$2,600",
    "commercialAvailability": "Selective",
    "genres": [
      "Design",
      "Branding",
      "Architecture",
      "Art"
    ],
    "specializations": [
      "Kinetic Typography",
      "Brand Guidelines",
      "Architectural Spatial AI"
    ],
    "skills": [
      "Figma",
      "Illustrator",
      "Generative TouchDesigner",
      "Typography"
    ],
    "contentTypes": [
      "Product Ads",
      "Reels",
      "AI Films"
    ],
    "tools": [
      "Midjourney",
      "Figma",
      "After Effects",
      "Adobe"
    ],
    "platforms": [
      "Instagram",
      "Behance"
    ],
    "totalFollowers": 115000,
    "monthlyViews": 1900000,
    "engagementRate": 6.1,
    "postsCount": 160,
    "isSelfReported": true,
    "aiSummary": "High-design minimalist creator favored by architecture firms, design studios, and luxury lifestyle identity projects.",
    "strengths": [
      "Strict Swiss typographic precision",
      "Architectural lighting control",
      "Minimalist sophistication"
    ],
    "bestForCategories": [
      "Architectural Brands",
      "Design Software",
      "Luxury Furniture"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-012",
    "uid": "user-creator-012",
    "name": "Tobias Becker",
    "handle": "@tobias_action",
    "email": "tobias@ember.ai",
    "roleTitle": "Extreme Sports & Drone Action AI",
    "bio": "Downhill skiing, mountain biking, and wingsuit visuals augmented with high-speed neural motion extrapolation and drone VFX.",
    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1200&q=80",
    "location": "Innsbruck, Austria",
    "verified": false,
    "rate": "$2,900",
    "commercialAvailability": "Immediate",
    "genres": [
      "Sports",
      "Outdoors",
      "Travel",
      "Action"
    ],
    "specializations": [
      "Extreme Sports Action",
      "Drone Tracking",
      "Avalanche & Mountain VFX"
    ],
    "skills": [
      "FPV Drone Piloting",
      "High-Speed AI Retiming",
      "DaVinci Color",
      "Sound FX"
    ],
    "contentTypes": [
      "Reels",
      "YouTube",
      "Shorts"
    ],
    "tools": [
      "Runway",
      "DaVinci Resolve",
      "GoPro Studio",
      "Topaz"
    ],
    "platforms": [
      "YouTube",
      "Instagram",
      "TikTok"
    ],
    "totalFollowers": 295000,
    "monthlyViews": 7100000,
    "engagementRate": 8.1,
    "postsCount": 270,
    "isSelfReported": true,
    "aiSummary": "Adrenaline-fueled extreme sports creator delivering intense mountain and action sequences for outdoor apparel brands.",
    "strengths": [
      "Extreme kinetic immersion",
      "Hyper-crisp snow and dirt particles",
      "Strong youth male demographic"
    ],
    "bestForCategories": [
      "Action Sports Apparel",
      "Outdoor Cameras",
      "Energy Drinks"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-013",
    "uid": "user-creator-013",
    "name": "Zara Qureshi",
    "handle": "@zara_botanicals",
    "email": "zara@ember.ai",
    "roleTitle": "Sustainable Living & Botanical Art",
    "bio": "Celebrating biodiversity, regenerative agriculture, and flora ecosystems through ethereal microscopic AI botanical studies.",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=1200&q=80",
    "location": "Melbourne, Australia",
    "verified": false,
    "rate": "$1,400",
    "commercialAvailability": "Immediate",
    "genres": [
      "Eco",
      "Wellness",
      "Art",
      "Lifestyle"
    ],
    "specializations": [
      "Botanical Growth Time-lapse",
      "Eco Packaging Visuals",
      "Nature Mandalas"
    ],
    "skills": [
      "Macro Photography Prompts",
      "Procreate Digital Painting",
      "Color Harmony"
    ],
    "contentTypes": [
      "Reels",
      "Shorts"
    ],
    "tools": [
      "Midjourney",
      "Photoshop",
      "Procreate"
    ],
    "platforms": [
      "Instagram",
      "Pinterest"
    ],
    "totalFollowers": 92000,
    "monthlyViews": 1600000,
    "engagementRate": 6.8,
    "postsCount": 140,
    "isSelfReported": true,
    "aiSummary": "Quiet, poetic creator focused on plant ecology and mindful consumer products.",
    "strengths": [
      "Calm visual pace",
      "Authentic environmental ethos",
      "Warm botanical palettes"
    ],
    "bestForCategories": [
      "Eco Packaging",
      "Botanical Tea",
      "Sustainable Fashion"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-014",
    "uid": "user-creator-014",
    "name": "Diego Ramos",
    "handle": "@diego_synthwave",
    "email": "diego@ember.ai",
    "roleTitle": "Synthwave & Retro 80s Motion Designer",
    "bio": "Neon grids, chromatic aberration, chrome typography, and synthwave sunset drives designed for retro gaming and music releases.",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    "location": "Austin, TX, USA",
    "verified": false,
    "rate": "$2,200",
    "commercialAvailability": "Immediate",
    "genres": [
      "Music",
      "Synthwave",
      "Retro",
      "Gaming"
    ],
    "specializations": [
      "80s Chrome Logos",
      "Outrun Aesthetic Loops",
      "Audio Visualizers"
    ],
    "skills": [
      "Cinema 4D",
      "After Effects",
      "Neon Color Grading",
      "Audio Syncing"
    ],
    "contentTypes": [
      "Reels",
      "AI Films",
      "Shorts"
    ],
    "tools": [
      "Cinema 4D",
      "After Effects",
      "Runway",
      "Midjourney"
    ],
    "platforms": [
      "TikTok",
      "Instagram",
      "Spotify Canvas"
    ],
    "totalFollowers": 185000,
    "monthlyViews": 3900000,
    "engagementRate": 8.0,
    "postsCount": 240,
    "isSelfReported": true,
    "aiSummary": "Retro-futurist specialist producing hypnotic looping visuals with deep 80s nostalgia.",
    "strengths": [
      "Flawless seamless loop creation",
      "Vibrant neon purple and teal palettes",
      "Music industry connections"
    ],
    "bestForCategories": [
      "Synthwave Albums",
      "Retro Arcades",
      "Beverage Nightlife Ads"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-015",
    "uid": "user-creator-015",
    "name": "Priya Nambiar",
    "handle": "@priya_meditations",
    "email": "priya@ember.ai",
    "roleTitle": "AI Wellness & Meditation Visuals",
    "bio": "Ambient binaural soundscapes coupled with breathing visualizers, sacred geometry, and relaxing generative nature journeys.",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    "location": "Bengaluru, India",
    "verified": true,
    "rate": "$1,700",
    "commercialAvailability": "Immediate",
    "genres": [
      "Wellness",
      "Mental Health",
      "Spiritual",
      "Lifestyle"
    ],
    "specializations": [
      "Breathing Pacer Loops",
      "Sleep Soundscapes",
      "Mindful App Backgrounds"
    ],
    "skills": [
      "Ambient Audio Synthesis",
      "Soft Gradient Lighting",
      "Particle Effects"
    ],
    "contentTypes": [
      "YouTube",
      "Reels",
      "Shorts"
    ],
    "tools": [
      "Midjourney",
      "Runway",
      "Adobe Audition"
    ],
    "platforms": [
      "YouTube",
      "Insight Timer",
      "Instagram"
    ],
    "totalFollowers": 135000,
    "monthlyViews": 2800000,
    "engagementRate": 7.2,
    "postsCount": 180,
    "isSelfReported": true,
    "aiSummary": "Leading creator for mental health and relaxation applications, praised for meditative soothing visual rhythms.",
    "strengths": [
      "Proven stress-reduction visual design",
      "High session watch time",
      "Strong trust community"
    ],
    "bestForCategories": [
      "Meditation Apps",
      "Herbal Teas",
      "Sleep Tech Products"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-016",
    "uid": "user-creator-016",
    "name": "Jaxen Cole",
    "handle": "@jaxen_parody",
    "email": "jaxen@ember.ai",
    "roleTitle": "Short-Form Comedy & AI Pop Culture",
    "bio": "Fast-paced AI parody skits, historical figure face-swaps, and hyper-viral comedy shorts with cutting-edge synthetic lip-sync.",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    "location": "Chicago, USA",
    "verified": false,
    "rate": "$1,200",
    "commercialAvailability": "Immediate",
    "genres": [
      "Comedy",
      "Memes",
      "Pop Culture",
      "Entertainment"
    ],
    "specializations": [
      "Voice Cloning Parodies",
      "Lip Sync Animation",
      "Trend Jacking"
    ],
    "skills": [
      "ElevenLabs Audio",
      "HeyGen LipSync",
      "Fast Viral Editing",
      "Scriptwriting"
    ],
    "contentTypes": [
      "Shorts",
      "Reels",
      "TikTok"
    ],
    "tools": [
      "ElevenLabs",
      "HeyGen",
      "CapCut",
      "Midjourney"
    ],
    "platforms": [
      "TikTok",
      "YouTube Shorts",
      "Instagram"
    ],
    "totalFollowers": 540000,
    "monthlyViews": 14200000,
    "engagementRate": 10.5,
    "postsCount": 490,
    "isSelfReported": true,
    "aiSummary": "Mega-viral comedy phenomenon delivering multi-million view hits through witty AI satirical commentary.",
    "strengths": [
      "Extreme viral algorithm mastery",
      "Rapid 24h turnaround",
      "High Gen-Z conversion on novelty drops"
    ],
    "bestForCategories": [
      "Meme Tokens",
      "Casual Mobile Games",
      "Viral Consumer Apps"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-017",
    "uid": "user-creator-017",
    "name": "Kenji Takahashi (高橋 健二)",
    "handle": "@kenji_shibuya",
    "email": "creator-017@ember.ai",
    "roleTitle": "Tokyo Cyberpunk & Unreal Engine Director",
    "bio": "渋谷と新宿のネオン雨にインスパイアされたサイバーパンクAI映像作家。Midjourney v6とComfyUIノードグラフで緻密な近未来都市を構築。",
    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    "location": "Tokyo, Japan",
    "verified": true,
    "rate": "$3,800",
    "commercialAvailability": "Immediate",
    "genres": [
      "Cyberpunk",
      "AI Films",
      "Tech",
      "Automotive"
    ],
    "specializations": [
      "Cyberpunk AI",
      "ComfyUI Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "AI Films",
      "Product Ads",
      "Reels"
    ],
    "tools": [
      "ComfyUI",
      "Midjourney",
      "Runway",
      "Blender"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 340000,
    "monthlyViews": 6800000,
    "engagementRate": 8.4,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 94,
    "aiSummary": "High-tier generative visualist from Tokyo, Japan with specialized command over ComfyUI, Midjourney.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Cyberpunk Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-018",
    "uid": "user-creator-018",
    "name": "Min-jun Park (박민준)",
    "handle": "@minjun_seoul",
    "email": "creator-018@ember.ai",
    "roleTitle": "K-Fashion & Generative Runway Visualist",
    "bio": "성수동 하이패션과 생성형 비주얼 아트를 결합한 디지털 디렉터. Midjourney와 FLUX.1을 활용한 룩북 및 초현실 패션 필름 제작.",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    "location": "Seoul, South Korea",
    "verified": true,
    "rate": "$3,100",
    "commercialAvailability": "Immediate",
    "genres": [
      "Fashion",
      "Lifestyle",
      "AI Films",
      "Beauty"
    ],
    "specializations": [
      "Fashion AI",
      "FLUX.1 Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads"
    ],
    "tools": [
      "FLUX.1",
      "Midjourney",
      "Runway",
      "Photoshop"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 290000,
    "monthlyViews": 4900000,
    "engagementRate": 7.9,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 92,
    "aiSummary": "High-tier generative visualist from Seoul, South Korea with specialized command over FLUX.1, Midjourney.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Fashion Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-019",
    "uid": "user-creator-019",
    "name": "Camille Laurent",
    "handle": "@camille_paris_ai",
    "email": "creator-019@ember.ai",
    "roleTitle": "Haute Parfumerie & Botanical Surrealist",
    "bio": "Direction artistique générative pour maisons de luxe et parfumerie de niche. Fusion poétique entre botanique vintage et 3D photoréaliste.",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    "location": "Paris, France",
    "verified": true,
    "rate": "$2,900",
    "commercialAvailability": "Immediate",
    "genres": [
      "Beauty",
      "Luxury",
      "Lifestyle",
      "Art"
    ],
    "specializations": [
      "Beauty AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Midjourney",
      "Magnific AI",
      "Photoshop",
      "DaVinci Resolve"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 240000,
    "monthlyViews": 4100000,
    "engagementRate": 8.1,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 96,
    "aiSummary": "High-tier generative visualist from Paris, France with specialized command over Midjourney, Magnific AI.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Beauty Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-020",
    "uid": "user-creator-020",
    "name": "Mateo Morales",
    "handle": "@mateo_bogota",
    "email": "creator-020@ember.ai",
    "roleTitle": "Latin Tropical Futurism & Brand Animator",
    "bio": "Explorando el realismo mágico latinoamericano a través de síntesis neuronal. Texturas vibrantes de la selva combinadas con diseño automotriz futurista.",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    "location": "Bogotá, Colombia",
    "verified": true,
    "rate": "$2,400",
    "commercialAvailability": "Immediate",
    "genres": [
      "Art",
      "Lifestyle",
      "Fashion",
      "Automotive"
    ],
    "specializations": [
      "Art AI",
      "Runway Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads"
    ],
    "tools": [
      "Runway",
      "Midjourney",
      "Blender",
      "Adobe"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 210000,
    "monthlyViews": 3600000,
    "engagementRate": 7.3,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "link-checked",
    "trustScore": 84,
    "aiSummary": "High-tier generative visualist from Bogotá, Colombia with specialized command over Runway, Midjourney.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Art Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-021",
    "uid": "user-creator-021",
    "name": "Tariq Al-Mansoor (طارق المنصور)",
    "handle": "@tariq_dubai",
    "email": "creator-021@ember.ai",
    "roleTitle": "Desert Architectural Synthesis & Luxury VFX",
    "bio": "إخراج سينمائي وتصميم بيئات بصرية رقمية متقدمة. دمج العمارة الصحراوية المستقبلية مع تصاميم اليخوت والسيارات الفاخرة.",
    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    "location": "Dubai, UAE",
    "verified": true,
    "rate": "$4,500",
    "commercialAvailability": "Immediate",
    "genres": [
      "Architecture",
      "Luxury",
      "Tech",
      "AI Films"
    ],
    "specializations": [
      "Architecture AI",
      "Blender Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "AI Films",
      "Product Ads",
      "YouTube"
    ],
    "tools": [
      "Blender",
      "Midjourney",
      "Runway",
      "Magnific AI"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 410000,
    "monthlyViews": 8200000,
    "engagementRate": 8.7,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 95,
    "aiSummary": "High-tier generative visualist from Dubai, UAE with specialized command over Blender, Midjourney.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Architecture Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-022",
    "uid": "user-creator-022",
    "name": "Chioma Eze",
    "handle": "@chioma_afrofuturism",
    "email": "creator-022@ember.ai",
    "roleTitle": "Afrofuturistic Fashion & Narrative Worldbuilder",
    "bio": "Celebrating African royal textile heritage through neural worldbuilding and high-concept generative cinema. Featured in Lagos Creative Week.",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    "location": "Lagos, Nigeria",
    "verified": true,
    "rate": "$2,700",
    "commercialAvailability": "Immediate",
    "genres": [
      "Fashion",
      "Art",
      "AI Films",
      "Lifestyle"
    ],
    "specializations": [
      "Fashion AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "AI Films"
    ],
    "tools": [
      "Midjourney",
      "Runway",
      "ElevenLabs",
      "Photoshop"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 265000,
    "monthlyViews": 4500000,
    "engagementRate": 8.6,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 91,
    "aiSummary": "High-tier generative visualist from Lagos, Nigeria with specialized command over Midjourney, Runway.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Fashion Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-023",
    "uid": "user-creator-023",
    "name": "Lukas Weber",
    "handle": "@lukas_berlin_vfx",
    "email": "creator-023@ember.ai",
    "roleTitle": "Industrial Techno & Generative 3D Kinetic Artist",
    "bio": "Brutalist architecture, dark techno pacing, and mechanical generative motion. Creating festival visuals, hardware drops, and club identities.",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    "location": "Berlin, Germany",
    "verified": true,
    "rate": "$3,400",
    "commercialAvailability": "Immediate",
    "genres": [
      "Tech",
      "Gaming",
      "AI Films",
      "Music"
    ],
    "specializations": [
      "Tech AI",
      "TouchDesigner Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "AI Films",
      "Reels",
      "Shorts"
    ],
    "tools": [
      "TouchDesigner",
      "ComfyUI",
      "Blender",
      "Topaz Video AI"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 310000,
    "monthlyViews": 6100000,
    "engagementRate": 8.0,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 93,
    "aiSummary": "High-tier generative visualist from Berlin, Germany with specialized command over TouchDesigner, ComfyUI.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Tech Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-024",
    "uid": "user-creator-024",
    "name": "Camila Santos",
    "handle": "@camilasantos_rio",
    "email": "creator-024@ember.ai",
    "roleTitle": "Hyper-Color Brazilian Pop & Product Animator",
    "bio": "Vibrant colors, carnival energy, and tropical brand advertising. Turning beverage and fashion campaigns into viral dance rhythms with AI.",
    "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    "location": "Rio de Janeiro, Brazil",
    "verified": true,
    "rate": "$2,300",
    "commercialAvailability": "Immediate",
    "genres": [
      "Lifestyle",
      "Food",
      "Fashion",
      "Beauty"
    ],
    "specializations": [
      "Lifestyle AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads"
    ],
    "tools": [
      "Midjourney",
      "Runway",
      "Kling AI",
      "CapCut"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 220000,
    "monthlyViews": 3800000,
    "engagementRate": 7.5,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "link-checked",
    "trustScore": 82,
    "aiSummary": "High-tier generative visualist from Rio de Janeiro, Brazil with specialized command over Midjourney, Runway.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Lifestyle Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-025",
    "uid": "user-creator-025",
    "name": "Oliver Vance",
    "handle": "@olivervance_ldn",
    "email": "creator-025@ember.ai",
    "roleTitle": "British Heritage & High-End Automotive Cinematic",
    "bio": "Crafting bespoke AI films for luxury British automotive and heritage tailoring. Anamorphic optics, moody English drizzle, and timeless luxury.",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
    "location": "London, UK",
    "verified": true,
    "rate": "$4,200",
    "commercialAvailability": "Immediate",
    "genres": [
      "Automotive",
      "Luxury",
      "AI Films",
      "Fashion"
    ],
    "specializations": [
      "Automotive AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "AI Films",
      "Product Ads",
      "YouTube"
    ],
    "tools": [
      "Midjourney",
      "Runway",
      "DaVinci Resolve",
      "Topaz Video AI"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 380000,
    "monthlyViews": 7200000,
    "engagementRate": 8.5,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 97,
    "aiSummary": "High-tier generative visualist from London, UK with specialized command over Midjourney, Runway.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Automotive Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-026",
    "uid": "user-creator-026",
    "name": "Zuri Mwangi",
    "handle": "@zuri_savanna_ai",
    "email": "creator-026@ember.ai",
    "roleTitle": "Wildlife Conservation & Safari Documentary AI",
    "bio": "Bringing endangered African wildlife and conservation stories to life using hyperrealistic neural simulation and immersive nature acoustics.",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    "location": "Nairobi, Kenya",
    "verified": true,
    "rate": "$2,500",
    "commercialAvailability": "Immediate",
    "genres": [
      "Travel",
      "Lifestyle",
      "AI Films",
      "Art"
    ],
    "specializations": [
      "Travel AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "YouTube",
      "Reels",
      "Shorts"
    ],
    "tools": [
      "Midjourney",
      "Runway",
      "ElevenLabs",
      "Adobe"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 180000,
    "monthlyViews": 2900000,
    "engagementRate": 7.4,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "link-checked",
    "trustScore": 86,
    "aiSummary": "High-tier generative visualist from Nairobi, Kenya with specialized command over Midjourney, Runway.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Travel Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-027",
    "uid": "user-creator-027",
    "name": "Astrid Lindqvist",
    "handle": "@astrid_nordic",
    "email": "creator-027@ember.ai",
    "roleTitle": "Nordic Minimalist & Glassware Artist",
    "bio": "Award-winning generative creator based in Stockholm, Sweden. Specializing in Beauty and Art with advanced mastery of Midjourney and Magnific AI.",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Stockholm, Sweden",
    "verified": true,
    "rate": "$1800",
    "commercialAvailability": "Immediate",
    "genres": [
      "Beauty",
      "Art",
      "Tech"
    ],
    "specializations": [
      "Beauty AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Midjourney",
      "Magnific AI",
      "Blender"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 150000,
    "monthlyViews": 2500000,
    "engagementRate": 6.8,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 80,
    "aiSummary": "High-tier generative visualist from Stockholm, Sweden with specialized command over Midjourney, Magnific AI.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Beauty Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-028",
    "uid": "user-creator-028",
    "name": "Ji-woo Kim",
    "handle": "@jiwoo_kpop",
    "email": "creator-028@ember.ai",
    "roleTitle": "K-Pop Visualizer & Holo-Stage Designer",
    "bio": "Award-winning generative creator based in Seoul, South Korea. Specializing in Music and Gaming with advanced mastery of ComfyUI and Runway.",
    "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Seoul, South Korea",
    "verified": false,
    "rate": "$1910",
    "commercialAvailability": "Immediate",
    "genres": [
      "Music",
      "Gaming",
      "AI Films"
    ],
    "specializations": [
      "Music AI",
      "ComfyUI Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "ComfyUI",
      "Runway",
      "TouchDesigner"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 162000,
    "monthlyViews": 2710000,
    "engagementRate": 6.9,
    "postsCount": 180,
    "isSelfReported": true,
    "trustTier": "self-reported",
    "trustScore": 81,
    "aiSummary": "High-tier generative visualist from Seoul, South Korea with specialized command over ComfyUI, Runway.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Music Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-029",
    "uid": "user-creator-029",
    "name": "Liam O'Connor",
    "handle": "@liam_arctic",
    "email": "creator-029@ember.ai",
    "roleTitle": "Winter Outerwear & Extreme Cold Cinematographer",
    "bio": "Award-winning generative creator based in Toronto, Canada. Specializing in Fashion and Travel with advanced mastery of Midjourney and Runway.",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Toronto, Canada",
    "verified": true,
    "rate": "$2020",
    "commercialAvailability": "Immediate",
    "genres": [
      "Fashion",
      "Travel",
      "Automotive"
    ],
    "specializations": [
      "Fashion AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Midjourney",
      "Runway",
      "DaVinci Resolve"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 174000,
    "monthlyViews": 2920000,
    "engagementRate": 7.0,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 82,
    "aiSummary": "High-tier generative visualist from Toronto, Canada with specialized command over Midjourney, Runway.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Fashion Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-030",
    "uid": "user-creator-030",
    "name": "Maya Henderson",
    "handle": "@maya_byronbay",
    "email": "creator-030@ember.ai",
    "roleTitle": "Coastal Surf & Eco-Beverage Creative",
    "bio": "Award-winning generative creator based in Melbourne, Australia. Specializing in Lifestyle and Food with advanced mastery of Runway and Midjourney.",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Melbourne, Australia",
    "verified": true,
    "rate": "$2130",
    "commercialAvailability": "Immediate",
    "genres": [
      "Lifestyle",
      "Food",
      "Travel"
    ],
    "specializations": [
      "Lifestyle AI",
      "Runway Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Runway",
      "Midjourney",
      "Adobe"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 186000,
    "monthlyViews": 3130000,
    "engagementRate": 7.1,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "link-checked",
    "trustScore": 83,
    "aiSummary": "High-tier generative visualist from Melbourne, Australia with specialized command over Runway, Midjourney.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Lifestyle Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-031",
    "uid": "user-creator-031",
    "name": "Zhen Wei Tan",
    "handle": "@zhenwei_sg",
    "email": "creator-031@ember.ai",
    "roleTitle": "Smart City & Cyber Flora Architect",
    "bio": "Award-winning generative creator based in Singapore. Specializing in Architecture and Tech with advanced mastery of Blender and ComfyUI.",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Singapore",
    "verified": true,
    "rate": "$2240",
    "commercialAvailability": "Immediate",
    "genres": [
      "Architecture",
      "Tech",
      "AI Films"
    ],
    "specializations": [
      "Architecture AI",
      "Blender Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Blender",
      "ComfyUI",
      "Magnific AI"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 198000,
    "monthlyViews": 3340000,
    "engagementRate": 7.2,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 84,
    "aiSummary": "High-tier generative visualist from Singapore with specialized command over Blender, ComfyUI.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Architecture Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-032",
    "uid": "user-creator-032",
    "name": "Lucia Fernandez",
    "handle": "@lucia_madrid",
    "email": "creator-032@ember.ai",
    "roleTitle": "Flamenco Motion & Neo-Classical Surrealist",
    "bio": "Award-winning generative creator based in Madrid, Spain. Specializing in Art and Fashion with advanced mastery of Midjourney and Stable Diffusion.",
    "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Madrid, Spain",
    "verified": false,
    "rate": "$2350",
    "commercialAvailability": "Immediate",
    "genres": [
      "Art",
      "Fashion",
      "Lifestyle"
    ],
    "specializations": [
      "Art AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Midjourney",
      "Stable Diffusion",
      "Photoshop"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 210000,
    "monthlyViews": 3550000,
    "engagementRate": 7.3,
    "postsCount": 180,
    "isSelfReported": true,
    "trustTier": "self-reported",
    "trustScore": 85,
    "aiSummary": "High-tier generative visualist from Madrid, Spain with specialized command over Midjourney, Stable Diffusion.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Art Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-033",
    "uid": "user-creator-033",
    "name": "Bram van Dijk",
    "handle": "@bram_amsterdam",
    "email": "creator-033@ember.ai",
    "roleTitle": "Bicycle Tech & Urban Sustainable Design",
    "bio": "Award-winning generative creator based in Amsterdam, Netherlands. Specializing in Tech and Lifestyle with advanced mastery of Runway and Midjourney.",
    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Amsterdam, Netherlands",
    "verified": true,
    "rate": "$2460",
    "commercialAvailability": "Immediate",
    "genres": [
      "Tech",
      "Lifestyle",
      "Automotive"
    ],
    "specializations": [
      "Tech AI",
      "Runway Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Runway",
      "Midjourney",
      "Adobe"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 222000,
    "monthlyViews": 3760000,
    "engagementRate": 7.4,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 86,
    "aiSummary": "High-tier generative visualist from Amsterdam, Netherlands with specialized command over Runway, Midjourney.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Tech Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-034",
    "uid": "user-creator-034",
    "name": "Yuna Mori",
    "handle": "@yuna_kyoto",
    "email": "creator-034@ember.ai",
    "roleTitle": "Zen Garden & Wabi-Sabi Tea Visualist",
    "bio": "Award-winning generative creator based in Kyoto, Japan. Specializing in Lifestyle and Art with advanced mastery of Midjourney and Photoshop.",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Kyoto, Japan",
    "verified": false,
    "rate": "$2570",
    "commercialAvailability": "Immediate",
    "genres": [
      "Lifestyle",
      "Art",
      "Beauty"
    ],
    "specializations": [
      "Lifestyle AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Midjourney",
      "Photoshop",
      "Topaz Video AI"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 234000,
    "monthlyViews": 3970000,
    "engagementRate": 7.5,
    "postsCount": 180,
    "isSelfReported": true,
    "trustTier": "self-reported",
    "trustScore": 87,
    "aiSummary": "High-tier generative visualist from Kyoto, Japan with specialized command over Midjourney, Photoshop.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Lifestyle Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-035",
    "uid": "user-creator-035",
    "name": "Diego Ramirez",
    "handle": "@diego_cdmx",
    "email": "creator-035@ember.ai",
    "roleTitle": "Dia de los Muertos Holographic Animator",
    "bio": "Award-winning generative creator based in Mexico City, Mexico. Specializing in Art and AI Films with advanced mastery of ComfyUI and Runway.",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Mexico City, Mexico",
    "verified": true,
    "rate": "$2680",
    "commercialAvailability": "Immediate",
    "genres": [
      "Art",
      "AI Films",
      "Music"
    ],
    "specializations": [
      "Art AI",
      "ComfyUI Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "ComfyUI",
      "Runway",
      "Blender"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 246000,
    "monthlyViews": 4180000,
    "engagementRate": 7.6,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 88,
    "aiSummary": "High-tier generative visualist from Mexico City, Mexico with specialized command over ComfyUI, Runway.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Art Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-036",
    "uid": "user-creator-036",
    "name": "Ethan Cole",
    "handle": "@ethan_sf_ai",
    "email": "creator-036@ember.ai",
    "roleTitle": "Silicon Valley Hardware & AI Agent Showcase",
    "bio": "Award-winning generative creator based in San Francisco, CA. Specializing in Tech and Product Ads with advanced mastery of Midjourney and Runway.",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "San Francisco, CA",
    "verified": true,
    "rate": "$2790",
    "commercialAvailability": "Immediate",
    "genres": [
      "Tech",
      "Product Ads",
      "AI Films"
    ],
    "specializations": [
      "Tech AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Midjourney",
      "Runway",
      "DaVinci Resolve"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 258000,
    "monthlyViews": 4390000,
    "engagementRate": 7.7,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "link-checked",
    "trustScore": 89,
    "aiSummary": "High-tier generative visualist from San Francisco, CA with specialized command over Midjourney, Runway.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Tech Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-037",
    "uid": "user-creator-037",
    "name": "Ananya Roy",
    "handle": "@ananya_vfx",
    "email": "creator-037@ember.ai",
    "roleTitle": "Bollywood Sci-Fi & High-VFX Dance Director",
    "bio": "Award-winning generative creator based in Mumbai, India. Specializing in AI Films and Music with advanced mastery of Runway and Midjourney.",
    "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Mumbai, India",
    "verified": true,
    "rate": "$2900",
    "commercialAvailability": "Immediate",
    "genres": [
      "AI Films",
      "Music",
      "Fashion"
    ],
    "specializations": [
      "AI Films AI",
      "Runway Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Runway",
      "Midjourney",
      "ElevenLabs"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 270000,
    "monthlyViews": 4600000,
    "engagementRate": 7.8,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 90,
    "aiSummary": "High-tier generative visualist from Mumbai, India with specialized command over Runway, Midjourney.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "AI Films Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-038",
    "uid": "user-creator-038",
    "name": "Nour El-Din",
    "handle": "@nour_cairo",
    "email": "creator-038@ember.ai",
    "roleTitle": "Nile Drone Photogrammetry & Ancient Myth VFX",
    "bio": "Award-winning generative creator based in Cairo, Egypt. Specializing in Travel and AI Films with advanced mastery of Midjourney and Blender.",
    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Cairo, Egypt",
    "verified": false,
    "rate": "$3010",
    "commercialAvailability": "Immediate",
    "genres": [
      "Travel",
      "AI Films",
      "Art"
    ],
    "specializations": [
      "Travel AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Midjourney",
      "Blender",
      "Photoshop"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 282000,
    "monthlyViews": 4810000,
    "engagementRate": 7.9,
    "postsCount": 180,
    "isSelfReported": true,
    "trustTier": "self-reported",
    "trustScore": 91,
    "aiSummary": "High-tier generative visualist from Cairo, Egypt with specialized command over Midjourney, Blender.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Travel Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-039",
    "uid": "user-creator-039",
    "name": "Maximilian Bauer",
    "handle": "@max_bavaria",
    "email": "creator-039@ember.ai",
    "roleTitle": "Precision Automotive CAD & Hypercar Renders",
    "bio": "Award-winning generative creator based in Munich, Germany. Specializing in Automotive and Tech with advanced mastery of Blender and Midjourney.",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Munich, Germany",
    "verified": true,
    "rate": "$3120",
    "commercialAvailability": "Immediate",
    "genres": [
      "Automotive",
      "Tech",
      "Luxury"
    ],
    "specializations": [
      "Automotive AI",
      "Blender Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Blender",
      "Midjourney",
      "Magnific AI"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 294000,
    "monthlyViews": 5020000,
    "engagementRate": 8.0,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 92,
    "aiSummary": "High-tier generative visualist from Munich, Germany with specialized command over Blender, Midjourney.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Automotive Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-040",
    "uid": "user-creator-040",
    "name": "Sipho Dlamini",
    "handle": "@sipho_safari",
    "email": "creator-040@ember.ai",
    "roleTitle": "Atlantic Coastline & Adventure Travel Films",
    "bio": "Award-winning generative creator based in Cape Town, South Africa. Specializing in Travel and Lifestyle with advanced mastery of Runway and Midjourney.",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Cape Town, South Africa",
    "verified": false,
    "rate": "$3230",
    "commercialAvailability": "Immediate",
    "genres": [
      "Travel",
      "Lifestyle",
      "AI Films"
    ],
    "specializations": [
      "Travel AI",
      "Runway Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Runway",
      "Midjourney",
      "DaVinci Resolve"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 306000,
    "monthlyViews": 5230000,
    "engagementRate": 8.1,
    "postsCount": 180,
    "isSelfReported": true,
    "trustTier": "self-reported",
    "trustScore": 93,
    "aiSummary": "High-tier generative visualist from Cape Town, South Africa with specialized command over Runway, Midjourney.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Travel Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-041",
    "uid": "user-creator-041",
    "name": "Alexandre Tremblay",
    "handle": "@alex_mtl_3d",
    "email": "creator-041@ember.ai",
    "roleTitle": "Indie Game Cutscenes & Cyberpunk Shaders",
    "bio": "Award-winning generative creator based in Montreal, Canada. Specializing in Gaming and Tech with advanced mastery of Unreal Engine and ComfyUI.",
    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Montreal, Canada",
    "verified": true,
    "rate": "$3340",
    "commercialAvailability": "Immediate",
    "genres": [
      "Gaming",
      "Tech",
      "AI Films"
    ],
    "specializations": [
      "Gaming AI",
      "Unreal Engine Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Unreal Engine",
      "ComfyUI",
      "Midjourney"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 318000,
    "monthlyViews": 5440000,
    "engagementRate": 8.2,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 94,
    "aiSummary": "High-tier generative visualist from Montreal, Canada with specialized command over Unreal Engine, ComfyUI.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Gaming Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-042",
    "uid": "user-creator-042",
    "name": "Chiara Rossi",
    "handle": "@chiara_milano",
    "email": "creator-042@ember.ai",
    "roleTitle": "Milano Fashion Week & Leather Goods Animator",
    "bio": "Award-winning generative creator based in Milan, Italy. Specializing in Fashion and Luxury with advanced mastery of Midjourney and Magnific AI.",
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Milan, Italy",
    "verified": true,
    "rate": "$3450",
    "commercialAvailability": "Immediate",
    "genres": [
      "Fashion",
      "Luxury",
      "Beauty"
    ],
    "specializations": [
      "Fashion AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Midjourney",
      "Magnific AI",
      "Runway"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 330000,
    "monthlyViews": 5650000,
    "engagementRate": 8.3,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "link-checked",
    "trustScore": 95,
    "aiSummary": "High-tier generative visualist from Milan, Italy with specialized command over Midjourney, Magnific AI.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Fashion Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-043",
    "uid": "user-creator-043",
    "name": "Somchai Prasert",
    "handle": "@somchai_bkk",
    "email": "creator-043@ember.ai",
    "roleTitle": "Neon Night Market & Street Food Macro AI",
    "bio": "Award-winning generative creator based in Bangkok, Thailand. Specializing in Food and Travel with advanced mastery of Midjourney and Runway.",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Bangkok, Thailand",
    "verified": true,
    "rate": "$3560",
    "commercialAvailability": "Immediate",
    "genres": [
      "Food",
      "Travel",
      "Lifestyle"
    ],
    "specializations": [
      "Food AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Midjourney",
      "Runway",
      "CapCut"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 342000,
    "monthlyViews": 5860000,
    "engagementRate": 8.4,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 96,
    "aiSummary": "High-tier generative visualist from Bangkok, Thailand with specialized command over Midjourney, Runway.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Food Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-044",
    "uid": "user-creator-044",
    "name": "Sigrid Haugen",
    "handle": "@sigrid_fjord",
    "email": "creator-044@ember.ai",
    "roleTitle": "Fjord Aurora & Arctic Expedition Filmmaker",
    "bio": "Award-winning generative creator based in Oslo, Norway. Specializing in Travel and AI Films with advanced mastery of Midjourney and Runway.",
    "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Oslo, Norway",
    "verified": false,
    "rate": "$3670",
    "commercialAvailability": "Immediate",
    "genres": [
      "Travel",
      "AI Films",
      "Automotive"
    ],
    "specializations": [
      "Travel AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Midjourney",
      "Runway",
      "Topaz Video AI"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 354000,
    "monthlyViews": 6070000,
    "engagementRate": 8.5,
    "postsCount": 180,
    "isSelfReported": true,
    "trustTier": "self-reported",
    "trustScore": 97,
    "aiSummary": "High-tier generative visualist from Oslo, Norway with specialized command over Midjourney, Runway.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Travel Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-045",
    "uid": "user-creator-045",
    "name": "Facundo Gomez",
    "handle": "@facundo_tango",
    "email": "creator-045@ember.ai",
    "roleTitle": "Tango Cinematic & High-Drama Storyteller",
    "bio": "Award-winning generative creator based in Buenos Aires, Argentina. Specializing in AI Films and Music with advanced mastery of Midjourney and Runway.",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Buenos Aires, Argentina",
    "verified": true,
    "rate": "$3780",
    "commercialAvailability": "Immediate",
    "genres": [
      "AI Films",
      "Music",
      "Art"
    ],
    "specializations": [
      "AI Films AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Midjourney",
      "Runway",
      "DaVinci Resolve"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 366000,
    "monthlyViews": 6280000,
    "engagementRate": 8.6,
    "postsCount": 180,
    "isSelfReported": false,
    "trustTier": "proof-backed",
    "trustScore": 80,
    "aiSummary": "High-tier generative visualist from Buenos Aires, Argentina with specialized command over Midjourney, Runway.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "AI Films Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  },
  {
    "creatorId": "creator-046",
    "uid": "user-creator-046",
    "name": "Ciaran Murphy",
    "handle": "@ciaran_myth",
    "email": "creator-046@ember.ai",
    "roleTitle": "Celtic Folklore & Emerald Fantasy Worldbuilder",
    "bio": "Award-winning generative creator based in Dublin, Ireland. Specializing in Art and AI Films with advanced mastery of Midjourney and ComfyUI.",
    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    "coverImage": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "location": "Dublin, Ireland",
    "verified": false,
    "rate": "$3890",
    "commercialAvailability": "Immediate",
    "genres": [
      "Art",
      "AI Films",
      "Gaming"
    ],
    "specializations": [
      "Art AI",
      "Midjourney Workflow",
      "Prompt Design"
    ],
    "skills": [
      "Prompt Engineering",
      "VFX",
      "Art Direction",
      "Color Grading"
    ],
    "contentTypes": [
      "Reels",
      "Shorts",
      "Product Ads",
      "AI Films"
    ],
    "tools": [
      "Midjourney",
      "ComfyUI",
      "ElevenLabs"
    ],
    "platforms": [
      "Instagram",
      "YouTube",
      "TikTok"
    ],
    "totalFollowers": 378000,
    "monthlyViews": 6490000,
    "engagementRate": 8.7,
    "postsCount": 180,
    "isSelfReported": true,
    "trustTier": "self-reported",
    "trustScore": 81,
    "aiSummary": "High-tier generative visualist from Dublin, Ireland with specialized command over Midjourney, ComfyUI.",
    "strengths": [
      "Rapid pipeline turnaround",
      "Photorealistic material coherence",
      "Distinctive cultural aesthetics"
    ],
    "bestForCategories": [
      "Art Launches",
      "Global Brand Ad Spots"
    ],
    "isDemo": true
  }
];

export const demoPortfolios: PortfolioItem[] = [
  {
    "id": "port-001",
    "creatorId": "creator-001",
    "uid": "user-creator-001",
    "title": "Neon Tokyo: City of Dreams",
    "description": "Cyberpunk short film produced using Midjourney v6 and Runway Gen-2 with anime screentone color grading.",
    "mediaUrl": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=80",
    "videoUrl": "/videos/neon-tokyo.mp4",
    "mediaType": "Video",
    "contentType": "AI Films",
    "genre": "Fashion",
    "toolsUsed": [
      "Runway",
      "Midjourney",
      "DaVinci Resolve"
    ],
    "views": "72.4K",
    "likes": "6.8K",
    "aiTags": [
      "Cyberpunk",
      "Cinematic",
      "Anime",
      "Neon Lighting"
    ],
    "isDemo": true
  },
  {
    "id": "port-002",
    "creatorId": "creator-001",
    "uid": "user-creator-001",
    "title": "Vapor Velocity: Sneaker Concept Film",
    "description": "Kinetic 30s commercial showing a liquid-nitrogen sneaker forming from raw polymer threads.",
    "mediaUrl": "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80",
    "videoUrl": "/videos/sneakers-vapor.mp4",
    "mediaType": "Video",
    "contentType": "Product Ads",
    "genre": "Sneakers",
    "toolsUsed": [
      "Runway",
      "Midjourney",
      "After Effects"
    ],
    "views": "118.2K",
    "likes": "12.4K",
    "aiTags": [
      "Sneakers",
      "Fluid Mechanics",
      "Product Film",
      "Hypebeast"
    ],
    "isDemo": true
  },
  {
    "id": "port-003",
    "creatorId": "creator-002",
    "uid": "user-creator-002",
    "title": "Ethereal Botanicals & Morning Dew",
    "description": "Watercolor animation capturing delicate drops on sakura petals for luxury organic skincare.",
    "mediaUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
    "videoUrl": "/videos/skincare-botanicals.mp4",
    "mediaType": "Video",
    "contentType": "Product Ads",
    "genre": "Beauty",
    "toolsUsed": [
      "Midjourney",
      "Photoshop",
      "Stable Diffusion"
    ],
    "views": "45.1K",
    "likes": "4.9K",
    "aiTags": [
      "Botanical",
      "Skincare",
      "Watercolor",
      "Minimalist"
    ],
    "isDemo": true
  },
  {
    "id": "port-004",
    "creatorId": "creator-002",
    "uid": "user-creator-002",
    "title": "Mount Fuji Sakura Window",
    "description": "Tranquil afternoon in a traditional wooden studio overlooking Mount Fuji with floating cherry blossoms.",
    "mediaUrl": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
    "videoUrl": "/videos/sakura-fuji.mp4",
    "mediaType": "Video",
    "contentType": "Reels",
    "genre": "Lifestyle",
    "toolsUsed": [
      "Midjourney",
      "Photoshop"
    ],
    "views": "62.0K",
    "likes": "5.6K",
    "aiTags": [
      "Mount Fuji",
      "Sakura",
      "Sketchbook",
      "Watercolor"
    ],
    "isDemo": true
  },
  {
    "id": "port-005",
    "creatorId": "creator-004",
    "uid": "user-creator-004",
    "title": "Midnight Autobahn: Apex Hypercar",
    "description": "High-speed rain reflection tracking shot of a bespoke electric hypercar cruising Berlin streets.",
    "mediaUrl": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    "videoUrl": "/videos/apex-hypercar.mp4",
    "mediaType": "Video",
    "contentType": "AI Films",
    "genre": "Automotive",
    "toolsUsed": [
      "Unreal Engine",
      "ComfyUI",
      "DaVinci Resolve"
    ],
    "views": "94.0K",
    "likes": "8.8K",
    "aiTags": [
      "Hypercar",
      "Wet Reflections",
      "Automotive CGI",
      "Night Drive"
    ],
    "isDemo": true
  },
  {
    "id": "port-006",
    "creatorId": "creator-007",
    "uid": "user-creator-007",
    "title": "Sector 9 Mecha Showdown",
    "description": "High-octane mecha duel choreographed in Cascadeur with volumetric laser smoke and neon destruction.",
    "mediaUrl": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    "videoUrl": "/videos/mecha-gaming.mp4",
    "mediaType": "Video",
    "contentType": "AI Films",
    "genre": "Gaming",
    "toolsUsed": [
      "Blender",
      "Runway",
      "Cascadeur"
    ],
    "views": "142.5K",
    "likes": "15.9K",
    "aiTags": [
      "Mecha",
      "Combat Physics",
      "Cyberpunk",
      "Game VFX"
    ],
    "isDemo": true
  },
  {
    "id": "port-007",
    "creatorId": "creator-005",
    "uid": "user-creator-005",
    "title": "AeroFoam 2099: Cyber Drop",
    "description": "Viral streetwear animation featuring 360-degree exploded sole views and gravity-defying lace animations.",
    "mediaUrl": "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80",
    "videoUrl": "/videos/aerofoam-sneakers.mp4",
    "mediaType": "Video",
    "contentType": "Product Ads",
    "genre": "Sneakers",
    "toolsUsed": [
      "Midjourney",
      "Kling AI",
      "After Effects"
    ],
    "views": "180.3K",
    "likes": "18.1K",
    "aiTags": [
      "Sneakers",
      "Streetwear",
      "Kling AI",
      "Footwear Drop"
    ],
    "isDemo": true
  },
  {
    "id": "port-008",
    "creatorId": "creator-008",
    "uid": "user-creator-008",
    "title": "Whispers of the Silk Road",
    "description": "Atmospheric cultural documentary exploring ancient caravan routes reimagined through generative visual memory.",
    "mediaUrl": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80",
    "videoUrl": "/videos/silk-road-travel.mp4",
    "mediaType": "Video",
    "contentType": "AI Films",
    "genre": "Travel",
    "toolsUsed": [
      "Premiere",
      "Midjourney",
      "Topaz Video AI"
    ],
    "views": "88.6K",
    "likes": "7.9K",
    "aiTags": [
      "Travel",
      "Silk Road",
      "Documentary",
      "Culture"
    ],
    "isDemo": true
  },
  {
    "id": "port-creator-017",
    "creatorId": "creator-017",
    "uid": "user-creator-017",
    "title": "Kenji Takahashi (高橋 健二) Signature Cyberpunk Showcase",
    "description": "Commercial creative synthesis showcasing ComfyUI, Midjourney, Runway, Blender workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "AI Films",
    "genre": "Cyberpunk",
    "toolsUsed": [
      "ComfyUI",
      "Midjourney",
      "Runway",
      "Blender"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Cyberpunk",
      "AI Films",
      "Tech",
      "Automotive",
      "ComfyUI",
      "Midjourney",
      "Runway",
      "Blender"
    ],
    "workflow": {
      "tools": [
        {
          "name": "ComfyUI",
          "kind": "app",
          "version": "v0.2"
        },
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v6"
        },
        {
          "name": "Runway",
          "kind": "model",
          "version": "Gen-3"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Volumetric Lighting Prompt",
          "tool": "Midjourney v6",
          "description": "Shinjuku rain alleyway in anamorphic 35mm lens with volumetric cyan & amber haze.",
          "minutes": 45
        },
        {
          "order": 2,
          "title": "Node ControlNet Composition",
          "tool": "ComfyUI",
          "description": "ControlNet openpose and depth pass to ground cyberpunk vehicle reflections.",
          "minutes": 120
        },
        {
          "order": 3,
          "title": "Temporal Motion Synthesis",
          "tool": "Runway Gen-3",
          "description": "Camera dolly-in with coherent wet pavement reflections.",
          "minutes": 60
        }
      ],
      "totalHours": 3.75,
      "promptText": "/imagine shinjuku rainy alleyway, 2088 cyberpunk hypercar, neon holograms, anamorphic 35mm --ar 16:9 --v 6.0",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Cyberpunk aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Cyberpunk",
      "AI Films",
      "Tech",
      "Automotive"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-018",
    "creatorId": "creator-018",
    "uid": "user-creator-018",
    "title": "Min-jun Park (박민준) Signature Fashion Showcase",
    "description": "Commercial creative synthesis showcasing FLUX.1, Midjourney, Runway, Photoshop workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Fashion",
    "toolsUsed": [
      "FLUX.1",
      "Midjourney",
      "Runway",
      "Photoshop"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Fashion",
      "Lifestyle",
      "AI Films",
      "Beauty",
      "FLUX.1",
      "Midjourney",
      "Runway",
      "Photoshop"
    ],
    "workflow": {
      "tools": [
        {
          "name": "FLUX.1",
          "kind": "model",
          "version": "dev"
        },
        {
          "name": "Runway",
          "kind": "model",
          "version": "Gen-3"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Fabric Texture Synthesis",
          "tool": "FLUX.1",
          "description": "Silk organza and iridescent metallic puff sleeves in studio rim lighting.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Runway Dynamic Walk Cycle",
          "tool": "Runway Gen-3",
          "description": "High fashion runway pacing with slow-motion garment flutter.",
          "minutes": 75
        }
      ],
      "totalHours": 2.0,
      "promptText": "Avant-garde haute couture organza gown, slow runway walk, editorial studio flash --ar 9:16",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Fashion aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Fashion",
      "Lifestyle",
      "AI Films",
      "Beauty"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-019",
    "creatorId": "creator-019",
    "uid": "user-creator-019",
    "title": "Camille Laurent Signature Beauty Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, Magnific AI, Photoshop, DaVinci Resolve workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Beauty",
    "toolsUsed": [
      "Midjourney",
      "Magnific AI",
      "Photoshop",
      "DaVinci Resolve"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Beauty",
      "Luxury",
      "Lifestyle",
      "Art",
      "Midjourney",
      "Magnific AI",
      "Photoshop",
      "DaVinci Resolve"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v6"
        },
        {
          "name": "Magnific AI",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Botanical Glass Synthesis",
          "tool": "Midjourney v6",
          "description": "Amber perfume flacon surrounded by frosted glass petals and morning dew.",
          "minutes": 30
        },
        {
          "order": 2,
          "title": "8K Microtexture Upscale",
          "tool": "Magnific AI",
          "description": "Fractal floral veins and ultra-sharp crystal reflections.",
          "minutes": 45
        }
      ],
      "totalHours": 1.25,
      "promptText": "Luxury crystal perfume bottle emerging from blooming night jasmines, morning mist, macro 100mm lens",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Beauty aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Beauty",
      "Luxury",
      "Lifestyle",
      "Art"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-020",
    "creatorId": "creator-020",
    "uid": "user-creator-020",
    "title": "Mateo Morales Signature Art Showcase",
    "description": "Commercial creative synthesis showcasing Runway, Midjourney, Blender, Adobe workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Art",
    "toolsUsed": [
      "Runway",
      "Midjourney",
      "Blender",
      "Adobe"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Art",
      "Lifestyle",
      "Fashion",
      "Automotive",
      "Runway",
      "Midjourney",
      "Blender",
      "Adobe"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Runway",
          "kind": "model",
          "version": "Gen-3"
        },
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v6"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Tropical Color Palette Design",
          "tool": "Midjourney v6",
          "description": "Emerald canopy meets matte titanium solar buggy.",
          "minutes": 35
        },
        {
          "order": 2,
          "title": "Dynamic Camera Tracking",
          "tool": "Runway Gen-3",
          "description": "Flythrough jungle canopy with volumetric sunlight rays.",
          "minutes": 65
        }
      ],
      "totalHours": 1.7,
      "promptText": "Solar futuristic rover driving through Colombian cloud forest, hyperrealistic 4K",
      "promptVisibility": "private",
      "referenceImageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Art aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Art",
      "Lifestyle",
      "Fashion",
      "Automotive"
    ],
    "trustTier": "link-checked",
    "isDemo": true
  },
  {
    "id": "port-creator-021",
    "creatorId": "creator-021",
    "uid": "user-creator-021",
    "title": "Tariq Al-Mansoor (طارق المنصور) Signature Architecture Showcase",
    "description": "Commercial creative synthesis showcasing Blender, Midjourney, Runway, Magnific AI workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "AI Films",
    "genre": "Architecture",
    "toolsUsed": [
      "Blender",
      "Midjourney",
      "Runway",
      "Magnific AI"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Architecture",
      "Luxury",
      "Tech",
      "AI Films",
      "Blender",
      "Midjourney",
      "Runway",
      "Magnific AI"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Blender",
          "kind": "app",
          "version": "4.2 LTS"
        },
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v6"
        },
        {
          "name": "Magnific AI",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Biophilic Sandstone CAD Blockout",
          "tool": "Blender",
          "description": "Parametric curves for undulating desert villa.",
          "minutes": 90
        },
        {
          "order": 2,
          "title": "Photorealistic AI Reskin",
          "tool": "Midjourney v6",
          "description": "Sunset golden hour illumination with sand particulate haze.",
          "minutes": 40
        },
        {
          "order": 3,
          "title": "Ultra-Res Texture Mastering",
          "tool": "Magnific AI",
          "description": "Sharp travertine stone grains and travertine water ripples.",
          "minutes": 40
        }
      ],
      "totalHours": 2.8,
      "promptText": "Desert modernist villa carved into golden dunes, sunset ambient glow, architectural digest 8K",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Architecture aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Architecture",
      "Luxury",
      "Tech",
      "AI Films"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-022",
    "creatorId": "creator-022",
    "uid": "user-creator-022",
    "title": "Chioma Eze Signature Fashion Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, Runway, ElevenLabs, Photoshop workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Fashion",
    "toolsUsed": [
      "Midjourney",
      "Runway",
      "ElevenLabs",
      "Photoshop"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Fashion",
      "Art",
      "AI Films",
      "Lifestyle",
      "Midjourney",
      "Runway",
      "ElevenLabs",
      "Photoshop"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v6"
        },
        {
          "name": "ElevenLabs",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Ankara Textile Luster Synthesis",
          "tool": "Midjourney v6",
          "description": "Geometric gold threading woven with luminous optical fibers.",
          "minutes": 50
        },
        {
          "order": 2,
          "title": "Spoken Word Soundscape Scoring",
          "tool": "ElevenLabs",
          "description": "Yoruba folklore narration with ambient atmospheric bass.",
          "minutes": 35
        }
      ],
      "totalHours": 1.4,
      "promptText": "Lagos queen in futuristic ankara gown with fiber-optic embroidery, regal cinematic lighting",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Fashion aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Fashion",
      "Art",
      "AI Films",
      "Lifestyle"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-023",
    "creatorId": "creator-023",
    "uid": "user-creator-023",
    "title": "Lukas Weber Signature Tech Showcase",
    "description": "Commercial creative synthesis showcasing TouchDesigner, ComfyUI, Blender, Topaz Video AI workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "AI Films",
    "genre": "Tech",
    "toolsUsed": [
      "TouchDesigner",
      "ComfyUI",
      "Blender",
      "Topaz Video AI"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Tech",
      "Gaming",
      "AI Films",
      "Music",
      "TouchDesigner",
      "ComfyUI",
      "Blender",
      "Topaz Video AI"
    ],
    "workflow": {
      "tools": [
        {
          "name": "TouchDesigner",
          "kind": "app",
          "version": "2023"
        },
        {
          "name": "ComfyUI",
          "kind": "app",
          "version": "v0.2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Audio-Reactive Signal Processing",
          "tool": "TouchDesigner",
          "description": "138 BPM kick drum drives point cloud density.",
          "minutes": 80
        },
        {
          "order": 2,
          "title": "Neural Mesh Diffusion",
          "tool": "ComfyUI",
          "description": "Concrete and steel texture mapping in real-time.",
          "minutes": 90
        }
      ],
      "totalHours": 2.8,
      "promptText": "Brutalist concrete monolith pulsing to techno strobe, monochrome 35mm film grain",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Tech aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Tech",
      "Gaming",
      "AI Films",
      "Music"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-024",
    "creatorId": "creator-024",
    "uid": "user-creator-024",
    "title": "Camila Santos Signature Lifestyle Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, Runway, Kling AI, CapCut workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Lifestyle",
    "toolsUsed": [
      "Midjourney",
      "Runway",
      "Kling AI",
      "CapCut"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Lifestyle",
      "Food",
      "Fashion",
      "Beauty",
      "Midjourney",
      "Runway",
      "Kling AI",
      "CapCut"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v6"
        },
        {
          "name": "Kling AI",
          "kind": "model",
          "version": "v1.5"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Tropical Palette Explosion",
          "tool": "Midjourney v6",
          "description": "Papaya, passionfruit splash with neon water droplets.",
          "minutes": 30
        },
        {
          "order": 2,
          "title": "Liquid Dynamic Simulation",
          "tool": "Kling AI",
          "description": "Rotating can with 360-degree fruit splash burst.",
          "minutes": 45
        }
      ],
      "totalHours": 1.25,
      "promptText": "Sparkling tropical soda can splashing through ripe mango slices, sunny Ipanema beach 4K",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Lifestyle aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Lifestyle",
      "Food",
      "Fashion",
      "Beauty"
    ],
    "trustTier": "link-checked",
    "isDemo": true
  },
  {
    "id": "port-creator-025",
    "creatorId": "creator-025",
    "uid": "user-creator-025",
    "title": "Oliver Vance Signature Automotive Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, Runway, DaVinci Resolve, Topaz Video AI workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "AI Films",
    "genre": "Automotive",
    "toolsUsed": [
      "Midjourney",
      "Runway",
      "DaVinci Resolve",
      "Topaz Video AI"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Automotive",
      "Luxury",
      "AI Films",
      "Fashion",
      "Midjourney",
      "Runway",
      "DaVinci Resolve",
      "Topaz Video AI"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v6"
        },
        {
          "name": "Runway",
          "kind": "model",
          "version": "Gen-3"
        },
        {
          "name": "DaVinci Resolve",
          "kind": "app",
          "version": "19"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Scottish Highlands Car Rig",
          "tool": "Midjourney v6",
          "description": "Vintage dark green GT coupe traversing mist-drenched asphalt curves.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Tracking Camera Motion",
          "tool": "Runway Gen-3",
          "description": "Low-angle wheel chase with realistic road reflection spray.",
          "minutes": 60
        },
        {
          "order": 3,
          "title": "Kodak 5219 Film Emulation",
          "tool": "DaVinci Resolve",
          "description": "ACEScct print-film lut with authentic halation.",
          "minutes": 45
        }
      ],
      "totalHours": 2.4,
      "promptText": "Classic British luxury grand tourer driving through Isle of Skye rain, anamorphic filmic 8K",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Automotive aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Automotive",
      "Luxury",
      "AI Films",
      "Fashion"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-026",
    "creatorId": "creator-026",
    "uid": "user-creator-026",
    "title": "Zuri Mwangi Signature Travel Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, Runway, ElevenLabs, Adobe workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "YouTube",
    "genre": "Travel",
    "toolsUsed": [
      "Midjourney",
      "Runway",
      "ElevenLabs",
      "Adobe"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Travel",
      "Lifestyle",
      "AI Films",
      "Art",
      "Midjourney",
      "Runway",
      "ElevenLabs",
      "Adobe"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v6"
        },
        {
          "name": "Runway",
          "kind": "model",
          "version": "Gen-3"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Savanna Sunset Golden Hour",
          "tool": "Midjourney v6",
          "description": "Acacia tree silhouetted with dust kicked up by lion pride.",
          "minutes": 35
        },
        {
          "order": 2,
          "title": "Prowling Gait Synthesis",
          "tool": "Runway Gen-3",
          "description": "Muscular predator shoulder movement with atmospheric heat shimmer.",
          "minutes": 55
        }
      ],
      "totalHours": 1.5,
      "promptText": "Masai Mara golden hour wildlife documentary, slow motion 4K telephoto 600mm",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Travel aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Travel",
      "Lifestyle",
      "AI Films",
      "Art"
    ],
    "trustTier": "link-checked",
    "isDemo": true
  },
  {
    "id": "port-creator-027",
    "creatorId": "creator-027",
    "uid": "user-creator-027",
    "title": "Astrid Lindqvist Signature Beauty Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, Magnific AI, Blender workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Beauty",
    "toolsUsed": [
      "Midjourney",
      "Magnific AI",
      "Blender"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Beauty",
      "Art",
      "Tech",
      "Midjourney",
      "Magnific AI",
      "Blender"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v1"
        },
        {
          "name": "Magnific AI",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Beauty Synthesis",
          "tool": "Midjourney",
          "description": "High coherence styling tuned for Stockholm, Sweden visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Magnific AI",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Beauty showcase in Stockholm, Sweden, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Beauty aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Beauty",
      "Art",
      "Tech"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-028",
    "creatorId": "creator-028",
    "uid": "user-creator-028",
    "title": "Ji-woo Kim Signature Music Showcase",
    "description": "Commercial creative synthesis showcasing ComfyUI, Runway, TouchDesigner workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Music",
    "toolsUsed": [
      "ComfyUI",
      "Runway",
      "TouchDesigner"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Music",
      "Gaming",
      "AI Films",
      "ComfyUI",
      "Runway",
      "TouchDesigner"
    ],
    "workflow": {
      "tools": [
        {
          "name": "ComfyUI",
          "kind": "app",
          "version": "v1"
        },
        {
          "name": "Runway",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Music Synthesis",
          "tool": "ComfyUI",
          "description": "High coherence styling tuned for Seoul, South Korea visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Runway",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Music showcase in Seoul, South Korea, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Music aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Music",
      "Gaming",
      "AI Films"
    ],
    "trustTier": "self-reported",
    "isDemo": true
  },
  {
    "id": "port-creator-029",
    "creatorId": "creator-029",
    "uid": "user-creator-029",
    "title": "Liam O'Connor Signature Fashion Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, Runway, DaVinci Resolve workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Fashion",
    "toolsUsed": [
      "Midjourney",
      "Runway",
      "DaVinci Resolve"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Fashion",
      "Travel",
      "Automotive",
      "Midjourney",
      "Runway",
      "DaVinci Resolve"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v1"
        },
        {
          "name": "Runway",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Fashion Synthesis",
          "tool": "Midjourney",
          "description": "High coherence styling tuned for Toronto, Canada visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Runway",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Fashion showcase in Toronto, Canada, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Fashion aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Fashion",
      "Travel",
      "Automotive"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-030",
    "creatorId": "creator-030",
    "uid": "user-creator-030",
    "title": "Maya Henderson Signature Lifestyle Showcase",
    "description": "Commercial creative synthesis showcasing Runway, Midjourney, Adobe workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Lifestyle",
    "toolsUsed": [
      "Runway",
      "Midjourney",
      "Adobe"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Lifestyle",
      "Food",
      "Travel",
      "Runway",
      "Midjourney",
      "Adobe"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Runway",
          "kind": "model",
          "version": "v1"
        },
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Lifestyle Synthesis",
          "tool": "Runway",
          "description": "High coherence styling tuned for Melbourne, Australia visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Midjourney",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Lifestyle showcase in Melbourne, Australia, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Lifestyle aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Lifestyle",
      "Food",
      "Travel"
    ],
    "trustTier": "link-checked",
    "isDemo": true
  },
  {
    "id": "port-creator-031",
    "creatorId": "creator-031",
    "uid": "user-creator-031",
    "title": "Zhen Wei Tan Signature Architecture Showcase",
    "description": "Commercial creative synthesis showcasing Blender, ComfyUI, Magnific AI workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Architecture",
    "toolsUsed": [
      "Blender",
      "ComfyUI",
      "Magnific AI"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Architecture",
      "Tech",
      "AI Films",
      "Blender",
      "ComfyUI",
      "Magnific AI"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Blender",
          "kind": "app",
          "version": "v1"
        },
        {
          "name": "ComfyUI",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Architecture Synthesis",
          "tool": "Blender",
          "description": "High coherence styling tuned for Singapore visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "ComfyUI",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Architecture showcase in Singapore, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Architecture aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Architecture",
      "Tech",
      "AI Films"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-032",
    "creatorId": "creator-032",
    "uid": "user-creator-032",
    "title": "Lucia Fernandez Signature Art Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, Stable Diffusion, Photoshop workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Art",
    "toolsUsed": [
      "Midjourney",
      "Stable Diffusion",
      "Photoshop"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Art",
      "Fashion",
      "Lifestyle",
      "Midjourney",
      "Stable Diffusion",
      "Photoshop"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v1"
        },
        {
          "name": "Stable Diffusion",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Art Synthesis",
          "tool": "Midjourney",
          "description": "High coherence styling tuned for Madrid, Spain visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Stable Diffusion",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Art showcase in Madrid, Spain, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Art aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Art",
      "Fashion",
      "Lifestyle"
    ],
    "trustTier": "self-reported",
    "isDemo": true
  },
  {
    "id": "port-creator-033",
    "creatorId": "creator-033",
    "uid": "user-creator-033",
    "title": "Bram van Dijk Signature Tech Showcase",
    "description": "Commercial creative synthesis showcasing Runway, Midjourney, Adobe workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Tech",
    "toolsUsed": [
      "Runway",
      "Midjourney",
      "Adobe"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Tech",
      "Lifestyle",
      "Automotive",
      "Runway",
      "Midjourney",
      "Adobe"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Runway",
          "kind": "model",
          "version": "v1"
        },
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Tech Synthesis",
          "tool": "Runway",
          "description": "High coherence styling tuned for Amsterdam, Netherlands visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Midjourney",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Tech showcase in Amsterdam, Netherlands, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Tech aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Tech",
      "Lifestyle",
      "Automotive"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-034",
    "creatorId": "creator-034",
    "uid": "user-creator-034",
    "title": "Yuna Mori Signature Lifestyle Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, Photoshop, Topaz Video AI workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Lifestyle",
    "toolsUsed": [
      "Midjourney",
      "Photoshop",
      "Topaz Video AI"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Lifestyle",
      "Art",
      "Beauty",
      "Midjourney",
      "Photoshop",
      "Topaz Video AI"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v1"
        },
        {
          "name": "Photoshop",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Lifestyle Synthesis",
          "tool": "Midjourney",
          "description": "High coherence styling tuned for Kyoto, Japan visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Photoshop",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Lifestyle showcase in Kyoto, Japan, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Lifestyle aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Lifestyle",
      "Art",
      "Beauty"
    ],
    "trustTier": "self-reported",
    "isDemo": true
  },
  {
    "id": "port-creator-035",
    "creatorId": "creator-035",
    "uid": "user-creator-035",
    "title": "Diego Ramirez Signature Art Showcase",
    "description": "Commercial creative synthesis showcasing ComfyUI, Runway, Blender workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Art",
    "toolsUsed": [
      "ComfyUI",
      "Runway",
      "Blender"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Art",
      "AI Films",
      "Music",
      "ComfyUI",
      "Runway",
      "Blender"
    ],
    "workflow": {
      "tools": [
        {
          "name": "ComfyUI",
          "kind": "app",
          "version": "v1"
        },
        {
          "name": "Runway",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Art Synthesis",
          "tool": "ComfyUI",
          "description": "High coherence styling tuned for Mexico City, Mexico visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Runway",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Art showcase in Mexico City, Mexico, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Art aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Art",
      "AI Films",
      "Music"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-036",
    "creatorId": "creator-036",
    "uid": "user-creator-036",
    "title": "Ethan Cole Signature Tech Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, Runway, DaVinci Resolve workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Tech",
    "toolsUsed": [
      "Midjourney",
      "Runway",
      "DaVinci Resolve"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Tech",
      "Product Ads",
      "AI Films",
      "Midjourney",
      "Runway",
      "DaVinci Resolve"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v1"
        },
        {
          "name": "Runway",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Tech Synthesis",
          "tool": "Midjourney",
          "description": "High coherence styling tuned for San Francisco, CA visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Runway",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Tech showcase in San Francisco, CA, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Tech aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Tech",
      "Product Ads",
      "AI Films"
    ],
    "trustTier": "link-checked",
    "isDemo": true
  },
  {
    "id": "port-creator-037",
    "creatorId": "creator-037",
    "uid": "user-creator-037",
    "title": "Ananya Roy Signature AI Films Showcase",
    "description": "Commercial creative synthesis showcasing Runway, Midjourney, ElevenLabs workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "AI Films",
    "toolsUsed": [
      "Runway",
      "Midjourney",
      "ElevenLabs"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "AI Films",
      "Music",
      "Fashion",
      "Runway",
      "Midjourney",
      "ElevenLabs"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Runway",
          "kind": "model",
          "version": "v1"
        },
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial AI Films Synthesis",
          "tool": "Runway",
          "description": "High coherence styling tuned for Mumbai, India visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Midjourney",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic AI Films showcase in Mumbai, India, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic AI Films aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "AI Films",
      "Music",
      "Fashion"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-038",
    "creatorId": "creator-038",
    "uid": "user-creator-038",
    "title": "Nour El-Din Signature Travel Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, Blender, Photoshop workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Travel",
    "toolsUsed": [
      "Midjourney",
      "Blender",
      "Photoshop"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Travel",
      "AI Films",
      "Art",
      "Midjourney",
      "Blender",
      "Photoshop"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v1"
        },
        {
          "name": "Blender",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Travel Synthesis",
          "tool": "Midjourney",
          "description": "High coherence styling tuned for Cairo, Egypt visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Blender",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Travel showcase in Cairo, Egypt, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Travel aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Travel",
      "AI Films",
      "Art"
    ],
    "trustTier": "self-reported",
    "isDemo": true
  },
  {
    "id": "port-creator-039",
    "creatorId": "creator-039",
    "uid": "user-creator-039",
    "title": "Maximilian Bauer Signature Automotive Showcase",
    "description": "Commercial creative synthesis showcasing Blender, Midjourney, Magnific AI workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Automotive",
    "toolsUsed": [
      "Blender",
      "Midjourney",
      "Magnific AI"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Automotive",
      "Tech",
      "Luxury",
      "Blender",
      "Midjourney",
      "Magnific AI"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Blender",
          "kind": "app",
          "version": "v1"
        },
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Automotive Synthesis",
          "tool": "Blender",
          "description": "High coherence styling tuned for Munich, Germany visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Midjourney",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Automotive showcase in Munich, Germany, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Automotive aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Automotive",
      "Tech",
      "Luxury"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-040",
    "creatorId": "creator-040",
    "uid": "user-creator-040",
    "title": "Sipho Dlamini Signature Travel Showcase",
    "description": "Commercial creative synthesis showcasing Runway, Midjourney, DaVinci Resolve workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Travel",
    "toolsUsed": [
      "Runway",
      "Midjourney",
      "DaVinci Resolve"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Travel",
      "Lifestyle",
      "AI Films",
      "Runway",
      "Midjourney",
      "DaVinci Resolve"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Runway",
          "kind": "model",
          "version": "v1"
        },
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Travel Synthesis",
          "tool": "Runway",
          "description": "High coherence styling tuned for Cape Town, South Africa visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Midjourney",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Travel showcase in Cape Town, South Africa, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Travel aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Travel",
      "Lifestyle",
      "AI Films"
    ],
    "trustTier": "self-reported",
    "isDemo": true
  },
  {
    "id": "port-creator-041",
    "creatorId": "creator-041",
    "uid": "user-creator-041",
    "title": "Alexandre Tremblay Signature Gaming Showcase",
    "description": "Commercial creative synthesis showcasing Unreal Engine, ComfyUI, Midjourney workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Gaming",
    "toolsUsed": [
      "Unreal Engine",
      "ComfyUI",
      "Midjourney"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Gaming",
      "Tech",
      "AI Films",
      "Unreal Engine",
      "ComfyUI",
      "Midjourney"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Unreal Engine",
          "kind": "app",
          "version": "v1"
        },
        {
          "name": "ComfyUI",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Gaming Synthesis",
          "tool": "Unreal Engine",
          "description": "High coherence styling tuned for Montreal, Canada visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "ComfyUI",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Gaming showcase in Montreal, Canada, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Gaming aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Gaming",
      "Tech",
      "AI Films"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-042",
    "creatorId": "creator-042",
    "uid": "user-creator-042",
    "title": "Chiara Rossi Signature Fashion Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, Magnific AI, Runway workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Fashion",
    "toolsUsed": [
      "Midjourney",
      "Magnific AI",
      "Runway"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Fashion",
      "Luxury",
      "Beauty",
      "Midjourney",
      "Magnific AI",
      "Runway"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v1"
        },
        {
          "name": "Magnific AI",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Fashion Synthesis",
          "tool": "Midjourney",
          "description": "High coherence styling tuned for Milan, Italy visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Magnific AI",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Fashion showcase in Milan, Italy, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Fashion aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Fashion",
      "Luxury",
      "Beauty"
    ],
    "trustTier": "link-checked",
    "isDemo": true
  },
  {
    "id": "port-creator-043",
    "creatorId": "creator-043",
    "uid": "user-creator-043",
    "title": "Somchai Prasert Signature Food Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, Runway, CapCut workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Food",
    "toolsUsed": [
      "Midjourney",
      "Runway",
      "CapCut"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Food",
      "Travel",
      "Lifestyle",
      "Midjourney",
      "Runway",
      "CapCut"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v1"
        },
        {
          "name": "Runway",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Food Synthesis",
          "tool": "Midjourney",
          "description": "High coherence styling tuned for Bangkok, Thailand visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Runway",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Food showcase in Bangkok, Thailand, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Food aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Food",
      "Travel",
      "Lifestyle"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-044",
    "creatorId": "creator-044",
    "uid": "user-creator-044",
    "title": "Sigrid Haugen Signature Travel Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, Runway, Topaz Video AI workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Travel",
    "toolsUsed": [
      "Midjourney",
      "Runway",
      "Topaz Video AI"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Travel",
      "AI Films",
      "Automotive",
      "Midjourney",
      "Runway",
      "Topaz Video AI"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v1"
        },
        {
          "name": "Runway",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Travel Synthesis",
          "tool": "Midjourney",
          "description": "High coherence styling tuned for Oslo, Norway visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Runway",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Travel showcase in Oslo, Norway, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Travel aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Travel",
      "AI Films",
      "Automotive"
    ],
    "trustTier": "self-reported",
    "isDemo": true
  },
  {
    "id": "port-creator-045",
    "creatorId": "creator-045",
    "uid": "user-creator-045",
    "title": "Facundo Gomez Signature AI Films Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, Runway, DaVinci Resolve workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "AI Films",
    "toolsUsed": [
      "Midjourney",
      "Runway",
      "DaVinci Resolve"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "AI Films",
      "Music",
      "Art",
      "Midjourney",
      "Runway",
      "DaVinci Resolve"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v1"
        },
        {
          "name": "Runway",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial AI Films Synthesis",
          "tool": "Midjourney",
          "description": "High coherence styling tuned for Buenos Aires, Argentina visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "Runway",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic AI Films showcase in Buenos Aires, Argentina, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic AI Films aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "AI Films",
      "Music",
      "Art"
    ],
    "trustTier": "proof-backed",
    "isDemo": true
  },
  {
    "id": "port-creator-046",
    "creatorId": "creator-046",
    "uid": "user-creator-046",
    "title": "Ciaran Murphy Signature Art Showcase",
    "description": "Commercial creative synthesis showcasing Midjourney, ComfyUI, ElevenLabs workflow.",
    "mediaUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "thumbnailUrl": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    "videoUrl": "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "mediaType": "video",
    "contentType": "Reels",
    "genre": "Art",
    "toolsUsed": [
      "Midjourney",
      "ComfyUI",
      "ElevenLabs"
    ],
    "views": "180K",
    "likes": "14.2K",
    "aiTags": [
      "Art",
      "AI Films",
      "Gaming",
      "Midjourney",
      "ComfyUI",
      "ElevenLabs"
    ],
    "workflow": {
      "tools": [
        {
          "name": "Midjourney",
          "kind": "model",
          "version": "v1"
        },
        {
          "name": "ComfyUI",
          "kind": "model",
          "version": "v2"
        }
      ],
      "steps": [
        {
          "order": 1,
          "title": "Initial Art Synthesis",
          "tool": "Midjourney",
          "description": "High coherence styling tuned for Dublin, Ireland visual culture.",
          "minutes": 40
        },
        {
          "order": 2,
          "title": "Detail & Motion Polish",
          "tool": "ComfyUI",
          "description": "Color grading and dynamic lighting adjustments.",
          "minutes": 50
        }
      ],
      "totalHours": 1.5,
      "promptText": "Cinematic Art showcase in Dublin, Ireland, atmospheric lighting, 8K ultra-detailed",
      "promptVisibility": "public",
      "referenceImageUrl": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    },
    "styleDescription": "Cinematic Art aesthetic with dynamic volumetric illumination.",
    "styleTags": [
      "Art",
      "AI Films",
      "Gaming"
    ],
    "trustTier": "self-reported",
    "isDemo": true
  }
];

export const demoBriefs: Brief[] = [
  {
    id: "demo-brief-01",
    brandUid: "user-brand-002",
    brandName: "Apex Footwear Lab",
    brandLogo: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=200&q=80",
    title: "Cinematic Sneaker Launch",
    description: "Global reveal film for the 'Apex Quantum-X' futuristic streetwear sneaker. High-octane camera rotations, floating sole cushioning explosions, neon asphalt reflections, and beat-driven sound design.",
    contentTypes: ["Reels", "Product Ads", "AI Films"],
    platform: "Instagram & TikTok (Omnichannel)",
    style: "High-Contrast Cyberpunk & Kinetic Streetwear",
    aspectRatio: "9:16 (Vertical) + 16:9 Cut",
    genres: ["Sneakers", "Fashion", "AI Video"],
    skills: ["Prompt Engineering", "Kinetic Motion Tracking", "Color Grading", "Sound Design"],
    budget: "$6,000–$12,000",
    licensing: "Commercial Worldwide Digital Rights (12 Months)",
    deliverablesCount: 3,
    deadline: "21 Days",
    targetAudience: "Gen-Z sneakerheads, streetwear collectors, design and tech enthusiasts",
    preferredTools: ["Runway", "Midjourney", "After Effects", "DaVinci Resolve"],
    visualAesthetic: "Deep ink shadows, neon violet and chrome accents, hyper-detailed knit textures",
    applicantCount: 24,
    shortlistedCount: 5,
    status: "open",
    isDemo: true,
    createdAt: "2026-10-09"
  },
  {
    id: "demo-brief-02",
    brandUid: "user-brand-001",
    brandName: "Solace Skincare & Wellness",
    brandLogo: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=200&q=80",
    title: "AI Beauty Campaign",
    description: "Botanical Glow Serum launch. Soft watercolor paper textures, morning sunlight refracting through glass droppers, floating flower petals, and tranquil Japanese self-care rituals.",
    contentTypes: ["Reels", "Shorts", "Product Ads"],
    platform: "Instagram & Pinterest",
    style: "Delicate Japanese Watercolor & Soft Studio Lighting",
    aspectRatio: "9:16 (Vertical) & 4:5 (Feed)",
    genres: ["Beauty", "Lifestyle", "Skincare", "Art"],
    skills: ["LoRA Styling", "Botanical Textures", "Color Harmony", "Art Direction"],
    budget: "$3,500–$7,000",
    licensing: "Full Digital Commercial Rights (12 Months)",
    deliverablesCount: 3,
    deadline: "25 Days",
    targetAudience: "Mindful consumers (ages 20–38) interested in clean ingredients and holistic wellness",
    preferredTools: ["Midjourney", "Stable Diffusion", "Photoshop", "Runway"],
    visualAesthetic: "Warm cream paper tooth, peach and lilac gradients, gentle water ripples",
    applicantCount: 19,
    shortlistedCount: 4,
    status: "open",
    isDemo: true,
    createdAt: "2026-10-09"
  },
  {
    id: "demo-brief-03",
    brandUid: "user-brand-003",
    brandName: "Aetheria Interactive",
    brandLogo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=200&q=80",
    title: "Gaming Character Campaign",
    description: "Character teaser series introducing 'Kaelen', the cybernetic ronin in our upcoming title. High-fidelity 3D combat animations, sword trail VFX, rain-slicked neon alleys, and dynamic mecha armor shifts.",
    contentTypes: ["YouTube", "AI Films", "Reels"],
    platform: "YouTube & Twitch",
    style: "Dark Sci-Fi Anime & Photorealistic 3D Hybrid",
    aspectRatio: "16:9 (Cinematic Trailer)",
    genres: ["Gaming", "Anime", "VFX", "Tech"],
    skills: ["3D Character Rigging", "Blender Physics", "VFX Compositing", "Audio Mixing"],
    budget: "$8,000–$15,000",
    licensing: "Perpetual Commercial Gaming License",
    deliverablesCount: 2,
    deadline: "35 Days",
    targetAudience: "Hardcore gamers, anime aficionados, cyberpunk enthusiasts",
    preferredTools: ["Blender", "Runway", "Unreal Engine", "Cascadeur"],
    visualAesthetic: "Volumetric fog, cybernetic blue and crimson lightning, cinematic 2.39:1 scope",
    applicantCount: 16,
    shortlistedCount: 3,
    status: "open",
    isDemo: true,
    createdAt: "2026-10-08"
  },
  {
    id: "demo-brief-04",
    brandUid: "user-brand-004",
    brandName: "Veloce Automobili",
    brandLogo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=200&q=80",
    title: "Luxury Automotive Ad",
    description: "Cinematic commercial for the Veloce Stradale-EV electric hypercar. Sweeping coastal cliff drives at twilight, carbon-fiber aerodynamics, high-speed tracking shots, and sleek luxury lighting.",
    contentTypes: ["AI Films", "Product Ads", "Reels"],
    platform: "YouTube & High-End Digital Displays",
    style: "Cinematic Hyperrealism & European Studio Elegance",
    aspectRatio: "16:9 & 9:16 Social Cutdown",
    genres: ["Automotive", "Luxury", "Tech", "3D Motion"],
    skills: ["Automotive CGI", "ComfyUI Pipeline", "Studio Lighting", "DaVinci Color"],
    budget: "$10,000–$20,000",
    licensing: "Full Worldwide Commercial Buyout",
    deliverablesCount: 2,
    deadline: "40 Days",
    targetAudience: "Luxury connoisseurs, automotive collectors, high-net-worth tech leaders",
    preferredTools: ["Unreal Engine", "ComfyUI", "Runway", "DaVinci Resolve"],
    visualAesthetic: "Wet asphalt specular highlights, twilight horizon gradients, ultra-sharp carbon weave",
    applicantCount: 11,
    shortlistedCount: 2,
    status: "open",
    isDemo: true,
    createdAt: "2026-10-07"
  },
  {
    id: "demo-brief-05",
    brandUid: "user-brand-005",
    brandName: "Horizon Expeditions",
    brandLogo: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=200&q=80",
    title: "Travel Social Campaign",
    description: "Sensory visual travel series across the Japanese Alps and remote Nordic fjords. Ethereal morning mist, rugged trail expeditions, and poetic reflections on wanderlust and sustainable exploration.",
    contentTypes: ["Reels", "YouTube", "Shorts"],
    platform: "Instagram & TikTok",
    style: "Atmospheric Documentary & 35mm Analog Film Grain",
    aspectRatio: "9:16 (Vertical)",
    genres: ["Travel", "Culture", "Lifestyle", "Outdoors"],
    skills: ["Documentary Pacing", "Voiceover Storytelling", "Topaz Video Upscaling"],
    budget: "$2,500–$5,000",
    licensing: "Commercial Social & Web Rights (12 Months)",
    deliverablesCount: 4,
    deadline: "20 Days",
    targetAudience: "Adventure travelers, photographers, remote workers, eco-conscious explorers",
    preferredTools: ["Premiere", "Midjourney", "Topaz", "Runway"],
    visualAesthetic: "Pine forest greens, crisp mountain snow, warm campfire glow, subtle 35mm grain",
    applicantCount: 22,
    shortlistedCount: 5,
    status: "open",
    isDemo: true,
    createdAt: "2026-10-06"
  }
];

