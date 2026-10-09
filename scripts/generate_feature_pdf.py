"""Script to generate a crisp 4-page Creatora_AI_Feature_Guide.pdf using ReportLab."""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#6C5CE7"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(45, 755, "CREATORA AI")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#718096"))
            self.drawString(110, 755, "| Complete Feature & Demonstration Handbook")
            self.drawRightString(612 - 45, 755, "https://creatora-ai.vercel.app")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.5)
            self.line(45, 747, 612 - 45, 747)

        # Footer (all pages)
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.5)
        self.line(45, 38, 612 - 45, 38)
        
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#718096"))
        self.drawString(45, 26, "Creatora AI | Hackathon Project Presentation Guide | Zero-Render Edge Architecture")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(612 - 45, 26, page_str)
        self.restoreState()


def create_feature_guide_pdf(filename: str):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=45,
        rightMargin=45,
        topMargin=46,
        bottomMargin=46
    )

    styles = getSampleStyleSheet()

    primary_color = colors.HexColor("#161026")
    accent_purple = colors.HexColor("#6C5CE7")
    dark_gray = colors.HexColor("#2D3748")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=23,
        textColor=primary_color,
        spaceAfter=2
    )

    subtitle_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=13,
        textColor=accent_purple,
        spaceAfter=8
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11.5,
        leading=14.5,
        textColor=accent_purple,
        spaceBefore=7,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=dark_gray,
        spaceAfter=4
    )

    body_bold = ParagraphStyle(
        'Body_Bold',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    story = []

    # =========================================================================
    # PAGE 1: OVERVIEW, DEMO LOGINS & DISCOVERY
    # =========================================================================
    story.append(Paragraph("CREATORA AI — FEATURE & DEMO HANDBOOK", title_style))
    story.append(Paragraph("Connecting Visionary AI Creators & Global Brands with Gemini Matchmaking", subtitle_style))
    
    meta_data = [
        [
            Paragraph("<b>Live URL:</b> <font color='#6C5CE7'><u>https://creatora-ai.vercel.app</u></font>", body_style),
            Paragraph("<b>Stack:</b> Next.js 14, Firebase Firestore, Gemini AI, Vercel Edge", body_style)
        ],
        [
            Paragraph("<b>Aesthetic:</b> Hand-drawn anime sketchbook & cream paper (#FAF7F2)", body_style),
            Paragraph("<b>Demo Mode:</b> 1-Click instant test accounts (No setup required)", body_style)
        ]
    ]
    t_meta = Table(meta_data, colWidths=[270, 252])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8F6F0")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#E2E8F0")),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 4))

    story.append(Paragraph("1. Platform Overview (Project Ka Maqsad)", h1_style))
    story.append(Paragraph(
        "<b>Creatora AI</b> ek intelligent fullstack marketplace hai jo high-end <b>AI Creators</b> (filmmakers, 3D animators, virtual fashion designers, automotive CGI directors) aur <b>Brands</b> ko jodata hai. "
        "Clunky corporate design ke bajaye isme <b>Japanese Anime Sketchbook aesthetic</b> (cream paper, ink borders, screentone badges, soft watercolor accents) diya gaya hai jo creative creators aur modern youth brands ko attract karta hai.",
        body_style
    ))

    story.append(Paragraph("2. One-Click Quick Demo Access (Instant Login)", h1_style))
    story.append(Paragraph(
        "Hackathon judges aur evaluators ko registration form bharne ki bilkul zaroorat nahi hai. Login page (<code>/login</code>) par instant 1-click test buttons hain:",
        body_style
    ))
    
    login_info = [
        [
            Paragraph("<b>Role</b>", body_bold),
            Paragraph("<b>One-Click Button</b>", body_bold),
            Paragraph("<b>Access & Features To Test</b>", body_bold)
        ],
        [
            Paragraph("<b>Creator Account</b>", body_style),
            Paragraph("<b>Demo Creator: Aarav Sharma</b><br/>(AI Commercial Director)", body_style),
            Paragraph("Upload portfolio media, view HD video reels, set commercial rates ($3,200), manage incoming brand inquiry proposals.", body_style)
        ],
        [
            Paragraph("<b>Brand Account</b>", body_style),
            Paragraph("<b>Demo Brand: Solace / Apex</b><br/>(Campaign Management Team)", body_style),
            Paragraph("Create structured briefs, view matched creators, evaluate transparent score breakdown, send direct hire proposals with budget.", body_style)
        ]
    ]
    t_login = Table(login_info, colWidths=[90, 172, 260])
    t_login.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#EDE9FE")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('PADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_login)
    story.append(Spacer(1, 4))

    story.append(Paragraph("3. Creator Discovery & Multi-Facet Filters", h1_style))
    story.append(Paragraph(
        "<b>URL:</b> <code>/discover</code> ya <code>/creators</code> — Yahan 16 genuinely distinct verified creators listed hain:",
        body_style
    ))
    story.append(Paragraph(
        "• <b>Genre Filter:</b> Fashion, Sneakers, Automotive, Gaming, Beauty, Tech, Travel, Lifestyle.<br/>"
        "• <b>Content Format:</b> Reels (9:16), Product Commercials, AI Films, YouTube Shorts, Long-form.<br/>"
        "• <b>AI Tools Filter:</b> Runway Gen-3, Midjourney v6.1, ComfyUI, Unreal Engine 5, Blender, Kling AI, Topaz.<br/>"
        "• <b>Commercial Availability:</b> 'Immediate' (available now), 'Selective', ya 'Booked'.<br/>"
        "• <b>Sort By:</b> Relevance, Total Followers (high to low), aur Engagement Rate.<br/>"
        "• <b>Self-Reported Tag:</b> Transparency ke liye sabhi social metrics 'Self-reported' badge ke sath tagged hain (No fake scraping, strictly ethical).",
        body_style
    ))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: MATCHING ENGINE, 5 DEMO BRIEFS & BRIEF GENERATOR
    # =========================================================================
    story.append(Paragraph("4. Transparent Weighted Match Engine (0–100%)", h1_style))
    story.append(Paragraph(
        "Creatora AI ka sabse powerful core feature iska <b>Transparent Multi-Vector Match Engine</b> hai. Kisi bhi fake ya random percentage ke bajaye exact mathematical breakdown dikhaya jata hai:",
        body_style
    ))

    weights_data = [
        [Paragraph("<b>Vector Dimension</b>", body_bold), Paragraph("<b>Weight</b>", body_bold), Paragraph("<b>Evaluation Criteria & Logic</b>", body_bold)],
        [Paragraph("<b>Genre & Aesthetic Fit</b>", body_style), Paragraph("<b>30%</b>", body_style), Paragraph("Campaign niche (e.g. Sneakers, Beauty, Tech) creator ke primary genre aur visual style se overlap (28-30 pts).", body_style)],
        [Paragraph("<b>Tools & Tech Skills</b>", body_style), Paragraph("<b>25%</b>", body_style), Paragraph("Brief me required AI tools (Runway, Midjourney, ComfyUI, Blender) creator ke toolkit me verified hone par (23-25 pts).", body_style)],
        [Paragraph("<b>Format & Platform Fit</b>", body_style), Paragraph("<b>20%</b>", body_style), Paragraph("Deliverable aspect ratio (9:16 Reels vs 16:9 Cinema) aur platform compatibility (Instagram, TikTok, YouTube).", body_style)],
        [Paragraph("<b>Audience & Engagement</b>", body_style), Paragraph("<b>15%</b>", body_style), Paragraph("Verified audience trust and high engagement rate (>7.5% = 15 pts, 6-7.5% = 13 pts, 4.5-6% = 10 pts).", body_style)],
        [Paragraph("<b>Budget & Availability</b>", body_style), Paragraph("<b>10%</b>", body_style), Paragraph("Brand budget offer vs creator rate aur Commercial Availability ('Immediate' = 9-10 pts).", body_style)],
    ]
    t_weights = Table(weights_data, colWidths=[120, 52, 350])
    t_weights.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#EDE9FE")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('PADDING', (0,0), (-1,-1), 3.8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_weights)
    story.append(Spacer(1, 3))
    story.append(Paragraph(
        "<b>Gemini AI Match Rationale:</b> Har match ke sath Gemini ek personalized explanation deta hai ki <i>'Why this creator matches'</i>, suggested deliverables list, aur turnaround estimate.",
        body_style
    ))

    story.append(Paragraph("5. 5 One-Click Demo Briefs (Real Match Pipeline)", h1_style))
    story.append(Paragraph(
        "<b>URL:</b> <code>/briefs</code> — Yahan 5 pre-configured brand briefs hain. Kisi par bhi click karne se real-time match engine execute hota hai aur ranked creators show hote hain:",
        body_style
    ))

    briefs_list = [
        [Paragraph("<b>#</b>", body_bold), Paragraph("<b>Campaign Brief</b>", body_bold), Paragraph("<b>Brand & Industry</b>", body_bold), Paragraph("<b>Aesthetic, Budget & Top Match</b>", body_bold)],
        [Paragraph("1", body_style), Paragraph("<b>Cinematic Sneaker Launch</b>", body_style), Paragraph("Apex Footwear Lab<br/>(Sneakers & Streetwear)", body_style), Paragraph("Cyberpunk neon reflections, liquid sole threads.<br/>Budget: $6,000–$12,000 | <b>Top Match: Aarav Sharma (92%)</b>", body_style)],
        [Paragraph("2", body_style), Paragraph("<b>AI Beauty Campaign</b>", body_style), Paragraph("Solace Skincare<br/>(Clean Beauty)", body_style), Paragraph("Watercolor dew on sakura petals, gentle studio lighting.<br/>Budget: $3,500–$7,000 | <b>Top Match: Mizuki Tanaka (94%)</b>", body_style)],
        [Paragraph("3", body_style), Paragraph("<b>Gaming Character Campaign</b>", body_style), Paragraph("Aetheria Interactive<br/>(Indie Gaming / Sci-Fi)", body_style), Paragraph("Cybernetic ronin mecha combat animation.<br/>Budget: $8,000–$15,000 | <b>Top Match: Liam Thorne (91%)</b>", body_style)],
        [Paragraph("4", body_style), Paragraph("<b>Luxury Automotive Ad</b>", body_style), Paragraph("Veloce Automobili<br/>(Electric Hypercar)", body_style), Paragraph("Twilight wet asphalt reflection tracking shots.<br/>Budget: $10,000–$20,000 | <b>Top Match: Elena Rostova (95%)</b>", body_style)],
        [Paragraph("5", body_style), Paragraph("<b>Travel Social Campaign</b>", body_style), Paragraph("Horizon Expeditions<br/>(Alpine / Adventure)", body_style), Paragraph("Nordic fjords & 35mm film grain documentary memories.<br/>Budget: $2,500–$5,000 | <b>Top Match: Sofia Al-Mansoor (89%)</b>", body_style)],
    ]
    t_briefs = Table(briefs_list, colWidths=[18, 145, 125, 234])
    t_briefs.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#FEF3C7")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('PADDING', (0,0), (-1,-1), 3.5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_briefs)
    story.append(Spacer(1, 3))

    story.append(Paragraph("6. Multimodal & One-Line Brief Generator", h1_style))
    story.append(Paragraph(
        "<b>URL:</b> <code>/briefs/create</code> — Brand bas ek line ka idea likhta hai (e.g. <i>'Futuristic sneaker with liquid nitrogen reveal'</i>). "
        "Gemini AI turant ise ek production-ready campaign brief bana deta hai: Visual Style, Primary Platform, Aspect Ratio (9:16 vs 16:9), Required AI Tools, Commercial Budget range, Licensing Rights, aur Timeline. Brand ise 1-click me <b>Save as Draft</b> ya <b>Publish</b> kar sakta hai.",
        body_style
    ))

    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: 8 HD VIDEOS & 4 UNIQUE CREATIVE TOOLS
    # =========================================================================
    story.append(Paragraph("7. 8 Brand-Matched HD Video Portfolio Showcase", h1_style))
    story.append(Paragraph(
        "<b>URL:</b> <code>/portfolio</code> ya Creator profile — Fake static photos ke bajaye real high-definition cinematic MP4 videos live stream hote hain:",
        body_style
    ))

    video_items = [
        [Paragraph("<b>Video Title</b>", body_bold), Paragraph("<b>Creator & Niche</b>", body_bold), Paragraph("<b>Visual Production Highlights</b>", body_bold)],
        [Paragraph("<b>Neon Tokyo: City of Dreams</b>", body_style), Paragraph("Aarav Sharma<br/>Cyberpunk Short Film", body_style), Paragraph("Anamorphic lens flares, rain-slicked Tokyo asphalt, Midjourney v6 + Runway Gen-2.", body_style)],
        [Paragraph("<b>Vapor Velocity</b>", body_style), Paragraph("Aarav Sharma<br/>Sneaker Commercial", body_style), Paragraph("Liquid-nitrogen polymer sole formation, kinetic 30s streetwear pacing.", body_style)],
        [Paragraph("<b>Ethereal Botanicals</b>", body_style), Paragraph("Mizuki Tanaka<br/>Clean Skincare", body_style), Paragraph("Delicate morning dew on sakura petals, soft watercolor paper aesthetic.", body_style)],
        [Paragraph("<b>Mount Fuji Sakura Window</b>", body_style), Paragraph("Mizuki Tanaka<br/>Japanese Lifestyle", body_style), Paragraph("Tranquil wooden studio view overlooking Mount Fuji with floating cherry blossoms.", body_style)],
        [Paragraph("<b>Midnight Autobahn: Apex</b>", body_style), Paragraph("Elena Rostova<br/>Automotive Hypercar", body_style), Paragraph("High-speed rain reflection tracking shot, Unreal Engine 5 studio lighting.", body_style)],
        [Paragraph("<b>Sector 9 Mecha Showdown</b>", body_style), Paragraph("Liam Thorne<br/>Gaming & VFX", body_style), Paragraph("Dystopian mecha combat physics, Cascadeur + Blender laser smoke.", body_style)],
        [Paragraph("<b>AeroFoam 2099 Cyber Drop</b>", body_style), Paragraph("Marcus Vance<br/>Sneaker Hypebeast", body_style), Paragraph("Exploded 360-degree sole rotation, Kling AI motion + beat sync.", body_style)],
        [Paragraph("<b>Whispers of the Silk Road</b>", body_style), Paragraph("Sofia Al-Mansoor<br/>Travel Documentary", body_style), Paragraph("Atmospheric desert caravan memories, Topaz Video AI upscaled 4K.", body_style)],
    ]
    t_videos = Table(video_items, colWidths=[140, 122, 260])
    t_videos.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E0F2FE")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('PADDING', (0,0), (-1,-1), 3.2),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_videos)
    story.append(Spacer(1, 3))
    story.append(Paragraph(
        "<b>Interactive Experience:</b> Video card par cursor le jane se automatic video hover preview chalu hota hai ('PLAYING' badge ke sath). Click karne par full-screen <b>Cinematic Video Modal Player</b> khulta hai jisme video controls, view metrics, tool breakdown, aur direct 'Hire Creator' button hota hai.",
        body_style
    ))

    story.append(Paragraph("8. 4 Unique Creative Studio Tools", h1_style))
    story.append(Paragraph(
        "Platform me 4 unique standalone creative tools integrate kiye gaye hain jo kisi aur marketplace me nahi milte:",
        body_style
    ))

    tools_data = [
        [Paragraph("<b>Tool & Navigation</b>", body_bold), Paragraph("<b>Functionality & Judge Impact</b>", body_bold)],
        [
            Paragraph("<b>1. Spotlight Command Palette</b><br/>Shortcut: <code>Ctrl + K</code> / <code>Cmd + K</code>", body_style),
            Paragraph("Website me kahi se bhi keyboard shortcut dabane par quick search palette khulta hai jisse creators, briefs, portfolio items, aur tools ko 0.1s me navigate kiya ja sakta hai.", body_style)
        ],
        [
            Paragraph("<b>2. AI Moodboard & Style DNA</b><br/>URL: <code>/tools/moodboard</code>", body_style),
            Paragraph("Koi bhi brand concept enter karo — Gemini AI turant 5 color hex palette tokens, studio lighting specs, ARRI camera lens direction, aur Midjourney/Runway prompt recipes generate karta hai.", body_style)
        ],
        [
            Paragraph("<b>3. AI Rate & Budget Calculator</b><br/>URL: <code>/tools/calculator</code>", body_style),
            Paragraph("Interactive sliders (deliverables, follower tier, commercial rights, turnaround urgency) se real-world recommended campaign budget aur platform fee breakdown instantly calculate karta hai.", body_style)
        ],
        [
            Paragraph("<b>4. Creator Aura Audit</b><br/>URL: <code>/tools/audit</code>", body_style),
            Paragraph("Creator handle aur niche analyze karke radar benchmark (Originality, Prompt Mastery, Brand Readiness, Engagement Purity, Reliability), suggested day rate, aur ideal brand partners recommend karta hai.", body_style)
        ],
    ]
    t_tools = Table(tools_data, colWidths=[150, 372])
    t_tools.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#FCE7F3")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('PADDING', (0,0), (-1,-1), 3.8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_tools)

    story.append(PageBreak())

    # =========================================================================
    # PAGE 4: INQUIRIES, ARCHITECTURE & 3-MINUTE PITCH SCRIPT
    # =========================================================================
    story.append(Paragraph("9. Direct Brand Inquiries & Project Proposal Flow", h1_style))
    story.append(Paragraph(
        "Kisi bhi creator card ya video modal par <b>'Hire / Contact'</b> dabane par direct proposal drawer open hota hai. "
        "Brand campaign title, budget offer ($), aur timeline submit karta hai jo turant Firestore database aur creator ke inquiry inbox me save ho jata hai. Creator use Accept ya Decline kar sakta hai.",
        body_style
    ))

    story.append(Paragraph("10. Fullstack Architecture & Hackathon Advantages", h1_style))
    story.append(Paragraph(
        "Creatora AI ko hackathon presentation ke liye zero-failure architecture par deploy kiya gaya hai:",
        body_style
    ))

    arch_points = [
        [Paragraph("<b>Component</b>", body_bold), Paragraph("<b>Technology</b>", body_bold), Paragraph("<b>Why It Beats Standard Setups</b>", body_bold)],
        [Paragraph("<b>Frontend & Fullstack API</b>", body_style), Paragraph("Next.js 14 App Router on Vercel Serverless", body_style), Paragraph("<b>0ms Cold Start!</b> Render ke 50s sleep lag se chutkara. Same-origin URL hone se <b>Zero CORS</b>.", body_style)],
        [Paragraph("<b>Database</b>", body_style), Paragraph("Google Cloud Firestore (Native mode)", body_style), Paragraph("24/7 online cloud database, zero sleep mode, live persistent demo seed records.", body_style)],
        [Paragraph("<b>Authentication</b>", body_style), Paragraph("Firebase Auth (Role-based JWT)", body_style), Paragraph("Instant 1-click test credentials for CREATOR and BRAND roles.", body_style)],
        [Paragraph("<b>AI Engine</b>", body_style), Paragraph("Google Gemini API + Resilient Engine", body_style), Paragraph("Structured schema extraction + instant algorithmic fallback if API key is omitted.", body_style)],
    ]
    t_arch = Table(arch_points, colWidths=[105, 155, 262])
    t_arch.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#E2E8F0")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('PADDING', (0,0), (-1,-1), 3.8),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_arch)
    story.append(Spacer(1, 4))

    story.append(Paragraph("11. Hackathon Judges ke Samne 3-Minute Winning Demo Script", h1_style))
    story.append(Paragraph(
        "Judges ko demo dete waqt ye 4-step sequence follow karo for highest score:",
        body_style
    ))

    pitch_steps = [
        Paragraph("<b>Step 1 (0:00 - 0:45) — Hook & Unique Design:</b> Kholo <code>https://creatora-ai.vercel.app</code>. Explain: <i>'Traditional influencer platforms AI creators ke liye fail ho jati hain kyunki wo tools, LoRA models, aur commercial prompt rights nahi samajhti. Humne Creatora AI banaya hai ek authentic Japanese anime sketchbook paper aesthetic me.'</i>", body_style),
        Paragraph("<b>Step 2 (0:45 - 1:30) — Transparent AI Match Engine:</b> Jao <code>/briefs</code> par aur <b>'Cinematic Sneaker Launch'</b> demo brief kholo. Explain: <i>'Hum black-box guess nahi karte — hamara system 5 transparent vectors (Genre 30%, Tools 25%, Format 20%, Audience 15%, Budget 10%) calculate karke Gemini explanation deta hai ki why Aarav Sharma is a 92% match.'</i>", body_style),
        Paragraph("<b>Step 3 (1:30 - 2:15) — Real HD Video Experience:</b> Jao <code>/portfolio</code> par. Kisi video card par hover karke live motion dikhao, fir click karke full-screen <b>Cinematic Video Modal Player</b> dikhao.", body_style),
        Paragraph("<b>Step 4 (2:15 - 3:00) — Standout Tools & Architecture:</b> Keyboard par <code>Ctrl + K</code> daba kar Global Spotlight Palette dikhao. Fir <code>/tools/moodboard</code> ya <code>/tools/audit</code> khol kar live style DNA generation dikhao. End with: <i>'Pura app Vercel Serverless Edge + Firebase par live hai with 0ms cold start!'</i>", body_style)
    ]

    for p in pitch_steps:
        story.append(p)
        story.append(Spacer(1, 2.5))

    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#CBD5E1"), spaceAfter=8))
    story.append(Paragraph(
        "<b>Live Deployment:</b> <font color='#6C5CE7'><u>https://creatora-ai.vercel.app</u></font> &nbsp;&nbsp;|&nbsp;&nbsp; "
        "<b>GitHub Repository:</b> <font color='#6C5CE7'><u>https://github.com/sumit-2007-git/creatora-ai</u></font>",
        body_bold
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated at: {filename}")


if __name__ == "__main__":
    out_file = "Creatora_AI_Feature_Guide.pdf"
    create_feature_guide_pdf(out_file)
