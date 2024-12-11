document.addEventListener("DOMContentLoaded", function() {
    const terminal = document.getElementById('terminal');

    // Create initial terminal structure
    terminal.innerHTML = `
        <div id="output"></div>
        <br> <!-- Add this line to create a line break -->
        <div id="input-line">
            <input type="text" id="user-input" autofocus>
        </div>
    `;

    const output = document.getElementById('output');
    const userInput = document.getElementById('user-input');
    let voiceSpeech = false; // Initialize the voiceSpeech variable

    const introductionQuestion = [
        { message: "\nBefore we get into the portfolio.\n", delay: 1500 },
        { message: "\nWould you like AI Narrative Voice Assistance? (yes, no)\n", delay: 1500 }
    ];

    const fakeLoadingModules = [
        { message: '\n"Loading modules..."\n', delay: 50 }, 
        { message: '\n"Retrieving File Information..."\n', delay: 50 },
        { message: '\n"Searching for txt readMe.md..."\n', delay: 100 },
        { message: '\n"Found txt readMe.md..."\n', delay: 150},
        { message: '\n"Attempting to open txt readMe.md"\n', delay: 200}
    ];

    // Function to simulate typing
    const simulateTyping = (text, delay, callback) => {
        let index = 0;
        const typeChar = () => {
            if (index < text.length) {
                output.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeChar, delay);
            } else if (callback) {
                callback();
            }
        };
        typeChar();
    };

    // Function to clear the terminal
    const clearTerminal = () => {
        output.innerHTML = ''; // Clear the terminal content
    };

    // Function to display introduction questions with delay
    const displayIntroductionQuestions = async (questions) => {
        userInput.readOnly = true; // Set userInput to readOnly while asking questions
        let totalDelay = 0;
        for (const command of questions) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    simulateTyping(command.message, 50, resolve);
                }, totalDelay);
                totalDelay += command.message.length * 50 + command.delay;
            });
        }
        userInput.readOnly = false; // Make userInput editable after questions
        userInput.focus();
    };

    // Function to display fake loading modules
    const displayFakeLoadingModules = async (modules) => {
        userInput.readOnly = true; // Set userInput to readOnly while loading modules
        let totalDelay = 0;
        for (const module of modules) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    simulateTyping(module.message, 50, resolve);
                }, totalDelay);
                totalDelay += module.message.length * 50 + module.delay;
            });
        }
        userInput.readOnly = false; // Make userInput editable after loading modules
    };

    userInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            const input = userInput.value.trim();
            if (input.toLowerCase() === 'yes') { // Corrected toLowerCase() method
                output.style.color = 'white';
                simulateTyping('\nEnabling...\n', 50, () => {
                    setTimeout(() => {
                        simulateTyping('\nSuccessfully Enabled...\n', 50, async () => {
                            await displayFakeLoadingModules(fakeLoadingModules);
                        });
                    }, 1000); // Wait for 1 second before displaying the next message
                });
                voiceSpeech = true; // Set the variable correctly
                userInput.readOnly = true; // Set userInput to readOnly during response
            } else if (input.toLowerCase() === 'no') { // Corrected toLowerCase() method
                output.style.color = 'white';
                simulateTyping('\nDisabling...\n', 50, () => {
                    setTimeout(() => {
                        simulateTyping('\nSuccessfully Disabled...\n', 50, async () => {
                            clearTerminal(); // Clear the terminal after the message
                            output.style.color = 'green';
                            await displayFakeLoadingModules(fakeLoadingModules);
                            clearTerminal();
                        });
                    }, 1000); // Wait for 1 second before displaying the next message
                });
                voiceSpeech = false; // Set the variable correctly
                userInput.readOnly = true; // Set userInput to readOnly during response
            } else {
                output.style.color = 'red'; // Change the color to red
                simulateTyping('\nInvalid Command...\n', 50); // Use simulateTyping to display text
                userInput.readOnly = false; // Keep userInput editable
            }
            terminal.scrollTop = terminal.scrollHeight;
            userInput.value = ''; // Clear the input field correctly
        }
    });

    let inactivityTimeout;
    const inactivityDuration = 30000;
    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(handleInactivity, inactivityDuration);     
    };

    const handleInactivity = () => {
        simulateTyping("Due to inactivity, you have been disconnected.\n", 50, () => {
            userInput.readOnly = true;
        });
    };

    const detectActivity = () => {
        if (userInput.readOnly) {
            output.innerHTML += "\nActivity detected, reconnected.\n";
            setTimeout(() => {
                
            }
        }
    }
    // Start by displaying the introduction questions and then fake loading modules if applicable
    (async () => {
        await displayIntroductionQuestions(introductionQuestion);
    })();


    const preCodedMessages = [
        { message: "Welcome to my Portfolio!/n My name is Dylon LaMarre./n I started programming in 2021-2022./n I eventually took a break for a little, and returned cause of my love, and passion, for programming!.", delay: 100},
        { message: "/n This portfolio is only a brief summary of the things I can do.", delay: 500 },
        { message: '/n"SKILLS"/n', delay: 50},
        { message: '/nCertified Front-End Developer & High School Diploma with Eligibility to work in the US.'},
        { message: '/n Certified in: HTML | CSS | Javascript | React | Chrome | git | github | SQL/n'}
    ];
});


