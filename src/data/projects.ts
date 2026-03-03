export interface Project {
    slug: string;
    title: string;
    subtitle: string;
    industry: string;
    region: string;
    timeline: string;
    service: string;
    themeColor: string;
    metrics: {
        label: string;
        value: string;
        context: string;
    }[];
    content: {
        executiveSummary: string;
        theChallenge: string;
        approachIntro: string;
        pillars: {
            title: string;
            description: string;
        }[];
        executionTimeline: {
            days: string;
            title: string;
            description: string;
        }[];
        results: {
            metric: string;
            day0: string;
            day7: string;
        }[];
        headlineAchievement: {
            title: string;
            content: string;
        };
        aiOverview: {
            title: string;
            content: string;
        };
        radlabsDifference: {
            title: string;
            content: string[];
        };
        nextSteps: {
            title: string;
            content: string[];
        };
        conclusion: string;
    };
}

export const projects: Project[] = [
    {
        slug: "ai-driven-seo-triumph",
        title: "Obscurity to Dominance",
        subtitle: "From Page 4 to #1 in 7 Days: How Radlabs Used AI to Dominate Local SEO in the UK",
        industry: "Cleaning Services",
        region: "United Kingdom",
        timeline: "7 Days",
        service: "AI-Powered SEO",
        themeColor: "brand-red",
        metrics: [
            { label: "Search Clicks", value: "20×", context: "vs baseline" },
            { label: "Impressions", value: "5×", context: "and growing rapidly" },
            { label: "Keyword Rank", value: "#1", context: "Block Cleaning, North London" }
        ],
        content: {
            executiveSummary: "In an industry where organic search visibility is the single largest driver of new business enquiries, a UK-based cleaning services company approached Radlabs with an urgent challenge — near-zero online presence, no meaningful Google ranking, and a rapidly growing need to dominate their most revenue-critical service category.\n\nRadlabs deployed its proprietary AI-powered SEO framework, combining machine learning competitor analysis, automated meta-tag generation, intelligent backlink acquisition, and data-driven content strategy. The results that traditional agencies typically project over three to six months were delivered in a single week.\n\nWithin 7 days of engagement, the client moved from Page 4 to Page 3 in Google Search with clear trajectory toward Page 1, began ranking #1 for their most commercially significant keyword cluster in North London, started appearing in Google's AI Overview feature — a landmark signal of authority and relevance — and had a fully optimised Google Business Profile, social media presence, and automated content pipeline live and running.",
            theChallenge: "The client is a professional eco-conscious cleaning company serving commercial and residential clients across South Wales and North London. Their services span block cleaning, carpet cleaning, jet washing, and specialist stonework care. Built primarily on word of mouth, the business had strong operational foundations — but a critical gap in digital presence.\n\nWhen Radlabs conducted the baseline audit at Day 0, the data told a stark story. The website had received minimal search clicks, with an average ranking position on Page 4 of Google, where a negligible percentage of users ever scroll. Total impressions over the audit period were low. Several pages remained unindexed by Google, including potential revenue pages. All recorded website traffic was originating outside the UK, meaning no genuine local audience was being reached. The business had no Google Business Profile, no social media presence, and a virtually non-existent backlink profile.\n\nMost critically, block cleaning accounts for the majority of the client's commercial revenue. Yet despite operating professionally in this space, they were entirely absent from relevant search results — ceding the market entirely to competitors.\n\nThe client needed more than standard SEO. They needed rapid, intelligent intervention. That is precisely what Radlabs delivered.",
            approachIntro: "Radlabs does not follow conventional SEO timelines. Our methodology is built on the principle that the right combination of AI intelligence, automation, and expert strategy can compress months of work into days — without sacrificing quality or sustainability.",
            pillars: [
                {
                    title: "Pillar 1: AI-Powered Competitive Intelligence",
                    description: "Before writing a single line of content or modifying a single tag, Radlabs deployed advanced AI crawling and analysis tools to map the full competitive landscape. Every top-ranking competitor for block cleaning and related services in North London and South Wales was analysed — their keyword profiles, content structures, backlink sources, meta strategies, and technical configurations were all reverse-engineered.\n\nThis allowed Radlabs to build a precise blueprint: exactly what the client needed to do to outrank existing leaders, with no guesswork and no wasted effort."
                },
                {
                    title: "Pillar 2: AI-Generated On-Page Optimisation",
                    description: "Using Radlabs' proprietary AI content and meta-generation pipeline, we produced and implemented a complete on-page SEO overhaul across all key service pages. This included optimised title tags and meta descriptions crafted by AI and refined by Radlabs strategists for conversion intent, a structured H-tag hierarchy rebuilt to match search intent patterns, schema markup applied across service and location pages to maximise rich snippet eligibility, an internal linking architecture overhauled to distribute page authority to priority revenue pages, and keyword mapping with local intent signals including borough and city-level geo-targeting for North London."
                },
                {
                    title: "Pillar 3: Google Business Profile Setup and Optimisation",
                    description: "The client had no Google Business Profile — a critical omission for any local service business. Radlabs set up and fully optimised the profile from scratch, including accurate service categories, a keyword-rich business description, service area configuration, and photo assets. This immediately activated the client in Google's local pack, a high-visibility placement above organic results that drives significant enquiry volume for service businesses."
                },
                {
                    title: "Pillar 4: Backlink Acquisition via AI Automation",
                    description: "Authority signals remain a cornerstone of Google's ranking algorithm. Radlabs activated AI-assisted backlink acquisition tools to identify and secure high-quality inbound links from relevant UK directories, industry platforms, and local business listings. This process, which typically takes agencies weeks to execute manually, was accelerated dramatically through Radlabs' automation stack — building meaningful domain authority from Day 1."
                },
                {
                    title: "Pillar 5: Social Media Creation and Automated Content Pipeline",
                    description: "Radlabs created and configured social media profiles across key platforms for the client, establishing the social trust signals that both users and search engines look for. Using AI-powered content automation tools, we built a consistent posting pipeline — ensuring the client maintains an active, credible online presence without placing any operational burden on the business owner."
                }
            ],
            executionTimeline: [
                {
                    days: "Day 0",
                    title: "Baseline Audit and Discovery",
                    description: "Comprehensive technical SEO audit, AI-powered competitor landscape analysis, keyword mapping, and benchmark data capture across Google Search Console and Google Analytics. Full strategic blueprint delivered before Day 1."
                },
                {
                    days: "Days 1–3",
                    title: "AI Strategy Deployment and On-Page Optimisation",
                    description: "Radlabs deployed AI-generated meta tags, structured data schema, optimised title tags, and a rebuilt H-tag hierarchy across all key service pages. Google Business Profile setup and full optimisation completed on Day 1."
                },
                {
                    days: "Days 4–5",
                    title: "Competitor Intelligence and Content Gap Analysis",
                    description: "Using AI-powered competitor crawling tools, Radlabs reverse-engineered the strategies of top-ranking competitors. Content gaps were identified and addressed with optimised service and location landing pages targeting high-intent local queries."
                },
                {
                    days: "Days 6–7",
                    title: "Backlink Automation and Social Media Activation",
                    description: "AI-driven backlink generation tools deployed to build high-authority inbound links. Social media handles created and automated content pipelines established, amplifying online presence and trust signals across the web."
                }
            ],
            results: [
                { metric: "Total Search Clicks", day0: "Minimal", day7: "20× increase" },
                { metric: "Total Impressions", day0: "Low", day7: "5× increase and growing" },
                { metric: "Average Search Position", day0: "Page 4", day7: "Improved to Page 3 — trending to Page 1" },
                { metric: "Target Keyword Ranking", day0: "Not ranked", day7: "#1 — Block Cleaning, North London" },
                { metric: "Google AI Overview", day0: "No presence", day7: "Featured in AI search results" },
                { metric: "Google Business Profile", day0: "Not set up", day7: "Fully optimised and live" },
                { metric: "Backlink Profile", day0: "Minimal", day7: "AI acquisition active" },
                { metric: "Social Media Presence", day0: "None", day7: "Live with automated posts" },
                { metric: "UK Organic Traffic", day0: "Zero", day7: "Local audience established" }
            ],
            headlineAchievement: {
                title: "Headline Achievement: #1 in Block Cleaning, North London",
                content: "The standout result of this engagement is the client's ascension to the top position for block cleaning searches in North London — the category that generates the majority of their commercial revenue. Within 7 days, Radlabs had positioned the client ahead of established competitors who had been occupying these rankings for months or years.\n\nThis is not coincidence. It is the result of Radlabs' AI identifying exactly which content signals, keyword combinations, and authority factors the algorithm was prioritising — and deploying them with a precision and speed that human-only processes simply cannot match."
            },
            aiOverview: {
                title: "Appearing in Google's AI Overview",
                content: "One of the most significant indicators of early authority is the client's appearance in Google's AI Overview feature — the AI-generated answer summaries that appear at the very top of search results. These placements are granted only to sources that Google's systems have assessed as particularly relevant and trustworthy. Achieving this within the first week of Radlabs' intervention demonstrates that the authority signals being generated are registering at the highest level of Google's quality assessment framework."
            },
            radlabsDifference: {
                title: "Why Radlabs Delivers What Traditional Agencies Cannot",
                content: [
                    "Most SEO agencies rely on the same playbook that has existed for a decade — keyword research in spreadsheets, manual content writing, and backlink outreach that takes months. Results, if they come, arrive in six to twelve months, by which time competitor landscapes have shifted and client patience has expired.",
                    "Radlabs is built differently. AI is not a feature we bolt on — it is the operational core of our methodology.",
                    "Where traditional agencies use AI as a writing assistant, Radlabs uses AI as a strategic engine. Our tools analyse hundreds of competitors simultaneously, identify ranking patterns invisible to human researchers, generate optimised content at scale, and monitor search algorithm changes in real time. The result is strategy that is faster, smarter, and more adaptive than anything a conventional team can deliver.",
                    "Radlabs' automation stack handles the high-volume, repetitive elements of SEO — backlink prospecting, social content scheduling, rank monitoring, reporting — at a speed and consistency that would require a full team of specialists working continuously to replicate manually. This efficiency is passed directly to clients in the form of faster results and more competitive pricing.",
                    "AI and automation are tools. The strategy behind them is human. Every Radlabs engagement is overseen by experienced digital growth strategists who ensure that AI outputs are aligned with business objectives, brand voice, and market realities. This combination of machine speed and human judgement is the Radlabs difference."
                ]
            },
            nextSteps: {
                title: "What Comes Next: The Road to Page 1",
                content: [
                    "The 7-day sprint has established the foundation. The next phase of Radlabs' engagement is focused on consolidating those gains and scaling visibility across all target service categories.",
                    "Immediate priorities include pushing block cleaning keywords into the top 3 positions on Page 1, expanding optimised content for carpet cleaning, jet washing, and stonework services, resolving outstanding technical indexing issues, and deepening the backlink profile with industry-specific and regional authority sources.",
                    "Over the medium term, the targets are substantial monthly impressions and significant organic clicks, a presence in Google's local pack across multiple service areas, a review acquisition strategy via Google Business Profile to build social proof, and expanded AI search feature appearances across all primary service keywords.",
                    "Every milestone will be tracked, reported, and optimised by Radlabs' AI monitoring systems — giving the client full visibility of progress and confidence that their digital growth is in expert hands."
                ]
            },
            conclusion: "This case study demonstrates what is possible when AI-powered strategy, expert execution, and genuine client focus come together. In seven days, Radlabs transformed a virtually invisible website into the #1 ranked provider in its most critical service category in North London — a result with a direct and measurable impact on the client's ability to win contracts and grow their business.\n\nThe methods Radlabs used are not experimental. They are proven, data-driven, and replicable across industries and markets. Whether a business is starting from zero or looking to break through a plateau in competitive rankings, Radlabs has the AI capability and strategic expertise to deliver results that traditional agencies simply cannot match — in timeframes that actually matter to business owners.\n\n© 2025 Radlabs. Client details anonymised for commercial confidentiality. Data sourced from Google Search Console and Google Analytics."
        }
    }
];
