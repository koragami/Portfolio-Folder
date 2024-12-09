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
        { message: "\nWelcome to my Portfolio!\n", delay: 1500 },
        { message: "\nWould you like AI Narrative Assistance?\n", delay: 1500 }
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

    // Start by displaying the introduction questions and then fake loading modules if applicable
    (async () => {
        await displayIntroductionQuestions(introductionQuestion);
    })();

});


