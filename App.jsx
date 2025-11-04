import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, User, Sun, Moon, X, Send } from "lucide-react"; 
// Tailwind CSS classes are used for styling.

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

// ContactRequestForm Component
const ContactRequestForm = ({ onClose, theme, isDark, primaryColor, secondaryColor, borderClass }) => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Dynamic classes
    const formBg = isDark ? 'bg-[#1b253b]' : 'bg-white';
    const inputBorder = isDark ? 'border-gray-600 focus:border-[#96a9d1]' : 'border-gray-300 focus:border-blue-600';
    const inputColor = isDark ? 'text-gray-100' : 'text-gray-900';
    const labelColor = isDark ? 'text-gray-300' : 'text-gray-700';
    // FIX: Define the full focus ring class statically for Tailwind Purge to work
    const focusRingClass = isDark ? 'focus:ring-[#96a9d1]' : 'focus:ring-blue-600';


    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation
        if (formState.name && formState.email && formState.message) {
            // In a real application, you would send this data to a server here.
            console.log("Contact Request Submitted:", formState);
            setIsSubmitted(true);
            
            // Optionally close the form after a delay
            setTimeout(() => {
                onClose();
            }, 3000);
        } else {
            // Simple visual feedback for incomplete form
            console.error('Form incomplete');
        }
    };
    
    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={onClose} // Close on backdrop click
        >
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`w-full max-w-lg p-6 sm:p-8 rounded-2xl shadow-2xl relative ${formBg} border ${borderClass}`}
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside the form
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-colors 
                        ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
                    aria-label="Close form"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* TITLE */}
                <h3 className={`text-2xl font-bold mb-6 ${primaryColor}`}>Professional Inquiry Form</h3>
                
                {/* REVISED INTRODUCTORY PARAGRAPH */}
                <p className={`mb-6 text-sm ${labelColor}`}>
                    This form is for detailed professional inquiries, such as discussing a <strong>job opportunity</strong>, research collaboration, or to schedule a call to discuss a specific opportunity.
                </p>

                {isSubmitted ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center h-48 text-center"
                    >
                        <Send className={`w-10 h-10 ${secondaryColor} mb-3`} />
                        <h4 className={`text-xl font-semibold ${primaryColor} mb-2`}>Inquiry Sent!</h4>
                        <p className={labelColor}>
                            Thank you for your interest. I will respond to your email as soon as possible.
                        </p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className={`block text-sm font-medium mb-1 ${labelColor}`}>Your Name / Company Contact</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                required
                                // FIXED: Using static focusRingClass
                                className={`w-full p-3 border rounded-lg focus:ring-2 ${focusRingClass} ${inputBorder} ${inputColor} ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
                                
                                placeholder="e.g., Hiring Manager, Recruiter"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className={`block text-sm font-medium mb-1 ${labelColor}`}>Your Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                required
                                // FIXED: Using static focusRingClass
                                className={`w-full p-3 border rounded-lg focus:ring-2 ${focusRingClass} ${inputBorder} ${inputColor} ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
                                
                                placeholder="e.g., hiring.manager@company.com"
                            />
                        </div>

                        {/* Message Field */}
                        <div>
                            <label htmlFor="message" className={`block text-sm font-medium mb-1 ${labelColor}`}>Message / Inquiry</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formState.message}
                                onChange={handleChange}
                                required
                                rows="4"
                                // FIXED: Using static focusRingClass
                                className={`w-full p-3 border rounded-lg focus:ring-2 ${focusRingClass} ${inputBorder} ${inputColor} ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}
                                
                                placeholder="Briefly describe the job opportunity, research collaboration, or specific request."
                            ></textarea>
                        </div>

                        {/* Submit Button - Updated text for clarity */}
                        <button
                            type="submit"
                            className={`w-full flex items-center justify-center space-x-2 py-3 mt-6 rounded-lg font-bold text-base transition-colors
                                ${isDark ? 'bg-[#96a9d1] text-[#0f1624] hover:bg-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        >
                            <Send className="w-5 h-5" />
                            <span>Submit Inquiry</span>
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};


export default function App() {
  
  // State for the Contact Details dropdown
  const [openContact, setOpenContact] = useState(false);
  const [hoverContact, setHoverContact] = useState(false);
  // 1. New State for Contact Form visibility
  const [isFormOpen, setIsFormOpen] = useState(false);
  // 2. New State for Theme Management
  const [theme, setTheme] = useState('dark');
  
  const toggleContact = (e) => {
    e.stopPropagation();
    setOpenContact((o) => !o);
  };

  // 3. Theme Toggle Function
  const toggleTheme = () => {
      setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  };

  // 4. Define Theme Classes
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
                
                {/* 1. Theme Toggle (Text + Icon as a single clickable unit) - ENHANCED HOVER */}
                <div
                    onClick={toggleTheme}
                    // Apply padding, rounding, cursor, and transition to the whole element
                    className={`
                        flex items-center space-x-2 px-3 py-1 rounded-full cursor-pointer transition-colors
                        ${isDark 
                            ? 'hover:bg-gray-700/50' // Light hover background for dark mode
                            : 'hover:bg-gray-200/50' // Light hover background for light mode
                        }
                    `}
                    aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {/* Theme Label: Color changes on hover */}
                    <span className={`text-base font-semibold transition-colors
                        ${isDark 
                            ? 'text-[#96a9d1] hover:text-[#cdd9f0]' 
                            : 'text-blue-600 hover:text-gray-900'
                        }`}
                    >
                        Theme
                    </span>
                    
                    {/* Icon: Color is static but container background changes */}
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

                    {/* User Icon with Dropdown - FIX APPLIED HERE */}
                    <div className="relative">
                        <motion.span
                            onClick={toggleContact}
                            animate={{
                                // Use explicit hex values for smooth animation, ensuring dark color in light mode
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

                        {/* Contact dropdown anchored under the gear/text group */}
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
                                
                                {/* For professional inquiries: - Adjusted pt-3 to pt-2 to reduce vertical gap */}
                                <li className="p-1 pt-2 text-sm">
                                    For professional inquiries:
                                </li>

                                {/* Contact Form Button - Adjusted pt-1 removed */}
                                <li className="p-1">
                                    <button
                                        onClick={() => { setOpenContact(false); setIsFormOpen(true); }}
                                        className={`w-full text-center py-2 px-3 rounded-lg font-bold text-sm transition-colors shadow-md
                                            ${isDark ? 'bg-[#96a9d1] text-[#0f1624] hover:bg-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                    >
                                        Contact Form (Optional)
                                    </button>
                                </li>
                                {/* END BUTTON */}
                                
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

      {/* --- CONTACT REQUEST FORM MODAL --- */}
      <AnimatePresence>
          {isFormOpen && (
              <ContactRequestForm
                  onClose={() => setIsFormOpen(false)}
                  theme={theme}
                  isDark={isDark}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                  borderClass={borderClass}
              />
          )}
      </AnimatePresence>
      {/* --- END MODAL --- */}
    </div>
  );
}
