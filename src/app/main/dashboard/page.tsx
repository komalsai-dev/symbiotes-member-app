import Image from "next/image";


export default function DashboardPage() {
  return (
    <div className="flex flex-col h-screen bg-black text-white px-8 pt-4 pb-4">
      {/* Title Section */}
      <div className="text-5xl font-light italic mb-6 mt-2 text-white tracking-widest font-sans">
      THE FUTURE OF BUSINESS, TODAY
      </div>

      <div className="grid grid-cols-3 gap-8 mt-0">
        {/* Left Column */}
        <div className="col-span-1 space-y-6">
          {/* Top Left Card (AI Impact) */}
          <div className="bg-[#d0ed01] rounded-xl p-5 border border-white/10 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden text-black">
            {/* Green fan-like shape */}
            <div className="absolute bottom-[-50px] right-[-50px] w-48 h-48 bg-black rounded-full transform rotate-45 opacity-10 z-0"></div>
            <div className="flex-1 z-10">
              <h2 className="text-lg font-bold mb-1">AI Impact: What Happens to Advertising Now?</h2>
              <p className="text-gray-800 text-xs mb-2">Last week news reports emerged quoting Sam Altman that AI would</p>
              <div className="w-full h-56 relative rounded-lg overflow-hidden">
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
          <div className="bg-[#d0ed01] rounded-xl p-9 border border-black flex items-start gap-6 relative overflow-hidden text-black h-[280px]">
            {/* Green fan-like shape */}
            <div className="absolute bottom-[-60px] right-[-80px] w-48 h-48 bg-black rounded-full transform rotate-45 z-0"></div>
            {/* Circular image in bottom right corner */}
            <div className="absolute bottom-[-20px] right-[-20px] w-28 h-28 rounded-full overflow-hidden z-0">
              <Image 
                src="/images/asset-3.png"
                alt="Decorative element"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="flex-1 z-10 mt-[-4]">
              <h2 className="text-lg font-bold mb-1">Download the App now!</h2>
              <p className="text-gray-800 text-xs mb-2">
                Set your goals and get your own personnel training program.
                Sign in to avail student discounts and many more crazy updates
              </p>
              <div className="mt-4 px-6 py-3 border-2 border-black text-[#d0ed01] font-semibold rounded-full flex items-center justify-center w-20 h-8 hover:bg-black/10 transition relative z-10">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-8">
          {/* New Card: Amazon to Invest... */}
          <div className="bg-[rgba(208,237,1,0.18)] backdrop-blur-md border border-white/10 rounded-xl p-5 relative overflow-hidden flex items-center gap-4">
            <div className="flex-1">
              <div className="flex-1 flex items-center gap-1 ml-4">
                <h2 className="text-xl font-bold text-white mb-2">
                Amazon to Invest $10 Billion in North <br/>Carolina to Expand AI Infrastructure
              </h2>
                <svg className="w-8 h-8 text-[#d0ed01] flex-shrink-0 rotate-45 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
            </div>
            <div className="w-28 h-28 relative rounded-lg overflow-hidden flex-shrink-0">
              <Image 
                src="/images/asset-1.png"
                alt="AI Infrastructure Image"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 items-stretch">
            {/* Top Right Card 1: What's particularly fascinating... */}
            <div className="col-span-1">
              <div className="bg-[rgba(208,237,1,0.18)] backdrop-blur-md border border-white/10 rounded-xl p-5 relative overflow-hidden flex items-center gap-4 h-full">
                <div className="flex-1 z-10">
                  <h2 className="text-sm text-white">What&apos;s particularly fascinating about the new model is how inconsistently it applies its moral boundaries.</h2>
                </div>
                <div className="w-28 h-28 relative rounded-lg overflow-hidden flex items-center justify-center z-10">
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
              <div className="bg-[rgba(208,237,1,0.18)] backdrop-blur-md border border-white/10 rounded-xl p-5 flex items-center gap-4 relative overflow-hidden h-full">
                <div className="flex-1 z-10">
                  <h2 className="text-2xl font-bold text-white mb-2">AI - AGENTS</h2>
                  <p className="text-gray-400 text-sm mb-2"></p>
                </div>
                <div className="w-28 h-28 relative rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
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
          <div className="bg-[rgba(208,237,1,0.18)] backdrop-blur-md border border-white/10 rounded-xl p-8 relative overflow-hidden flex items-center gap-4">
            <div className="w-48 h-48 relative rounded-lg overflow-hidden flex-shrink-0">
              <Image 
                src="/images/asset-6.png"
                alt="DeepSeek AI Model Image"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2">DeepSeek&apos;s latest AI model a &apos;big step backwards&apos; for free speech</h2>
              <p className="text-gray-400 text-sm mb-4">DeepSeek&apos;s latest AI model, R1 0528, has raised eyebrows for a further regression on free speech and what users can discuss. &quot;A big step backwards for free speech,&quot; is how one prominent AI researcher summed it up</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 