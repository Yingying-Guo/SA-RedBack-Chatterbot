import React, { useState, useEffect, useRef, useCallback } from "react";
import "./info_collect.css";
import "./landing_page.css";
import userAvatar from '../assets/images/5593d02b8cf746b1a827a90f620354ed.png';
import botAvatar from '../assets/images/Group 1437252836.png';
import TermsOfUse from './TermsOfUse';
import PrivacyPolicy from './PrivacyPolicy';
import LandingPage from './LandingPage';
import TopicBoxes from './suggestions';
import ReCAPTCHA from "react-google-recaptcha";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import HCaptcha from '@hcaptcha/react-hcaptcha';


export default function Main() {
  // State control
  const [currentPage, setCurrentPage] = useState('landing');
  const [showNewInterface, setShowNewInterface] = useState(false);
  const [isRobotChecked, setIsRobotChecked] = useState(null);
  const [isDataShared, setIsDataShared] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [inputText, setInputText] = useState("");
  const [searchInputText, setSearchInputText] = useState("");
  const [isConvStart, setIsConvStart] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [isWaitingForBotResponse, setIsWaitingForBotResponse] = useState(false);
  const messagesEndRef = useRef(null);
  const [creativityLevel, setCreativityLevel] = useState("medium");
  const [sessionId, setSessionId] = useState("");
  const [DoB, setDoB] = useState("");
  const [showTermsOfUse, setShowTermsOfUse] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [isCSSLoaded, setIsCSSLoaded] = useState(false);
  const [isInfoCollectCSSLoaded, setIsInfoCollectCSSLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isRateLimitExceeded, setIsRateLimitExceeded] = useState(false);

  
  





  // Load the chat page css
  useEffect(() => {
    if (showNewInterface) {
      import("./user_chat.css");
    }
  }, [showNewInterface]);

  // Scroll to the bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  // Read from localStorage to get conversation data
  useEffect(() => {
    const savedConversation = localStorage.getItem("conversation");
    if (savedConversation) {
      setConversation(JSON.parse(savedConversation));
    }
  }, []);

  // Once conversation change，save it to localStorage
  useEffect(() => {
    localStorage.setItem("conversation", JSON.stringify(conversation));
  }, [conversation]);

  // Update DoB whenever selectedYear, selectedMonth, or selectedDate changes
  useEffect(() => {
    if (selectedYear && selectedMonth) {
      const formattedDoB = `${selectedYear}-${months.indexOf(selectedMonth) + 1
        }`;
      setDoB(formattedDoB);
      console.log("DoB:", formattedDoB); // Output the DoB
    }
  }, [selectedYear, selectedMonth]);


  useEffect(() => {
    if (showNewInterface) {
      import("./user_chat.css").then(() => {
        setTimeout(() => setIsCSSLoaded(true), 100);
      });
    }
  }, [showNewInterface]);


  useEffect(() => {
    if (currentPage === 'info') {
      import("./info_collect.css").then(() => {
        setTimeout(() => setIsInfoCollectCSSLoaded(true), 100);
      });
    }
  }, [currentPage]);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    if (isMobile) {
      document.documentElement.style.setProperty('--sidebar-width', `0px`);
      setIsSidebarOpen(false);
    } else {
      document.documentElement.style.setProperty('--sidebar-width', `320px`);
      setIsSidebarOpen(true);
    }
  }, [])


  const handleNewConversation = () => {
    setConversation([]);
    setInputText("");
    setIsConvStart(false);
  };

  // State months, dates, years and countries
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  // const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const countries = [
    "Australia",
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo (Democratic Republic of the)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea (North)",
    "Korea (South)",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const handleTopicClick = (topic) => {
    setInputText(topic);
    setIsInputFocused(true);
    setIsConvStart(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);

    if (!isMobile) {
      if (!isSidebarOpen) {
        document.documentElement.style.setProperty('--sidebar-width', `320px`);
      } else {
        document.documentElement.style.setProperty('--sidebar-width', '0px');
      }
    }
    else {
      if (!isSidebarOpen) {
        document.documentElement.style.setProperty('--sidebar-width', `${window.innerWidth}px`);
      } else {
        document.documentElement.style.setProperty('--sidebar-width', '0px');
      }
    }


  };

  // Function to determine whether the "Start" button should be enabled
  const isButtonEnabled = () => {
    // Enable button if robot checkbox is checked, data sharing is agreed,
    // and both country and gender or full birth date (month, date, and year) are selected
    return (
      isRobotChecked &&
      isDataShared &&
      selectedCountry &&
      selectedGender &&
      selectedMonth &&
      selectedYear
    );
  };

  async function getIpAddress() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;  // Returns the user's IP address
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  }

  async function getBrowserFingerprint() {
    // Initialize the agent at application startup.
    const fp = await FingerprintJS.load();

    // Get the visitor identifier when you need it.
    const result = await fp.get();

    return result.visitorId;  // Return to Browser Fingerprint
  }

  async function generateHash(ipAddress, fingerprint) {
    const data = ipAddress + fingerprint;  // Splicing IP addresses and fingerprints
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;  // Returns the generated hash
  }

  const sendFingerprintAndIp = async () => {
    try {
      const ipAddress = await getIpAddress();
      // console.log('Fetched IP Address:', ipAddress); // Log IP address

      const fingerprint = await getBrowserFingerprint();
      // console.log('Fetched Fingerprint:', fingerprint); // Log fingerprint

      const hash = await generateHash(ipAddress, fingerprint);
      // console.log('Generated Hash:', hash); // Log generated hash

      const response = await fetch(`${import.meta.env.VITE_API_URL}/rate_limit/submitFingerprint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hash })
      });

      // Check the response status
      if (response.status === 429) {
        setIsRateLimitExceeded(true);
        alert('Rate limit exceeded. You have reached the maximum number of requests for today.');
        return false; // Return false to indicate rate limit exceeded
      }

      const result = await response.json();
      console.log('Server Response:', result); // Log server response

      if (response.ok) { // Check if response status is OK (200-299)
        setIsRateLimitExceeded(false);
        return true; // Return true if request was successful
      } else {
        // Handle other server errors
        console.error('Server error:', result.message);
        return false; // Return false on server error
      }
    } catch (error) {
      console.error('Error:', error);
      return false; // Return false on error
    }
  }


  // Function to handle sending the message to server
  const sendMessageToServer = async (message, creativityLevel, sessionId) => {
    // Send fingerprint and IP address first
    const fingerprintSent = await sendFingerprintAndIp();
    console.log('Fingerprint sent:', fingerprintSent); // Log whether fingerprint was sent

    if (!fingerprintSent) {
      console.log('fringerprint sending failed.'); // 
      return;
    }

    const rateLimitExceeded = isRateLimitExceeded; // Save the current state as a local variable
    console.log('Rate limit exceeded:', rateLimitExceeded); // Log whether rate limit is exceeded

    if (!rateLimitExceeded && message.trim()) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/openai/completion`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
            creativityLevel: creativityLevel,
            sessionId: sessionId,
          }),
        }
        );

        const data = await response.json();

        setTimeout(() => {
          setConversation((prevConversation) => [
            ...prevConversation,
            { type: 'bot', text: data.reply }
          ]);

          if (!sessionId) {
            // If sessionId not exist，set new sessionId
            setSessionId(data.sessionId);
          } else if (data.sessionId !== sessionId) {
            // if sessionId exists but not match，throw error
            throw new Error("Session ID mismatch");
          }
          setIsWaitingForBotResponse(false);
        }, 10);
      } catch (error) {
        console.log("Error fetching completion:", error);
        setTimeout(() => {
          setConversation((prevConversation) => [
            ...prevConversation,
            { type: "bot", text: "Error retrieving response from the server." },
          ]);
          setIsWaitingForBotResponse(false);
        }, 10);
      }
    }
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      setConversation([...conversation, { type: "user", text: inputText }]);
      setInputText("");
      setIsWaitingForBotResponse(true);
      await sendMessageToServer(inputText, creativityLevel, sessionId);
      setIsWaitingForBotResponse(false);
    }
  };


  // Function to handle sending the user information to server
  const sendUserInformationToServer = async (
    location,
    gender,
    DoB,
    sessionId
  ) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/db/user-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: location,
          gender: gender,
          DoB: DoB,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle server response
      const data = await response.json();
      console.log("Server response:", data.message);

      if (!sessionId) {
        // If sessionId not exists，set new sessionId
        setSessionId(data.sessionId);
      }
    } catch (error) {
      console.error("Error sending user information:", error);
    }
  };


  // Handle information collection page
  const handleStartChat = async () => {
    // console.log('DoB:', DoB);
    await sendUserInformationToServer(
      selectedCountry,
      selectedGender,
      DoB,
      sessionId
    );
    // setShowNewInterface(true);
  };


  const handleTermsAccept = () => {
    setShowTermsOfUse(false);
  };

  const handlePrivacyPolicyAccept = () => {
    setShowPrivacyPolicy(false);
  };

  const handleGetStarted = () => {
    setCurrentPage('info');
  };


  const handleRandomQuestion = useCallback(() => {
    const hiddenMessage = "Give me an random and interesting what if question. Response formate: RANDOM: question";
    
    setIsWaitingForBotResponse(true);
    sendMessageToServer(hiddenMessage, creativityLevel, sessionId);
  }, [creativityLevel, sessionId, sendMessageToServer]);


  const handleImStuck = useCallback(() => {
    const hiddenMessage = "Randomly and Directly select ONE 'What If' question from the list that starts with 'Based on'. Include the original number of the question. IMPORTANCE: Your response should start with 'Based on [topic], the selected 'What If' question is:' followed by a line break, then provide only one numbered question as your response.";
    
    setIsWaitingForBotResponse(true);
    sendMessageToServer(hiddenMessage, creativityLevel, sessionId);
  }, [creativityLevel, sessionId, sendMessageToServer]);

  if (currentPage === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (showTermsOfUse) {
    return <TermsOfUse onAccept={handleTermsAccept} />;
  }


  if (showPrivacyPolicy) {
    return <PrivacyPolicy onAccept={handlePrivacyPolicyAccept} />;
  }
  {
    /* Main chat page */
  }

  if (showNewInterface) {
    return (
      <>
        {isCSSLoaded && (
          <div className={`user-chat-container ${isCSSLoaded ? 'fade-in' : ''}`}>
            <div className="main-container">

              {/* Sidebar */}

              <button className="menu-button" onClick={toggleSidebar} />

              {isSidebarOpen && (
                <div className="flex-column-c">
                  <div className="frame">
                    {/* <div className="subtract" /> */}
                    {/* <div className="frame-1"> */}
                    <div className="component">

                      {/* New conversation button */}

                      {/* SWISP GPT logo */}

                      <div className="group-2c">
                        {/* <div className="group-2d"> */}
                        <div className="group-2e" />
                        <span className="swisp-gpt">SWISP GPT</span>
                        {/* </div> */}
                      </div>



                      <button className="group" onClick={handleNewConversation}>
                        {/* <div className="group-2"> */}
                        {/* <div className="vuesax-linear-add"> */}
                        <div className="vuesax-linear-add-3">
                          <div className="add" />
                        </div>
                        {/* </div> */}
                        {/* </div> */}
                        <div className="rectangle" />
                      </button>

                      {/* Search function */}

                      {/* <div className="search-input">
                  <input
                    className="search-type-input"
                    value={searchInputText}
                    onChange={(e) => setSearchInputText(e.target.value)}
                  />
                </div>
                <button className="group-4">
                  <div className="vuesax-linear-search-normal">
                    <div className="vuesax-linear-search-normal-5">
                      <div className="search-normal" />
                    </div>
                  </div>
                  <div className="rectangle-6" />
                </button> */}


                      {/* </div> */}



                    </div>




                    <div class="conversations-heading-group">
                      <div class="conversations-heading">Your conversations</div>
                    </div>

                    <div class="conversation-history">

                      <button class="frame-15">
                        <div class="vuesax-linear-message-16">
                          <div class="vuesax-linear-message-17">
                            <div class="message-18"></div>
                          </div>
                        </div>
                        <div class="conversation-title">Sustainable urban planning</div>
                      </button>

                      <button class="frame-15">
                        <div class="vuesax-linear-message-16">
                          <div class="vuesax-linear-message-17">
                            <div class="message-18"></div>
                          </div>
                        </div>
                        <div class="conversation-title">Cities in 2050</div>
                      </button>

                      <button class="frame-15">
                        <div class="vuesax-linear-message-16">
                          <div class="vuesax-linear-message-17">
                            <div class="message-18"></div>
                          </div>
                        </div>
                        <div class="conversation-title">Sustainable urban planning</div>
                      </button>

                      <button class="frame-15">
                        <div class="vuesax-linear-message-16">
                          <div class="vuesax-linear-message-17">
                            <div class="message-18"></div>
                          </div>
                        </div>
                        <div class="conversation-title">Cities in 2050</div>
                      </button>

                      <button class="frame-15">
                        <div class="vuesax-linear-message-16">
                          <div class="vuesax-linear-message-17">
                            <div class="message-18"></div>
                          </div>
                        </div>
                        <div class="conversation-title">Sustainable urban planning</div>
                      </button>







                    </div>









                    {/* Creativity level selection */}

                    <div className="creativity-level-container">
                      <div className="creativity-level-header">
                        Pick a creativity level
                      </div>
                      <div className="creativity-level-buttons">
                        <button
                          className={`creativity-level-button ${creativityLevel === "low" ? "active" : ""
                            }`}
                          onClick={() => setCreativityLevel("low")}
                        >
                          Low
                        </button>
                        <button
                          className={`creativity-level-button ${creativityLevel === "medium" ? "active" : ""
                            }`}
                          onClick={() => setCreativityLevel("medium")}
                        >
                          Medium
                        </button>
                        <button
                          className={`creativity-level-button ${creativityLevel === "high" ? "active" : ""
                            }`}
                          onClick={() => setCreativityLevel("high")}
                        >
                          High
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}







              {/* Conversation side content */}

              <div className="flex-column-acdd">
                <div className="message-column">
                  {conversation.map((message, index) => (
                    <div key={index} className={`message-container ${message.type}`}>
                      <img
                        className="avatar"
                        src={message.type === "user" ? userAvatar : botAvatar}
                        alt={message.type === "user" ? "User Avatar" : "Bot Avatar"}
                      />
                      <div className={`message-box ${message.type}`}>
                        <span>{message.text}</span>
                      </div>
                    </div>
                  ))}

                  {isWaitingForBotResponse && (
                    <div className="message-container bot">
                      <img className="avatar" src={botAvatar} alt="Bot Avatar" />
                      <div className="message-box bot loading-indicator">
                        <span>I am thinking...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* New buttons */}
                {/* New buttons */}
                <div className="new-buttons-container">
                  <button 
                    className="new-button random-question" 
                    onClick={handleRandomQuestion}
                    data-tooltip="Generate a random interesting 'What If' question"
                  >
                    Random 'What If' Question
                  </button>
                  <button 
                    className="new-button im-stuck" 
                    onClick={handleImStuck}
                    data-tooltip="Randomly select one from previous 'What If' questions"
                  >
                    I'm Stuck
                  </button>
                </div>

                {/* Conversation start topic */}

                {conversation.length === 0 && !isConvStart && (
                  <TopicBoxes onTopicClick={handleTopicClick} />
                )}

                {/* Message input */}
                {/* <div className="input-send-group"> */}


                <div className="type">
                  <input
                    className="type-input"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    // placeholder="What's in your mind?..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !isWaitingForBotResponse) {
                        handleSend();
                        setIsConvStart(true);
                      }
                    }}
                  />

                  {/* Input background */}

                  {!isInputFocused && (
                    <div className="frame-3e">
                      <div className="frame-3f">
                        <div className="group-40">
                          <div className="group-41" />
                        </div>
                        <span className="whats-mind">What's in your mind?...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Send button */}

                <button
                  className={`frame-42 ${isWaitingForBotResponse ? "frame-42-grey" : ""
                    }`}
                  onClick={() => {
                    handleSend();
                    setIsConvStart(true);
                  }}
                  disabled={isWaitingForBotResponse}
                >
                  <div className="vuesax-linear-send">
                    <div className="vuesax-linear-send-43">
                      <div className="send" />
                    </div>
                  </div>
                </button>



               {/* </div> */}


              </div>



            </div>
          </div>
        )}
      </>
    );
  }

  {
    /* Information collection page */
  }

  if (currentPage === 'info') {
    return (
      <>
        {isInfoCollectCSSLoaded && (
          <div className={`info-collect-container ${isInfoCollectCSSLoaded ? 'fade-in' : ''}`}>
            <div className="main-container">
              {/* Logo and title */}

              <div className="content">
                <div className="frame">
                  <div className="logo" />
                  <div className="group" />
                  <span className="start-chat">Do you want to play?</span>
                </div>

                {/* Ask choose region */}

                <div className="frame-1">
                  <div className="basic-info">
                    <div className="frame-2">
                      <span className="choose-country">
                        Where in the world do you call home? (region / country)
                        <span className="red-star"> *</span>
                      </span>
                      <div className="frame-3">
                        <div className="text-field">
                          <select
                            className="country-select"
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                          >
                            <option value="">Select a country</option>
                            {countries.map((country, index) => (
                              <option key={index} value={country}>
                                {country}
                              </option>
                            ))}{" "}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ask gender */}

                  <div className="frame-5">
                    <div className="gender">
                      <div className="whats-your-gender">
                        <span className="whats-your-gender-6">
                          What's your superpower? (gender)
                          <span className="red-star"> *</span>
                        </span>
                      </div>
                      <div className="frame-7">
                        <label className="radio-button">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={selectedGender === "female"}
                            onChange={(e) => setSelectedGender(e.target.value)}
                            className="radio-button-input"
                          />
                          <span className="radio-button-custom"></span>
                          <span className="text-gender">Female</span>
                        </label>
                        <label className="radio-button">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={selectedGender === "male"}
                            onChange={(e) => setSelectedGender(e.target.value)}
                            className="radio-button-input"
                          />
                          <span className="radio-button-custom"></span>
                          <span className="text-gender">Male</span>
                        </label>
                        <label className="radio-button">
                          <input
                            type="radio"
                            name="gender"
                            value="non-binary"
                            checked={selectedGender === "non-binary"}
                            onChange={(e) => setSelectedGender(e.target.value)}
                            className="radio-button-input"
                          />
                          <span className="radio-button-custom"></span>
                          <span className="text-gender">Non-binary</span>
                        </label>
                      </div>
                    </div>

                    {/* Ask birth */}

                    <div className="frame-d">
                      <span className="date-of-birth">
                        How many times have you circled the sun? (date of birth)
                        <span className="red-star"> *</span>
                      </span>
                      <div className="frame-e">
                        <div className="text-field-f">
                          <div className="frame-10">
                            <span className="label">Month</span>
                          </div>
                          <select
                            className="date-select"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                          >
                            <option value="">Select Month</option>
                            {months.map((month, index) => (
                              <option key={index} value={month}>
                                {month}
                              </option>
                            ))}
                          </select>
                        </div>
    
                        <div className="text-field-18">
                          <div className="frame-19">
                            <span className="label-1a">Year</span>
                          </div>
                          <select
                            className="date-select"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                          >
                            <option value="">Select Year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ask data share */}

                  <div className="frame-1d">
                    <div className="check-box">
                      <label className="custom-checkbox-label">
                        <input
                          type="checkbox"
                          className="custom-checkbox-input"
                          checked={isDataShared}
                          onChange={() => setIsDataShared(!isDataShared)}
                        />
                        <span className="checkmark"></span>
                        <span className="receive-emails">
                          Share my registration data with our content providers for research purposes.
                        </span>
                      </label>
                    </div>

                    {/* Term of use and privacy policy */}

                    <div className="link-text">
                      <div className="terms-privacy-policy">
                        <span className="create-account">
                          By creating a chat, you agree to the&nbsp;
                        </span>
                        <span className="terms-of-use" onClick={() => setShowTermsOfUse(true)}>Terms of use</span>
                        <span className="empty"> </span>
                        <span className="create-account-1f">and</span>
                        <span className="empty-20"> </span>
                        <span className="terms-of-use-21" onClick={() => setShowPrivacyPolicy(true)}>Privacy Policy.</span>

                        <span className="empty-22"> </span>
                      </div>
                    </div>

                    {/* Robot and reCAPTCHA */}
                    <HCaptcha
                      sitekey={import.meta.env.VITE_HCAPTCHA_SITE_KEY}
                      onVerify={(val) => setIsRobotChecked(val)}
                    />
                    {/* <ReCAPTCHA
                      sitekey={import.meta.env.VITE_GOOGLE_SITE_KEY}
                      onChange={(val) => setIsRobotChecked(val)}
                    /> */}
                  </div>

                  {/* Start button */}

                  <div className="frame-25">
                    <button
                      className="button"
                      onClick={() => {
                        handleStartChat();
                        setShowNewInterface(true);
                      }}
                      disabled={!isButtonEnabled()}
                    >
                      <div
                        className={`button-26 ${isButtonEnabled() ? "button-turn_blue" : ""
                          }`}
                      >
                        <div className="frame-27">
                          <span className="sign-up-28">Let's Play</span>
                        </div>
                      </div>
                    </button>

                    {/* Skip */}

                    <div className="have-an-account-login">
                      <div className="have-an-account-login-29">
                        <span
                          className="already-have-an-account"
                          onClick={() => {
                            handleStartChat();
                            setShowNewInterface(true);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          skip
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
