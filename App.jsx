import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, User, Sun, Moon } from "lucide-react"; 
// Note: X and Send icons were removed as they were only used in the deleted ContactRequestForm

// --- Helper Components ---

// ToggleSection component remains the same
const ToggleSection = ({ title, defaultOpen = true, children, className = "", theme }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  // Dynamic color classes based on the current theme
  const titleColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-900';
  const titleHoverColor = theme === 'dark' ? 'hover:text-white' : 'hover:text-blue-700';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-300';
  const chevronColor = theme === 'dark' ? 'text-[#96a9d1]' : 'text-blue-500';

  return (
    <section id={title.toLowerCase().replace(/\s/g, '-')} className={`space-y-4 ${className}`}>
      {/* Clickable Heading to Toggle Content */}
      <h3 
        className={`flex items-center justify-between text-2xl font-semibold ${titleColor} border-b ${borderColor} pb-2 cursor-pointer select-none ${titleHoverColor} transition-colors`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={chevronColor} 
        >
          <ChevronDown className="w-6 h-6" />
        </motion.span>
      </h3>
      
      {/* Content Area with Animation */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ overflow: 'hidden' }}
      >
        <div className="pt-2 space-y-6"> 
            {children}
        </div>
      </motion.div>
    </section>
  );
};

// REMOVED: ContactRequestForm component is no longer needed.


