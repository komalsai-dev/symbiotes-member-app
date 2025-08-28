import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white px-4 lg:px-8 pt-4 pb-4 overflow-auto">
      {/* Title Section */}
      <div className="text-xl sm:text-2xl lg:text-5xl font-light italic mb-4 lg:mb-6 mt-2 text-white tracking-widest font-sans leading-tight">
        THE FUTURE OF BUSINESS, TODAY
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 mt-0">
        {/* Left Column */}
        <div className="col-span-1 space-y-4 lg:space-y-6">
          {/* Top Left Card (AI Impact) */}
          <div className="bg-[#d0ed01] rounded-xl p-4 lg:p-5 border border-white/10 flex flex-col lg:flex-row items-start gap-4 lg:gap-6 relative overflow-hidden text-black min-h-[300px] lg:min-h-0">
            {/* Green fan-like shape */}
            <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 bg-black rounded-full transform rotate-45 opacity-10 z-0"></div>
            <div className="flex-1 z-10 w-full">
              <h2 className="text-base lg:text-lg font-bold mb-2 leading-tight">AI Impact: What Happens to Advertising Now?</h2>
              <p className="text-gray-800 text-xs mb-3 leading-relaxed">Last week news reports emerged quoting Sam Altman that AI would revolutionize advertising in ways we haven't seen before.</p>
              <div className="w-full h-48 lg:h-56 relative rounded-lg overflow-hidden">
                <Image 
                  src="/images/asset-2.png"
                  alt="AI Impact Image"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Bottom Left Card (Download the App now!) */}
          <div className="bg-[#d0ed01] rounded-xl p-4 lg:p-9 border border-black flex flex-col lg:flex-row items-start gap-4 lg:gap-6 relative overflow-hidden text-black min-h-[250px] lg:h-[280px]">
            {/* Green fan-like shape */}
            <div className="absolute bottom-[-60px] right-[-80px] w-48 h-48 bg-black rounded-full transform rotate-45 z-0"></div>
            {/* Circular image in bottom right corner */}
            <div className="absolute bottom-[-20px] right-[-20px] w-20 h-20 lg:w-28 lg:h-28 rounded-full overflow-hidden z-0">
              <Image 
                src="/images/asset-3.png"
                alt="Decorative element"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="flex-1 z-10 w-full">
              <h2 className="text-base lg:text-lg font-bold mb-2 leading-tight">Download the App now!</h2>
              <p className="text-gray-800 text-xs mb-4 leading-relaxed">
                Set your goals and get your own personnel training program.
                Sign in to avail student discounts and many more crazy updates
              </p>
              <div className="mt-4 px-4 lg:px-6 py-2 lg:py-3 border-2 border-black text-[#d0ed01] font-semibold rounded-full flex items-center justify-center w-20 h-8 lg:w-20 lg:h-8 hover:bg-black/10 transition relative z-10">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-1 lg:col-span-2 space-y-4 lg:space-y-8">
          {/* New Card: Amazon to Invest... */}
          <div className="bg-[rgba(208,237,1,0.18)] backdrop-blur-md border border-white/10 rounded-xl p-4 lg:p-5 relative overflow-hidden flex flex-col lg:flex-row items-start gap-4 min-h-[200px] lg:min-h-0">
            <div className="flex-1 w-full">
              <div className="flex items-start gap-2 lg:gap-1 lg:ml-4">
                <h2 className="text-base lg:text-xl font-bold text-white mb-2 leading-tight flex-1">
                  Amazon to Invest $10 Billion in North Carolina to Expand AI Infrastructure
                </h2>
                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-[#d0ed01] flex-shrink-0 rotate-45 ml-1 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
            </div>
            <div className="w-full h-32 lg:w-28 lg:h-28 relative rounded-lg overflow-hidden flex-shrink-0">
              <Image 
                src="/images/asset-1.png"
                alt="AI Infrastructure Image"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-stretch">
            {/* Top Right Card 1: What's particularly fascinating... */}
            <div className="col-span-1">
              <div className="bg-[rgba(208,237,1,0.18)] backdrop-blur-md border border-white/10 rounded-xl p-4 lg:p-5 relative overflow-hidden flex flex-col lg:flex-row items-start gap-4 min-h-[200px] lg:h-full">
                <div className="flex-1 z-10 w-full">
                  <h2 className="text-sm lg:text-sm text-white leading-relaxed mb-3">What&apos;s particularly fascinating about the new model is how inconsistently it applies its moral boundaries.</h2>
                </div>
                <div className="w-full h-32 lg:w-28 lg:h-28 relative rounded-lg overflow-hidden flex items-center justify-center z-10 flex-shrink-0">
                  <Image 
                    src="/images/asset-4.png"
                    alt="Abstract Diagram"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
                {/* Top right background image */}
                <div className="absolute top-[-40px] right-[-40px] w-32 h-32 z-0 pointer-events-none">
                  <Image src="/images/asset-7.png" alt="Decorative element" fill style={{ objectFit: 'contain' }} />
                </div>
                {/* Bottom left background image */}
                <div className="absolute bottom-[-60px] left-[-60px] w-40 h-40 z-0 pointer-events-none">
                  <Image src="/images/asset-7.png" alt="Decorative element" fill style={{ objectFit: 'contain' }} />
                </div>
              </div>
            </div>

            {/* Top Right Card 2 */}
            <div className="col-span-1">
              <div className="bg-[rgba(208,237,1,0.18)] backdrop-blur-md border border-white/10 rounded-xl p-4 lg:p-5 flex flex-col lg:flex-row items-start gap-4 relative overflow-hidden min-h-[200px] lg:h-full">
                <div className="flex-1 z-10 w-full">
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-2 leading-tight">AI - AGENTS</h2>
                  <p className="text-gray-400 text-sm mb-2"></p>
                </div>
                <div className="w-full h-32 lg:w-28 lg:h-28 relative rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <Image 
                    src="/images/asset-5.png"
                    alt="AI Agents Image"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right Card */}
          <div className="bg-[rgba(208,237,1,0.18)] backdrop-blur-md border border-white/10 rounded-xl p-4 lg:p-8 relative overflow-hidden flex flex-col lg:flex-row items-start gap-4 min-h-[300px] lg:min-h-0">
            <div className="w-full h-48 lg:w-48 lg:h-48 relative rounded-lg overflow-hidden flex-shrink-0">
              <Image 
                src="/images/asset-6.png"
                alt="DeepSeek AI Model Image"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <div className="flex-1 w-full">
              <h2 className="text-lg lg:text-xl font-bold text-white mb-3 leading-tight">DeepSeek&apos;s latest AI model a &apos;big step backwards&apos; for free speech</h2>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">DeepSeek&apos;s latest AI model, R1 0528, has raised eyebrows for a further regression on free speech and what users can discuss. &quot;A big step backwards for free speech,&quot; is how one prominent AI researcher summed it up</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 