export default function App() {
  
  // State for the Contact Details dropdown
  const [openContact, setOpenContact] = useState(false);
  const [hoverContact, setHoverContact] = useState(false);
  // 1. New State for Theme Management
  const [theme, setTheme] = useState('dark');
  
  const toggleContact = (e) => {
    e.stopPropagation();
    setOpenContact((o) => !o);
  };

  // 2. Theme Toggle Function
  const toggleTheme = () => {
      setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  };

  // 3. Define Theme Classes
  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-[#0f1624]' : 'bg-gray-50';
  const textClass = isDark ? 'text-gray-500' : 'text-gray-700';
  const borderClass = isDark ? 'border-gray-700/50' : 'border-gray-300';
  const primaryColor = isDark ? 'text-[#cdd9f0]' : 'text-gray-900';
  // secondaryColor is used for accents (e.g., links, dashes, chevron)
  const secondaryColor = isDark ? 'text-[#96a9d1]' : 'text-blue-600'; 
  const summaryText = isDark ? 'text-gray-400' : 'text-gray-800';
  const contactTextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const dropdownBg = isDark ? 'bg-[#1b253b]/95' : 'bg-white/95';

  // Helper for internal text colors that depend on theme
  const getInternalTextClass = (baseDark, baseLight) => isDark ? `text-${baseDark}` : `text-${baseLight}`;
  
  // Custom colors for framer-motion animation on the User icon
  // When not hovered/open: White in dark mode, Gray-600 (#4B5563) in light mode
  const iconColorDefault = isDark ? '#FFF' : '#4B5563'; 
  // When hovered/open: Light Blue in dark mode, Gray-900 (#111827) in light mode (The requested "Black")
  const iconColorActive = isDark ? '#cdd9f0' : '#111827'; 

  // Standardized List Item Component for Dash style
  const DashListItem = ({ children }) => (
      <li className="flex items-start">
          <span className={`flex-shrink-0 mt-0.5 mr-2 ${secondaryColor}`}>-</span>
          <span className="flex-grow">{children}</span>
      </li>
  );
  
  // NEW: Google Form URL
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeLnXVe2-KP9If_PGq1NzZtK8n4VghS7uymYQ7xpH9ZPszfQA/viewform?usp=dialog";

  return (
    <div
      className={`min-h-screen ${bgClass} ${textClass}`} // Apply global background and default text
      style={{
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto",
      }}
    >
      
      {/* --- HEADER / CONTACT / SUMMARY (Full Width) --- */}
      <div className={`max-w-[1200px] mx-auto px-6 sm:px-8 pt-10 pb-6 border-b ${borderClass}`}>
        <div className="flex justify-between items-start flex-wrap">
            
            {/* LEFT GROUP: Title only */}
            <h1 className={`text-4xl font-bold ${primaryColor} leading-tight`}>DANIEL MURPHY</h1>

            {/* RIGHT GROUP: Theme and Contact Details in a vertical stack, aligned right */}
            <div className="flex flex-col items-end space-y-2 mt-2 sm:mt-0">
                
                {/* 1. Theme Toggle */}
                <div
                    onClick={toggleTheme}
                    className={`
                        flex items-center space-x-2 px-3 py-1 rounded-full cursor-pointer transition-colors
                        ${isDark 
                            ? 'hover:bg-gray-700/50' 
                            : 'hover:bg-gray-200/50' 
                        }
                    `}
                    aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    <span className={`text-base font-semibold transition-colors
                        ${isDark 
                            ? 'text-[#96a9d1] hover:text-[#cdd9f0]' 
                            : 'text-blue-600 hover:text-gray-900'
                        }`}
                    >
                        Theme
                    </span>
                    
                    <span className={`transition-colors
                        ${isDark ? 'text-white' : 'text-gray-900'}`
                    }>
                        {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </span>
                </div>
                

                {/* 2. Contact Details Dropdown */}
                <div 
                    className={`flex items-center space-x-3 text-sm ${contactTextColor}`}
                    onMouseEnter={() => setHoverContact(true)}
                    onMouseLeave={() => setHoverContact(false)}
                >
                    {/* Text Label */}
                    <motion.span
                        onClick={toggleContact}
                        animate={{ color: hoverContact || openContact ? primaryColor : secondaryColor }}
                        transition={{ duration: 0.22 }}
                        style={{ fontWeight: 500, fontSize: 18, cursor: "pointer" }}
                        className={isDark ? 'text-[#96a9d1]' : 'text-blue-600'}
                    >
                        Contact Details
                    </motion.span>

                    {/* User Icon with Dropdown */}
                    <div className="relative">
                        <motion.span
                            onClick={toggleContact}
                            animate={{
                                color: hoverContact || openContact ? iconColorActive : iconColorDefault,
                            }}
                            transition={{ duration: 0.22 }}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 22,
                                cursor: "pointer",
                                lineHeight: 1,
                            }}
                        >
                            <User className="w-5 h-5" /> 
                        </motion.span>

                        {/* Contact dropdown content */}
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: -6 }}
                            animate={{
                                height: openContact ? "auto" : 0,
                                opacity: openContact ? 1 : 0,
                                y: openContact ? 10 : -6,
                            }}
                            transition={{ duration: 0.36, ease: [0.4, 0, 0.2, 1] }}
                            className={`absolute right-0 top-full mt-2 w-[240px] p-4 ${dropdownBg} backdrop-blur-md border ${borderClass} rounded-xl shadow-2xl overflow-hidden`}
                        >
                            <ul className={`text-sm space-y-1 leading-snug inline-block text-left ${contactTextColor}`}>
                                {/* Direct Email link */}
                                <li className="p-1">
                                    Email:{" "}
                                    <a
                                        href="mailto:murphyskdaniel172@gmail.com"
                                        className={`${secondaryColor} hover:${primaryColor} transition-colors underline`}
                                    >
                                        murphyskdaniel172@gmail.com
                                    </a>
                                </li>
                                
                                {/* Based in: */}
                                <li className="p-1">
                                    Based in:{" "}
                                    <span className={secondaryColor}>Co. Kilkenny</span>
                                </li>
                                
                                {/* For professional inquiries: */}
                                <li className="p-1 pt-2 text-sm">
                                    For professional inquiries:
                                </li>

                                {/* CONTACT FORM LINK - CHANGED TO ANCHOR TAG */}
                                <li className="p-1">
                                    <a
                                        href={googleFormUrl}
                                        target="_blank" // Opens in a new tab
                                        rel="noopener noreferrer"
                                        onClick={() => setOpenContact(false)} // Close dropdown on click
                                        className={`w-full flex items-center justify-center space-x-1 py-2 px-3 rounded-lg font-bold text-sm transition-colors shadow-md
                                            ${isDark ? 'bg-[#96a9d1] text-[#0f1624] hover:bg-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                    >
                                        <span>Inquiry Form</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </li>
                                {/* END ANCHOR TAG */}
                                
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
            {/* End Right Group */}

        </div>

        <h2 className={`text-2xl font-light ${secondaryColor} mt-1`}>Electronic Engineer</h2>

        {/* SUMMARY: REVISED TO LEAD WITH AI/ML AND EMBEDDED SYSTEMS */}
        <p className={`mt-4 text-base leading-relaxed ${summaryText}`}>
            I am an <strong>Electronic Engineering graduate</strong> with a strong foundation in <strong>AI/Machine Learning</strong> and <strong>Embedded Systems</strong>. I am proficient in languages including <strong>Python, C/C++, MATLAB, and SystemVerilog</strong>, and have a solid understanding of Linux development. My core expertise covers digital systems, circuit design, and microelectronics. My final-year project on <strong>AI-driven autonomous navigation</strong> for a Mars rover demonstrates my ability to deliver complex, high-performance solutions. I thrive in dynamic environments where innovation and technical precision are paramount.
        </p>
      </div>

      {/* --- MAIN CV GRID LAYOUT --- */}
      <div className={`max-w-[1200px] mx-auto px-6 sm:px-8 mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 pb-16 ${textClass}`}>
          
          {/* TOP LEFT: EDUCATION (Order 1) */}
          <ToggleSection title="Education" className="order-1 pb-6" theme={theme}>
              <div id="beng-hons">
                  <p className={`text-lg font-semibold ${primaryColor}`}>BEng (Hons) in Electronic Engineering</p>
                  <p className={getInternalTextClass('gray-400', 'gray-700')}>South Eastern Technological University, Carlow</p>
                  <p className={getInternalTextClass('gray-500', 'gray-600') + ' text-sm italic mt-0.5'}>Sep 2024 - May 2025</p>
                  <p className={getInternalTextClass('gray-500', 'gray-600') + ' text-sm italic'}>Graduated with: 2:1 (Second Class Honours, Grade 1)</p>
              </div>
              <div id="higher-cert">
                  <p className={`text-lg font-semibold ${primaryColor}`}>BEng (Ord) in Electronic Engineering</p>
                  <p className={getInternalTextClass('gray-400', 'gray-700')}>South Eastern Technological University, Carlow</p>
                  <p className={getInternalTextClass('gray-500', 'gray-600') + ' text-sm italic mt-0.5'}>Sep 2022 - May 2024</p>
              </div>
              <div>
                  <p className={`text-lg font-semibold ${primaryColor}`}>Higher Certificate in Electronic Engineering</p>
                  <p className={getInternalTextClass('gray-400', 'gray-700')}>Waterford Institute of Technology, Waterford</p>
                  <p className={getInternalTextClass('gray-500', 'gray-600') + ' text-sm italic mt-0.5'}>Sep 2021 - May 2022</p>
              </div>
              <div id="leaving-cert"> 
                  <p className={`text-lg font-semibold ${primaryColor}`}>Leaving Certificate</p>
                  <p className={getInternalTextClass('gray-400', 'gray-700')}>Borris Vocational School, Carlow</p>
                  <p className={getInternalTextClass('gray-500', 'gray-600') + ' text-sm italic mt-0.5'}>Sep 2016 - Jun 2021</p>
              </div>
          </ToggleSection>
          
          {/* TOP RIGHT: PROFESSIONAL EXPERIENCE (Order 2) */}
          <ToggleSection title="Professional Experience" className="order-2" theme={theme}>
              <div id="professional-experience">
                  <p className={`text-lg font-semibold ${primaryColor}`}>Automation & Security Systems Technician</p>
                  <p className={getInternalTextClass('gray-400', 'gray-700')}>No Shorts Automation, Co. Kilkenny</p>
                  <p className={getInternalTextClass('gray-500', 'gray-600') + ' text-sm italic mt-0.5 mb-3'}>May 2019 - June 2025</p>
                  {/* List changed to DashListItem and list-none, size standardized to text-base */}
                  <ul id="key-responsibilities" className="list-none space-y-2 text-base pl-0">
                      <DashListItem>Install, maintain, and repair gate automation, CCTV, alarms, and access control systems, ensuring optimal functionality.</DashListItem>
                      <DashListItem>Identify and resolve system faults while integrating tailored solutions to meet operational requirements.</DashListItem>
                      <DashListItem>Gain hands-on experience in active worksites, collaborating with electricians and performing supervised general electrical work.</DashListItem>
                  </ul>
              </div>
          </ToggleSection>
          
          {/* MIDDLE LEFT: SKILLS (Order 3) - RE-ORDERED FOR CORE EE FOCUS */}
          <ToggleSection 
            title="Skills" 
            className="order-3 md:col-start-1"
            theme={theme}
          > 
              <div id="core-electronics-design">
                  <h4 className={`font-semibold ${primaryColor} text-base mb-1`}>Core Electronics & Design</h4>
                  {/* List changed to DashListItem and list-none, size standardized to text-base */}
                  <ul className="list-none space-y-0.5 text-base pl-0">
                      <DashListItem>PCB Design (OrCAD, Proteus), Circuit Simulation, Microelectronic Design</DashListItem>
                      <DashListItem>Digital Systems Design (SystemVerilog), Troubleshooting & Testing</DashListItem>
                      <DashListItem>Vivado, LabVIEW, Cisco Packet Tracer</DashListItem>
                  </ul>
              </div>
              <div id="programming-embedded-skills">
                  <h4 className={`font-semibold ${primaryColor} text-base mb-1`}>Programming & Embedded Systems</h4>
                   {/* List changed to DashListItem and list-none, size standardized to text-base */}
                  <ul className="list-none space-y-0.5 text-base pl-0">
                      <DashListItem>C, C++, Python, MATLAB, SystemVerilog</DashListItem>
                      <DashListItem>Arduino, ESP32, Raspberry Pi, FPGA</DashListItem>
                  </ul>
              </div>
              <div id="ai-electronics-skills">
                  <h4 className={`font-semibold ${primaryColor} text-base mb-1`}>AI, Control & Automation</h4>
                  {/* List changed to DashListItem and list-none, size standardized to text-base */}
                  <ul className="list-none space-y-0.5 text-base pl-0">
                      <DashListItem>Computer Vision, CNN, Autonomous Navigation</DashListItem>
                      <DashListItem>PID Control, Filtering Techniques</DashListItem>
                      </ul>
              </div>
              <div id="development-tools"> 
                  <h4 className={`font-semibold ${primaryColor} text-base mb-1`}>Development Tools</h4>
                  {/* List changed to DashListItem and list-none, size standardized to text-base */}
                  <ul className="list-none space-y-0.5 text-base pl-0">
                      <DashListItem>Linux/Bash Command Line Proficiency</DashListItem>
                  </ul>
              </div>
              <div id="soft-skills">
                  <h4 className={`font-semibold ${primaryColor} text-base mb-1`}>Soft Skills & Languages</h4>
                  {/* List changed to DashListItem and list-none, size standardized to text-base */}
                  <ul className="list-none space-y-0.5 text-base pl-0">
                      <DashListItem>Time Management, Teamwork, Leadership, Customer Service</DashListItem>
                      <DashListItem>English (Fluent), Irish (Proficient)</DashListItem>
                  </ul>
              </div>
          </ToggleSection>
          
          {/* MIDDLE RIGHT: TECHNICAL PROJECTS (Order 4) */}
          <ToggleSection title="Technical Projects" className="order-4" theme={theme}>
              <div id="mars-rover">
                  <h4 className={`font-semibold ${primaryColor} text-base`}>Mars Rover AI Navigation System</h4>
                  <p className={getInternalTextClass('gray-400', 'gray-700') + ' text-sm italic mb-2'}>Final-Year Research Project</p>
                   {/* List changed to DashListItem and list-none, size standardized to text-base */}
                  <ul className="list-none space-y-1 text-base pl-0">
                      <DashListItem>Designed and implemented a <strong>real-time obstacle detection</strong> system using a stereo depth camera and <strong>CNN USB Accelerator</strong> for high-performance, low-latency navigation.</DashListItem>
                      <DashListItem>Enhanced localization accuracy by <strong>integrating sensor fusion techniques</strong> (e.g., Kalman filtering) to process data from wheel encoders and a gyroscope, <strong>minimizing cumulative drift</strong>.</DashListItem>
                      <DashListItem>Developed the core <strong>autonomous navigation architecture</strong> using Python, allowing for dynamic waypoint generation and path evasion based on real-time vision data.</DashListItem>
                  </ul>
              </div>
              
              <div id="iot-speedometer">
                  <h4 className={`font-semibold ${primaryColor} text-base`}>IoT-Enabled Bicycle Speedometer</h4>
                  <p className={getInternalTextClass('gray-400', 'gray-700') + ' text-sm italic mb-2'}>3rd-Year Project</p>
                  {/* List changed to DashListItem and list-none, size standardized to text-base */}
                  <ul className="list-none space-y-1 text-base pl-0">
                      <DashListItem>Developed an <strong>IoT-connected bicycle speedometer</strong> for real-time speed tracking and journey distance visualization.</DashListItem>
                      <DashListItem>Designed an <strong>interactive user interface</strong> to clearly display speed and distance data to the rider.</DashListItem>
                      <DashListItem>Evaluated <strong>sensor accuracy</strong> by comparing the performance of a mechanical reed switch versus an electronic hall-effect sensor for speed measurement.</DashListItem>
                  </ul>
              </div>
              
          </ToggleSection>
          
          {/* BOTTOM LEFT: REFERENCES (Order 5 - Left Column) */}
          <div className="md:col-start-1 pt-4 order-5"> 
              <ToggleSection title="References" defaultOpen={false} theme={theme}>
                  <div className="space-y-6 text-base">
                      <div>
                          <h4 className={`font-semibold ${primaryColor} mb-1`}>Professional Reference</h4>
                          {/* Note: Phone number is retained here for the specific, non-public Professional Reference */}
                          <p>Frank Murphy - No Shorts Automation</p>
                          <p>086 792 8161</p> 
                      </div>
                      <div>
                          <h4 className={`font-semibold ${primaryColor} mb-1`}>Academic Reference (External Link)</h4>
                          <a
                              href="https://drive.google.com/file/d/1hd5WYgO0O-4FMYQN5hk0qrrSW5pnF7-8/view?usp=sharing"
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center ${secondaryColor} hover:${primaryColor} transition-colors underline`}
                          >
                              View Academic Reference
                              <ExternalLink className="w-4 h-4 ml-1" />
                          </a>
                      </div>
                  </div>
              </ToggleSection>
          </div>
          
          {/* BOTTOM RIGHT: CERTIFICATIONS & OTHER SKILLS (Order 6 - Right Column) */}
          <div className="md:col-span-1 pt-4 order-6"> 
              <ToggleSection title="Certifications & Other Skills" defaultOpen={false} theme={theme}>
                  <div id="coursera-certs">
                      <h4 className={`font-semibold ${primaryColor} text-base mb-1`}>Training & Certifications</h4>
                      {/* List is now text-base and dash style */}
                      <ul className="list-none space-y-1 text-base pl-0">
                          <DashListItem>Google AI Essentials</DashListItem>
                          <DashListItem>Stay Ahead of the AI Curve</DashListItem>
                          <DashListItem>Crash Course on Python</DashListItem>
                          <DashListItem>Fundamentals of Robotics & Industrial Automation</DashListItem>
                      </ul>
                  </div>
                  <div id="software-proficiency" className="pt-3">
                      <h4 className={`font-semibold ${primaryColor} text-base mb-1`}>Other Skills</h4>
                      {/* List is now text-base and dash style */}
                      <ul className="list-none space-y-1 text-base pl-0">
                          <DashListItem>Microsoft Office Tools (Word, Excel, PowerPoint)</DashListItem>
                      </ul>
                  </div>
              </ToggleSection>
          </div>
          
      </div>
      {/* --- MAIN CV GRID LAYOUT END --- */}

      {/* REMOVED: AnimatePresence block for the modal is no longer needed. */}
    </div>
  );
}
